

// Detectar si podemos usar Service Workers
if ( navigator.serviceWorker ) {
    
    navigator.serviceWorker.register('/sw.js')
    .then( reg => {
        // Regisrar una tarea asyncrona si no hay internet 

        // setTimeout( () => {
        //     reg.sync.register('posteo-gatitos')
        //     console.log('Se enviaron fotos de gatitos al server');
        // }, 3000)

        // Si el usuario aceptar recibir push
        Notification.requestPermission().then( result => {
            
            console.log(result);

            reg.showNotification('Hola Mundo')
            
        })
    })

    
}


// if( window.SyncManager )

// Ejemplo de
// self.addEventListener('fetch'
// fetch('https://reqres.in/api/users')
// .then( resp => resp.json() )
// .then(  console.log )
