const CursoRevision = require("../../../../models/Cursos/curso/CursoRevision")
const Errores = require("../../../../models/Error/Errores")

const middleware = {}

middleware.esValidoElContenidoClaseParaVisualizar = async (req, res, next) => {
    
    try {
        const { datos, body, params } = req
        const { uidSolicitante, datosAuthSolicitante } = datos

        const revision = new CursoRevision()
        const existe = await revision.importarDatosDeUnCursoRevision(params.uidCurso)

        if (!existe) {
            throw new Errores({
                codigo: 'error/usuario_mala_solicitud',
                mensaje: 'No existe el curso.'
            })
        }

        if (!revision.activado) {
            throw new Errores({
                codigo: 'error/usuario_mala_solicitud',
                mensaje: 'No esta activada la revisión.'
            })
        }

        if (revision.estadoModeracion.estado !== 'revision') {
            throw new Errores({
                codigo: 'error/usuario_mala_solicitud',
                mensaje: 'Para visualizar el contenido debe estar en revisión.'
            })
        }
        
        return next()

    } catch ( error ) {
        console.log('error', error)
        next(error)
    }

}


module.exports = middleware