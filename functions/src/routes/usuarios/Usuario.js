const {Router} = require('express')
const router = Router()

const {
    estaAutenticado
} = require('../../middlewares/usuario')

const {

} = require('../../controllers/usuarios/Usuario')

router.post('/actualizarDatosPersonalesPorUID/:uid', estaAutenticado, actualizarUsuarioPorUID)

module.exports = router