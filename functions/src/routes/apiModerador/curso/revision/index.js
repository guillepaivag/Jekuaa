const { Router } = require('express')
const router = Router()

const { estaAutenticado } = require('../../../../middlewares/api/usuario')
const { esModerador, esModeradorDeCursos } = require('../../../../middlewares/apiModerador')
const { validarMensajeCursoRevisionNoAceptado, errorNoEstaEnRevision } = require('../../../../middlewares/apiModerador/curso/revision')
const { noAceptarCursoRevision, aceptarCursoRevision, cambiarEstadoRevision } = require('../../../../controllers/apiModerador/curso/revision')

// CAMBIAR ESTADO A REVISION
router.put('/cambiarEstadoRevision/:uidCurso', 
    estaAutenticado,
    esModerador,
    esModeradorDeCursos,
    cambiarEstadoRevision)


// ACEPTAR LA REVICION DEL CURSO
router.put('/aceptar/:uidCurso', 
    estaAutenticado,
    esModerador,
    esModeradorDeCursos,
    errorNoEstaEnRevision,
    aceptarCursoRevision)


// NO ACEPTAR LA REVICION DEL CURSO
router.put('/noAceptar/:uidCurso', 
    estaAutenticado,
    esModerador,
    esModeradorDeCursos,
    errorNoEstaEnRevision,
    validarMensajeCursoRevisionNoAceptado,
    noAceptarCursoRevision)


module.exports = router