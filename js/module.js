
function showFavCities() {

    const favarray = JSON.parse(localStorage.savedLocation);
    favarray.forEach(el => {
        const favoriteList = document.querySelector('.Main_space_container-added_locations_list');
        let button = document.createElement('button');
        button.id = el;
        button.className = 'Main_space_container-added_locations-item';

        let p = document.createElement('p');
        p.textContent = el;
        p.className = 'Main_space_container-added_locations_name';
        button.appendChild(p);

        let input = document.createElement('input');
        input.type = 'image';
        input.className = 'remImg';
        input.id = 'remove_img'
        input.src = '/src/remove.png';
        button.appendChild(input);
        favoriteList.appendChild(button);
    });
    return localStorage.setItem('savedLocation', JSON.stringify(favarray));
 }
        


export {showFavCities}; 

