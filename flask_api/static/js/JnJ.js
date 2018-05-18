
function processData(ActiveData) {
	var MobileData = [{ key: ActiveData[0].APPLICATION_NAME, values: [] }];
	ActiveData.forEach(function (element, index) {
		var elementFound = false
		for (var i = 0; i < MobileData.length; i++)
		{
			if (MobileData[i].key == element.APPLICATION_NAME) {
				elementFound = true
				var obj = {
					x: element.COUNTRY,
					y: element.CountOFUsers
				}
				MobileData[i].values.push(obj)
			}
		}
		if (!elementFound) {

			var obj1 = {
				key: element.APPLICATION_NAME,
				values: [{
					x: element.COUNTRY,
					y: element.CountOFUsers
				}]
			}

			MobileData.push(obj1)
		}
	});
	return MobileData
}
function androidIosMonth(androidIosData)
{
	  var AndroidiosMonthlyData = [{ key: androidIosData[0].COUNTRY, values: [] }];
	  androidIosData.forEach(function (element, index) {
		  var elementFound = false
		  for (var i = 0; i < AndroidiosMonthlyData.length; i++) {
			  if (AndroidiosMonthlyData[i].key == element.COUNTRY) {
				  elementFound = true
				  var obj = {
					  label: element.MonthName,
					  value: element.UserCount
				  }
				  AndroidiosMonthlyData[i].values.push(obj)
			  }
		  }
		  if (!elementFound) {
			  var objdata = {
				  key: element.COUNTRY,
				  values: [{
					  label: element.MonthName,
					  value: element.UserCount
				  }]
			  }
			  AndroidiosMonthlyData.push(objdata)
		  }
	  });
	  return AndroidiosMonthlyData
  }

function WebMobileUserCountMonth(CountOfWebMobileUsers){

	var WebMobileUser = [{ key: "", values: [] }];
	CountOfWebMobileUsers.forEach(function (element, index) {
	  i = 0;
	  var obj = {
	 	label: element.Country,
		value: parseInt(element.CountOfUsers)
	  }
	  WebMobileUser[i++].values.push(obj)
	});
	return WebMobileUser
}

	function TransmissionDevice(deviceData)
{
	  var transDeviceData = [{ key: deviceData[0].Count_type, values: [] }];
	  deviceData.forEach(function (element, index) {
		  var elementFound = false
		  for (var i = 0; i < transDeviceData.length; i++) {
			  if (transDeviceData[i].key == element.Count_type) {
				  elementFound = true
				  var obj = {
					 		x: element.COUNTRY,
							y: parseInt(element.Count)
				  }
				  transDeviceData[i].values.push(obj)
			  }
		  }
		  if (!elementFound) {
			  var obj1 = {
				  key:element.Count_type,
				  values: [{
					 	x: element.COUNTRY,
						y: parseInt(element.Count)
				  }]
			  }
			  transDeviceData.push(obj1)
		  }
	  });
	  return transDeviceData
  }


function PatientCount(CountOfPatient)
{
  var patientCount = [{ key: "", values: [] }];
  CountOfPatient.forEach(function (element, index) {
	  i = 0;
	  var obj = {
		 	label: element.Country,
			value: element.Ratio
	  }
	  patientCount[i++].values.push(obj)
  });
  return patientCount
}
//Report 27,28,29
function HCPCount(CountOfHCP)
{
  var hcpCount = [{ key: "", values: [] }];
  CountOfHCP.forEach(function (element, index) {
	  i = 0;
	  var obj = {
		 	label: element.Country,
			value: element.ActiveHcpCount
	  }
	  hcpCount[i++].values.push(obj)
  });
  return hcpCount
}




function Avg_test(CountOfHCP)
{
  var tf_count = [{ key: "", values: [] }];
  CountOfHCP.forEach(function (element, index) {
	  i = 0;
	  var obj = {
		 	label: element.Country,
			value: element.AvgFrq
	  }
	  tf_count[i++].values.push(obj)
  });
  return tf_count
}

function Avg_test2(CountOfHCP)
{
  var tf_count = [{ key: "", values: [] }];
  CountOfHCP.forEach(function (element, index) {
	  i = 0;
	  var obj = {
		 	label: element.Country,
			value: element.Users_with_TF_1_to_2
	  }
	  tf_count[i++].values.push(obj)
  });
  return tf_count
}
function Avg_test3(CountOfHCP)
{
  var tf_count = [{ key: "", values: [] }];
  CountOfHCP.forEach(function (element, index) {
	  i = 0;
	  var obj = {
		 	label: element.Country,
			value: element.Users_with_TF_2_to_3
	  }
	  tf_count[i++].values.push(obj)
  });
  return tf_count
}
function Avg_test4(CountOfHCP)
{
  var tf_count = [{ key: "", values: [] }];
  CountOfHCP.forEach(function (element, index) {
	  i = 0;
	  var obj = {
		 	label: element.Country,
			value: element.Users_with_TF_3_to_4
	  }
	  tf_count[i++].values.push(obj)
  });
  return tf_count
}
function Avg_test5(CountOfHCP)
{
  var tf_count = [{ key: "", values: [] }];
  CountOfHCP.forEach(function (element, index) {
	  i = 0;
	  var obj = {
		 	label: element.Country,
			value: element.Users_with_TF_4_to_5
	  }
	  tf_count[i++].values.push(obj)
  });
  return tf_count
}

