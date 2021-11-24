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
    const doc = await ref.get()

    if (!doc.exists) {
        await ref.set({
            cantidad: 1
        })
    } else {
        ref.update({
            cantidad: incrementar
        })
    }

    const seccion = document.data().seccion
    const categoria = document.data().categoria
    const subCategorias = document.data().subCategorias

    if (seccion !== '') {
        incrementarCantidadDeBlogPorDetalles(seccion, categoria, subCategorias, true)
    } else {
        ref.update({
            cantidadSinSeccion: incrementar
        })
    }
    
})

ffBlogs.eventoActualizacionBlog = functions.region('southamerica-east1').firestore.document('Blogs/{blogId}').onUpdate(async ( change, context ) => {
    const docNuevo = change.after
    const docViejo = change.before
    
    incrementarCantidadDeBlogPorDetallesActualizacion(docNuevo, docViejo)
})

ffBlogs.eventoEliminacionBlog = functions.region('southamerica-east1').firestore.document('Blogs/{blogId}').onDelete(async ( change, context ) => {
    const document = change
    const decrementar = admin.firestore.FieldValue.increment(-1)

    const ref = db.collection('Contadores').doc('blogs')

    ref.update({
        cantidad: decrementar
    })

    const seccion = document.data().seccion
    const categoria = document.data().categoria
    const subCategorias = document.data().subCategorias

    if (seccion !== '') {
        incrementarCantidadDeBlogPorDetalles(seccion, categoria, subCategorias, false)
    } else {
        ref.update({
            cantidadSinSeccion: decrementar
        })
    }
})

async function incrementarCantidadDeBlogPorDetallesActualizacion (docNuevo, docViejo) {
    const ref = db.collection('Contadores').doc('blogs')
    const incrementar = admin.firestore.FieldValue.increment(1)
    const decrementar = admin.firestore.FieldValue.increment(-1)
    let doc = null

    // SECCION
    if (docNuevo.data().seccion !== docViejo.data().seccion) {
        if (!docNuevo.data().seccion) {
            ref.update({
                cantidadSinSeccion: incrementar
            })
        } else {
            doc = await ref
            .collection('ContadoresBlogSeccion').doc(docNuevo.data().seccion)
            .get()

            if (!doc.exists) {
                ref
                .collection('ContadoresBlogSeccion').doc(docNuevo.data().seccion)
                .set({
                    cantidad: 1
                })
            } else {
                ref
                .collection('ContadoresBlogSeccion').doc(docNuevo.data().seccion)
                .update({
                    cantidad: incrementar
                })
            }
        }

        if (!docViejo.data().seccion) {
            ref.update({
                cantidadSinSeccion: decrementar
            })
        } else {
            ref
            .collection('ContadoresBlogSeccion').doc(docViejo.data().seccion)
            .update({
                cantidad: decrementar
            })
        }
    }

    // CATEGORIA
    if (docNuevo.data().categoria !== docViejo.data().categoria) {
        if (docNuevo.data().seccion) {
            doc = await ref
            .collection('ContadoresBlogSeccion').doc(docNuevo.data().seccion)
            .collection('ContadoresBlogCategoria').doc(docNuevo.data().categoria)
            .get()

            if (!doc.exists) {
                ref
                .collection('ContadoresBlogSeccion').doc(docNuevo.data().seccion)
                .collection('ContadoresBlogCategoria').doc(docNuevo.data().categoria)
                .set({
                    cantidad: 1
                })
            } else {
                ref
                .collection('ContadoresBlogSeccion').doc(docNuevo.data().seccion)
                .collection('ContadoresBlogCategoria').doc(docNuevo.data().categoria)
                .update({
                    cantidad: incrementar
                })
            }
        }

        if (docViejo.data().seccion) {
            ref
            .collection('ContadoresBlogSeccion').doc(docViejo.data().seccion)
            .collection('ContadoresBlogCategoria').doc(docViejo.data().categoria)
            .update({
                cantidad: decrementar
            })
        }
    }

    // SUB-CATEGORIA
    for (let i = 0; i < docViejo.data().subCategorias.length; i++) {
        const subCategoria = docViejo.data().subCategorias[i]
        
        // Decrementar
        if (!docNuevo.data().subCategorias.includes(subCategoria)) {
            ref
            .collection('ContadoresBlogSeccion').doc(docViejo.data().seccion)
            .collection('ContadoresBlogCategoria').doc(docViejo.data().categoria)
            .collection('ContadoresBlogSubCategoria').doc(subCategoria)
            .update({
                cantidad: decrementar
            })
        }
    }

    for (let i = 0; i < docNuevo.data().subCategorias.length; i++) {
        const subCategoria = docNuevo.data().subCategorias[i]
        
        // Incrementar
        if (!docViejo.data().subCategorias.includes(subCategoria)) {
            doc = await ref
            .collection('ContadoresBlogSeccion').doc(docNuevo.data().seccion)
            .collection('ContadoresBlogCategoria').doc(docNuevo.data().categoria)
            .collection('ContadoresBlogSubCategoria').doc(subCategoria)
            .get()

            if (!doc.exists) {
                ref
                .collection('ContadoresBlogSeccion').doc(docNuevo.data().seccion)
                .collection('ContadoresBlogCategoria').doc(docNuevo.data().categoria)
                .collection('ContadoresBlogSubCategoria').doc(subCategoria)
                .set({
                    cantidad: 1
                })
            } else {
                ref
                .collection('ContadoresBlogSeccion').doc(docNuevo.data().seccion)
                .collection('ContadoresBlogCategoria').doc(docNuevo.data().categoria)
                .collection('ContadoresBlogSubCategoria').doc(subCategoria)
                .update({
                    cantidad: incrementar
                })
            }
        }
    }
}

