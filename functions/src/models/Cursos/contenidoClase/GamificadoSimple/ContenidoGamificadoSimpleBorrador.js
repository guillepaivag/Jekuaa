const ContenidoGamificadoSimple = require("./ContenidoGamificadoSimple");

class ContenidoGamificadoSimpleBorrador extends ContenidoGamificadoSimple {
    constructor (data = {}) {
        super(data)
        
        this.mensajesError = data.mensajesError ? data.mensajesError : []
        this.contieneErrores = data.contieneErrores !== undefined ? data.contieneErrores : false
        this.estadoDocumento = data.estadoDocumento ? data.estadoDocumento : ''
        this.estadoContenido = data.estadoContenido ? data.estadoContenido : ''
    }

    getContenidoGamificadoSimpleBorrador () {
        return {
            ...super.getContenidoGamificadoSimple(),
            mensajesError: this.mensajesError,
            contieneErrores: this.contieneErrores,
            estadoDocumento: this.estadoDocumento,
            estadoContenido: this.estadoContenido,
        }
    }

    setContenidoGamificadoSimpleBorrador ( data = {} ) {
        this.setContenidoGamificadoSimple(data)
        this.setMensajesError(data.mensajesError)
        this.setContieneErrores(data.contieneErrores)
        this.setEstadoDocumento(data.estadoDocumento)
        this.setEstadoContenido(data.estadoContenido)
    }

    setContenidoGamificadoSimple ( contenidoGamificadoSimple = new ContenidoGamificadoSimple() ) {
        super.setContenidoGamificadoSimple( contenidoGamificadoSimple )
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

module.exports = ContenidoGamificadoSimpleBorrador