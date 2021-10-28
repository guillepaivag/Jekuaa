const Usuario = require("../models/Usuario")
const { check, body } = require('express-validator')
const { validateResult } = require('../helpers/validateHelper')
const ErrorJekuaa = require('../models/Error/ErroresJekuaa')
const JekuaaPremium = require("../models/JekuaaPremium")
const JekuaaRoles = require("../models/JekuaaRoles")
const Instructor = require("../models/TiposUsuarios/Instructor")

const validaciones = {}

validaciones.validarDatosCreacionUsuarioAdmin = [
    check('datosUsuario.nombreUsuario')
        .exists()
        .withMessage((value, { req, location, path }) => {
            throw new ErrorJekuaa({
                codigo: 'jekuaa/error/usuario_mala_solicitud',
                mensaje: 'Se requiere nombre de usuario.'
            })
        })
        .isAlphanumeric()
        .withMessage((value, { req, location, path }) => {
            throw new ErrorJekuaa({
                codigo: 'jekuaa/error/usuario_mala_solicitud',
                mensaje: 'Debe ser alphanumerico el nombre de usuario.'
            })
        })
        .isLength({ min: 1, max: 20 })
        .withMessage((value, { req, location, path }) => {
            throw new ErrorJekuaa({
                codigo: 'jekuaa/error/usuario_mala_solicitud',
                mensaje: 'La longitud del nombre de usuario debe estar en un rango de 1 y 20.'
            })
        })
        .custom(async (value, { req }) => {
            await Usuario.errorExisteUsuario({
                value
            })

            return true
        }),
    check('datosUsuario.correo')
        .exists()
        .withMessage((value, { req, location, path }) => {
            throw new ErrorJekuaa({
                codigo: 'jekuaa/error/usuario_mala_solicitud',
                mensaje: 'Se requiere correo.'
            })
        })
        .notEmpty()
        .withMessage((value, { req, location, path }) => {
            throw new ErrorJekuaa({
                codigo: 'jekuaa/error/usuario_mala_solicitud',
                mensaje: 'Se requiere correo.'
            })
        })
        .isString()
        .withMessage((value, { req, location, path }) => {
            throw new ErrorJekuaa({
                codigo: 'jekuaa/error/usuario_mala_solicitud',
                mensaje: 'Debe ser un string el correo.'
            })
        })
        .isEmail()
        .withMessage((value, { req, location, path }) => {
            throw new ErrorJekuaa({
                codigo: 'jekuaa/error/usuario_mala_solicitud',
                mensaje: 'El correo debe ser válido.'
            })
        }),
    check('datosUsuario.nombreCompleto')
        .if(body('datosUsuario.nombreCompleto').exists())
        .isString()
        .withMessage((value, { req, location, path }) => {
            throw new ErrorJekuaa({
                codigo: 'jekuaa/error/usuario_mala_solicitud',
                mensaje: 'El nombre completo debe ser string.'
            })
        })
        .isLength({ min: 1, max: 100 })
        .withMessage((value, { req, location, path }) => {
            throw new ErrorJekuaa({
                codigo: 'jekuaa/error/usuario_mala_solicitud',
                mensaje: 'La longitud del nombre completo debe estar en un rango de 1 y 100.'
            })
        }),
    check('datosUsuario.fechaNacimiento')
        .if(body('datosUsuario.fechaNacimiento').exists())
        .isNumeric()
        .withMessage((value, { req, location, path }) => {
            throw new ErrorJekuaa({
                codigo: 'jekuaa/error/usuario_mala_solicitud',
                mensaje: 'La fecha de nacimiento debe ser numerico.'
            })
        })
        .custom(async (value, { req }) => {
            if (!req.body.datosUsuario.fechaNacimiento) {
                return true
            }
            
            const fechaNacimientoValido = (Date.now() - value) * 3.2*Math.pow(10, -11)
            valido = fechaNacimientoValido >= 1
            if ( !valido ) {
                throw new ErrorJekuaa({
                    codigo: 'jekuaa/error/usuario_mala_solicitud',
                    mensaje: 'El usuario debe tener al menos 1 año de edad.'
                })
            }

            return true
        }),
    check('datosUsuario.jekuaaPremium')
        .if(body('datosUsuario.jekuaaPremium').exists())
        .isObject()
        .withMessage((value, { req, location, path }) => {
            throw new TypeError('El campo jekuaaPremium debe ser un objeto.', 'Usuario.js')
        })
        .custom(async (value, {req}) => {
            if (!req.body.datosUsuario.jekuaaPremium) {
                return true
            }

            const verificadorFormato = new JekuaaPremium(value)
            verificadorFormato.validarTodosLosTiposDeDatos('cliente')

            await verificadorFormato.validarDatosCliente()

            return true
        }),
    check('datosUsuario.jekuaaRol')
        .if(body('datosUsuario.jekuaaRol').exists())
        .isString()
        .withMessage((value, { req, location, path }) => {
            throw new ErrorJekuaa({
                codigo: 'jekuaa/error/usuario_mala_solicitud',
                mensaje: 'El rol debe ser string.'
            })
        })
        .custom(async (value, {req}) => {          
            const { jekuaaDatos } = req
            const { datosAuthSolicitante } = jekuaaDatos

            if (!value) {
                return true
            }
            
            let documentoRol = await JekuaaRoles.obtenerDocumentoRol(value)
            
            // Verificar rol valido
            if (!documentoRol.exists) {
                throw new ErrorJekuaa({
                    codigo: 'jekuaa/error/usuario_mala_solicitud',
                    mensaje: 'No existe este rol.'
                })
            }

            const diferenciaNivelRol = await JekuaaRoles.compararNivelRoles(datosAuthSolicitante.customClaims.jekuaaRol, value)

            if ( diferenciaNivelRol < 0 ) {
                //No autorizado
                throw new ErrorJekuaa({
                    codigo: 'jekuaa/error/usuario_no_autorizado',
                    mensaje: 'No puedes crear o actualizar un usuario con mayor rol que el tuyo.'
                })
            }

            return true
        }),
    check('datosUsuario.instructor')
        .if(body('datosUsuario.instructor').exists())
        .isBoolean()
        .withMessage((value, { req, location, path }) => {
            throw new ErrorJekuaa({
                codigo: 'jekuaa/error/usuario_mala_solicitud',
                mensaje: 'El estado instructor debe ser boolean.'
            })
        })
        .custom(async (value, {req}) => {
            let rolPorDefecto = 'estudiante'
            const {
                jekuaaRol
            } = req.body.datosUsuario

            if (!value) {
                return true
            }

            const permisoInstructor = await Instructor.permisoPorRol(jekuaaRol ? jekuaaRol : rolPorDefecto)
            if (value && permisoInstructor === 'no-permitido') {
                throw new ErrorJekuaa({
                    codigo: 'jekuaa/error/usuario_mala_solicitud',
                    mensaje: 'Este rol no tiene permisos de instructor.'
                })
            } else if (!value && permisoInstructor === 'requerido') {
                throw new ErrorJekuaa({
                    codigo: 'jekuaa/error/usuario_mala_solicitud',
                    mensaje: 'Este rol necesita ser instructor.'
                })
            }

            return true
        }),
    check('datosUsuario.jekuaaPoint')
        .if(body('datosUsuario.jekuaaPoint').exists())
        .isNumeric()
        .withMessage((value, { req, location, path }) => {
            throw new ErrorJekuaa({
                codigo: 'jekuaa/error/usuario_mala_solicitud',
                mensaje: 'Los puntos de jekuaa debe ser numerico.'
            })
        })
        .custom((value, { req }) => {
            if (!value) {
                return true
            }

            if (value < 0) {
                throw new ErrorJekuaa({
                    codigo: 'jekuaa/error/usuario_mala_solicitud',
                    mensaje: 'Los puntos de jekuaa deben ser 0 o mayor.'
                })
            }

            return true
        }),
    check('contrasenha')
        .exists()
        .withMessage((value, { req, location, path }) => {
            throw new ErrorJekuaa({
                codigo: 'jekuaa/error/usuario_mala_solicitud',
                mensaje: 'La contraseña es requerida.'
            })
        })
        .isString()
        .withMessage((value, { req, location, path }) => {
            throw new ErrorJekuaa({
                codigo: 'jekuaa/error/usuario_mala_solicitud',
                mensaje: 'La contraseña debe ser de tipo string.'
            })
        }),
    check('confirmacionContrasenha')
        .exists()
        .withMessage((value, { req, location, path }) => {
            throw new ErrorJekuaa({
                codigo: 'jekuaa/error/usuario_mala_solicitud',
                mensaje: 'La confirmación de contraseña es requerida.'
            })
        })
        .isString()
        .withMessage((value, { req, location, path }) => {
            throw new ErrorJekuaa({
                codigo: 'jekuaa/error/usuario_mala_solicitud',
                mensaje: 'La contraseña debe ser de tipo string.'
            })
        })
        .custom((value, { req }) => {
            if (value !== req.body.contrasenha) {
                throw new ErrorJekuaa({
                    codigo: 'jekuaa/error/usuario_mala_solicitud',
                    mensaje: 'La contraseña y su confirmación deben ser iguales.'
                })
            }

            return true
        }),
    (req, res, next) => {
        validateResult(req, res, next)
    }
]

