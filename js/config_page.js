const apiKey = "a3aa373a1b65bb41fd52cf0fab69bb46";
const urlMovie = "https://api.themoviedb.org/3/movie/";
const urlImage = "https://image.tmdb.org/t/p/w500/";

const popularFilms = async () => {
    const response = await fetch(`${urlMovie}popular?api_key=${apiKey}&language=es-MX`);
    if (response.status == 200) {
        const data = await response.json();
        addFilmsHTML(data);
    }else if (response.status == 401){
        console.log("La llave esta MAL");
    }else if (response.status == 404){
        console.log("La pelicula NO existe");
    }
}

const series = async () => {
    const response = await fetch(`https://api.themoviedb.org/3/trending/tv/week?api_key=${apiKey}&language=es-MX`)
    if (response.status == 200){
        const data = await response.json();
        console.log(data);
        addSeriesHTML(data);
    }
}

// Funciones.
popularFilms();
series();


function addFilmsHTML(data){
    let box = '';
    data.results.forEach(element => {
        box += `
            <div class="film">
                <img class="poster" src="${urlImage}${element.poster_path}"></img>
                <h3 class="titulo">${element.title}</h3>
            </div>`
    });
    document.getElementById("popular").innerHTML = box;
}

function addSeriesHTML(data){
    let box = '';
    data.results.forEach(element => {
        box += `
            <div class="film">
                <img class=poster src="${urlImage}${element.poster_path}"></img>
                <h3 class=titulo>${element.name}</h3>
            </div>`
    });
    document.getElementById("series").innerHTML = box;
}