const db = require('../../../../db')
const Blog = require("../../../models/Blogs/Blog")
const Estudiante = require("../../../models/Usuarios/TiposUsuarios/Estudiante")
const Respuesta = require("../../../models/Respuesta")
const Errores = require("../../../models/Error/Errores")
const manejadorErrores = require("../../../helpers/manejoErrores")

const controller = {}

controller.ultimosBlogsPorPublicador = async (req, res) => {
    try {
        const { params } = req
        const { uidUsuario } = params

        const respuesta = new Respuesta()

        const ref = db.collection('Blogs')
        .where('habilitado', '==', true)
        .where('publicado', '==', true)
        .where('publicador', '==', uidUsuario)
        .orderBy('fechaCreacion', 'desc')
        .limit(3)

        const docs = (await ref.get()).docs
        let blogs = []

        for (let index = 0; index < docs.length; index++) {
            const doc = docs[index]
            blogs.push(doc.data())
        }
        
        // Retornar respuesta
        respuesta.setRespuesta({
            estado: 200,
            mensaje: 'exito',
            resultado: blogs,
        })
        
        return res.status( respuesta.estado ).json( respuesta.getRespuesta() )

    } catch (error) {
        console.log('Error - blogConMasMeGusta: ', error)

        const respuesta = manejadorErrores( error )
        return res.status( respuesta.estado ).json( respuesta.getRespuesta() )
    }
}

controller.obtenerDatosBlog = async (req, res) => {
    try {
        const { params } = req
        const { uidBlog } = params

        const respuesta = new Respuesta()

        const blog = new Blog()
        await blog.importarDatosBlogPorUID( uidBlog )
        if ( !blog.habilitado || !blog.publicado ) {
            throw new Errores({
                estado: 400,
                mensajeCliente: `blog_deshabilitado`,
                mensajeServidor: 'El blog esta deshabilitado.',
            })
        }

        // Retornar respuesta
        respuesta.setRespuesta({
            estado: 200,
            mensaje: 'exito',
            resultado: blog.getBlog(),
        })
        
        return res.status( respuesta.estado ).json( respuesta.getRespuesta() )

    } catch (error) {
        console.log('Error - obtenerDatosBlog: ', error)

        const respuesta = manejadorErrores( error )
        return res.status( respuesta.estado ).json( respuesta.getRespuesta() )
    }
}

controller.obtenerContenidoBlog = async ( req, res ) => {
    try {
        const { params } = req
        const { uidBlog } = params

        const respuesta = new Respuesta()
        let estado = 'exito'

        const blog = new Blog()
        await blog.importarDatosBlogPorUID( uidBlog )
        if ( !blog.habilitado || !blog.publicado ) {
            throw new Errores({
                estado: 400,
                mensajeCliente: `blog_deshabilitado`,
                mensajeServidor: 'El blog esta deshabilitado.',
            })
        }

        // Obtener archivo
        const contenido = await Blog.obtenerContenido(uidBlog, 'md')

        // Retornar respuesta
        respuesta.setRespuesta({
            estado: 200,
            mensaje: 'exito',
            resultado: contenido,
        })
        
        console.timeEnd('timeObtenerBlog')
        return res.status( respuesta.estado ).json( respuesta.getRespuesta() )

    } catch (error) {
        console.log('Error - obtenerContenidoBlog: ', error)

        const respuesta = manejadorErrores( error )
        return res.status( respuesta.estado ).json( respuesta.getRespuesta() )
    }
}

controller.darMeGusta = async (req, res) => {
    try {
        const { datos, body, params } = req
        const { uidSolicitante, datosAuthSolicitante } = datos
        const { uidBlog } = params
        const { meGusta } = body

        const respuesta = new Respuesta()
        
        await Estudiante.darMeGustaBlog(uidBlog, uidSolicitante, meGusta)

        // Retornar respuesta
        respuesta.setRespuesta({
            estado: 200,
            mensaje: 'exito',
            resultado: null,
        })
        
        return res.status( respuesta.estado ).json( respuesta.getRespuesta() )

    } catch (error) {
        console.log('Error - darMeGusta: ', error)

        const respuesta = manejadorErrores( error )
        return res.status( respuesta.estado ).json( respuesta.getRespuesta() )
    }
}


module.exports = controller