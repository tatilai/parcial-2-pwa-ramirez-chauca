const db = new Dexie("AplicacionWeb");

const dbVersion = db.version(1).stores({

    users:"++id,name,age",
    logs:"++id,date"
});

db.logs
      .add({
        date: new Date().getTime()
      })
        .then(()=>db.logs
                 .where('date') 
                 .below(new Date(2024, 4, 22).getTime())
                 .toArray()

            
        )
        .then((logs)=>{
            console.log("logs",logs)
        })
