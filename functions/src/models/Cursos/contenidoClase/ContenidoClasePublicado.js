const ContenidoClase = require("./ContenidoClase");

class ContenidoClasePublicado extends ContenidoClase {
    constructor (datos = {}) {
        super(datos)
        this.fechaCreacion = datos.fechaCreacion ? datos.fechaCreacion : null
        this.fechaActualizacion = datos.fechaActualizacion ? datos.fechaActualizacion : null
    }

    // CREAR - ACTUALIZAR
    static async subirContenido () {
        // Crear/Actualizar el archivo contenido en Cloud Storage

        // Actualizar el documento contenido en Cloud Firestore
    }

    // ELIMINAR
    static async eliminarContenido () {
        // Eliminar el archivo contenido de Cloud Storage

        // Poner como documento contenido por defecto el documento contenido
    }

    static async generarUrlFirmadaVideoClase () {
        
    }

    static async obtenerArticuloClase () {
        
    }
}

module.exports = ContenidoClasePublicado