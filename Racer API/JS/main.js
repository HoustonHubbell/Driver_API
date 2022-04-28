const form = document.querySelector('#seasonRoundForm')

form.addEventListener('submit', (event) => {
    event.preventDefault();
    let season = document.querySelector('#season')
    let round = document.querySelector('#round')

    console.log(season) 
    console.log(round)
})



const getData = async (season, round) => {
    let response = await axios.get(`https://ergast.com/api/f1/${season}/${round}/driverStandings.json`)
    console.log(response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings)
    return response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings
}
console.log(getData())

const DOM_Elements = {
    racers: '.racer-list'
}

const createRacer = (position, first, last, nationality, sponsor, points) => {
    const html = `<table class="table table-dark table-striped">
    
        <thead>
            <tr>
                <th scope="col">Position</th>
                <th scope="col">Name</th>
                <th scope="col">Nationality</th>
                <th scope="col">Sponsor</th>
                <th scope="col">Points</th>
            </tr>
         </thead>
         <tbody>
             <tr>
                <th scope="row">${position}</th>
                <td>${first} ${last}</td>
                <td>${nationality}</td>
                <td>${sponsor}</td>
                <td>${points}</td>
            </tr>
        </tbody>
    </table>`

    document.querySelector(DOM_Elements.racers).insertAdjacentHTML('beforeend',html)



}

const loadData = async () => {
    clearData()
    const racerList = await getData(season.value, round.value);
    racerList.forEach( racer => createRacer( racer.position, racer.Driver.givenName, racer.Driver.familyName,  racer.Driver.nationality, racer.Constructors[0].name, racer.points))
}

const clearData = () => {
    document.querySelector(DOM_Elements.racers).innerHTML = '';
}