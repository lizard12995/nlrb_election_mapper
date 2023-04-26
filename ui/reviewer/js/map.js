

//https://storage.cloud.google.com/musa509-nlrb-election-mapper-raw-data/latest_nlrb.csv
//gs://musa509-nlrb-election-mapper-raw-data/latest_nlrb.csv
function initMap() {
  const map = L.map('map-container').setView([40.5, -77], 7);

  const mapboxAccount = 'mapbox';
  const mapboxStyle = 'light-v10';
  const mapboxToken = 'pk.eyJ1Ijoia2VlbGJuIiwiYSI6ImNqaWVseGZjZzA3emMzdnAxM296OTFjNG8ifQ.W2j9Y2mz4t6vGRyKJk_Nyw';
  L.tileLayer(`https://api.mapbox.com/styles/v1/${mapboxAccount}/${mapboxStyle}/tiles/256/{z}/{x}/{y}@2x?access_token=${mapboxToken}`, {
      maxZoom: 19,
      attribution: '© <a href="https://www.mapbox.com/about/maps/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> <strong><a href="https://www.mapbox.com/map-feedback/" target="_blank">Improve this map</a></strong>',
  }).addTo(map);

  map.dataLayer = L.geoJSON(null, {
    pointToLayer: (feature, latlng) => L.circleMarker(latlng),
    style: {
      color: "#6cae75",
      fillColor: "#c4dfc8",
    },
  })
    .bindTooltip(layer => {
    return layer.feature.properties['City'];
    })
  .addTo(map);

  map.numElectionsLayer = L.geoJSON(null, {
    pointToLayer: (feature, latlng) => L.circleMarker(latlng),
    style: {
      color: "#50a5d3",
      fillColor: "#b9dbed",
      radius: 15
    },
  })
    .bindTooltip(layer => {
    return layer.feature.properties['num_elections'].toString();
    })
  .addTo(map);

  map.voterTurnoutLayer = L.geoJSON(null, {
    pointToLayer: (feature, latlng) => L.circleMarker(latlng),
    style: {
      color: "#d8914a",
      fillColor: "#efd3b7",
      radius: 15
    },
  })
    .bindTooltip(layer => {
    return layer.feature.properties['voter_turnout'].toString();
    })
  .addTo(map);

  map.unionWinsLayer = L.geoJSON(null, {
    pointToLayer: (feature, latlng) => L.circleMarker(latlng),
    style: {
      color: "#cb9cf2",
      fillColor: "#ead7fa",
      radius: 15
    },
  })
    .bindTooltip(layer => {
    return layer.feature.properties['tot_wins'].toString();
    })
  .addTo(map);

  return map;
};


export {
  initMap,

};