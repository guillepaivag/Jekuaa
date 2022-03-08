const {Router} = require('express')
const router = Router()
// const fileMiddleware = require('express-multipart-file-parser')

const { estaAutenticado } = require('../../../middlewares/api/usuario')

const {
    verificacionExistenciaBlog,
    verificacionExistenciaArchivoBlog,
    velidarDatosMeGustaBlog,
} = require('../../../middlewares/apiMiembro/blog')
const {
    obtenerDatosBlog,
    obtenerContenidoBlog,
    ultimosBlogsPorPublicador,
} = require('../../../controllers/api/blog')
const { darMeGusta } = require('../../../controllers/api/blog')



// Operaciones para: Estudiantes
router.get('/ultimosBlogsPorPublicador/:uid', 
    ultimosBlogsPorPublicador)

router.get('/obtenerDatosBlog/:uid', 
    verificacionExistenciaBlog,
    obtenerDatosBlog)

router.get('/obtenerContenido/:uid',
    verificacionExistenciaArchivoBlog,
    obtenerContenidoBlog)

router.post('/meGustaBlog/:uid', 
    estaAutenticado, 
    verificacionExistenciaBlog,
    velidarDatosMeGustaBlog,
    darMeGusta)

module.exports = router