const ContenidoYoutube = require("./ContenidoYoutube")

class ContenidoYoutubeBorrador extends ContenidoYoutube {
    constructor (data = {}) {
        super(data)
        this.mensajesError = data.mensajesError ? data.mensajesError : []
        this.contieneErrores = data.contieneErrores !== undefined ? data.contieneErrores : false
        this.estadoDocumento = data.estadoDocumento ? data.estadoDocumento : ''
        this.estadoContenido = data.estadoContenido ? data.estadoContenido : ''
    }

    getContenidoYoutubeBorrador () {
        return {
            ...super.getContenidoYoutube(),
            mensajesError: this.mensajesError,
            contieneErrores: this.contieneErrores,
            estadoDocumento: this.estadoDocumento,
            estadoContenido: this.estadoContenido,
        }
    }

    setContenidoYoutubeBorrador ( data = {} ) {
        this.setContenidoYoutube(data)
        this.setMensajesError(data.mensajesError)
        this.setContieneErrores(data.contieneErrores)
        this.setEstadoDocumento(data.estadoDocumento)
        this.setEstadoContenido(data.estadoContenido)
    }

    setContenidoYoutube ( contenidoYoutube = new ContenidoYoutube() ) {
        super.setContenidoYoutube( contenidoYoutube )
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

}

module.exports = ContenidoYoutubeBorrador