const {Router} = require('express')
const router = Router()

const {
    esMiembroJekuaa
} = require('../../middlewares/miembroJekuaa')

const {
    actualizarUsuarioPorUID,
    verDatosUsuarioPorUID,
    verDatosAuthPorUID
} = require('../../controllers/usuarios/MiembroJekuaa')

router.post('/verDatosUsuarioPorUID/:uid', verDatosUsuarioPorUID)
router.post('/verDatosAuthPorUID/:uid', verDatosAuthPorUID)
router.post('/actualizarUsuarioPorUID/:uid', actualizarUsuarioPorUID)

module.exports = router