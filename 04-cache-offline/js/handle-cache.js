

if ( navigator.serviceWorker ) {
    navigator.serviceWorker.register('/sw.js');
}

if ( window.caches ) {

    // Crear un Cache
    caches.open('prueba-1')

    caches.open('prueba-2')

    // Comprobar que existe un cache
    caches.has('prueba-3').then((existe) => {
        console.log('existe', existe);
    }).catch((err) => {
        
    });

    // Borrar cache
    caches.delete('prueba-1').then((existe) => {
        console.log('borrar ', existe);
    }).catch((err) => {
        
    });

    // Abrir cache y manejar dato
    caches.open('cache-v1.1').then((cache) => {
        
        // cache.add('/index.html')

        cache.addAll([
            '/index.html',
            '/css/style.css',
            '/img/main.jpg'

        ]).then( () => {

            // cache.delete('/css/style.css')

            // Reemplazar archivo
            cache.put( 'index.html', new Response('Hola Mundo') )
        })

        // Leer cache
        // cache.match('/index.html').then( resp => {

        //     resp.text().then( console.log )
        // } )

    }).catch((err) => {
        
    });


    caches.keys().then( keys => console.log(keys) )
}