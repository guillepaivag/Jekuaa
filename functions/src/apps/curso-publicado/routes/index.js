const { Router } = require('express')
const router = Router()

const estaAutenticado = require('../../../helpers/estaAutenticado')
const { 
    verificacionExistenciaCurso, 
    velidarDatosMeGustaCurso, 
    validacionObtencionContenido, 
    estaAutenticadoParaVerContenidoClase, 
    marcarComoClaseVisualizada 
} = require('../middlewares')
const { darMeGusta, obtenerUrlVideoClase, obtenerArticuloClase, obtenerVideoYoutubeClase } = require('../controllers')

router.post('/meGusta/:uidCurso', 
    estaAutenticado,
    verificacionExistenciaCurso,
    velidarDatosMeGustaCurso, 
    darMeGusta)




router.get('/obtenerVideo/:uidCurso/:uidClase', 
    estaAutenticadoParaVerContenidoClase,
    validacionObtencionContenido,
    marcarComoClaseVisualizada,
    obtenerUrlVideoClase)




router.get('/obtenerArticulo/:uidCurso/:uidClase', 
    estaAutenticadoParaVerContenidoClase,
    validacionObtencionContenido,
    marcarComoClaseVisualizada,
    obtenerArticuloClase)




router.get('/obtenerVideoYoutube/:uidCurso/:uidClase', 
    estaAutenticadoParaVerContenidoClase,
    validacionObtencionContenido,
    marcarComoClaseVisualizada,
    obtenerVideoYoutubeClase)


module.exports = router