const { Router } = require('express')
const router = Router()

const { estaAutenticado } = require('../../../middlewares/api/usuario')
const { asignarFuncionesMiembro } = require('../../../controllers/apiModerador/usuario')
const { esModerador, esModeradorDeUsuarios } = require('../../../middlewares/apiModerador')
const { validacionDeFuncionesParaMiembro } = require('../../../middlewares/apiModerador/usuario')



// HABILITAR USUARIO




// DESHABILITAR USUARIO




// ASIGNAR UN FUNCION A UN MIEMBRO
router.put('/asignarFuncionesMiembro/:uidUsuario', 
    estaAutenticado,
    esModerador,
    esModeradorDeUsuarios,
    validacionDeFuncionesParaMiembro,
    asignarFuncionesMiembro)



module.exports = router