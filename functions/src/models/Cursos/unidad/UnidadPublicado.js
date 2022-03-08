const Unidad = require("./Unidad");

class UnidadPublicado extends Unidad {
    constructor (datos = {}) {
        const {
            fechaCreacion,      // a
            fechaActualizacion, // a
        } = datos
        
        super(datos)
        this.fechaCreacion = fechaCreacion ? fechaCreacion : null
        this.fechaActualizacion = fechaActualizacion ? fechaActualizacion : null
    }

    getUnidadPublicado () {
        return {
            ...super.getUnidad(),
            fechaCreacion: this.fechaCreacion,
            fechaActualizacion: this.fechaActualizacion
        }
    }

    setUnidadPublicado (datos = {}) {
        super(datos)
        this.setFechaCreacion( datos.fechaCreacion )
        this.setFechaActualizacion( datos.fechaActualizacion )
    }

    setFechaCreacion ( fechaCreacion = null ) {
        this.fechaCreacion = fechaCreacion
    }

    setFechaActualizacion ( fechaActualizacion = null ) {
        this.fechaActualizacion = fechaActualizacion
    }
}

module.exports = UnidadPublicado