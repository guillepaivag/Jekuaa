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
    verificadorDeDatosRequeridos,
    verificadorDeTipoDeDatos,
    verificadorDeDatosBlog,
    construirDatosBlog,
    crearBlog)

router.put('/actualizarBlog/:uid', 
    estaAutenticado, 
    esMiembro, 
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
    verificacionExistenciaBlog, 
    esPropietarioDelBlog,
    eliminarBlog)

router.get('/obtenerDatos/:uid', 
    estaAutenticado, 
    esMiembro, 
    verificacionExistenciaBlog,
    obtenerDatosBlog)

router.get('/obtenerContenido/:uid',
    estaAutenticado, 
    esMiembro, 
    verificacionExistenciaArchivoBlog,
    obtenerContenidoBlog)


module.exports = router