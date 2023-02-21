const form = document.querySelector('.Main_search-bar');
const searchButton = document.querySelector('.Main_search-bar_search-img');
const searchLocationInput = document.querySelector('.Main_search-bar_input')
const selectedCity = document.querySelector('.Main-space_container-one_weather_location');
const selectedCityTemp = document.querySelector('.Main-space_container-one_weather_degrees');
const selectedCityWeather = document.querySelector('.Main-space_container-one_weather_pic');

form.addEventListener('submit', function(e) {
    e.preventDefault();
    weather(searchLocationInput.value)
});

searchButton.addEventListener('click',(e)=>{
    e.preventDefault();
    weather(searchLocationInput.value)
})


function weather(cityName) {

    const serverUrl = 'http://api.openweathermap.org1/data/2.5/weather';
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

        .catch((err)=>{
           if(err.status ==404){
            alert("Данный город не найден");
           };
        })
}
