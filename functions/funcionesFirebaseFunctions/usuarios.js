const functions = require('firebase-functions')
const Usuario = require('../src/models/Usuario')
const ffUsuarios = {}

ffUsuarios.registrarUsuarioPorCorreoYContrasenha = functions.https.onCall(async (data, context) => {

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

        const uidUsuario = await Usuario.crearNuevoUsuarioSoloConDatosPersonales({
            correo: correo,
            nombreUsuario: nombreUsuario,
            nombreCompleto: nombreCompleto,
        }, contrasenha)

        const usuario = new Usuario()
        usuario.setUID(uidUsuario)
        usuario.setNombreUsuario(nombreUsuario)
        usuario.setCorreo(correo)
        usuario.setNombreCompleto(nombreCompleto)
        
        return {
            codigo: 'Exito',
            mensaje: 'Registro de usuario completado con éxito.',
            resultado: usuario
        }

    } catch (error) {
        return {
            codigo: 'Error-Sistema',
            mensaje: 'Hubo un problema en el registro de un usuario.',
            resultado: error
        }
    }

}) 

module.exports = ffUsuarios