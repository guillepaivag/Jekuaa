const {Router} = require('express')
const router = Router()
const fileMiddleware = require('express-multipart-file-parser')

const {
    
} = require('../../middlewares/blog')

const {
    estaAutenticado,
} = require('../../middlewares/usuario')

const {
    esMiembroJekuaa,
    esDeMayorIgualNivel
} = require('../../middlewares/miembroJekuaa')

const {
    crearBlog,
    obtenerDatosBlog,
    actualizarDatosBlog,
    solicitarActualizacionDeContenido,
    obtenerUrlFirmada,
    obtenerContenidoBlog,
    eliminarBlog,
    habilitarBlog
} = require('../../controllers/blogs/Blog')

// Operaciones para: Usuarios
router.get('/publicado/obtenerContenido/:uid', obtenerContenidoBlog)

// Operaciones para: MiembrosJekuaa
router.post('/crearBlog', estaAutenticado, esMiembroJekuaa, crearBlog)
router.post('/obtenerDatosBlog/:uid', estaAutenticado, esMiembroJekuaa, obtenerDatosBlog)
router.post('/actualizarDatosBlog/:uid', estaAutenticado, esMiembroJekuaa, actualizarDatosBlog)
router.post('/solicitarActualizacionDeContenido/:uid', fileMiddleware, estaAutenticado, esMiembroJekuaa, solicitarActualizacionDeContenido)
router.post('/obtenerUrlFirmada/:uid', estaAutenticado, esMiembroJekuaa, obtenerUrlFirmada)
router.get('/pendiente/obtenerContenido/:uid', estaAutenticado, esMiembroJekuaa, obtenerContenidoBlog)
router.post('/eliminarBlog/:uid', estaAutenticado, esMiembroJekuaa, eliminarBlog)
router.post('/habilitarBlog/:uid', estaAutenticado, esMiembroJekuaa, habilitarBlog)

module.exports = router