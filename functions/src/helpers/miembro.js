const Errores = require("../models/Error/Errores")
const Roles = require("../models/Usuarios/helpers/Roles")
const Miembro = require("../models/Usuarios/TiposUsuarios/Miembro")

const middleware = {}

middleware.esMiembro = async (req, res, next) => {
    
    try {
        const { uidSolicitante, datosAuthSolicitante } = req.datos
        
        const rol = new Roles(datosAuthSolicitante.customClaims.rol)
        const data = await Roles.obtenerDatosRol(rol)
        
        if ( !data.esMiembro ) {
            // No autorizado
            throw new Errores({
                estado: 401,
                mensajeCliente: 'sin_permisos',
                mensajeServidor: 'No es miembro.',
            })
        }

        return next()

    } catch ( error ) {
        console.log('error', error)
        next(error)

    }

}

middleware.esMiembroBlogger = async (req = request, res = response, next) => {
    try {
        const { datos, body } = req
        const { uidSolicitante, datosAuthSolicitante } = datos

        const miembro = new Miembro()
        await miembro.importarDatosMiembro(uidSolicitante)

        const esBlogger = miembro.funciones.includes('blogger')
        if (!esBlogger) {
            throw new Errores({
                estado: 401,
                mensajeCliente: 'sin_permisos',
                mensajeServidor: 'No tienes el permiso de blogger.'
            })
        }

        next()
    } catch (error) {
        next(error)
    }
}

middleware.esMiembroInstructor = async (req = request, res = response, next) => {
    try {
        const { datos, body } = req
        const { uidSolicitante, datosAuthSolicitante } = datos

        const miembro = new Miembro()
        await miembro.importarDatosMiembro(uidSolicitante)

        const esBlogger = miembro.funciones.includes('instructor')
        if (!esBlogger) {
            throw new Errores({
                estado: 401,
                mensajeCliente: 'sin_permisos',
                mensajeServidor: 'No tienes el permiso de instructor.'
            })
        }

        next()
    } catch (error) {
        next(error)
    }
}

middleware.esMiembroInstructor_InstructorAuxiliar = async (req = request, res = response, next) => {
    try {
        const { datos, body } = req
        const { uidSolicitante, datosAuthSolicitante } = datos

        const miembro = new Miembro()
        await miembro.importarDatosMiembro(uidSolicitante)

        const esBlogger = miembro.funciones.includes('instructor') || miembro.funciones.includes('instructor-auxiliar')
        if (!esBlogger) {
            throw new Errores({
                estado: 401,
                mensajeCliente: 'sin_permisos',
                mensajeServidor: 'No tienes el permiso de instructor.'
            })
        }

        next()
    } catch (error) {
        next(error)
    }
}

module.exports = middleware