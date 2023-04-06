const KEY = 'savedLocation'

export function showFavoriteCities() {

    const favarray = JSON.parse(localStorage.getItem(KEY));
    return favarray;
}
