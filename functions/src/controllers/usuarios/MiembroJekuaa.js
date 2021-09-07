const admin = require('../../../firebase-service')
const db = require('../../../db')
const MiembroJekuaa = require("../../models/TiposUsuarios/MiembroJekuaa")
const utilsRoles = require('../../utils/usuarios/RolesSecciones')
const Usuario = require('../../models/Usuario')

const controllerMiembroJekuaa = {}

controllerMiembroJekuaa.verUsuarioPorUID = async (req, res) => {

    try {

        const { uidSolicitante, params } = req
        const { uid } = params

        // Verificar si es del miembroJekuaa


        // Obtener datos del usuario
        const datosUsuario = await MiembroJekuaa.verDatosDeUnUsuarioPorUID(uid)

        return res.status(200).json({
            mensaje: 'Los datos de los usuarios se enviaron de forma exitosa',
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

controllerMiembroJekuaa.crearUsuario = async (req, res) => {

    try {
        
    } catch (error) {
        
    }

}

controllerMiembroJekuaa.actualizarUsuarioPorUID = async (req, res) => {

    try {
        const { uidSolicitante, params, body } = req
        const { uid } = params
        const { datosActualizados } = body

        // // Verificacion de uid, uidSolicitante debe ser mayor a la uid a actualizar
        // const authUserSolicitante = await admin.auth().getUser(uidSolicitante)
        // const authUser = await admin.auth().getUser(uid)
        
        // if ( !utilsRoles.rolXMayorRolY( authUserSolicitante.customClaims.rol, authUser.customClaims.rol) ) {
        //     // No autorizado

        //     return res.status(401).json({
                
        //     })
        // }

        // Actualizar usuario
        await MiembroJekuaa.actalizarUsuarioPorUID(uid, datosActualizados)

        return res.status(200).json({
            mensaje: 'El usuario se actualizo de forma exitosa!',
            resultado: true
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
        
    } catch (error) {
        
    }

}

controllerMiembroJekuaa.eliminarUsuarioPorUID = async (req, res) => {
    
    try {
        
    } catch (error) {
        
    }

}

module.exports = controllerMiembroJekuaa