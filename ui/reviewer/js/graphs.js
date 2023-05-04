//idea is to make a for loop to populate a matrix with x and y values to graph
//this would run after the data has been loaded



function createDataforGraph(data,x,y) {
    const XY = [];
    for (const element of data.features) {
        let newThing = {
            "x": element.properties[x],
            "y": element.properties[y],
          }
          XY.push(newThing);
        };
    return XY;
}

// here would make a different for loop to create frquency of a variable, so specific to histograpms

//idea would be to run this after createData for graph has happened
function createGraphs(preparedData, chartID) {
    const myChart = new Chart(chartID, {
    type: "scatter",
    data: {
        datasets: [{
          pointRadius: 4,
          pointBackgroundColor: "rgba(0,0,255,1)",
          data: preparedData,
        }]
      },
      options:{}
  });
  return myChart;
}


function testGraph() {
    const xyValues = [
        {x:50, y:7},
        {x:60, y:8},
        {x:70, y:8},
        {x:80, y:9},
        {x:90, y:9},
        {x:100, y:9},
        {x:110, y:10},
        {x:120, y:11},
        {x:130, y:14},
        {x:140, y:14},
        {x:150, y:15}
      ];
      
      const myChart = new Chart("testGraph", {
        type: "scatter",
        data: {
          datasets: [{
            pointRadius: 4,
            pointBackgroundColor: "rgba(0,0,255,1)",
            data: xyValues
          }]
        },
        options:{}
      });
  return myChart;
}

export{
    createGraphs,
    createDataforGraph,
    testGraph
}