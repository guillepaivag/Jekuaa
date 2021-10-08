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
    obtenerContenidoBlogParaMiembrosJekuaa,
    habilitarBlog,
    aceptarActualizacion,
    eliminarBlog,
} = require('../../controllers/Blog')

// Operaciones para: Usuarios
router.get('/obtenerContenido/:uid', obtenerContenidoBlog)

// Operaciones para: MiembrosJekuaa
router.post('/miembroJekuaa/crearBlog', estaAutenticado, esMiembroJekuaa, crearBlog)
router.post('/miembroJekuaa/obtenerDatosBlog/:uid', estaAutenticado, esMiembroJekuaa, obtenerDatosBlog)
router.post('/miembroJekuaa/actualizarDatosBlog/:uid', estaAutenticado, esMiembroJekuaa, actualizarDatosBlog)
router.post('/miembroJekuaa/solicitarActualizacionDeContenido/:uid', fileMiddleware, estaAutenticado, esMiembroJekuaa, solicitarActualizacionDeContenido)
router.post('/miembroJekuaa/obtenerUrlFirmada/:uid', estaAutenticado, esMiembroJekuaa, obtenerUrlFirmada)
router.post('/miembroJekuaa/obtenerContenido/:uid', estaAutenticado, esMiembroJekuaa, obtenerContenidoBlogParaMiembrosJekuaa)
router.post('/miembroJekuaa/aceptarActualizacion/:uid', estaAutenticado, esMiembroJekuaa, aceptarActualizacion)
router.post('/miembroJekuaa/habilitarBlog/:uid', estaAutenticado, esMiembroJekuaa, habilitarBlog)
router.post('/miembroJekuaa/eliminarBlog/:uid', estaAutenticado, esMiembroJekuaa, eliminarBlog)

module.exports = router