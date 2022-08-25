const config = require("../../../../config")
const db = require("../../../../db")
const ContenidoArticulo = require("./ContenidoArticulo")

class ContenidoArticuloPublicado extends ContenidoArticulo {
    constructor (data = {}) {
        super(data)
        this.fechaCreacion = data.fechaCreacion ? data.fechaCreacion : null
        this.fechaActualizacion = data.fechaActualizacion ? data.fechaActualizacion : null
    }

    getContenidoArticuloPublicado () {
        return {
            ...super.getContenidoArticulo(),
            fechaCreacion: this.fechaCreacion,
            fechaActualizacion: this.fechaActualizacion,
        }
    }

    setContenidoArticuloPublicado ( data = {} ) {
        this.setContenidoArticulo(data)
        this.setFechaCreacion(data.fechaCreacion)
        this.setFechaActualizacion(data.fechaActualizacion)
    }

    setContenidoArticulo ( contenidoArticulo = new ContenidoArticulo() ) {
        super.setContenidoArticulo( contenidoArticulo )
    }

    setFechaCreacion ( fechaCreacion = null ) {
        this.fechaCreacion = fechaCreacion
    }

    setFechaActualizacion ( fechaActualizacion = null ) {
        this.fechaActualizacion = fechaActualizacion
    } 

    static async obtenerArticulo ( data = { rutaPrefix, getMarkdown } ) {
        const { rutaPrefix, getMarkdown } = data

        const rutaModo = config.environment.mode === 'production' ? 'prod' : 'dev'
        const bucketName = rutaModo === 'prod' ? 'prod-j-cursos-contenido' : 'dev-j-cursos-contenido'

        return await super.obtenerArticulo({
            bucketName, 
            rutaPrefix, 
            getMarkdown
        })
    }
}

module.exports = ContenidoArticuloPublicado