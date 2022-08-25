const Respuesta = require("../../models/Respuesta")

const igualClave = ( estado, estatico ) => {
    return estado === estatico
}

const manejadorErroresFirebaseAuth = ( error ) => {

    const { code } = error

    let respuesta = new Respuesta()

    respuesta.setRespuesta({
        estado: 400,
        mensaje: code,
        resultado: null
    })
    
    if ( igualClave( code, 'auth/id-token-expired' ) ) respuesta.setClave(401)

    return respuesta
}

module.exports = manejadorErroresFirebaseAuth