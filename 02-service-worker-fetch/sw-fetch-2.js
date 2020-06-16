
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

    // Interceptar los stilos 
    // if (  event.request.url.includes('style.css')  ) {

    //     let respuesta = new Response(`
    //         body {
    //             background-color: red !important;
    //             color: pink;
    //         }
    //     `, {
    //         headers: {
    //             'Content-Type': 'text/css'
    //         }
    //     });

    //     event.respondWith( respuesta )
    // }

    if (  event.request.url.includes('.jpg')  ) {

        let fotoReq = fetch('img/main-patas-arriba.jpg')

        event.respondWith( fotoReq )
    }
} )
