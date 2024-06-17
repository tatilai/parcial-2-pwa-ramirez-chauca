//key de API OMDb
const key = "4c18124e";

const buscarPelicula = document.getElementById("Input");

const contenedorPeliculas = document.getElementsByClassName("container-movies");

//obtener peliculas por URL
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

