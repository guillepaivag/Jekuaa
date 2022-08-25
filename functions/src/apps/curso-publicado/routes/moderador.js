const { Router } = require('express')

const estaAutenticado = require('../../../helpers/estaAutenticado')
const { esModerador, esModeradorDeCursos } = require('../../../helpers/moderador')
const { obtenerUrlVideoClase, obtenerArticuloClase } = require('../controllers/moderador')

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


// DESHABILITAR EL CURSO


// AGREGAR ESTUDIANTE


// QUITAR ESTUDIANTE


module.exports = router