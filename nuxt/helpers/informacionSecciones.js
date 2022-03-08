let secciones = {}


// Secciones
agregarSecciones([
    {
        uid: 'informatica',
        nombre: 'Informática',
    },
    {
        uid: 'matematica',
        nombre: 'Matemática',
    },
])



// Categorias
agregarCategorias([
    {
        uid: 'algoritmos',
        nombre: 'Algoritmos',
    },
    {
        uid: 'desarrollo-web',
        nombre: 'Desarrollo Web',
    },
    {
        uid: 'redes',
        nombre: 'Redes',
    },
], 'informatica')

agregarCategorias([
    {
        uid: 'calculo',
        nombre: 'Cálculo',
    },
], 'matematica')






// Subcategorias
agregarSubCategorias([
    {
        uid: 'busqueda',
        nombre: 'Busqueda',
    },
    {
        uid: 'eficiencia',
        nombre: 'Eficiencia',
    },
    {
        uid: 'ordenacion',
        nombre: 'Ordenación',
    },
], 'informatica', 'algoritmos')

agregarSubCategorias([
    {
        uid: 'disenho-web',
        nombre: 'Diseño web',
    },
    {
        uid: 'vuejs',
        nombre: 'Vue.js',
    },
], 'informatica', 'desarrollo-web')

agregarSubCategorias([
    {
        uid: 'tcp',
        nombre: 'TCP',
    },
], 'informatica', 'redes')

agregarSubCategorias([
    {
        uid: 'derivada',
        nombre: 'Derivada',
    },
], 'matematica', 'calculo')

export default secciones





// Funciones para agregar varios elementos
function agregarSecciones (secciones) {
    for (let i = 0; i < secciones.length; i++) {
        const seccion = secciones[i]
        agregarSeccion(seccion)
    }
}

function agregarCategorias (categorias, idSeccion) {
    for (let i = 0; i < categorias.length; i++) {
        const categoria = categorias[i]
        agregarCategoria(categoria, idSeccion)
    }
}

function agregarSubCategorias (subCategorias, idSeccion, idCategoria) {
    for (let i = 0; i < subCategorias.length; i++) {
        const subCategoria = subCategorias[i]
        agregarSubCategoria(subCategoria, idSeccion, idCategoria)
    }
}


// Funciones para agregar un elemento
function agregarSeccion (seccion) {
    secciones[seccion.uid] = {
        ...seccion,
        categorias: {}
    }
}

function agregarCategoria (categoria, idSeccion) {
    secciones[idSeccion].categorias[categoria.uid] = {
        ...categoria,
        subCategorias: {}
    }
}

function agregarSubCategoria (subCategoria, idSeccion, idCategoria) {
    secciones[idSeccion].categorias[idCategoria].subCategorias[subCategoria.uid] = subCategoria
}












/*
 * Estructura: 
 * 
*/

// let secciones = {
//     informatica: {
//         uid: 'informatica',
//         nombre: 'Informática',
//         categorias: {
//             algoritmos: {
//                 uid: 'algoritmos',
//                 nombre: 'Algoritmos',
//                 subCategorias: {
//                     busqueda: {
//                         uid: 'busqueda',
//                         nombre: 'Busqueda',
//                     },
//                 }
//             },
//         }
//     },
// }