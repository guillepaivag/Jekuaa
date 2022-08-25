const { request, response } = require('express')
const Errores = require('../models/Error/Errores')

const noEsEmailVerificado = async (req = request, res = response, next) => {
    try {
        const { body, datos, params } = req
        const { datosAuthSolicitante } = datos

        if (datosAuthSolicitante.emailVerified) {
            throw new Errores({
                estado: 400,
                mensajeCliente: 'email_ya_verificado',
                mensajeServidor: 'El email ya esta verificado.',
            })
        }

        return next()

    } catch (error) {
        next(error)

    }
}

module.exports = noEsEmailVerificado