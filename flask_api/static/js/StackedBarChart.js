

function stackedBarChart(MobileActiveData,lblxAxis,lblyAxis)
{
nv.addGraph({
			generate: function () {
				var width = nv.utils.windowSize().width,
					height = nv.utils.windowSize().height;

				var chart = nv.models.multiBarChart()
					//  .width(width)
					//  .height(height)
		     		 .stacked(true)
		     		 //.margin({top: 50, right: 50, bottom: 110, left: 75}		     		 	)
					;

					 chart.xAxis
            		 .axisLabel(lblxAxis);

					  chart.yAxis
            		 .axisLabel(lblyAxis);

				chart.dispatch.on('renderEnd', function () {
					console.log('Render Complete');
				});

					var svg = d3.select('#JnJVisualization svg').datum(MobileActiveData);
					svg.transition().duration(0).call(chart);



 				nv.utils.windowResize(chart.update);
				return chart;
			}
			// callback: function (graph) {
			// 	nv.utils.windowResize(function () {
			// 		var width = nv.utils.windowSize().width;
			// 		var height = nv.utils.windowSize().height;
			// 		graph.width(width).height(height);

			// 		d3.select('#JnJVisualization svg')
			// 			// .attr('width', width)
			// 			// .attr('height', height)
			// 			.transition().duration(0)
			// 			.call(graph);

			// 	});
			// }
		});
}
