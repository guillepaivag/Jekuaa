const { Router } = require('express')
const router = Router()

const estaAutenticado = require('../../../helpers/estaAutenticado')

const { 
    validacionEquipo,
    validacionEquipoActualizar,
    validacionEquipoEliminar
} = require('../middlewares')

const { crearEquipo, actualizarEquipo, eliminarEquipo } = require('../controllers')


router.post('/equipo',
    estaAutenticado,
    validacionEquipo,
    crearEquipo)

router.put('/equipo/:uidEquipo',
    estaAutenticado,
    validacionEquipoActualizar,
    actualizarEquipo)

router.delete('/equipo/:uidEquipo',
    estaAutenticado,
    validacionEquipoEliminar,
    eliminarEquipo)

module.exports = router