const { request, response } = require("express")

const Respuesta = require("../../../models/Respuesta")
const manejadorErrores = require('../../../helpers/manejoErrores')
const ContenidoVideoPublicado = require("../../../models/Cursos/contenidoClase/ContenidoVideoPublicado")
const ContenidoArticuloPublicado = require("../../../models/Cursos/contenidoClase/ContenidoArticuloPublicado")

const controller = {}

controller.obtenerUrlVideoClase = async (req = request, res = response) => {
    
    try {
        const { datos, body, params } = req
        const { uidSolicitante, datosAuthSolicitante } = datos
        const { uidCurso, uidClase } = params

        const respuesta = new Respuesta()
        let estado = 'exito'
        
        const url = await ContenidoVideoPublicado.generarUrlVideo({
            rutaPrefix: `${uidCurso}/${uidClase}/video.`,
        })

        // Retornar respuesta
        respuesta.setRespuesta({
            estado: 200,
            mensaje: 'exito',
            resultado: url
        })
        
        return res.status( respuesta.estado ).json( respuesta.getRespuesta() )
    } catch (error) {
        console.log('Error - obtenerUrlVideoClase: ', error)

        const respuesta = manejadorErrores( error )
        return res.status( respuesta.estado ).json( respuesta.getRespuesta() )
    }

}



controller.obtenerArticuloClase = async (req = request, res = response) => {

    try {
        const { datos, body, params } = req
        const { uidSolicitante, datosAuthSolicitante } = datos
        const { uidCurso, uidClase } = params

        const respuesta = new Respuesta()
        let estado = 'exito'
        
        const articulo = await ContenidoArticuloPublicado.obtenerArticulo({
            rutaPrefix: `${uidCurso}/${uidClase}/articulo.md`,
            getMarkdown: false
        })

        // Retornar respuesta
        respuesta.setRespuesta({
            estado: 200,
            mensaje: 'exito',
            resultado: articulo
        })
        
        return res.status( respuesta.estado ).json( respuesta.getRespuesta() )
    } catch (error) {
        console.log('Error - obtenerArticuloClase: ', error)

        const respuesta = manejadorErrores( error )
        return res.status( respuesta.estado ).json( respuesta.getRespuesta() )
    }

}

module.exports = controller