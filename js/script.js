// Key Api 
const key ="4c18124e";

const buscarPelicula = document.getElementById("Input");
const mostrarListaBusqueda = document.getElementsByClassName("container-movies");

// consultar datos por URL
async function fetchPelicula(id){
    try{
        const URL =`http://www.omdbapi.com/?i=${id}&apikey=${key}`;
        const respuesta = await fetch(URL);
        if (!respuesta.ok){
            throw new Error ("No hubo una conexion realizada");
        }
        const data = await respuesta.json();
        return data;
    } catch(error){
        console.error("error en obtener la pelicula", error);
    }

}

async function listaPeliculas(peliculas){
    try{
        const elementosPelicula = peliculas.map(pelicula =>{
            const poster = pelicula.Poster !== "N/A" ? pelicula.Poster : "No hay un poster de pelicula";
            const id = pelicula.imdbID;
            return `
            <div class="movie-item"
                <div class="poster-movie">
                    <a href="detalle-peli.html?id=${id}">
                    <img src="${poster}" alt="Poster de la pelicula"></a>
                </div>
                <div class="movie-detalles">
                    <div class="movie">
                        <div>
                            <p class="movie-name"><a href="detalle-peli.html?id=${id}">${pelicula.Title}</a></p>
                            <p class="movie-year"><a href="detalle-peli.html?id=${id}">${pelicula.Year}</a></p>
                        </div>
                    </div>
                </div>
            </div>`
        })
        .join("");

        const container = document.querySelector(".container-movies");
        container.innerHTML = elementosPelicula;
        console.log(peliculas);
    } catch(error){
        console.error("Error en mostrar las peliculas en Inicio", error);
    }
}

//obtener y mostrar peliculas aleatorias en la pagina Home
async function cargarPeliculaHome(){
    try{
        //selecciona desde un array de categorias la pelicula aleatoria

        const buscarPelicula = ["action", "comedy", "drama", "horror", "romance", "thriller"];
        //
        const peliculaAleatoria = buscarPelicula[Math.floor(Math.random() * buscarPelicula.length)];
        const url = `https://www.omdbapi.com/?S=${peliculaAleatoria}&page=1&apikey=${key}`;
        const res = await fetch(url);
        const data = await res.json();
        
        if (data.Search){
            listaPeliculas(data.Search);
        }
    } catch(error){
        console.error("Error en cargar las peliculas en Home", error);
    }
}

document.addEventListener("DOMContentLoaded", cargarPeliculaHome);
