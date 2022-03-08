const Errores = require("../../models/Error/Errores")
const Roles = require("../../models/Usuarios/helpers/Roles")

const middleware = {}

middleware.esMiembro = async (req, res, next) => {
    
    try {
        const { uidSolicitante, datosAuthSolicitante } = req.datos
        
        const rol = new Roles(datosAuthSolicitante.customClaims.rol)
        const data = await Roles.obtenerDatosRol(rol)
        
        if ( !data.esMiembro ) {
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