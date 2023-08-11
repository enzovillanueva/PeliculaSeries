
const urlCollection = "https://api.themoviedb.org/3/search/",
apiKey = "a3aa373a1b65bb41fd52cf0fab69bb46",
urlImage = "https://image.tmdb.org/t/p/w500/";

let type = 'movie';

const query = location.search.substring(1);
let palabra = query.replace(/%20/g, "+");
console.log(palabra)

const items = document.querySelectorAll(".opcion"),
marcador = document.querySelector("#marcador");

const peliculas = document.getElementById("peliculas"),
series = document.getElementById("series");

// paginacion.
let pages = 1, limit_page = 1;
const buttonPrev = document.getElementById("prev"),
buttonNext = document.getElementById("next");

// Buscador
const search = document.getElementById("buscar"),
value = document.getElementById("values");

document.getElementById("title").innerHTML += query.replace(/%20/g, " ");

search.addEventListener("click", () => {
    location.href = `../pages/busqueda.html?${value.value}`;
});

buttonNext.addEventListener("click",() =>{
    pages++;
    consulta();
});

buttonPrev.addEventListener("click",() =>{
    pages--;
    consulta();
});

// Marcador.
items.forEach( opcion => {
    opcion.addEventListener("click", (e) => {
        indicador(e.target);
    });
});

// Tipo consultas.
peliculas.addEventListener("click", () => {
    type = "movie";
    pages = 1, limit_page = 1;
    consulta();
});

series.addEventListener("click", () => {
    type = "tv";
    pages = 1, limit_page = 1;
    consulta();
});

// Consulta.
const consulta = async () => {
    const response = await fetch(`${urlCollection}/${type}?query=${palabra}&api_key=${apiKey}&language=es-MX&page=${pages}`)
    if (response.status == 200){
        const data = await response.json();
        console.log(data);
        console.log(`pages = ${pages} - limit_page = ${limit_page}`);
        button_config(data);
        addDataHTML(data);
    }
};

consulta();


// FUNCIONES------------------------------
function indicador(link) {
    marcador.style.left = link.offsetLeft+"px";
    marcador.style.width = link.offsetWidth+"px";
}

function addDataHTML(data){
    let box = '';
    if (data.results.length == 0) {
        document.title = "No se encuentraron resultados";
        document.documentElement.style.height = "100%";
        document.getElementById("pie-pag").style.position = "absolute";
        box += "No se encontraron resultados.";
    }else{
        document.title = "Resultados de: " + query.replace(/%20/g, " ");
        data.results.forEach(element => {
            box += `
                <a href="../pages/vista.html?${type == "movie" ? "P" + element.id : "S" + element.id}" class="contenido">
                    <img class="poster" src="${element.poster_path == null ?
                         "../images/file-not-found.jpg" : 
                         urlImage + element.poster_path}"></>
                    <div class="titulo_poster">${(type == 'movie') ? element.title : element.name}</div>
                </a>
            `
        })
    }
    document.getElementById("num_pag").innerHTML = pages;
    document.getElementById("results").innerHTML = box;
}

function button_config(data){
    if (data.total_pages == 1) {
        buttonNext.style.display = "none";
    }else{
        limit_page = data.total_pages;
        if (pages > 1) {
            buttonPrev.style.display = "block";
        }
    }

    if (pages == 1) {
        buttonPrev.style.display = "none";
    }
    buttonNext.style.display = (pages == limit_page) ? "none" : "block";
}