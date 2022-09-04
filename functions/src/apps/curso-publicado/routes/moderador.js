const { Router } = require('express')

const estaAutenticado = require('../../../helpers/estaAutenticado')
const { esModerador, esModeradorDeCursos } = require('../../../helpers/moderador')
const { obtenerUrlVideoClase, obtenerArticuloClase, obtenerVideoYoutubeClase } = require('../controllers/moderador')

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


// OBTENER VIDEO YOUTUBE
router.get('/obtenerVideoYoutube/:uidCurso/:uidClase', 
    estaAutenticado,
    esModerador,
    esModeradorDeCursos,
    obtenerVideoYoutubeClase)


// HABILITAR EL CURSO


// DESHABILITAR EL CURSO


// AGREGAR ESTUDIANTE


// QUITAR ESTUDIANTE


module.exports = router