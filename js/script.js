

// Función para mostrar un Toast con un mensaje
/*function mostrarToast(mensaje) {
    M.toast({html: mensaje});
}
*/





// Key Api 
const key = '4c18124e';
const urlApi= 'https://www.omdbapi.com/?';

const formBusquedaNav = document.getElementById('busqueda-nav');
const formBusquedaMain = document.getElementById('busqueda-main');
const formBusquedaSidenav = document.getElementById('busqueda-sidenav');

const mostrarListaBusqueda = document.querySelector('.container-movies');


//Funcion para mostrar toast
function mostrarToast(mensaje,tipo="info"){
    let clases ="";
    if(tipo === "error"){
         clases ="red darken-4";
        }
        M.toast({html:mensaje, classes:clases}); // Aquí se usa el mensaje pasado como argumento
}

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
        mostrarToast("Error en obtener la película", "error");
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
        mostrarToast("Error en mostrar las películas en Inicio", "error");
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
        mostrarToast("Error en el buscador", "error")
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
        mostrarToast("Error en cargar las películas en Home", "error");
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



let eventoDeInstalacion=null;

//registro de sw
navigator.serviceWorker.register('./sw.js').then(()=>{
       //mostrarToast({html:`Modo offline activado`}) 
       console.log("registrado");
      M.toast({html: `Modo offline activado`})
      //alert("online")
    })
    .catch(()=>{
        M.toast({html: `fallo registro service worker`})
        console.error("fallo");
    });


//Detectar cambio de conexion a online
window.addEventListener('online',()=>{
    console.log("activo")
    alert("estas online")
    //M.toast({html: 'Conexión restablecida - Estás en línea' })
});

//Detectar cambio de conexion a offline
window.addEventListener('offline',()=>{
    console.log("offline")
    M.toast({ html: 'Conexión perdida - Estás offline'})
    alert("Conexión perdida - Estás offline")
})


//Boton instalacion
window.addEventListener("beforeinstallprompt", (e) => {
    console.log("beforeinstallprompt", e)
    eventoDeInstalacion = e;
    //acá puedo también mostrar
});

const installButton = document.getElementById("installButton");
installButton.addEventListener("click", () => {
    console.log("eventoDeInstalacion", eventoDeInstalacion);
    if(eventoDeInstalacion && eventoDeInstalacion.prompt) {
        eventoDeInstalacion.prompt()
        .then((resultado) => {
            const opcionesElegida = resultado.outcome;
            console.log("opcionesElegida", opcionesElegida)
            if(opcionesElegida == "dismissed") {
                console.log("Instalación cancelada");
            } else if(opcionesElegida == "accepted") {
                console.log("Instalación completa")
                ocultarBotonInstalacion();
            }
        })
        .catch((error) => console.log("error al instalar"))
    }
})

const ocultarBotonInstalacion = () => {
    installButton.style.display = "none";
}

setTimeout( () => {
    if(eventoDeInstalacion == null) {
        ocultarBotonInstalacion();
    }
}, 200);


//validacion del formulario

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('form');
    const nameInput = document.getElementById('name');
    const ageInput = document.getElementById('age');

    form.addEventListener('submit', function(event) {
        // Validación del nombre
        if (nameInput.value.length < 3) {
            alert('El nombre debe tener al menos 3 caracteres.');
            event.preventDefault(); // Evita que se envíe el formulario
            return;
        }

        // Validación de la edad
        const age = parseInt(ageInput.value);
        if (isNaN(age) || age < 18 || age > 100) {
            alert('Por favor, ingrese una edad válida entre 18 y 100 años.');
            event.preventDefault(); // Evita que se envíe el formulario
            return;
        }

       
    });
});







/*if(navigator?.serviceWorker) {
    navigator.serviceWorker.register('./sw.js').then((register) => {
        M.toast({html: `Modo offline activado`})
    })
    .catch((error) => {
        console.log("")
    })
}*/



