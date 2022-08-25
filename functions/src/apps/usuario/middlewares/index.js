const { request, response } = require('express')

const admin = require('../../../../firebase-service')
const db = require('../../../../db')
const esNombreUsuario = require('../../../utils/esNombreUsuario')
const obtenerEdad = require('../../../utils/obtenerEdad')
const validarEmail = require('../../../utils/emailValido')
const Errores = require('../../../models/Error/Errores')
const Authentication = require('../../../models/Usuarios/Authentication')
const timestamp = require('../../../utils/timestamp')

const middlewaresUser = {}

// MIDDLEWARES
middlewaresUser.verificarDatosRequeridos = ( req = request, res = response, next ) => {
    try {
        const { datos, body } = req
        const { nombreCompleto, datosUsuario, contrasenha, confirmacionContrasenha } = body
        
        const esOperacionAgregar = req.method === 'POST'

        if (!Object.keys(body).length) {
            throw new TypeError('No hay datos para crear un usuario.')
        }

        if ( !nombreCompleto && (!datosUsuario || !Object.keys(datosUsuario).length) && !contrasenha ) {
            throw new TypeError('No hay datos para crear un usuario.')
        }

        if (esOperacionAgregar) {

            if (Object.keys(body).length !== 4) {
                throw new TypeError('No hay datos para crear un usuario.')
            }

            // Nombre completo
            if ( !nombreCompleto ) {
                throw new TypeError('Falta el nombre completo del usuario.')
            }
            
            // Datos del usuario
            if ( !datosUsuario ) {
                throw new TypeError('No hay datos para crear un usuario.')
            }

            const {
                nombreUsuario,
                correo,
            } = datosUsuario
        
            if ( !nombreUsuario ) {
                throw new TypeError('Es requerido un nombre de usuario.')
            }
        
            if ( !correo ) {
                throw new TypeError('Es requerido un correo.')
            }
    
            // Contraseña
            if ( !contrasenha ) {
                throw new TypeError('No existe la contraseña.')
            }
        
            if ( !confirmacionContrasenha ) {
                throw new TypeError('No existe la confirmación de contraseña.')
            }
        }
        
        next()
    } catch (error) {
        next(error)
    }
}

middlewaresUser.verificarTipoDeDatos = ( req = request, res = response, next ) => {
    try {
        const { datos, body } = req
        const { nombreCompleto, datosUsuario, contrasenha, confirmacionContrasenha } = body

        if ( nombreCompleto && typeof nombreCompleto !== 'string' ) {
            throw new TypeError('Debe de ser de tipo string el nombre completo del usuario.')
        }

        if (datosUsuario) {
            if (typeof datosUsuario != 'object') {
                throw new TypeError('Los datos usuario debe ser un objecto.')
            }

            const {
                nombreUsuario,
                correo,
                fechaNacimiento,
            } = datosUsuario
        
            if ( nombreUsuario && typeof nombreUsuario !== 'string' ) {
                throw new TypeError('El nombreUsuario debe ser de tipo string.')
            }
        
            if ( correo && typeof correo !== 'string' ) {
                throw new TypeError('El correo debe ser de tipo string.')
            }
        
            if ( fechaNacimiento && typeof fechaNacimiento !== 'number' ) {
                throw new TypeError('La fecha de nacimiento debe ser de tipo number en milisegundos.')
            }
        }

        if ( contrasenha ) {
            if ( typeof contrasenha !== 'string' ) {
                throw new TypeError('La contraseña debe ser de tipo string.')
            }
        
            if ( typeof confirmacionContrasenha !== 'string' ) {
                throw new TypeError('La confirmación de contraseña debe ser de tipo string.')
            }
        }

        next()
        
    } catch (error) {
        next(error)
    }
}

