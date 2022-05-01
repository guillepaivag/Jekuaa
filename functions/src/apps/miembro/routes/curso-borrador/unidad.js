const { Router } = require('express')
const router = Router()

const { estaAutenticado } = require('../../../estudiante/middlewares/usuario')
const { esMiembro, elMiembroEsInstructor } = require('../../middlewares')

const { 
    permisoParaActualizarCursoBorrador, 
    perteneceAlInstructorEsteCurso,
    errorSiElCursoSeEstaPublicando, 
} = require('../../middlewares/curso-borrador')

const { 
    verificarDatosRequeridosPOST, 
    verificadorDeTipoDeDatosPOST, 
    verificadorDeDatosPOST, 
    construirDatosUnidadBorradorPOST,
    verificarDatosRequeridosPUT,
    verificadorDeTipoDeDatosPUT,
    verificadorDeDatosPUT,
    construirDatosUnidadBorradorPUT,
} = require('../../middlewares/curso-borrador/unidad')

const { 
    crearUnidadBorrador,
    actualizarUnidadBorrador,
    actualizarOrdenUnidadBorrador,
    eliminarUnidadBorrador,
} = require('../../controllers/curso-borrador/unidades')


// AGREGAR UNIDAD
router.post('/crear/:uidCurso', 
    estaAutenticado,
    esMiembro,
    elMiembroEsInstructor,
    perteneceAlInstructorEsteCurso,
    errorSiElCursoSeEstaPublicando,
    verificarDatosRequeridosPOST,
    verificadorDeTipoDeDatosPOST,
    verificadorDeDatosPOST,
    construirDatosUnidadBorradorPOST,
    crearUnidadBorrador)

// ACTUALIZAR NOMBRE UNIDAD
router.put('/actualizar/:uidCurso/:uidUnidad', 
    estaAutenticado,
    esMiembro,
    elMiembroEsInstructor,
    perteneceAlInstructorEsteCurso,
    errorSiElCursoSeEstaPublicando,
    verificarDatosRequeridosPUT,
    verificadorDeTipoDeDatosPUT,
    verificadorDeDatosPUT,
    construirDatosUnidadBorradorPUT,
    actualizarUnidadBorrador)

// ACTUALIZAR ORDEN DE UNIDADES
router.put('/actualizarOrden/:uidCurso', 
    estaAutenticado,
    esMiembro,
    elMiembroEsInstructor,
    perteneceAlInstructorEsteCurso,
    errorSiElCursoSeEstaPublicando,
    actualizarOrdenUnidadBorrador)

// ELIMINAR UNIDAD
router.delete('/eliminar/:uidCurso/:uidUnidad', 
    estaAutenticado,
    esMiembro,
    elMiembroEsInstructor,
    perteneceAlInstructorEsteCurso,
    errorSiElCursoSeEstaPublicando,
    eliminarUnidadBorrador)

module.exports = router