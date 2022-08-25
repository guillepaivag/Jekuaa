const config = require("../../../../config")
const ContenidoVideo = require("./ContenidoVideo")

class ContenidoVideoPublicado extends ContenidoVideo {
    constructor (data = {}) {
        super(data)
        this.fechaCreacion = data.fechaCreacion ? data.fechaCreacion : null
        this.fechaActualizacion = data.fechaActualizacion ? data.fechaActualizacion : null
    }

    getContenidoVideoPublicado () {
        return {
            ...super.getContenidoVideo(),
            fechaCreacion: this.fechaCreacion,
            fechaActualizacion: this.fechaActualizacion,
        }
    }

    setContenidoVideoPublicado ( data = {} ) {
        this.setContenidoVideo(data)
        this.setFechaCreacion(data.fechaCreacion)
        this.setFechaActualizacion(data.fechaActualizacion)
    }

    setContenidoVideo ( contenidoVideo = new ContenidoVideo() ) {
        super.setContenidoVideo( contenidoVideo )
    }

    setFechaCreacion ( fechaCreacion = null ) {
        this.fechaCreacion = fechaCreacion
    }

    setFechaActualizacion ( fechaActualizacion = null ) {
        this.fechaActualizacion = fechaActualizacion
    } 

    static async generarUrlVideo ( data = { rutaPrefix, segundos } ) {
        const { rutaPrefix, segundos } = data

        const rutaModo = config.environment.mode === 'production' ? 'prod' : 'dev'
        const bucketName = rutaModo === 'prod' ? 'prod-j-cursos-contenido' : 'dev-j-cursos-contenido'

        return await super.generarUrlVideo({
            bucketName,
            rutaPrefix,
            segundos
        })
    }
}

module.exports = ContenidoVideoPublicado