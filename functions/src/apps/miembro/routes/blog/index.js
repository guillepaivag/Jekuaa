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
} = require('../../middlewares/blog')

const { estaAutenticado } = require('../../../estudiante/middlewares/usuario')
const { esMiembro, elMiembroEsBlogger } = require('../../../miembro/middlewares/index')

const { 
    crearBlog, 
    actualizarDatosBlog, 
    eliminarBlog, 
    obtenerDatosBlog,
    obtenerContenidoBlog,
} = require('../../../miembro/controllers/blog')

router.post('/crear',
    estaAutenticado,
    esMiembro,
    elMiembroEsBlogger,
    verificadorDeDatosRequeridos,
    verificadorDeTipoDeDatos,
    verificadorDeDatosBlog,
    construirDatosBlog,
    crearBlog)

router.put('/actualizar/:uid', 
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

router.delete('/eliminar/:uid', 
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