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
const { esMiembro } = require('../../../middlewares/apiMiembro/miembro')

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
    permisoParaCrearBlog,
    verificadorDeDatosRequeridos,
    verificadorDeTipoDeDatos,
    verificadorDeDatosBlog,
    construirDatosBlog,
    crearBlog)

router.put('/actualizarBlog/:uid', 
    estaAutenticado, 
    esMiembro, 
    permisoParaActualizarBlog,
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
    permisoParaEliminarBlog,
    verificacionExistenciaBlog, 
    esPropietarioDelBlog,
    eliminarBlog)

router.get('/obtenerDatos/:uid', 
    estaAutenticado, 
    esMiembro, 
    verificacionExistenciaBlog,
    esPropietarioDelBlog,
    obtenerDatosBlog)

router.get('/obtenerContenido/:uid',
    estaAutenticado, 
    esMiembro, 
    verificacionExistenciaArchivoBlog,
    esPropietarioDelBlog,
    obtenerContenidoBlog)


module.exports = router