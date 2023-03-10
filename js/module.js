const KEY = 'savedLocation'

function saveInStorage(array) {
    return localStorage.setItem(KEY, JSON.stringify(array));
}

function FavoriteCities(farray) {
    const array = JSON.parse(localStorage.getItem(KEY));
    farray = farray.concat(array);
    return farray;
}

function showFavoriteCities() {

    const favarray = JSON.parse(localStorage.getItem(KEY));
    return favarray;
}

function showLastLocation() {
    const array = JSON.parse(localStorage.getItem(KEY));
    let currentC = array[array.length - 1];
    return currentC;
}

export {
    showFavoriteCities,
    saveInStorage,
    showLastLocation,
    FavoriteCities
};