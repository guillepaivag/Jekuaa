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



// Funciones para agregar un elemento
function agregarSeccion (seccion) {
    secciones[seccion.uid] = {
        ...seccion,
        categorias: {}
    }
}

function agregarCategoria (categoria, idSeccion) {
    secciones[idSeccion].categorias[categoria.uid] = categoria
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
//             },
//         }
//     },
// }