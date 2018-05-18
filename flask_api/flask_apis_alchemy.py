from flask import Flask, jsonify, render_template, Response, request
from flaskext.mysql import MySQL
import json
import pandas as pd
from pandas import DataFrame
import datetime
import dateutil.relativedelta
import mysql.connector as sql
from collections import OrderedDict, defaultdict
from operator import itemgetter
from itertools import groupby
import dateutil.relativedelta
from sqlalchemy import *
from decimal import *
import numpy as np
current_time = datetime.datetime.now()

import subprocess as sp
from pyspark.sql import SparkSession


app = Flask(__name__)
mysql = MySQL()


connection_string = "mysql+pymysql://root:1234@localhost:3306/prediction_visual"
db = create_engine(connection_string,pool_recycle=3600)

status = 0
store_date  = ""


def preProcessDate(d):
    try:
        d = d.decode("utf-8")
    except AttributeError:
        pass
    date_split_list = d.split('-')
    date_final = "{}-{}-{}".format(date_split_list[2], date_split_list[1], date_split_list[0])
    return date_final


def responseFromMysql(query):
    result = db.engine.execute(query)
    df = DataFrame(result.fetchall())
    if not df.empty:
        df.columns = result.keys()
    json = df.to_json(orient='records', date_format='iso')
    resp = Response(response=json, status=200, mimetype="application/json")
    resp.headers['Access-Control-Allow-Origin'] = '*'
    return resp;

######### Run spark jobs #############################
@app.route('/', methods=['GET', 'POST'])
def route_1():
    global store_date
    if request.method == 'POST':
        data = request.get_json()
        date = data['0']

        file_name = 'sensor_data_' + date.replace('-','') + '.csv'
        file_path = '../data/test/'+file_name
        date = preProcessDate(date)
        store_date = date

        # spark job is starting
        samp_create  = sp.run(['hadoop', 'fs', '-mkdir', '/sample/'])
        moved_create = sp.run(['hadoop', 'fs', '-mkdir', '/moved/'])
        ext_table_create = sp.run(['hadoop', 'fs', '-mkdir','-p', '/predictive_maintenance/data/predicted_data'])
        verify_spark_job = 1;
        reading  = sp.run(['hadoop', 'fs', '-put',file_path,'/sample/'])

        try:
            res = sp.Popen(['spark-submit','--packages', 'mysql:mysql-connector-java:5.1.39', '--master', 'local[4]', 'label_predicted_spark_job.py'],stdout=sp.PIPE,stderr=sp.PIPE);
            output,error = res.communicate()


        except OSError as e:
            ret=e.strerror
        except:

            ret=sys.exc_info()[0]
            flag=100


        sp.run(['hadoop', 'fs', '-mv','/sample/*.csv','/moved/'])
        sp.run(['hadoop', 'fs', '-rm','-r','/sample'])

        ret = file_name + " file is processed and stored into hdfs"
        return date
    else :
        return render_template("index.html")


######################################################################################
@app.route('/send_date', methods=['GET', 'POST'])
def send_date():

    data = {"one" : store_date}
    return jsonify(data)



###################################################################################
@app.route('/linechart', methods=['GET', 'POST'])
def linechart():
    query='SELECT distinct(date(sess_time)) as sess_time, avg_sound from prediction_visual.test_predictions where machine_id = "MID1"'

    result = db.engine.execute(query)
    df = DataFrame(result.fetchall())

    if not df.empty:
        df.columns = result.keys()

    json = df.to_json(orient='records', date_format='iso')
    resp = Response(response=json, status=200, mimetype="application/json")
    resp.headers['Access-Control-Allow-Origin'] = '*'
    return (resp)


######################## view_details page ####################################
@app.route('/view_details', methods=['GET', 'POST'])
def view_details():

    date = request.args.get('data', None)

    return render_template("innerpage.html", data=date)



