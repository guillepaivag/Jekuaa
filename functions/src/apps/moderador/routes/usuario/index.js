const { Router } = require('express')
const router = Router()

const { estaAutenticado } = require('../../../estudiante/middlewares/usuario')
const { esModerador, esModeradorDeUsuarios } = require('../../middlewares')
const { validacionDeFuncionesParaMiembro } = require('../../middlewares/usuario')
const { asignarFuncionesMiembro } = require('../../controllers/usuario')


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