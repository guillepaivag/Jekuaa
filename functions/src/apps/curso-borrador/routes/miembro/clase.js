const { Router } = require('express')
const router = Router()

const estaAutenticado = require('../../../../helpers/estaAutenticado')
const { esMiembro, esMiembroInstructor, esMiembroInstructor_InstructorAuxiliar } = require('../../../../helpers/miembro')

const { 
    errorSiElCursoSeEstaPublicando,
    esAdministradorDelCursoBorrador
} = require('../../middlewares/miembro')

const { 
    verificarDatosRequeridosPOST, 
    verificadorDeTipoDeDatosPOST, 
    verificadorDeDatosPOST, 
    verificarDatosRequeridosPUT, 
    verificadorDeTipoDeDatosPUT, 
    verificadorDeDatosPUT, 
    construirDatosClaseBorradorPOST,
    construirDatosClaseBorradorPUT,
} = require('../../middlewares/miembro/clase')



const { 
    crearClaseBorrador, 
    actualizarClaseBorrador, 
    actualizarOrdenClaseBorrador,
    actualizarUnidadClaseBorrador,
    eliminarClaseBorrador
} = require('../../controllers/miembro/clases')



// AGREGAR CLASE
router.post('/crear/:uidCurso/:uidUnidad', 
    estaAutenticado,
    esMiembro,
    esMiembroInstructor_InstructorAuxiliar,
    esAdministradorDelCursoBorrador,
    errorSiElCursoSeEstaPublicando,
    verificarDatosRequeridosPOST,
    verificadorDeTipoDeDatosPOST,
    verificadorDeDatosPOST,
    construirDatosClaseBorradorPOST,
    crearClaseBorrador)

// ACTUALIZAR CLASE: nombre, descripcion
router.put('/actualizar/:uidCurso/:uidUnidad/:uidClase', 
    estaAutenticado,
    esMiembro,
    esMiembroInstructor_InstructorAuxiliar,
    esAdministradorDelCursoBorrador,
    errorSiElCursoSeEstaPublicando,
    verificarDatosRequeridosPUT,
    verificadorDeTipoDeDatosPUT,
    verificadorDeDatosPUT,
    construirDatosClaseBorradorPUT,
    actualizarClaseBorrador)

// ACTUALIZAR ORDEN DE CLASES: ordenClase
router.put('/actualizarOrden/:uidCurso/:uidUnidad', 
    estaAutenticado,
    esMiembro,
    esMiembroInstructor_InstructorAuxiliar,
    esAdministradorDelCursoBorrador,
    errorSiElCursoSeEstaPublicando,
    actualizarOrdenClaseBorrador)

// CAMBIAR UNIDAD DE UNA CLASE
router.put('/cambiarUnidad/:uidCurso/:uidUnidad/:uidClase', 
    estaAutenticado,
    esMiembro,
    esMiembroInstructor_InstructorAuxiliar,
    esAdministradorDelCursoBorrador,
    errorSiElCursoSeEstaPublicando,
    actualizarUnidadClaseBorrador)

// ELIMINAR CLASE: AGREGAR UNA ETIQUETA AL DOCUMENTO QUE DIGA QUE SE ELIMINARA
// CON CLOUD FUNCTIONS ELIMINAR TODA LA CLASE
router.delete('/eliminar/:uidCurso/:uidUnidad/:uidClase', 
    estaAutenticado,
    esMiembro,
    esMiembroInstructor_InstructorAuxiliar,
    esAdministradorDelCursoBorrador,
    errorSiElCursoSeEstaPublicando,
    eliminarClaseBorrador)


module.exports = router