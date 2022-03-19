const { request, response } = require("express")
const CursoRevision = require("../../../../models/Cursos/curso/CursoRevision")
const Errores = require("../../../../models/Error/Errores")

const borrador = {}

borrador.errorSiElCursoEstaEnRevision = async (req = request, res = response, next) => {
    try {
        const { datos, body, params } = req
        const { uidSolicitante, datosAuthSolicitante } = datos

        const existe = await CursoRevision.existeCursoRevision(params.uidCursoBorrador)

        if (existe) {
            throw new Errores({
                codigo: 'error/usuario_no_autorizado',
                mensaje: 'El curso está en revisión.'
            })
        }

        next()
    } catch (error) {
        next(error)
    }
}


borrador.errorSiElCursoNoEstaEnRevision = async (req = request, res = response, next) => {
    try {
        const { datos, body, params } = req
        const { uidSolicitante, datosAuthSolicitante } = datos

        const existe = await CursoRevision.existeCursoRevision(params.uidCursoBorrador)

        if (!existe) {
            throw new Errores({
                codigo: 'error/usuario_mala_solicitud',
                mensaje: 'El curso no está en revisión.'
            })
        }

        next()
    } catch (error) {
        next(error)
    }
}


borrador.errorElCursoRevisionNoEstaEnEspera = async (req = request, res = response, next) => {
    try {
        const { datos, body, params } = req
        const { uidSolicitante, datosAuthSolicitante } = datos

        const informacion = await CursoRevision.obtenerInformacionDeRevision(params.uidCursoBorrador)

        const estadoAdmin = informacion.estado

        if (estadoAdmin !== 'espera') {
            throw new Errores({
                codigo: 'error/usuario_mala_solicitud',
                mensaje: 'La revisión de este curso no esta en espera por parte de la administración de Jekuaapy.'
            })
        }

        next()
    } catch (error) {
        next(error)
    }
}

module.exports = borrador