/*const CACHE_NAME= 'Popcorn-cache-v1';
const urlsToCache=[
    '/',
    '/home.html',
    '/detalle-peli.html',
    '/vistos.html',
    '/imagen/icon-64x64.png',
    '/imagen/icon-32x32.png',
    '/style.css',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css',
    'https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css',
    'https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap',
    '/js/script.js',
    '/js/detalle.js'
   
];

//Instalacion del service worker y precaching de los recursos necesarios
self.addEventListener('install',event=>{
    event.waitUntill(
        caches.open(CACHE_NAME)
        .then(cache=>cache.addAll(urlsToCache))
        .then(self.skipWaiting())
    );
});


//Activacion del service worker y limpieza de caches antiguos
self.addEventListener('activate', event=>{
    const cacheWhitelist=[CACHE_NAME];
    event.waitUntil(
        caches.keys().then(cacheNames=>{
            return Promise.all(
                cacheNames.map(cacheName=>{
                    if(cacheWhitelist.indexOf(cacheName)=== -1){
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(()=>self.clients.claim())
    );
});


self.addEventListener('fetch', event=>{
    event.respondWith(
        caches.match(event.request)
        .then(response=>{
            //Devuelve el recurso del cache si esta disponible
            if(response){
                return response;
            }
            //si no esta en el cache,realiza una solicitud de red
            return fetch(event.request).then(
                function(response){
                    //Comprueba si la solicitud es valida
                    if(!response ||response.status !== 200 || response.type !== 'basic'){
                        return response;
                    }
                    //clona la respuesta y la almacena en el cache
                    var responseToCache =response.clone();

                    caches.open(CACHE_NAME)
                    .then(function(cache){
                        cache.put(event.request, responseToCache);
                    });

                    return response;

                }
            )
        })
    )
})
*/

const CACHE_NAME='prueba-1';

const urlsToCache =[
    '/',
    'detalle-peli.html',
    'vistos.html',
    'style.css',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css',
    'https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css',
    'https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap',
    'https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js',
    '/imagen/icon-64x64.png',
    '/imagen/icon32x32.png',
    '/js/script.js',
    '/js/detalle.js'
]


self.addEventListener('install',(e)=>{
   return;
    console.log("hola,soy un service worker,y me estoy instalando");  
    e.waitUntil(
      caches.has(CACHE_NAME).then(estaInstalado=>{
        console.log('service worker:caching files');
        if(!estaInstalado){
            return caches.open(CACHE_NAME).then(cache=>{
               cache.addAll(urlsToCache); 
            })
        }
          
      })
     // .then(()=>self.skipWaiting())
    );
  })
  
  
  
  self.addEventListener('activate', () => {
     // console.log("Soy un service worker. Y me estoy activando.");
  });


  self.addEventListener('fetch',(e)=>{
   // console.log("cache only")
    const consulta = e.request;
    const respuestaCacheada=caches.match(consulta).then((respuesta)=>{
       //  console.log("responde",respuesta)
        if(respuesta)return respuesta;
        return fetch(consulta).then((respuesta)=>{
            return respuesta;
        })
    })
    e.respondWith(respuestaCacheada);
  })



  //cache dinamico
  self.addEventListener('fetch', (e) => {
   //console.log("cache dinamica")
    const consulta = e.request;
    const respuestaCacheada = caches.match(consulta).then(async (respuesta) => {
        if(respuesta) return respuesta;
        const nuevaRespuesta = await fetch(consulta) 
        const cache = await caches.open(CACHE_NAME) 
        await cache.put(consulta, nuevaRespuesta.clone()) 
        return nuevaRespuesta;
    })
    e.respondWith(respuestaCacheada);
})






