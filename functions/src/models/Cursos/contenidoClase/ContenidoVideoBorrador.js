const config = require("../../../../config")
const db = require("../../../../db")
const ContenidoVideo = require("./ContenidoVideo")

/**
 *  estadoContenido: '', 'procesando'
 */

class ContenidoVideoBorrador extends ContenidoVideo {
    constructor (data = {}) {
        super(data)
        this.mensajesError = data.mensajesError ? data.mensajesError : []
        this.contieneErrores = data.contieneErrores !== undefined ? data.contieneErrores : false
        this.estadoDocumento = data.estadoDocumento ? data.estadoDocumento : ''
        this.estadoContenido = data.estadoContenido ? data.estadoContenido : ''
    }

    getContenidoVideoBorrador () {
        return {
            ...super.getContenidoVideo(),
            mensajesError: this.mensajesError,
            contieneErrores: this.contieneErrores,
            estadoDocumento: this.estadoDocumento,
            estadoContenido: this.estadoContenido,
        }
    }

    setContenidoVideoBorrador ( data = {} ) {
        this.setContenidoVideo(data)
        this.setMensajesError(data.mensajesError)
        this.setContieneErrores(data.contieneErrores)
        this.setEstadoDocumento(data.estadoDocumento)
        this.setEstadoContenido(data.estadoContenido)
    }

    setContenidoVideo ( contenidoVideo = new ContenidoVideo() ) {
        super.setContenidoVideo( contenidoVideo )
    }

    setMensajesError ( mensajesError = [] ) {
        this.mensajesError = mensajesError
    }

    setContieneErrores ( contieneErrores = false ) {
        this.contieneErrores = contieneErrores
    }

    setEstadoDocumento ( estadoDocumento = '' ) {
        this.estadoDocumento = estadoDocumento
    }

    setEstadoContenido ( estadoContenido = '' ) {
        this.estadoContenido = estadoContenido
    }

    static async generarUrlVideo ( data = { rutaPrefix, segundos } ) {
        const { rutaPrefix, segundos } = data

        const rutaModo = config.environment.mode === 'production' ? 'prod' : 'dev'
        const bucketName = rutaModo === 'prod' ? 'prod-j-cursos-contenido-b' : 'dev-j-cursos-contenido-b'

        return await super.generarUrlVideo({
            bucketName,
            rutaPrefix,
            segundos
        })
    }

    static async generarUrlVideoVerificacion ( data = { rutaPrefix, segundos } ) {
        const { rutaPrefix, segundos } = data

        const rutaModo = config.environment.mode === 'production' ? 'prod' : 'dev'
        const bucketName = rutaModo === 'prod' ? 'prod-j-cursos-contenido-bv' : 'dev-j-cursos-contenido-bv'

        return await super.generarUrlVideo({
            bucketName,
            rutaPrefix,
            segundos
        })
    }
}

module.exports = ContenidoVideoBorrador