const Blog = require("../../models/Blog")
const ErrorJekuaa = require("../../models/Error/ErroresJekuaa")
const Respuesta = require("../../models/Respuesta")
const Estudiante = require("../../models/TiposUsuarios/Estudiante")

const controller = {}

controller.darMeGusta = async (req, res) => {
    try {
        const { jekuaaDatos, body, params } = req
        const { uidSolicitante, datosAuthSolicitante } = jekuaaDatos
        const { uid } = params
        const { meGusta } = body

        const respuesta = new Respuesta()
        let codigo = 'jekuaa/exito'

        await Estudiante.darMeGustaBlog(uid, uidSolicitante, meGusta)

        const mensaje = meGusta ? '¡Haz dado un me gusta a este blog!' : 'Haz indicado que no te gusta este blog.'
        // Retornar respuesta
        respuesta.setRespuestaPorCodigo(codigo, {
            mensaje,
            resultado: null
        })
        const status = respuesta.getStatusCode()
        
        return res.status( status ).json( respuesta.getRespuesta() )

    } catch (error) {
        console.log('Error - darMeGusta: ', error)

        const {
            status,
            respuesta
        } = manejadorErrores( error )

        return res.status( status ).json( respuesta )
    }
}


module.exports = controller