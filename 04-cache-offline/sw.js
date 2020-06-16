

const CAHCE_NAME = 'cache-1'

const CAHCE_STATIC_NAME = 'static-v2'
// Es un cache que cambia dinamicamente
const CAHCE_DYNAMIC_NAME = 'dynamic-v1'

// Es un cache que no va cambiar 
const CAHE_INMUTABLE_NAME = 'inmutable-v1'

const CAHCE_DYNAMIC_LIMIT = 50

function limpiarCache( cacheName, numberItems ) {

    caches.open( cacheName )
    .then( cache => {
        // keys: nombres de los archivos
        cache.keys().then( keys => {
            // Soportar solo 5 items en el cache, y hago recursividad para borrar los otros
            if( keys.length > numberItems) {
                cache.delete( keys[0] ).then( limpiarCache( cacheName, numberItems ) )
            }
        })
    })
}

// APP SHELL, que necesita todo para poder trabajar o lo mas importantr

self.addEventListener('install', e => {

    // Abrir y Almacenar en el cache
    const cachePromise = caches.open( CAHCE_STATIC_NAME )
    .then( cache => {

        // Grabar en cache
        return cache.addAll([
            '/',
            '/index.html',
            '/css/style.css',
            '/img/main.jpg',
            '/js/app.js',
            '/img/no-img.jpg',
        ])
    })


    const cacheInmutable = caches.open( CAHE_INMUTABLE_NAME )
    .then( cache => {

        // Grabar en cache
        return cache.add('https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css')
    })


    e.waitUntil( Promise.all([cachePromise, cacheInmutable])  )
})


// Estrategias del cache

self.addEventListener('fetch', e => {

    /* #region 5- Cache y Network Race */
    const respuesta = new Promise( (resolve, reject) => {

        let rechazada = false;

        const falloUnaVez = () => {
            
            if( rechazada ) {
                // Si entra a este cuerpo es porque fallo en ambos, fetch y caches

                // Expresiones regulares
                if( /\.(png|jpg)$/i.test( e.request.url ) ) {
                    // si entra aqui es que puede retornar una imagen 

                    return resolve( caches.match( '/img/no-img.jpg' ) )
                } else {
                    return reject('No se encontro respuesta')
                }

            } else {
                rechazada = true
            }
        }

        fetch( e.request ).then( res => {

            res.ok ? resolve( res ) : falloUnaVez()

        }).catch( falloUnaVez )


        caches.match( e.request ).then( res => {

            res ? resolve( res ) : falloUnaVez()

        }).catch( falloUnaVez )


    })

    e.respondWith( respuesta )
    /* #endregion  5- Cache y Network Race */

    /* #region 4- Cache with network update */

    /**
     * Rendimiento es critico, presentar la app lo mas rapido posible 
     * Siempre estaran un paso atras, regreso la anterior
     * pero estoy guardando la ultima version para ser servida
     * luego qeu me se llame en ese instante vuelve buscal la ultima
     * por eso esta un paso atras
     * 
     */

    // if( e.request.url.includes('bootstrap') ) {
    //     return e.respondWith( caches.match( e.request ) )
    // }

    // const respuesta = caches.open( CAHCE_STATIC_NAME ).then( cache => {

    //     // Hago una solicitud del ultimo estado de mi network y lo almaceno
    //     fetch( e.request ).then( newRes => {
    //         cache.put( e.request, newRes )
    //     })

    //     // Regresa la peticion qeu solicito pero en el cache
    //     return cache.match( e.request )

    // })

    // e.respondWith( respuesta )
    /* #endregion  4- Cache with network update */
    
    /* #region 3- Network with cache fallback */

    /**
     * Primero ira la web, sino consigue el recurso
     * lo buscara en el cache
     * 
     * Esta estrategia los problemas de ella es el acceso al 
     * internet que siempre lo va hacer 
     */

    // Buscar recurso en internet 

    // const respNetwork = fetch( e.request ).then( res => {

    //     if( !res ) return caches.match( e.request )

    //     console.log('Fetch', res);

    //     caches.open( CAHCE_DYNAMIC_NAME ).then( cache => {
    //         cache.put( e.request, res )
    //         limpiarCache( CAHCE_DYNAMIC_NAME, CAHCE_DYNAMIC_LIMIT )
    //     })

    //     return res.clone()

    // }).catch( err => {

    //     return caches.match( e.request )

    // })

    // e.respondWith( respNetwork )

    /* #endregion  3- Network with cache fallback */

    /* #region 2- Cache With Network Fallback */
    /**
     * 2- Cache With Network Fallback
     * 
     * Lee el cache sino lo encuentra lo busca en la internet y 
     * solo vamos almacenando los ultimos 5
     */

    // const respFinal = caches.match( e.request )
    // .then( res => {
        
    //     // Si lo encuentra lo devuelve
    //     if( res ) return res

    //     // No existe el archivo que me pide
    //     // voy a la web y lo guardo
    //     console.log('No existe', e.request.url);

    //     return fetch( e.request ).then( newResponse => {

    //         caches.open( CAHCE_DYNAMIC_NAME ).then(
    //             cache => {
    //                 // Key, valor
    //                 cache.put( e.request, newResponse  )
    //                 limpiarCache( CAHCE_DYNAMIC_NAME, 50 )
    //             }
    //         )

    //         // como uso dos veces el newResponse uso el clone
    //         return newResponse.clone()
    //     })
    // })

    // e.respondWith( respFinal )

    /* #endregion  2- Cache With Network Fallback */

    /* #region 1- Cache Only */
    /**
     * 1- Cache Only
     * 
     * Cuando toda la app es servida desde el cache
     * y no hace peticion a la Web, no sale del cache
     * 
     * caches.match se va a todos los cache que estan en este
     * dominio, en este caso localhost y buscara y retornara que 
     * coincida con el request
     */

    // e.respondWith( caches.match( e.request ) )
    /* #endregion */

})