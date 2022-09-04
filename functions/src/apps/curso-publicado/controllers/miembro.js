const { request, response } = require("express")

const Respuesta = require("../../../models/Respuesta")
const manejadorErrores = require('../../../helpers/manejoErrores')
const CursoPublicado = require("../../../models/Cursos/curso/CursoPublicado")
const ContenidoVideoPublicado = require("../../../models/Cursos/contenidoClase/ContenidoVideoPublicado")
const ContenidoArticuloPublicado = require("../../../models/Cursos/contenidoClase/ContenidoArticuloPublicado")
const ContenidoClase = require("../../../models/Cursos/contenidoClase/ContenidoClase")
const ContenidoYoutubeBorrador = require("../../../models/Cursos/contenidoClase/contenidoYoutube/ContenidoYoutubeBorrador")

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



controller.obtenerVideoYoutubeClase = async (req = request, res = response) => {

    try {
        const { datos, body, params } = req
        const { uidSolicitante, datosAuthSolicitante } = datos
        const { uidCurso, uidClase } = params

        const respuesta = new Respuesta()

        const result = await ContenidoClase.obtenerDocumentoBorrador(uidCurso, uidClase)
        const contenidoYoutubeBorrador = new ContenidoYoutubeBorrador(result.contenidoClase)

        // Retornar respuesta
        respuesta.setRespuesta({
            estado: 200,
            mensaje: 'exito',
            resultado: {
                codigoVideoYoutube: contenidoYoutubeBorrador.codigoVideoYoutube,
                duracion: contenidoYoutubeBorrador.duracion
            }
        })
        
        return res.status( respuesta.estado ).json( respuesta.getRespuesta() )
    } catch (error) {
        console.log('Error - obtenerVideoYoutubeClase: ', error)

        const respuesta = manejadorErrores( error )
        return res.status( respuesta.estado ).json( respuesta.getRespuesta() )
    }

}




controller.publicarCurso = async (req = request, res = response) => {
    
    try {
        const { datos, body, params } = req
        const { uidSolicitante, datosAuthSolicitante } = datos
        const { uidCurso } = params
        const { publicado } = body

        const respuesta = new Respuesta()
        let estado = 'exito'
        
        CursoPublicado.actualizarCurso(uidCurso, { publicado })
        const mensaje = publicado ? '¡Se publicó el curso!' : '¡Se despublicó el curso!'

        // Retornar respuesta
        respuesta.setRespuesta({
            estado: 200,
            mensaje: 'exito',
            resultado: null
        })
        
        return res.status( respuesta.estado ).json( respuesta.getRespuesta() )
    } catch (error) {
        console.log('Error - publicarCurso: ', error)

        const respuesta = manejadorErrores( error )
        return res.status( respuesta.estado ).json( respuesta.getRespuesta() )
    }

}




module.exports = controller