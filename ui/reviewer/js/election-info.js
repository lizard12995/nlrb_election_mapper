const dataListEl = document.querySelector('#data-list'); 
const dataTitleEl = document.querySelector('.election-info-title')

function showCityDataInList(feature, app) {
    var title = `<h3>${feature.properties['City']}</h3>`
    var cityElectionData = `<ul>
        <li>${feature.properties['elig_vote_pop']+' eligible voters in recent elections'}</li>
        <li>${feature.properties['num_elections']+' elections within the last month'}</li>
        <li>${feature.properties['tot_wins']+' elections won'}</li>
        <li>${feature.properties['perc_win']+'% elections won'}</li>
        <li>${feature.properties['tot_challenged']+' challenged elections'}</li>
        <li>${feature.properties['tot_voted']+' total voters in all recent elections'}</li>
        <li>${feature.properties['voter_turnout']+'% voter turnout'}</li>
    </ul>`;
    dataListEl.innerHTML = cityElectionData;
    dataTitleEl.innerHTML = title;
  }

export {
    showCityDataInList
};