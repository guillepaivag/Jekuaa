const ContenidoYoutube = require("./ContenidoYoutube")

class ContenidoYoutubePublicado extends ContenidoYoutube {
    constructor (data = {}) {
        super(data)
        this.fechaCreacion = data.fechaCreacion ? data.fechaCreacion : null
        this.fechaActualizacion = data.fechaActualizacion ? data.fechaActualizacion : null
    }

    getContenidoYoutubePublicado () {
        return {
            ...super.getContenidoYoutube(),
            fechaCreacion: this.fechaCreacion,
            fechaActualizacion: this.fechaActualizacion,
        }
    }

    setContenidoYoutubePublicado ( data = {} ) {
        this.setContenidoYoutube(data)
        this.setFechaCreacion(data.fechaCreacion)
        this.setFechaActualizacion(data.fechaActualizacion)
    }

    setContenidoYoutube ( contenidoYoutube = new ContenidoYoutube() ) {
        super.setContenidoYoutube( contenidoYoutube )
    }

    setFechaCreacion ( fechaCreacion = null ) {
        this.fechaCreacion = fechaCreacion
    }

    setFechaActualizacion ( fechaActualizacion = null ) {
        this.fechaActualizacion = fechaActualizacion
    } 
}

module.exports = ContenidoYoutubePublicado