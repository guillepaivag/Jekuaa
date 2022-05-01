const { request, response } = require("express")
const Errores = require("../../../models/Error/Errores")
const Authentication = require("../../../models/Usuarios/Authentication")
const Roles = require("../../../models/Usuarios/helpers/Roles")

const middleware = {}



middleware.validarDatosCambioRol = async (req = request, res = response, next) => {
    
    try {
        const { uidSolicitante, datosAuthSolicitante } = req.datos
        const { uidUsuario } = req.params
        const { rolNuevo } = req.body

        // Existencia de usuario
        const auth = new Authentication(uidUsuario)
        const userRecord = await auth.existeUsuario()
        req.datos.userRecord = userRecord

        if ( !userRecord ) {
            throw new Errores({
                codigo: 'error/usuario_mala_solicitud',
                mensaje: 'No existe este usuario.'
            })
        }
        
        // Existencia de rol
        const rol = new Roles(rolNuevo)
        const documentoRol = await rol.obtenerDocumentoRol()

        if (!documentoRol.exists) {
            throw new Errores({
                codigo: 'error/usuario_mala_solicitud',
                mensaje: 'No existe este rol.'
            })
        }

        // Validaciones de datos
        if ( rolNuevo === userRecord.customClaims.rol ) {
            throw new Errores({
                codigo: 'error/usuario_mala_solicitud',
                mensaje: 'Ya tiene este rol.'
            })
        }

        // Casos si es PROPIETARIO
        if ( userRecord.customClaims.rol === 'propietario' ) {
            throw new Errores({
                codigo: 'error/usuario_mala_solicitud',
                mensaje: 'No puedes quitar a otro propietario.'
            })
        }

        // Casos si es MODERADOR
        if ( userRecord.customClaims.rol === 'moderador' && rolNuevo === 'estudiante' ) {
            throw new Errores({
                codigo: 'error/usuario_mala_solicitud',
                mensaje: 'No puedes pasarle a estudiante.'
            })
        }

        // Casos si es MIEMBRO
        if ( userRecord.customClaims.rol === 'miembro' && rolNuevo === 'estudiante' ) {
            throw new Errores({
                codigo: 'error/usuario_mala_solicitud',
                mensaje: 'No puedes pasarle a estudiante.'
            })
        }

        return next()

    } catch ( error ) {
        console.log('error', error)
        next(error)

    }

}



module.exports = middleware