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
const PAGE_FORECAST = document.querySelector('.main-space_forecast');
const BUTTON_NOW = document.querySelector('.Main-space_container-one_buttons_now');
const BUTTON_DETAILS = document.querySelector('.Main-space_container-one_buttons_details');
const BUTTON_FORECAST = document.querySelector('.Main-space_container-one_buttons_forecast');
const detailsName = document.querySelector('.weather-locations_names');
const detailsTemp = document.querySelector('.weather-locations_temp');
const detailsFeelsLike = document.querySelector('.weather-locations_feels');
const detailsWeatherType = document.querySelector('.weather-locations_weather-type');
const detailsSunrise = document.querySelector('.weather-locations_sunrise');
const detailsSunset = document.querySelector('.weather-locations_sunset');
const forecastName = document.querySelector('.forecast_weather-locations_names');

const months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];

const SERVER_URL = 'http://api.openweathermap.org/data/2.5/weather';
const SERVER_URL_FORECAST = 'http://api.openweathermap.org/data/2.5/forecast'
const API_KEY = 'f660a2fb1e4bad108d6160b7f58c555f';


const cityName11 = {
    name: "",
    temp: "",
    tempFeelsLike: "",
    weatherType: "",
    sunrise: "",
    sunset: "",
    date: ["", ""],
    icon: ""
}

/* 
import { format } from 'date-fns'
 */
import {
    showFavoriteCities
} from "./DynModule.js";
import {
    saveInStorage,
    showLastLocation,
    FavoriteCities,
    setCookie,
    getCookie
} from "./module.js";

let favoriteNames = [];
setCookie("lastlocation", showLastLocation(), {
    secure: true,
    'max-age': 3600
});

BUTTON_NOW.addEventListener('click', () => {
    if (BUTTON_NOW.classList.contains('active_button')) {
        return
    } else {
        BUTTON_NOW.classList.add('active_button');
        BUTTON_FORECAST.classList.remove('active_button');
        BUTTON_DETAILS.classList.remove('active_button');
        PAGE_DETAILS.classList.add('hide_page');
        PAGE_NOW.classList.remove('hide_page');
        PAGE_FORECAST.classList.add('hide_page');
    }

})

BUTTON_FORECAST.addEventListener('click', () => {
    if (BUTTON_FORECAST.classList.contains('active_button')) {
        return
    } else {
        BUTTON_FORECAST.classList.add('active_button');
        BUTTON_NOW.classList.remove('active_button');
        BUTTON_DETAILS.classList.remove('active_button');
        PAGE_DETAILS.classList.add('hide_page');
        PAGE_NOW.classList.add('hide_page');
        PAGE_FORECAST.classList.remove('hide_page');
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
        PAGE_FORECAST.classList.add('hide_page');
    }
})

form.addEventListener('submit', function (e) {
    e.preventDefault();
    del();
    weather(searchLocationInput.value);
    forecast(searchLocationInput.value);
});

