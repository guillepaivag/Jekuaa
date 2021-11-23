const {Router} = require('express')
const router = Router()

const fileMiddleware = require('express-multipart-file-parser')
const fileUploadMiddleware = require('busboy-firebase')
const busboyMiddleware = require('../../middlewares/busboy-middleware')

const {
    validarDatosActualizacionUsuario,
    validarDatosCreacionUsuarioAdmin,
    validarDatosActualizacionUsuarioAdmin,
    validarDatosActualizacionInformacionUsuario,
} = require('../../validators/Usuarios')

const {
    estaAutenticado,
    esAdmin,
    esDeMayorNivel,
    verificarDatosRequeridos,
    verificarTipoDeDatosCliente,
    validarDatosExistentesClienteCrear,
    validarDatosExistentesClienteActualizar,
    construirDatosUsuario,
    construirDatosInformacionUsuario,
    sePuedeEliminarPropietario,
    validarFotoPerfil,
} = require('../../middlewares/usuario')

const {
    crearUsuario,
    verDatosUsuarioPorUID,
    verDatosAuthPorUID,
    actualizarUsuarioPorUID,
    habilitarUsuarioPorUID,
    eliminarUsuarioPorUID
} = require('../../controllers/usuarios/AdminJekuaa')

const {
    obtenerUsuario,
    obtenerUsuarioAuth,
    obtenerUsuarioInfo,
    actualizarMiUsuario,
    actualizarMiInformacion,
    actualizarFotoPerfil,
    eliminarFotoPerfil,
    eliminarMiUsuario,
} = require('../../controllers/usuarios/Usuario')


// Operaciones para: Usuarios (Estudiantes, MiembroJeuaa, Moderador, Propietario)
router.post('/estudiante/crearUsuario', 
    verificarDatosRequeridos, 
    verificarTipoDeDatosCliente, 
    validarDatosExistentesClienteCrear,
    construirDatosUsuario, 
    crearUsuario)

router.post('/estudiante/datosUsuario', 
    estaAutenticado, 
    obtenerUsuario)

router.post('/estudiante/authUsuario', 
    estaAutenticado, 
    obtenerUsuarioAuth)

router.post('/estudiante/informacionUsuario', 
    estaAutenticado, 
    obtenerUsuarioInfo)

router.put('/estudiante/actualizarUsuario', 
    estaAutenticado, 
    verificarDatosRequeridos, 
    verificarTipoDeDatosCliente,
    validarDatosExistentesClienteActualizar,
    construirDatosUsuario,
    actualizarMiUsuario)

router.put('/estudiante/actualizarInformacion', 
    estaAutenticado, 
    validarDatosActualizacionInformacionUsuario,
    construirDatosInformacionUsuario,
    actualizarMiInformacion)

router.put('/estudiante/actualizarFotoPerfil', 
    estaAutenticado, 
    busboyMiddleware,
    validarFotoPerfil,
    actualizarFotoPerfil)

router.delete('/estudiante/eliminarFotoPerfil', 
    estaAutenticado, 
    eliminarFotoPerfil)

router.delete('/estudiante/eliminarUsuario', 
    estaAutenticado, 
    sePuedeEliminarPropietario,
    eliminarMiUsuario)




// Operaciones para: Administración
router.post('/adminJekuaa/crearUsuario', 
    estaAutenticado, 
    esAdmin, 
    verificarDatosRequeridos, 
    verificarTipoDeDatosCliente, 
    validarDatosExistentesClienteCrear,
    construirDatosUsuario, 
    crearUsuario)

router.get('/adminJekuaa/verDatosUsuarioPorUID/:uid', 
    estaAutenticado, 
    esAdmin, 
    verDatosUsuarioPorUID)

router.get('/adminJekuaa/verDatosAuthPorUID/:uid', 
    estaAutenticado, 
    esAdmin, 
    verDatosAuthPorUID)

router.put('/adminJekuaa/actualizarUsuarioPorUID/:uid', 
    estaAutenticado, 
    esAdmin, 
    esDeMayorNivel, 
    verificarDatosRequeridos, 
    verificarTipoDeDatosCliente,
    validarDatosExistentesClienteActualizar,
    sePuedeEliminarPropietario,
    construirDatosUsuario,
    actualizarUsuarioPorUID)

router.put('/adminJekuaa/habilitarUsuarioPorUID/:uid', 
    estaAutenticado, 
    esAdmin, 
    esDeMayorNivel, 
    habilitarUsuarioPorUID)

router.delete('/adminJekuaa/eliminarUsuarioPorUID/:uid', 
    estaAutenticado, 
    esAdmin, 
    esDeMayorNivel, 
    sePuedeEliminarPropietario,
    eliminarUsuarioPorUID)


module.exports = router








