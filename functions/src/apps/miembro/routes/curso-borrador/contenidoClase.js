const { Router } = require('express')
const router = Router()

const { estaAutenticado } = require('../../../estudiante/middlewares/usuario')

const { esMiembro, elMiembroEsInstructor } = require('../../middlewares')

const { 
    permisoParaActualizarCursoBorrador, 
    perteneceAlInstructorEsteCurso, 
    errorSiElCursoSeEstaPublicando
} = require('../../middlewares/curso-borrador')

const { 
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



router.put('/actualizarArticulo/:uidCurso/:uidUnidad/:uidClase', 
    estaAutenticado,
    esMiembro,
    elMiembroEsInstructor,
    perteneceAlInstructorEsteCurso, 
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
    obtenerUrlVideoClaseBorrador)




router.get('/obtenerArticulo/:uidCurso/:uidClase', 
    estaAutenticado,
    esMiembro,
    elMiembroEsInstructor,
    perteneceAlInstructorEsteCurso, 
    obtenerArticuloClaseBorrador)


module.exports = router