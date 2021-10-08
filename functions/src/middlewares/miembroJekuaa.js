const db = require('../../db')
const admin = require('../../firebase-service')
const ErrorJekuaa = require('../models/Error/ErroresJekuaa')
const manejadorErrores = require('../models/Error/ManejoErrores/ManejadorErrores')
const JekuaaRoles = require('../models/JekuaaRoles')
const utilsUsuarios = require('../utils/Usuario')
const utilsRolesSecciones = require('../utils/usuarios/RolesSecciones')
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
        
        const jekuaaRol = new JekuaaRoles({
            rol: datosAuthSolicitante.customClaims.rol
        })

        const documentoRol = await jekuaaRol.obtenerDocumentoRol()
        
        if ( !jekuaaRol.esMiembroJekuaa(documentoRol) ) {
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

middlewaresMiembroJekuaa.esDeMayorNivel = async ( req, res, next ) => {
    
    try {
        
        const { params, jekuaaDatos } = req
        const { uidSolicitante, datosAuthSolicitante } = jekuaaDatos
        const { uid } = params

        const datosAuthUsuario = await admin.auth().getUser( uid )

        // El solicitante debe tener mayor o igual nivel que el usuario a actualizar
        const diferenciaNivelRol = utilsRoles.compararNivelRol( datosAuthSolicitante.customClaims.rol, 
            datosAuthUsuario.customClaims.rol )

        if ( diferenciaNivelRol <= 0 ) {
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

middlewaresMiembroJekuaa.validezDeDatos = async ( req, res, next ) => {
    
    try {
        const { params, jekuaaDatos, body } = req
        const { datosUsuario, contrasenha } = body
        const { uidSolicitante, datosAuthSolicitante } = jekuaaDatos
        const { uid } = params
        
        verificarDatosDelCliente( datosUsuario )

        if ( contrasenha && typeof contrasenha != 'string' ) {
            throw new ErrorJekuaa({
                codigo: 'jekuaa/error/usuario_mala_solicitud',
                mensaje: 'La contraseña debe ser de tipo string.'
            })
        }

        // El solicitante no puede crear un usuario con mayor rol que el de el mismo
        if ( datosUsuario && datosUsuario.jekuaaRoles && datosUsuario.jekuaaRoles.rol ) {
            let diferenciaDeNivelDeRol = utilsRoles.compararNivelRol( datosAuthSolicitante.customClaims.rol, 
                datosUsuario.jekuaaRoles.rol )
        
            if ( diferenciaDeNivelDeRol < 0 ) {
                //No autorizado
                throw new ErrorJekuaa({
                    codigo: 'jekuaa/error/usuario_no_autorizado',
                    mensaje: 'No puedes crear o actualizar un usuario con mayor rol que el tuyo.'
                })
            }
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

middlewaresMiembroJekuaa.permisoParaOperarUnRol = async ( req, res, next ) => {
    
    try {
        const { jekuaaDatos, body } = req
        const { datosAuthSolicitante } = jekuaaDatos
        const { datosUsuario } = body
        
        // El solicitante no puede crear un usuario con mayor rol que el de el mismo
        if ( datosUsuario.jekuaaRoles ) {
            let diferenciaDeNivelDeRol = utilsRolesSecciones.compararNivelRol( datosAuthSolicitante.customClaims.rol, 
                datosUsuario.jekuaaRoles.rol )

            if ( diferenciaDeNivelDeRol < 0 ) {
                //No autorizado
                throw new ErrorJekuaa({
                    codigo: 'jekuaa/error/usuario_no_autorizado',
                    mensaje: 'No puedes crear o actualizar un usuario con mayor rol que el tuyo.'
                })
            }
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