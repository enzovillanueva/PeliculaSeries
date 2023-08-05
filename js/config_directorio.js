
const apiKey = "a3aa373a1b65bb41fd52cf0fab69bb46";
const urlMovie = "https://api.themoviedb.org/3/movie/popular";
const urlMovieRated = "https://api.themoviedb.org/3/movie/top_rated";
const urlImage = "https://image.tmdb.org/t/p/w500/";
const urlSeries = "https://api.themoviedb.org/3/tv/popular";

const query = location.search.substring(1);
console.log(query);

// Buscador
const search = document.getElementById("buscar"),
value = document.getElementById("values");

search.addEventListener("click", () => {
    location.href = `../pages/busqueda.html?${value.value}`;
});

let pages = 1;
const buttonPrev = document.getElementById("prev"),
buttonNext = document.getElementById("next");

let URLpage = '';
if (query == 'series') {
    document.title = "Directorio de series";
    document.getElementById("title_directory").innerHTML = "Directorio de series";
    URLpage = urlSeries;
}else if (query == 'movies') {
    document.title = "Directorio de peliculas";
    document.getElementById("title_directory").innerHTML = "Directorio de peliculas";
    URLpage = urlMovie;
}else {
    document.title = "Mejores peliculas";
    document.getElementById("title_directory").innerHTML = "Mejores peliculas";
    URLpage = urlMovieRated;
}

buttonNext.addEventListener("click",() =>{
    if (pages < 20){
        pages++;
        addListHTML();
    }
});

buttonPrev.addEventListener("click",() =>{
    if (pages > 1){
        pages--;
        addListHTML();
    }
});

const addListHTML = async () => {
    const response = await fetch(`${URLpage}?api_key=${apiKey}&language=es-MX&page=${pages}`);
    if (response.status == 200){
        const data = await response.json();
        console.log(data);
        addElementList(data);
    }
};

addListHTML();

function addElementList(data){
    let box = "";
    data.results.forEach(element => {
        box += `
        <a href="../pages/vista.html?${(query == 'series')  ? "S" + element.id : "P" + element.id}" class="film">
            <img class="poster" src="${urlImage}${element.poster_path}"></img>
            <div class="titulo">${(query == 'series') ? element.name : element.title}</div>
        </a>
        `
    });

    document.getElementById("listados").innerHTML = box;
}