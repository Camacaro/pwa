
// indexedDB: Reforzamiento

// Crerar db
let request = window.indexedDB.open('mi-datababase', 2)

// Se actualiza cuando se crea o se sube de version de la DB
request.onupgradeneeded = event => {
    
    console.log('Actualizacion de DB');

    // Referencia a la db
    let db = event.target.result

    // Esto se crea cuando subo de version mi-database
    db.createObjectStore('heroes', {
        keyPath: 'id'
    })

}

// Manejo de errores
request.onerror = event => {
    console.log('DB error:', event.target.error)
}

// Insertar datos 
request.onsuccess = event => {
    // Referencia a la db
    let db = event.target.result

    let heroesData = [
        { id: '1111', heroe: ' Spiderman', mensaje: 'Aqui su amigo Spierderman'},
        { id: '2222', heroe: ' Iroman', mensaje: 'Aqui en mi nuevo Mark 50'},
    ]

    let heroesTransaction = db.transaction('heroes', 'readwrite')

    heroesTransaction.onerror = eventError => {
        console.log('Error guardando: ', eventError.target.error );
    }

    // Informa sobre el exito de la transaccion

    heroesTransaction.oncomplete = event => {
        console.log('Transaccion hecha:', event );
    }

    let heroesStore = heroesTransaction.objectStore('heroes')

    for (let heroe of heroesData ) {
        heroesStore.add( heroe )
    }

    heroesStore.onsuccess = event => {
        console.log('Nuevo Item agregado a la base de datos');
    }
}
