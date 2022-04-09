const { Router } = require('express')
const router = Router()

const { estaAutenticado } = require('../../../estudiante/middlewares/usuario')
const { esMiembro, elMiembroEsInstructor } = require('../../middlewares')
const { 
    permisoParaActualizarCursoBorrador, 
    perteneceAlInstructorEsteCurso, 
    errorSiElCursoSeEstaPublicando
} = require('../../middlewares/curso-borrador')
const busboyMiddleware = require('../../../../helpers/busboy-middleware')
const obtenerMetadataArchivo = require('../../../../helpers/obtener-metadata-archivo')
const { 
    esValidoElContenidoClaseVideo, 
    construirElContenidoClaseVideo, 
    esValidoElContenidoClaseArticulo, 
    construirElContenidoClaseArticulo, 
    validarDatosParaCambiarEstadoArchivo
} = require('../../../../apps/miembro/middlewares/curso-borrador/contenidoClase')

const { 
    agregarContenidoClaseVideoBorrador, 
    agregarContenidoClaseArticuloBorrador, 
    eliminarContenidoClaseBorrador,
    obtenerUrlVideoClaseBorrador,
    obtenerArticuloClaseBorrador,
    cambiarEstadoArchivo
} = require('../../../../apps/miembro/controllers/curso-borrador/contenidoClase')



router.put('/cambiarEstadoArchivo/:uidCurso/:uidClase', 
    estaAutenticado,
    esMiembro,
    elMiembroEsInstructor,
    perteneceAlInstructorEsteCurso, 
    validarDatosParaCambiarEstadoArchivo,
    cambiarEstadoArchivo)





// // Funciona bien pero no con Cloud Functions: Ya que no permite 
// // un archivo de tamaño mayor a 10MB.
// router.put('/actualizarVideo/:uidCurso/:uidUnidad/:uidClase', 
//     estaAutenticado,
//     esMiembro,
//     elMiembroEsInstructor,
//     perteneceAlInstructorEsteCurso, 
//     busboyMiddleware,
//     obtenerMetadataArchivo,
//     esValidoElContenidoClaseVideo,
//     construirElContenidoClaseVideo,
//     agregarContenidoClaseVideoBorrador)





router.put('/actualizarArticulo/:uidCurso/:uidUnidad/:uidClase', 
    estaAutenticado,
    esMiembro,
    elMiembroEsInstructor,
    perteneceAlInstructorEsteCurso, 
    errorSiElCursoSeEstaPublicando,
    esValidoElContenidoClaseArticulo,
    construirElContenidoClaseArticulo,
    agregarContenidoClaseArticuloBorrador)





router.delete('/eliminar/:uidCurso/:uidUnidad/:uidClase', 
    estaAutenticado,
    esMiembro,
    elMiembroEsInstructor,
    perteneceAlInstructorEsteCurso, 
    errorSiElCursoSeEstaPublicando,
    eliminarContenidoClaseBorrador)




router.get('/obtenerVideo/:uidCurso/:uidClase', 
    estaAutenticado,
    esMiembro,
    elMiembroEsInstructor,
    perteneceAlInstructorEsteCurso, 
    errorSiElCursoSeEstaPublicando,
    obtenerUrlVideoClaseBorrador)




router.get('/obtenerArticulo/:uidCurso/:uidClase', 
    estaAutenticado,
    esMiembro,
    elMiembroEsInstructor,
    perteneceAlInstructorEsteCurso, 
    errorSiElCursoSeEstaPublicando,
    obtenerArticuloClaseBorrador)


module.exports = router