/*const db = new Dexie("AplicacionWeb");

const dbVersion = db.version(1).stores({

    users:"++id,name,age",
    logs:"++id,date"
});

/*const mostrarLista=(logs)=>{
    const lista= document.getElementById('lista');
    logs.forEach(log=>{
      lista.innerHTML += `<li>${log.date}</li> `
    });
}

db.logs
      .add({
        date: new Date().getTime()
      })
        .then(()=>db.logs
                 .where('date') 
                 .below(new Date(2024,5,21).getTime())
                 .toArray()

            
        )
        .then((logs)=>{
        //mostrarLista(logs)
        console.log("logs",logs);
        })*/


console.log(Dexie);

/*const db = new Dexie("AplicacionWeb1");

const dbVersion = db.version(1).store({

  users:"++id,nombre,age"
});*/


// Inicializa la base de datos con Dexie.js
const db = new Dexie("AplicacionWeb");

// Define la versión y estructura de la base de datos
const dbVersion = db.version(1).stores({
  users: "++id,name,age",
  logs: "++id,date"
});

// Función para agregar un log
function addLog() {
  return db.logs.add({
    date: new Date().getTime()
  });
}

// Función para mostrar la lista de logs en el DOM
function mostrarLista(logs) {
  const lista = document.getElementById('lista');
  lista.innerHTML = ''; // Limpia la lista antes de agregar nuevos items
  logs.forEach(log => {
    lista.innerHTML += `<li>${new Date(log.date).toLocaleString()}</li>`;
  });
}

// Función para obtener y mostrar todos los logs
function getLogs() {
  db.logs.toArray()
    .then(logs => {
      console.log("logs", logs);
      mostrarLista(logs);
    });
}

// Agrega un log cuando se carga la página y luego obtiene y muestra todos los logs
addLog().then(getLogs);