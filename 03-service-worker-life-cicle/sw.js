

/**
 * cuando NO existe un Service Worker previo
 * 
 * Se registra, descarga, instala y activa
 */

// Ciclo de vida del SW

// Esto se ejecuta una vez, al recargar la pag
// Esto se dispara cada vez que se hace un cambio en el SW
self.addEventListener('install', event => {
    
    // Descargar assets
    // Creamos un cache
    
    console.log('SW: Instalando SW');

    /**
     * Esto obliga a la applicacion a recargar el SW
     * esto conlleva que puede perder la funcionalidad anterior
     */
    // self.skipWaiting()

    const instalacion = new Promise( (resolve, reject) => {

        setTimeout( () => {

            console.log('SW: Instalaciones terminadas');

            // Fines ilustrativos
            self.skipWaiting()

            resolve()
        }, 1)
    })

    // Esperar hasta que a promesa se resuekva
    event.waitUntil( instalacion )
})

// Esto se ejecuta una vez, al recargar la pag
// Cuando el SW toma el control de la aplicacion
self.addEventListener('activate', event => {

    // Borrar cache viejo

    console.log('SW 2: Activo y listo para controlar la app');
})

// Esto se ejecuta cada vez que se entra, al recargar la pag
// FETCH: manejo de peticiones HTTP
self.addEventListener('fetch', event => {
    
    // Aplicar estrategias del cache, guardar, dejar pasar la peticion etc
    // console.log('SW 3: ', event.request.url);

    // if( event.request.url.includes('https://reqres.in/') ) {

    //     const resp = new Response(`{ok: false, mensaje: 'XD}`)

    //     event.respondWith( resp )

    // }
})


// SYNC: Es cuando recuperamos la conexion a internet
self.addEventListener('sync', event => {

    console.log('Tenemos la conexion');
    console.log(event);
    console.log(event.tag);
})

// PUSH; Manejar las push notification
self.addEventListener('push', event => {

    console.log('Notificacion recibida');
})