validaciones.validarDatosActualizacionUsuarioAdmin = [
    check('datosUsuario.nombreUsuario')
        .if(body('datosUsuario.nombreUsuario').exists())
        .isAlphanumeric()
        .withMessage((value, { req, location, path }) => {
            throw new ErrorJekuaa({
                codigo: 'jekuaa/error/usuario_mala_solicitud',
                mensaje: 'Debe ser alphanumerico el nombre de usuario.'
            })
        })
        .isLength({ min: 1, max: 20 })
        .withMessage((value, { req, location, path }) => {
            throw new ErrorJekuaa({
                codigo: 'jekuaa/error/usuario_mala_solicitud',
                mensaje: 'La longitud del nombre de usuario debe estar en un rango de 1 y 20.'
            })
        })
        .custom(async (value, { req }) => {
            await Usuario.errorExisteUsuario({
                value
            })

            return true
        }),
    check('datosUsuario.correo')
        .if(body('datosUsuario.correo').exists())
        .isString()
        .withMessage((value, { req, location, path }) => {
            throw new ErrorJekuaa({
                codigo: 'jekuaa/error/usuario_mala_solicitud',
                mensaje: 'Debe ser un string el correo.'
            })
        })
        .isEmail()
        .withMessage((value, { req, location, path }) => {
            throw new ErrorJekuaa({
                codigo: 'jekuaa/error/usuario_mala_solicitud',
                mensaje: 'El correo debe ser válido.'
            })
        }),
    check('datosUsuario.fechaNacimiento')
        .if(body('datosUsuario.fechaNacimiento').exists())
        .isNumeric()
        .withMessage((value, { req, location, path }) => {
            throw new ErrorJekuaa({
                codigo: 'jekuaa/error/usuario_mala_solicitud',
                mensaje: 'La fecha de nacimiento debe ser numerico.'
            })
        })
        .custom(async (value, { req }) => {
            if (!req.body.datosUsuario.fechaNacimiento) {
                return true
            }
            
            const fechaNacimientoValido = (Date.now() - value) * 3.2*Math.pow(10, -11)
            valido = fechaNacimientoValido >= 1
            if ( !valido ) {
                throw new ErrorJekuaa({
                    codigo: 'jekuaa/error/usuario_mala_solicitud',
                    mensaje: 'El usuario debe tener al menos 1 año de edad.'
                })
            }

            return true
        }),
    check('datosUsuario.jekuaaPremium')
        .if(body('datosUsuario.jekuaaPremium').exists())
        .isObject()
        .withMessage((value, { req, location, path }) => {
            throw new TypeError('El campo jekuaaPremium debe ser un objeto.', 'Usuario.js')
        })
        .custom(async (value, {req}) => {
            const verificadorFormato = new JekuaaPremium(value)
            verificadorFormato.validarTodosLosTiposDeDatos('cliente')

            await verificadorFormato.validarDatosCliente()

            return true
        }),
    check('datosUsuario.jekuaaRol')
        .if(body('datosUsuario.jekuaaRol').exists())
        .isString()
        .withMessage((value, { req, location, path }) => {
            throw new ErrorJekuaa({
                codigo: 'jekuaa/error/usuario_mala_solicitud',
                mensaje: 'El rol debe ser string.'
            })
        })
        .custom(async (value, {req}) => {          
            const { jekuaaDatos } = req
            const { datosAuthSolicitante } = jekuaaDatos

            let documentoRol = await JekuaaRoles.obtenerDocumentoRol(value)
            
            // Verificar rol valido
            if (!documentoRol.exists) {
                throw new ErrorJekuaa({
                    codigo: 'jekuaa/error/usuario_mala_solicitud',
                    mensaje: 'No existe este rol.'
                })
            }

            const diferenciaNivelRol = await JekuaaRoles.compararNivelRoles(datosAuthSolicitante.customClaims.jekuaaRol, value)

            if ( diferenciaNivelRol < 0 ) {
                //No autorizado
                throw new ErrorJekuaa({
                    codigo: 'jekuaa/error/usuario_no_autorizado',
                    mensaje: 'No puedes crear o actualizar un usuario con mayor rol que el tuyo.'
                })
            }

            return true
        }),
    check('datosUsuario.instructor')
        .if(body('datosUsuario.instructor').exists())
        .isBoolean()
        .withMessage((value, { req, location, path }) => {
            throw new ErrorJekuaa({
                codigo: 'jekuaa/error/usuario_mala_solicitud',
                mensaje: 'El estado instructor debe ser boolean.'
            })
        })
        .custom(async (value, {req}) => {
            let rolPorDefecto = 'estudiante'
            const { jekuaaRol } = req.body.datosUsuario
            const { uid } = req.params

            let datosUsuarioAuth
            if (!jekuaaRol) {
                datosUsuarioAuth = await Usuario.obtenerReclamosPorUID(uid)
            }
            rolPorDefecto = !jekuaaRol ? datosUsuarioAuth.jekuaaRol : 'estudiante'   

            const permisoInstructor = await Instructor.permisoPorRol(jekuaaRol ? jekuaaRol : rolPorDefecto)
            if (value && permisoInstructor === 'no-permitido') {
                throw new ErrorJekuaa({
                    codigo: 'jekuaa/error/usuario_mala_solicitud',
                    mensaje: 'Este rol no tiene permisos de instructor.'
                })
            } else if (!value && permisoInstructor === 'requerido') {
                throw new ErrorJekuaa({
                    codigo: 'jekuaa/error/usuario_mala_solicitud',
                    mensaje: 'Este rol necesita ser instructor.'
                })
            }

            return true
        }),
    check('datosUsuario.jekuaaPoint')
        .if(body('datosUsuario.jekuaaPoint').exists())
        .isNumeric()
        .withMessage((value, { req, location, path }) => {
            throw new ErrorJekuaa({
                codigo: 'jekuaa/error/usuario_mala_solicitud',
                mensaje: 'Los puntos de jekuaa debe ser numerico.'
            })
        })
        .custom((value, { req }) => {
            if (value < 0) {
                throw new ErrorJekuaa({
                    codigo: 'jekuaa/error/usuario_mala_solicitud',
                    mensaje: 'Los puntos de jekuaa deben ser 0 o mayor.'
                })
            }

            return true
        }),
    check('contrasenha')
        .if(body('contrasenha').exists())
        .isString()
        .withMessage((value, { req, location, path }) => {
            throw new ErrorJekuaa({
                codigo: 'jekuaa/error/usuario_mala_solicitud',
                mensaje: 'La contraseña debe ser de tipo string.'
            })
        }),
    check('confirmacionContrasenha')
        .if(body('contrasenha').exists())
        .exists()
        .withMessage((value, { req, location, path }) => {
            throw new ErrorJekuaa({
                codigo: 'jekuaa/error/usuario_mala_solicitud',
                mensaje: 'Se requiere una confirmación de contraseña.'
            })
        })
        .isString()
        .withMessage((value, { req, location, path }) => {
            throw new ErrorJekuaa({
                codigo: 'jekuaa/error/usuario_mala_solicitud',
                mensaje: 'La contraseña debe ser de tipo string.'
            })
        })
        .custom((value, { req }) => {
            const { contrasenha } = req.body
            if (value !== contrasenha) {
                throw new ErrorJekuaa({
                    codigo: 'jekuaa/error/usuario_mala_solicitud',
                    mensaje: 'La contraseña y su confirmación deben ser iguales.'
                })
            }

            return true
        }),
    (req, res, next) => {
        validateResult(req, res, next)
    }
]

