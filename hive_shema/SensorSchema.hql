CREATE	EXTERNAL	TABLE	sensordata
				(mac_id	string,
				sess_id	string,
				session	int,
				sess_time	timestamp,
				cum_dist double,
				temperature	double,
				sound	double)
				ROW	FORMAT	DELIMITED
				FIELDS	TERMINATED	BY	','
				LINES TERMINATED BY '\n'
				LOCATION	'/predictive_maintenance/data/raw/';
