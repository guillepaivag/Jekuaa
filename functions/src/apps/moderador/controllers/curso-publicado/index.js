const { request, response } = require("express")

const Respuesta = require("../../../../models/Respuesta")
const manejadorErrores = require('../../../../helpers/ManejoErrores')
const ContenidoClasePublicado = require('../../../../models/Cursos/contenidoClase/ContenidoClasePublicado')

const controller = {}

controller.obtenerUrlVideoClase = async (req = request, res = response) => {
    
    try {
        const { datos, body, params } = req
        const { uidSolicitante, datosAuthSolicitante } = datos
        const { uidCurso, uidClase } = params

        const respuesta = new Respuesta()
        let codigo = 'exito'
        
        const url = await ContenidoClasePublicado.generarUrlVideoClase({
            uidCurso, uidClase
        })

        // Retornar respuesta
        respuesta.setRespuestaPorCodigo(codigo, {
            mensaje: '¡Se generó la url del video!',
            resultado: url
        })
        const status = respuesta.getStatusCode()
        
        return res.status( status ).json( respuesta.getRespuesta() )
    } catch (error) {
        console.log('Error - obtenerUrlVideoClase: ', error)

        const {
            status,
            respuesta
        } = manejadorErrores( error )

        return res.status( status ).json( respuesta )
    }

}



controller.obtenerArticuloClase = async (req = request, res = response) => {

    try {
        const { datos, body, params } = req
        const { uidSolicitante, datosAuthSolicitante } = datos
        const { uidCurso, uidClase } = params

        const respuesta = new Respuesta()
        let codigo = 'exito'
        
        const articulo = await ContenidoClasePublicado.obtenerArticuloClase({
            uidCurso, uidClase, getMarkdown: false
        })

        // Retornar respuesta
        respuesta.setRespuestaPorCodigo(codigo, {
            mensaje: '¡Se generó el articulo de la clase!',
            resultado: articulo
        })
        const status = respuesta.getStatusCode()
        
        return res.status( status ).json( respuesta.getRespuesta() )
    } catch (error) {
        console.log('Error - obtenerArticuloClase: ', error)

        const {
            status,
            respuesta
        } = manejadorErrores( error )

        return res.status( status ).json( respuesta )
    }

}

module.exports = controller