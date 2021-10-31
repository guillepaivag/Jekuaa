const admin = require('../../../firebase-service')
const db = require('../../../db')
const Usuario = require('../../models/Usuario')
const timestamp = require('../../utils/Timestamp')
const Respuesta = require('../../models/Respuesta')
const manejadorErrores = require('../../helpers/ManejoErrores')
const ErrorJekuaa = require('../../models/Error/ErroresJekuaa')

const controllerMiembroJekuaa = {}

controllerMiembroJekuaa.verDatosUsuarioPorUID = async (req, res) => {

    try {
        const { jekuaaDatos, params } = req
        const { uidSolicitante } = jekuaaDatos
        const { uid } = params

        // Obtener datos del usuario
        const datosUsuario = await Usuario.verDatosUsuarioPorUID( uid )

        let codigo = 'jekuaa/exito'
        const respuesta = new Respuesta().setRespuestaPorCodigo( codigo, {
            mensaje: 'Los datos de los usuarios se enviaron de forma exitosa!',
            resultado: datosUsuario
        } )
        const status = respuesta.getStatusCode()
        
        return res.status( status ).json( respuesta.getRespuesta() )
        
    } catch ( error ) {
        console.log('Error - verUsuarioPorUID: ', error)

        const {
            status,
            respuesta
        } = manejadorErrores( error )

        return res.status( status ).json( respuesta )

    }

}

controllerMiembroJekuaa.verDatosAuthPorUID = async (req, res) => {

    try {

        const { jekuaaDatos, params } = req
        const { uidSolicitante, datosAuthSolicitante } = jekuaaDatos
        const { uid } = params
        
        const respuesta = new Respuesta()
        let codigo = 'jekuaa/exito'

        // Si queremos ver nuestros propios datos, retornamos el datosAuthSolicitante
        if ( uidSolicitante === uid ) {
            
            respuesta.setRespuestaPorCodigo( codigo, {
                mensaje: 'Los datos de los usuarios se enviaron de forma exitosa!',
                resultado: datosAuthSolicitante
            } )
            const status = respuesta.getStatusCode()
            
            return res.status( status ).json( respuesta.getRespuesta() )

        }

        // Obtener datos del usuario
        const datosAuth = await Usuario.verDatosAuthPorUID( uid )

        respuesta.setRespuestaPorCodigo( codigo, {
            mensaje: 'Los datos de los usuarios se enviaron de forma exitosa!',
            resultado: datosAuth
        } )
        const status = respuesta.getStatusCode()
        
        return res.status( status ).json( respuesta.getRespuesta() )
        
    } catch ( error ) {
        console.log('Error - verUsuarioPorUID: ', error)

        const {
            status,
            respuesta
        } = manejadorErrores( error )

        return res.status( status ).json( respuesta )

    }

}

controllerMiembroJekuaa.crearUsuario = async (req, res) => {

    try {
        const { jekuaaDatos, body } = req
        const { datosUsuario, contrasenha } = body
        const { uidSolicitante, datosAuthSolicitante } = jekuaaDatos

        // Crear usuario
        const datosUsuarioNuevo = await Usuario.crearNuevoUsuario( datosUsuario, contrasenha )

        const respuesta = new Respuesta()
        let codigo = 'jekuaa/exito'

        respuesta.setRespuestaPorCodigo(codigo, {
            mensaje: 'El usuario se creo de forma exitosa!',
            resultado: datosUsuarioNuevo
        })
        const status = respuesta.getStatusCode()
        
        return res.status( status ).json( respuesta.getRespuesta() )
        
    } catch ( error ) {
        console.log('Error - crearUsuario: ', error)

        const {
            status,
            respuesta
        } = manejadorErrores( error )

        return res.status( status ).json( respuesta )
    }

}

controllerMiembroJekuaa.actualizarUsuarioPorUID = async (req, res) => {

    try {
        const { jekuaaDatos, params, body } = req
        const { uidSolicitante, datosAuthSolicitante } = jekuaaDatos
        const { datosUsuario, contrasenha } = body
        const { uid } = params
        
        const respuesta = new Respuesta()
        let codigo = 'jekuaa/exito'

        // Actualizar usuario
        if ( datosUsuario ) {
            console.log('Actualizando datos del usuario...')
            await Usuario.actalizarDatosUsuarioPorUID( uid, datosUsuario )
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
        console.log('Error - actualizarUsuarioPorUID: ', error)

        const {
            status,
            respuesta
        } = manejadorErrores( error )

        return res.status( status ).json( respuesta )
    }

}

controllerMiembroJekuaa.habilitarUsuarioPorUID = async (req, res) => {

    try {
        const { jekuaaDatos, params, body } = req
        const { uidSolicitante, datosAuthSolicitante } = jekuaaDatos
        const { uid } = params
        const { habilitar } = body

        // Obtener auth del solicitante y del usuario a actualizar
        const datosAuth = await admin.auth().getUser( uid )
        
        const respuesta = new Respuesta()
        let codigo = 'jekuaa/exito'

        if ( datosAuth.disabled === !habilitar ) {
            
            let habilitarText = habilitar ? 'habilitar' : 'deshabilitar'
            let habilitadoText = habilitar ? 'habilitado' : 'deshabilitado'
            
            codigo = 'jekuaa/error/usuario_mala_solicitud'
            respuesta.setRespuestaPorCodigo(codigo, {
                mensaje: `No puedes ${habilitarText} si ya esta ${habilitadoText}.`,
            })
            const status = respuesta.getStatusCode()
            
            return res.status( status ).json( respuesta.getRespuesta() )

        }

        const resultado = await Usuario.habilitarUsuarioPorUID( uid, habilitar )
        let mensaje = habilitar ? `El usuario se habilito de forma exitosa.` : `El usuario se deshabilito de forma exitosa.`

        respuesta.setRespuestaPorCodigo( codigo, {
            mensaje,
            resultado
        } )
        const status = respuesta.getStatusCode()
        
        return res.status( status ).json( respuesta.getRespuesta() )

    } catch ( error ) {
        console.log('Error - habilitarUsuarioPorUID: ', error)

        const {
            status,
            respuesta
        } = manejadorErrores( error )

        return res.status( status ).json( respuesta )

    }

}

controllerMiembroJekuaa.eliminarUsuarioPorUID = async (req, res) => {
    
    try {
        
        const { params, body, jekuaaDatos } = req
        const { uid } = params
        const { uidSolicitante, datosAuthSolicitante } = jekuaaDatos

        const respuesta = new Respuesta()
        let codigo = 'jekuaa/exito'

        const resultado = await Usuario.eliminarUsuarioPorUID( uid )

        let mensaje = uidSolicitante === uid ? 'Te has eliminado de forma correcta.' : `Se ha eliminado el usuario ${uid}`

        respuesta.setRespuestaPorCodigo( codigo, {
            mensaje,
            resultado
        } )
        const status = respuesta.getStatusCode()
        
        return res.status( status ).json( respuesta.getRespuesta() )
    } catch ( error ) {
        console.log('Error - eliminarUsuarioPorUID: ', error)

        const {
            status,
            respuesta
        } = manejadorErrores( error )

        return res.status( status ).json( respuesta )
    }

}

module.exports = controllerMiembroJekuaa