import { downloadData } from './data.js';
import { initMap} from './map.js';


const map=initMap();
function onDataLoad(data) {
    map.dataLayer.addData(data);
    }
function mapData() {
    downloadData(onDataLoad);
};

mapData();

const checkboxes = document.querySelectorAll('.filter-checkbox');

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
          console.log('you clicked on the checkbox ' + checkbox.value);
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
          console.log('you unclicked the checkbox ' + checkbox.value);
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


window.mapview = map;