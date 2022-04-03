const functions = require('firebase-functions')
const admin = require('../../firebase-service')
const db = require('../../db')
const Miembro = require('../models/Usuarios/TiposUsuarios/Miembro')
const Blog = require('../models/Blogs/Blog')
const ffBlogs = {}

/**
 * Incremetación de contador de cantidad de blogs
*/
ffBlogs.eventoCreacionBlog = functions
.region('southamerica-east1')
.firestore.document('Blogs/{blogId}')
.onCreate(async ( change, context ) => {
    const document = change
    const incrementar = admin.firestore.FieldValue.increment(1)

    const blog = new Blog(document.data())

    // Contador de blgos
    db.collection('Contadores').doc('blogs').update({ cantidad: incrementar })
    
    // Contador de blogs por miembro
    Miembro.actualizarMiembro(blog.publicador, {
        cantidadBlogs: incrementar
    })
})






ffBlogs.eventoActualizacionBlog = functions
.region('southamerica-east1')
.firestore.document('Blogs/{blogId}')
.onUpdate(async ( change, context ) => {
    const docNuevo = change.after
    const docViejo = change.before
    
    const blogNuevo = new Blog(docNuevo.data())
    const blogViejo = new Blog(docViejo.data())

    // Cambio de propietario de blog
})






ffBlogs.eventoEliminacionBlog = functions
.region('southamerica-east1')
.firestore.document('Blogs/{blogId}')
.onDelete(async ( change, context ) => {
    const document = change
    const decrementar = admin.firestore.FieldValue.increment(-1)

    const blog = new Blog(document.data())

    // Contador de blgos
    db.collection('Contadores').doc('blogs').update({ cantidad: decrementar })

    // Contador de blogs por miembro
    Miembro.actualizarMiembro(blog.publicador, {
        cantidadBlogs: decrementar
    })
})






ffBlogs.meGustaBlog = functions
.region('southamerica-east1')
.firestore.document('Usuarios/{uidUsuario}/BlogsMG/{uidBlog}')
.onCreate(async ( change, context ) => {
    const document = change
    const { uidUsuario, uidBlog } = context.params

    const incrementar = admin.firestore.FieldValue.increment(1)
    const ref = db.collection('Blogs').doc(uidBlog)

    ref.update({ cantidadMeGusta: incrementar })
})






ffBlogs.noMeGustaBlog = functions
.region('southamerica-east1')
.firestore.document('Usuarios/{uidUsuario}/BlogsMG/{uidBlog}')
.onDelete(async ( change, context ) => {
    const document = change
    const { uidUsuario, uidBlog } = context.params

    const decrementar = admin.firestore.FieldValue.increment(-1)
    const ref = db.collection('Blogs').doc(uidBlog)

    ref.update({ cantidadMeGusta: decrementar })
})





module.exports = ffBlogs