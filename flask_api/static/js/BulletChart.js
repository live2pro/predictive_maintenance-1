function BulletChart(data,title,subtitle,marklabel,rangelabel,measurelabel)
{


  var dataWithLabels = "";
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
        var vis2 = d3.select("#JnJVisualization").selectAll("svg")
        .data(dataWithLabels)
        .enter().append('svg')
        .attr('class',"bullet nvd3")
        vis2.call(chart2.duration(1000));



        console.log(dataWithLabels);
    }
