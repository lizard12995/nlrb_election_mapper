import { downloadData } from './data.js';
import { initMap} from './map.js';
import { showCityDataInList } from './election-info.js';


//app is a global variable that stores name the value of the current city
let app = {
  currentCity: null,
};

const map = initMap();
const checkboxes = document.querySelectorAll('.filter-checkbox');

function onDataLoad(data) {
    map.dataLayer.addData(data);
    }
function mapData() {
    downloadData(onDataLoad);
};

mapData();

function onNumElectionsDataLoad(data) {
    map.numElectionsLayer.addData(data);
    }
function mapNumElectionsData() {
    downloadData(onNumElectionsDataLoad);
};

function onVoterTurnoutDataLoad(data) {
    map.voterTurnoutLayer.addData(data);
    }
function mapVoterTurnoutData() {
    downloadData(onVoterTurnoutDataLoad);
};

function onUnionWinsDataLoad(data) {
    map.unionWinsLayer.addData(data);
    }
function mapUnionWinsData() {
    downloadData(onUnionWinsDataLoad);
};


//display parks markers on map when you want
for (const checkbox of checkboxes){
  checkbox.addEventListener('change', (evt) => {
      if (evt.target.checked){
          if (checkbox.value == 1){
            map.dataLayer.clearLayers();
            mapNumElectionsData();
          } else  if (checkbox.value == 2){
            map.dataLayer.clearLayers();
            mapVoterTurnoutData();
          } else {
            map.dataLayer.clearLayers();
            mapUnionWinsData();
          }
      } else {
          if (checkbox.value == 1){
            map.numElectionsLayer.clearLayers();
            mapData();
          } else  if (checkbox.value == 2){
            map.voterTurnoutLayer.clearLayers();
            mapData();
          } else {
            map.unionWinsLayer.clearLayers();
            mapData();
          }
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

setupInteractionEvents();

window.app = app;
window.mapview = map;