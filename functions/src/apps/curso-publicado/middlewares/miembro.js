const { request, response } = require("express")
const CursoPublicado = require("../../../models/Cursos/curso/CursoPublicado")
const Errores = require("../../../models/Error/Errores")

const middlewares = {}

middlewares.esAdministradorDelCursoPublicado = async (req = request, res = response, next) => {
    try {
        const { datos, body, params } = req
        const { uidSolicitante, datosAuthSolicitante } = datos

        const cursoPublicado = new CursoPublicado()
        const existe = await cursoPublicado.importarDatosDeUnCurso(params.uidCurso)

        if (!existe) {
            throw new Errores({
                estado: 400,
                mensajeCliente: 'no_existe_curso_publicado',
                mensajeServidor: 'No existe este curso.'
            })
        }

        if ( cursoPublicado.instructor !== uidSolicitante && cursoPublicado.responsable !== uidSolicitante && !cursoPublicado.auxiliares.includes(uidSolicitante) ) {
            throw new Errores({
                estado: 401,
                mensajeCliente: 'sin_permisos',
                mensajeServidor: 'No es el responsable o auxiliar del curso.'
            })
        }

        next()
    } catch (error) {
        next(error)
    }
}

middlewares.esResponsableDelCursoPublicado = async (req = request, res = response, next) => {
    try {
        const { datos, body, params } = req
        const { uidSolicitante, datosAuthSolicitante } = datos

        const cursoPublicado = new CursoPublicado()
        const existe = await cursoPublicado.importarDatosDeUnCurso(params.uidCurso)

        if (!existe) {
            throw new Errores({
                estado: 400,
                mensajeCliente: 'no_existe_curso_publicado',
                mensajeServidor: 'No existe este curso.'
            })
        }

        if ( cursoPublicado.responsable !== uidSolicitante ) {
            throw new Errores({
                estado: 401,
                mensajeCliente: 'sin_permisos',
                mensajeServidor: 'Este curso no pertenece a tu repositorio de cursos.'
            })
        }

        req.body.cursoPublicado = cursoPublicado

        next()
    } catch (error) {
        next(error)
    }
}

module.exports = middlewares