const Errores = require("../models/Error/Errores")
const Roles = require("../models/Usuarios/helpers/Roles")
const Moderador = require("../models/Usuarios/TiposUsuarios/Moderador")

const middlewares = {}

middlewares.esModerador = async (req, res, next) => {
    
    try {
        const { uidSolicitante, datosAuthSolicitante } = req.datos
        
        const rol = new Roles(datosAuthSolicitante.customClaims.rol)
        const data = await Roles.obtenerDatosRol(rol)
        
        if ( !data.esModerador ) {
            // No autorizado
            throw new Errores({
                estado: 401,
                mensajeCliente: 'sin_permisos',
                mensajeServidor: 'No es moderador.'
            })
        }

        return next()

    } catch ( error ) {
        console.log('error', error)
        next(error)

    }

}


middlewares.esModeradorDeCursos = async (req, res, next) => {
    
    try {
        const { uidSolicitante, datosAuthSolicitante } = req.datos
        
        const moderador = new Moderador()
        await moderador.importarDatosModerador(uidSolicitante)

        const esModeradorDeUsuarios = moderador.funciones.includes('moderador-cursos')

        if (!esModeradorDeUsuarios) {
            // No autorizado
            throw new Errores({
                estado: 401,
                mensajeCliente: 'sin_permisos',
                mensajeServidor: 'No es moderador de cursos.'
            })
        }

        return next()

    } catch ( error ) {
        console.log('error', error)
        next(error)

    }

}


middlewares.esModeradorDeUsuarios = async (req, res, next) => {
    
    try {
        const { uidSolicitante, datosAuthSolicitante } = req.datos
        
        const moderador = new Moderador()
        await moderador.importarDatosModerador(uidSolicitante)

        const esModeradorDeUsuarios = moderador.funciones.includes('moderador-usuarios')

        if (!esModeradorDeUsuarios) {
            // No autorizado
            throw new Errores({
                estado: 401,
                mensajeCliente: 'sin_permisos',
                mensajeServidor: 'No es moderador de usuarios.'
            })
        }

        return next()

    } catch ( error ) {
        console.log('error', error)
        next(error)

    }

}


module.exports = middlewares