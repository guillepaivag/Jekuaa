const Respuesta = require("../../models/Respuesta");
const Errores = require("../../models/Error/Errores");
const manejadorErroresFirebaseAuth = require("./FirebaseAuth");

function manejadorErrores ( error ) {

    let respuesta = new Respuesta()

    if ( error instanceof Error ) {

        if (error instanceof Errores) {
            // Modelo Errores
            respuesta.setRespuesta({
                estado: error.estado,
                mensaje: error.mensajeCliente,
                resultado: error.resultado
            })

        } else if ( error instanceof TypeError ) {
            // sentencias para manejar excepciones TypeError
            respuesta.setRespuesta({
                estado: 400,
                mensaje: 'type_error',
                resultado: null
            })
    
        } else {
            // Manejador de errores de Express Validators
            if ( error && error.errors instanceof Array && error.errors.length && error.errors[0].msg instanceof Errores ) {
                const customError = error.errors[0].msg

                respuesta.setRespuesta({
                    estado: customError.estado,
                    mensaje: customError.mensajeCliente,
                    resultado: customError.resultado
                })
            }
        }
    }

    // Errores de Firebase Authentication
    else if ( error && error.code && error.code.includes('auth/') ) {
        respuesta = manejadorErroresFirebaseAuth( error )
    }

    if ( !respuesta.estado ) {
        respuesta.setRespuesta({
            estado: 500,
            mensaje: '',
            resultado: null,
        })
    }

    return respuesta
}

module.exports = manejadorErrores