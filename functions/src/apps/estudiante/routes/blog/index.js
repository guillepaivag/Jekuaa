const {Router} = require('express')
const router = Router()

const { estaAutenticado } = require('../../../estudiante/middlewares/usuario')
const {
    verificacionExistenciaBlog,
    verificacionExistenciaArchivoBlog,
    velidarDatosMeGustaBlog,
} = require('../../../miembro/middlewares/blog')
const {
    obtenerDatosBlog,
    obtenerContenidoBlog,
    ultimosBlogsPorPublicador,
    darMeGusta
} = require('../../../estudiante/controllers/blog')



// Operaciones para: Estudiantes
router.get('/ultimosBlogsPorPublicador/:uid', 
    ultimosBlogsPorPublicador)

router.get('/obtenerDatos/:uid', 
    verificacionExistenciaBlog,
    obtenerDatosBlog)

router.get('/obtenerContenido/:uid',
    verificacionExistenciaArchivoBlog,
    obtenerContenidoBlog)

router.post('/meGusta/:uid', 
    estaAutenticado, 
    verificacionExistenciaBlog,
    velidarDatosMeGustaBlog,
    darMeGusta)

module.exports = router