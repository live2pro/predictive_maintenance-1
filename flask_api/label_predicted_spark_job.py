# Importing python modules
# print("Importing python modules")

from pyspark.sql import SparkSession
from pyspark.context import SparkContext
from pyspark.sql import Row
from os.path import abspath

from pyspark.sql.functions import udf
from pyspark.sql.types import IntegerType,FloatType,DoubleType

from pyspark.ml.classification import LogisticRegression, RandomForestClassifier,GBTClassifier, RandomForestClassificationModel
from pyspark.ml.feature import StringIndexer, VectorIndexer, VectorAssembler
from pyspark.ml.evaluation import MulticlassClassificationEvaluator


sc=SparkContext()

# print("Loading RandomForest Classification Model")
rfc_model = RandomForestClassificationModel.load("../model/rfc_model")

sqlcontext = SparkSession \
    .builder \
    .appName("Python Spark SQL Hive integration example") \
    .enableHiveSupport() \
    .getOrCreate()

# create agg_predicted_data table in hive 
sqlcontext.sql("CREATE EXTERNAL TABLE IF NOT EXISTS agg_predicted_data (machine_id string,session_id int, sess_time timestamp, avg_sound double,avg_temperature double,max_cum_dist double,prediction double) ROW FORMAT DELIMITED FIELDS TERMINATED BY',' LINES TERMINATED BY '\n' LOCATION 'hdfs://localhost:9000/predictive_maintenance/data/predicted_data' ")

# print("Reading the csv file")
input_=sqlcontext.read.csv("hdfs://localhost:9000/sample", inferSchema=True, header=False)
input_data = input_.withColumnRenamed("_c0", "machine_id").withColumnRenamed("_c1", "sensor_id").withColumnRenamed("_c2", "session_id")\
.withColumnRenamed("_c3", "sess_time").withColumnRenamed("_c4", "cum_dist").withColumnRenamed("_c5", "temperature") \
.withColumnRenamed("_c6", "sound")

df_input=input_data.groupBy(['machine_id', 'session_id']).agg({'cum_dist':'max', 'sess_time':'max', 'temperature':'avg', 'sound':'avg'}).orderBy('machine_id','session_id')
assembler = VectorAssembler(inputCols=['avg(sound)','avg(temperature)','max(cum_dist)'], outputCol='features')
output = assembler.transform(df_input)

# print("Testing the data with model")
test_out_df = rfc_model.transform(output)


test_out_df=test_out_df.withColumnRenamed('avg(sound)','avg_sound').withColumnRenamed('avg(temperature)','avg_temperature').withColumnRenamed('max(cum_dist)','max_cum_dist')\
            .withColumnRenamed('max(sess_time)','sess_time')

tempdf = test_out_df.select(['machine_id', 'session_id', 'sess_time', 'avg_sound', 'avg_temperature','max_cum_dist', 'prediction'])

# print("Writing labelled into hive table")
tempdf.repartition(1).write.insertInto("agg_predicted_data")

# last_status_dict = {}

# # print("Current status of machines")
# for row in test_out_df.rdd.collect():
#     if row.machine_id not in last_status_dict.keys():
#         last_status_dict[row.machine_id] = row.prediction
#     else:
#         val=(last_status_dict[row.machine_id]*2+row.prediction)%4
#         if last_status_dict[row.machine_id]==3 and row.prediction==1 :
#             # print("{0} is Abnormal".format(row.machine_id))
#         last_status_dict[row.machine_id]=val
# print("------------------------------------------------------------")

# print("Writing to reporting store i.e. mysql from hive")
#data = sqlcontext.sql('Select * from agg_predicted_data')
#data.show()
#print(type(data))


tempdf.write.format('jdbc').options(
      url='jdbc:mysql://localhost/prediction_visual',
      driver='com.mysql.jdbc.Driver',
      dbtable='test_predictions',
      user='root',
      password='1234').mode('append').save()


# print("END OF SPARK JOB.........!")