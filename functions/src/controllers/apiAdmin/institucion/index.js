const { request, response } = require("express")
const Respuesta = require("../../../models/Respuesta")
const db = require('../../../../db')
const manejadorErrores = require("../../../helpers/ManejoErrores")
const Errores = require("../../../models/Error/Errores")
const Institucion = require("../../../models/Institucion")

const controller = {}

controller.crearInstitucion = async (req = request, res = response) => {
    try {
        const { datos, body } = req
        const { uidSolicitante, datosAuthSolicitante } = datos
        const { responsable, referenciaUrl, nombreInstitucion, descripcion, fotoPerfil, } = body

        const respuesta = new Respuesta()
        let codigo = 'exito'

        // Crear objeto Institución
        const institucion = new Institucion({
            responsable, 
            referenciaUrl, 
            nombreInstitucion, 
            descripcion, 
            fotoPerfil,
        })

        // Crear Institución
        await Institucion.crearInstitucion( institucion )

        // Retornar respuesta
        respuesta.setRespuestaPorCodigo(codigo, {
            mensaje: '¡Se creo la institución de forma exitosa!',
            resultado: institucion.getInstitucion()
        })
        const status = respuesta.getStatusCode()
        
        return res.status( status ).json( respuesta.getRespuesta() )

    } catch (error) {
        console.log('Error - crearInstitucion: ', error)

        const {
            status,
            respuesta
        } = manejadorErrores( error )

        return res.status( status ).json( respuesta )
    }
}

module.exports = controller