searchButton.addEventListener('click', (e) => {
    e.preventDefault();
    del();
    weather(searchLocationInput.value);
    forecast(searchLocationInput.value);
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


async function weather(cityName) {

    const url = (`${SERVER_URL}?q=${cityName}&cnt=5&appid=${API_KEY}`);

    try {
        let response = await fetch(url);
        let data = await response.json();
        cityName11.name = data.name
        cityName11.temp = data.main.temp
        cityName11.tempFeelsLike = data.main.feels_like
        cityName11.weatherType = data.weather[0].main

        /* cityName11.sunrise = format(data.sys.sunrise, 'HH:mm');
        cityName11.sunset = format(data.sys.sunset, 'HH:mm'); */
        cityName11.sunrise = changeTimeDate(data.sys.sunrise)
        cityName11.sunset = changeTimeDate(data.sys.sunset)
        changeNOW(data.name, data.main.temp, data.weather)
        changeDetails(cityName11)

    } catch (err) {
        if (err.status === undefined) {
            alert("Данный город не найден");
        }
    };
}



async function forecast(cityName) {

    const url = (`${SERVER_URL_FORECAST}?q=${cityName}&cnt=5&appid=${API_KEY}`);

    try {
        let response = await fetch(url);
        let forecast_data = await response.json();
        del();
        forecastName.textContent = forecast_data.city.name;
        for (let i = 0; i < forecast_data.list.length; i++) {
            createDailyWeather(
                forecast_data.list[i].dt,
                forecast_data.list[i].main.temp,
                forecast_data.list[i].main.feels_like,
                forecast_data.list[i].weather[0].main,
                forecast_data.list[i].weather[0].icon);
        }
    } catch (err) {
        return
    };
}

function createDailyWeather(dateArray, temp, feelsLike, weatherType, weatherTypeIcon) {
    Array = changeTimeDateForForecast(dateArray)
    let forecastdiv = document.createElement('div');
    forecastdiv.className = 'forecast_daily-weather';
    let dailyWeatherDateTime = document.createElement('div');
    dailyWeatherDateTime.className = 'daily-weather_date-and-time';
    let dailyWeatherDate = document.createElement('span');
    dailyWeatherDate.className = 'daily-weather_date';
    let dailyWeatherTime = document.createElement('span');
    dailyWeatherTime.className = 'daily-weather_time';
    let dailyWeatherTemptype = document.createElement('div');
    dailyWeatherTemptype.className = 'forecast_daily-weather_temp-and-type';
    let dailyWeatherTemp = document.createElement('div');
    dailyWeatherTemp.className = 'daily-weather_temp';
    let dailyWeatherTempDeg = document.createElement('p');
    dailyWeatherTempDeg.className = 'daily-weather_temp-deg';
    let dailyWeatherTempFeelslike = document.createElement('p');
    dailyWeatherTempFeelslike.className = 'daily-weather_temp-feels-like';
    let dailyWeatherType = document.createElement('div');
    dailyWeatherType.className = 'daily-weather_type';
    let dailyWeatherTypeName = document.createElement('p');
    dailyWeatherTypeName.className = 'daily-weather_type_name';
    let dailyWeatherTypeIcon = document.createElement('img');
    dailyWeatherTypeIcon.className = 'daily-weather_type_icon';

    dailyWeatherDate.textContent = Array[0];
    dailyWeatherTime.textContent = Array[1];
    dailyWeatherTempDeg.innerHTML = 'Temperature: ' + (Math.round(temp - 273)) + '&deg;';
    dailyWeatherTempFeelslike.innerHTML = 'Feels Like: ' + (Math.round(feelsLike - 273)) + '&deg;';
    dailyWeatherTypeName.textContent = `${weatherType}`;
    dailyWeatherTypeIcon.src = (`http://openweathermap.org/img/wn/${weatherTypeIcon}@2x.png`);


    PAGE_FORECAST.appendChild(forecastdiv)
    forecastdiv.appendChild(dailyWeatherDateTime);
    dailyWeatherDateTime.appendChild(dailyWeatherDate);
    dailyWeatherDateTime.appendChild(dailyWeatherTime);
    forecastdiv.appendChild(dailyWeatherTemptype);
    dailyWeatherTemptype.appendChild(dailyWeatherTemp);
    dailyWeatherTemp.appendChild(dailyWeatherTempDeg);
    dailyWeatherTemp.appendChild(dailyWeatherTempFeelslike);
    dailyWeatherTemptype.appendChild(dailyWeatherType);
    dailyWeatherType.appendChild(dailyWeatherTypeName);
    dailyWeatherType.appendChild(dailyWeatherTypeIcon);
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

function addToFavoriteList(cityName) {
    del();
    showListOnDisplay(cityName);
    weather(cityName);
    forecast(cityName);
    favoriteNames.push(cityName);
    saveInStorage(favoriteNames);
}


async function openFavoriteList() {
    await import('./DynModule.js');
    const actualList = showFavoriteCities();
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
        del();
        weather(Name);
        forecast(Name);
    }
}

function changeTimeDate(time) {
    let unixTimeType = new Date(time * 1000);
    let hours = unixTimeType.getUTCHours().toString().padStart(2, 0);
    let minutes = unixTimeType.getUTCMinutes().toString().padStart(2, 0);
    let newTime = `${hours}:${minutes}`
    return newTime;
}

function changeTimeDateForForecast(time) {
    let unixTimeType = new Date(time * 1000);
    let date = unixTimeType.getUTCDate().toString().padStart(2, 0);
    let month = unixTimeType.getUTCMonth().toString().padStart(2, 0);
    let hours = unixTimeType.getUTCHours().toString().padStart(2, 0);
    let minutes = unixTimeType.getUTCMinutes().toString().padStart(2, 0);
    month = Number(month);
    let newTime = `${hours}:${minutes}`
    let newDate = `${date}${months[month]}`
    let datearray = [
        newDate,
        newTime
    ]
    return datearray;
}

function changeNOW(name, temp, icon) {
    selectedCity.textContent = name;
    selectedCityTemp.innerHTML = Math.round(temp - 273) + '&deg;';
    selectedCityWeather.src = (`http://openweathermap.org/img/wn/${icon[0]['icon']}@2x.png`);
}

function changeDetails(cityName22 /* name, temp, feels, wtype, sunrise, sunset */ ) {
    let {
        name,
        temp,
        tempFeelsLike,
        weatherType,
        sunrise,
        sunset,
        ...rest
    } = cityName22;
    /* detailsName.textContent = name;
    detailsTemp.innerHTML = 'Temperature: ' + (Math.round(temp - 273)) + '&deg;';
    detailsFeelsLike.innerHTML = 'Feels Like: ' + (Math.round(feels - 273)) + '&deg;';
    detailsWeatherType.textContent = `Weather: ${wtype}`;
    detailsSunrise.textContent = `Sunrise: ${sunrise}`;
    detailsSunset.textContent = `Sunset: ${sunset}`; */
    detailsName.textContent = name;
    detailsTemp.innerHTML = 'Temperature: ' + (Math.round(temp - 273)) + '&deg;';
    detailsFeelsLike.innerHTML = 'Feels Like: ' + (Math.round(tempFeelsLike - 273)) + '&deg;';
    detailsWeatherType.textContent = `Weather: ${weatherType}`;
    detailsSunrise.textContent = `Sunrise: ${sunrise}`;
    detailsSunset.textContent = `Sunset: ${sunset}`;
}


function del() {
    let aa = document.querySelectorAll('.forecast_daily-weather');
    aa.forEach(e => {
        e.remove();
    })
}

window.onload = () => {
    openFavoriteList();
    del();
    if (getCookie("lastlocation") == undefined) {
        return
    } else {
        weather(getCookie("lastlocation"));
        forecast(getCookie("lastlocation"));
        favoriteNames = FavoriteCities(favoriteNames);
    };
}