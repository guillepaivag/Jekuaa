const {Router} = require('express')
const router = Router()

const {
    verificadorDeDatosRequeridos,
    verificadorDeTipoDeDatos,
    verificadorDeDatosBlog,
    construirDatosBlog,
    verificacionExistenciaBlog,
    esPropietarioDelBlog,
} = require('../middlewares/blog')

const { estaAutenticado } = require('../middlewares/usuario')
const { esMiembroJekuaa } = require('../middlewares/miembroJekuaa')

const {
    crearBlog,
    actualizarDatosBlog,
    eliminarBlog,
} = require('../controllers/usuarios/miembroJekuaa')

router.post('/crearBlog', 
    estaAutenticado, 
    esMiembroJekuaa, 
    verificadorDeDatosRequeridos,
    verificadorDeTipoDeDatos,
    verificadorDeDatosBlog,
    construirDatosBlog,
    crearBlog)

router.put('/actualizarBlog/:uid', 
    estaAutenticado, 
    esMiembroJekuaa, 
    verificacionExistenciaBlog,
    esPropietarioDelBlog,
    verificadorDeDatosRequeridos,
    verificadorDeTipoDeDatos,
    verificadorDeDatosBlog,
    construirDatosBlog,
    actualizarDatosBlog)

router.delete('/eliminarBlog/:uid', 
    estaAutenticado, 
    esMiembroJekuaa, 
    verificacionExistenciaBlog, 
    esPropietarioDelBlog,
    eliminarBlog)


module.exports = router