const { request, response } = require("express")

const Respuesta = require("../../../models/Respuesta")
const Authentication = require("../../../models/Usuarios/Authentication")
const Usuario = require("../../../models/Usuarios/Usuario")
const manejadorErrores = require('../../../helpers/manejoErrores')
const Moderador = require("../../../models/Usuarios/TiposUsuarios/Moderador")

const controllers = {}

controllers.actualizarRol = async (req = request, res = response) => {
    
    try {
        const { datos, body, params } = req
        const { uidSolicitante, datosAuthSolicitante, userRecord } = datos
        const { uidUsuario } = params
        const { rolNuevo } = body
        
        const respuesta = new Respuesta()
        let estado = 'exito'

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
        respuesta.setRespuesta({
            estado: 200,
            mensaje: 'exito',
            resultado: {
                uidUsuario,
                rolNuevo
            }
        })
        
        return res.status( respuesta.estado ).json( respuesta.getRespuesta() )

    } catch (error) {
        console.log('Error - actualizarRol: ', error)

        const respuesta = manejadorErrores( error )
        return res.status( respuesta.estado ).json( respuesta.getRespuesta() )
    }

}

controllers.asignarFuncionesModerador = async (req = request, res = response) => {
    try {
        const { datos, body, params } = req
        const { uidSolicitante, datosAuthSolicitante } = datos
        const { funciones } = body

        const respuesta = new Respuesta()
        let estado = 'exito'

        await Moderador.actualizarModerador(params.uidUsuario, {
            funciones: funciones
        })

        // Retornar respuesta
        respuesta.setRespuesta({
            estado: 200,
            mensaje: 'exito',
            resultado: null
        })
        
        return res.status( respuesta.estado ).json( respuesta.getRespuesta() )
        
    } catch (error) {
        console.log('Error - asignarFuncionesModerador: ', error)

        const respuesta = manejadorErrores( error )
        return res.status( respuesta.estado ).json( respuesta.getRespuesta() )
    }
}

module.exports = controllers