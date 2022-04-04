const { Router } = require('express')
const router = Router()

const { estaAutenticado } = require('../../../estudiante/middlewares/usuario')
const { esModerador, esModeradorDeCursos } = require('../../../moderador/middlewares')
const { esValidoElContenidoClaseParaVisualizar } = require('../../../moderador/middlewares/curso-borrador/contenidoClase')
const { obtenerUrlVideoClaseBorrador, obtenerArticuloClaseBorrador } = require('../../../moderador/controllers/curso-borrador/contenidoClase')

router.get('/obtenerVideo/:uidCurso/:uidClase', 
    estaAutenticado,
    esModerador,
    esModeradorDeCursos,
    esValidoElContenidoClaseParaVisualizar,
    obtenerUrlVideoClaseBorrador)


router.get('/obtenerArticulo/:uidCurso/:uidClase', 
    estaAutenticado,
    esModerador,
    esModeradorDeCursos,
    esValidoElContenidoClaseParaVisualizar,
    obtenerArticuloClaseBorrador)


module.exports = router