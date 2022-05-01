const { Router } = require('express')
const { estaAutenticado } = require('../../../estudiante/middlewares/usuario')
const { obtenerUrlVideoClase, obtenerArticuloClase } = require('../../controllers/curso-publicado')
const { esModerador, esModeradorDeCursos } = require('../../middlewares')
const router = Router()

// OBTENER VIDEO
router.get('/obtenerVideo/:uidCurso/:uidClase', 
    estaAutenticado,
    esModerador,
    esModeradorDeCursos,
    obtenerUrlVideoClase)


// OBTENER ARTICULO
router.get('/obtenerArticulo/:uidCurso/:uidClase', 
    estaAutenticado,
    esModerador,
    esModeradorDeCursos,
    obtenerArticuloClase)


// HABILITAR EL CURSO
router.put('/habilitar/:uidCurso', )


// DESHABILITAR EL CURSO
router.put('/deshabilitar/:uidCurso', )


module.exports = router