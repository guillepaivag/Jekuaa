const Authentication = require("../models/Authentication")
const JekuaaPremium = require("../models/JekuaaPremium")
const timestamp = require('./timestamp')

const funciones = {}

/**
 * La verificacion de datos requeridos, es una función
 * que observa si existe los datos necesarios y obligatorios
 * de existencia para la existencia de un usuario.
 * Los datos requeridos son: nombreUsuario, correo y la contraseña
 * @param {*} datosUsuario 
 * @param {*} contrasenha 
 * @param {*} confirmacionContrasenha 
 */

funciones.construirDatosParaCrearUsuario = ( datosUsuario, contrasenha, esRutaAdmin ) => {
    
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
        datosUsuarioConstruido: datosUsuarioProduccion, 
        contrasenhaConstruido: contrasenhaProduccion
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
    if ( Object.keys(datosUsuarioProduccion).length ) 
        resultados.datosUsuarioConstruido = datosUsuarioProduccion

    if ( contrasenhaProduccion ) 
        resultados.contrasenhaConstruido = contrasenhaProduccion

    // Retornar datos para produccion
    return resultados
}

funciones.construirDatosAutentication = (datosUsuario) => {
    const datosAutenticacion = {}
    
    if ( datosUsuario ) {
        if ( datosUsuario.nombreUsuario ) datosAutenticacion.displayName = datosUsuario.nombreUsuario
        if ( datosUsuario.correo ) datosAutenticacion.email = datosUsuario.correo
    }

    return Object.keys(datosAutenticacion).length ? datosAutenticacion : null
}

funciones.construirDatosReclamosAutenticacion = async (datosNuevos, auth = new Authentication()) => {
    const datosReclamosAutenticacion = {}
    let reclamosViejos = ''

    if (datosNuevos.jekuaaPremium || datosNuevos.jekuaaRol || datosNuevos.instructor) {
        const datosAuth = await auth.obtener()
        reclamosViejos = datosAuth.customClaims
    }

    if (datosNuevos && datosNuevos.jekuaaPremium && datosNuevos.jekuaaPremium.plan != reclamosViejos.jekuaaPremium) 
        datosReclamosAutenticacion.jekuaaPremium = datosNuevos.jekuaaPremium.plan

    if (datosNuevos && datosNuevos.jekuaaRol && datosNuevos.jekuaaRol != reclamosViejos.jekuaaRol) 
        datosReclamosAutenticacion.jekuaaRol = datosNuevos.jekuaaRol
    
    if (datosNuevos && datosNuevos.instructor != undefined && datosNuevos.instructor != reclamosViejos.instructor) 
        datosReclamosAutenticacion.instructor = datosNuevos.instructor
    
    if ( !Object.keys( datosReclamosAutenticacion ).length ) return null

    if ( datosReclamosAutenticacion.jekuaaPremium === undefined ) 
        datosReclamosAutenticacion.jekuaaPremium = reclamosViejos.jekuaaPremium
    
    if ( datosReclamosAutenticacion.jekuaaRol === undefined ) 
        datosReclamosAutenticacion.jekuaaRol = reclamosViejos.jekuaaRol
    
    if ( datosReclamosAutenticacion.instructor === undefined ) 
        datosReclamosAutenticacion.instructor = reclamosViejos.instructor
    
    return Object.keys(datosReclamosAutenticacion).length ? datosReclamosAutenticacion : null
}

module.exports = funciones