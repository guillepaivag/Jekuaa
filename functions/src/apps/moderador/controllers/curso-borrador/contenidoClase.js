const fs = require('fs')
const { request, response } = require("express")

const Respuesta = require("../../../../models/Respuesta")
const manejadorErrores = require('../../../../helpers/ManejoErrores')
const Errores = require('../../../../models/Error/Errores')
const ContenidoClaseBorrador = require('../../../../models/Cursos/contenidoClase/ContenidoClaseBorrador')

const controller = {}

controller.obtenerUrlVideoClaseBorrador = async (req = request, res = response) => {
    
    try {
        const { datos, body, params } = req
        const { uidSolicitante, datosAuthSolicitante } = datos
        const { uidCurso, uidClase } = params

        const respuesta = new Respuesta()
        let codigo = 'exito'
        
        const url = await ContenidoClaseBorrador.generarUrlVideoClase({
            verificacion: false,
            uidCurso: uidCurso,
            uidClase: uidClase
        })

        // Retornar respuesta
        respuesta.setRespuestaPorCodigo(codigo, {
            mensaje: '¡Se generó la url del video!',
            resultado: url
        })
        const status = respuesta.getStatusCode()
        
        return res.status( status ).json( respuesta.getRespuesta() )
    } catch (error) {
        console.log('Error - obtenerUrlVideoClaseBorrador: ', error)

        const {
            status,
            respuesta
        } = manejadorErrores( error )

        return res.status( status ).json( respuesta )
    }

}




controller.obtenerArticuloClaseBorrador = async (req = request, res = response) => {

    try {
        const { datos, body, params } = req
        const { uidSolicitante, datosAuthSolicitante } = datos
        const { uidCurso, uidClase } = params

        const respuesta = new Respuesta()
        let codigo = 'exito'
        
        const articulo = await ContenidoClaseBorrador.obtenerArticuloClase({
            verificacion: false,
            uidCurso: uidCurso,
            uidClase: uidClase,
            getMarkdown: false
        })

        // Retornar respuesta
        respuesta.setRespuestaPorCodigo(codigo, {
            mensaje: '¡Se generó el articulo de la clase!',
            resultado: articulo
        })
        const status = respuesta.getStatusCode()
        
        return res.status( status ).json( respuesta.getRespuesta() )
    } catch (error) {
        console.log('Error - obtenerUrlVideoClaseBorrador: ', error)

        const {
            status,
            respuesta
        } = manejadorErrores( error )

        return res.status( status ).json( respuesta )
    }

}

module.exports = controller