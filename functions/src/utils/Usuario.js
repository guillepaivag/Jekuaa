const ErrorJekuaa = require("../models/Error/ErroresJekuaa")
const JekuaaPremium = require("../models/JekuaaPremium")
const JekuaaRoles = require("../models/JekuaaRoles")
const timestamp = require('./Timestamp')
const Instructor = require("../models/TiposUsuarios/Instructor")
const Usuario = require("../models/Usuario")
const validarEmail = require("./emailValido")
const obtenerEdad = require("./obtenerEdad")

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


funciones.construirDatosParaNuevoUsuario = ( datosUsuario, contrasenha, esRutaAdmin ) => {
    
    const {
        uid,
        nombreUsuario,
        correo,
        nombreCompleto,
        fechaNacimiento,
        jekuaaPremium,
        jekuaaRol,
        instructor,
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
    if ( !paraDatosPlanPorDefecto && esRutaAdmin ) {
        datosUsuarioProduccion.jekuaaPremium.plan = jekuaaPremium.plan.trim()
        datosUsuarioProduccion.jekuaaPremium.fechaCompra = timestamp.milliseconds_a_timestamp(jekuaaPremium.fechaCompra)
        datosUsuarioProduccion.jekuaaPremium.fechaHasta = timestamp.milliseconds_a_timestamp(jekuaaPremium.fechaHasta)

    } else {
        // Datos por defectos
        datosUsuarioProduccion.jekuaaPremium.plan = 'gratis'
        datosUsuarioProduccion.jekuaaPremium.fechaCompra = null
        datosUsuarioProduccion.jekuaaPremium.fechaHasta = null
    }
    
    // Rol usuario
    datosUsuarioProduccion.jekuaaRol = jekuaaRol && esRutaAdmin ? jekuaaRol.trim() : 'estudiante'

    // Instructor
    datosUsuarioProduccion.instructor = instructor && esRutaAdmin ? instructor : false

    // Jekuaa Point
    datosUsuarioProduccion.jekuaaPoint = jekuaaPoint && esRutaAdmin ? jekuaaPoint : 0

    // Contraseña
    contrasenhaProduccion = contrasenha.trim()

    // Retornar datos para produccion
    return {
        datosUsuario: datosUsuarioProduccion, 
        contrasenha: contrasenhaProduccion
    }
}

funciones.construirDatosParaActualizarUsuario = ( datosUsuario, contrasenha, esRutaAdmin ) => {
    
    // Cambiamos el formato del cliente al formato servidor
    let resultados = {}
    let datosUsuarioProduccion = {}
    let contrasenhaProduccion = ''

    if (datosUsuario) {
        const {
            uid,
            nombreUsuario,
            correo,
            nombreCompleto,
            fechaNacimiento,
            jekuaaPremium,
            jekuaaRol,
            instructor,
            jekuaaPoint
        } = datosUsuario
    
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
    
        if (esRutaAdmin) {
    
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
            
            // Rol usuario
            jekuaaRol ? 
            datosUsuarioProduccion.jekuaaRol = jekuaaRol : ''
    
            // Instructor
            instructor ? 
            datosUsuarioProduccion.instructor = instructor : ''
    
            // Jekuaa Point
            jekuaaPoint ? 
            datosUsuarioProduccion.jekuaaPoint = jekuaaPoint : ''
        }
    }

    // Contraseña
    contrasenha ? contrasenhaProduccion = contrasenha.trim() : ''

    // Obtener datos
    if ( Object.keys(datosUsuarioProduccion).length ) {
        resultados.datosUsuario = datosUsuarioProduccion
    }

    if ( contrasenhaProduccion ) {
        resultados.contrasenha = contrasenhaProduccion
    }

    // Retornar datos para produccion
    return resultados
}

funciones.construirDatosAutentication = (datosUsuario, datosViejos) => {
    const datosAutenticacion = {}
    
    if ( datosUsuario.nombreUsuario && datosUsuario.nombreUsuario != datosViejos.displayName ) {
        datosAutenticacion.displayName = datosUsuario.nombreUsuario
    }

    if ( datosUsuario.correo && datosUsuario.correo != datosViejos.email ) {
        datosAutenticacion.email = datosUsuario.correo
    }

    return datosAutenticacion
}

funciones.construirDatosReclamosAutenticacion = (datosNuevos, datosReclamosViejos) => {
    const datosReclamosAutenticacion = {}

    if (datosNuevos.jekuaaPremium && datosNuevos.jekuaaPremium.plan != datosReclamosViejos.jekuaaPremium) {
        datosReclamosAutenticacion.jekuaaPremium = datosNuevos.jekuaaPremium.plan
    }

    if (datosNuevos.jekuaaRol && datosNuevos.jekuaaRol != datosReclamosViejos.jekuaaRol) {
        datosReclamosAutenticacion.jekuaaRol = datosNuevos.jekuaaRol
    }

    if (datosNuevos.instructor != undefined && datosNuevos.instructor != datosReclamosViejos.instructor) {
        datosReclamosAutenticacion.instructor = datosNuevos.instructor
    }

    if ( datosReclamosAutenticacion.jekuaaPremium === undefined ) {
        datosReclamosAutenticacion.jekuaaPremium = datosReclamosViejos.jekuaaPremium
    }

    if ( datosReclamosAutenticacion.jekuaaRol === undefined ) {
        datosReclamosAutenticacion.jekuaaRol = datosReclamosViejos.jekuaaRol
    }

    if ( datosReclamosAutenticacion.instructor === undefined ) {
        datosReclamosAutenticacion.instructor = datosReclamosViejos.instructor
    }

    return datosReclamosAutenticacion
}

module.exports = funciones