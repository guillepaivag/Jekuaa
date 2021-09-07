const admin = require('../../../firebase-service')
const db = require('../../../db')
const MiembroJekuaa = require("../../models/TiposUsuarios/MiembroJekuaa")
const utilsRoles = require('../../utils/usuarios/RolesSecciones')

const controllerMiembroJekuaa = {}

controllerMiembroJekuaa.verUsuarioPorUID = async (req, res) => {

    try {

        const {

        } = req.body
        
    } catch (error) {
        
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

        })
        
    } catch (error) {
        console.log('Error - actualizarUsuarioPorUID: ', error)

        return res.status(500).json({
            mensaje: error.message
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