const { Router } = require('express')
const router = Router()

const { estaAutenticado } = require('../../../../middlewares/api/usuario')
const { esMiembro, elMiembroEsInstructor } = require('../../../../middlewares/apiMiembro')

const { 
    permisoParaCrearCursoBorrador,
    permisoParaActualizarCursoBorrador,
    verificarDatosRequeridosPOST, 
    verificadorDeTipoDeDatosPOST, 
    verificadorDeDatosPOST, 
    construirDatosCursoBorradorPOST,
    perteneceAlInstructorEsteCurso,
    verificarDatosRequeridosPUT,
    verificadorDeTipoDeDatosPUT,
    verificadorDeDatosPUT,
    construirDatosCursoBorradorPUT,
    verificacionDeEstadoDocumentoPUT,
} = require('../../../../middlewares/apiMiembro/curso/curso/borrador')

const { 
    crearCursoBorrador, 
    actualizarCursoBorrador 
} = require('../../../../controllers/apiMiembro/curso/curso/borrador')

const { 
    actualizarPrecioCurso 
} = require('../../../../controllers/apiMiembro/curso/curso')

const { errorSiElCursoEstaEnRevision } = require('../../../../middlewares/apiMiembro/curso/curso/revision')


// CREAR
router.post('/crearCursoBorrador', 
    estaAutenticado,
    esMiembro,
    elMiembroEsInstructor,
    verificarDatosRequeridosPOST,
    verificadorDeTipoDeDatosPOST,
    verificadorDeDatosPOST,
    construirDatosCursoBorradorPOST,
    crearCursoBorrador)


// ACTUALIZAR CONTENIDO DE BORRADOR
router.put('/actualizarCursoBorrador/:uidCursoBorrador', 
    estaAutenticado,
    esMiembro,
    elMiembroEsInstructor,
    perteneceAlInstructorEsteCurso,
    errorSiElCursoEstaEnRevision,
    verificarDatosRequeridosPUT,
    verificadorDeTipoDeDatosPUT,
    verificadorDeDatosPUT,
    construirDatosCursoBorradorPUT,
    verificacionDeEstadoDocumentoPUT,
    actualizarCursoBorrador)



// // ACTUALIZAR EL PRECIO DEL CURSO (Actualiza el precio del curso para el: publicado y borrador)
// router.put('/actualizarCursoBorrador/precio/:uidCursoBorrador', 
//     estaAutenticado,
//     esMiembro,
//     elMiembroEsInstructor,
//     perteneceAlInstructorEsteCurso,
//     actualizarPrecioCurso)



// ELIMINAR CURSO (Elimina el borrador y el publicado, 
// solo si no tiene publicado, si tiene publicado se puede eliminar 
// solo si no tiene estudiantes)


module.exports = router