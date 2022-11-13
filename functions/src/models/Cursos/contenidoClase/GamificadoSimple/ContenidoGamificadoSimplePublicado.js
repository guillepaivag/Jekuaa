const ContenidoGamificadoSimple = require("./ContenidoGamificadoSimple");

class ContenidoGamificadoSimplePublicado extends ContenidoGamificadoSimple {
    constructor (data = {}) {
        super(data)
        this.fechaCreacion = data.fechaCreacion ? data.fechaCreacion : null
        this.fechaActualizacion = data.fechaActualizacion ? data.fechaActualizacion : null
    }

    getContenidoGamificadoSimplePublicado () {
        return {
            ...super.getContenidoGamificadoSimple(),
            fechaCreacion: this.fechaCreacion,
            fechaActualizacion: this.fechaActualizacion,
        }
    }

    setContenidoGamificadoSimplePublicado ( data = {} ) {
        this.setContenidoGamificadoSimple(data)
        this.setFechaCreacion(data.fechaCreacion)
        this.setFechaActualizacion(data.fechaActualizacion)
    }

    setContenidoGamificadoSimple ( contenidoGamificadoSimple = new ContenidoGamificadoSimple() ) {
        super.setContenidoGamificadoSimple( contenidoGamificadoSimple )
    }

    setFechaCreacion ( fechaCreacion = null ) {
        this.fechaCreacion = fechaCreacion
    }

    setFechaActualizacion ( fechaActualizacion = null ) {
        this.fechaActualizacion = fechaActualizacion
    }
}

module.exports = ContenidoGamificadoSimplePublicado