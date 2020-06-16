

/**
 * Verificar si hay serviceWorker
 */

// if ( 'serviceWorker' in navigator ) {
//     console.log('Podemos usarlo');
// }   

// Confirmar si podemos usar serviceWorker
if( navigator.serviceWorker ) {
    
    navigator.serviceWorker.register('/sw.js')
}