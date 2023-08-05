const apiKey = "a3aa373a1b65bb41fd52cf0fab69bb46";
const urlMovie = "https://api.themoviedb.org/3/movie/";
const urlImage = "https://image.tmdb.org/t/p/w500/";
const urlTV = "https://api.themoviedb.org/3/tv/top_rated";

const arrowIcons_1 = document.querySelectorAll(".icon_1 ion-icon"),
arrowIcons_2 = document.querySelectorAll(".icon_2 ion-icon"),
seccionContent = document.querySelectorAll(".popular");

const rated = document.getElementById("rated"),
week = document.getElementById("week"),
day = document.getElementById("day");

const items = document.querySelectorAll(".option"),
marcador = document.querySelector("#marcador");

const search = document.getElementById("buscar"),
value = document.getElementById("values");

// Buscador.
search.addEventListener("click", () => {
    location.href = `../pages/busqueda.html?${value.value}`;
});

// Marcador.
items.forEach( opcion => {
    opcion.addEventListener("click", (e) => {
        indicador(e.target);
    });
});

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
        console.log(data)
        addDataHTML(data, 'popular');
    }
}

rated.addEventListener("click", () => {
    series("https://api.themoviedb.org/3/tv/top_rated");
});

week.addEventListener("click", () => {
    series("https://api.themoviedb.org/3/trending/tv/week");
});

day.addEventListener("click", () => {
    series("https://api.themoviedb.org/3/trending/tv/day");
});

// Apartado de series.
const series = async (link) => {
    const response = await fetch(`${link}?api_key=${apiKey}&language=es-MX`)
    if (response.status == 200){
        const data = await response.json();
        console.log(data)
        addDataHTML(data, "series");
    }
}

// Funciones.
popularFilms();
series(urlTV);

function addDataHTML(data, label){
    let box = '';
    data.results.forEach(element => {
        box += `
            <!-- Si clickeo en algunas de estas peliculas, se enviará el ID de las mismas a la otra pág.-->
            <a href="pages/vista.html?${(label == 'popular')  ? "P" + element.id : "S" + element.id}" class="film">
                <img class="poster" src="${urlImage}${element.poster_path}"></img>
                <div class="titulo">${(label == 'popular') ? element.title : element.name}</div>
            </a>`
    });
    document.getElementById(label).innerHTML = box;
}

function configIcon(number, arrow) {
    let scroll= Math.round(seccionContent[number].scrollLeft);
    let scrollMax= seccionContent[number].scrollWidth - seccionContent[number].clientWidth;
    arrow[0].parentElement.style.display = scroll > 0 ? "flex" : "none";
    arrow[1].parentElement.style.display = scrollMax > scroll ? "flex" : "none";
}

function indicador(link) {
    marcador.style.left = link.offsetLeft+"px";
    marcador.style.width = link.offsetWidth+"px";
}