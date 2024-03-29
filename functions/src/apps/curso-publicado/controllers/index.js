const { request, response } = require("express")
const manejadorErrores = require("../../../helpers/manejoErrores")
const ContenidoArticuloPublicado = require("../../../models/Cursos/contenidoClase/ContenidoArticuloPublicado")
const ContenidoVideoPublicado = require("../../../models/Cursos/contenidoClase/ContenidoVideoPublicado")
const CursoPublicado = require("../../../models/Cursos/curso/CursoPublicado")
const Respuesta = require("../../../models/Respuesta")

const controller = {}

controller.darMeGusta = async (req = request, res = response) => {
    
    try {
        const { datos, body, params } = req
        const { uidSolicitante, datosAuthSolicitante } = datos
        const { uidCurso } = params
        const { meGusta } = body

        const respuesta = new Respuesta()
        let estado = 'exito'
        
        // Dar MG
        await CursoPublicado.darMeGusta(uidSolicitante, uidCurso, meGusta)
        const mensaje = meGusta ? '¡Haz dado un me gusta a este blog!' : 'Haz indicado que no te gusta este blog.'
        
        // Retornar respuesta
        respuesta.setRespuesta({
            estado: 200,
            mensaje: 'exito',
            resultado: null
        })
        
        return res.status( respuesta.estado ).json( respuesta.getRespuesta() )

    } catch (error) {
        console.log('Error - darMeGusta: ', error)

        const respuesta = manejadorErrores( error )
        return res.status( respuesta.estado ).json( respuesta.getRespuesta() )
    }

}



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