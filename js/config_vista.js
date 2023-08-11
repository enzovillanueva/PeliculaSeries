
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

// Buscador.
const search = document.getElementById("buscar"),
value = document.getElementById("values");

// circle progress.
const circular_progress = document.querySelector(".circle"),
value_cp = document.querySelector(".value-circle");

let progreso = 0, progresoFinal = 60, velocidad = 10;

// Información.
const information = async () => {
    const response = await fetch(`${type == 'P'? urlMovie : urlTV }${id}?api_key=${apiKey}&language=es-MX`);
    if (response.status == 200){
        const data = await response.json();
        console.log(data)
        addInformation(data);
    }
}

search.addEventListener("click", () => {
    location.href = `../pages/busqueda.html?${value.value}`;
});

// Circle progress.
const progress = setInterval(() => {
    if (progresoFinal != 0) progreso++;
    value_cp.textContent = `${progreso}%`;
    circular_progress.style.background = `conic-gradient(#b5179e ${progreso * 3.6}deg, #4a4e69 ${progreso * 3.6}deg)`;
    if (progreso == progresoFinal) clearInterval(progress);
}, velocidad)

information();

// FUNCIONES------------------------------
function addGenres(data) {
    let box = "";
    if (data.genres.length == 0) {
        box = "No se especifica un genero."
    }else{
        data.genres.forEach(element => {
            box += `
            <div class="genero">${element.name}</div>
            `
        });
    }
    document.getElementById("genres").innerHTML = box;
}

function addRelease(data) {
    document.getElementById("estreno").innerHTML = `Fecha de estreno: ${(type == 'P') ? data.release_date : data.first_air_date}` ; 
}

function addInformation(data) {
    document.title = (type == 'P') ? data.title : data.name;
    date_type = (type == 'P') ?  data.release_date : data.first_air_date;
    title.innerHTML = `${type == 'P' ? data.title : data.name} (${date_type.slice(0,4)})`;
    poster.src = `${urlImage}${data.poster_path}`;
    sinopsis.innerHTML = data.overview.length == 0 ? "No hay una sinopsis" : data.overview;
    progresoFinal = Math.round(data.vote_average * 10);
    if (type == 'P') {
        document.getElementById("tag-line").innerHTML = data.tagline;
    }
    addGenres(data);
    addRelease(data);
}