/*
// Key Api 
const key = '4c18124e';
const urlApi = 'https://www.omdbapi.com/?';

const formBusquedaNav = document.getElementById('busqueda-nav');
const formBusquedaMain = document.getElementById('busqueda-main');
const formBusquedaSidenav = document.getElementById('busqueda-sidenav');

const mostrarListaBusqueda = document.querySelector('.container-movies');

// Consultar datos por URL
async function fetchPelicula(id) {
    try {
        const URL = `http://www.omdbapi.com/?i=${id}&apikey=${key}`;
        const respuesta = await fetch(URL);
        if (!respuesta.ok) {
            throw new Error("No hubo una conexión realizada");
        }
        const data = await respuesta.json();
        return data;
    } catch (error) {
        console.error("Error en obtener la película", error);
        mostrarToast("Error al obtener la película. Por favor, intente nuevamente.");
    }
}

async function listaPeliculas(peliculas) {
    try {
        const elementosPelicula = peliculas.map(pelicula => {
            const poster = pelicula.Poster !== "N/A" ? pelicula.Poster : "No hay un poster de película";
            const id = pelicula.imdbID;
            return `
            <div class="movie-item">
                <div class="poster-movie">
                    <a href="detalle-peli.html?id=${id}">
                    <img src="${poster}" alt="Poster de la película"></a>
                </div>
                <div class="movie-detalles">
                    <div class="movie">
                        <div>
                            <p class="movie-name"><a href="detalle-peli.html?id=${id}">${pelicula.Title}</a></p>
                            <p class="movie-year"><a href="detalle-peli.html?id=${id}">${pelicula.Year}</a></p>
                        </div>
                        <a href="detalle-peli.html?id=${id}" class="btn btn-mas">Ver Más</a>
                    </div>
                </div>
            </div>`;
        }).join("");

        const container = document.querySelector(".container-movies");
        container.innerHTML = elementosPelicula;
        console.log(peliculas);
    } catch (error) {
        console.error("Error en mostrar las películas en Inicio", error);
        mostrarToast("Error al mostrar las películas. Por favor, intente nuevamente.");
    }
}

// Buscar y mostrar películas según la búsqueda del usuario
async function buscadorPelicula(buscar) {
    buscar.preventDefault(); // previene el envío predeterminado
    const input = buscar.target.querySelector('input[type="text"]').value.trim();
    try {
        const url = `${urlApi}s=${input}&page=1&apikey=${key}`;
        const resultado = await fetch(url);
        const data = await resultado.json();

        if (data.Search) {
            listaPeliculas(data.Search);
        }
    } catch (error) {
        console.error("Error en el buscador", error);
        mostrarToast("Error en la búsqueda de películas. Por favor, intente nuevamente.");
    }
}

// Añadir eventos a los formularios
if (formBusquedaNav) formBusquedaNav.addEventListener('submit', buscadorPelicula);
if (formBusquedaMain) formBusquedaMain.addEventListener('submit', buscadorPelicula);
if (formBusquedaSidenav) formBusquedaSidenav.addEventListener('submit', buscadorPelicula);

// Obtener y mostrar películas aleatorias en la página Home
async function cargarPeliculaHome() {
    try {
        // Selecciona desde un array de categorías la película aleatoria
        const buscarPelicula = ["action", "comedy", "drama", "horror", "romance", "thriller"];
        const peliculaAleatoria = buscarPelicula[Math.floor(Math.random() * buscarPelicula.length)];
        const url = `${urlApi}s=${peliculaAleatoria}&page=1&apikey=${key}`;
        const resultado = await fetch(url);
        const data = await resultado.json();

        if (data.Search) {
            listaPeliculas(data.Search);
        }
    } catch (error) {
        console.error("Error en cargar las películas en Home", error);
        mostrarToast("Error al cargar las películas en Home. Por favor, intente nuevamente.");
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
        window.location.href = 'vistos.html';
    });
});

if (navigator.serviceWorker) {
    navigator.serviceWorker.register('./sw.js')
        .then(() => {
            mostrarToast('Modo offline activado');
        })
        .catch((error) => {
            console.error("Fallo en el registro del Service Worker", error);
            mostrarToast("Error al activar el modo offline. Por favor, intente nuevamente.");
        });
}*/


