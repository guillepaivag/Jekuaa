const { request, response } = require('express')
const Errores = require('../models/Error/Errores')

const usuarioDeshabilitado = async (req = request, res = response, next) => {
    try {
        const { body, datos, params } = req
        const { datosAuthSolicitante } = datos

        if ( datosAuthSolicitante.disabled ) {
            throw new Errores({
                estado: 401,
                mensajeCliente: 'sin_permisos',
                mensajeServidor: 'No estas autorizado, el usuario esta deshabilitado.',
            })
        }

        return next()

    } catch (error) {
        next(error)

    }
}

module.exports = usuarioDeshabilitado