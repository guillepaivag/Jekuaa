const manejadorErrores = require("../../helpers/ManejoErrores")
const Respuesta = require("../../models/Respuesta")
const fs = require('fs')
const MiembroJekuaa = require("../../models/ComponentesUsuario/TiposUsuarios/MiembroJekuaa")

const controller = {}

controller.obtenerCurso = async (req, res) => {
    try {
        const { jekuaaDatos, body } = req
        const { datosBlog, nombreBlogTemp, rutaArchivoTemp } = body

        const respuesta = new Respuesta()
        let codigo = 'jekuaa/exito'

        // Retornar respuesta
        respuesta.setRespuestaPorCodigo(codigo, {
            mensaje: '¡Se asignó el curso exitosamente!',
            resultado: blogRespuesta.getBlog()
        })
        const status = respuesta.getStatusCode()
        
        return res.status( status ).json( respuesta.getRespuesta() )
    } catch (error) {
        console.log('Error - obtenerCurso: ', error)

        const {
            status,
            respuesta
        } = manejadorErrores( error )

        return res.status( status ).json( respuesta )
    }
}

module.exports = controller