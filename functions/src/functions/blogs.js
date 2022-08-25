const functions = require('firebase-functions')
const admin = require('../../firebase-service')
const db = require('../../db')
const Miembro = require('../models/Usuarios/TiposUsuarios/Miembro')
const Blog = require('../models/Blogs/Blog')
const ffBlogs = {}

const incrementar = admin.firestore.FieldValue.increment(1)
const decrementar = admin.firestore.FieldValue.increment(-1)

/**
 * Incremetación de contador de cantidad de blogs
*/
ffBlogs.eventoCreacionBlog = functions
.region('southamerica-east1')
.firestore.document('Blogs/{blogId}')
.onCreate(async ( change, context ) => {
    const document = change

    const blog = new Blog(document.data())

    if (blog.habilitado && blog.publicado) {
        // Contador de blgos
        db.collection('Contadores').doc('blogs').update({ cantidad: incrementar })
        
        // Contador de blogs por miembro
        Miembro.actualizarMiembro(blog.publicador, {
            cantidadBlogs: incrementar
        })
    }

})






ffBlogs.eventoActualizacionBlog = functions
.region('southamerica-east1')
.firestore.document('Blogs/{blogId}')
.onUpdate(async ( change, context ) => {
    const docNuevo = change.after
    const docViejo = change.before

    const { blogId } = context.params
    
    const blogNuevo = new Blog(docNuevo.data())
    const blogViejo = new Blog(docViejo.data())

    const datosActualizados = {}
    const mensajesError = []

    if ( blogNuevo.titulo === '' ) 
        mensajesError.push('Falta un titulo para el blog.')

    if ( blogNuevo.referencia === '' ) 
        mensajesError.push('Falta una referencia URL para el blog.')

    if ( blogNuevo.descripcion === '' ) 
        mensajesError.push('Falta una descripción para el blog.')

    // Verificar si tiene contenido
    const contenido = await Blog.obtenerContenido(blogId, 'html')
    let soloTexto = contenido.replace(/(<([^>]+)>)/ig, '')
    soloTexto =  soloTexto.replace(/[\n\r]+/g, '')
    soloTexto = soloTexto.replace(/\s{2,10}/g, ' ')
    soloTexto = soloTexto.trim()

    if (!soloTexto.length) 
        mensajesError.push('Falta contenido para el blog.')

    datosActualizados.contieneErrores = !!mensajesError.length
    datosActualizados.mensajesError = mensajesError
    datosActualizados.habilitado = !mensajesError.length

    blogNuevo.contieneErrores = datosActualizados.contieneErrores
    blogNuevo.mensajesError = datosActualizados.mensajesError
    blogNuevo.habilitado = datosActualizados.habilitado

    if ( Object.keys(datosActualizados).length ) {
        db
        .collection('Blogs').doc(blogId)
        .update(datosActualizados)
    }

    const blogViejoActivado = blogViejo.publicado && blogViejo.habilitado
    const blogNuevoActivado = blogNuevo.publicado && blogNuevo.habilitado

    if (!blogViejoActivado && blogNuevoActivado) {
        // Contador de blgos
        db.collection('Contadores').doc('blogs').update({ cantidad: incrementar })
        
        // Contador de blogs por miembro
        Miembro.actualizarMiembro(blogNuevo.publicador, {
            cantidadBlogs: incrementar
        })
    }

    if (blogViejoActivado && !blogNuevoActivado) {
        // Contador de blgos
        db.collection('Contadores').doc('blogs').update({ cantidad: decrementar })
        
        // Contador de blogs por miembro
        Miembro.actualizarMiembro(blogNuevo.publicador, {
            cantidadBlogs: decrementar
        })
    }
})






ffBlogs.meGustaBlog = functions
.region('southamerica-east1')
.firestore.document('Usuarios/{uidUsuario}/BlogsMG/{uidBlog}')
.onCreate(async ( change, context ) => {
    const document = change
    const { uidUsuario, uidBlog } = context.params

    const ref = db.collection('Blogs').doc(uidBlog)

    ref.update({ cantidadMeGusta: incrementar })
})






ffBlogs.noMeGustaBlog = functions
.region('southamerica-east1')
.firestore.document('Usuarios/{uidUsuario}/BlogsMG/{uidBlog}')
.onDelete(async ( change, context ) => {
    const document = change
    const { uidUsuario, uidBlog } = context.params

    const ref = db.collection('Blogs').doc(uidBlog)

    ref.update({ cantidadMeGusta: decrementar })
})





module.exports = ffBlogs