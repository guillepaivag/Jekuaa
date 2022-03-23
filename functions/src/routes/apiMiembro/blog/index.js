const {Router} = require('express')
const router = Router()

const {
    verificadorDeDatosRequeridos,
    verificadorDeTipoDeDatos,
    verificadorDeDatosBlog,
    construirDatosBlog,
    verificacionExistenciaBlog,
    verificacionExistenciaArchivoBlog,
    esPropietarioDelBlog,
    permisoParaCrearBlog,
    permisoParaActualizarBlog,
    permisoParaEliminarBlog,
} = require('../../../middlewares/apiMiembro/blog')

const { estaAutenticado } = require('../../../middlewares/api/usuario')
const { esMiembro, elMiembroEsBlogger } = require('../../../middlewares/apiMiembro')

const { 
    crearBlog, 
    actualizarDatosBlog, 
    eliminarBlog, 
    obtenerDatosBlog,
    obtenerContenidoBlog,
} = require('../../../controllers/apiMiembro/blog')

router.post('/crearBlog',
    estaAutenticado,
    esMiembro,
    elMiembroEsBlogger,
    verificadorDeDatosRequeridos,
    verificadorDeTipoDeDatos,
    verificadorDeDatosBlog,
    construirDatosBlog,
    crearBlog)

router.put('/actualizarBlog/:uid', 
    estaAutenticado, 
    esMiembro, 
    elMiembroEsBlogger,
    verificacionExistenciaBlog,
    esPropietarioDelBlog,
    verificadorDeDatosRequeridos,
    verificadorDeTipoDeDatos,
    verificadorDeDatosBlog,
    construirDatosBlog,
    actualizarDatosBlog)

router.delete('/eliminarBlog/:uid', 
    estaAutenticado, 
    esMiembro, 
    elMiembroEsBlogger,
    verificacionExistenciaBlog, 
    esPropietarioDelBlog,
    eliminarBlog)

router.get('/obtenerDatos/:uid', 
    estaAutenticado, 
    esMiembro, 
    elMiembroEsBlogger,
    verificacionExistenciaBlog,
    esPropietarioDelBlog,
    obtenerDatosBlog)

router.get('/obtenerContenido/:uid',
    estaAutenticado, 
    esMiembro, 
    elMiembroEsBlogger,
    verificacionExistenciaBlog,
    esPropietarioDelBlog,
    obtenerContenidoBlog)


module.exports = router