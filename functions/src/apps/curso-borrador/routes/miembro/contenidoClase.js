const { Router } = require('express')
const router = Router()

const estaAutenticado = require('../../../../helpers/estaAutenticado')
const { 
    esMiembro, 
    esMiembroInstructor, 
    esMiembroInstructor_InstructorAuxiliar 
} = require('../../../../helpers/miembro')

const { 
    esResponsableDelCursoBorrador, 
    errorSiElCursoSeEstaPublicando,
    esAdministradorDelCursoBorrador
} = require('../../middlewares/miembro')

const { 
    construirElContenidoClaseArticulo, verificacionContenidoClaseGamificado, 
} = require('../../middlewares/miembro/contenidoClase')

const { 
    agregarContenidoClaseArticuloBorrador, 
    obtenerUrlVideoClaseBorrador,
    obtenerArticuloClaseBorrador,
    agregarContenidoClaseVideoYoutubeBorrador,
    obtenerVideoYoutubeClaseBorrador,
    agregarContenidoClaseGamificadoBorrador,
} = require('../../controllers/miembro/contenidoClase')

router.put('/actualizarGamificacion/:uidCurso/:uidUnidad/:uidClase', 
    estaAutenticado,
    esMiembro,
    esMiembroInstructor_InstructorAuxiliar,
    esAdministradorDelCursoBorrador, 
    errorSiElCursoSeEstaPublicando,
    verificacionContenidoClaseGamificado,
    agregarContenidoClaseGamificadoBorrador)

// router.put('/crearPreguntaGamificada/:uidCurso/:uidClase', 
//     estaAutenticado,
//     esMiembro,
//     esMiembroInstructor_InstructorAuxiliar,
//     esAdministradorDelCursoBorrador, 
//     errorSiElCursoSeEstaPublicando,
//     verificacionContenidoClaseGamificado,
//     agregarContenidoClaseGamificadoBorrador)

// router.put('/actualizarPreguntaGamificada/:uidCurso/:uidClase', 
//     estaAutenticado,
//     esMiembro,
//     esMiembroInstructor_InstructorAuxiliar,
//     esAdministradorDelCursoBorrador, 
//     errorSiElCursoSeEstaPublicando,
//     verificacionContenidoClaseGamificado,
//     agregarContenidoClaseGamificadoBorrador)

// router.put('/eliminarPreguntaGamificada/:uidCurso/:uidClase', 
//     estaAutenticado,
//     esMiembro,
//     esMiembroInstructor_InstructorAuxiliar,
//     esAdministradorDelCursoBorrador, 
//     errorSiElCursoSeEstaPublicando,
//     verificacionContenidoClaseGamificado,
//     agregarContenidoClaseGamificadoBorrador)




router.put('/actualizarArticulo/:uidCurso/:uidUnidad/:uidClase', 
    estaAutenticado,
    esMiembro,
    esMiembroInstructor_InstructorAuxiliar,
    esAdministradorDelCursoBorrador, 
    errorSiElCursoSeEstaPublicando,
    construirElContenidoClaseArticulo,
    agregarContenidoClaseArticuloBorrador)




router.put('/actualizarVideoYoutube/:uidCurso/:uidUnidad/:uidClase', 
    estaAutenticado,
    esMiembro,
    esMiembroInstructor_InstructorAuxiliar,
    esAdministradorDelCursoBorrador, 
    errorSiElCursoSeEstaPublicando,
    agregarContenidoClaseVideoYoutubeBorrador)




router.get('/obtenerVideo/:uidCurso/:uidClase', 
    estaAutenticado,
    esMiembro,
    esMiembroInstructor_InstructorAuxiliar,
    esAdministradorDelCursoBorrador, 
    obtenerUrlVideoClaseBorrador)




router.get('/obtenerArticulo/:uidCurso/:uidClase', 
    estaAutenticado,
    esMiembro,
    esMiembroInstructor_InstructorAuxiliar,
    esAdministradorDelCursoBorrador, 
    obtenerArticuloClaseBorrador)




router.get('/obtenerVideoYoutube/:uidCurso/:uidClase', 
    estaAutenticado,
    esMiembro,
    esMiembroInstructor_InstructorAuxiliar,
    esAdministradorDelCursoBorrador, 
    obtenerVideoYoutubeClaseBorrador)

module.exports = router