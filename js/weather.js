const form = document.querySelector('.Main_search-bar');
const favoritesList = document.querySelector('.Main_space_container-added_locations');
const searchButton = document.querySelector('.Main_search-bar_search-img');
const searchLocationInput = document.querySelector('.Main_search-bar_input')
const selectedCity = document.querySelector('.Main-space_container-one_weather_location');
const selectedCityTemp = document.querySelector('.Main-space_container-one_weather_degrees');
const selectedCityWeather = document.querySelector('.Main-space_container-one_weather_pic');
const saveLocation = document.querySelector('.Main-space_container-one_weather_add-to-favorite');
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
    input.src = '/src/remove.png';
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
        })
        .catch((err) => {
            if (err.status === undefined) {
                alert("Данный город не найден");
            }
        });
}

function addToFavoriteList
(cityName) {
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



function changeNOW(name, temp, icon) {
    selectedCity.textContent = name;
    selectedCityTemp.innerHTML = Math.round(temp - 273) + '&deg;';
    selectedCityWeather.src = (`http://openweathermap.org/img/wn/${icon[0]['icon']}@2x.png`);
}


window.onload = () => {
    openFavoriteList();
    weather(lastLocation);
    favoriteNames = FavoriteCities(favoriteNames);
}