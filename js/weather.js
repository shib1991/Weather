const form = document.querySelector('.Main_search-bar');
const searchButton = document.querySelector('.Main_search-bar_search-img');
const searchLocationInput = document.querySelector('.Main_search-bar_input')
const selectedCity = document.querySelector('.Main-space_container-one_weather_location');
const selectedCityTemp = document.querySelector('.Main-space_container-one_weather_degrees');
const selectedCityWeather = document.querySelector('.Main-space_container-one_weather_pic');
const saveLocation = document.querySelector('.Main-space_container-one_weather_add-to-favorite');
const deleteAtFavoritesButton = document.querySelector('.remImg');









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
    if(searchLocationInput.value===""){
        alert('Location is undefined')
    }else{
    addToFavotite(searchLocationInput.value);
};
})

deleteAtFavoritesButton.addEventListener('click',deleteAtFavorite);


/* deleteAtFavoritesButton.addEventListener('click', function (e) {
    e.preventDefault();
    console.log('Не чувствую');
}); */







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
    let div = document.createElement('div');
    div.id = cityName;
    div.className = 'Main_space_container-added_locations-item';

    let p = document.createElement('p');
    p.textContent = cityName;
    p.className = 'Main_space_container-added_locations_name';
    div.appendChild(p);

    let input = document.createElement('input');
    input.type = 'image';
    input.className = 'remImg';
    input.id = 'remove_img'
    input.src = '/src/remove.png';
    div.appendChild(input);

    favoriteList.appendChild(div);
    weather(cityName);
}

function deleteAtFavorite(event) {
    const child = event.clossest('remImg');
    const parentNode = event.clossest('.Main_space_container-added_locations_list');
parentNode.remove(child);

}