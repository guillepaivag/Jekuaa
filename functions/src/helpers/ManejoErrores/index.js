const Respuesta = require("../../models/Respuesta");
const ErrorJekuaa = require("../../models/Error/ErroresJekuaa");
const manejadorErroresFirebaseAuth = require("./FirebaseAuth");

function manejadorErrores ( error ) {

    let status = 500
    let respuesta = new Respuesta()

    // Errores de Jekuaa 
    if ( error instanceof ErrorJekuaa ) {

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
        const errorJekuaa = new ErrorJekuaa({
            codigo: 'jekuaa/error/usuario_mala_solicitud'
        })

        status = errorJekuaa.status
        respuesta.setRespuesta({
            codigo: errorJekuaa.codigo,
            mensaje: error.message,
            resultado: error
        })

    } else if ( error instanceof RangeError ) {
        // sentencias para manejar excepciones RangeError
    
    } else if ( error instanceof EvalError ) {
        // sentencias para manejar excepciones EvalError
    
    }

    // Manejador de errores de Express Validators
    if (error instanceof Error && error.errors instanceof Array && error.errors.length && error.errors[0].msg instanceof ErrorJekuaa) {
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
    }

    if ( !respuesta.codigo ) {
        respuesta.setRespuestaPorCodigo('jekuaa/error/sistema')
    }

    return {
        status,
        respuesta
    }
}

module.exports = manejadorErrores