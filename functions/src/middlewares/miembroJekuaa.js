const admin = require('../../firebase-service')
const ErrorJekuaa = require('../models/Error/ErroresJekuaa')
const manejadorErrores = require('../utils/ManejadorErrores')
const utilsRoles = require('../utils/usuarios/RolesSecciones')
const middlewaresMiembroJekuaa = {}

// MIDDLEWARES
middlewaresMiembroJekuaa.esPropietario = async (req, res, next) => {
    
    try {

        const { uidSolicitante, datosAuthSolicitante } = req.jekuaaDatos
        
        if( datosAuthSolicitante.customClaims.rol != 'propietario' ) {
            // No autorizado
            throw new ErrorJekuaa({
                codigo: 'jekuaa/error/usuario_no_autorizado'
            })
        }

        return next()

    } catch ( error ) {

        const {
            status,
            respuesta
        } = manejadorErrores( error )

        return res.status( status ).json( respuesta )

    }
    
}

middlewaresMiembroJekuaa.esMiembroJekuaa = async (req, res, next) => {
    
    try {

        const { uidSolicitante, datosAuthSolicitante } = req.jekuaaDatos
        
        if ( datosAuthSolicitante.customClaims.rol === 'estudiante' ) {
            // No autorizado
            throw new ErrorJekuaa({
                codigo: 'jekuaa/error/usuario_no_autorizado'
            })
        }

        return next()

    } catch ( error ) {
        
        const {
            status,
            respuesta
        } = manejadorErrores( error )

        return res.status( status ).json( respuesta )

    }

}

middlewaresMiembroJekuaa.esDeMayorIgualNivel = async ( req, res, next ) => {
    
    try {
        
        const { params, jekuaaDatos } = req
        const { uidSolicitante, datosAuthSolicitante } = jekuaaDatos
        const { uid } = params

        const datosAuthUsuario = await admin.auth().getUser( uid )

        // El solicitante debe tener mayor o igual nivel que el usuario a actualizar
        const diferenciaNivelRol = utilsRoles.compararNivelRol( datosAuthSolicitante.customClaims.rol, 
            datosAuthUsuario.customClaims.rol )

        if ( diferenciaNivelRol < 0 ) {
            // No autorizado
            throw new ErrorJekuaa({
                codigo: 'jekuaa/error/usuario_no_autorizado'
            })
        }

        return next()

    } catch (error) {

        const {
            status,
            respuesta
        } = manejadorErrores( error )

        return res.status( status ).json( respuesta )

    }
    
}

module.exports = middlewaresMiembroJekuaa