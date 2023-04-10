const KEY = 'savedLocation'

function saveInStorage(array) {
    return localStorage.setItem(KEY, JSON.stringify(array));



}

function setCookie(name, value, options = {}) {

    options = {
        path: '/',

        ...options
    };

    if (options.expires instanceof Date) {
        options.expires = options.expires.toUTCString();
    }

    let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);

    for (let optionKey in options) {
        updatedCookie += "; " + optionKey;
        let optionValue = options[optionKey];
        if (optionValue !== true) {
            updatedCookie += "=" + optionValue;
        }
    }

    document.cookie = updatedCookie;
}


function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

function FavoriteCities(farray) {
    const array = JSON.parse(localStorage.getItem(KEY));
    farray = farray.concat(array);
    return farray;
}


function showLastLocation() {
    const array = JSON.parse(localStorage.getItem(KEY));
    let currentC = array[array.length - 1];
    return currentC;
}

export {
    saveInStorage,
    showLastLocation,
    FavoriteCities,
    setCookie,
    getCookie
};