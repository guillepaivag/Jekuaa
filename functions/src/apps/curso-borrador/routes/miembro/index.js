const { Router } = require('express')
const router = Router()

const estaAutenticado = require('../../../../helpers/estaAutenticado')
const { esMiembro, esMiembroInstructor, esMiembroInstructor_InstructorAuxiliar } = require('../../../../helpers/miembro')

const { 
    verificarDatosRequeridosPOST, 
    verificadorDeTipoDeDatosPOST, 
    verificadorDeDatosPOST, 
    construirDatosCursoBorradorPOST,
    esResponsableDelCursoBorrador,
    verificarDatosRequeridosPUT,
    verificadorDeTipoDeDatosPUT,
    verificadorDeDatosPUT,
    construirDatosCursoBorradorPUT,
    verificarCursoEstadoPublicacion,
    esValidoElCursoBorrador,
    errorSiElCursoSeEstaPublicando,
    elCursoNoTieneContenidosProcesandose,
    verificarDatosPrecioPUT,
    esAdministradorDelCursoBorrador,
} = require('../../middlewares/miembro')

const { 
    crearCursoBorrador, 
    actualizarCursoBorrador, 
    publicarCursoBorrador,
    actualizarDatosPrecio,
    quitarAuxiliar,
    quitarContribuyente
} = require('../../controllers/miembro')


// CREAR
router.post('/crear', 
    estaAutenticado,
    esMiembro,
    esMiembroInstructor,
    verificarDatosRequeridosPOST,
    verificadorDeTipoDeDatosPOST,
    verificadorDeDatosPOST,
    construirDatosCursoBorradorPOST,
    crearCursoBorrador)


// ACTUALIZAR CONTENIDO DE BORRADOR
router.put('/actualizar/:uidCurso', 
    estaAutenticado,
    esMiembro,
    esMiembroInstructor_InstructorAuxiliar,
    esAdministradorDelCursoBorrador,
    errorSiElCursoSeEstaPublicando,
    verificarDatosRequeridosPUT,
    verificadorDeTipoDeDatosPUT,
    verificadorDeDatosPUT,
    construirDatosCursoBorradorPUT,
    actualizarCursoBorrador)


// ACTUALIZAR PRECIO DEL CURSO
router.delete('/quitar-auxiliar/:uidCurso/:uidUsuario', 
    estaAutenticado,
    esMiembro,
    esMiembroInstructor,
    esResponsableDelCursoBorrador,
    errorSiElCursoSeEstaPublicando,
    quitarAuxiliar)


// ACTUALIZAR PRECIO DEL CURSO
router.delete('/quitar-contribuyente/:uidCurso/:uidUsuario', 
    estaAutenticado,
    esMiembro,
    esMiembroInstructor,
    esResponsableDelCursoBorrador,
    errorSiElCursoSeEstaPublicando,
    quitarContribuyente)


// ACTUALIZAR PRECIO DEL CURSO
router.put('/actualizar-precio/:uidCurso', 
    estaAutenticado,
    esMiembro,
    esMiembroInstructor,
    esResponsableDelCursoBorrador,
    errorSiElCursoSeEstaPublicando,
    verificarDatosPrecioPUT,
    actualizarDatosPrecio)


// ACTUALIZAR CONTENIDO DE BORRADOR
router.put('/publicar/:uidCurso',
    estaAutenticado,
    esMiembro,
    esMiembroInstructor,
    esResponsableDelCursoBorrador,
    verificarCursoEstadoPublicacion,
    esValidoElCursoBorrador,
    elCursoNoTieneContenidosProcesandose,
    publicarCursoBorrador)


module.exports = router