const Respuesta = require("../models/Respuesta");
const ErrorJekuaa = require("../models/Error/ErroresJekuaa");
const manejadorErroresFirebaseAuth = require("./ManejadorErroresFirebaseAuth");

function manejadorErrores ( error ) {

    let status = 500
    let respuesta = new Respuesta()

    // Errores de Jekuaa 
    if ( error instanceof ErrorJekuaa ) {
        
        /* 
         *  jekuaa/error/usuario_mala_solicitud: 
         *  Cuando el usuario quiere realizar alguna acción y no tiene el rol con los permisos.
         */

        /* 
         *  jekuaa/error/usuario_no_autenticado: 
         *  Cuando el usuario intenta realizar una acción pero no inicio sesión.
         */

        /* 
         *  jekuaa/error/usuario_deshabilitado: 
         *  Cuando el usuario intenta realizar una acción pero se encuentra deshabilitado.
         */


        /* 
         *  jekuaa/error/usuario_no_autorizado: 
         *  Cuando el usuario quiere realizar alguna acción y no tiene el rol con los permisos.
         */


        /* 
         *  jekuaa/error/sistema: 
         *  Cuando hay un error en el sistema.
         */

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
    if ( error instanceof TypeError) {
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

    } else if ( error instanceof RangeError) {
        // sentencias para manejar excepciones RangeError
    
    } else if ( error instanceof EvalError) {
        // sentencias para manejar excepciones EvalError
    
    }

    return {
        status,
        respuesta
    }
}

module.exports = manejadorErrores