validaciones.validarDatosActualizacionUsuario = [
    check('datosUsuario.nombreUsuario')
        .if(body('datosUsuario.nombreUsuario').exists())
        .isAlphanumeric()
        .withMessage((value, { req, location, path }) => {
            throw new ErrorJekuaa({
                codigo: 'jekuaa/error/usuario_mala_solicitud',
                mensaje: 'Debe ser alphanumerico el nombre de usuario.'
            })
        })
        .isLength({ min: 1, max: 20 })
        .withMessage((value, { req, location, path }) => {
            throw new ErrorJekuaa({
                codigo: 'jekuaa/error/usuario_mala_solicitud',
                mensaje: 'La longitud del nombre de usuario debe estar en un rango de 1 y 20.'
            })
        })
        .custom(async (value, { req }) => {
            await Usuario.errorExisteUsuario({
                value
            })

            return true
        }),
    check('datosUsuario.correo')
        .if(body('datosUsuario.correo').exists())
        .isString()
        .withMessage((value, { req, location, path }) => {
            throw new ErrorJekuaa({
                codigo: 'jekuaa/error/usuario_mala_solicitud',
                mensaje: 'Debe ser un string el correo.'
            })
        })
        .isEmail()
        .withMessage((value, { req, location, path }) => {
            throw new ErrorJekuaa({
                codigo: 'jekuaa/error/usuario_mala_solicitud',
                mensaje: 'El correo debe ser válido.'
            })
        }),
    check('datosUsuario.nombreCompleto')
        .if(body('datosUsuario.nombreCompleto').exists())
        .isString()
        .withMessage((value, { req, location, path }) => {
            throw new ErrorJekuaa({
                codigo: 'jekuaa/error/usuario_mala_solicitud',
                mensaje: 'El nombre completo debe ser string.'
            })
        })
        .isLength({ min: 1, max: 100 })
        .withMessage((value, { req, location, path }) => {
            throw new ErrorJekuaa({
                codigo: 'jekuaa/error/usuario_mala_solicitud',
                mensaje: 'La longitud del nombre completo debe estar en un rango de 1 y 100.'
            })
        }),
    check('datosUsuario.fechaNacimiento')
        .if(body('datosUsuario.fechaNacimiento').exists())
        .isNumeric()
        .withMessage((value, { req, location, path }) => {
            throw new ErrorJekuaa({
                codigo: 'jekuaa/error/usuario_mala_solicitud',
                mensaje: 'La fecha de nacimiento debe ser numerico.'
            })
        })
        .custom(async (value, { req }) => {
            if (!req.body.datosUsuario.fechaNacimiento) {
                return true
            }
            
            const fechaNacimientoValido = (Date.now() - value) * 3.2*Math.pow(10, -11)
            valido = fechaNacimientoValido >= 1
            if ( !valido ) {
                throw new ErrorJekuaa({
                    codigo: 'jekuaa/error/usuario_mala_solicitud',
                    mensaje: 'El usuario debe tener al menos 1 año de edad.'
                })
            }

            return true
        }),
    check('contrasenha')
        .if(body('contrasenha').exists())
        .isString()
        .withMessage((value, { req, location, path }) => {
            throw new ErrorJekuaa({
                codigo: 'jekuaa/error/usuario_mala_solicitud',
                mensaje: 'La contraseña debe ser de tipo string.'
            })
        }),
    check('confirmacionContrasenha')
        .if(body('contrasenha').exists())
        .exists()
        .withMessage((value, { req, location, path }) => {
            throw new ErrorJekuaa({
                codigo: 'jekuaa/error/usuario_mala_solicitud',
                mensaje: 'Se requiere una confirmación de contraseña.'
            })
        })
        .isString()
        .withMessage((value, { req, location, path }) => {
            throw new ErrorJekuaa({
                codigo: 'jekuaa/error/usuario_mala_solicitud',
                mensaje: 'La contraseña debe ser de tipo string.'
            })
        })
        .custom((value, { req }) => {
            const { contrasenha } = req.body
            if (value !== contrasenha) {
                throw new ErrorJekuaa({
                    codigo: 'jekuaa/error/usuario_mala_solicitud',
                    mensaje: 'La contraseña y su confirmación deben ser iguales.'
                })
            }

            return true
        }),
    (req, res, next) => {
        validateResult(req, res, next)
    }
]

module.exports = validaciones