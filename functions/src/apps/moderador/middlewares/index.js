const Errores = require("../../../models/Error/Errores")
const Roles = require("../../../models/Usuarios/helpers/Roles")
const Moderador = require("../../../models/Usuarios/TiposUsuarios/Moderador")

const middleware = {}




middleware.esModerador = async (req, res, next) => {
    
    try {
        const { uidSolicitante, datosAuthSolicitante } = req.datos
        
        const rol = new Roles(datosAuthSolicitante.customClaims.rol)
        const data = await Roles.obtenerDatosRol(rol)
        
        if ( !data.esModerador ) {
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




middleware.esModeradorDeUsuarios = async (req, res, next) => {
    
    try {
        const { uidSolicitante, datosAuthSolicitante } = req.datos
        
        const moderador = new Moderador()
        await moderador.importarDatosModerador(uidSolicitante)

        const esModeradorDeUsuarios = moderador.funciones.includes('moderador-usuarios')

        if (!esModeradorDeUsuarios) {
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




middleware.esModeradorDeCursos = async (req, res, next) => {
    
    try {
        const { uidSolicitante, datosAuthSolicitante } = req.datos
        
        const moderador = new Moderador()
        await moderador.importarDatosModerador(uidSolicitante)

        const esModeradorDeUsuarios = moderador.funciones.includes('moderador-cursos')

        if (!esModeradorDeUsuarios) {
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




middleware.esModeradorDeBlogs = async (req, res, next) => {
    
    try {
        const { uidSolicitante, datosAuthSolicitante } = req.datos
        
        const moderador = new Moderador()
        await moderador.importarDatosModerador(uidSolicitante)

        const esModeradorDeUsuarios = moderador.funciones.includes('moderador-blogs')

        if (!esModeradorDeUsuarios) {
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