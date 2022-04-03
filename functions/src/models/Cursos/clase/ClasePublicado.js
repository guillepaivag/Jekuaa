const Clase = require("./Clase");

const COLECCION = 'ClasesPublicado'

class ClasePublicado extends Clase {
    constructor (datos = {}) {
        const {
            fechaCreacion,      // a
            fechaActualizacion, // a
        } = datos
        
        super(datos)
        this.fechaCreacion = fechaCreacion ? fechaCreacion : null
        this.fechaActualizacion = fechaActualizacion ? fechaActualizacion : null
    }


    getClasePublicado () {
        return {
            ...super.getClase(),
            fechaCreacion: this.fechaCreacion,
            fechaActualizacion: this.fechaActualizacion
        }
    }

    setClasePublicado (datos = {}) {
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

module.exports = ClasePublicado