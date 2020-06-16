
/**
 * Este archivo va en la raiz del proyecto
 *
 * Por cada pequeño cambio que se haga aqui se registrara
 * nuevamente el serviceWorker
 */


/**
 * self: hacer referencia hacia el serviceWorker
 * fetch son todas las peticiones que hace la app
 */
self.addEventListener('fetch', event => {

    // Bloquear la peticion del style
    // if( event.request.url.includes('style.css') ) {
    //     event.respondWith( null )
    // } else {
    //     // Responder a la app con el serviceWorker
    //     event.respondWith( fetch( event.request ) )
    // }

    // Hacer peticiones 
    if( event.request.url.includes('style.css') ) {
        
        // let fotoReq = fetch('img/main.png')
        // let fotoReq = fetch( event.request.url )
        let fotoReq = fetch( event.request )

        event.respondWith( null )
    }


} )
