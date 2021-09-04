const functions = require('firebase-functions')
const Invitado = require('../src/models/TiposUsuarios/Invitado')
const ffUsuarios = {}

ffUsuarios.registrarUsuarioPorCorreoYContrasenha = functions.https.onCall(async (data, context) => {

    try {
        if ( context.auth && context.auth.token ) {    
            return
        }
    
        const {
            correo,
            contrasenha,
            nombreUsuario,
            nombreCompleto
        } = data
    
        const invitado = new Invitado()
    
        const usuarioNuevo = await invitado.registrarmePorCorreoYContrasenha({
            correo,
            contrasenha,
            nombreUsuario,
            nombreCompleto
        })
    
        if ( !usuarioNuevo ) {
            return {
                codigo: 'Error-Sistema',
                mensaje: 'Hubo un problema al registrar el usuario.',
                resultado: null
            }
        }
        
        return {
            codigo: 'Exito',
            mensaje: 'Registro de usuario completado con éxito.',
            resultado: usuarioNuevo
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