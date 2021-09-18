const utilsRolesSecciones = {}

const datosRoles = require('../../InformacionEstatica/DatosRoles')
const seccionesValidas = require('../../InformacionEstatica/SeccionesValidas')

// ROLES: Funciones para los roles
utilsRolesSecciones.getDatosRoles = () => datosRoles

utilsRolesSecciones.compararNivelRol = ( rolX, rolY ) => {

    const datoRolX = datosRoles.find(datoRol => datoRol.rol === rolX)
    const datoRolY = datosRoles.find(datoRol => datoRol.rol === rolY)

    return datoRolX.nivel - datoRolY.nivel

}

utilsRolesSecciones.esValidoElRol = ( rol ) => {

    const valido = !!datosRoles.find( rolX => rolX.rol === rol )

    return valido
}

utilsRolesSecciones.esMiembroJekuaa = ( rol ) => {
    const datosRol = datosRoles.find( rolX => rolX.rol === rol )

    return datosRol.esMiembroJekuaa
}




// SECCIONES: Funciones para las secciones
utilsRolesSecciones.sonValidasLasSecciones = ( secciones ) => {

    let valido = true

    for (let i = 0; i < secciones.length; i++) {
        const seccion = secciones[i];
        
        valido = !!seccionesValidas.find( seccionX => seccionX === seccion )
        
        if ( !valido ) {
            return false
        }

    }

    return true

}

utilsRolesSecciones.rolNecesitaSecciones = ( rol ) => {
    const datoRol = datosRoles.find( datoRol => datoRol.rol === rol )

    return datoRol.nesecitaSecciones
}




module.exports = utilsRolesSecciones