const Errores = require("../../../models/Error/Errores")
const Roles = require("../../../models/Usuarios/helpers/Roles")

const middleware = {}



middleware.esPropietario = async (req, res, next) => {
    
    try {
        const { uidSolicitante, datosAuthSolicitante } = req.datos
        
        const rol = new Roles(datosAuthSolicitante.customClaims.rol)
        const documentoRol =  await rol.obtenerDocumentoRol()

        if ( !documentoRol.exists ) {
            throw new Errores({
                codigo: 'error/usuario_mala_solicitud',
                mensaje: 'No existe este rol.'
            })
        }
        
        if ( documentoRol.id !== 'propietario' ) {
            // No autorizado
            throw new Errores({
                codigo: 'error/usuario_no_autorizado'
            })
        }

        return next()

    } catch ( error ) {
        console.log('error', error)
        next(error)

    }

}


module.exports = middleware