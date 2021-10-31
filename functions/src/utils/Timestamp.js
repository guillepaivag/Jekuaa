const admin = require('../../firebase-service')
const db = require('../../db')
const timestamp = {}

timestamp.milliseconds_a_timestamp = ( milliseconds = Date.now() ) => {
    if ( !milliseconds ) {
        return null
    }

    let timestamp = admin.firestore.Timestamp.fromMillis ( milliseconds )

    return timestamp
}

timestamp.usuario_milliseconds_a_timestamp = ( datosUsuario ) => {

    const datosUsuarioParseado = JSON.parse( JSON.stringify( datosUsuario ) )

    if ( datosUsuario.fechaNacimiento ) {
        datosUsuarioParseado.fechaNacimiento = timestamp.milliseconds_a_timestamp( datosUsuario.fechaNacimiento )
    }

    if ( datosUsuario.jekuaaPremium ) {
        if ( datosUsuario.jekuaaPremium.fechaCompra ) {
            datosUsuarioParseado.jekuaaPremium.fechaCompra = timestamp.milliseconds_a_timestamp( datosUsuario.jekuaaPremium.fechaCompra )
        }

        if ( datosUsuario.jekuaaPremium.fechaHasta ) {
            datosUsuarioParseado.jekuaaPremium.fechaHasta = timestamp.milliseconds_a_timestamp( datosUsuario.jekuaaPremium.fechaHasta )
        }
    }

    return datosUsuarioParseado
}

module.exports = timestamp