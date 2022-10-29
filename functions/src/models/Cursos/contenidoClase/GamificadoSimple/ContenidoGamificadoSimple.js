const ContenidoClase = require("../ContenidoClase")

class ContenidoGamificadoSimple extends ContenidoClase {
    constructor (data = {}) {
        const { mensaje, cantidadPreguntas, cantidadTotalPreguntas, } = data

        super({...data, tipoContenido: 'gamificado-simple'})
        this.mensaje = mensaje ? mensaje : ''
        this.cantidadPreguntas = cantidadPreguntas ? cantidadPreguntas : 0
        this.cantidadTotalPreguntas = cantidadTotalPreguntas ? cantidadTotalPreguntas : 0
    }

    getContenidoGamificadoSimple () {
        return {
            ...super.getContenidoClase(),
            mensaje: this.mensaje,
            cantidadPreguntas: this.cantidadPreguntas,
            cantidadTotalPreguntas: this.cantidadTotalPreguntas,
        }
    }

    setContenidoGamificadoSimple (data = {}) {
        const { mensaje, cantidadPreguntas, cantidadTotalPreguntas, } = data

        this.setContenidoClase({...data, tipoContenido: 'gamificado-simple'})
        this.mensaje = mensaje ? mensaje : ''
        this.cantidadPreguntas = cantidadPreguntas ? cantidadPreguntas : 0
        this.cantidadTotalPreguntas = cantidadTotalPreguntas ? cantidadTotalPreguntas : 0

        return this
    }

    setContenidoClase (contenidoClase = new ContenidoClase()) {
        super.setContenidoClase(contenidoClase)
        return this
    }
}

module.exports = ContenidoGamificadoSimple