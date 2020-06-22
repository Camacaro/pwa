
const fs = require('fs');
const webpush = require('web-push');
const vapid = require('./vapid.json')
const urlsafeBase64 = require('urlsafe-base64');

/**
 * mailto: Notificarme si cambia el protocolo de comunicacion
 * o algo, me avisan 
 */
webpush.setVapidDetails(
    'mailto:jesus.alejandr@gmail.com',
    vapid.publicKey,
    vapid.privateKey
);


let subscripciones = require('./subs-db.json') || []


/**
 * LLave publica 
 */
module.exports.getKey = () => {
    return urlsafeBase64.decode( vapid.publicKey );
}

/**
 * 
 * @param {*} suscripcion 
 * Datos de la subscripcion del cliente para ser notificado
 */
module.exports.addSubscription = ( suscripcion ) => {
    
    subscripciones.push( suscripcion )
    console.log('Subscrito');
    // Guardar las subscriociones
    fs.writeFileSync(`${ __dirname }/subs-db.json`, JSON.stringify(subscripciones) )
}


module.exports.sendPush = ( post ) => {

    console.log('Mandando Pushes')

    const notificacionesEniadas = []
    
    /**
     * Enviar mensajes a todas las personas subscritas
     */
    subscripciones.forEach( (subscripcion, indice) => {

        const pushProm = webpush.sendNotification( subscripcion, JSON.stringify( post ) )
            .then( console.log('Notificacion enviada') )
            .catch( err => {

                console.log('Notificacion fallo');

                if( err.statusCode === 410 ) { // GONE, ya no existe
                    subscripciones[indice].borrar = true
                }
            })

        notificacionesEniadas.push( pushProm )
    })

    Promise.all( notificacionesEniadas )
    .then( () => {
        
        subscripciones = subscripciones.filter( subs => !subs.borrar )

        // Guardar las subscriociones
        fs.writeFileSync(`${ __dirname }/subs-db.json`, JSON.stringify(subscripciones) )
    } )


}
