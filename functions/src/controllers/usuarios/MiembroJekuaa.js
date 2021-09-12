const admin = require('../../../firebase-service')
const db = require('../../../db')
const MiembroJekuaa = require("../../models/TiposUsuarios/MiembroJekuaa")
const utilsRoles = require('../../utils/usuarios/RolesSecciones')
const Usuario = require('../../models/Usuario')
const formatos = require('../../utils/formatos')
const Respuesta = require('../../models/Respuesta')
const manejadorErrores = require('../../models/Error/ManejadorErrores')
const ErrorJekuaa = require('../../models/Error/ErroresJekuaa')

const controllerMiembroJekuaa = {}

controllerMiembroJekuaa.verDatosUsuarioPorUID = async (req, res) => {

    try {

        const { jekuaaDatos, params } = req
        const { uidSolicitante } = jekuaaDatos
        const { uid } = params

        // Obtener datos del usuario
        const datosUsuario = await MiembroJekuaa.verDatosUsuarioPorUID( uid )

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
        const datosAuth = await MiembroJekuaa.verDatosAuthPorUID( uid )

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
        const { uidSolicitante, datosAuthSolicitante } = jekuaaDatos
        const { datosUsuario, contrasenha } = body

        // El solicitante no puede actualizar (crear) un nuevo propietario si no es propietario
        let noPuedeCrearPropietario = datosAuthSolicitante.customClaims.rol != 'propietario' && 
        datosUsuario && datosUsuario.jekuaaRoles && datosUsuario.jekuaaRoles.rol &&
        datosUsuario.jekuaaRoles.rol === 'propietario'
        
        if ( noPuedeCrearPropietario ) {
            //No autorizado
            throw new ErrorJekuaa({
                codigo: 'jekuaa/error/usuario_no_autorizado'
            })
        }

        // Cambiamos el formato del cliente al formato servidor
        const datosUsuarioParseado = formatos.usuario_milliseconds_a_timestamp( datosUsuario )

        // Actualizar usuario
        const usuarioNuevo = await MiembroJekuaa.crearNuevoUsuario( datosUsuarioParseado, contrasenha )

        const respuesta = new Respuesta()
        let codigo = 'jekuaa/exito'

        respuesta.setRespuestaPorCodigo( codigo, {
            mensaje: 'El usuario se creo de forma exitosa!',
            resultado: usuarioNuevo
        } )
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
        const { uid } = params
        const { datosActualizados } = body

        const respuesta = new Respuesta()
        let codigo = 'jekuaa/exito'

        // El solicitante no puede actualizar (crear) un nuevo propietario si no es propietario
        if ( datosAuthSolicitante.customClaims.rol != 'propietario' && 
            datosActualizados && datosActualizados.jekuaaRoles && datosActualizados.jekuaaRoles.rol &&
            datosActualizados.jekuaaRoles.rol === 'propietario') {
            
            //No autorizado
            codigo = 'jekuaa/error/usuario_no_autorizado'

            respuesta.setRespuestaPorCodigo( codigo, {
                mensaje: 'No tienes permiso para agregar un nuevo propietario.',
            } )
            const status = respuesta.getInformacionPorCodigo().status
            
            return res.status( status ).json( respuesta.getRespuesta() )

        }

        // Cambiamos el formato del cliente al formato servidor
        const datosActualizadosParseado = formatos.usuario_milliseconds_a_timestamp( datosActualizados )

        // Actualizar usuario
        const usuarioActualizado = await MiembroJekuaa.actalizarUsuarioPorUID( uid, datosActualizadosParseado )

        respuesta.setRespuestaPorCodigo( codigo, {
            mensaje: 'El usuario se creo de forma exitosa!',
            resultado: usuarioActualizado
        } )
        const status = respuesta.getInformacionPorCodigo().status
        
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
            respuesta.setRespuestaPorCodigo( codigo, {
                mensaje: `No puedes ${habilitarText} si ya esta ${habilitadoText}.`,
            } )
            const status = respuesta.getInformacionPorCodigo().status
            
            return res.status( status ).json( respuesta.getRespuesta() )

        }

        const resultado = await MiembroJekuaa.habilitarUsuarioPorUID( uid, habilitar )
        let mensaje = habilitar ? `El usuario se habilito de forma exitosa.` : `El usuario se deshabilito de forma exitosa.`

        respuesta.setRespuestaPorCodigo( codigo, {
            mensaje,
            resultado
        } )
        const status = respuesta.getInformacionPorCodigo().status
        
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

        

    } catch ( error ) {
        
    }

}

module.exports = controllerMiembroJekuaa