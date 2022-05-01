const { Router } = require('express')
const router = Router()

const { estaAutenticado } = require('../../../estudiante/middlewares/usuario')
const { actualizarRol } = require('../../controllers/usuario')
const { esPropietario } = require('../../middlewares')
const { validarDatosCambioRol } = require('../../middlewares/usuario')


// CAMBIAR ROLES DE UN USUARIO
router.put('/actualizarRol/:uidUsuario', 
    estaAutenticado,
    esPropietario,
    validarDatosCambioRol,
    actualizarRol)



module.exports = router