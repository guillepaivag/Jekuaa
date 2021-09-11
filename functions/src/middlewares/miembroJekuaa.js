const admin = require('../../firebase-service')
const utilsRoles = require('../utils/usuarios/RolesSecciones')
const middlewaresMiembroJekuaa = {}

// MIDDLEWARES
middlewaresMiembroJekuaa.esPropietario = async (req, res, next) => {
    
    try {

        const { uidSolicitante, datosAuthSolicitante } = req.jekuaaDatos
        
        if( datosAuthSolicitante.customClaims.rol != 'propietario' ) {
            
            let codigo = 'jekuaa/error/usuario_no_autorizado'
            const respuesta = new Respuesta().setRespuestaPorCodigo( codigo )
            const status = respuesta.getInformacionPorCodigo().status
            
            return res.status( status ).json( respuesta.getRespuesta() )
        
        }

        return next()

    } catch ( error ) {

        let codigo = 'jekuaa/error/sistema'
        const respuesta = new Respuesta().setRespuestaPorCodigo( codigo, error )
        const status = respuesta.getInformacionPorCodigo().status
        
        return res.status( status ).json( respuesta.getRespuesta() )

    }
    
}

middlewaresMiembroJekuaa.esMiembroJekuaa = async (req, res, next) => {
    
    try {

        const { uidSolicitante, datosAuthSolicitante } = req.jekuaaDatos
        
        if ( datosAuthSolicitante.customClaims.rol === 'estudiante' ) {
            
            let codigo = 'jekuaa/error/usuario_no_autorizado'
            const respuesta = new Respuesta().setRespuestaPorCodigo( codigo )
            const status = respuesta.getInformacionPorCodigo().status
            
            return res.status( status ).json( respuesta.getRespuesta() )
            
        }

        return next()

    } catch ( error ) {
        
        let codigo = 'jekuaa/error/sistema'
        const respuesta = new Respuesta().setRespuestaPorCodigo( codigo, error )
        const status = respuesta.getInformacionPorCodigo().status
        
        return res.status( status ).json( respuesta.getRespuesta() )

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
            let codigo = 'jekuaa/error/usuario_no_autorizado'
            const respuesta = new Respuesta().setRespuestaPorCodigo( codigo )
            const status = respuesta.getInformacionPorCodigo().status
            
            return res.status( status ).json( respuesta.getRespuesta() )
        }

        return next()

    } catch (error) {

        let codigo = 'jekuaa/error/sistema'
        if ( error.code === 'auth/user-not-found' ) {
            codigo = 'jekuaa/error/usuario_no_autenticado'
        }

        const respuesta = new Respuesta().setRespuestaPorCodigo( codigo, error )
        const status = respuesta.getInformacionPorCodigo().status
        
        return res.status( status ).json( respuesta.getRespuesta() )

    }
    
}

module.exports = middlewaresMiembroJekuaa