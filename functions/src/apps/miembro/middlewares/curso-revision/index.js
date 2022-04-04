const { request, response } = require("express")
const CursoRevision = require("../../../../models/Cursos/curso/CursoRevision")
const Errores = require("../../../../models/Error/Errores")

const borrador = {}

borrador.errorSiElCursoEstaEnRevision = async (req = request, res = response, next) => {
    try {
        const { datos, body, params } = req
        const { uidSolicitante, datosAuthSolicitante } = datos

        const existe = await CursoRevision.esRevisionActivada(params.uidCurso)

        if (existe) {
            throw new Errores({
                codigo: 'error/usuario_mala_solicitud',
                mensaje: 'La revisión esta activada, favor desactivar.'
            })
        }

        next()
    } catch (error) {
        next(error)
    }
}

borrador.validacionCreacionCursoRevision = async (req = request, res = response, next) => {
    try {
        const { datos, body, params } = req
        const { uidSolicitante, datosAuthSolicitante } = datos

        const revision = new CursoRevision()
        const existe = await revision.importarDatosDeUnCursoRevision(params.uidCurso)

        if (revision.activado) {
            throw new Errores({
                codigo: 'error/usuario_mala_solicitud',
                mensaje: 'Hay una revisión activada, favor desactivar la revisión.'
            })
        }

        if (revision.estadoModeracion.estado === 'revision') {
            throw new Errores({
                codigo: 'error/usuario_mala_solicitud',
                mensaje: 'Se está revisando las actualizaciones de este curso.'
            })
        }

        if ( revision.estadoPublicacion === 'proceso' || revision.estadoPublicacion === 'publicando' ) {
            throw new Errores({
                codigo: 'error/usuario_mala_solicitud',
                mensaje: 'Se esta publicando las actualizaciones del curso.'
            })
        }

        next()
    } catch (error) {
        next(error)
    }
}


borrador.validacionCancelacionCursoRevision = async (req = request, res = response, next) => {
    try {
        const { datos, body, params } = req
        const { uidSolicitante, datosAuthSolicitante } = datos

        const revision = new CursoRevision()
        const existe = await revision.importarDatosDeUnCursoRevision(params.uidCurso)

        if (!existe) {
            throw new Errores({
                codigo: 'error/usuario_mala_solicitud',
                mensaje: 'No existe esta revisión.'
            })
        }

        if (!revision.activado) {
            throw new Errores({
                codigo: 'error/usuario_mala_solicitud',
                mensaje: 'La revisión ya esta desactivada.'
            })
        }

        if (revision.estadoModeracion.estado === 'revision') {
            throw new Errores({
                codigo: 'error/usuario_mala_solicitud',
                mensaje: 'Se está revisando las actualizaciones de este curso.'
            })
        }

        if ( revision.estadoPublicacion === 'proceso' || revision.estadoPublicacion === 'publicando' ) {
            throw new Errores({
                codigo: 'error/usuario_mala_solicitud',
                mensaje: 'Se esta publicando las actualizaciones del curso.'
            })
        }

        next()
    } catch (error) {
        next(error)
    }
}

module.exports = borrador