const { Router } = require('express')
const router = Router()

const { estaAutenticado } = require('../../../../middlewares/api/usuario')
const { esMiembro } = require('../../../../middlewares/apiMiembro/miembro')
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


// Funciona bien pero no con Cloud Functions: Ya que no permite 
// un archivo de tamaño mayor a 10MB.
router.put('/actualizarContenidoClaseBorrador/video/:uidCursoBorrador/:uidUnidadBorrador/:uidClaseBorrador', 
    estaAutenticado,
    esMiembro,
    permisoParaActualizarCursoBorrador,
    perteneceAlInstructorEsteCurso, 
    busboyMiddleware,
    obtenerMetadataArchivo,
    esValidoElContenidoClaseVideo,
    construirElContenidoClaseVideo,
    agregarContenidoClaseVideoBorrador)





router.put('/actualizarContenidoClaseBorrador/articulo/:uidCursoBorrador/:uidUnidadBorrador/:uidClaseBorrador', 
    estaAutenticado,
    esMiembro,
    permisoParaActualizarCursoBorrador,
    perteneceAlInstructorEsteCurso, 
    esValidoElContenidoClaseArticulo,
    construirElContenidoClaseArticulo,
    agregarContenidoClaseArticuloBorrador)





router.delete('/eliminarContenidoClaseBorrador/:uidCursoBorrador/:uidUnidadBorrador/:uidClaseBorrador', 
    estaAutenticado,
    esMiembro,
    permisoParaActualizarCursoBorrador,
    perteneceAlInstructorEsteCurso, 
    eliminarContenidoClaseBorrador)




router.get('/obtenerContenidoClaseBorrador/video/:uidCursoBorrador/:uidClaseBorrador', 
    estaAutenticado,
    esMiembro,
    perteneceAlInstructorEsteCurso, 
    obtenerUrlVideoClaseBorrador)




router.get('/obtenerContenidoClaseBorrador/articulo/:uidCursoBorrador/:uidClaseBorrador', 
    estaAutenticado,
    esMiembro,
    perteneceAlInstructorEsteCurso, 
    obtenerArticuloClaseBorrador)


module.exports = router