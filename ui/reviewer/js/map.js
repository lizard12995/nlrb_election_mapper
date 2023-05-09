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
      radius: 5,
      weight: 1.5,
    },
  })
    .bindTooltip(layer => {
    return layer.feature.properties['City'];
    })
  .addTo(map);
  
  map.numElectionsLayer = L.geoJSON(null, {
    pointToLayer: (feature, latlng) => L.circleMarker(latlng),
    style: (feature) => {
        var numElections = feature.properties['num_elections'];
        if (numElections <= 2) {
            return ({
                color: "#004e89",
                fillColor: "#50a5d3",
                radius: 5,
                weight: 1.5,
                });
          } else if (numElections <= 4) {
            return ({
              color: "#004e89",
              fillColor: "#50a5d3",
              radius: 10,
              weight: 1.5,
              });
          } else {
            return ({
                color: "#004e89",
                fillColor: "#50a5d3",
                radius: 15,
                weight: 1.5,
                });
          }
      }
    })
    .bindTooltip(layer => {
    return layer.feature.properties['num_elections'].toString();
    })
  .addTo(map);

  map.voterTurnoutLayer = L.geoJSON(null, {
    pointToLayer: (feature, latlng) => L.circleMarker(latlng),
    style:  (feature) => {
      var percVoters = feature.properties['voter_turnout'];
      if (percVoters == 0) {
        return ({
            color: "#e60000",
            fillColor: "#e60000",
            radius: 1,
            weight: 1.5,
            });
      } else if (percVoters <= 83) {
          return ({
              color: "#efd3b7",
              fillColor: "#efd3b7",
              radius: 5,
              weight: 1.5,
              });
        } else if (percVoters < 93){
          return ({
              color: "#d8914a",
              fillColor: "#d8914a",
              radius: 5,
              weight: 1.5,
              });
        } else {
          return ({
            color: "#594d3d",
            fillColor: "#594d3d",
            radius: 5,
            weight: 1.5,
            });
        }
    }
  })
    .bindTooltip(layer => {
    return layer.feature.properties['voter_turnout'].toString() + "%";
    })
  .addTo(map);

  map.unionWinsLayer = L.geoJSON(null, {
    pointToLayer: (feature, latlng) => L.circleMarker(latlng),
    style: (feature) => {
      var percWins = feature.properties['tot_wins'];
      if (percWins == 0) {
        return ({
            color: "#e60000",
            fillColor: "#e60000",
            radius: 1,
            weight: 1.5,
            });
      } else if (percWins <= 2) {
          return ({
              color: "#cb9cf2",
              fillColor: "#ead7fa",
              radius: 5,
              weight: 1.5,
              });
        } else if (percWins <= 50) {
          return ({
              color: "#745F93",
              fillColor: "#A884CC",
              radius: 5,
              weight: 1.5,
              });
        } else {
          return ({
            color: "#211C2B",
            fillColor: "#635380",
            radius: 5,
            weight: 1.5,
            });
        }
    }
  })
    .bindTooltip(layer => {
    return layer.feature.properties['tot_wins'].toString() + "%";
    })
  .addTo(map);

  var legend = L.control({position: 'bottomright'});

  legend.onAdd = () => {
    var div = L.DomUtil.create('div', 'info-legend');
    return div;
    };
    legend.addTo(map);


  return map;
};


export {
  initMap,

};