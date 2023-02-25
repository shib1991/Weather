const form = document.querySelector('.Main_search-bar');
const favoritesList = document.querySelector('.Main_space_container-added_locations');
const searchButton = document.querySelector('.Main_search-bar_search-img');
const searchLocationInput = document.querySelector('.Main_search-bar_input')
const selectedCity = document.querySelector('.Main-space_container-one_weather_location');
const selectedCityTemp = document.querySelector('.Main-space_container-one_weather_degrees');
const selectedCityWeather = document.querySelector('.Main-space_container-one_weather_pic');
const saveLocation = document.querySelector('.Main-space_container-one_weather_add-to-favorite');
const deleteAtFavoritesButton = document.querySelectorAll('.remImg');
const favoriteItems = document.querySelectorAll('.Main_space_container-added_locations-item');
let savedName;
let favoritNames = [];
let favoritNamesFiltered = [];



form.addEventListener('submit', function (e) {
    e.preventDefault()
    weather(searchLocationInput.value);
});



searchButton.addEventListener('click', (e) => {
    e.preventDefault()
    weather(searchLocationInput.value);
})



saveLocation.addEventListener('click', function (e) {
    e.preventDefault();
    if (searchLocationInput.value === "") {
        alert('Location is undefined')
        return
    }
    if (favoritNames.includes(searchLocationInput.value)) {
        alert('location is on the list')
    } else {
        addToFavotite(searchLocationInput.value);
    };
})

favoritesList.addEventListener('click', deleteItem);
favoritesList.addEventListener('click', showWeather);



function weather(cityName) {
    const serverUrl = 'http://api.openweathermap.org/data/2.5/weather';
    const apiKey = 'f660a2fb1e4bad108d6160b7f58c555f';
    const url = (`${serverUrl}?q=${cityName}&appid=${apiKey}`);

    fetch(url)
        .then((response) => {
            return response.json();

        })

        .then((data) => {
            selectedCity.textContent = data.name;
            selectedCityTemp.innerHTML = Math.round(data.main.temp - 273) + '&deg;';
            selectedCityWeather.src = (`http://openweathermap.org/img/wn/${data.weather[0]['icon']}@2x.png`);
        })
        .catch((err) => {
            if (err.status === undefined) {
                alert("Данный город не найден");
            }
        });
}


function addToFavotite(cityName) {
    const favoriteList = document.querySelector('.Main_space_container-added_locations_list');
    let button = document.createElement('button');
    button.id = cityName;
    button.className = 'Main_space_container-added_locations-item';

    let p = document.createElement('p');
    p.textContent = cityName;
    p.className = 'Main_space_container-added_locations_name';
    button.appendChild(p);

    let input = document.createElement('input');
    input.type = 'image';
    input.className = 'remImg';
    input.id = 'remove_img'
    input.src = '/src/remove.png';
    button.appendChild(input);
    favoriteList.appendChild(button);
    weather(cityName);
    favoritNames.push(cityName);
    favoritNamesFiltered.push(cityName);
    return localStorage.setItem('savedLocation', JSON.stringify(favoritNames));
}

function deleteItem(event) {
    if (event.target.classList.contains('remImg')) {
        const parentNode = event.target.closest('.Main_space_container-added_locations-item');
        favoritNamesFiltered = favoritNames.filter(e => {
            return e !== parentNode.textContent
        })
        parentNode.remove();
        favoritNames = favoritNamesFiltered;
        return localStorage.setItem('savedLocation', JSON.stringify(favoritNames));
    };

}




function showWeather(event) {
    if (event.target.classList.contains('Main_space_container-added_locations_name')) {
        cityName = event.target.textContent;
        weather(cityName);
    }
}



window.onload = () => {
 let larray = JSON.parse(localStorage.savedLocation);
 for ( let key of larray ){
    addToFavotite(key);
 }
}