#################################################################################
@app.route('/total_machines', methods=['GET', 'POST'])
def total_machines():

    data = request.get_json()
    date = data['0']


    query1='SELECT count(distinct machine_id) as machines_count,count(distinct machine_id,session_id) as session_count,\
            sum(max_cum_dist) as total_distance \
            FROM prediction_visual.test_predictions\
            WHERE date(sess_time)="' + date + '"';

    result1 = db.engine.execute(query1)
    df_summ = DataFrame(result1.fetchall())
    df_summ.columns =  ['machines_count', 'session_count', 'total_distance']

    query2 = 'SELECT prediction, count(distinct machine_id ) as cnt_mac_id\
            FROM prediction_visual.test_predictions\
            WHERE date(sess_time)="' + date + '" group by prediction'
    result2 = db.engine.execute(query2)
    df_pred = DataFrame(result2.fetchall())


    keys = df_pred[0].tolist()
    values = df_pred[1].tolist()

    if len(keys)<2:
        keys.extend(list(set([0.0,1.0])-set(keys)))
        values.append(0)

    dict_pred = {}
    for i in range(len(keys)):
        dict_pred['pred_'+str(keys[i])[:-2]] = [values[i]]

    df_predictions = pd.DataFrame(data=dict_pred)

    query3 = 'SELECT count(cnt_faulty) as cnt_faulty from (SELECT machine_id as cnt_faulty  FROM prediction_visual.test_predictions \
        where DATE(sess_time) <= "' + date + '" and \
        DATE(sess_time)  >= ("' + date + '" - INTERVAL 3 DAY ) \
        group by machine_id \
        HAVING sum(prediction)>=3)A'

    result3 = db.engine.execute(query3)
    df_fault = DataFrame(result3.fetchall())



    if not df_fault.empty:
        df_fault.columns = result3.keys()
    else:
        df_fault = pd.DataFrame(columns=['cnt_faulty'])
        df_fault.loc[0]=[0]


    df = pd.concat([df_summ, df_predictions, df_fault],axis =1)


    json = df.to_json(orient='records', date_format='iso')

    resp = Response(response=json, status=200, mimetype="application/json")
    resp.headers['Access-Control-Allow-Origin'] = '*'
    return (resp)







####### Anomalous Data ####################################
@app.route('/anomalous_mc', methods=['GET', 'POST'])
def anomalous_mc():
    data = request.get_json()
    date = data['0']

    query='SELECT distinct machine_id \
            FROM prediction_visual.test_predictions \
            WHERE date(sess_time)="' + date + '" AND prediction=1'

    resp = responseFromMysql(query)
    return (resp)




############### Faulty data ##################
@app.route('/faulty_mc', methods=['GET', 'POST'])
def faulty_mc():
    data = request.get_json()
    date = data['0']
    query='SELECT machine_id  FROM prediction_visual.test_predictions \
            where DATE(sess_time) <= "' + date + '" and \
            DATE(sess_time)  >= ("' + date + '" - INTERVAL 3 DAY ) \
            group by machine_id \
            HAVING sum(prediction)>=3'
    resp = responseFromMysql(query)
    return (resp)




############### Normal machines data ##################
@app.route('/normal_mc', methods=['GET', 'POST'])
def normal_mc():
    data = request.get_json()
    date = data['0']
    query='SELECT distinct machine_id \
            FROM prediction_visual.test_predictions \
            WHERE date(sess_time)="' + date + '" AND prediction=0 order by machine_id'

    resp = responseFromMysql(query)
    return (resp)


########################## Graph visualization 1 ###########################
@app.route('/graph_date_sound', methods=['GET', 'POST'])
def graph_date_sound():

    data = request.get_json()
    machineId = data['0']

    query='SELECT distinct(date(sess_time)) as sess_time, avg_sound from prediction_visual.test_predictions where machine_id = "' + machineId + '"order by date(sess_time)'

    resp = responseFromMysql(query)
    return resp




########################## Graph visualization 2###########################
@app.route('/graph_date_temp', methods=['GET', 'POST'])
def graph_date_temp():

    data = request.get_json()
    machineId = data['0']

    query='SELECT distinct(date(sess_time)) as sess_time, avg_temperature from prediction_visual.test_predictions where machine_id = "' + machineId + '" order by date(sess_time)'

    resp = responseFromMysql(query)
    return resp




########################## Graph visualization 2###########################
@app.route('/graph_date_dist', methods=['GET', 'POST'])
def graph_date_dist():

    data = request.get_json()
    machineId = data['0']

    query='SELECT distinct(date(sess_time)) as sess_time, max_cum_dist from prediction_visual.test_predictions where machine_id = "' + machineId + '"order by date(sess_time)'

    resp = responseFromMysql(query)
    return resp



#################################################################
@app.route('/list')
def showMachineList():
    return render_template('list.html')



if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000, debug=True)
