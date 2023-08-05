
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

// Buscador
const search = document.getElementById("buscar"),
value = document.getElementById("values");

document.getElementById("title").innerHTML += query.replace(/%20/g, " ");

search.addEventListener("click", () => {
    location.href = `../pages/busqueda.html?${value.value}`;
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
    consulta();
})

series.addEventListener("click", () => {
    type = "tv";
    consulta();
})

// Consulta.
const consulta = async () => {
    const response = await fetch(`${urlCollection}/${type}?query=${palabra}&api_key=${apiKey}&language=es-MX`)
    if (response.status == 200){
        const data = await response.json();
        console.log(data);
        document.documentElement.style.height = data.results.length < 6 ? "100%" : "";
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
    document.getElementById("results").innerHTML = box;
}