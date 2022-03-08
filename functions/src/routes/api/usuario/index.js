const { Router } = require('express')
const router = Router()

// const fileMiddleware = require('express-multipart-file-parser')
// const fileUploadMiddleware = require('busboy-firebase')
const busboyMiddleware = require('../../../middlewares/busboy-middleware')

const { validarDatosActualizacionInformacionUsuario } = require('../../../validators/Usuarios')

const {
    estaAutenticado,
    verificarDatosRequeridos,
    verificarTipoDeDatosCliente,
    validarDatosExistentesClienteCrear,
    validarDatosExistentesClienteActualizar,
    construirDatosUsuario,
    construirDatosInformacionUsuario,
    validarFotoPerfil,
    construirFotoPerfil,
    sePuedeEliminarPropietarioDELETE,
} = require('../../../middlewares/api/usuario')

const {
    crearUsuario,
    obtenerUsuario,
    obtenerUsuarioAuth,
    obtenerUsuarioInfo,
    actualizarMiUsuario,
    actualizarMiInformacion,
    actualizarFotoPerfil,
    eliminarFotoPerfil,
    procesoEliminacion,
} = require('../../../controllers/api/usuario')


// Operaciones para: Usuarios (Estudiante, Miembro, Moderador, Propietario)
router.post('/crearUsuario', 
    verificarDatosRequeridos, 
    verificarTipoDeDatosCliente, 
    validarDatosExistentesClienteCrear,
    construirDatosUsuario, 
    crearUsuario)

router.get('/datosUsuario/:tipoIdentificador/:valorIdentificador', 
    obtenerUsuario)

router.get('/datosAuthentication/:tipoIdentificador/:valorIdentificador', 
    obtenerUsuarioAuth)

router.get('/informacionUsuario/:tipoIdentificador/:valorIdentificador', 
    obtenerUsuarioInfo)

router.put('/actualizarUsuario', 
    estaAutenticado, 
    verificarDatosRequeridos, 
    verificarTipoDeDatosCliente,
    validarDatosExistentesClienteActualizar,
    construirDatosUsuario,
    actualizarMiUsuario)

router.put('/actualizarInformacion', 
    estaAutenticado, 
    validarDatosActualizacionInformacionUsuario,
    construirDatosInformacionUsuario,
    actualizarMiInformacion)

router.put('/actualizarFotoPerfil', 
    estaAutenticado, 
    busboyMiddleware,
    validarFotoPerfil,
    actualizarFotoPerfil)

router.delete('/eliminarFotoPerfil', 
    estaAutenticado, 
    eliminarFotoPerfil)

// router.delete('/procesoEliminacion/comienzo', 
//     estaAutenticado, 
//     sePuedeEliminarPropietarioDELETE,
//     procesoEliminacion)

// router.delete('/procesoEliminacion/cancelar', 
//     estaAutenticado, 
//     procesoEliminacion) 

module.exports = router