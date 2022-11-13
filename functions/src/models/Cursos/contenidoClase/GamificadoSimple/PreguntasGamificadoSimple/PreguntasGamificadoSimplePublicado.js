const PreguntasGamificadoSimple = require("./PreguntasGamificadoSimple");

class PreguntasGamificadoSimplePublicado extends PreguntasGamificadoSimple {
    constructor (data = {}) {
        super(data)
        this.fechaCreacion = data.fechaCreacion ? data.fechaCreacion : null
        this.fechaActualizacion = data.fechaActualizacion ? data.fechaActualizacion : null
    }

    getPreguntasGamificadoSimplePublicado () {
        return {
            ...super.getPreguntasGamificadoSimple(),
            fechaCreacion: this.fechaCreacion,
            fechaActualizacion: this.fechaActualizacion,
        }
    }

    setPreguntasGamificadoSimplePublicado ( data = {} ) {
        this.setPreguntasGamificadoSimple(data)
        this.setFechaCreacion(data.fechaCreacion)
        this.setFechaActualizacion(data.fechaActualizacion)
    }

    setPreguntasGamificadoSimple ( preguntasGamificadoSimple = new PreguntasGamificadoSimple() ) {
        super.setPreguntasGamificadoSimple( preguntasGamificadoSimple )
    }

    setFechaCreacion ( fechaCreacion = null ) {
        this.fechaCreacion = fechaCreacion
    }

    setFechaActualizacion ( fechaActualizacion = null ) {
        this.fechaActualizacion = fechaActualizacion
    } 
}

module.exports = PreguntasGamificadoSimplePublicado