const admin = require('../../firebase-service')
const utilsRoles = require('../utils/usuarios/RolesSecciones')
const middlewaresMiembroJekuaa = {}

// MIDDLEWARES
middlewaresMiembroJekuaa.esPropietario = async (req, res, next) => {
    
    try {
        const { uidSolicitante, datosAuthSolicitante } = req.jekuaaDatos
        
        if(datosAuthSolicitante.customClaims.rol != 'propietario') {
            return res.status(403).json({
                mensaje: 'No estas autorizado, no eres propietario.',
                resultado: null
            })
        }

        return next()

    } catch (error) {
        console.log('error', error)

        return res.status(403).json({
            mensaje: 'No estas autorizado, no eres propietario.',
            resultado: error
        })
    }
    
}

middlewaresMiembroJekuaa.esMiembroJekuaa = async (req, res, next) => {
    
    try {
        const { uidSolicitante, datosAuthSolicitante } = req.jekuaaDatos
        
        if ( datosAuthSolicitante.customClaims.rol === 'estudiante' ) {
            return res.status(403).json({
                mensaje: 'No estas autorizado, no eres miembro del equipo Jekuaa.',
                resultado: null
            })
        }

        return next()

    } catch (error) {
        console.log('error', error)

        return res.status(403).json({
            mensaje: 'No estas autorizado, no eres miembro del equipo Jekuaa.',
            resultado: error
        })
    }

}

middlewaresMiembroJekuaa.esDeMayorIgualNivel = async ( req, res, next ) => {
    
    try {
        const { params, jekuaaDatos } = req
        const { uidSolicitante, datosAuthSolicitante } = jekuaaDatos
        const { uid } = params

        console.log('datosAuthSolicitante', datosAuthSolicitante)

        const datosAuthUsuario = await admin.auth().getUser(uid)
        console.log('datosAuthUsuario', datosAuthUsuario)

        // El solicitante debe tener mayor o igual nivel que el usuario a actualizar
        const diferenciaNivelRol = utilsRoles.compararNivelRol( datosAuthSolicitante.customClaims.rol, datosAuthUsuario.customClaims.rol)
        console.log('diferenciaNivelRol', diferenciaNivelRol)

        if ( diferenciaNivelRol < 0 ) {
            // No autorizado
            return res.status(403).json({
                mensaje: 'No estas autorizado, no puedes operar a este usuario.',
                resultado: null
            })
        }

        return next()

    } catch (error) {
        return res.status(403).json({
            mensaje: 'No estas autorizado, no puedes operar a este usuario..',
            resultado: error
        })
    }
    
}

module.exports = middlewaresMiembroJekuaa