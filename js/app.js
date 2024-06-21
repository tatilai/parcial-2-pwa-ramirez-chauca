if(navigator.serviceWorker){
    navigator.serviceWorker.register('./sw.js').then(()=>{
        //console.info("registrado");
    })
    .catch(()=>{

        console.error("fallo");
    });
}