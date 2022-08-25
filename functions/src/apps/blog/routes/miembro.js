const {Router} = require('express')
const router = Router()

const estaAutenticado = require('../../../helpers/estaAutenticado')
const { esMiembro, esMiembroBlogger } = require('../../../helpers/miembro')

const { verificacionExistenciaBlog } = require('../middlewares')

const { 
    esPropietarioDelBlog,
    verificadorDeDatosRequeridos,
    verificadorDeTipoDeDatos,
    verificadorDeDatosBlog,
    construirDatosBlogPOST,
    construirDatosBlogPUT,
} = require('../middlewares/miembro')


const { 
    crearBlog, 
    actualizarDatosBlog, 
    eliminarBlog, 
    obtenerDatosBlog,
    obtenerContenidoBlog,
} = require('../controllers/miembro')


router.post('/crear',
    estaAutenticado,
    esMiembro,
    esMiembroBlogger,
    verificadorDeDatosRequeridos,
    verificadorDeTipoDeDatos,
    verificadorDeDatosBlog,
    construirDatosBlogPOST,
    crearBlog)

router.put('/actualizar/:uidBlog', 
    estaAutenticado, 
    esMiembro, 
    esMiembroBlogger,
    verificacionExistenciaBlog,
    esPropietarioDelBlog,
    verificadorDeDatosRequeridos,
    verificadorDeTipoDeDatos,
    verificadorDeDatosBlog,
    construirDatosBlogPUT,
    actualizarDatosBlog)

router.get('/obtenerDatos/:uidBlog', 
    estaAutenticado, 
    esMiembro, 
    esMiembroBlogger,
    verificacionExistenciaBlog,
    esPropietarioDelBlog,
    obtenerDatosBlog)

router.get('/obtenerContenido/:uidBlog',
    estaAutenticado, 
    esMiembro, 
    esMiembroBlogger,
    verificacionExistenciaBlog,
    esPropietarioDelBlog,
    obtenerContenidoBlog)


module.exports = router