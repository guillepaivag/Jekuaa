const {Router} = require('express')
const router = Router()

const {
    estaAutenticado,
} = require('../../middlewares/usuario')

const {
    esMiembroJekuaa,
    esDeMayorIgualNivel
} = require('../../middlewares/miembroJekuaa')

const {
    crearUsuario,
    verDatosUsuarioPorUID,
    verDatosAuthPorUID,
    actualizarUsuarioPorUID,
    habilitarUsuarioPorUID,
    eliminarUsuarioPorUID
} = require('../../controllers/usuarios/MiembroJekuaa')

router.post('/verDatosUsuarioPorUID/:uid', estaAutenticado, esMiembroJekuaa, verDatosUsuarioPorUID)
router.post('/verDatosAuthPorUID/:uid', estaAutenticado, esMiembroJekuaa, verDatosAuthPorUID)
router.post('/crearUsuario', estaAutenticado, esMiembroJekuaa, crearUsuario)
router.post('/actualizarUsuarioPorUID/:uid', estaAutenticado, esMiembroJekuaa, esDeMayorIgualNivel, actualizarUsuarioPorUID)
router.post('/habilitarUsuarioPorUID/:uid', estaAutenticado, esMiembroJekuaa, esDeMayorIgualNivel, habilitarUsuarioPorUID)
// router.post('/eliminarUsuarioPorUID/:uid', estaAutenticado, esMiembroJekuaa, esDeMayorIgualNivel, eliminarUsuarioPorUID)

module.exports = router