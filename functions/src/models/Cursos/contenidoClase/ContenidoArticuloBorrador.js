const config = require("../../../../config")
const db = require("../../../../db")
const ContenidoArticulo = require("./ContenidoArticulo")

class ContenidoArticuloBorrador extends ContenidoArticulo {
    constructor (data = {}) {
        super(data)
        this.mensajesError = data.mensajesError ? data.mensajesError : []
        this.contieneErrores = data.contieneErrores !== undefined ? data.contieneErrores : false
        this.estadoDocumento = data.estadoDocumento ? data.estadoDocumento : ''
        this.estadoContenido = data.estadoContenido ? data.estadoContenido : ''
    }

    getContenidoArticuloBorrador () {
        return {
            ...super.getContenidoArticulo(),
            mensajesError: this.mensajesError,
            contieneErrores: this.contieneErrores,
            estadoDocumento: this.estadoDocumento,
            estadoContenido: this.estadoContenido,
        }
    }

    setContenidoArticuloBorrador ( data = {} ) {
        this.setContenidoArticulo(data)
        this.setMensajesError(data.mensajesError)
        this.setContieneErrores(data.contieneErrores)
        this.setEstadoDocumento(data.estadoDocumento)
        this.setEstadoContenido(data.estadoContenido)
    }

    setContenidoArticulo ( contenidoArticulo = new ContenidoArticulo() ) {
        super.setContenidoArticulo( contenidoArticulo )
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

    static async obtenerArticulo ( data = { rutaPrefix, getMarkdown } ) {
        const { rutaPrefix, getMarkdown } = data

        const rutaModo = config.environment.mode === 'production' ? 'prod' : 'dev'
        const bucketName = rutaModo === 'prod' ? 'prod-j-cursos-contenido-b' : 'dev-j-cursos-contenido-b'

        return await super.obtenerArticulo({
            bucketName, 
            rutaPrefix, 
            getMarkdown
        })
    }

    static async obtenerArticuloVerificacion ( data = { rutaPrefix, getMarkdown } ) {
        const { rutaPrefix, getMarkdown } = data

        const rutaModo = config.environment.mode === 'production' ? 'prod' : 'dev'
        const bucketName = rutaModo === 'prod' ? 'prod-j-cursos-contenido-bv' : 'dev-j-cursos-contenido-bv'

        return await super.obtenerArticulo({
            bucketName, 
            rutaPrefix, 
            getMarkdown
        })
    }
}

module.exports = ContenidoArticuloBorrador