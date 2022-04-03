const { Router } = require('express')
const router = Router()

const { estaAutenticado } = require('../../../../middlewares/api/usuario')
const { esMiembro, elMiembroEsInstructor } = require('../../../../middlewares/apiMiembro')
const { permisoParaActualizarCursoBorrador, perteneceAlInstructorEsteCurso } = require('../../../../middlewares/apiMiembro/curso/curso/borrador')
const busboyMiddleware = require('../../../../middlewares/busboy-middleware')
const obtenerMetadataArchivo = require('../../../../middlewares/obtener-metadata-archivo')
const { 
    esValidoElContenidoClaseVideo, 
    construirElContenidoClaseVideo, 
    esValidoElContenidoClaseArticulo, 
    construirElContenidoClaseArticulo 
} = require('../../../../middlewares/apiMiembro/curso/contenidoClase/borrador')
const { 
    agregarContenidoClaseVideoBorrador, 
    agregarContenidoClaseArticuloBorrador, 
    eliminarContenidoClaseBorrador,
    obtenerUrlVideoClaseBorrador,
    obtenerArticuloClaseBorrador
} = require('../../../../controllers/apiMiembro/curso/contenidoClase/borrador')
const { errorSiElCursoEstaEnRevision } = require('../../../../middlewares/apiMiembro/curso/curso/revision')


// Funciona bien pero no con Cloud Functions: Ya que no permite 
// un archivo de tamaño mayor a 10MB.
router.put('/actualizarContenidoClase/video/:uidCurso/:uidUnidad/:uidClase', 
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





router.put('/actualizarContenidoClase/articulo/:uidCurso/:uidUnidad/:uidClase', 
    estaAutenticado,
    esMiembro,
    elMiembroEsInstructor,
    perteneceAlInstructorEsteCurso, 
    errorSiElCursoEstaEnRevision,
    esValidoElContenidoClaseArticulo,
    construirElContenidoClaseArticulo,
    agregarContenidoClaseArticuloBorrador)





router.delete('/eliminarContenidoClase/:uidCurso/:uidUnidad/:uidClase', 
    estaAutenticado,
    esMiembro,
    elMiembroEsInstructor,
    perteneceAlInstructorEsteCurso, 
    errorSiElCursoEstaEnRevision,
    eliminarContenidoClaseBorrador)




router.get('/obtenerContenidoClase/video/:uidCurso/:uidClase', 
    estaAutenticado,
    esMiembro,
    elMiembroEsInstructor,
    perteneceAlInstructorEsteCurso, 
    obtenerUrlVideoClaseBorrador)




router.get('/obtenerContenidoClase/articulo/:uidCurso/:uidClase', 
    estaAutenticado,
    esMiembro,
    elMiembroEsInstructor,
    perteneceAlInstructorEsteCurso, 
    obtenerArticuloClaseBorrador)


module.exports = router