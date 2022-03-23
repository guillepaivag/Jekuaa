const { request, response } = require("express")
const manejadorErrores = require("../../../helpers/ManejoErrores")
const Respuesta = require("../../../models/Respuesta")
const Miembro = require("../../../models/Usuarios/TiposUsuarios/Miembro")

const controller = {}

controller.asignarFuncionesMiembro = async (req = request, res = response) => {
    try {
        const { datos, body, params } = req
        const { uidSolicitante, datosAuthSolicitante } = datos
        const { funciones } = body

        const respuesta = new Respuesta()
        let codigo = 'exito'

        await Miembro.actualizarMiembro(params.uidUsuario, {
            funciones: funciones
        })

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