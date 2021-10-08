const ErrorJekuaa = require("../models/Error/ErroresJekuaa")
const JekuaaPremium = require("../models/JekuaaPremium")
const JekuaaRoles = require("../models/JekuaaRoles")
const Usuario = require("../models/Usuario")
const utilsRolesSecciones = require("./usuarios/RolesSecciones")
const timestamp = require('./Timestamp')

const funciones = {}

funciones.filtroDeDatosDiferentes = ( datosNuevos, datosViejos ) => {
        
    const {
        nombreUsuario,
        correo,
        nombreCompleto,
        fechaNacimiento,
        jekuaaPremium,
        jekuaaRoles,
        jekuaaPoint
    } = datosNuevos

    const datosUsuarioDBActualizar = {}
    const datosUsuarioAuthActualizar = {}
    const datosUsuarioAuthClaimsActualizar = {}

    const cambioNombreUsuario = nombreUsuario != datosViejos.nombreUsuario
    if ( nombreUsuario && cambioNombreUsuario ) {
        datosUsuarioDBActualizar.nombreUsuario = nombreUsuario
        datosUsuarioAuthActualizar.displayName = nombreUsuario
    }

    const cambioCorreo = correo != datosViejos.correo
    if ( correo && cambioCorreo ) {
        datosUsuarioDBActualizar.correo = correo
        datosUsuarioAuthActualizar.email = correo
    }

    const cambioNombreCompleto = nombreCompleto != datosViejos.nombreCompleto
    if ( nombreCompleto && cambioNombreCompleto ) {
        datosUsuarioDBActualizar.nombreCompleto = nombreCompleto
    }

    if ( fechaNacimiento ) {
        datosUsuarioDBActualizar.fechaNacimiento = fechaNacimiento
    }

    if ( jekuaaPremium ) {
        
        datosUsuarioDBActualizar.jekuaaPremium = new JekuaaPremium().getDatosPremium()

        // PLAN
        if ( JekuaaPremium.tienePlan( jekuaaPremium.plan ) ) {
            datosUsuarioAuthClaimsActualizar.jekuaaPremium = true
            datosUsuarioDBActualizar.jekuaaPremium.plan = jekuaaPremium.plan
            
        } else if ( !JekuaaPremium.tienePlan( jekuaaPremium.plan ) ) {
            datosUsuarioAuthClaimsActualizar.jekuaaPremium = false
            datosUsuarioDBActualizar.jekuaaPremium.plan = ''

        } else {
            datosUsuarioAuthClaimsActualizar.jekuaaPremium = !!datosViejos.jekuaaPremium.plan
            datosUsuarioDBActualizar.jekuaaPremium.plan = datosViejos.jekuaaPremium.plan
        }

        // FECHAS
        if ( !datosUsuarioAuthClaimsActualizar.jekuaaPremium ) {
            datosUsuarioDBActualizar.jekuaaPremium.fechaCompra = null
            datosUsuarioDBActualizar.jekuaaPremium.fechaHasta = null
        } else {
            if ( jekuaaPremium.fechaCompra ) {
                datosUsuarioDBActualizar.jekuaaPremium.fechaCompra = jekuaaPremium.fechaCompra
            } else {
                datosUsuarioDBActualizar.jekuaaPremium.fechaCompra = datosViejos.jekuaaPremium.fechaCompra
            }

            if ( jekuaaPremium.fechaHasta ) {
                datosUsuarioDBActualizar.jekuaaPremium.fechaHasta = jekuaaPremium.fechaHasta
            } else {
                datosUsuarioDBActualizar.jekuaaPremium.fechaHasta = datosViejos.jekuaaPremium.fechaHasta
            }
        }

    }

    if ( jekuaaRoles ) {

        datosUsuarioDBActualizar.jekuaaRoles = new JekuaaRoles().getDatosRoles()
        
        // ROL
        if ( jekuaaRoles.rol ) {
            datosUsuarioAuthClaimsActualizar.rol = jekuaaRoles.rol
            datosUsuarioDBActualizar.jekuaaRoles.rol = jekuaaRoles.rol
        } else {
            datosUsuarioAuthClaimsActualizar.rol = datosViejos.jekuaaRoles.rol
            datosUsuarioDBActualizar.jekuaaRoles.rol = datosViejos.jekuaaRoles.rol
        }

        if ( JekuaaRoles.esEstudiante( datosUsuarioAuthClaimsActualizar.rol ) ) {
            // Para Estudiante
            datosUsuarioDBActualizar.jekuaaRoles.secciones = []
            datosUsuarioDBActualizar.jekuaaRoles.instructor = false

        } else {
            // Para Miembro Jekuaa

            // SECCIONES
            if ( !JekuaaRoles.necesitaSecciones( datosUsuarioAuthClaimsActualizar.rol ) ) {
                datosUsuarioDBActualizar.jekuaaRoles.secciones = []
            } else {
                if ( jekuaaRoles.secciones ) {
                    datosUsuarioDBActualizar.jekuaaRoles.secciones = jekuaaRoles.secciones
                } else {
                    datosUsuarioDBActualizar.jekuaaRoles.secciones = datosViejos.jekuaaRoles.secciones
                }
            }

            // INSTRUCTOR
            if ( jekuaaRoles.instructor ) {
                datosUsuarioDBActualizar.jekuaaRoles.instructor = jekuaaRoles.instructor
            } else {
                datosUsuarioDBActualizar.jekuaaRoles.instructor = datosViejos.jekuaaRoles.instructor
            }

        }
    
    }

    if ( !datosUsuarioAuthClaimsActualizar.jekuaaPremium && datosUsuarioAuthClaimsActualizar.rol ) {
        datosUsuarioAuthClaimsActualizar.jekuaaPremium = !!datosViejos.jekuaaPremium.plan
    }

    if ( datosUsuarioAuthClaimsActualizar.jekuaaPremium && !datosUsuarioAuthClaimsActualizar.rol ) {
        datosUsuarioAuthClaimsActualizar.rol = datosViejos.jekuaaRoles.rol
    }

    const cambioJekuaaPoint = jekuaaPoint != datosViejos.jekuaaPoint
    if ( jekuaaPoint && cambioJekuaaPoint ) {
        datosUsuarioDBActualizar.jekuaaPoint = jekuaaPoint
    }

    return {
        datosUsuarioDBActualizar,
        datosUsuarioAuthActualizar,
        datosUsuarioAuthClaimsActualizar
    }
}

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

