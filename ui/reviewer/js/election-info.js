const dataListEl = document.querySelector('#data-list'); 
const dataTitleEl = document.querySelector('.election-info-title')

//show most recent data as "last updated" and "earliest data from" most recent
function showCityDataInList(feature, app) {
    var title = `<h3>${feature.properties['City']}</h3>`
    var cityElectionData = `<ul>
        <li>${feature.properties['elig_vote_pop']+' eligible voter(s) in recent elections'}</li>
        <li>${feature.properties['num_elections']+' election(s) within the last month'}</li>
        <li>${feature.properties['tot_wins']+' election(s) won'}</li>
        <li>${feature.properties['perc_win']+'% elections won'}</li>
        <li>${feature.properties['tot_challenged']+' challenged ballot(s)'}</li>
        <li>${feature.properties['tot_voted']+' total voter(s) in all recent elections'}</li>
        <li>${feature.properties['voter_turnout']+'% voter turnout'}</li>
    </ul>`;
    dataListEl.innerHTML = cityElectionData;
    dataTitleEl.innerHTML = title;
  }

export {
    showCityDataInList
};