const { validationResult } = require('express-validator')
const Respuesta = require('../models/Respuesta')
const validaciones = {}

validaciones.validateResult = (req, res, next) => {
    try {
        validationResult(req).throw()

        return next()

    } catch (error) {
        let status = 400
        let respuesta = new Respuesta()

        respuesta.setRespuesta({
            codigo: 'jekuaa/error/usuario_mala_solicitud',
            mensaje: 'Hubo un problema al crear el usuario.',
            resultado: error.array()
        })

        return res.status( status ).json( respuesta.getRespuesta() )
    }
}

module.exports = validaciones