const { Router } = require('express')
const router = Router()

const { estaAutenticado } = require('../../../../middlewares/api/usuario')
const { esModerador, esModeradorDeCursos } = require('../../../../middlewares/apiModerador')
const { esValidoElContenidoClaseParaVisualizar } = require('../../../../middlewares/apiModerador/curso/borrador')
const { obtenerUrlVideoClaseBorrador, obtenerArticuloClaseBorrador } = require('../../../../controllers/apiModerador/curso/contenidoClase/borrador')

router.get('/obtenerContenidoClase/video/:uidCurso/:uidClase', 
    estaAutenticado,
    esModerador,
    esModeradorDeCursos,
    esValidoElContenidoClaseParaVisualizar,
    obtenerUrlVideoClaseBorrador)


router.get('/obtenerContenidoClase/articulo/:uidCurso/:uidClase', 
    estaAutenticado,
    esModerador,
    esModeradorDeCursos,
    esValidoElContenidoClaseParaVisualizar,
    obtenerArticuloClaseBorrador)


module.exports = router