import { downloadData } from './data.js';
import { initMap} from './map.js';
import { showCityDataInList } from './election-info.js';
import { createDataforGraph, createGraphs } from './graphs.js';
import { clearLegend, testLegend, defaultLegend, fillLegend1, fillLegend2, fillLegend3 } from './legend.js';


//app is a global variable that stores name the value of the current city
let app = {
  currentCity: null,
};

const map = initMap();
const radioButtons = document.querySelectorAll('.filter-radio-button');
const legendEl = document.querySelector('.info-legend.leaflet-control');
const xAxis = document.querySelector(".x-axis");


function graphMap1(data) {
  createGraphs(createDataforGraph(data,'tot_wins','elig_vote_pop'),"myChart","#6cae75");
}
function graphMap2(data) {
  createGraphs(createDataforGraph(data,'num_elections','elig_vote_pop'),"myChart","#50a5d3");
}
function graphMap3(data) {
  createGraphs(createDataforGraph(data,'voter_turnout','elig_vote_pop'),"myChart","#d8914a");
}
function graphMap4(data) {
  createGraphs(createDataforGraph(data,'perc_win','elig_vote_pop'),"myChart","#cb9cf2");
}

function onMapDataLoad(data) {
  map.dataLayer.addData(data);
  }
function mapData() {
    downloadData(onMapDataLoad);
}

function onNumElectionsDataLoad(data) {
    map.numElectionsLayer.addData(data);
    }
function mapNumElectionsData() {
    downloadData(onNumElectionsDataLoad);
}

function onVoterTurnoutDataLoad(data) {
    map.voterTurnoutLayer.addData(data);
    }
function mapVoterTurnoutData() {
    downloadData(onVoterTurnoutDataLoad);
}

function onUnionWinsDataLoad(data) {
    map.unionWinsLayer.addData(data);
    }
function mapUnionWinsData() {
    downloadData(onUnionWinsDataLoad);
}


//might be an issue with too many overlapping maps
for (const button of radioButtons){
  button.addEventListener('click', (evt) => {
    map.dataLayer.clearLayers();
    map.numElectionsLayer.clearLayers();
    map.voterTurnoutLayer.clearLayers();
    map.unionWinsLayer.clearLayers();
      if (button.id == "default-button"){
        mapData();
        clearLegend(legendEl);
        defaultLegend(legendEl);
        downloadData(graphMap1);
        xAxis.innerHTML = "total union wins";
      } else  if (button.id == "num-elections-button"){
        mapNumElectionsData();
        clearLegend(legendEl);
        fillLegend1(legendEl);
        downloadData(graphMap2);
        xAxis.innerHTML = "number of elections";
      } else if (button.id== "voter-turnout-button"){
        mapVoterTurnoutData();
        clearLegend(legendEl);
        fillLegend2(legendEl);
        downloadData(graphMap3);
        xAxis.innerHTML = "percent voter turnout";
      } else {
        mapUnionWinsData();
        clearLegend(legendEl);
        fillLegend3(legendEl);
        downloadData(graphMap4);
        xAxis.innerHTML = "percent union wins";
    }
  });
}

// display data of specific city upon click
function onCityClicked(evt) {
  const city = evt.layer.feature;
  app.currentCity = city;
  showCityDataInList(city, app);
}

function setupInteractionEvents() {
  map.dataLayer.addEventListener('click', onCityClicked);
  map.numElectionsLayer.addEventListener('click', onCityClicked);
  map.voterTurnoutLayer.addEventListener('click', onCityClicked);
  map.unionWinsLayer.addEventListener('click', onCityClicked);
}

mapData();
defaultLegend(legendEl);
setupInteractionEvents();
downloadData(graphMap1);
xAxis.innerHTML = "total union wins";

window.app = app;
window.mapview = map;

