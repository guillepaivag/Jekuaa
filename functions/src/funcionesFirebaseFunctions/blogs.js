const functions = require('firebase-functions')
const admin = require('../../firebase-service')
const db = require('../../db')
const ffBlogs = {}

/**
 * Incremetación de contador de cantidad de blogs
*/
ffBlogs.eventoCreacionBlog = functions.region('southamerica-east1').firestore.document('Blogs/{blogId}').onCreate(async ( change, context ) => {
    const document = change
    const incrementar = admin.firestore.FieldValue.increment(1)

    const ref = db.collection('Contadores').doc('blogs')
    
    ref.update({
        cantidad: incrementar
    })

    const seccion = document.data().seccion
    const categoria = document.data().categoria
    const subCategorias = document.data().subCategorias
    
    incrementarCantidadDeBlogPorDetalles(ref, seccion, categoria, subCategorias, true)
    
})

ffBlogs.eventoEliminacionBlog = functions.region('southamerica-east1').firestore.document('Blogs/{blogId}').onUpdate(async ( change, context ) => {
    
})

ffBlogs.eventoEliminacionBlog = functions.region('southamerica-east1').firestore.document('Blogs/{blogId}').onDelete(async ( change, context ) => {
    const document = change
    const decrementar = admin.firestore.FieldValue.increment(-1)

    db.collection('Contadores').doc('blogs').update({
        cantidad: decrementar
    })

    const seccion = document.data().seccion
    const categoria = document.data().categoria
    const subCategorias = document.data().subCategorias

    incrementarCantidadDeBlogPorDetalles(ref, seccion, categoria, subCategorias, false)
})

function incrementarCantidadDeBlogPorDetalles (ref, seccion, categoria, subCategorias, esIncrementacion) {
    const incrementar = admin.firestore.FieldValue.increment(1)
    const decrementar = admin.firestore.FieldValue.increment(-1)

    ref
    .collection('ContadoresBlogSeccion').doc(seccion)
    .update({
        cantidad: esIncrementacion ? incrementar : decrementar
    })

    ref
    .collection('ContadoresBlogSeccion').doc(seccion)
    .collection('ContadoresBlogCategoria').doc(categoria)
    .update({
        cantidad: esIncrementacion ? incrementar : decrementar
    })

    for (let i = 0; i < subCategorias.length; i++) {
        const subCategoria = subCategorias[i]
        
        ref
        .collection('ContadoresBlogSeccion').doc(seccion)
        .collection('ContadoresBlogCategoria').doc(categoria)
        .collection('ContadoresBlogSubCategoria').doc(subCategoria)
        .update({
            cantidad: esIncrementacion ? incrementar : decrementar
        })
    }
}

module.exports = ffBlogs