async function incrementarCantidadDeBlogPorDetalles (seccion, categoria, subCategorias, esIncrementacion) {
    const ref = db.collection('Contadores').doc('blogs')
    const incrementar = admin.firestore.FieldValue.increment(1)
    const decrementar = admin.firestore.FieldValue.increment(-1)
    let doc = null

    if (esIncrementacion) {
        // Seccion
        doc = await ref
        .collection('ContadoresBlogSeccion').doc(seccion)
        .get()

        if (!doc.exists) {
            ref
            .collection('ContadoresBlogSeccion').doc(seccion)
            .set({
                cantidad: 1
            })
        } else {
            ref
            .collection('ContadoresBlogSeccion').doc(seccion)
            .update({
                cantidad: incrementar
            })
        }

        // Categoria
        doc = await ref
        .collection('ContadoresBlogSeccion').doc(seccion)
        .collection('ContadoresBlogCategoria').doc(categoria)
        .get()

        if (!doc.exists) {
            ref
            .collection('ContadoresBlogSeccion').doc(seccion)
            .collection('ContadoresBlogCategoria').doc(categoria)
            .set({
                cantidad: 1
            })
        } else {
            ref
            .collection('ContadoresBlogSeccion').doc(seccion)
            .collection('ContadoresBlogCategoria').doc(categoria)
            .update({
                cantidad: incrementar
            })
        }
        
        // Sub-categorias
        for (let i = 0; i < subCategorias.length; i++) {
            const subCategoria = subCategorias[i]
            
            doc = await ref
            .collection('ContadoresBlogSeccion').doc(seccion)
            .collection('ContadoresBlogCategoria').doc(categoria)
            .collection('ContadoresBlogSubCategoria').doc(subCategoria)
            .get()

            if (!doc.exists) {
                ref
                .collection('ContadoresBlogSeccion').doc(seccion)
                .collection('ContadoresBlogCategoria').doc(categoria)
                .collection('ContadoresBlogSubCategoria').doc(subCategoria)
                .set({
                    cantidad: 1
                })
            } else {
                ref
                .collection('ContadoresBlogSeccion').doc(seccion)
                .collection('ContadoresBlogCategoria').doc(categoria)
                .collection('ContadoresBlogSubCategoria').doc(subCategoria)
                .update({
                    cantidad: incrementar
                })
            }
        }

    } else {
        ref
        .collection('ContadoresBlogSeccion').doc(seccion)
        .update({
            cantidad: decrementar
        })

        ref
        .collection('ContadoresBlogSeccion').doc(seccion)
        .collection('ContadoresBlogCategoria').doc(categoria)
        .update({
            cantidad: decrementar
        })

        for (let i = 0; i < subCategorias.length; i++) {
            const subCategoria = subCategorias[i]
            
            ref
            .collection('ContadoresBlogSeccion').doc(seccion)
            .collection('ContadoresBlogCategoria').doc(categoria)
            .collection('ContadoresBlogSubCategoria').doc(subCategoria)
            .update({
                cantidad: decrementar
            })
        }
    }
}

module.exports = ffBlogs