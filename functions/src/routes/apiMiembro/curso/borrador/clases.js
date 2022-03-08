const { Router } = require('express')
const router = Router()

const { estaAutenticado } = require('../../../../middlewares/api/usuario')
const { esMiembro } = require('../../../../middlewares/apiMiembro/miembro')
const { permisoParaActualizarCursoBorrador, perteneceAlInstructorEsteCurso } = require('../../../../middlewares/apiMiembro/curso/curso/borrador')
const { 
    verificarDatosRequeridosPOST, 
    verificadorDeTipoDeDatosPOST, 
    verificadorDeDatosPOST, 
    construirDatosCursoBorradorPOST, 
    verificarDatosRequeridosPUT, 
    verificadorDeTipoDeDatosPUT, 
    verificadorDeDatosPUT, 
    construirDatosCursoBorradorPUT 
} = require('../../../../middlewares/apiMiembro/curso/clase/borrador')

const { 
    crearClaseBorrador, 
    actualizarClaseBorrador, 
    actualizarOrdenClaseBorrador,
    actualizarUnidadClaseBorrador,
    eliminarClaseBorrador
} = require('../../../../controllers/apiMiembro/curso/clase/borrador')


// AGREGAR CLASE
router.post('/crearClaseBorrador/:uidCursoBorrador/:uidUnidadBorrador', 
    estaAutenticado,
    esMiembro,
    permisoParaActualizarCursoBorrador,
    perteneceAlInstructorEsteCurso,
    verificarDatosRequeridosPOST,
    verificadorDeTipoDeDatosPOST,
    verificadorDeDatosPOST,
    construirDatosCursoBorradorPOST,
    crearClaseBorrador)

// ACTUALIZAR CLASE: nombre, descripcion
router.put('/actualizarClaseBorrador/:uidCursoBorrador/:uidUnidadBorrador/:uidClaseBorrador', 
    estaAutenticado,
    esMiembro,
    permisoParaActualizarCursoBorrador,
    perteneceAlInstructorEsteCurso,
    verificarDatosRequeridosPUT,
    verificadorDeTipoDeDatosPUT,
    verificadorDeDatosPUT,
    construirDatosCursoBorradorPUT,
    actualizarClaseBorrador)

// ACTUALIZAR ORDEN DE CLASES: ordenClase
router.put('/actualizarOrdenClaseBorrador/:uidCursoBorrador/:uidUnidadBorrador', 
    estaAutenticado,
    esMiembro,
    permisoParaActualizarCursoBorrador,
    perteneceAlInstructorEsteCurso,
    actualizarOrdenClaseBorrador)

// CAMBIAR UNIDAD DE UNA CLASE
router.put('/actualizarUnidadClaseBorrador/:uidCursoBorrador/:uidClaseBorrador', 
    estaAutenticado,
    esMiembro,
    permisoParaActualizarCursoBorrador,
    perteneceAlInstructorEsteCurso,
    actualizarUnidadClaseBorrador)

// ELIMINAR CLASE: AGREGAR UNA ETIQUETA AL DOCUMENTO QUE DIGA QUE SE ELIMINARA
// CON CLOUD FUNCTIONS ELIMINAR TODA LA CLASE
router.delete('/eliminarClaseBorrador/:uidCursoBorrador/:uidUnidadBorrador/:uidClaseBorrador', 
    estaAutenticado,
    esMiembro,
    permisoParaActualizarCursoBorrador,
    perteneceAlInstructorEsteCurso,
    eliminarClaseBorrador)


module.exports = router