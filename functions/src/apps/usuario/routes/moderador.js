const { Router } = require('express')
const router = Router()

const estaAutenticado = require('../../../helpers/estaAutenticado')
const { esModerador, esModeradorDeUsuarios } = require('../../../helpers/moderador')
const { validacionDeFuncionesParaMiembro } = require('../middlewares/moderador')
const { asignarFuncionesMiembro, obtenerUsuario } = require('../controllers/moderador')

// OBTENER USUARIO
router.get('/obtenerUsuario/:tipo/:codigo', 
    estaAutenticado,
    esModerador,
    esModeradorDeUsuarios,
    obtenerUsuario)



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