function saveInStorage(array) {
    return localStorage.setItem('savedLocation', JSON.stringify(array));
}

function FavCities(farray) {
    const array = JSON.parse(localStorage.savedLocation);
    farray = farray.concat(array);
    return farray;
}

function showFavCities() {

    const favarray = JSON.parse(localStorage.savedLocation);
    return favarray;
}

function showLastLocation() {
    const array = JSON.parse(localStorage.savedLocation);
    let currentC = array[array.length - 1];
    return currentC;
}

export {
    showFavCities,
    saveInStorage,
    showLastLocation,
    FavCities
};