funciones.verificarTipoDeDatosCliente = ( datosUsuario, contrasenha, confirmacionContrasenha ) => {
        
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
        const verificadorFormato = new JekuaaPremium()
        verificadorFormato.validarTodosLosTiposDeDatosCliente(jekuaaPremium)
    }

    if ( jekuaaRoles ) {
        if ( typeof jekuaaRoles != 'object' ) {
            throw new TypeError('El campo jekuaaRoles debe ser un objeto.', 'Usuario.js')
        }
        const verificadorFormato = new JekuaaRoles()
        verificadorFormato.validarTodosLosTiposDeDatosCliente(jekuaaRoles)
    }

    if ( jekuaaPoint && typeof jekuaaPoint != 'number' ) {
        throw new TypeError('El jekuaaPoint no es de tipo numerico.', 'Usuario.js')
    }

    if ( contrasenha && typeof contrasenha != 'string' ) {
        throw new TypeError('La contraseña debe ser de tipo string.', 'Usuario.js')
    }

    if ( confirmacionContrasenha && typeof confirmacionContrasenha != 'string' ) {
        throw new TypeError('La confirmación de contraseña debe ser de tipo string.', 'Usuario.js')
    }
}

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
        fechaNacimientoValido = fechaNacimiento * 3.2*Math.pow(10, -11)
        valido = fechaNacimientoValido >= 1
        if ( !valido ) {
            throw new ErrorJekuaa({
                codigo: 'jekuaa/error/usuario_mala_solicitud',
                mensaje: 'El nombre completo debe ser mayor a 0 y menor a 101.'
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

        jekuaaPlan.validarDatosCliente()
    }

    // Jekuaa Roles
    if ( jekuaaRoles ) {
        const jekuaaRol = new JekuaaRoles({
            rol: jekuaaRoles.rol,
            secciones: jekuaaRoles.secciones,
            instructor: jekuaaRoles.instructor
        })
        
        jekuaaRol.validarDatosCliente()
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

    // Contraseñas
    if (contrasenha) {
        cantidadCaracteresValido = contrasenha.length >= 6 && contrasenha.length <= 20
        valido = cantidadCaracteresValido
        if ( !valido ) {
            throw new ErrorJekuaa({
                codigo: 'jekuaa/error/usuario_mala_solicitud',
                mensaje: 'La contraseña debe ser mayor o igual a 6 y menor o igual a 20.'
            })
        }
    }

    if (confirmacionContrasenha) {
        cantidadCaracteresValido = confirmacionContrasenha.length >= 6 && confirmacionContrasenha.length <= 20
        valido = cantidadCaracteresValido
        if ( !valido ) {
            throw new ErrorJekuaa({
                codigo: 'jekuaa/error/usuario_mala_solicitud',
                mensaje: 'La confirmación de contraseña debe ser mayor o igual a 6 y menor o igual a 20.'
            })
        }
    }

    if (contrasenha !== confirmacionContrasenha) {
        throw new ErrorJekuaa({
            codigo: 'jekuaa/error/usuario_mala_solicitud',
            mensaje: 'La contraseña debe ser igual a la confirmación de contraseña.'
        })
    }
}

funciones.construirDatosParaProduccion = ( datosUsuario, contrasenha ) => {
    
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
    datosUsuarioProduccion.jekuaaPoint = jekuaaPoint

    // Contraseña
    contrasenhaProduccion = contrasenha.trim()

    // Retornar datos para produccion
    return {
        datosUsuario: datosUsuarioProduccion, 
        contrasenha: contrasenhaProduccion
    }
}

funciones.construirDatosParaActualizarYVerificarFormatoParaDB = ( datosNuevos, datosViejos ) => {
    
    const {
        datosUsuarioDBActualizar,
        datosUsuarioAuthActualizar,
        datosUsuarioAuthClaimsActualizar
    } = funciones.filtroDeDatosDiferentes( datosNuevos, datosViejos )

    funciones.verificadorDeFormatoParaDB( datosUsuarioDBActualizar )

    return {
        datosUsuarioDBActualizar,
        datosUsuarioAuthActualizar,
        datosUsuarioAuthClaimsActualizar
    }
}

module.exports = funciones



function validarEmail(valor) {
    
    const expresionValida = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i

    return expresionValida.test(valor)

}