const db = new Dexie("AplicacionWeb");

const dbVersion = db.version(1).stores({

    users:"++id,name,age",
    logs:"++id,date"
});

console.log("dbVersion", dbVersion)