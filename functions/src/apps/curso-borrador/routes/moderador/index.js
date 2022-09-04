const { Router } = require('express')
const router = Router()

const estaAutenticado = require('../../../../helpers/estaAutenticado')
const { esModerador, esModeradorDeCursos } = require('../../../../helpers/moderador')
const { 
    verificarDatosRequeridosPOST, 
    verificadorDeTipoDeDatosPOST, 
    verificadorDeDatosPOST,
    construirDatosCursoBorradorPOST,
    verificacionAuxiliaresPUT
} = require('../../middlewares/moderador')
const { 
    crearCursoBorrador, 
    actualizarAuxiliares, 
    obtenerUrlVideoClase, 
    obtenerArticuloClase, 
    obtenerVideoYoutubeClase
} = require('../../controllers/moderador')

// CREAR
router.post('/crear', 
    estaAutenticado,
    esModerador,
    esModeradorDeCursos,
    verificarDatosRequeridosPOST,
    verificadorDeTipoDeDatosPOST,
    verificadorDeDatosPOST,
    construirDatosCursoBorradorPOST,
    crearCursoBorrador)


router.put('/actualizarAuxiliares/:uidCurso', 
    estaAutenticado,
    esModerador,
    esModeradorDeCursos,
    verificacionAuxiliaresPUT,
    actualizarAuxiliares)


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

module.exports = router