CREATE EXTERNAL TABLE IF NOT EXISTS agg_labelled
    (machine_id string,
    session_id int,
    avg_sound double,
    avg_temperature double,
    max_cum_dist double,
    prediction double)
    ROW FORMAT DELIMITED
    FIELDS TERMINATED BY ','
    LINES TERMINATED BY '\n'
    LOCATION '/predictive_maintenance/data/predicted_data';
