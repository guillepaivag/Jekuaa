const { Router } = require('express')
const router = Router()

const { estaAutenticado } = require('../../../estudiante/middlewares/usuario')
const { esModerador, esModeradorDeCursos } = require('../../../moderador/middlewares')
const { validarMensajeCursoRevisionNoAceptado, errorNoEstaEnRevision } = require('../../../moderador/middlewares/curso-revision')
const { noAceptarCursoRevision, aceptarCursoRevision, cambiarEstadoRevision } = require('../../../moderador/controllers/curso-revision')

// CAMBIAR ESTADO A REVISION
router.put('/cambiarEstadoRevision/:uidCurso', 
    estaAutenticado,
    esModerador,
    esModeradorDeCursos,
    cambiarEstadoRevision)


// ACEPTAR LA REVICION DEL CURSO
router.put('/aceptarRevision/:uidCurso', 
    estaAutenticado,
    esModerador,
    esModeradorDeCursos,
    errorNoEstaEnRevision,
    aceptarCursoRevision)


// NO ACEPTAR LA REVICION DEL CURSO
router.put('/noAceptarRevision/:uidCurso', 
    estaAutenticado,
    esModerador,
    esModeradorDeCursos,
    errorNoEstaEnRevision,
    validarMensajeCursoRevisionNoAceptado,
    noAceptarCursoRevision)


module.exports = router