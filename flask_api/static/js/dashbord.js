function stackedBarChart(MobileActiveData,lblxAxis,lblyAxis,groupName)
{
nv.addGraph({
			generate: function () {
				var chart = nv.models.multiBarChart()
		     		 .stacked(true);

					 chart.xAxis
            		 .axisLabel(lblxAxis);

					  chart.yAxis
            		 .axisLabel(lblyAxis);

				chart.dispatch.on('renderEnd', function () {
					console.log('Render Complete');
				});

				if(groupName == "JnJMobileActive")
				{
				      var svg = d3.select('#JnJMobileActive svg').datum(MobileActiveData);
              console.log('calling chart');
				      svg.transition().duration(0).call(chart);
				}
				else if(groupName == "JnJWebActive")
				{
					var svg = d3.select('#JnJWebActive svg').datum(MobileActiveData);
					console.log('calling chart');
					svg.transition().duration(0).call(chart);
				}
				else if(groupName == "JnJTransmissionDevice")
				{
					var svg = d3.select('#JnJTransmissionDevice svg').datum(MobileActiveData);
					console.log('calling chart');
					svg.transition().duration(0).call(chart);
				}
 				nv.utils.windowResize(chart.update);
				return chart;
			}
		});
}

function simpleBarChart(MobileActiveData,lblxAxis,lblyAxis,groupName)
{
nv.addGraph(function() {
        var chart = nv.models.discreteBarChart()
            .x(function(d) { return d.label })
            .y(function(d) { return d.value })
            .staggerLabels(true)
            //.staggerLabels(historicalBarChart[0].values.length > 8)
            .showValues(true)
            .duration(250)
            .margin({ bottom: 75})
            ;

             chart.xAxis
                     .axisLabel(lblxAxis);
                      chart.yAxis
                     .axisLabel(lblyAxis);

						if(groupName == "JnJWebMobile")
					 	{
				        d3.select('#JnJWebMobile svg')
				            .datum(MobileActiveData)
				            .call(chart);
					 }
					 else if (groupName ==  "JnJPerpatientAsso")
					 {
						 d3.select('#JnJPerpatientAsso svg')
								 .datum(MobileActiveData)
								 .call(chart);
					 }

					 else if (groupName == "JnJPercentageIncrease" ) {
						 d3.select('#JnJPercentageIncrease svg')
 								.datum(MobileActiveData)
 								.call(chart);
					 }
					 else if (groupName == "JnJAvgBg") {
						 d3.select('#JnJAvgBg svg')
								 .datum(MobileActiveData)
								 .call(chart);
					 }
					 else if (groupName == "JnJHyposPatient") {
						 d3.select('#JnJHyposPatient svg')
 								.datum(MobileActiveData)
 								.call(chart);
					 }
					 else if (groupName == "JnJHyperPatient") {
					 	d3.select('#JnJHyperPatient svg')
					 		 .datum(MobileActiveData)
					 		 .call(chart);
					 }
					 else if (groupName == "JnJSeveralLow") {
						d3.select('#JnJSeveralLow svg')
							 .datum(MobileActiveData)
							 .call(chart);
					 }
					 else if (groupName == "JnJSeveralHigh") {
					 d3.select('#JnJSeveralHigh svg')
							.datum(MobileActiveData)
							.call(chart);
					}
					 else if (groupName == "JnJCommulativeBg") {
						 d3.select('#JnJCommulativeBg svg')
 							 .datum(MobileActiveData)
 							 .call(chart);
					 }
					 else if (groupName == "JnJBg") {
						 d3.select('#JnJBg svg')
								 .datum(MobileActiveData)
								 .call(chart);
					 }
					 else if (groupName == "JnJCumuManualBg") {
						 d3.select('#JnJCumuManualBg svg')
								 .datum(MobileActiveData)
								 .call(chart);
					 }
					 else if (groupName == "JnJManualBg") {
						 d3.select('#JnJManualBg svg')
 							 .datum(MobileActiveData)
 							 .call(chart);
					 }
					 else if (groupName == "JnJFoodLog") {
						 d3.select('#JnJFoodLog svg')
 							 .datum(MobileActiveData)
 							 .call(chart);
					 }
					 else if (groupName == "JnJTotalClinic") {
						 d3.select('#JnJTotalClinic svg')
 							 .datum(MobileActiveData)
 							 .call(chart);
					 }
					 else if (groupName == "JnJHCPS") {
						 d3.select('#JnJHCPS svg')
							 .datum(MobileActiveData)
							 .call(chart);
					 }
					 else if (groupName == "JnJHCPAssets") {
						 d3.select('#JnJHCPAssets svg')
							 .datum(MobileActiveData)
							 .call(chart);
					 }
					 else if (groupName == "JnJ2Net") {
						d3.select('#JnJ2Net svg')
							.datum(MobileActiveData)
							.call(chart);
					}
					else if (groupName == "JnJHCPActive") {
					 d3.select('#JnJHCPActive svg')
						 .datum(MobileActiveData)
						 .call(chart);
				 }
				 else if (groupName == "JnJAvgTest") {
					d3.select('#JnJAvgTest svg')
						.datum(MobileActiveData)
						.call(chart);
				}
				else if (groupName == "JnJAvgFrq") {
				 d3.select('#JnJAvgFrq svg')
					 .datum(MobileActiveData)
					 .call(chart);
			 }
			 else if (groupName == "JnJTotalPatient") {
				d3.select('#JnJTotalPatient svg')
					.datum(MobileActiveData)
					.call(chart);
			}
			else if (groupName == "JnJPatientDevice") {
			d3.select('#JnJPatientDevice svg')
				.datum(MobileActiveData)
				.call(chart);
		}
		else if (groupName == "JnJPatientCreate") {
		d3.select('#JnJPatientCreate svg')
			.datum(MobileActiveData)
			.call(chart);
	}
	else if (groupName == "JnJPatientDeviceThisMonth") {
	d3.select('#JnJPatientDeviceThisMonth svg')
		.datum(MobileActiveData)
		.call(chart);
	}
	else if (groupName == "JnJpatientclinic") {
	d3.select('#JnJpatientclinic svg')
		.datum(MobileActiveData)
		.call(chart);
	}
	else if (groupName == "JnJBLE") {
	d3.select('#JnJBLE svg')
		.datum(MobileActiveData)
		.call(chart);
	}
	else if (groupName == "JnJpatientopted") {
	d3.select('#JnJpatientopted svg')
		.datum(MobileActiveData)
		.call(chart);
	}
        nv.utils.windowResize(chart.update);
        return chart;
    });
}
function multiBarHorizontalChart(MobileActiveData,lblxAxis,lblyAxis,groupName)
{
var chart;
    nv.addGraph(function() {
        chart = nv.models.multiBarHorizontalChart()
            .x(function(d) { return d.label })
            .y(function(d) { return d.value })
            .duration(250)
            .showControls(true)
            .showLegend(true)
            .legendPosition("top")
            .controlsPosition("top")
            .margin({left: 100})
            .stacked(true);

        chart.yAxis.tickFormat(d3.format(',.2f'));

        chart.yAxis.axisLabel(lblyAxis);
        chart.xAxis.axisLabel(lblxAxis).axisLabelDistance(20);
				if (groupName == "JnJIos")
				{
	        	d3.select('#JnJIos svg')
	            .datum(MobileActiveData)
	            .call(chart);
				}
        nv.utils.windowResize(chart.update);
        return chart;
    });
}
function BulletChart(data,title,subtitle,marklabel,rangelabel,measurelabel,groupName)
{

     dataWithLabels = [{
        "title": title,
        "subtitle":subtitle,
        "ranges":[25,50,100],
        "measures":[data],
        "markers":[50, 100],
        "markerLines":[50,100],
        "markerLabels":marklabel,
       //"markerLineLabels":['Break even Inventory', 'Threshold Inventory'],
        "rangeLabels":rangelabel,
        "measureLabels":measurelabel
    }];

    var chart2 = nv.models.bulletChart()

		// if(groupName == "JnJPercentageIncrease")
		// {
 	// 	var vis2 = d3.select("#JnJPercentageIncrease").selectAll("svg")
    //     .data(dataWithLabels)
    //     .enter().append('svg')
    //     .attr('class',"bullet nvd3")
    //     vis2.call(chart2);
    // }
		// else if (groupName ==  "JnJPerpatientAsso") {
		// 	var vis2 = d3.select("#JnJPerpatientAsso").selectAll("svg")
	  //       .data(dataWithLabels)
	  //       .enter().append('svg')
	  //       .attr('class',"bullet nvd3")
	  //       vis2.call(chart2);
		//
		// }
		 if (groupName == "JnJBulPerPatientDevice") {
			var vis2 = d3.select("#JnJBulPerPatientDevice").selectAll("svg")
	        .data(dataWithLabels)
	        .enter().append('svg')
	        .attr('class',"bullet nvd3")
	        vis2.call(chart2);

		}
	}
