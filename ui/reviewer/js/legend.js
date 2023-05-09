//would be cool if in the future we get the breakpoints to be calculated and updated as the data is updated

const size_num_elections = ['10px', '15px', '20px'];
const labels_num_elections = ["1-2 elections", "3-4 elections", "5-100 elections"];

const size_perc = ['10px', '10px', '10px', '1px']

const colors_voter_turnout = ["#efd3b7", "#d8914a", "#594d3d", "#e60000"];
const fill_voter_turnout = ['rgba(239, 211, 183,0.3)', 'rgba(216, 145, 74,0.3)', 'rgba(89, 77, 61,0.3)', "#e60000"];
const labels_voter_turnout = ["1-83% turnout", "84-92% turnout", "93-100% turnout", "no turnout"];

const colors_union_wins = ["#cb9cf2", "#745F93", "#211C2B", "#e60000"];
const fill_union_wins = [ 'rgba(234, 215, 250,0.3)', 'rgba(168, 132, 204,0.3)', 'rgba(99, 83, 128,0.3)', "#e60000"];
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
    div.innerHTML = '<h3>Cities with union elections</h3> <i style="background: rgba(196, 223, 200,0.3); border: 2px solid #6cae75; width: 10px; height: 10px"></i> ' +
            ("City" + '<br>');
    return div;
};

function fillLegend1(div){
    div.innerHTML = '<h3>Number of union elections per city</h3>'
    for (var i = 0; i < size_num_elections.length; i++) {
        div.innerHTML +=
            '<span style="width:' + size_num_elections[i]+ '; height: '+size_num_elections[i] +'"></span> ' +
            (labels_num_elections[i] + '<br>');
    }
    return div;
};

function fillLegend2(div){
    div.innerHTML = '<h3>Percent voter turnout per city</h3>'
    for (var i = 0; i < colors_voter_turnout.length; i++) {
        div.innerHTML +=
            '<i style="background:' + fill_voter_turnout[i]+ '; border: 2px solid'+ colors_voter_turnout[i] + ';width:' + size_perc[i]+ '; height: '+size_perc[i] +'"></i> ' +
            (labels_voter_turnout[i] + '<br>');
    }
    return div;
};

function fillLegend3(div){
    div.innerHTML = '<h3>Percent union election wins per city</h3>'
    for (var i = 0; i < colors_union_wins.length; i++) {
        div.innerHTML +=
            //'<i style="background:' + colors_union_wins[i] + labels_union_wins[i]+ '"></i> ';
            '<i style="background:' + fill_union_wins[i]+ '; border: 2px solid'+ colors_union_wins[i] + ';width:' + size_perc[i]+ '; height: '+size_perc[i] +'"></i> '
            +(labels_union_wins[i]+'<br>');
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
