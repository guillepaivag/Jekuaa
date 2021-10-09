const ErrorJekuaa = require("../models/Error/ErroresJekuaa")
const JekuaaPremium = require("../models/JekuaaPremium")
const JekuaaRoles = require("../models/JekuaaRoles")
const Usuario = require("../models/Usuario")
const utilsRolesSecciones = require("./usuarios/RolesSecciones")
const timestamp = require('./Timestamp')

const funciones = {}

funciones.verificadorDeFormatoProduccion = ( datosUsuario ) => {
        
    const {
        uid,
        nombreUsuario,
        correo,
        nombreCompleto,
        fechaNacimiento,
        jekuaaPremium,
        jekuaaRoles,
        jekuaaPoint
    } = datosUsuario

    if ( nombreUsuario && typeof nombreUsuario != 'string' ) {
        throw new TypeError('El nombreUsuario debe ser de tipo string.', 'Usuario.js')
    }

    if ( correo && typeof correo != 'string' ) {
        throw new TypeError('El correo debe ser de tipo string.', 'Usuario.js')
    }

    if ( nombreCompleto && typeof nombreCompleto != 'string' ) {
        throw new TypeError('Debe de ser de tipo string el nombre completo del usuario.', 'Usuario.js')
    }

    if ( fechaNacimiento && typeof fechaNacimiento != 'object' ) {
        throw new TypeError('La fecha de nacimiento debe ser de tipo object (Timestamp).', 'Usuario.js')
    }

    if ( jekuaaPremium ) {

        if ( typeof jekuaaPremium != 'object' ) {
            throw new TypeError('El jekuaaPremium debe ser de tipo object.', 'Usuario.js')
        }

        const formatoJekuaaPremium = new JekuaaPremium()
        formatoJekuaaPremium.setDatosPremium({
            plan: jekuaaPremium.plan,
            fechaCompra: jekuaaPremium.fechaCompra,
            fechaHasta: jekuaaPremium.fechaHasta,
        })

        formatoJekuaaPremium.formatoValido()

        formatoJekuaaPremium.cumpleCondiciones()

    }

    if ( jekuaaRoles ) {

        if ( typeof jekuaaRoles != 'object' ) {
            throw new Error('El jekuaaRoles debe ser de tipo object.')
        }
        
        const formatoJekuaaRoles = new JekuaaRoles({
            rol: jekuaaRoles.rol,
            secciones: jekuaaRoles.secciones,
            instructor: jekuaaRoles.instructor
        })

        formatoJekuaaRoles.formatoValido()

        formatoJekuaaRoles.cumpleCondiciones()

    }

    if ( jekuaaPoint && typeof jekuaaPoint != 'number' ) {
        throw new TypeError('El jekuaaPoint no es de tipo numerico.', 'Usuario.js')
    }
}


/**
 * La verificacion de datos requeridos, es una función
 * que observa si existe los datos necesarios y obligatorios
 * de existencia para la existencia de un usuario.
 * Los datos requeridos son: nombreUsuario, correo y la contraseña
 * @param {*} datosUsuario 
 * @param {*} contrasenha 
 * @param {*} confirmacionContrasenha 
 */
funciones.verificarDatosRequeridos = ( datosUsuario, contrasenha, confirmacionContrasenha ) => {

    if ( !datosUsuario || typeof datosUsuario != 'object' ) {
        throw new ErrorJekuaa({
            codigo: 'jekuaa/error/usuario_mala_solicitud',
            mensaje: 'No hay datos para crear un usuario.'
        })
    }

    const {
        uid,
        nombreUsuario,
        correo,
        nombreCompleto,
        fechaNacimiento,
        jekuaaPremium,
        jekuaaRoles,
        jekuaaPoint
    } = datosUsuario

    if ( !nombreUsuario ) {
        throw new ErrorJekuaa({
            codigo: 'jekuaa/error/usuario_mala_solicitud',
            mensaje: 'No existe el nombre de usuario.'
        })
    }

    if ( !correo ) {
        throw new ErrorJekuaa({
            codigo: 'jekuaa/error/usuario_mala_solicitud',
            mensaje: 'No existe el correo.'
        })
    }

    if ( !contrasenha ) {
        throw new ErrorJekuaa({
            codigo: 'jekuaa/error/usuario_mala_solicitud',
            mensaje: 'No existe la contraseña.'
        })
    }

    if ( !confirmacionContrasenha ) {
        throw new ErrorJekuaa({
            codigo: 'jekuaa/error/usuario_mala_solicitud',
            mensaje: 'No existe la confirmación de contraseña.'
        })
    }
}

