const { Router } = require('express')
const router = Router()

const { estaAutenticado } = require('../../../../middlewares/api/usuario')
const { esModerador, esModeradorDeCursos } = require('../../../../middlewares/apiModerador')
const { validarMensajeCursoRevisionNoAceptado } = require('../../../../middlewares/apiModerador/curso')
const { noAceptarCursoRevision } = require('../../../../controllers/apiModerador/curso/revision')

// ACEPTAR LA REVICION DEL CURSO
router.put('/aceptar/:uidCurso', 
    estaAutenticado,
    )


// NO ACEPTAR LA REVICION DEL CURSO
router.put('/no-aceptar/:uidCurso', 
    estaAutenticado,
    esModerador,
    esModeradorDeCursos,
    validarMensajeCursoRevisionNoAceptado,
    noAceptarCursoRevision)


module.exports = router