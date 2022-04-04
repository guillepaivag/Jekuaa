const { Router } = require('express')
const router = Router()

const { estaAutenticado } = require('../../../estudiante/middlewares/usuario')
const { esMiembro, elMiembroEsInstructor } = require('../../middlewares')
const { errorSiElCursoEstaEnRevision } = require('../../middlewares/curso-revision')
const { 
    verificarDatosRequeridosPOST, 
    verificadorDeTipoDeDatosPOST, 
    verificadorDeDatosPOST, 
    construirDatosCursoBorradorPOST, 
    verificarDatosRequeridosPUT, 
    verificadorDeTipoDeDatosPUT, 
    verificadorDeDatosPUT, 
    construirDatosCursoBorradorPUT,
} = require('../../middlewares/curso-borrador/clase')
const { 
    permisoParaActualizarCursoBorrador, 
    perteneceAlInstructorEsteCurso 
} = require('../../middlewares/curso-borrador')
const { 
    crearClaseBorrador, 
    actualizarClaseBorrador, 
    actualizarOrdenClaseBorrador,
    actualizarUnidadClaseBorrador,
    eliminarClaseBorrador
} = require('../../controllers/curso-borrador/clases')



// AGREGAR CLASE
router.post('/crear/:uidCurso/:uidUnidad', 
    estaAutenticado,
    esMiembro,
    elMiembroEsInstructor,
    perteneceAlInstructorEsteCurso,
    errorSiElCursoEstaEnRevision,
    verificarDatosRequeridosPOST,
    verificadorDeTipoDeDatosPOST,
    verificadorDeDatosPOST,
    construirDatosCursoBorradorPOST,
    crearClaseBorrador)

// ACTUALIZAR CLASE: nombre, descripcion
router.put('/actualizar/:uidCurso/:uidUnidad/:uidClase', 
    estaAutenticado,
    esMiembro,
    elMiembroEsInstructor,
    perteneceAlInstructorEsteCurso,
    errorSiElCursoEstaEnRevision,
    verificarDatosRequeridosPUT,
    verificadorDeTipoDeDatosPUT,
    verificadorDeDatosPUT,
    construirDatosCursoBorradorPUT,
    actualizarClaseBorrador)

// ACTUALIZAR ORDEN DE CLASES: ordenClase
router.put('/actualizarOrden/:uidCurso/:uidUnidad', 
    estaAutenticado,
    esMiembro,
    elMiembroEsInstructor,
    perteneceAlInstructorEsteCurso,
    errorSiElCursoEstaEnRevision,
    actualizarOrdenClaseBorrador)

// CAMBIAR UNIDAD DE UNA CLASE
router.put('/actualizarUnidad/:uidCurso/:uidClase', 
    estaAutenticado,
    esMiembro,
    elMiembroEsInstructor,
    perteneceAlInstructorEsteCurso,
    errorSiElCursoEstaEnRevision,
    actualizarUnidadClaseBorrador)

// ELIMINAR CLASE: AGREGAR UNA ETIQUETA AL DOCUMENTO QUE DIGA QUE SE ELIMINARA
// CON CLOUD FUNCTIONS ELIMINAR TODA LA CLASE
router.delete('/eliminar/:uidCurso/:uidUnidad/:uidClase', 
    estaAutenticado,
    esMiembro,
    elMiembroEsInstructor,
    perteneceAlInstructorEsteCurso,
    errorSiElCursoEstaEnRevision,
    eliminarClaseBorrador)


module.exports = router