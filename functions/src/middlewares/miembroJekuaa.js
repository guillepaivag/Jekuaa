const middleware = {}

middleware.esMiembroJekuaa = async (req, res, next) => {
    
    try {
        const { uidSolicitante, datosAuthSolicitante } = req.jekuaaDatos
        
        const docRol = await JekuaaRoles.obtenerDocumentoRol(datosAuthSolicitante.customClaims.jekuaaRol)
        
        if ( !docRol.data().esMiembroJekuaa ) {
            // No autorizado
            throw new ErrorJekuaa({
                codigo: 'jekuaa/error/usuario_no_autorizado'
            })
        }

        return next()

    } catch ( error ) {
        console.log('error', error)
        next(error)

    }

}

module.exports = middleware