middlewaresUser.validarDatosExistentesPOST = async (req = request, res = response, next) => {
    const { datos = {}, params, body } = req
    const { uidSolicitante, datosAuthSolicitante } = datos
    const { nombreCompleto, datosUsuario, contrasenha, confirmacionContrasenha } = body
    
    try {
        // Nombre completo
        if (nombreCompleto) {
            let cantidadCaracteresValido = nombreCompleto.length >= 1 && nombreCompleto.length <= 100
            if ( !cantidadCaracteresValido ) {
                throw new TypeError('El nombre completo debe ser mayor a 0 y menor a 101.')
            }
        }
    
        if (datosUsuario) {
            const {
                nombreUsuario,
                correo,
            } = datosUsuario

            // Nombre de usuario
            if ( nombreUsuario ) {
                // Verificar que sea alfanumerico
                if (!esNombreUsuario(nombreUsuario)) {
                    throw new Errores({
                        estado: 400,
                        mensajeCliente: 'nombre_usuario_invalido',
                        mensajeServidor: 'El nombre de usuario solo puede tener: a-z A-Z 0-9 _'
                    })
                }
                
                // Verificar tamaño
                let cantidadCaracteresValido = nombreUsuario.length >= 1 && nombreUsuario.length <= 20
                if ( !cantidadCaracteresValido ) {
                    throw new TypeError('El nombre de usuario debe ser mayor a 0 y menor a 21.')
                }

                const existe = await Authentication.existeUsuario({ nombreUsuario })

                if (existe) {
                    throw new Errores({
                        estado: 400,
                        mensajeCliente: 'ya_existe_nombre_usuario',
                        mensajeServidor: `Ya existe el nombre de usuario ${nombreUsuario}.`
                    })
                }
            }
    
            // Correo
            if (correo) {
                let cantidadCaracteresValido = correo.length >= 5 && correo.length <= 100
                let correoValido = validarEmail(correo)
                let valido = cantidadCaracteresValido && correoValido
                if ( !valido ) {
                    throw new TypeError('El correo debe ser válido y entre 5 a 100 carácteres.')
                }
            }
        }
    
        // Contraseñas
        if ( contrasenha ) {
            let cantidadCaracteresValido1 = contrasenha.length >= 6 && contrasenha.length <= 20
            if ( !cantidadCaracteresValido1 ) {
                throw new TypeError('La contraseña debe ser mayor o igual a 6 y menor o igual a 20.')
            }
        
            let cantidadCaracteresValido2 = confirmacionContrasenha.length >= 6 && confirmacionContrasenha.length <= 20
            if ( !cantidadCaracteresValido2 ) {
                throw new TypeError('La confirmación de contraseña debe ser mayor o igual a 6 y menor o igual a 20.')
            }
        
            if (contrasenha !== confirmacionContrasenha) {
                throw new TypeError('La contraseña debe ser igual a la confirmación de contraseña.')
            }
        }

        next()

    } catch (error) {
        next(error)
    }
}

middlewaresUser.validarDatosExistentesPUT = async (req = request, res = response, next) => {
    try {
        const { datos, params, body } = req
        const { nombreCompleto, datosUsuario, contrasenha, confirmacionContrasenha } = body
        const { uidSolicitante, datosAuthSolicitante } = datos

        // Nombre completo
        if (nombreCompleto) {
            let cantidadCaracteresValido = nombreCompleto.length >= 1 && nombreCompleto.length <= 100
            if ( !cantidadCaracteresValido ) {
                throw new TypeError('El nombre completo debe ser mayor a 0 y menor a 101.')
            }
        }
    
        if (datosUsuario) {
            const {
                nombreUsuario,
                correo,
                fechaNacimiento,
            } = datosUsuario

            // Nombre de usuario
            if ( nombreUsuario ) {
                // Verificar que sea alfanumerico
                if (!esNombreUsuario(nombreUsuario)) {
                    throw new Errores({
                        estado: 400,
                        mensajeCliente: 'nombre_usuario_invalido',
                        mensajeServidor: 'El nombre de usuario solo puede tener (a-z) (A-Z) (0-9) (_).'
                    })
                }
                
                // Verificar tamaño
                let cantidadCaracteresValido = nombreUsuario.length >= 1 && nombreUsuario.length <= 20
                if ( !cantidadCaracteresValido ) {
                    throw new TypeError('El nombre de usuario debe ser mayor a 0 y menor a 21.')
                }

                const existe = await Authentication.existeUsuario({ nombreUsuario })

                if (existe) {
                    throw new Errores({
                        estado: 400,
                        mensajeCliente: 'ya_existe_nombre_usuario',
                        mensajeServidor: `Ya existe el nombre de usuario ${nombreUsuario}.`
                    })
                }
            }
    
            // Correo
            if (correo) {
                let cantidadCaracteresValido = correo.length >= 5 && correo.length <= 100
                let correoValido = validarEmail(correo)
                let valido = cantidadCaracteresValido && correoValido
                if ( !valido ) {
                    throw new TypeError('El correo debe ser válido y entre 5 a 100 carácteres.')
                }
            }
    
            // Fecha de nacimiento
            if (fechaNacimiento) {
                // Solo si tiene 1 año de edad puede registrarse
                let fechaNacimientoValido = obtenerEdad(fechaNacimiento)
                let valido = fechaNacimientoValido >= 1
                if ( !valido ) {
                    throw new TypeError('El usuario debe tener al menos 1 año de edad.')
                }
            }
        }
    
        // Contraseñas
        if ( contrasenha ) {
            let cantidadCaracteresValido1 = contrasenha.length >= 6 && contrasenha.length <= 20
            if ( !cantidadCaracteresValido1 ) {
                throw new TypeError('La contraseña debe ser mayor o igual a 6 y menor o igual a 20.')
            }
        
            let cantidadCaracteresValido2 = confirmacionContrasenha.length >= 6 && confirmacionContrasenha.length <= 20
            if ( !cantidadCaracteresValido2 ) {
                throw new TypeError('La confirmación de contraseña debe ser mayor o igual a 6 y menor o igual a 20.')
            }
        
            if (contrasenha !== confirmacionContrasenha) {
                throw new TypeError('La contraseña debe ser igual a la confirmación de contraseña.')
            }
        }

        next()

    } catch (error) {
        next(error)
    }
}

