//would be cool if in the future we get the breakpoints to be calculated and updated as the data is updated
const colors_num_elections = ["#004e89", "#004e89", "#004e89"];
const fill_num_elections = ["#50a5d3", "#50a5d3", "#50a5d3"];
const labels_num_elections = ["1-2 elections", "3-4 elections", "5-100 elections"];

const colors_voter_turnout = ["#efd3b7", "#d8914a", "#594d3d", "#e60000"];
//fill colors the same
const labels_voter_turnout = ["1-83% turnout", "84-92% turnout", "93-100% turnout", "no voters"];

const colors_union_wins = ["#cb9cf2", "#745F93", "#211C2B", "#e60000"];
const fill_union_wins = [ "#ead7fa","#A884CC", "#635380", "#e60000"];
const labels_union_wins = ["1-25% won", "26-50% won", "51-100% won","no wins"];

function clearLegend(div){
    div.innerHTML = "";
    return div;
};

//keeping test legend for educational purposes to make legend more responsive to updated data
function testLegend(div){
    var grades = [0, 10, 20, 50, 100, 200, 500, 1000];
    var labels = [];

    function getColor(d) {
      return d > 1000 ? '#800026' :
             d > 500  ? '#BD0026' :
             d > 200  ? '#E31A1C' :
             d > 100  ? '#FC4E2A' :
             d > 50   ? '#FD8D3C' :
             d > 20   ? '#FEB24C' :
             d > 10   ? '#FED976' :
                        '#FFEDA0';
  }

    // loop through our density intervals and generate a label with a colored square for each interval
    div.innerHTML = '<h3>Legend</h3>'
    for (var i = 0; i < grades.length; i++) {
      //this could be the argument to feed in to replace legend
      //or keep track of legend of with .remove()
        div.innerHTML +=
            '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
            grades[i] + 
            (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
    }
};

function defaultLegend(div){
    div.innerHTML = '<h3>Legend</h3> <i style="background: #6cae75"></i> ' +
            ("City" + '<br>');
    return div;
};

function fillLegend1(div){
    div.innerHTML = '<h3>Legend</h3>'
    for (var i = 0; i < colors_num_elections.length; i++) {
        div.innerHTML +=
            '<i style="background:' + colors_num_elections[i]+ '"></i> ' +
            (labels_num_elections[i] + '<br>');
    }
    return div;
};

function fillLegend2(div){
    div.innerHTML = '<h3>Legend</h3>'
    for (var i = 0; i < colors_voter_turnout.length; i++) {
        div.innerHTML +=
            '<i style="background:' + colors_voter_turnout[i]+ '"></i> ' +
            (labels_voter_turnout[i] + '<br>');
    }
    return div;
};

function fillLegend3(div){
    div.innerHTML = '<h3>Legend</h3>'
    for (var i = 0; i < colors_union_wins.length; i++) {
        div.innerHTML +=
            //'<i style="background:' + colors_union_wins[i] + labels_union_wins[i]+ '"></i> ';
            '<i style="background:' + colors_union_wins[i] +  '"></i> '+(labels_union_wins[i]+'<br>');
    }
    return div;
};

export {
    clearLegend,
    testLegend,
    defaultLegend,
    fillLegend1,
    fillLegend2,
    fillLegend3
};
