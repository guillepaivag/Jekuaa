const db = require("../../../../../../db")

class PreguntasGamificadoSimple {
    constructor ( data = {} ) {
        const { uid, pregunta, orden, nivel, duracion, respuestas, } = data

        this.uid = uid ? uid : db.collection('PreguntasGamificadoSimple').doc().id
        this.pregunta = pregunta ? pregunta : ''
        this.orden = orden ? orden : 0
        this.nivel = nivel ? nivel : 0
        this.duracion = duracion ? duracion : 0
        this.respuestas = respuestas ? respuestas : []
    }

    getPreguntasGamificadoSimple () {
        return {
            pregunta: this.pregunta,
            orden: this.orden,
            nivel: this.nivel,
            duracion: this.duracion,
            respuestas: this.respuestas,
        }
    }

    setPreguntasGamificadoSimple ( data = {} ) {
        const { uid, pregunta, orden, nivel, duracion, respuestas, } = data

        this.uid = uid ? uid : db.collection('PreguntasGamificadoSimple').doc().id
        this.pregunta = pregunta ? pregunta : ''
        this.orden = orden ? orden : 0
        this.nivel = nivel ? nivel : 0
        this.duracion = duracion ? duracion : 0
        this.respuestas = respuestas ? respuestas : []
    }
}

module.exports = PreguntasGamificadoSimple