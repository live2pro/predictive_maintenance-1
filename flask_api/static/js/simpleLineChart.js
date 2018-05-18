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
