const datosSecciones = require("../InformacionEstatica/DatosSecciones")

const utils = {}

utils.categoriaPerteneceASeccion = ( seccion, categoria ) => {
    return !!datosSecciones[seccion].categorias[categoria]
}

utils.subcategoriasPertenecenACategoria = ( seccion, categoria, subCategorias ) => {
    
    for (let i = 0; i < subCategorias.length; i++) {
        const subCategoria = subCategorias[i];
        
        const existe = datosSecciones[seccion].categorias[categoria].sub_categorias.find(subCategoriaX => {
            return subCategoriaX === subCategoria
        })

        if ( !existe ) {
            return false
        }
    }

    return true
}

module.exports = utils