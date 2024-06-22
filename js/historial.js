document.addEventListener('DOMContentLoaded', () => {
    
   

    // Obtener el historial y mostrarlo en el DOM
    const historial = JSON.parse(localStorage.getItem('historial'));
    const historialLista = document.getElementById('historialLista');

    if (historial && historial.length > 0) {
        historial.forEach(pokemonId => {
            fetch(`http://www.omdbapi.com/?i=${id}&apikey=${key}`)
                .then(response => response.json())
                .then(data => {

                   
                    const listaItem = document.createElement('li');
                    listaItem.textContent = ` pelicula: ${id}, Nombre: ${data.Title}`;
                    historialLista.appendChild(listaItem);
                })
                .catch(error => {
                    console.error('Se produjo un error:', error);
                });
        });
    } else {
        const listaItem = document.createElement('li');
        listaItem.textContent = 'No hay elementos en el historial.';
        historialLista.appendChild(listaItem);
    }
});