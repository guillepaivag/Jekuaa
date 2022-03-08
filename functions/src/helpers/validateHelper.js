const { validationResult } = require('express-validator')
const Respuesta = require('../models/Respuesta')
const validaciones = {}

validaciones.validateResult = (req, res, next) => {
    try {
        validationResult(req).throw()
        return next()
    } catch (error) {
        next(error)
    }
}

module.exports = validaciones