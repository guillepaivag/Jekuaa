const { Router } = require('express')
const router = Router()

const { estaAutenticado } = require('../../../estudiante/middlewares/usuario')
const { esMiembro, elMiembroEsInstructor } = require('../../middlewares')

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
    verificarCursoEstadoPublicacion,
    esValidoElCursoBorrador,
    errorSiElCursoSeEstaPublicando,
} = require('../../middlewares/curso-borrador')

const { 
    crearCursoBorrador, 
    actualizarCursoBorrador, 
    publicarCursoBorrador
} = require('../../controllers/curso-borrador')

const { 
    actualizarPrecioCurso 
} = require('../../controllers/curso-borrador/xd')


// CREAR
router.post('/crear', 
    estaAutenticado,
    esMiembro,
    elMiembroEsInstructor,
    verificarDatosRequeridosPOST,
    verificadorDeTipoDeDatosPOST,
    verificadorDeDatosPOST,
    construirDatosCursoBorradorPOST,
    crearCursoBorrador)


// ACTUALIZAR CONTENIDO DE BORRADOR
router.put('/actualizar/:uidCurso', 
    estaAutenticado,
    esMiembro,
    elMiembroEsInstructor,
    perteneceAlInstructorEsteCurso,
    errorSiElCursoSeEstaPublicando,
    verificarDatosRequeridosPUT,
    verificadorDeTipoDeDatosPUT,
    verificadorDeDatosPUT,
    construirDatosCursoBorradorPUT,
    verificacionDeEstadoDocumentoPUT,
    actualizarCursoBorrador)


// ACTUALIZAR CONTENIDO DE BORRADOR
router.put('/publicar/:uidCurso',
    estaAutenticado,
    esMiembro,
    elMiembroEsInstructor,
    perteneceAlInstructorEsteCurso,
    verificarCursoEstadoPublicacion,
    esValidoElCursoBorrador,
    publicarCursoBorrador)



// // ACTUALIZAR EL PRECIO DEL CURSO (Actualiza el precio del curso para el: publicado y borrador)
// router.put('/actualizarPrecio/:uidCurso', 
//     estaAutenticado,
//     esMiembro,
//     elMiembroEsInstructor,
//     perteneceAlInstructorEsteCurso,
//     actualizarPrecioCurso)



// ELIMINAR CURSO (Elimina el borrador y el publicado, 
// solo si no tiene publicado, si tiene publicado se puede eliminar 
// solo si no tiene estudiantes)


module.exports = router