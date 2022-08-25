const { check, body } = require('express-validator')
const { validateResult } = require('../../../helpers/validateHelper')
const Errores = require('../../../models/Error/Errores')
const datosRedesSociales = require("../../../utils/datosRedesSociales")

const validaciones = {}

validaciones.validarDatosInformacionUsuario = [
    check('descripcion')
        .if(body('descripcion').exists())
        .if(body('descripcion').notEmpty())
        .isString()
        .withMessage((value, { req, location, path }) => {
            throw new TypeError('Debe ser string la descripción.')
        })
        .isLength({ min: 1, max: 1000 })
        .withMessage((value, { req, location, path }) => {
            throw new TypeError('La longitud de la descripción debe estar en un rango de 1 y 1000.')
        }),
    check('especializaciones')
        .if(body('especializaciones').exists())
        .if(body('especializaciones').notEmpty())
        .isString()
        .withMessage((value, { req, location, path }) => {
            throw new TypeError('Debe ser string las especializaciones.')
        })
        .isLength({ min: 1, max: 1000 })
        .withMessage((value, { req, location, path }) => {
            throw new TypeError('La longitud de las especializaciones debe estar en un rango de 1 y 1000.')
        }),
    check('intereses')
        .if(body('intereses').exists())
        .if(body('intereses').notEmpty())
        .isString()
        .withMessage((value, { req, location, path }) => {
            throw new TypeError('Debe ser string los intereses.')
        })
        .isLength({ min: 1, max: 1000 })
        .withMessage((value, { req, location, path }) => {
            throw new TypeError('La longitud de los intereses debe estar en un rango de 1 y 1000.')
        }),
    check('rolDescriptivo')
        .if(body('rolDescriptivo').exists())
        .if(body('rolDescriptivo').notEmpty())
        .isString()
        .withMessage((value, { req, location, path }) => {
            throw new TypeError('El rol debe ser string.')
        })
        .isLength({ min: 1, max: 50 })
        .withMessage((value, { req, location, path }) => {
            throw new TypeError('La longitud de los intereses debe estar en un rango de 1 y 1000.')
        }),
    check('redesSociales')
        .if(body('redesSociales').exists())
        .if(body('redesSociales').notEmpty())
        .isArray({
            min: 0,
            max: 7
        })
        .withMessage((value, { req, location, path }) => {
            throw new TypeError('Debe ser un arreglo la información de redes sociales.')
        })
        .custom((value) => {
            for (let i = 0; i < value.length; i++) {
                const datosRedSocial = value[i]
                const lista = Object.keys(datosRedSocial)

                for (let j = 0; j < lista.length; j++) {
                    const element = lista[j]
                    if (element !== 'redSocial' && element !== 'urlPerfil') {
                        throw new Errores({
                            estado: 400,
                            mensajeCliente: 'solo_se_admite_redsocial_urlperfil',
                            mensajeServidor: 'Solo se admite redSocial y urlPerfil.'
                        })
                    }
                }

                if (!datosRedesSociales.lista_codigo.includes(datosRedSocial.redSocial)) {
                    throw new Errores({
                        estado: 400,
                        mensajeCliente: 'red_social_no_válida',
                        mensajeServidor: `No es permitido esta red social ${datosRedSocial.redSocial}.`
                    })
                }

                const rsUrl = datosRedesSociales.lista_url_por_codigo.find(x => x.codigo === datosRedSocial.redSocial)
                if ( !datosRedSocial.urlPerfil.includes(rsUrl.url) && !datosRedSocial.urlPerfil.includes(rsUrl.url_www) ) {
                    throw new Errores({
                        estado: 400,
                        mensajeCliente: 'url_de_redsocial_invalida',
                        mensajeServidor: `No es permitido esta url ${datosRedSocial.urlPerfil} para la red social ${datosRedSocial.redSocial}.`
                    })
                }

                if (typeof datosRedSocial.redSocial !== 'string') {
                    throw new TypeError('El identificador de red social debe ser string.')
                }

                if (typeof datosRedSocial.urlPerfil !== 'string') {
                    throw new TypeError('La url de tu perfil debe ser string.')
                }

                return true
            }
        }),
    (req, res, next) => {
        validateResult(req, res, next)
    }
]


module.exports = validaciones