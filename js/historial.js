
const key = '4c18124e';



/*document.addEventListener('DOMContentLoaded', () => {
    
   

    // Obtener el historial y mostrarlo en el DOM
    const historial = JSON.parse(localStorage.getItem('historial')) || [];
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
});*/


document.addEventListener('DOMContentLoaded', () => {
    const historial = JSON.parse(localStorage.getItem('historial')) || [];
    const historialLista = document.getElementById('historialLista');

    if (historial.length > 0) {
        historial.forEach(id => {
            fetch(`http://www.omdbapi.com/?i=${id}&apikey=${key}`)
                .then(response => response.json())
                .then(data => {
                    const listaItem = document.createElement('div');
                    listaItem.classList.add('card');
                    listaItem.innerHTML = `
                        <div class="card-image">
                            <img src="${data.Poster}" alt="Poster de ${data.Title}">
                            <span class="card-title">${data.Title}</span>
                        </div>
                        <div class="card-content">
                            <p>${data.Year}</p>
                            <p>${data.Genre}</p>
                        </div>
                    `;
                    historialLista.appendChild(listaItem);
                })
                .catch(error => {
                    console.error('Se produjo un error:', error);
                });
        });
    } else {
        const listaItem = document.createElement('p');
        listaItem.textContent = 'No hay elementos en el historial.';
        historialLista.appendChild(listaItem);
    }
});