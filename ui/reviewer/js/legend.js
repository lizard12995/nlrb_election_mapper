//would be cool if in the future we get the breakpoints to be calculated and updated as the data is updated
const colors_num_elections = ["#004e89", "#004e89", "#004e89"];
const fill_num_elections = ["#50a5d3", "#50a5d3", "#50a5d3"];
const labels_num_elections = ["1-2 elections", "3-4 elections", "5-100 elections"];

const colors_voter_turnout = ["#efd3b7", "#d8914a", "#594d3d", "#e60000"];
//fill colors the same
const labels_voter_turnout = ["1-83% turnout", "84-92% turnout", "93-100% turnout", "0% turnout"];

const colors_union_wins = ["#cb9cf2", "#745F93", "#211C2B", "#e60000"];
const fill_union_wins = [ "#ead7fa","#A884CC", "#635380", "#e60000"];
const labels_union_wins = ["1-25% won", "26-50% won", "51-100% won"];

function clearLegend(div){
    div.innerHTML = "";
    return div;
};

function fillLegend1(div){

    for (var i = 0; i < colors_num_elections.length; i++) {
        div.innerHTML +=
            '<i style="background:' + colors_num_elections[i]+ '"></i> ' +
            labels_num_elections[i];
    }
    return div;
};

function fillLegend2(div){

    for (var i = 0; i < colors_voter_turnout.length; i++) {
        div.innerHTML +=
            '<i style="background:' + colors_voter_turnout[i]+ '"></i> ' +
            labels_voter_turnout[i];
    }
    return div;
};

function fillLegend3(div){

    for (var i = 0; i < colors_union_wins.length; i++) {
        div.innerHTML +=
            '<i style="background:' + colors_union_wins[i]+ '"></i> ' +
            labels_union_wins[i];
    }
    return div;
};

export {
    clearLegend,
    fillLegend1,
    fillLegend2,
    fillLegend3
};
