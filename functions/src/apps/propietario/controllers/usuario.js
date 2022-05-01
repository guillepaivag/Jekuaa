const { request, response } = require("express")

const Respuesta = require("../../../models/Respuesta")
const manejadorErrores = require('../../../helpers/ManejoErrores')
const ContenidoClasePublicado = require('../../../models/Cursos/contenidoClase/ContenidoClasePublicado')
const Authentication = require("../../../models/Usuarios/Authentication")
const Usuario = require("../../../models/Usuarios/Usuario")

const controller = {}

controller.actualizarRol = async (req = request, res = response) => {
    
    try {
        const { datos, body, params } = req
        const { uidSolicitante, datosAuthSolicitante, userRecord } = datos
        const { uidUsuario } = params
        const { rolNuevo } = body
        
        const respuesta = new Respuesta()
        let codigo = 'exito'

        const auth = new Authentication(uidUsuario)
        
        auth.actualizar({
            claims: {
                rol: rolNuevo,
                plan: userRecord.customClaims.plan
            }
        })

        Usuario.actalizarUsuarioPorUID(uidUsuario, {
            rol: rolNuevo
        })
        
        // Retornar respuesta
        respuesta.setRespuestaPorCodigo(codigo, {
            mensaje: '¡Se actualizó el rol del usuario!',
            resultado: {
                uidUsuario,
                rolNuevo
            }
        })
        const status = respuesta.getStatusCode()
        
        return res.status( status ).json( respuesta.getRespuesta() )
    } catch (error) {
        console.log('Error - actualizarRol: ', error)

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