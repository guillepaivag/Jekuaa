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
        datosPlan,
        rol,
        point
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

    // Premium
    const paraDatosPlanPorDefecto = !datosPlan || datosPlan.plan === 'gratis'
    
    datosUsuarioProduccion.datosPlan = {}
    if ( !paraDatosPlanPorDefecto && esRutaAdmin ) {
        datosUsuarioProduccion.datosPlan.plan = datosPlan.plan.trim()
        datosUsuarioProduccion.datosPlan.fechaCompra = timestamp.milliseconds_a_timestamp(datosPlan.fechaCompra)
        datosUsuarioProduccion.datosPlan.fechaHasta = timestamp.milliseconds_a_timestamp(datosPlan.fechaHasta)

    } else {
        // Datos por defectos
        datosUsuarioProduccion.datosPlan.plan = 'gratis'
        datosUsuarioProduccion.datosPlan.fechaCompra = null
        datosUsuarioProduccion.datosPlan.fechaHasta = null
    }
    
    // Rol usuario
    datosUsuarioProduccion.rol = rol && esRutaAdmin ? rol.trim() : 'estudiante'

    // Point
    datosUsuarioProduccion.point = point && esRutaAdmin ? point : 0

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
            datosPlan,
            rol,
            point
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
    
            // Premium
            if ( datosPlan ) {
                datosUsuarioProduccion.datosPlan = {}
                if ( datosPlan.plan === 'gratis' ) {
                    // Datos por defectos
                    datosUsuarioProduccion.datosPlan.plan = 'gratis'
                    datosUsuarioProduccion.datosPlan.fechaCompra = null
                    datosUsuarioProduccion.datosPlan.fechaHasta = null
                } else {
                    datosUsuarioProduccion.datosPlan.plan = datosPlan.plan.trim()
                    datosUsuarioProduccion.datosPlan.fechaCompra = timestamp.milliseconds_a_timestamp(datosPlan.fechaCompra)
                    datosUsuarioProduccion.datosPlan.fechaHasta = timestamp.milliseconds_a_timestamp(datosPlan.fechaHasta)
                }  
            } 
            
            // Rol usuario
            rol ? 
            datosUsuarioProduccion.rol = rol : ''
    
            // Point
            point ? 
            datosUsuarioProduccion.point = point : ''
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

funciones.construirDatosReclamosAutenticacion = async (datosNuevos, auth) => {
    const datosReclamosAutenticacion = {}
    let reclamosViejos = null

    if ( datosNuevos && (datosNuevos.datosPlan || datosNuevos.rol) ) {
        const datosAuth = await auth.obtener()
        reclamosViejos = datosAuth.customClaims
    }

    if (datosNuevos && datosNuevos.datosPlan && datosNuevos.datosPlan.plan !== reclamosViejos.plan) 
        datosReclamosAutenticacion.datosPlan = datosNuevos.datosPlan.plan

    if (datosNuevos && datosNuevos.rol && datosNuevos.rol !== reclamosViejos.rol) 
        datosReclamosAutenticacion.rol = datosNuevos.rol
    
    if ( !Object.keys( datosReclamosAutenticacion ).length ) return null

    if ( datosReclamosAutenticacion.datosPlan === undefined ) 
        datosReclamosAutenticacion.datosPlan = reclamosViejos.datosPlan
    
    if ( datosReclamosAutenticacion.rol === undefined ) 
        datosReclamosAutenticacion.rol = reclamosViejos.rol

    return Object.keys(datosReclamosAutenticacion).length ? datosReclamosAutenticacion : null
}

module.exports = funciones