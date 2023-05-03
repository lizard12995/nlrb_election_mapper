//const url = "C:/Users/sofia/Documents/GitHub/Union_Election_Mapper/ui/reviewer/data/data.geojson";
//"https://github.com/SofiaFasullo/NLRB_Election_Mapper/blob/main/ui/reviewer/data/data.geojson"; //CORS issue

function downloadData(onSuccess, onFailure) {
    fetch('data/data.geojson')
    .then(resp => {
      if (resp.status === 200) {
        const data = resp.json();
        return data;
      } else {
        alert('Oh no, I failed to download the data.');
        if (onFailure) { onFailure() }
      }
    })
    .then(onSuccess);
  }

export{
    downloadData
}