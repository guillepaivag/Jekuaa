const { Router } = require('express')
const router = Router()

const estaAutenticado = require('../../../helpers/estaAutenticado')
const noEsEmailVerificado = require('../../../helpers/noEsEmailVerificado')

const {
    verificarDatosRequeridos,
    verificarTipoDeDatos,
    validarDatosExistentesPOST,
    validarDatosExistentesPUT,
    construirDatosUsuarioPOST,
    construirDatosUsuarioPUT,
    construirDatosInformacionUsuario,
} = require('../middlewares')

const { validarDatosInformacionUsuario } = require('../validators')

const {
    crearUsuario,
    obtenerUsuario,
    obtenerUsuarioAuth,
    obtenerUsuarioInfo,
    actualizarMiUsuario,
    actualizarMiInformacion,
    eliminarFotoPerfil,
    obtenerLinkVerificacion,
} = require('../controllers')


router.post('/crearUsuario', 
    verificarDatosRequeridos, 
    verificarTipoDeDatos, 
    validarDatosExistentesPOST,
    construirDatosUsuarioPOST, 
    crearUsuario)

router.get('/obtenerUsuario/:tipoIdentificador/:valorIdentificador', obtenerUsuario)

router.get('/obtenerAuthentication/:tipoIdentificador/:valorIdentificador', obtenerUsuarioAuth)

router.get('/obtenerInformacion/:tipoIdentificador/:valorIdentificador', obtenerUsuarioInfo)

router.put('/actualizarUsuario', 
    estaAutenticado, 
    verificarDatosRequeridos, 
    verificarTipoDeDatos,
    validarDatosExistentesPUT,
    construirDatosUsuarioPUT,
    actualizarMiUsuario)

router.put('/actualizarInformacion', 
    estaAutenticado, 
    validarDatosInformacionUsuario,
    construirDatosInformacionUsuario,
    actualizarMiInformacion)

router.delete('/eliminarFotoPerfil', 
    estaAutenticado, 
    eliminarFotoPerfil)

router.get('/reeviarCorreoVerificacion', 
    estaAutenticado,
    noEsEmailVerificado,
    obtenerLinkVerificacion)

module.exports = router