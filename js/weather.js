const form = document.querySelector('.Main_search-bar');
const favoritesList = document.querySelector('.Main_space_container-added_locations');
const searchButton = document.querySelector('.Main_search-bar_search-img');
const searchLocationInput = document.querySelector('.Main_search-bar_input')
const selectedCity = document.querySelector('.Main-space_container-one_weather_location');
const selectedCityTemp = document.querySelector('.Main-space_container-one_weather_degrees');
const selectedCityWeather = document.querySelector('.Main-space_container-one_weather_pic');
const saveLocation = document.querySelector('.Main-space_container-one_weather_add-to-favorite');
const PAGE_DETAILS = document.querySelector('.Main-space_container-one_weather_locations_page2');
const PAGE_NOW = document.querySelector('.Main-space_container-one_weather');
const BUTTON_NOW = document.querySelector('.Main-space_container-one_buttons_now');
const BUTTON_DETAILS = document.querySelector('.Main-space_container-one_buttons_details');
const BUTTON_FORECAST = document.querySelector('.Main-space_container-one_buttons_forecast');
const detailsName = document.querySelector('.weather-locations_names');
const detailsTemp = document.querySelector('.weather-locations_temp');
const detailsFeelsLike = document.querySelector('.weather-locations_feels');
const detailsWeatherType = document.querySelector('.weather-locations_weather-type');
const detailsSunrise = document.querySelector('.weather-locations_sunrise');
const detailsSunset = document.querySelector('.weather-locations_sunset');



const SERVER_URL = 'http://api.openweathermap.org/data/2.5/weather';
const API_KEY = 'f660a2fb1e4bad108d6160b7f58c555f';

let favoriteNames = [];
let lastLocation = showLastLocation();

import {
    showFavoriteCities,
    saveInStorage,
    showLastLocation,
    FavoriteCities
} from "./module.js";



BUTTON_NOW.addEventListener('click', () => {
    if (BUTTON_NOW.classList.contains('active_button')) {
        return
    } else {
        BUTTON_NOW.classList.add('active_button');
        BUTTON_FORECAST.classList.remove('active_button');
        BUTTON_DETAILS.classList.remove('active_button');
        PAGE_DETAILS.classList.add('hide_page');
        PAGE_NOW.classList.remove('hide_page');
    }

})

BUTTON_DETAILS.addEventListener('click', () => {
    if (BUTTON_DETAILS.classList.contains('active_button')) {
        return
    } else {
        BUTTON_DETAILS.classList.add('active_button');
        BUTTON_FORECAST.classList.remove('active_button');
        BUTTON_NOW.classList.remove('active_button');
        PAGE_NOW.classList.add('hide_page');
        PAGE_DETAILS.classList.remove('hide_page')
    }

})


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
    if (favoriteNames.includes(searchLocationInput.value)) {
        alert('location is on the list')
    } else {
        addToFavoriteList
            (searchLocationInput.value);
    };
})

favoritesList.addEventListener('click', deleteItem);
favoritesList.addEventListener('click', showWeather);


function showDetails() {

}


function showListOnDisplay(item) {
    const favoriteList = document.querySelector('.Main_space_container-added_locations_list');
    let button = document.createElement('button');
    button.id = item;
    button.className = 'Main_space_container-added_locations-item';
    let p = document.createElement('p');
    p.textContent = item;
    p.className = 'Main_space_container-added_locations_name';
    button.appendChild(p);

    let input = document.createElement('input');
    input.type = 'image';
    input.className = 'remImg';
    input.id = 'remove_img'
    input.src = '/img/remove.png';
    button.appendChild(input);
    favoriteList.appendChild(button);
}

function weather(cityName) {

    const url = (`${SERVER_URL}?q=${cityName}&appid=${API_KEY}`);

    fetch(url)
        .then((response) => {
            return response.json();
        })

        .then((data) => {
            changeNOW(data.name, data.main.temp, data.weather)
            changeDetails(data.name, data.main.temp, data.main.feels_like, data.weather[0].main, changeTimeDate(data.sys.sunrise), changeTimeDate(data.sys.sunset))
        })
        .catch((err) => {
            if (err.status === undefined) {
                alert("Данный город не найден");
            }
        });
}

function addToFavoriteList(cityName) {
    showListOnDisplay(cityName);
    weather(cityName);
    favoriteNames.push(cityName);
    saveInStorage(favoriteNames);
}

function openFavoriteList() {
    let actualList = showFavoriteCities();
    actualList.forEach(el => {
        showListOnDisplay(el);
    });
}

function deleteItem(event) {
    if (event.target.classList.contains('remImg')) {
        const parentNode = event.target.closest('.Main_space_container-added_locations-item');
        favoriteNames = favoriteNames.filter(e => {
            return e !== parentNode.textContent
        })
        parentNode.remove();
        return localStorage.setItem('savedLocation', JSON.stringify(favoriteNames));
    };
}

function showWeather(event) {
    if (event.target.classList.contains('Main_space_container-added_locations_name')) {
        let Name = event.target.textContent;
        weather(Name);
    }
}

function changeTimeDate(time){
let unixTimeType =  new Date (time*1000);
let hours = unixTimeType.getUTCHours().toString().padStart(2,0);
let minutes = unixTimeType.getUTCMinutes().toString().padStart(2,0);
let newTime = `${hours}:${minutes}`
return newTime;
}

function changeNOW(name, temp, icon) {
    selectedCity.textContent = name;
    selectedCityTemp.innerHTML = Math.round(temp - 273) + '&deg;';
    selectedCityWeather.src = (`http://openweathermap.org/img/wn/${icon[0]['icon']}@2x.png`);
}

function changeDetails(name, temp, feels, wtype, sunrise, sunset) {
    detailsName.textContent = name;
/*     detailsTemp.textContent = `Temperature:   ${(Math.round(temp - 273))}`;
    detailsFeelsLike.textContent = `Feels like:  ${Math.round(feels - 273)}`; */
    detailsTemp.innerHTML = 'Temperature: ' + (Math.round(temp - 273)) + '&deg;';
    detailsFeelsLike.innerHTML = 'Feels Like: ' + (Math.round(feels - 273)) + '&deg;';
    detailsWeatherType.textContent = `Weather: ${wtype}`;
    detailsSunrise.textContent = `Sunrise: ${sunrise}`;
    detailsSunset.textContent = `Sunset: ${sunset}`;
}





window.onload = () => {
    openFavoriteList();
    weather(lastLocation);
    favoriteNames = FavoriteCities(favoriteNames);
}