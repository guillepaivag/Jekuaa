const ContenidoClase = require("../ContenidoClase")

class ContenidoGamificadoSimple extends ContenidoClase {
    constructor (data = {}) {
        const { mensaje, cantidadNiveles, cantidadPreguntasParaResponder, cantidadTotalPreguntas, duracion, } = data

        super({...data, tipoContenido: 'gamificado-simple'})
        this.mensaje = mensaje ? mensaje : ''
        this.cantidadNiveles = cantidadNiveles ? cantidadNiveles : 0
        this.cantidadPreguntasParaResponder = cantidadPreguntasParaResponder ? cantidadPreguntasParaResponder : 0
        this.cantidadTotalPreguntas = cantidadTotalPreguntas ? cantidadTotalPreguntas : 0
        this.duracion = duracion ? duracion : 0
    }

    getContenidoGamificadoSimple () {
        return {
            ...super.getContenidoClase(),
            mensaje: this.mensaje,
            cantidadNiveles: this.cantidadNiveles,
            cantidadPreguntasParaResponder: this.cantidadPreguntasParaResponder,
            cantidadTotalPreguntas: this.cantidadTotalPreguntas,
            duracion: this.duracion,
        }
    }

    setContenidoGamificadoSimple (data = {}) {
        const { mensaje, cantidadNiveles, cantidadPreguntasParaResponder, cantidadTotalPreguntas, duracion, } = data

        this.setContenidoClase({...data, tipoContenido: 'gamificado-simple'})
        this.mensaje = mensaje ? mensaje : ''
        this.cantidadNiveles = cantidadNiveles ? cantidadNiveles : 0
        this.cantidadPreguntasParaResponder = cantidadPreguntasParaResponder ? cantidadPreguntasParaResponder : 0
        this.cantidadTotalPreguntas = cantidadTotalPreguntas ? cantidadTotalPreguntas : 0
        this.duracion = duracion ? duracion : 0

        return this
    }

    setContenidoClase (contenidoClase = new ContenidoClase()) {
        super.setContenidoClase(contenidoClase)
        return this
    }
}

module.exports = ContenidoGamificadoSimple