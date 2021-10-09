const utilsRolesSecciones = {}

const db = require('../../../db')
const datosRoles = require('../../InformacionEstatica/DatosRoles')
const datosSecciones = require('../../InformacionEstatica/DatosSecciones')

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