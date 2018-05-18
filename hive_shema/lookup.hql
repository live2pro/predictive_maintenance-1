CREATE	EXTERNAL	TABLE	lookup
				(machine_id string,
				sess_duration int,
				speed int,
				distance int)
				ROW	FORMAT	DELIMITED
				FIELDS	TERMINATED	BY	','
				LINES TERMINATED BY '\n'
				LOCATION	'/predictive_maintenance/data/lookup';
