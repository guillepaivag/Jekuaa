const admin = require('../../firebase-service')
const db = require('../../db')
const Blog = require("../models/Blog")
const manejadorErrores = require("../helpers/ManejoErrores")
const Respuesta = require("../models/Respuesta")
const AdminJekuaa = require("../models/TiposUsuarios/AdminJekuaa")
const Busboy = require("busboy")
const {
    verificadorDeTipoDeDatos,
    verificadorDeCondicionesDeBlogUsuario, 
    verificadorDeDatosRequeridos,
    verificadorDeDatosConstantes,
    generadorDeDatosParaActualizar
} = require("../utils/Blog")
const { milliseconds_a_timestamp } = require("../utils/Timestamp")
const ErrorJekuaa = require("../models/Error/ErroresJekuaa")
const os = require('os')
const path = require('path')
const fs = require('fs')
const JekuaaRoles = require("../models/JekuaaRoles")
const Usuario = require('../models/Usuario')

const controller = {}

controller.crearBlog = async (req, res) => {
    
    try {
        const { jekuaaDatos, body } = req
        const { uidSolicitante, datosAuthSolicitante } = jekuaaDatos
        const { datosBlog, nombreBlogTemp, rutaArchivoTemp } = body

        const respuesta = new Respuesta()
        let codigo = 'jekuaa/exito'

        // Agregar a Firestore
        const blogRespuesta = await Blog.crearNuevoBlog( datosBlog )

        // Agregar archivo blog (contenido)
        await Blog.subirArchivoAStorage( rutaArchivoTemp, datosBlog.uid )

        // Borrar el archivo creado en el servidor
        fs.unlink(rutaArchivoTemp, (err => {
            if ( err ) {
                console.log('Error al eliminar el archivo temporal: ', err)
                return
            }
        }))

        // Retornar respuesta
        respuesta.setRespuestaPorCodigo(codigo, {
            mensaje: '¡El blog se creo de forma exitosa!',
            resultado: blogRespuesta.getBlog()
        })
        const status = respuesta.getStatusCode()
        
        return res.status( status ).json( respuesta.getRespuesta() )

    } catch (error) {
        console.log('Error - crearBlog: ', error)

        const {
            status,
            respuesta
        } = manejadorErrores( error )

        return res.status( status ).json( respuesta )
    }

}

controller.obtenerDatosBlog = async (req, res) => {
    try {
        const { params } = req
        const { uid } = params

        const respuesta = new Respuesta()
        let codigo = 'jekuaa/exito'

        const blog = new Blog()
        await blog.importarDatosBlogPorUID( uid )

        // Retornar respuesta
        respuesta.setRespuestaPorCodigo(codigo, {
            mensaje: '¡Se obtuvo los datos del blog de forma exitosa!',
            resultado: blog.getBlog()
        })
        const status = respuesta.getStatusCode()
        
        return res.status( status ).json( respuesta.getRespuesta() )

    } catch (error) {
        console.log('Error - obtenerDatosBlog: ', error)

        const {
            status,
            respuesta
        } = manejadorErrores( error )

        return res.status( status ).json( respuesta )
    }
}

controller.obtenerContenidoBlog = async ( req, res ) => {
    try {
        const { params } = req
        const { uid } = params

        const respuesta = new Respuesta()
        let codigo = 'jekuaa/exito'

        const blog = new Blog()
        await blog.importarDatosBlogPorUID( uid )
        const opciones = {
            extensionArchivo: 'md'
        }

        // Obtener archivo
        const contenido = await blog.obtenerContenido( opciones )
        const imgBlog = await Blog.obtenerImagenDelBlog(blog)

        // Retornar respuesta
        respuesta.setRespuestaPorCodigo(codigo, {
            mensaje: '¡El contenido del archivo se obtuvo con exito!',
            resultado: {
                contenido, 
                imgBlog,
            }
        })
        const status = respuesta.getStatusCode()
        
        return res.status( status ).send( respuesta.getResultado() )

    } catch (error) {
        console.log('Error - obtenerContenidoBlog: ', error)

        const {
            status,
            respuesta
        } = manejadorErrores( error )

        return res.status( status ).json( respuesta )
    }
}

controller.obtenerBlog = async ( req, res ) => {
    try {
        const { params } = req
        const { uid } = params

        const respuesta = new Respuesta()
        let codigo = 'jekuaa/exito'
        const opciones = {
            extensionArchivo: 'md'
        }

        const blog = new Blog()
        await blog.importarDatosBlogPorUID( uid )

        // Obtener archivo
        const contenido = await blog.obtenerContenido( opciones )

        // Retornar respuesta
        respuesta.setRespuestaPorCodigo(codigo, {
            mensaje: '¡El contenido del archivo se obtuvo con exito!',
            resultado: {
                datosBlog: blog.getBlog(),
                contenido
            }
        })
        const status = respuesta.getStatusCode()
        
        return res.status( status ).send( respuesta.getResultado() )

    } catch (error) {
        console.log('Error - obtenerContenidoBlog: ', error)

        const {
            status,
            respuesta
        } = manejadorErrores( error )

        return res.status( status ).json( respuesta )
    }
}

