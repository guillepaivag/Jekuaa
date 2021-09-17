const Respuesta = require("../../Respuesta");
const ErrorJekuaa = require("../ErroresJekuaa");
const manejadorErroresFirebaseAuth = require("./ManejadorErroresFirebaseAuth");

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

    if ( !respuesta.codigo ) {
        respuesta.setRespuestaPorCodigo('jekuaa/error/sistema')
    }

    return {
        status,
        respuesta
    }
}

module.exports = manejadorErrores