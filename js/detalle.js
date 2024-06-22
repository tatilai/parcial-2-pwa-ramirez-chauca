//const urlApit= 'https://www.omdbapi.com/?';

const urlApit = 'https://www.omdbapi.com/?apikey=4c18124e';

async function fetchPelicula(id) {
    try {
        const URL = `${urlApit}&i=${id}`;
        const respuesta = await fetch(URL);
        if (!respuesta.ok) {
            throw new Error("No hubo una conexión realizada");
        }
        const data = await respuesta.json();
        return data;
    } catch (error) {
        console.error("Error en obtener la película", error);
    }
}

async function cargarDetallePelicula() {
    try {
        //obtenemos el ID de la película de la URL actual
        const idPelicula = window.location.href.split('?id=')[1];
        const data = await fetchPelicula(idPelicula);
        mostrarDetalle(data);

    } catch (error) {
        console.error("Error al cargar el detalle de la película:", error);
    }
}

//detalles que mostraremos a traves elementos HTML - DOM
/*function mostrarDetalle(data){
    const contenedorPelicula = document.createElement('div');
    contenedorPelicula.classList.add('pelicula-detalles');

    const encabezado = document.createElement('div');
    encabezado.classList.add('encabezado');

    const titulo = document.createElement('h2');
    titulo.innerHTML = `${data.Title} - ${data.Type}`;

    encabezado.appendChild(titulo);

    const posterPelicula = document.createElement('div');
    posterPelicula.classList.add('poster-pelicula');

    const imagenPoster = document.createElement('img');
    imagenPoster.src = data.Poster;
    imagenPoster.alt = "Poster de la película";

    posterPelicula.appendChild(imagenPoster);

    const calificacion = document.createElement('p');
    calificacion.innerHTML = `<i>Calificación: ${data.imdbRating}/10</i>`;

    const listaDetalle = document.createElement('ul');
    listaDetalle.classList.add('lista-detalle');
    listaDetalle.innerHTML = `
        <li>Año: ${data.Year}</li>
        <li>País: ${data.Country}</li>
        <li>Actores: ${data.Actors}</li>
        <li>Director: ${data.Director}</li>
        <li>Género: ${data.Genre}</li>
        <li>Idioma: ${data.Language}</li>
        <li>Duración: ${data.Runtime}</li>
    `;

    const descripcion = document.createElement('p');
    descripcion.innerText = data.Plot;

    contenedorPelicula.appendChild(posterPelicula);
    contenedorPelicula.appendChild(encabezado);
    contenedorPelicula.appendChild(calificacion);
    contenedorPelicula.appendChild(listaDetalle);
    contenedorPelicula.appendChild(descripcion);

    const container = document.querySelector('.container-detalle');
    container.appendChild(contenedorPelicula);
}*/


function mostrarDetalle(data){
    const contenedorPelicula = document.createElement('div');
    contenedorPelicula.classList.add('pelicula-detalles');
    const detallePelis=document.getElementById('container-detalle');
    detallePelis.innerHTML=` 
    
    
  <div class="row">
    <div class="col s12 m6">
      <div class="card">
        <div class="card-image">
          <img src="${data.Poster}">
          <span class="card-title">${data.Title} - ${data.Type}</span>
          <a class="btn-floating halfway-fab waves-effect waves-light red"><i class="material-icons">favorite</i></a>
        </div>
        <div class="card-content">
        <p>Año: ${data.Year}</p>
        <p>País: ${data.Country}</p>
        <p>Actores: ${data.Actors}</p>
        <p>Director: ${data.Director}</p>
        <p>Género: ${data.Genre}</p>
        <p>Idioma: ${data.Language}</p>
        <p>Duración: ${data.Runtime}</p>
        <p>${data.Plot}</p>
        </div>
      </div>
    </div>
  </div>
     
    
    `

    guardarEnHistorial(data.Title);
}




function guardarEnHistorial(peliculaId){
    let historial = JSON.parse(localStorage.getItem('historial')) || [] ;


    if (!historial.includes(peliculaId)) {
        historial.push(peliculaId);
        localStorage.setItem('historial', JSON.stringify(historial));
    }
  //  historial.push(peliculaId);

  //  localStorage.setItem('historial',JSON.stringify(historial));
}

document.addEventListener('DOMContentLoaded', cargarDetallePelicula);