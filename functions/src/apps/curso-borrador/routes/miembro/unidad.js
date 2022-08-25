const { Router } = require('express')
const router = Router()

const estaAutenticado = require('../../../../helpers/estaAutenticado')
const { esMiembro, esMiembroInstructor, esMiembroInstructor_InstructorAuxiliar } = require('../../../../helpers/miembro')

const { 
    errorSiElCursoSeEstaPublicando,
    esAdministradorDelCursoBorrador, 
} = require('../../middlewares/miembro')

const { 
    verificarDatosRequeridosPOST, 
    verificadorDeTipoDeDatosPOST, 
    verificadorDeDatosPOST, 
    construirDatosUnidadBorradorPOST,
    verificarDatosRequeridosPUT,
    verificadorDeTipoDeDatosPUT,
    verificadorDeDatosPUT,
    construirDatosUnidadBorradorPUT,
} = require('../../middlewares/miembro/unidad')

const { 
    crearUnidadBorrador,
    actualizarUnidadBorrador,
    actualizarOrdenUnidadBorrador,
    eliminarUnidadBorrador,
} = require('../../controllers/miembro/unidades')


// AGREGAR UNIDAD
router.post('/crear/:uidCurso', 
    estaAutenticado,
    esMiembro,
    esMiembroInstructor_InstructorAuxiliar,
    esAdministradorDelCursoBorrador,
    errorSiElCursoSeEstaPublicando,
    verificarDatosRequeridosPOST,
    verificadorDeTipoDeDatosPOST,
    verificadorDeDatosPOST,
    construirDatosUnidadBorradorPOST,
    crearUnidadBorrador)

// ACTUALIZAR NOMBRE UNIDAD
router.put('/actualizar/:uidCurso/:uidUnidad', 
    estaAutenticado,
    esMiembro,
    esMiembroInstructor_InstructorAuxiliar,
    esAdministradorDelCursoBorrador,
    errorSiElCursoSeEstaPublicando,
    verificarDatosRequeridosPUT,
    verificadorDeTipoDeDatosPUT,
    verificadorDeDatosPUT,
    construirDatosUnidadBorradorPUT,
    actualizarUnidadBorrador)

// ACTUALIZAR ORDEN DE UNIDADES
router.put('/actualizarOrden/:uidCurso', 
    estaAutenticado,
    esMiembro,
    esMiembroInstructor_InstructorAuxiliar,
    esAdministradorDelCursoBorrador,
    errorSiElCursoSeEstaPublicando,
    actualizarOrdenUnidadBorrador)

// ELIMINAR UNIDAD
router.delete('/eliminar/:uidCurso/:uidUnidad', 
    estaAutenticado,
    esMiembro,
    esMiembroInstructor_InstructorAuxiliar,
    esAdministradorDelCursoBorrador,
    errorSiElCursoSeEstaPublicando,
    eliminarUnidadBorrador)

module.exports = router