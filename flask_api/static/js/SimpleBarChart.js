function simpleBarChart(MobileActiveData,lblxAxis,lblyAxis)
{
nv.addGraph(function() {
        var chart = nv.models.discreteBarChart()
            .x(function(d) { return d.label })
            .y(function(d) { return d.value })
            .staggerLabels(true)
            //.staggerLabels(historicalBarChart[0].values.length > 8)
            .showValues(true)
            .duration(250)
            .margin({top: 5, right: 50, bottom: 110, left: 75})
            ;

             chart.xAxis
                     .axisLabel(lblxAxis);

                      chart.yAxis
                     .axisLabel(lblyAxis);

        d3.select('#JnJVisualization svg')
            .datum(MobileActiveData)
            .call(chart);

        nv.utils.windowResize(chart.update);
        return chart;
    });
}
