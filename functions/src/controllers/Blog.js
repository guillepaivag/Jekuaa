const db = require('../../db')
const Blog = require("../models/Blog")
const manejadorErrores = require("../helpers/ManejoErrores")
const Respuesta = require("../models/Respuesta")
const ErrorJekuaa = require("../models/Error/ErroresJekuaa")

const controller = {}

controller.blogConMasMeGusta = async (req, res) => {
    try {
        const respuesta = new Respuesta()
        let codigo = 'jekuaa/exito'

        const ref = db.collection('Blogs')
            .where('habilitado', '==', true)
            .where('publicado', '==', true)
            .orderBy('cantidadMeGusta', 'desc')
            .limit(1)

        const docs = await ref.get()

        if (!docs.docs.length) {
            throw new ErrorJekuaa({
                codigo: 'jekuaa/error/usuario_mala_solicitud',
                mensaje: `No hay blogs disponibles.`
            })
        }

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

controller.listaBlogsPorMG = async (req, res) => {
    try {
        const { body } = req
        const { seccion, categoria, cantidad } = body
        
        const respuesta = new Respuesta()
        let codigo = 'jekuaa/exito'

        let listaBlogs = []
        const ref = db.collection('Blogs')
            .where('habilitado', '==', true)
            .where('publicado', '==', true)
            .where('seccion', '==', seccion)
            .where('categoria', '==', categoria)
            .orderBy('cantidadMeGusta', 'desc')
            .limit(cantidad)

        const documentsBlogs = await ref.get()

        for (let i = 0; i < documentsBlogs.docs.length; i++) {
            const doc = documentsBlogs.docs[i]
            listaBlogs.push(doc.data())
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

controller.ultimosBlogsPorPublicador = async (req, res) => {
    try {
        const { params } = req
        const { uid } = params

        const respuesta = new Respuesta()
        let codigo = 'jekuaa/exito'

        const ref = db.collection('Blogs')
        .where('habilitado', '==', true)
        .where('publicado', '==', true)
        .where('publicador', '==', uid)
        .orderBy('fechaCreacion', 'desc')
        .limit(3)

        const docs = (await ref.get()).docs
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

controller.obtenerDatosBlog = async (req, res) => {
    try {
        const { params } = req
        const { uid } = params

        const esRutaMJ = req.originalUrl.includes('miembroJekuaa')

        const respuesta = new Respuesta()
        let codigo = 'jekuaa/exito'

        const blog = new Blog()
        await blog.importarDatosBlogPorUID( uid )
        if ( !esRutaMJ && (!blog.habilitado || !blog.publicado) ) {
            throw new ErrorJekuaa({
                codigo: 'jekuaa/error/usuario_mala_solicitud',
                mensaje: `Se ha deshabilitado el blog, favor vuelva más tarde.`
            })
        }

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

        const esRutaMJ = req.originalUrl.includes('miembroJekuaa')

        const respuesta = new Respuesta()
        let codigo = 'jekuaa/exito'

        const blog = new Blog()
        await blog.importarDatosBlogPorUID( uid )
        if ( !esRutaMJ && (!blog.habilitado || !blog.publicado) ) {
            throw new ErrorJekuaa({
                codigo: 'jekuaa/error/usuario_mala_solicitud',
                mensaje: `Se ha deshabilitado el blog, favor vuelva más tarde.`
            })
        }

        // Obtener archivo
        const contenido = await Blog.obtenerContenido(uid, 'md')

        // Retornar respuesta
        respuesta.setRespuestaPorCodigo(codigo, {
            mensaje: '¡El contenido del archivo se obtuvo con exito!',
            resultado: contenido
        })
        const status = respuesta.getStatusCode()
        
        return res.status( status ).json( respuesta.getRespuesta() )

    } catch (error) {
        console.log('Error - obtenerContenidoBlog: ', error)

        const {
            status,
            respuesta
        } = manejadorErrores( error )

        return res.status( status ).json( respuesta )
    }
}

controller.paginarListaBlogs = async (req, res) => {
    try {
        const { body, jekuaaDatos = {} } = req
        const { uidSolicitante, datosAuthSolicitante } = jekuaaDatos
        let { ultimaUID, maximoPorPagina, filtros } = body

        const esRutaMiembroJekuaa = req.originalUrl.includes('miembroJekuaa')

        const respuesta = new Respuesta()
        let codigo = 'jekuaa/exito'
        let resultado = null

        if ( !esRutaMiembroJekuaa ) {
            delete filtros.habilitado 
            delete filtros.publicado 
            delete filtros.revision 
        }

        if (!ultimaUID) {
            resultado = await Blog.inicializarListaBlogs({
                maximoPorPagina,
                filtros,
                esRutaMiembroJekuaa,
            })
        } else {
            resultado = await Blog.paginarListaBlogs({
                ultimaUID, 
                maximoPorPagina,
                filtros,
                esRutaMiembroJekuaa,
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

module.exports = controller