funciones.verificarTipoDeDatosCliente = async ( datosUsuario, contrasenha, confirmacionContrasenha ) => {
        
    const {
        uid,
        nombreUsuario,
        correo,
        nombreCompleto,
        fechaNacimiento,
        jekuaaPremium,
        jekuaaRoles,
        jekuaaPoint
    } = datosUsuario

    if ( nombreUsuario && typeof nombreUsuario != 'string' ) {
        throw new TypeError('El nombreUsuario debe ser de tipo string.', 'Usuario.js')
    }

    if ( correo && typeof correo != 'string' ) {
        throw new TypeError('El correo debe ser de tipo string.', 'Usuario.js')
    }

    if ( nombreCompleto && typeof nombreCompleto != 'string' ) {
        throw new TypeError('Debe de ser de tipo string el nombre completo del usuario.', 'Usuario.js')
    }

    if ( fechaNacimiento && typeof fechaNacimiento != 'number' ) {
        throw new TypeError('La fecha de nacimiento debe ser de tipo number en milisegundos.', 'Usuario.js')
    }

    if ( jekuaaPremium ) {
        if ( typeof jekuaaPremium != 'object' ) {
            throw new TypeError('El campo jekuaaPremium debe ser un objeto.', 'Usuario.js')
        }
        const verificadorFormato = new JekuaaPremium(jekuaaPremium)
        verificadorFormato.validarTodosLosTiposDeDatos('cliente')
    }

    if ( jekuaaRoles ) {
        if ( typeof jekuaaRoles != 'object' ) {
            throw new TypeError('El campo jekuaaRoles debe ser un objeto.', 'Usuario.js')
        }
        const verificadorFormato = new JekuaaRoles(jekuaaRoles)
        verificadorFormato.validarTodosLosTiposDeDatos()
    }

    if ( jekuaaPoint && typeof jekuaaPoint != 'number' ) {
        throw new TypeError('El jekuaaPoint no es de tipo numerico.', 'Usuario.js')
    }

    if ( contrasenha && typeof contrasenha != 'string' ) {
        throw new TypeError('La contraseña debe ser de tipo string.', 'Usuario.js')
    }

    if ( contrasenha && confirmacionContrasenha && typeof confirmacionContrasenha != 'string' ) {
        throw new TypeError('La confirmación de contraseña debe ser de tipo string.', 'Usuario.js')
    }
}

