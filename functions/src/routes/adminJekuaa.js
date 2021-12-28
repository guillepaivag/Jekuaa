const { Router } = require('express')
const router = Router()

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
} = require('../middlewares/usuario')

const {
    crearUsuario,
    verDatosUsuarioPorUID,
    verDatosAuthPorUID,
    actualizarUsuarioPorUID,
    habilitarUsuarioPorUID,
    eliminarUsuarioPorUID
} = require('../controllers/usuarios/adminJekuaa')



// Operaciones para: Administración
router.post('/crearUsuario', 
    estaAutenticado, 
    esAdmin, 
    verificarDatosRequeridos, 
    verificarTipoDeDatosCliente, 
    validarDatosExistentesClienteCrear,
    construirDatosUsuario, 
    crearUsuario)

router.get('/verDatosUsuarioPorUID/:uid', 
    estaAutenticado, 
    esAdmin, 
    verDatosUsuarioPorUID)

router.get('/verDatosAuthPorUID/:uid', 
    estaAutenticado, 
    esAdmin, 
    verDatosAuthPorUID)

router.put('/actualizarUsuarioPorUID/:uid', 
    estaAutenticado, 
    esAdmin, 
    esDeMayorNivel, 
    verificarDatosRequeridos, 
    verificarTipoDeDatosCliente,
    validarDatosExistentesClienteActualizar,
    sePuedeEliminarPropietario,
    construirDatosUsuario,
    actualizarUsuarioPorUID)

router.put('/habilitarUsuarioPorUID/:uid', 
    estaAutenticado, 
    esAdmin, 
    esDeMayorNivel, 
    habilitarUsuarioPorUID)

router.delete('/eliminarUsuarioPorUID/:uid', 
    estaAutenticado, 
    esAdmin, 
    esDeMayorNivel, 
    sePuedeEliminarPropietario,
    eliminarUsuarioPorUID)



// Operaciones para: AdminJekuaa
router.post('/crearBlog', 
    estaAutenticado, 
    esMiembroJekuaa, 
    verificadorDeDatosRequeridos,
    verificadorDeTipoDeDatos,
    verificadorDeDatosBlog,
    construirDatosBlog,
    crearBlog)

router.put('/actualizarBlog/:uid', 
    estaAutenticado, 
    esMiembroJekuaa, 
    verificacionExistenciaBlog,
    verificadorDeDatosRequeridos,
    verificadorDeTipoDeDatos,
    verificadorDeDatosBlog,
    construirDatosBlog,
    actualizarDatosBlog)

router.delete('/eliminarBlog/:uid', 
    estaAutenticado, 
    esMiembroJekuaa, 
    verificacionExistenciaBlog, 
    eliminarBlog)

module.exports = router








