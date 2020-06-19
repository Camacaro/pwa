

// Utilizades para grabar PiechDb

const db = new PouchDB('mensajes')

function guardarMensaje( mensaje ) {

    mensaje._id = new Date().toISOString()

    return db.put( mensaje ).then( () => {

        /**
         * Registrar una tarea asyncrona
         * 
         * Esto es para que cuando llegue internet haga esta tarea 
         * quede registrada y al obtener conexion seha realizada 
         */
        self.registration.sync.register('nuevo-post')

        const newResp = { ok: true, offline: true}
        
        console.log('Mensaje guardado para posterior posteo')

        return new Response( JSON.stringify(newResp) )
    })

}

// Postear mensaje Hacia el server API
function postearMensajes () {  

    const posteos = []

    return db.allDocs( {include_docs: true} ).then( docs => {

        docs.rows.forEach(row => {
 
            const doc = row.doc 

            const fetchProm = fetch('api', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify( doc )
        
            })
            .then( res  => {
                return db.remove( doc )
            } )

            posteos.push ( fetchProm )
            
        }); // fin del forEach

        return Promise.all( posteos ) 

    })


}