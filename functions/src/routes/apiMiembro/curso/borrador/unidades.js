const { Router } = require('express')
const router = Router()

const { estaAutenticado } = require('../../../../middlewares/api/usuario')
const { esMiembro, elMiembroEsInstructor } = require('../../../../middlewares/apiMiembro')

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
const { errorSiElCursoEstaEnRevision } = require('../../../../middlewares/apiMiembro/curso/curso/revision')

// AGREGAR UNIDAD
router.post('/crearUnidad/:uidCurso', 
    estaAutenticado,
    esMiembro,
    elMiembroEsInstructor,
    perteneceAlInstructorEsteCurso,
    errorSiElCursoEstaEnRevision,
    verificarDatosRequeridosPOST,
    verificadorDeTipoDeDatosPOST,
    verificadorDeDatosPOST,
    construirDatosUnidadBorradorPOST,
    crearUnidadBorrador)

// ACTUALIZAR NOMBRE UNIDAD
router.put('/actualizarUnidad/:uidCurso/:uidUnidad', 
    estaAutenticado,
    esMiembro,
    elMiembroEsInstructor,
    perteneceAlInstructorEsteCurso,
    errorSiElCursoEstaEnRevision,
    verificarDatosRequeridosPUT,
    verificadorDeTipoDeDatosPUT,
    verificadorDeDatosPUT,
    construirDatosUnidadBorradorPUT,
    actualizarUnidadBorrador)

// ACTUALIZAR ORDEN DE UNIDADES
router.put('/actualizarOrdenUnidad/:uidCurso', 
    estaAutenticado,
    esMiembro,
    elMiembroEsInstructor,
    perteneceAlInstructorEsteCurso,
    errorSiElCursoEstaEnRevision,
    actualizarOrdenUnidadBorrador)

// ELIMINAR UNIDAD
router.delete('/eliminarUnidad/:uidCurso/:uidUnidad', 
    estaAutenticado,
    esMiembro,
    elMiembroEsInstructor,
    perteneceAlInstructorEsteCurso,
    errorSiElCursoEstaEnRevision,
    eliminarUnidadBorrador)

module.exports = router