funciones.validarDatosExistentesCliente = async ( datosUsuario, contrasenha, confirmacionContrasenha ) => {

    const {
        uid,
        nombreUsuario,
        correo,
        nombreCompleto,
        fechaNacimiento,
        jekuaaPremium,
        jekuaaRoles,
        jekuaaPoint
    } = datosUsuario

    let cantidadCaracteresValido
    let correoValido
    let fechaNacimientoValido
    let valido

    if (datosUsuario) {
        // Nombre de usuario
        if (nombreUsuario) {
            cantidadCaracteresValido = nombreUsuario.length >= 1 && nombreUsuario.length <= 20
            valido = cantidadCaracteresValido
            if ( !valido ) {
                throw new ErrorJekuaa({
                    codigo: 'jekuaa/error/usuario_mala_solicitud',
                    mensaje: 'El nombre de usuario debe ser mayor a 0 y menor a 21.'
                })
            }
            await Usuario.errorExisteUsuario({
                nombreUsuario
            })
        }

        // Correo
        if (correo) {
            cantidadCaracteresValido = correo.length >= 5 && correo.length <= 100
            correoValido = validarEmail(correo)
            valido = cantidadCaracteresValido && correoValido
            if ( !valido ) {
                throw new ErrorJekuaa({
                    codigo: 'jekuaa/error/usuario_mala_solicitud',
                    mensaje: 'El correo debe ser válido y entre 5 a 100 carácteres.'
                })
            }
        }

        // Nombre completo
        if (nombreCompleto) {
            cantidadCaracteresValido = nombreCompleto.length >= 1 && nombreCompleto.length <= 100
            valido = cantidadCaracteresValido
            if ( !valido ) {
                throw new ErrorJekuaa({
                    codigo: 'jekuaa/error/usuario_mala_solicitud',
                    mensaje: 'El nombre completo debe ser mayor a 0 y menor a 101.'
                })
            }
        }

        // Fecha de nacimiento
        if (fechaNacimiento) {
            // Solo si tiene 1 año de edad puede registrarse
            fechaNacimientoValido = (Date.now() - fechaNacimiento) * 3.2*Math.pow(10, -11)
            valido = fechaNacimientoValido >= 1
            if ( !valido ) {
                throw new ErrorJekuaa({
                    codigo: 'jekuaa/error/usuario_mala_solicitud',
                    mensaje: 'El usuario debe tener al menos 1 año de edad.'
                })
            }
        }

        // Jekuaa Premium
        if ( jekuaaPremium ) {
            const jekuaaPlan = new JekuaaPremium({
                plan: jekuaaPremium.plan,
                fechaCompra: jekuaaPremium.fechaCompra,
                fechaHasta: jekuaaPremium.fechaHasta,
            })

            await jekuaaPlan.validarDatosCliente()
        }

        // Jekuaa Roles
        if ( jekuaaRoles ) {
            const jekuaaRol = new JekuaaRoles({
                rol: jekuaaRoles.rol,
                secciones: jekuaaRoles.secciones,
                instructor: jekuaaRoles.instructor
            })
            
            await jekuaaRol.validarDatosCliente()
        }

        // Jekuaa Points
        if (jekuaaPoint) {
            valido = jekuaaPoint >= 0
            if ( !valido ) {
                throw new ErrorJekuaa({
                    codigo: 'jekuaa/error/usuario_mala_solicitud',
                    mensaje: 'El Jekuaa Point debe ser mayor o igual a 0.'
                })
            }
        }
    }

    // Contraseñas
    if ( contrasenha ) {
        cantidadCaracteresValido = contrasenha.length >= 6 && contrasenha.length <= 20
        valido = cantidadCaracteresValido
        if ( !valido ) {
            throw new ErrorJekuaa({
                codigo: 'jekuaa/error/usuario_mala_solicitud',
                mensaje: 'La contraseña debe ser mayor o igual a 6 y menor o igual a 20.'
            })
        }
    
        cantidadCaracteresValido = confirmacionContrasenha.length >= 6 && confirmacionContrasenha.length <= 20
        valido = cantidadCaracteresValido
        if ( !valido ) {
            throw new ErrorJekuaa({
                codigo: 'jekuaa/error/usuario_mala_solicitud',
                mensaje: 'La confirmación de contraseña debe ser mayor o igual a 6 y menor o igual a 20.'
            })
        }
    
        if (contrasenha !== confirmacionContrasenha) {
            throw new ErrorJekuaa({
                codigo: 'jekuaa/error/usuario_mala_solicitud',
                mensaje: 'La contraseña debe ser igual a la confirmación de contraseña.'
            })
        }
    }
}

funciones.construirDatosParaNuevoUsuario = ( datosUsuario, contrasenha ) => {
    
    const {
        uid,
        nombreUsuario,
        correo,
        nombreCompleto,
        fechaNacimiento,
        jekuaaPremium,
        jekuaaRoles,
        jekuaaPoint
    } = datosUsuario

    // Cambiamos el formato del cliente al formato servidor
    let datosUsuarioProduccion = {}
    let contrasenhaProduccion = ''

    // Nombre de usuario
    datosUsuarioProduccion.nombreUsuario = nombreUsuario.trim()

    // Correo
    datosUsuarioProduccion.correo = correo.trim()

    // Nombre completo
    datosUsuarioProduccion.nombreCompleto = nombreCompleto ? nombreCompleto.trim() : ''

    // Fecha de nacimiento
    datosUsuarioProduccion.fechaNacimiento = fechaNacimiento ? 
    timestamp.milliseconds_a_timestamp(fechaNacimiento) : null

    // Jekuaa Premium
    const paraDatosPlanPorDefecto = !jekuaaPremium || JekuaaPremium.esPlanGratis(jekuaaPremium.plan)
    datosUsuarioProduccion.jekuaaPremium = {}
    if ( paraDatosPlanPorDefecto ) {
        // Datos por defectos
        datosUsuarioProduccion.jekuaaPremium.plan = 'gratis'
        datosUsuarioProduccion.jekuaaPremium.fechaCompra = null
        datosUsuarioProduccion.jekuaaPremium.fechaHasta = null
    } else {
        datosUsuarioProduccion.jekuaaPremium.plan = jekuaaPremium.plan.trim()
        datosUsuarioProduccion.jekuaaPremium.fechaCompra = timestamp.milliseconds_a_timestamp(jekuaaPremium.fechaCompra)
        datosUsuarioProduccion.jekuaaPremium.fechaHasta = timestamp.milliseconds_a_timestamp(jekuaaPremium.fechaHasta)
    }
    
    // Jekuaa Roles
    const paraDatosRolPorDefecto = !jekuaaRoles || JekuaaRoles.esEstudiante(jekuaaRoles.rol) 
    datosUsuarioProduccion.jekuaaRoles = {}
    if (paraDatosRolPorDefecto ) {
        // Datos por defectos
        datosUsuarioProduccion.jekuaaRoles.rol = 'estudiante'
        datosUsuarioProduccion.jekuaaRoles.secciones = []
        datosUsuarioProduccion.jekuaaRoles.instructor = false
    } else {
        datosUsuarioProduccion.jekuaaRoles.rol = jekuaaRoles.rol.trim()
        datosUsuarioProduccion.jekuaaRoles.secciones = jekuaaRoles.secciones
        datosUsuarioProduccion.jekuaaRoles.instructor = jekuaaRoles.instructor
    }

    // Jekuaa Point
    datosUsuarioProduccion.jekuaaPoint = jekuaaPoint ? jekuaaPoint : 0

    // Contraseña
    contrasenhaProduccion = contrasenha.trim()

    // Retornar datos para produccion
    return {
        datosUsuario: datosUsuarioProduccion, 
        contrasenha: contrasenhaProduccion
    }
}

