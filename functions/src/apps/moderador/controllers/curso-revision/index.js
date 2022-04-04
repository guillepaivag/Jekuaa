const { request, response } = require("express")
const manejadorErrores = require("../../../../helpers/ManejoErrores")
const CursoRevision = require("../../../../models/Cursos/curso/CursoRevision")
const Errores = require("../../../../models/Error/Errores")
const Respuesta = require("../../../../models/Respuesta")

const controller = {}

controller.cambiarEstadoRevision = async (req = request, res = response) => {
    try {
        const { datos, body, params } = req
        const { uidSolicitante, datosAuthSolicitante } = datos

        const respuesta = new Respuesta()
        let codigo = 'exito'

        const revision = new CursoRevision()
        await revision.importarDatosDeUnCursoRevision(params.uidCurso)

        if ( !revision.activado ) {
            throw new Errores({
                codigo: 'error/usuario_mala_solicitud',
                mensaje: 'No esta habilitado.'
            })
        }
        
        if ( revision.estadoModeracion.estado !== 'espera' ) {
            throw new Errores({
                codigo: 'error/usuario_mala_solicitud',
                mensaje: 'La revisión debe estar en espera.'
            })
        }
        
        revision.estadoModeracion.estado = 'revision'
        const datosActualizados = {
            estadoModeracion: revision.estadoModeracion
        }
        await CursoRevision.actualizarRevision(params.uidCurso, datosActualizados)

        // Retornar respuesta
        respuesta.setRespuestaPorCodigo(codigo, {
            mensaje: '¡Este curso ahora esta en revisión!',
            resultado: null
        })
        const status = respuesta.getStatusCode()
        
        return res.status( status ).json( respuesta.getRespuesta() )
        
    } catch (error) {
        console.log('Error - cambiarEstadoRevision: ', error)

        const {
            status,
            respuesta
        } = manejadorErrores( error )

        return res.status( status ).json( respuesta )
    }
}



controller.aceptarCursoRevision = async (req = request, res = response) => {
    try {
        const { datos, body, params } = req
        const { uidSolicitante, datosAuthSolicitante } = datos
        const { mensaje } = body

        const respuesta = new Respuesta()
        let codigo = 'exito'

        await CursoRevision.aceptarCursoPorModeracion(params.uidCurso, '')

        // Retornar respuesta
        respuesta.setRespuestaPorCodigo(codigo, {
            mensaje: '¡Se aceptó estas actualizaciones para el curso!',
            resultado: null
        })
        const status = respuesta.getStatusCode()
        
        return res.status( status ).json( respuesta.getRespuesta() )
        
    } catch (error) {
        console.log('Error - aceptarCursoRevision: ', error)

        const {
            status,
            respuesta
        } = manejadorErrores( error )

        return res.status( status ).json( respuesta )
    }
}


controller.noAceptarCursoRevision = async (req = request, res = response) => {
    try {
        const { datos, body, params } = req
        const { uidSolicitante, datosAuthSolicitante } = datos
        const { mensaje } = body

        const respuesta = new Respuesta()
        let codigo = 'exito'

        await CursoRevision.aceptarCursoPorModeracion(params.uidCurso, mensaje)

        // Retornar respuesta
        respuesta.setRespuestaPorCodigo(codigo, {
            mensaje: '¡No se acepto estas actualizaciones para el curso!',
            resultado: mensaje
        })
        const status = respuesta.getStatusCode()
        
        return res.status( status ).json( respuesta.getRespuesta() )
        
    } catch (error) {
        console.log('Error - noAceptarCursoRevision: ', error)

        const {
            status,
            respuesta
        } = manejadorErrores( error )

        return res.status( status ).json( respuesta )
    }
}

module.exports = controller