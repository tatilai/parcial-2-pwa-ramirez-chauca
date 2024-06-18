//key de API OMDb
const key = "4c18124e";

const buscarPelicula = document.getElementById("Input");
const mostrarListaBusqueda = document.getElementsByClassName("container-movies");

//consultar datos por URL
async function fetchPelicula(id){
    try{
        const url = `http://www.omdbapi.com/?i=${id}&apikey=${key}`;
        const respuesta = await fetch(url)
        if (!respuesta.ok){
            throw new Error ("No hubo una conexion realizada"); 
        }
        const data = await respuesta.json();
        return data;
    }catch (error){
        console.error ("error en obtener peliculas", error);
    }
}

//crear los items peliculas
async function listaPeliculas(peliculas){
    try {
        //recorro el array map y genero el HTML para visualizar la pelicula
        const elementosPelicula = peliculas.map(pelicula => {
            const poster = pelicula.Poster !== "N/A" ? pelicula.Poster : "No hay un poster de pelicula";
            const id = pelicula.imdbID;
            return`
            <div class="movie-item"
                <div class="poster-movie">
                    <a href="detalle-peli.html?id=${id}">
                    <img src="${poster}" alt="Poster de la pelicula"></a>
                </div>
                <div class="movie-detalles>
                    <div class"movie">
                        <div>
                            <p class="movie-name"><a href="detalle-peli.html?id=${id}">${pelicula.Title}</a></p>
                            <p class="movie-year"><a href="detalle-peli.html?id=${id}">${pelicula.Year}</a></p>
                        </div>
                    </div>
                </div>
            </div>`;
        })
        .join("");
        
        const container = document.querySelector(".container-movies");
        container.innerHTML = elementosPelicula;
        console.log(peliculas);

    }catch (error){
        console.error("Error en mostrar las peliculas en Inicio", error);
    }
}

