const admin = require('../../firebase-service')
const db = require('../../db')
const Curso = require('./Curso')
const Estado_CursoSolicitud = require('./ComponentesCursos/helpers/Estado_CursoSolicitud')

const COLECCION_CURSOS = 'CursoSolicitud'

class CursoSolicitud {
    constructor (estado = new Estado_CursoSolicitud(), curso = new Curso()) {
        this.estado = estado
        this.curso = curso
    }
}

module.exports = CursoSolicitud