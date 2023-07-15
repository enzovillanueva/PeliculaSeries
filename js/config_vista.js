
const apiKey = "a3aa373a1b65bb41fd52cf0fab69bb46",
url = "https://api.themoviedb.org/3/movie/",
urlImage = "https://image.tmdb.org/t/p/w500/";


// Obtengo el ID de la pelicula o serie.
const cons = location.search.substring(1);
console.log(cons);

const title = document.getElementById("titulo"),
poster = document.getElementById("poster"),
sinopsis = document.getElementById("sinopsis"),
rate = document.getElementById("rate");

const information = async () => {
    const response = await fetch(`${url}${cons}?api_key=${apiKey}&language=es-MX`);
    if (response.status == 200){
        const data = await response.json();
        console.log(data)
        title.innerHTML = data.original_title;
        poster.src = `${urlImage}${data.poster_path}`;
        sinopsis.innerHTML = data.overview;
        rate.innerHTML = `${data.release_date} - ${data.vote_average}`;
    };
}

information();