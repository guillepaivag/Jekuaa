const {Router} = require('express')
const router = Router()

const {
    esMiembroJekuaa
} = require('../../middlewares/miembroJekuaa')

const {
    actualizarUsuarioPorUID
} = require('../../controllers/usuarios/MiembroJekuaa')

router.post('/actualizarUsuarioPorUID/:uid', actualizarUsuarioPorUID)

module.exports = router