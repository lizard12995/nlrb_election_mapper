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
function createGraphs(preparedData, chartID, color) {
    const myChart = new Chart(chartID, {
    type: "scatter",
    data: {
        datasets: [{
          pointRadius: 4,
          pointBackgroundColor: color,
          data: preparedData,
        }]
      },
      options:{}
  });
  return myChart;
}



export{
    createGraphs,
    createDataforGraph
}