middlewaresUser.construirDatosUsuarioPOST = async ( req = request, res = response, next ) => {
    
    const { datos, body, params } = req
    const { nombreCompleto, datosUsuario, contrasenha } = body

    try {

        const {
            nombreUsuario,
            correo,
        } = datosUsuario
    
        // Nombre completo
        req.body.nombreCompleto = nombreCompleto.trim()

        // Datos usuario
        req.body.datosUsuario.nombreUsuario = nombreUsuario.trim()
        req.body.datosUsuario.correo = correo.trim()
        req.body.datosUsuario.fechaNacimiento = null
        req.body.datosUsuario.plan = 'gratis'
        req.body.datosUsuario.rol = 'estudiante'
        req.body.datosUsuario.point = 0
    
        // Contraseña
        req.body.contrasenha = contrasenha.trim()
        
        return next()

    } catch (error) {
        next(error)
    }
    
}

middlewaresUser.construirDatosUsuarioPUT = async ( req = request, res = response, next ) => {
    
    const { datos, body, params } = req
    const { nombreCompleto, datosUsuario, contrasenha } = body

    try {        
        // Nombre completo
        nombreCompleto ? 
        req.body.nombreCompleto = nombreCompleto.trim() : ''

        // Datos usuario
        if (datosUsuario) {
            const {
                nombreUsuario,
                correo,
                fechaNacimiento,
            } = datosUsuario
        
            // Nombre de usuario
            nombreUsuario ? 
            req.body.datosUsuario.nombreUsuario = nombreUsuario.trim() : ''
        
            // Correo
            correo ? 
            req.body.datosUsuario.correo = correo.trim() : ''
        
            // Fecha de nacimiento
            fechaNacimiento ? 
            req.body.datosUsuario.fechaNacimiento = timestamp.milliseconds_a_timestamp(fechaNacimiento) : null
        }


        // Contraseña
        contrasenha ? req.body.contrasenha = contrasenha.trim() : ''


        // Firebase authetication
        const datosAuth = {}
    
        if ( nombreCompleto ) datosAuth.displayName = nombreCompleto.trim()
        if ( datosUsuario && datosUsuario.correo ) datosAuth.email = datosUsuario.correo.trim()

        req.body.datosAuth = Object.keys(datosAuth).length ? datosAuth : null

        const noHayActualizacion = 
        ( !datosUsuario || !Object.keys(datosUsuario).length ) && 
        ( !datosAuth || !Object.keys(datosAuth).length ) && 
        !contrasenha

        if ( noHayActualizacion ) {
            throw new TypeError('No hay datos para actualizar.')
        }
        
        return next()

    } catch (error) {
        next(error)
    }
    
}

middlewaresUser.construirDatosInformacionUsuario = async ( req = request, res = response, next ) => {
    
    try {
        const { body, datos } = req
        const { uidSolicitante, datosAuthSolicitante } = datos
        const { descripcion, especializaciones, intereses, redesSociales, rolDescriptivo } = body

        req.body.datosActualizados = {}

        descripcion ? req.body.datosActualizados.descripcion = descripcion : ''
        especializaciones ? req.body.datosActualizados.especializaciones = especializaciones : ''
        intereses ? req.body.datosActualizados.intereses = intereses : ''
        redesSociales && redesSociales.length ? req.body.datosActualizados.redesSociales = redesSociales : ''

        return next()

    } catch (error) {
        next(error)

    }
    
}

module.exports = middlewaresUser