const Respuesta = require("../../models/Respuesta");
const Errores = require("../../models/Error/Errores");
const manejadorErroresFirebaseAuth = require("./FirebaseAuth");

function manejadorErrores ( error ) {

    let status = 500
    let respuesta = new Respuesta()

    // Errores de Jekuaapy
    if ( error instanceof Errores ) {

        status = error.status
        respuesta.setRespuesta({
            codigo: error.codigo,
            mensaje: error.mensaje,
            resultado: error.resultado
        })

    }

    // Errores de Firebase Authentication
    if ( error && error.code && error.code.includes('auth/') ) {
        
        let errorManejado = manejadorErroresFirebaseAuth( error )
        
        status = errorManejado.status
        respuesta = errorManejado.respuesta

    }

    // Errores comunes
    if ( error instanceof TypeError ) {
        // sentencias para manejar excepciones TypeError
        const error = new Errores({
            codigo: 'error/usuario_mala_solicitud'
        })

        status = error.status
        respuesta.setRespuesta({
            codigo: error.codigo,
            mensaje: error.message,
            resultado: error
        })

    } else if ( error instanceof RangeError ) {
        // sentencias para manejar excepciones RangeError
    
    } else if ( error instanceof EvalError ) {
        // sentencias para manejar excepciones EvalError
    
    }

    
    if ( error instanceof Error ) {
        
        // Manejador de errores de Express Validators
        if ( error.errors instanceof Array && error.errors.length && error.errors[0].msg instanceof Errores ) {
            status = error.errors[0].msg.status
            respuesta.setRespuesta({
                codigo: error.errors[0].msg.codigo,
                mensaje: error.errors[0].msg.mensaje,
                resultado: error.errors[0].msg.resultado
            })

            return {
                status,
                respuesta
            }
        } else {

        }
    }

    if ( !respuesta.codigo ) {
        respuesta.setRespuestaPorCodigo('error/sistema')
    }

    return {
        status,
        respuesta
    }
}

module.exports = manejadorErrores