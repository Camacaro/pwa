
class Camara {

    constructor( videNode ) {
        
        this.videoNode = videNode
        console.log('Camara Class init');
    }

    encender() {

        if( !navigator.mediaDevices  ) {
            console.log('No lo soporta Camara -> encender');
            return;
        }
        
        navigator.mediaDevices.getUserMedia({
            audio: false,
            video: { // Esto esta en pixeles cuanto captura, sino lo especifico tomara todo de la camara
                width: 300,
                height: 300
            }
        }).then( stream => {

            // Transmitir el video hacia el DOM 
            // Por defecto en el celular se activara la camara frontal
            this.videoNode.srcObject = stream
            // Inicializar una variabel de la clase en cualquier lado
            this.stream = stream
        })
    }

    apagar() {

        // Detener el video, la imagen
        this.videoNode.pause()

        if ( this.stream ) {

            // 0 -> Video
            this.stream.getTracks()[0].stop()
        }
    }

    tomarFoto() {
        // Crear un elemento canvas para renderizar ahí la foto
        // Tomar el stream y pasarlo por un canvas, un lienzo
        let canvas = document.createElement('canvas')

        // Colocar las dimensiones igual al elemento del video
        canvas.setAttribute('width', 300)
        canvas.setAttribute('height', 300)

        // obtener el contexto del canvas
        let context = canvas.getContext('2d') // un simple foto

        // 0, 0 -> esquina superior izquierdo
        context.drawImage( this.videoNode, 0, 0, canvas.width, canvas.height )

        // Extraer foto, stream base 64, png para almacenar la foto como tal hay que hacerle un blo en al backend
        this.foto = context.canvas.toDataURL()

        // limpieza
        canvas = null
        context = null

        return this.foto
    }
}