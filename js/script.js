// Key Api 
const key = '4c18124e';
const urlApi= 'https://www.omdbapi.com/?';

const formBusquedaNav = document.getElementById('busqueda-nav');
const formBusquedaMain = document.getElementById('busqueda-main');
const formBusquedaSidenav = document.getElementById('busqueda-sidenav');

const mostrarListaBusqueda = document.querySelector('.container-movies');

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
            <div class="movie-item">
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

                        <a href="detalle-peli.html?id=${id}" class ="btn btn-mas">Ver Más</a>
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

// Buscar y mostrar películas según la búsqueda del usuario
async function buscadorPelicula(buscar){
    buscar.preventDefault(); // previene el envío predeterminado
    const input = buscar.target.querySelector('input[type="text"]').value.trim();
    try{
        const url = `${urlApi}s=${input}&page=1&apikey=${key}`;
        const resultado = await fetch(`${url}`);
        const data = await resultado.json();
            
        if (data.Search){
            listaPeliculas(data.Search);
        }

    } catch (error){
        console.error("Error en el buscador", error);
    }
}

// Añadir eventos a los formularios
if (formBusquedaNav) formBusquedaNav.addEventListener('submit', buscadorPelicula);
if (formBusquedaMain) formBusquedaMain.addEventListener('submit', buscadorPelicula);
if (formBusquedaSidenav) formBusquedaSidenav.addEventListener('submit', buscadorPelicula);

//obtener y mostrar peliculas aleatorias en la pagina Home
async function cargarPeliculaHome(){
    try{
        //selecciona desde un array de categorias la pelicula aleatoria

        const buscarPelicula = ["action", "comedy", "drama", "horror", "romance", "thriller"];
        //
        const peliculaAleatoria = buscarPelicula[Math.floor(Math.random() * buscarPelicula.length)];
        const url = `${urlApi}S=${peliculaAleatoria}&page=1&apikey=${key}`;
        const resultado = await fetch(url);
        const data = await resultado.json();
        
        if (data.Search){
            listaPeliculas(data.Search);
        }
    } catch(error){
        console.error("Error en cargar las peliculas en Home", error);
    }
}

document.addEventListener("DOMContentLoaded", cargarPeliculaHome);

const mostrarPelicula = (id) => {
    window.location.href = "http://127.0.0.1:5500/detalle-peli.html?id=" + id;
}


document.addEventListener('DOMContentLoaded', () => {
    // Obtener el botón de historial una vez que el DOM esté cargado
    const btnHistorial = document.getElementById('btnHistorial');

    // Agregar evento de clic al botón de historial
    btnHistorial.addEventListener('click', () => {
        //console.log('boton historial clikeado');
      
        window.location.href = 'vistos.html';
    });

});

if(navigator.serviceWorker){
    navigator.serviceWorker.register('./sw.js').then(()=>{
        console.info("registrado");
    })
    .catch(()=>{
        console.error("fallo");
    });
}


function guardarDato(){
    const name =document.getElementById("name").value;
    const url =document.getElementById("url").value;
    const age =document.getElementById("age").value;
    const nuevoRegistro={
        name,
        url,
        age
    }
    console.log( nuevoRegistro);
    alert("funciona")
}