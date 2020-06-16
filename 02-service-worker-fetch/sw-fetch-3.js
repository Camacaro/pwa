
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

    // index.html
    // <link rel="stylesheet" href="css/style-2.css"></link>
    // <img src="img/main-2.jpg" alt="Vías del tren" class="img-fluid"></img>

    const resp = fetch( event.request ).then(
        res => {

            // if( res.ok ) {
            //     return res
            // } else {
            //     return fetch('img/main.jpg')
            // }

            return res.ok ? res : fetch('img/main.jpg')
        }
    )
    
    event.respondWith( resp )
} )
