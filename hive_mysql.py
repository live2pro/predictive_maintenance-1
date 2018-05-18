# Importing python modules
from pyspark.sql import SparkSession
from pyspark.context import SparkContext
from pyspark.sql import Row
from os.path import abspath


warehouse_location =abspath('hdfs://localhost:9000/predictive_maintenance/data/predicted_data')

sqlcontext = SparkSession \
    .builder \
    .appName("Python Spark SQL Hive integration example") \
    .config("spark.sql.warehouse.dir", warehouse_location) \
    .enableHiveSupport() \
    .getOrCreate()

# table = sqlcontext.table("default.testcon")

data = sqlcontext.sql('Select * from agg_predicted_data')
data.show()
print(type(data))


data.write.format('jdbc').options(
      url='jdbc:mysql://localhost/prediction_visual',
      driver='com.mysql.jdbc.Driver',
      dbtable='test_predictions',
      user='root',
      password='1234').mode('append').save()