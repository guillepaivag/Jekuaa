const functions = require('firebase-functions')
const Respuesta = require('../src/models/Respuesta')
const Usuario = require('../src/models/Usuario')
const manejadorErrores = require('../src/models/Error/ManejoErrores/ManejadorErrores')
const ffUsuarios = {}

ffUsuarios.registrarUsuarioPorCorreoYContrasenha = functions.https.onCall( async (data, context) => {

    try {

        if ( context && context.auth && context.auth.token ) {    
            return
        }
    
        const {
            correo,
            contrasenha,
            nombreUsuario,
            nombreCompleto
        } = data

        const uidUsuario = await Usuario.crearNuevoUsuarioEstudiante({
            correo: correo,
            nombreUsuario: nombreUsuario,
            nombreCompleto: nombreCompleto,
        }, contrasenha)

        const usuario = new Usuario()
        usuario.setUID(uidUsuario)
        usuario.setNombreUsuario(nombreUsuario)
        usuario.setCorreo(correo)
        usuario.setNombreCompleto(nombreCompleto)
        
        const respuesta = new Respuesta()
        let codigo = 'jekuaa/exito'
        respuesta.setRespuestaPorCodigo( codigo, {
            mensaje: 'Se a creado el usuario de forma correcta.',
            resultado: usuario
        } )

        console.log('respuesta', respuesta)
        
        return {
            status: respuesta.getStatusCode(),
            respuesta: respuesta.getRespuesta()
        }

    } catch (error) {

        console.log('error', error)

        const {
            status,
            respuesta
        } = manejadorErrores( error )

        return {
            status,
            respuesta
        }

    }

}) 

module.exports = ffUsuarios