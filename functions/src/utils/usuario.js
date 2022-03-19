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

funciones.construirDatosParaCrearUsuario = ( datosUsuario, contrasenha ) => {
    
    const {
        uid,
        nombreUsuario,
        correo,
        nombreCompleto,
        fechaNacimiento,
        plan,
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

    // Plan
    datosUsuarioProduccion.plan = 'gratis'
    
    // Rol
    datosUsuarioProduccion.rol = 'estudiante'

    // Point
    datosUsuarioProduccion.point = 0

    // Contraseña
    contrasenhaProduccion = contrasenha.trim()

    // Retornar datos para produccion
    return {
        datosUsuarioConstruido: datosUsuarioProduccion, 
        contrasenhaConstruido: contrasenhaProduccion
    }
}

funciones.construirDatosParaActualizarUsuario = ( datosUsuario, contrasenha ) => {
    
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
            plan,
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

    if ( datosNuevos && (datosNuevos.plan || datosNuevos.rol) ) {
        const datosAuth = await auth.obtener()
        reclamosViejos = datosAuth.customClaims
    }

    if (datosNuevos && datosNuevos.plan !== reclamosViejos.plan) 
        datosReclamosAutenticacion.plan = datosNuevos.plan

    if (datosNuevos && datosNuevos.rol !== reclamosViejos.rol) 
        datosReclamosAutenticacion.rol = datosNuevos.rol
    
    if ( !Object.keys( datosReclamosAutenticacion ).length ) return null

    if ( datosReclamosAutenticacion.plan === undefined ) 
        datosReclamosAutenticacion.plan = reclamosViejos.plan
    
    if ( datosReclamosAutenticacion.rol === undefined ) 
        datosReclamosAutenticacion.rol = reclamosViejos.rol

    return Object.keys(datosReclamosAutenticacion).length ? datosReclamosAutenticacion : null
}

module.exports = funciones