controller.listaBlogsPorMG = async (req, res) => {
    try {
        const { body } = req
        const { seccion, categoria, cantidad } = body
        
        const respuesta = new Respuesta()
        let codigo = 'jekuaa/exito'

        let listaBlogs = []
        const ref = db.collection('Blogs')
            .where('seccion', '==', seccion)
            .where('categoria', '==', categoria)
            .orderBy('cantidadMeGusta', 'desc')
            .limit(cantidad)

        const documentsBlogs = await ref.get()

        for (let i = 0; i < documentsBlogs.docs.length; i++) {
            const doc = documentsBlogs.docs[i]
            const uidPublicador = doc.data().publicador
            const datosAuthPublicador = await Usuario.verDatosAuthPorUID( uidPublicador )
            const imgBlog = await Blog.obtenerImagenDelBlog(new Blog(doc.data()))
            const datosBlog = {
                imgBlog: imgBlog,
                blog: doc.data(),
                publicador: {
                    nombreUsuario: datosAuthPublicador.displayName,
                    fotoPerfil: datosAuthPublicador.photoURL ? datosAuthPublicador.photoURL : '',
                }
            }
            listaBlogs.push(datosBlog)
        }
        
        // Retornar respuesta
        respuesta.setRespuestaPorCodigo(codigo, {
            mensaje: '¡Lista de blogs creada!',
            resultado: listaBlogs
        })
        const status = respuesta.getStatusCode()
        
        return res.status( status ).json( respuesta.getRespuesta() )

    } catch (error) {
        console.log('Error - listaBlogsPorMG: ', error)

        const {
            status,
            respuesta
        } = manejadorErrores( error )

        return res.status( status ).json( respuesta )
    }
}

controller.blogConMasMeGusta = async (req, res) => {
    try {
        const respuesta = new Respuesta()
        let codigo = 'jekuaa/exito'

        const ref = db.collection('Blogs')
            .orderBy('cantidadMeGusta', 'desc')
            .limit(1)

        const docs = await ref.get()

        const doc = docs.docs[0]

        const blogMasMeGusta = doc.data()
        
        // Retornar respuesta
        respuesta.setRespuestaPorCodigo(codigo, {
            mensaje: '¡Blog con mas me gusta!',
            resultado: blogMasMeGusta
        })
        const status = respuesta.getStatusCode()
        
        return res.status( status ).json( respuesta.getRespuesta() )

    } catch (error) {
        console.log('Error - blogConMasMeGusta: ', error)

        const {
            status,
            respuesta
        } = manejadorErrores( error )

        return res.status( status ).json( respuesta )
    }
}

controller.ultimosBlogsPorPublicador = async (req, res) => {
    try {
        const { params } = req
        const { uid } = params

        const respuesta = new Respuesta()
        let codigo = 'jekuaa/exito'

        const ref = db.collection('Blogs').where('publicador', '==', uid).orderBy('fechaCreacion', 'desc').limit(3)

        const docs = await (await ref.get()).docs
        let blogs = []

        for (let index = 0; index < docs.length; index++) {
            const doc = docs[index]
            
            blogs.push(doc.data())
        }
        
        // Retornar respuesta
        respuesta.setRespuestaPorCodigo(codigo, {
            mensaje: '¡Lista de blogs más recientes por usuario!',
            resultado: blogs
        })
        const status = respuesta.getStatusCode()
        
        return res.status( status ).json( respuesta.getRespuesta() )

    } catch (error) {
        console.log('Error - blogConMasMeGusta: ', error)

        const {
            status,
            respuesta
        } = manejadorErrores( error )

        return res.status( status ).json( respuesta )
    }
}

controller.paginarListaBlogs = async (req, res) => {
    try {
        const { body, params } = req
        const {  } = params
        let { ultimaUID, maximoPorPagina, filtros } = body

        const respuesta = new Respuesta()
        let codigo = 'jekuaa/exito'

        let resultado = null

        if (!ultimaUID) {
            resultado = await Blog.inicializarListaBlogs({
                maximoPorPagina,
                filtros
            })
        } else {
            resultado = await Blog.paginarListaBlogs({
                ultimaUID, 
                maximoPorPagina,
                filtros,
            })
        }

        // Retornar respuesta
        respuesta.setRespuestaPorCodigo(codigo, {
            mensaje: 'Se obtuvieron los blogs de forma correcta.',
            resultado
        })
        const status = respuesta.getStatusCode()
        
        return res.status( status ).json( respuesta.getRespuesta() )

    } catch (error) {
        console.log('Error - paginarBlogs: ', error)

        const {
            status,
            respuesta
        } = manejadorErrores( error )

        return res.status( status ).json( respuesta )
    }
}

