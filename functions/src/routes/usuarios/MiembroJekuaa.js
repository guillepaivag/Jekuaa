const {Router} = require('express')
const router = Router()

const {
    esMiembroJekuaa
} = require('../../middlewares/miembroJekuaa')

const {
    actualizarUsuarioPorUID,
    verUsuarioPorUID
} = require('../../controllers/usuarios/MiembroJekuaa')

router.post('/verDatosDeUnUsuarioPorUID/:uid', verUsuarioPorUID)
router.post('/actualizarUsuarioPorUID/:uid', actualizarUsuarioPorUID)

module.exports = router