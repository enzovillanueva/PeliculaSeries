
const apiKey = "a3aa373a1b65bb41fd52cf0fab69bb46",
urlMovie = "https://api.themoviedb.org/3/movie/",
urlTV = "https://api.themoviedb.org/3/tv/",
urlImage = "https://image.tmdb.org/t/p/w500/";


// Obtengo el ID de la pelicula o serie.
const query = location.search.substring(1);
const type = query[0], id = query.slice(1);

const title = document.getElementById("titulo"),
poster = document.getElementById("poster"),
sinopsis = document.getElementById("sinopsis"),
rate = document.getElementById("rate");

// circle progress.
const circular_progress = document.querySelector(".circle"),
value_cp = document.querySelector(".value-circle");

let progreso = 0, progresoFinal = 60, velocidad = 10;

const information = async () => {
    const response = await fetch(`${type == 'P'? urlMovie : urlTV }${id}?api_key=${apiKey}&language=es-MX`);
    if (response.status == 200){
        const data = await response.json();
        console.log(data)
        addInformation(data, type);
    }
}

const progress = setInterval(() => {
    progreso++;
    value_cp.textContent = `${progreso}%`;
    circular_progress.style.background = `conic-gradient(#b5179e ${progreso * 3.6}deg, #4a4e69 ${progreso * 3.6}deg)`;
    if (progreso == progresoFinal) clearInterval(progress);
}, velocidad)

information();

function addGenres(data) {
    let box = "";
    data.genres.forEach(element => {
        box += `
        <div class="genero">${element.name}</div>
        `
    });
    document.getElementById("genres").innerHTML = box;
}

function addInformation(data, type) {
    document.title = (type == 'P') ? data.title : data.name;
    date_type = (type == 'P') ?  data.release_date : data.first_air_date;
    title.innerHTML = `${type == 'P' ? data.title : data.name} (${date_type.slice(0,4)})`;
    poster.src = `${urlImage}${data.poster_path}`;
    sinopsis.innerHTML = data.overview;
    progresoFinal = Math.round(data.vote_average * 10);
    addGenres(data);
}

