const admin = require('../../../firebase-service')
const db = require('../../../db')
const MiembroJekuaa = require("../../models/TiposUsuarios/MiembroJekuaa")
const utilsRoles = require('../../utils/usuarios/RolesSecciones')
const Usuario = require('../../models/Usuario')
const formatos = require('../../utils/formatos')

const controllerMiembroJekuaa = {}

controllerMiembroJekuaa.verDatosUsuarioPorUID = async (req, res) => {

    try {

        const { jekuaaDatos, params } = req
        const { uidSolicitante } = jekuaaDatos
        const { uid } = params

        // Obtener datos del usuario
        const datosUsuario = await MiembroJekuaa.verDatosUsuarioPorUID( uid )

        return res.status(200).json({
            mensaje: 'Los datos de los usuarios se enviaron de forma exitosa!',
            resultado: datosUsuario
        })
        
    } catch (error) {
        console.log('Error - verUsuarioPorUID: ', error)

        return res.status(500).json({
            mensaje: error.message,
            resultado: error
        })
    }

}

controllerMiembroJekuaa.verDatosAuthPorUID = async (req, res) => {

    try {

        const { jekuaaDatos, params } = req
        const { uidSolicitante, datosAuthSolicitante } = jekuaaDatos
        const { uid } = params

        // Si queremos ver nuestros propios datos, retornamos el datosAuthSolicitante
        if ( uidSolicitante === uid ) {
            return res.status(200).json({
                mensaje: 'Los datos de los usuarios se enviaron de forma exitosa!',
                resultado: datosAuthSolicitante
            })
        }

        // Obtener datos del usuario
        const datosAuth = await MiembroJekuaa.verDatosAuthPorUID(uid)

        return res.status(200).json({
            mensaje: 'Los datos de los usuarios se enviaron de forma exitosa!',
            resultado: datosAuth
        })
        
    } catch (error) {
        console.log('Error - verUsuarioPorUID: ', error)

        return res.status(500).json({
            mensaje: error.message,
            resultado: error
        })
    }

}

controllerMiembroJekuaa.crearUsuario = async (req, res) => {

    try {
        const { jekuaaDatos, body } = req
        const { uidSolicitante, datosAuthSolicitante } = jekuaaDatos
        const { datosUsuario, contrasenha } = body

        // El solicitante no puede actualizar (crear) un nuevo propietario si no es propietario
        if ( datosAuthSolicitante.customClaims.rol != 'propietario' && 
            datosUsuario && datosUsuario.jekuaaRoles && datosUsuario.jekuaaRoles.rol &&
            datosUsuario.jekuaaRoles.rol === 'propietario' ) {
            
            //No autorizado
            return res.status(403).json({
                mensaje: 'No tienes permiso para agregar un nuevo propietario.',
                resultado: null
            })

        }

        // Cambiamos el formato del cliente al formato servidor
        const datosUsuarioParseado = formatos.usuario_milliseconds_a_timestamp( datosUsuario )

        // Actualizar usuario
        const usuarioNuevo = await MiembroJekuaa.crearNuevoUsuario( datosUsuarioParseado, contrasenha )

        return res.status(200).json({
            mensaje: 'El usuario se creo de forma exitosa!',
            resultado: usuarioNuevo
        })
        
    } catch (error) {
        console.log('Error - crearUsuario: ', error)

        return res.status(500).json({
            mensaje: error.message,
            resultado: error
        })
    }

}

controllerMiembroJekuaa.actualizarUsuarioPorUID = async (req, res) => {

    try {
        const { jekuaaDatos, params, body } = req
        const { uidSolicitante, datosAuthSolicitante } = jekuaaDatos
        const { uid } = params
        const { datosActualizados } = body

        // El solicitante no puede actualizar (crear) un nuevo propietario si no es propietario
        if ( datosAuthSolicitante.customClaims.rol != 'propietario' && 
            datosActualizados && datosActualizados.jekuaaRoles && datosActualizados.jekuaaRoles.rol &&
            datosActualizados.jekuaaRoles.rol === 'propietario') {
            
            //No autorizado
            return res.status(403).json({
                mensaje: 'No tienes permiso para agregar un nuevo propietario.',
                resultado: null
            })

        }

        // Cambiamos el formato del cliente al formato servidor
        const datosActualizadosParseado = formatos.usuario_milliseconds_a_timestamp( datosActualizados )

        // Actualizar usuario
        const usuarioActualizado = await MiembroJekuaa.actalizarUsuarioPorUID( uid, datosActualizadosParseado )

        return res.status(200).json({
            mensaje: 'El usuario se actualizo de forma exitosa!',
            resultado: usuarioActualizado
        })
        
    } catch (error) {
        console.log('Error - actualizarUsuarioPorUID: ', error)

        return res.status(500).json({
            mensaje: error.message,
            resultado: error
        })
    }

}

controllerMiembroJekuaa.habilitarUsuarioPorUID = async (req, res) => {

    try {
        const { jekuaaDatos, params, body } = req
        const { uidSolicitante, datosAuthSolicitante } = jekuaaDatos
        const { uid } = params
        const { habilitar } = body

        // Obtener auth del solicitante y del usuario a actualizar
        const datosAuth = await admin.auth().getUser( uid )
        
        if ( datosAuth.disabled === !habilitar ) {
            
            let habilitarText = habilitar ? 'habilitar' : 'deshabilitar'
            let habilitadoText = habilitar ? 'habilitado' : 'deshabilitado'
            return res.status(400).json({
                mensaje: `No puedes ${habilitarText} si ya esta ${habilitadoText}.`,
                resultado: error
            })

        }

        const resultado = await MiembroJekuaa.habilitarUsuarioPorUID( uid, habilitar )

        let mensaje = habilitar ? `El usuario se habilito de forma exitosa.` : `El usuario se deshabilito de forma exitosa.`
        return res.status(200).json({
            mensaje,
            resultado
        })

    } catch (error) {
        console.log('Error - habilitarUsuarioPorUID: ', error)

        return res.status(500).json({
            mensaje: error.message,
            resultado: error
        })
    }

}

controllerMiembroJekuaa.eliminarUsuarioPorUID = async (req, res) => {
    
    try {
        
        const { params, body, jekuaaDatos } = req
        const { uid } = params
        const { uidSolicitante, datosAuthSolicitante } = jekuaaDatos

        

    } catch (error) {
        
    }

}

module.exports = controllerMiembroJekuaa