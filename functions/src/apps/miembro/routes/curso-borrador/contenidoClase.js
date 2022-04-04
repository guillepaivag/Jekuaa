const { Router } = require('express')
const router = Router()

const { estaAutenticado } = require('../../../estudiante/middlewares/usuario')
const { esMiembro, elMiembroEsInstructor } = require('../../middlewares')
const { 
    permisoParaActualizarCursoBorrador, 
    perteneceAlInstructorEsteCurso 
} = require('../../middlewares/curso-borrador')
const busboyMiddleware = require('../../../../helpers/busboy-middleware')
const obtenerMetadataArchivo = require('../../../../helpers/obtener-metadata-archivo')
const { 
    esValidoElContenidoClaseVideo, 
    construirElContenidoClaseVideo, 
    esValidoElContenidoClaseArticulo, 
    construirElContenidoClaseArticulo 
} = require('../../../../apps/miembro/middlewares/curso-borrador/contenidoClase')
const {
    errorSiElCursoEstaEnRevision
} = require('../../../../apps/miembro/middlewares/curso-revision')
const { 
    agregarContenidoClaseVideoBorrador, 
    agregarContenidoClaseArticuloBorrador, 
    eliminarContenidoClaseBorrador,
    obtenerUrlVideoClaseBorrador,
    obtenerArticuloClaseBorrador
} = require('../../../../apps/miembro/controllers/curso-borrador/contenidoClase')



// Funciona bien pero no con Cloud Functions: Ya que no permite 
// un archivo de tamaño mayor a 10MB.
router.put('/actualizarVideo/:uidCurso/:uidUnidad/:uidClase', 
    estaAutenticado,
    esMiembro,
    elMiembroEsInstructor,
    perteneceAlInstructorEsteCurso, 
    errorSiElCursoEstaEnRevision,
    busboyMiddleware,
    obtenerMetadataArchivo,
    esValidoElContenidoClaseVideo,
    construirElContenidoClaseVideo,
    agregarContenidoClaseVideoBorrador)





router.put('/actualizarArticulo/:uidCurso/:uidUnidad/:uidClase', 
    estaAutenticado,
    esMiembro,
    elMiembroEsInstructor,
    perteneceAlInstructorEsteCurso, 
    errorSiElCursoEstaEnRevision,
    esValidoElContenidoClaseArticulo,
    construirElContenidoClaseArticulo,
    agregarContenidoClaseArticuloBorrador)





router.delete('/eliminar/:uidCurso/:uidUnidad/:uidClase', 
    estaAutenticado,
    esMiembro,
    elMiembroEsInstructor,
    perteneceAlInstructorEsteCurso, 
    errorSiElCursoEstaEnRevision,
    eliminarContenidoClaseBorrador)




router.get('/obtenerVideo/:uidCurso/:uidClase', 
    estaAutenticado,
    esMiembro,
    elMiembroEsInstructor,
    perteneceAlInstructorEsteCurso, 
    obtenerUrlVideoClaseBorrador)




router.get('/obtenerArticulo/:uidCurso/:uidClase', 
    estaAutenticado,
    esMiembro,
    elMiembroEsInstructor,
    perteneceAlInstructorEsteCurso, 
    obtenerArticuloClaseBorrador)


module.exports = router