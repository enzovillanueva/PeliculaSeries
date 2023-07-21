
const apiKey = "a3aa373a1b65bb41fd52cf0fab69bb46";
const urlMovie = "https://api.themoviedb.org/3/movie/popular";
const urlImage = "https://image.tmdb.org/t/p/w500/";
const urlSeries = "https://api.themoviedb.org/3/tv/popular";

const query = location.search.substring(1);
console.log(query)

let pages = 1;
const buttonPrev = document.getElementById("prev"),
buttonNext = document.getElementById("next");

document.title = (query == 'movies' ? "Directorio de peliculas" : "Directorio de series");
document.getElementById("title_directory").innerHTML = (query == 'movies' ? "Directorio de peliculas" : "Directorio de series");

buttonNext.addEventListener("click",() =>{
    if (pages < 3){
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
    const response = await fetch(`${(query == 'movies') ? urlMovie : urlSeries}?api_key=${apiKey}&language=es-MX&page=${pages}`);
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
        <a href="../pages/vista.html?${(query == 'movies')  ? "P" + element.id : "S" + element.id}" class="film">
            <img class="poster" src="${urlImage}${element.poster_path}"></img>
            <div class="titulo">${(query == 'movies') ? element.title : element.name}</div>
        </a>
        `
    });

    document.getElementById("listados").innerHTML = box;
}