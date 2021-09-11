const admin = require('../../firebase-service')
const db = require('../../db')
const formatos = {}

formatos.fechaString_a_fechaDate = ( fechaString ) => {
    if ( !fechaString ) {
        return null
    }

    let fechaDate = new Date ( fechaString )

    return fechaDate
}

formatos.date_a_timestamp = ( fechaDate ) => {
    if ( !fechaDate ) {
        return null
    }

    let fechaTimestamp = admin.firestore.Timestamp.fromDate ( fechaDate )

    return fechaTimestamp
}

formatos.milliseconds_a_timestamp = ( milliseconds ) => {
    if ( !milliseconds ) {
        return null
    }

    let timestamp = admin.firestore.Timestamp.fromMillis ( milliseconds )

    return timestamp
}

formatos.usuario_milliseconds_a_timestamp = ( datosUsuario ) => {

    const datosUsuarioParseado = JSON.parse( JSON.stringify( datosUsuario ) )

    if ( datosUsuario.fechaNacimiento ) {
        datosUsuarioParseado.fechaNacimiento = formatos.milliseconds_a_timestamp( datosUsuario.fechaNacimiento )
    }

    if ( datosUsuario.jekuaaPremium ) {
        if ( datosUsuario.jekuaaPremium.fechaCompra ) {
            datosUsuarioParseado.jekuaaPremium.fechaCompra = formatos.milliseconds_a_timestamp( datosUsuario.jekuaaPremium.fechaCompra )
        }

        if ( datosUsuario.jekuaaPremium.fechaHasta ) {
            datosUsuarioParseado.jekuaaPremium.fechaHasta = formatos.milliseconds_a_timestamp( datosUsuario.jekuaaPremium.fechaHasta )
        }
    }

    return datosUsuarioParseado
}

module.exports = formatos