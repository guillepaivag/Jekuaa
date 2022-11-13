const PreguntasGamificadoSimple = require("./PreguntasGamificadoSimple");

class PreguntasGamificadoSimpleBorrador extends PreguntasGamificadoSimple {
    constructor (data = {}) {
        super(data)

        this.mensajesError = data.mensajesError ? data.mensajesError : []
        this.contieneErrores = data.contieneErrores !== undefined ? data.contieneErrores : false
        this.estadoDocumento = data.estadoDocumento ? data.estadoDocumento : ''
        this.estadoContenido = data.estadoContenido ? data.estadoContenido : ''
    }

    getPreguntasGamificadoSimpleBorrador () {
        return {
            ...super.getPreguntasGamificadoSimple(),
            mensajesError: this.mensajesError,
            contieneErrores: this.contieneErrores,
            estadoDocumento: this.estadoDocumento,
            estadoContenido: this.estadoContenido,
        }
    }

    setPreguntasGamificadoSimpleBorrador ( data = {} ) {
        this.setPreguntasGamificadoSimple(data)
        this.setMensajesError(data.mensajesError)
        this.setContieneErrores(data.contieneErrores)
        this.setEstadoDocumento(data.estadoDocumento)
        this.setEstadoContenido(data.estadoContenido)
    }

    setPreguntasGamificadoSimple ( preguntasGamificadoSimple = new PreguntasGamificadoSimple() ) {
        super.setPreguntasGamificadoSimple( preguntasGamificadoSimple )
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

module.exports = PreguntasGamificadoSimpleBorrador