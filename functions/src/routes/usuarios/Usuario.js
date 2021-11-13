const {Router} = require('express')
const router = Router()

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
    validarDatosExistentesCliente,
    construirDatosUsuario,
    construirDatosInformacionUsuario,
    sePuedeEliminarPropietario,
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
    obtenerMiUsuario,
    actualizarMiUsuario,
    actualizarMiInformacion,
    eliminarMiUsuario,
} = require('../../controllers/usuarios/Usuario')


// Operaciones para: Usuarios (Estudiantes, MiembroJeuaa, Moderador, Propietario)
router.get('/estudiante/leerUsuario/:uid', 
    estaAutenticado, 
    obtenerMiUsuario)

router.put('/estudiante/actualizarUsuario', 
    estaAutenticado, 
    verificarTipoDeDatosCliente,
    validarDatosExistentesCliente,
    construirDatosUsuario,
    actualizarMiUsuario)

router.put('/estudiante/actualizarMiInformacion', 
    estaAutenticado, 
    validarDatosActualizacionInformacionUsuario,
    construirDatosInformacionUsuario,
    actualizarMiInformacion)

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
    validarDatosExistentesCliente,
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
    verificarTipoDeDatosCliente,
    validarDatosExistentesCliente,
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