function Avg_test6(CountOfHCP)
{
  var tf_count = [{ key: "", values: [] }];
  CountOfHCP.forEach(function (element, index) {
	  i = 0;
	  var obj = {
		 	label: element.Country,
			value: element.Users_with_TF_greater_than_5
	  }
	  tf_count[i++].values.push(obj)
  });
  return tf_count
}


//Report 30
function Avg_test_freq(frequency)
{
  var freq_ct = [{ key: "", values: [] }];
  frequency.forEach(function (element, index) {
	  i = 0;
	  var obj = {
		 	label: element.COUNTRY,
			value: element.TESTING_FREQUENCY
	  }
	  freq_ct[i++].values.push(obj)
  });
  return freq_ct
}

//Report 38,42
function Total_patients(pat_data)
{
  var pat_count = [{ key: "", values: [] }];
  pat_data.forEach(function (element, index) {
	  i = 0;
	  var obj = {
		 	label: element.COUNTRY,
			value: element.COUNT_OF_USERS
	  }
	  pat_count[i++].values.push(obj)
  });
  return pat_count
}

//Report 40,43
function Total_patients_device(pat_data)
{
  var pat_count = [{ key: "", values: [] }];
  pat_data.forEach(function (element, index) {
	  i = 0;
	  var obj = {
		 	label: element.COUNTRY,
			value: element.PATIENTS_DEVICECOUNT
	  }
	  pat_count[i++].values.push(obj)
  });
  return pat_count
}

// Line chart for predictive maintenance

function simpleLineChart(MobileActiveData,lblxAxis,lblyAxis)
{
   nv.addGraph(function() {
  var chart = nv.models.lineChart()
                .useInteractiveGuideline(true)
               // .transitionDuration(350)  //how fast do you want the lines to transition?
                .showLegend(false)       //Show the legend, allowing users to turn on/off line series.
                .showYAxis(true)        //Show the y-axis
                .showXAxis(true)        //Show the x-axis
                .margin({top: 5, right: 50, bottom: 110, left: 80})
  ;


 chart.xAxis
    .axisLabel(lblxAxis)
    .tickFormat(function(d) {
            //return d3.time.format('%x')(new Date(d))
            return d3.time.format('%d/%m/%y')(new Date(d))
          });

  chart.yAxis     //Chart y-axis settings
      .axisLabel(lblyAxis)
      .tickFormat(d3.format('.02f'));

  /* Done setting the chart up? Time to render it!*/
  d3.select('#JnJVisualization svg')    //Select the <svg> element you want to render the chart in.
      .datum(MobileActiveData)         //Populate the <svg> element with chart data...
      .call(chart);          //Finally, render the chart!

  //Update the chart when window resizes.
  nv.utils.windowResize(function() { chart.update() });
  return chart;
});

}

function linechart_sound(lineChartData)
{
  var lineData = [{ key: "", color:"#20B2AA", values: [] }];
  lineChartData.forEach(function (element, index) {
     i = 0;
     var obj = {
      x: new Date(element.sess_time),
     y: element.avg_sound
     }
     lineData[i++].values.push(obj)
  });
  return lineData
}
function linechart_temp(lineChartData)
{
  var lineData = [{ key: "", color:"#20B2AA", values: [] }];
  lineChartData.forEach(function (element, index) {
     i = 0;
     var obj = {
      x: new Date(element.sess_time),
     y: element.avg_temperature
     }
     lineData[i++].values.push(obj)
  });
  return lineData
}
function linechart_dist(lineChartData)
{
  var lineData = [{ key: "", color:"#20B2AA", values: [] }];
  lineChartData.forEach(function (element, index) {
     i = 0;
     var obj = {
      x: new Date(element.sess_time),
     y: element.max_cum_dist
     }
     lineData[i++].values.push(obj)
  });
  return lineData
}
// Line chart for predictive maintenance

//Report 47
function Patients_clinics(pat_data)
{
  var pat_clinics = [{ key: "", values: [] }];
  pat_data.forEach(function (element, index) {
	  i = 0;
	  var obj = {
		 	label: element.COUNTRY,
			value: element.PATIENT_ACCOUNTS
	  }
	  pat_clinics[i++].values.push(obj)
  });
  return pat_clinics
}


//Report 48
function Users_ble(pat_data)
{
  var users_ct = [{ key: "", values: [] }];
  pat_data.forEach(function (element, index) {
	  i = 0;
	  var obj = {
		 	label: element.COUNTRY,
			value: element.PERCENTAGE
	  }
	  users_ct[i++].values.push(obj)
  });
  return users_ct
}
//Report 49
function Patients_opted(pat_data)
{
  var pat_opted = [{ key: "", values: [] }];
  pat_data.forEach(function (element, index) {
	  i = 0;
	  var obj = {
		 	label: element.COUNTRY,
			value: element.PATIENTS_OPTIN_COUNT
	  }
	  pat_opted[i++].values.push(obj)
  });
  return pat_opted
}
function BulletData(data)
{
  var bullData = [{ key: "", values: [] }];
  data.forEach(function (element, index) {
	  i = 0;
	  var obj = {
		 	label: element.Percentage,
			value: element.Percentage
	  }
	  bullData[i++].values.push(obj)
  });
  return bullData
}