controller.actualizarDatosBlog = async (req, res) => {
    try {
        const { jekuaaDatos, body, params } = req
        const { uidSolicitante, datosAuthSolicitante } = jekuaaDatos
        const { datosBlog, nombreBlogTemp, rutaArchivoTemp } = body
        const { uid } = params

        const respuesta = new Respuesta()
        let codigo = 'jekuaa/exito'

        // Actualizar a Firestore
        let blogRespuesta
        if (datosBlog && Object.keys(datosBlog).length) {
            blogRespuesta = await Blog.actualizarBlog( uid, datosBlog )
        }

        // Actualizar archivo blog (contenido)
        let archivoCreado
        if (rutaArchivoTemp) {
            archivoCreado = await Blog.subirArchivoAStorage( rutaArchivoTemp, uid )
        }

        // Borrar el archivo creado en el servidor
        fs.unlink(rutaArchivoTemp, (err => {
            if ( err ) {
                console.log('Error al eliminar el archivo temporal: ', err)
                return
            }
        }))

        const data = {}
        blogRespuesta ? data.blogRespuesta = blogRespuesta : ''
        archivoCreado ? data.archivoCreado = archivoCreado : ''

        // Retornar respuesta
        respuesta.setRespuestaPorCodigo(codigo, {
            mensaje: '¡Se actualizó los datos del blog de forma exitosa!',
            resultado: data
        })
        const status = respuesta.getStatusCode()
        
        return res.status( status ).json( respuesta.getRespuesta() )

    } catch (error) {
        console.log('Error - actualizarDatosBlog: ', error)

        const {
            status,
            respuesta
        } = manejadorErrores( error )

        return res.status( status ).json( respuesta )
    }
}

controller.eliminarBlog = async (req, res) => {
    try {
        const { jekuaaDatos, params } = req
        const { uidSolicitante, datosAuthSolicitante } = jekuaaDatos
        const { uid } = params

        const respuesta = new Respuesta()
        let codigo = 'jekuaa/exito'

        // Eliminar los datos del blog en Firestore
        const datosBlogEliminado = await Blog.eliminarBlog( uid )

        // Eliminar el archivo del blog en Storage
        await Blog.eliminarArchivoBlog( uid )

        // Retornar respuesta
        respuesta.setRespuestaPorCodigo(codigo, {
            mensaje: '¡Se elimino el blog de forma exitosa!',
            resultado: datosBlogEliminado
        })
        const status = respuesta.getStatusCode()
        
        return res.status( status ).json( respuesta.getRespuesta() )

    } catch (error) {
        console.log('Error - eliminarBlog: ', error)

        const {
            status,
            respuesta
        } = manejadorErrores( error )

        return res.status( status ).json( respuesta )
    }
}

controller.darMeGusta = async (req, res) => {
    try {
        const { jekuaaDatos, body, params } = req
        const { uidSolicitante, datosAuthSolicitante, refBlogMG, docBlogMG } = jekuaaDatos
        const { uid } = params
        const { meGusta } = body

        const respuesta = new Respuesta()
        let codigo = 'jekuaa/exito'

        const blog = new Blog()
        await blog.importarDatosBlogPorUID(uid)

        if (blog.getBlog().cantidadMeGusta === 0 && !meGusta) {
            // Retornar respuesta
            respuesta.setRespuestaPorCodigo('jekuaa/error/usuario_mala_solicitud', {
                mensaje: '¡No hay me gusta en este blog!',
                resultado: null
            })
            const status = respuesta.getStatusCode()
            
            return res.status( status ).json( respuesta.getRespuesta() )
        }
        
        // Crear Me gusta del usuario
        if (meGusta) {
            refBlogMG.set({
                uid: uid,
                fechaMeGusta: milliseconds_a_timestamp( Date.now() )
            })
        } else {
            refBlogMG.delete()
        }

        const cantidadActual = blog.getBlog().cantidadMeGusta + (meGusta ? 1 : -1)
        const mensaje = meGusta ? '¡Haz dado un me gusta a este blog!' : 'Haz indicado que no te gusta este blog.'

        // Aumentar el contador de MeGustas
        blog.actualizarBlog({
            cantidadMeGusta: cantidadActual
        })

        // Retornar respuesta
        respuesta.setRespuestaPorCodigo(codigo, {
            mensaje,
            resultado: null
        })
        const status = respuesta.getStatusCode()
        
        return res.status( status ).json( respuesta.getRespuesta() )

    } catch (error) {
        console.log('Error - darMeGusta: ', error)

        const {
            status,
            respuesta
        } = manejadorErrores( error )

        return res.status( status ).json( respuesta )
    }
}

module.exports = controller