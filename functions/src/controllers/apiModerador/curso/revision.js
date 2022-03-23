const { request, response } = require("express")
const manejadorErrores = require("../../../helpers/ManejoErrores")
const CursoRevision = require("../../../models/Cursos/curso/CursoRevision")
const Respuesta = require("../../../models/Respuesta")

const controller = {}

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
            mensaje: '¡Se actualizó las funciones de este miembro!',
            resultado: null
        })
        const status = respuesta.getStatusCode()
        
        return res.status( status ).json( respuesta.getRespuesta() )
        
    } catch (error) {
        console.log('Error - asignarFuncionesMiembro: ', error)

        const {
            status,
            respuesta
        } = manejadorErrores( error )

        return res.status( status ).json( respuesta )
    }
}

module.exports = controller