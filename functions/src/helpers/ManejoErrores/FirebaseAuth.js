const Errores = require("../../models/Error/Errores")
const Respuesta = require("../../models/Respuesta")

const manejadorErroresFirebaseAuth = ( error ) => {

    const { code } = error

    let status = 500
    let respuesta = new Respuesta()


    if ( igualCodigo( code, 'auth/invalid-uid' ) ) {
        /* 
         * Al realizar una acción con uid, y la 
         * uid no es valida, retornar error.
         */
        const error = new Errores({
            codigo: 'error/usuario_mala_solicitud'
        })

        status = error.status
        respuesta.setRespuesta({
            codigo: error.codigo,
            mensaje: 'La uid no es válida.',
            resultado: error
        })


    } else if ( igualCodigo( code, 'auth/uid-already-exists' ) ) {
        /* 
         * Cuando se quiere realizar una acción como
         * por ejemplo, agregar un nuevo usuario
         * y si ya existe se retorna el error de usuario
         * existente.
         */
        const error = new Errores({
            codigo: 'error/usuario_mala_solicitud',
            mensaje: 'Ya existe el usuario.'
        })

        status = error.status
        respuesta.setRespuesta({
            codigo: error.codigo,
            mensaje: 'Ya existe este usuario.',
            resultado: error
        })
        
    } else if ( igualCodigo( code, 'auth/missing-uid' ) ) {
        /* 
         * Cuando se quiere realizar una acción por uid
         * y no existe la uid.
         */
        const error = new Errores({
            codigo: 'error/usuario_mala_solicitud'
        })

        status = error.status
        respuesta.setRespuesta({
            codigo: error.codigo,
            mensaje: 'Se requiere la uid del usuario.',
            resultado: error
        })
        
    } else if ( igualCodigo( code, 'auth/invalid-email' ) ) {
        /* 
         * Al realizar una acción con correo, y el 
         * correo no es valida, retornar error.
         */
        const error = new Errores({
            codigo: 'error/usuario_mala_solicitud',
        })

        status = error.status
        respuesta.setRespuesta({
            codigo: error.codigo,
            mensaje: 'No es válido el correo.',
            resultado: error
        })

    } else if ( igualCodigo( code, 'auth/email-already-exists' ) ) {
        /* 
         * Cuando se quiere realizar una acción como
         * por ejemplo, agregar un nuevo usuario
         * y si ya existe se retorna el error de usuario
         * existente.
         */
        const error = new Errores({
            codigo: 'error/usuario_mala_solicitud',
            mensaje: 'Ya existe el usuario.'
        })

        status = error.status
        respuesta.setRespuesta({
            codigo: error.codigo,
            mensaje: 'Ya existe el usuario.',
            resultado: error
        })

    } else if ( igualCodigo( code, 'auth/invalid-email-verified' ) ) {
        /* 
         * Para insertar un valor de email verificado
         * tiene que ser boolean, sino retornar un 
         * error.
         */
        const error = new Errores({
            codigo: 'error/usuario_mala_solicitud'
        })

        status = error.status
        respuesta.setRespuesta({
            codigo: error.codigo,
            mensaje: 'El correo verificado debe de ser boolean.',
            resultado: error
        })

    } else if ( igualCodigo( code, 'auth/invalid-display-name' ) ) {
        /* 
         * Si el nombre de usuario es invalido, o sea
         * no es un string, se retorna error.
         */
        const error = new Errores({
            codigo: 'error/usuario_mala_solicitud'
        })

        status = error.status
        respuesta.setRespuesta({
            codigo: error.codigo,
            mensaje: 'El nombre de usuario debe de ser de tipo string.',
            resultado: error
        })

    } else if ( igualCodigo( code, 'auth/invalid-claims' ) ) {
        
    } else if ( igualCodigo( code, 'auth/claims-too-large' ) ) {
        
    } else if ( igualCodigo( code, 'auth/reserved-claims' ) ) {
        
    } else if ( igualCodigo( code, 'auth/invalid-photo-url' ) ) {
        
    } else if ( igualCodigo( code, 'auth/invalid-disabled-field' ) ) {
        /* 
         * El campo disabled debe de ser válido, debe
         * de ser boolean.
         */
        const error = new Errores({
            codigo: 'error/usuario_mala_solicitud'
        })

        status = error.status
        respuesta.setRespuesta({
            codigo: error.codigo,
            mensaje: 'El campo disabled (deshabilitado) debe de ser valido, debe ser boolean.',
            resultado: error
        })
        
    } else if ( igualCodigo( code, 'auth/invalid-password' ) ) {
        /* 
         * Si la contraseña no es valida (ej: menos de 
         * 6 caracteres), retornar error.
         */
        const error = new Errores({
            codigo: 'error/usuario_mala_solicitud'
        })

        status = error.status
        respuesta.setRespuesta({
            codigo: error.codigo,
            mensaje: 'La contraseña debe ser válida, al menos 6 caracteres.',
            resultado: error
        })
        
    } else if ( igualCodigo( code, 'auth/invalid-password-hash' ) ) {
        
    } else if ( igualCodigo( code, 'auth/invalid-password-salt' ) ) {
        
    } else if ( igualCodigo( code, 'auth/invalid-id-token' ) ) {
        /* 
         * El token del usuario es invalido y no puede 
         * realizar la acción, entonces, retornar
         * error.
         */
        const error = new Errores({
            codigo: 'error/usuario_mala_solicitud'
        })

        status = error.status
        respuesta.setRespuesta({
            codigo: error.codigo,
            mensaje: 'El token no es válido.',
            resultado: error
        })
        
    } else if ( igualCodigo( code, 'auth/id-token-expired' ) ) {
        /* 
         * El token del usuario expiro y no puede 
         * realizar la acción, entonces, retornar
         * error.
         */
        const error = new Errores({
            codigo: 'error/usuario_no_autorizado',
            mensaje: 'El token del usuario expiro, vuelva a cargar.'
        })

        status = error.status
        respuesta.setRespuesta({
            codigo: error.codigo,
            mensaje: error.mensaje,
            resultado: error
        })

    } else if ( igualCodigo( code, 'auth/id-token-revoked' ) ) {
        
    } else if ( igualCodigo( code, 'auth/invalid-credential' ) ) {
        
    } else if ( igualCodigo( code, 'auth/invalid-session-cookie-duration' ) ) {
        
    } else if ( igualCodigo( code, 'auth/session-cookie-expired' ) ) {
        
    } else if ( igualCodigo( code, 'auth/session-cookie-revoked' ) ) {
        
    } else if ( igualCodigo( code, 'auth/project-not-found' ) ) {
        
    } else if ( igualCodigo( code, 'auth/insufficient-permission' ) ) {
        
    } else if ( igualCodigo( code, 'auth/internal-error' ) ) {
        
    } else if ( igualCodigo( code, 'auth/argument-error' ) ) {
        /* 
         *  En la solicitud el token no es valido,
         *  cuando se verifica (ej: se require que
         *  se inicie sesión.)
         */

        const error = new Errores({
            codigo: 'error/usuario_no_autenticado'
        })

        status = error.status
        respuesta.setRespuesta({
            codigo: error.codigo,
            mensaje: error.mensaje,
            resultado: error
        })
        
    } else if ( igualCodigo( code, 'auth/invalid-argument' ) ) {
        
    } else if ( igualCodigo( code, 'auth/user-not-found' ) ) {
        /* 
         *  No existe ningún registro de usuario 
         *  que corresponda al identificador proporcionado.
         */

        const error = new Errores({
            codigo: 'error/usuario_mala_solicitud',
            mensaje: 'No existe el usuario'
        })

        status = error.status
        respuesta.setRespuesta({
            codigo: error.codigo,
            mensaje: error.mensaje,
            resultado: error
        })

    } else {
        const error = new Errores({
            codigo: 'error/sistema'
        })

        status = error.status
        respuesta.setRespuesta({
            codigo: error.codigo,
            mensaje: error.mensaje,
            resultado: error
        })
        
    }

    return {
        status,
        respuesta
    }
}


const igualCodigo = ( codigo, estatico ) => {
    return codigo === estatico
}

module.exports = manejadorErroresFirebaseAuth