import { downloadData } from './data.js';
import { initMap} from './map.js';
import { showCityDataInList } from './election-info.js';
import { createDataforGraph, createGraphs, testGraph } from './graphs.js';
import { clearLegend, fillLegend1, fillLegend2, fillLegend3 } from './legend.js';


//app is a global variable that stores name the value of the current city
let app = {
  currentCity: null,
};

const map = initMap();
const radioButtons = document.querySelectorAll('.filter-radio-button');
const legendEl = document.querySelector('.info-legend.leaflet-control');


function onDataLoad(data) {
    createGraphs(createDataforGraph(data,'num_elections','tot_voted'),"myChart1");
    }
function graphData() {
    downloadData(onDataLoad);
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


//display parks markers on map when you want
for (const button of radioButtons){
  button.addEventListener('click', (evt) => {
    map.dataLayer.clearLayers();
    map.numElectionsLayer.clearLayers();
    map.voterTurnoutLayer.clearLayers();
    map.unionWinsLayer.clearLayers();
      if (button.id == "default-button"){
        mapData();
      } else  if (button.id == "num-elections-button"){
        mapNumElectionsData();
        clearLegend(legendEl);
        fillLegend1(legendEl);
      } else if (button.id== "voter-turnout-button"){
        mapVoterTurnoutData();
        clearLegend(legendEl);
        fillLegend2(legendEl);
      } else {
        mapUnionWinsData();
        clearLegend(legendEl);
        fillLegend3(legendEl);
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
graphData();
setupInteractionEvents();
testGraph();

window.app = app;
window.mapview = map;

