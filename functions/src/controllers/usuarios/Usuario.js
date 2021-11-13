const admin = require('../../../firebase-service')
const db = require('../../../db')
const Usuario = require('../../models/Usuario')
const Respuesta = require('../../models/Respuesta')
const manejadorErrores = require('../../helpers/ManejoErrores')
const ErrorJekuaa = require('../../models/Error/ErroresJekuaa')

const controllerUsuario = {}

controllerUsuario.obtenerMiUsuario = async (req, res) => {
    try {
        const { jekuaaDatos, params } = req
        const { uidSolicitante, datosAuthSolicitante } = jekuaaDatos

        // Obtener datos del usuario
        const datosUsuario = await Usuario.verDatosUsuarioPorUID( params.uid )

        if (params.uid !== uidSolicitante) {
            delete datosUsuario.uid
            delete datosUsuario.jekuaaPremium
            delete datosUsuario.jekuaaRol
            delete datosUsuario.jekuaaPoint
        }

        let codigo = 'jekuaa/exito'
        const respuesta = new Respuesta().setRespuestaPorCodigo(codigo, {
            mensaje: 'Los datos de los usuarios se enviaron de forma exitosa!',
            resultado: datosUsuario
        })
        const status = respuesta.getStatusCode()
        
        return res.status( status ).json( respuesta.getRespuesta() )
        
    } catch ( error ) {
        console.log('Error - obtenerMiUsuario: ', error)

        const {
            status,
            respuesta
        } = manejadorErrores( error )

        return res.status( status ).json( respuesta )

    }
}

controllerUsuario.actualizarMiUsuario = async (req, res) => {
    try {
        const { jekuaaDatos, body } = req
        const { uidSolicitante, datosAuthSolicitante } = jekuaaDatos
        const { datosUsuario, contrasenha } = body
        
        const respuesta = new Respuesta()
        let codigo = 'jekuaa/exito'

        // Actualizar usuario
        if ( datosUsuario ) {
            console.log('Actualizando datos del usuario...')
            await Usuario.actalizarDatosUsuarioPorUID( uidSolicitante, datosUsuario )
        }

        // Actualizacion de contraseña
        if ( contrasenha ) {
            console.log('Actualizando contraseña del usuario...')
        }

        respuesta.setRespuestaPorCodigo( codigo, {
            mensaje: 'El usuario se actualizó de forma exitosa!',
            resultado: datosUsuario
        } )
        const status = respuesta.getStatusCode()
        
        return res.status( status ).json( respuesta.getRespuesta() )
        
    } catch ( error ) {
        console.log('Error - actualizarMiUsuario: ', error)

        const {
            status,
            respuesta
        } = manejadorErrores( error )

        return res.status( status ).json( respuesta )
    }
}

controllerUsuario.actualizarMiInformacion = async (req, res) => {
    try {
        const { jekuaaDatos, body } = req
        const { uidSolicitante, datosAuthSolicitante } = jekuaaDatos
        const { datosActualizados } = body
        
        const respuesta = new Respuesta()
        let codigo = 'jekuaa/exito'

        // Actualizar usuario
        const actualizacion = await Usuario.actualizarInformacion(uidSolicitante, datosActualizados)

        respuesta.setRespuestaPorCodigo(codigo, {
            mensaje: '¡La información del usuario se actualizó de forma exitosa!',
            resultado: actualizacion
        })
        const status = respuesta.getStatusCode()
        
        return res.status( status ).json( respuesta.getRespuesta() )
        
    } catch ( error ) {
        console.log('Error - actualizarMiInformacion: ', error)

        const {
            status,
            respuesta
        } = manejadorErrores( error )

        return res.status( status ).json( respuesta )
    }
}

controllerUsuario.eliminarMiUsuario = async (req, res) => {
    try {
        const { jekuaaDatos } = req
        const { uidSolicitante, datosAuthSolicitante } = jekuaaDatos

        const respuesta = new Respuesta()
        let codigo = 'jekuaa/exito'

        const resultado = await Usuario.eliminarUsuarioPorUID( uidSolicitante )

        respuesta.setRespuestaPorCodigo(codigo, {
            mensaje: 'Te has eliminado de forma correcta.',
            resultado
        })
        const status = respuesta.getStatusCode()
        
        return res.status( status ).json( respuesta.getRespuesta() )
    } catch ( error ) {
        console.log('Error - eliminarMiUsuario: ', error)

        const {
            status,
            respuesta
        } = manejadorErrores( error )

        return res.status( status ).json( respuesta )
    }
}

module.exports = controllerUsuario