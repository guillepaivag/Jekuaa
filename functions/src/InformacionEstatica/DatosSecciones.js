function agregarDatoSeccion ( seccion, categoria, datosSubCategoria ) {
    if ( !datosSecciones[seccion] ) {
        datosSecciones[seccion] = {}
    }

    agregarCategoria( seccion, categoria, datosSubCategoria )
}

function agregarCategoria ( seccion, categoria, datosSubCategoria ) {
    if ( !datosSecciones[seccion].categorias ) {
        datosSecciones[seccion].categorias = {}
    }
    
    if ( !datosSecciones[seccion].categorias[categoria] ) {
        datosSecciones[seccion].categorias[categoria] = {}
    }

    agregarSubCategoria( seccion, categoria, datosSubCategoria )
}

function agregarSubCategoria ( seccion, categoria, datosSubCategoria ) {
    datosSecciones[seccion].categorias[categoria].sub_categorias = datosSubCategoria
}

const datosSecciones = {}

agregarDatoSeccion('informatica', 'desarrollo_web', [
    'vue.js',
    'javascript'
])
agregarDatoSeccion('informatica', 'algoritmos', [
    'dijkstra',
    'sort-shell'
])
agregarDatoSeccion('matematica', 'calculo', [
    'calculo_vectorial'
])

module.exports = datosSecciones