funciones.construirDatosParaActualizarUsuario = ( datosUsuario, contrasenha ) => {
    
    const {
        uid,
        nombreUsuario,
        correo,
        nombreCompleto,
        fechaNacimiento,
        jekuaaPremium,
        jekuaaRoles,
        jekuaaPoint
    } = datosUsuario

    // Cambiamos el formato del cliente al formato servidor
    let datosActualizados = {}
    let datosUsuarioProduccion = {}
    let contrasenhaProduccion = ''

    // Nombre de usuario
    nombreUsuario ? 
    datosUsuarioProduccion.nombreUsuario = nombreUsuario.trim() : ''

    // Correo
    correo ? 
    datosUsuarioProduccion.correo = correo.trim() : ''

    // Nombre completo
    nombreCompleto ? 
    datosUsuarioProduccion.nombreCompleto = nombreCompleto.trim() : ''

    // Fecha de nacimiento
    fechaNacimiento ? 
    datosUsuarioProduccion.fechaNacimiento = timestamp.milliseconds_a_timestamp(fechaNacimiento) : null

    // Jekuaa Premium
    if ( jekuaaPremium ) {
        datosUsuarioProduccion.jekuaaPremium = {}
        if (JekuaaPremium.esPlanGratis(jekuaaPremium.plan)) {
            // Datos por defectos
            datosUsuarioProduccion.jekuaaPremium.plan = 'gratis'
            datosUsuarioProduccion.jekuaaPremium.fechaCompra = null
            datosUsuarioProduccion.jekuaaPremium.fechaHasta = null
        } else {
            datosUsuarioProduccion.jekuaaPremium.plan = jekuaaPremium.plan.trim()
            datosUsuarioProduccion.jekuaaPremium.fechaCompra = timestamp.milliseconds_a_timestamp(jekuaaPremium.fechaCompra)
            datosUsuarioProduccion.jekuaaPremium.fechaHasta = timestamp.milliseconds_a_timestamp(jekuaaPremium.fechaHasta)
        }  
    } 
    
    // Jekuaa Roles
    if ( jekuaaRoles ) {
        datosUsuarioProduccion.jekuaaRoles = {}
        if ( JekuaaRoles.esEstudiante(jekuaaRoles.rol) ) {
            // Datos por defectos
            datosUsuarioProduccion.jekuaaRoles.rol = 'estudiante'
            datosUsuarioProduccion.jekuaaRoles.secciones = []
            datosUsuarioProduccion.jekuaaRoles.instructor = false
        } else {
            datosUsuarioProduccion.jekuaaRoles.rol = jekuaaRoles.rol.trim()
            datosUsuarioProduccion.jekuaaRoles.secciones = jekuaaRoles.secciones
            datosUsuarioProduccion.jekuaaRoles.instructor = jekuaaRoles.instructor
        }
    }

    // Jekuaa Point
    jekuaaPoint ? datosUsuarioProduccion.jekuaaPoint = jekuaaPoint : ''

    // Contraseña
    contrasenha ? contrasenhaProduccion = contrasenha.trim() : ''

    if ( Object.keys(datosUsuario).length ) {
        datosActualizados.datosUsuario = datosUsuarioProduccion
    }

    if ( contrasenha ) {
        datosActualizados.contrasenha = contrasenhaProduccion
    }

    // Retornar datos para produccion
    return datosActualizados
}

module.exports = funciones

function validarEmail(valor) {
    
    const expresionValida = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i

    return expresionValida.test(valor)

}