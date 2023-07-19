const apiKey = "a3aa373a1b65bb41fd52cf0fab69bb46";
const urlMovie = "https://api.themoviedb.org/3/movie/";
const urlImage = "https://image.tmdb.org/t/p/w500/";

const arrowIcons_1 = document.querySelectorAll(".icon_1 ion-icon"),
arrowIcons_2 = document.querySelectorAll(".icon_2 ion-icon"),
seccionContent = document.querySelectorAll(".popular");

// Scroll Slice
arrowIcons_1.forEach(icon => {
    icon.addEventListener("click", () => {
        seccionContent[0].scrollLeft += icon.id === "left" ? -1000 : 1000;
        setTimeout(() => configIcon(0, arrowIcons_1), 50)
    });
});

arrowIcons_2.forEach(icon => {
    icon.addEventListener("click", () => {
        seccionContent[1].scrollLeft += icon.id === "left" ? -1000 : 1000;
        setTimeout(() => configIcon(1, arrowIcons_2), 50)
    });
});

// Apartado de peliculas.
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

// Apartado de series.
const series = async () => {
    const response = await fetch(`https://api.themoviedb.org/3/trending/tv/week?api_key=${apiKey}&language=es-MX`)
    if (response.status == 200){
        const data = await response.json();
        console.log(data)
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
            <!-- Si clickeo en algunas de estas peliculas, se enviará el ID de las mismas a la otra pág.-->
            <a href="pages/vista.html?P${element.id}" class="film">
                <img class="poster" src="${urlImage}${element.poster_path}"></img>
                <div class="titulo">${element.title}</div>
            </a>`
    });
    document.getElementById("popular").innerHTML = box;
}

function addSeriesHTML(data){
    let box = '';
    data.results.forEach(element => {
        box += `
            <a href="pages/vista.html?S${element.id}" class="film">
                <img class=poster src="${urlImage}${element.poster_path}"></img>
                <div class="titulo">${element.name}</div>
            </a>`
    });
    document.getElementById("series").innerHTML = box;
}

function configIcon(number, arrow) {
    let scroll= Math.round(seccionContent[number].scrollLeft);
    let scrollMax= seccionContent[number].scrollWidth - seccionContent[number].clientWidth;
    arrow[0].parentElement.style.display = scroll > 0 ? "flex" : "none";
    arrow[1].parentElement.style.display = scrollMax > scroll ? "flex" : "none";
}