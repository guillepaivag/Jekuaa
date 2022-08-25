const Errores = require("../models/Error/Errores")
const Roles = require("../models/Usuarios/helpers/Roles")

const middlewares = {}

middlewares.esPropietario = async (req, res, next) => {
    
    try {
        const { uidSolicitante, datosAuthSolicitante } = req.datos
        
        const rol = new Roles(datosAuthSolicitante.customClaims.rol)
        const documentoRol =  await rol.obtenerDocumentoRol()

        if ( !documentoRol.exists ) {
            throw new Errores({
                estado: 400,
                mensajeCliente: 'no_existe_rol',
                mensajeServidor: 'No existe este rol.'
            })
        }
        
        if ( documentoRol.id !== 'propietario' ) {
            // No autorizado
            throw new Errores({
                estado: 401,
                mensajeCliente: 'sin_permisos',
                mensajeServidor: 'No eres propietario.'
            })
        }

        return next()

    } catch ( error ) {
        console.log('error', error)
        next(error)

    }

}

module.exports = middlewares