function simpleLineChart(MobileActiveData,lblxAxis,lblyAxis,groupName)
{
   nv.addGraph(function() {
  var chart = nv.models.lineChart()
                .useInteractiveGuideline(true)
               // .transitionDuration(350)  //how fast do you want the lines to transition?
                .showLegend(false)       //Show the legend, allowing users to turn on/off line series.
                .showYAxis(true)        //Show the y-axis
                .showXAxis(true)        //Show the x-axis
              //  .margin({top: 5, right: 50, bottom: 110, left: 80})
  ;


 chart.xAxis
    .axisLabel(lblxAxis)
    .tickFormat(function(d) {
          //  return d3.time.format('%x')(new Date(d))
					return d3.time.format('%d/%m/%y')(new Date(d))
          });

  chart.yAxis     //Chart y-axis settings
      .axisLabel(lblyAxis)
      .tickFormat(d3.format('.02f'));
if (groupName == "JnJKaiser") {
  /* Done setting the chart up? Time to render it!*/
  d3.select('#JnJKaiser svg')    //Select the <svg> element you want to render the chart in.
      .datum(MobileActiveData)         //Populate the <svg> element with chart data...
      .call(chart);          //Finally, render the chart!
}
else if (JnJWalgreen) {
	/* Done setting the chart up? Time to render it!*/
	d3.select('#JnJWalgreen svg')    //Select the <svg> element you want to render the chart in.
			.datum(MobileActiveData)         //Populate the <svg> element with chart data...
			.call(chart);          //Finally, render the chart!
}


  //Update the chart when window resizes.
  nv.utils.windowResize(function() { chart.update() });
  return chart;
});

}
