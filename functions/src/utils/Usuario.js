const JekuaaPremium = require("../models/JekuaaPremium")
const JekuaaRoles = require("../models/JekuaaRoles")

const funciones = {}

funciones.construirDatosParaActualizar = ( datosNuevos, datosViejos ) => {
        
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

funciones.verificadorDeFormatoParaDB = ( datosUsuario ) => {
        
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

funciones.construirDatosParaActualizarYVerificarFormatoParaDB = ( datosNuevos, datosViejos ) => {
    const {
        datosUsuarioDBActualizar,
        datosUsuarioAuthActualizar,
        datosUsuarioAuthClaimsActualizar
    } = funciones.construirDatosParaActualizar( datosNuevos, datosViejos )

    funciones.verificadorDeFormatoParaDB( datosUsuarioDBActualizar )

    return {
        datosUsuarioDBActualizar,
        datosUsuarioAuthActualizar,
        datosUsuarioAuthClaimsActualizar
    }
}

module.exports = funciones