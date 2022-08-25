const { Router } = require('express')
const router = Router()

const estaAutenticado = require('../../../helpers/estaAutenticado')
const { esPropietario } = require('../../../helpers/propietario')
const { validarDatosCambioRol, validacionDeFuncionesParaModerador } = require('../middlewares/propietario')
const { actualizarRol, asignarFuncionesModerador } = require('../controllers/propietario')



// CAMBIAR ROLES DE UN USUARIO
router.put('/actualizarRol/:uidUsuario', 
    estaAutenticado,
    esPropietario,
    validarDatosCambioRol,
    actualizarRol)



// ASIGNAR UN FUNCION A UN MIEMBRO
router.put('/asignarFuncionesModerador/:uidUsuario', 
    estaAutenticado,
    esPropietario,
    validacionDeFuncionesParaModerador,
    asignarFuncionesModerador)


module.exports = router