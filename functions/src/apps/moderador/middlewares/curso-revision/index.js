const CursoRevision = require("../../../../models/Cursos/curso/CursoRevision")
const Errores = require("../../../../models/Error/Errores")

const middleware = {}

middleware.errorNoEstaEnRevision = async (req, res, next) => {
    
    try {
        const { datos, body, params } = req
        const { uidSolicitante, datosAuthSolicitante } = datos

        const revision = new CursoRevision()
        const existe = await revision.importarDatosDeUnCursoRevision(params.uidCurso)

        if (!existe) {
            throw new Errores({
                codigo: 'error/usuario_mala_solicitud',
                mensaje: 'No existe esta revision.'
            })
        }

        if (!revision.activado) {
            throw new Errores({
                codigo: 'error/usuario_mala_solicitud',
                mensaje: 'Esta deshabilitado la revisión.'
            })
        }

        if (revision.estadoModeracion.estado !== 'revision') {
            throw new Errores({
                codigo: 'error/usuario_mala_solicitud',
                mensaje: 'Tiene que estar en revisión.'
            })
        }
        
        return next()

    } catch ( error ) {
        console.log('error', error)
        next(error)
    }

}


middleware.validarMensajeCursoRevisionNoAceptado = async (req, res, next) => {
    
    try {
        const { datos, body } = req
        const { uidSolicitante, datosAuthSolicitante } = datos
        const { mensaje } = body

        if (!mensaje) {
            throw new Errores({
                codigo: 'error/usuario_mala_solicitud'
            })
        }

        if (mensaje.length === 0) {
            throw new Errores({
                codigo: 'error/usuario_mala_solicitud'
            })
        }

        return next()

    } catch ( error ) {
        console.log('error', error)
        next(error)
    }

}


module.exports = middleware