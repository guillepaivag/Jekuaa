const { check } = require('express-validator')
const { validateResult } = require('../helpers/validateHelper')

const validaciones = {}

validaciones.validarDatosCliente = [
    check('datosUsuario.nombreUsuario')
        .exists()
        .not()
        .isEmpty()
        .isString()
        .isLength({ min: 1, max: 20 }),
    check('datosUsuario.correo')
        .exists()
        .not()
        .isEmpty()
        .isEmail(),
    (req, res, next) => {
        validateResult(req, res, next)
    }
]

module.exports = validaciones