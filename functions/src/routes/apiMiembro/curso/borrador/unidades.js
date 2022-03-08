const { Router } = require('express')
const router = Router()

const { estaAutenticado } = require('../../../../middlewares/api/usuario')
const { esMiembro } = require('../../../../middlewares/apiMiembro/miembro')

const { permisoParaActualizarCursoBorrador, perteneceAlInstructorEsteCurso, } = require('../../../../middlewares/apiMiembro/curso/curso/borrador')

const { 
    verificarDatosRequeridosPOST, 
    verificadorDeTipoDeDatosPOST, 
    verificadorDeDatosPOST, 
    construirDatosUnidadBorradorPOST,
    verificarDatosRequeridosPUT,
    verificadorDeTipoDeDatosPUT,
    verificadorDeDatosPUT,
    construirDatosUnidadBorradorPUT,
    verificacionDeEstadoDocumentoPUT,
} = require('../../../../middlewares/apiMiembro/curso/unidad/borrador')

const { 
    crearUnidadBorrador,
    actualizarUnidadBorrador,
    actualizarOrdenUnidadBorrador,
    eliminarUnidadBorrador,
} = require('../../../../controllers/apiMiembro/curso/unidad/borrador')

// AGREGAR UNIDAD
router.post('/crearUnidadBorrador/:uidCursoBorrador', 
    estaAutenticado,
    esMiembro,
    permisoParaActualizarCursoBorrador,
    perteneceAlInstructorEsteCurso,
    verificarDatosRequeridosPOST,
    verificadorDeTipoDeDatosPOST,
    verificadorDeDatosPOST,
    construirDatosUnidadBorradorPOST,
    crearUnidadBorrador)

// ACTUALIZAR NOMBRE UNIDAD
router.put('/actualizarUnidadBorrador/:uidCursoBorrador/:uidUnidadBorrador', 
    estaAutenticado,
    esMiembro,
    permisoParaActualizarCursoBorrador,
    perteneceAlInstructorEsteCurso,
    verificarDatosRequeridosPUT,
    verificadorDeTipoDeDatosPUT,
    verificadorDeDatosPUT,
    construirDatosUnidadBorradorPUT,
    actualizarUnidadBorrador)

// ACTUALIZAR ORDEN DE UNIDADES
router.put('/actualizarOrdenUnidadBorrador/:uidCursoBorrador', 
    estaAutenticado,
    esMiembro,
    permisoParaActualizarCursoBorrador,
    perteneceAlInstructorEsteCurso,
    actualizarOrdenUnidadBorrador)

// ELIMINAR UNIDAD
router.delete('/eliminarUnidadBorrador/:uidCursoBorrador/:uidUnidadBorrador', 
    estaAutenticado,
    esMiembro,
    permisoParaActualizarCursoBorrador,
    perteneceAlInstructorEsteCurso,
    eliminarUnidadBorrador)

module.exports = router