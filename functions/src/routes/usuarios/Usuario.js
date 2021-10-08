const {Router} = require('express')
const router = Router()

const {
    estaAutenticado,
    validacionCreacionUsuario
} = require('../../middlewares/usuario')

const {
    esMiembroJekuaa,
    esDeMayorIgualNivel,
    esDeMayorNivel,
    permisoParaOperarUnRol,
} = require('../../middlewares/miembroJekuaa')

const {
    crearUsuario,
    verDatosUsuarioPorUID,
    verDatosAuthPorUID,
    actualizarUsuarioPorUID,
    habilitarUsuarioPorUID,
    eliminarUsuarioPorUID
} = require('../../controllers/usuarios/MiembroJekuaa')

const {
    actualizarDatosPersonalesPorUID
} = require('../../controllers/usuarios/Usuario')

// Operaciones para: Usuarios Generales
router.post('/actualizarDatosPersonalesPorUID/:uid', estaAutenticado, actualizarDatosPersonalesPorUID)

// Operaciones para: MiembrosJekuaa
router.post('/miembroJekuaa/crearUsuario', estaAutenticado, esMiembroJekuaa, permisoParaOperarUnRol, validacionCreacionUsuario, crearUsuario)
router.post('/miembroJekuaa/verDatosUsuarioPorUID/:uid', estaAutenticado, esMiembroJekuaa, verDatosUsuarioPorUID)
router.post('/miembroJekuaa/verDatosAuthPorUID/:uid', estaAutenticado, esMiembroJekuaa, verDatosAuthPorUID)
router.post('/miembroJekuaa/actualizarUsuarioPorUID/:uid', estaAutenticado, esMiembroJekuaa, esDeMayorNivel, actualizarUsuarioPorUID)
router.post('/miembroJekuaa/habilitarUsuarioPorUID/:uid', estaAutenticado, esMiembroJekuaa, esDeMayorNivel, habilitarUsuarioPorUID)
router.post('/miembroJekuaa/eliminarUsuarioPorUID/:uid', estaAutenticado, esMiembroJekuaa, esDeMayorNivel, eliminarUsuarioPorUID)

// Pruebas
router.post('/authorization', estaAutenticado, (req, res) => {
    res.status(200).json({
        authorization: req.headers.authorization,
        cookie: req.headers.cookie,
    })
})

module.exports = router








