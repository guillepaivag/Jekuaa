const utilsRolesSecciones = {}

const datosRoles = require('../../InformacionEstatica/DatosRoles')
const datosSecciones = require('../../InformacionEstatica/DatosSecciones')

/**
 * ROLES: Funciones para los roles
 */

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

utilsRolesSecciones.rolNecesitaSecciones = ( rol ) => {
    const datoRol = datosRoles.find( datoRol => datoRol.rol === rol )

    return datoRol.nesecitaSecciones
}







/**
 * SECCIONES: Funciones para las secciones
 */



/**
 * 
 * @returns 
 */
utilsRolesSecciones.getDatosSecciones = () => datosSecciones

/**
 * 
 * @returns 
 */
utilsRolesSecciones.getSeccionesValidas = () => Object.keys( datosSecciones ) 


/**
 * 
 * @param {*} secciones 
 * @returns 
 */
utilsRolesSecciones.sonValidasLasSecciones = ( secciones ) => {

    let valido = true
    let seccionesValidas = utilsRolesSecciones.getSeccionesValidas()

    for (let i = 0; i < secciones.length; i++) {
        const seccion = secciones[i];
        
        valido = !!seccionesValidas.find( seccionX => seccionX === seccion )
        
        if ( !valido ) {
            return false
        }

    }

    return true

}







/**
 * CATEGORIAS: Funciones para las categorias
 */



/**
 * 
 * @param {*} seccion 
 * @returns 
 */
utilsRolesSecciones.categoriasPorSeccion = ( seccion ) => {
    return Object.keys( datosSecciones[seccion].categorias )
}


/**
 * 
 * @param {*} seccion 
 * @param {*} categorias 
 * @returns 
 */
utilsRolesSecciones.sonValidasLasCategorias = ( seccion, categorias ) => {

    let valido = true
    let categoriasValidas = utilsRolesSecciones.categoriasPorSeccion( seccion )

    for (let i = 0; i < categorias.length; i++) {
        const categoria = categorias[i];
        
        valido = !!categoriasValidas.find( categoriaX => categoriaX === categoria )
        
        if ( !valido ) {
            return false
        }

    }

    return true

}








/**
 * SUB-CATEGORIAS: Funciones para las sub-categorias
 */



/**
 * 
 * @param {*} seccion 
 * @param {*} categoria 
 * @returns 
 */
utilsRolesSecciones.subcategoriasPorSeccionCategoria = ( seccion, categoria ) => {

    return datosSecciones[seccion].categorias[categoria].sub_categorias

}

module.exports = utilsRolesSecciones