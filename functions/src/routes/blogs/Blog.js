const {Router} = require('express')
const router = Router()
const fileMiddleware = require('express-multipart-file-parser')

const {
    verificarCamposValidos,
    verificadorDeDatosRequeridos,
    verificadorDeTipoDeDatos,
    verificadorDeDatosBlog,
    verificacionExistenciaBlog,
    esPropietarioDelBlog,
    construirDatosBlog,
    verificacionExistenciaArchivoBlog
} = require('../../middlewares/blog')

const {
    estaAutenticado,
    esMiembroJekuaa,
    esDeMayorIgualNivel
} = require('../../middlewares/usuario')

const {
    crearBlog,
    obtenerBlog,
    obtenerDatosBlog,
    obtenerContenidoBlog,
    actualizarDatosBlog,
    eliminarBlog,
} = require('../../controllers/Blog')

// Operaciones para: Estudiantes
router.get('/obtenerBlog/:uid', 
    verificacionExistenciaBlog,
    verificacionExistenciaArchivoBlog,
    obtenerBlog)

router.get('/obtenerDatosBlog/:uid', 
    verificacionExistenciaBlog,
    obtenerDatosBlog)

router.get('/obtenerContenido/:uid',
    verificacionExistenciaBlog,
    verificacionExistenciaArchivoBlog,
    obtenerContenidoBlog)

router.post('/MeGusta/:uid', 
    estaAutenticado, 
    obtenerContenidoBlog)

router.post('/NoMeGusta/:uid', 
    estaAutenticado, 
    obtenerContenidoBlog)

// // Este tiene que estar en otro archivo
// router.post('/crearCarpetaGuardado/:nombreCarpeta', 
//     estaAutenticado, 
//     obtenerContenidoBlog)

// router.post('/guardarBlog/:uid/:nombreCarpeta?', 
//     estaAutenticado, 
//     obtenerContenidoBlog)

// Operaciones para: MiembrosJekuaa (limitado)
router.post('/miembroJekuaa/crearBlog', 
    estaAutenticado, 
    esMiembroJekuaa, 
    verificarCamposValidos,
    verificadorDeDatosRequeridos,
    verificadorDeTipoDeDatos,
    verificadorDeDatosBlog,
    construirDatosBlog,
    crearBlog)

router.put('/miembroJekuaa/actualizarDatosBlog/:uid', 
    estaAutenticado, 
    esMiembroJekuaa, 
    verificacionExistenciaBlog,
    esPropietarioDelBlog,
    verificarCamposValidos,
    verificadorDeTipoDeDatos,
    verificadorDeDatosBlog,
    construirDatosBlog,
    actualizarDatosBlog)

router.delete('/miembroJekuaa/eliminarBlog/:uid', 
    estaAutenticado, 
    esMiembroJekuaa, 
    verificacionExistenciaBlog, 
    esPropietarioDelBlog,
    eliminarBlog)


// Operaciones para: AdminJekuaa
router.post('/adminJekuaa/crearBlog', 
    estaAutenticado, 
    esMiembroJekuaa, 
    verificarCamposValidos,
    verificadorDeDatosRequeridos,
    verificadorDeTipoDeDatos,
    verificadorDeDatosBlog,
    construirDatosBlog,
    crearBlog)

router.put('/adminJekuaa/actualizarDatosBlog/:uid', 
    estaAutenticado, 
    esMiembroJekuaa, 
    verificacionExistenciaBlog,
    verificarCamposValidos,
    verificadorDeTipoDeDatos,
    verificadorDeDatosBlog,
    construirDatosBlog,
    actualizarDatosBlog)

router.delete('/adminJekuaa/eliminarBlog/:uid', 
    estaAutenticado, 
    esMiembroJekuaa, 
    verificacionExistenciaBlog, 
    eliminarBlog)


module.exports = router