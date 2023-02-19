const form = document.querySelector('.Main_search-bar');
const searchButton = document.querySelector('.Main_search-bar_search-img');
const searchLocationInput = document.querySelector('.Main_search-bar_input')


/* searchButton.addEventListener('click', weather(searchLocationInput.value));
searchButton.addEventListener('submit', );
 */


function weather(cityName) {

    const serverUrl = 'http://api.openweathermap.org/data/2.5/weather';
    const apiKey = 'f660a2fb1e4bad108d6160b7f58c555f';
    const url = (`${serverUrl}?q=${cityName}&appid=${apiKey}`);

    fetch(url)
        .then((response) => {
            return response.json();

        })
        .then((data) =>
            console.log(Math.round( data.main.temp - 273))); // Температура 
}


weather('London');