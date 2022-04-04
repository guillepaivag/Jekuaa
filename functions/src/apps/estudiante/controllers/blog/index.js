const db = require('../../../../../db')
const Blog = require("../../../../models/Blogs/Blog")
const Estudiante = require("../../../../models/Usuarios/TiposUsuarios/Estudiante")
const manejadorErrores = require("../../../../helpers/ManejoErrores")
const Respuesta = require("../../../../models/Respuesta")
const Errores = require("../../../../models/Error/Errores")

const controller = {}

controller.ultimosBlogsPorPublicador = async (req, res) => {
    try {
        const { params } = req
        const { uid } = params

        const respuesta = new Respuesta()
        let codigo = 'exito'

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

        const respuesta = new Respuesta()
        let codigo = 'exito'

        const blog = new Blog()
        await blog.importarDatosBlogPorUID( uid )
        if ( !blog.habilitado || !blog.publicado ) {
            throw new Errores({
                codigo: 'error/usuario_mala_solicitud',
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

        const respuesta = new Respuesta()
        let codigo = 'exito'

        const blog = new Blog()
        await blog.importarDatosBlogPorUID( uid )
        if ( !blog.habilitado || !blog.publicado ) {
            throw new Errores({
                codigo: 'error/usuario_mala_solicitud',
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

controller.darMeGusta = async (req, res) => {
    try {
        const { datos, body, params } = req
        const { uidSolicitante, datosAuthSolicitante } = datos
        const { uid } = params
        const { meGusta } = body

        const respuesta = new Respuesta()
        let codigo = 'exito'

        await Estudiante.darMeGustaBlog(uid, uidSolicitante, meGusta)

        const mensaje = meGusta ? '¡Haz dado un me gusta a este blog!' : 'Haz indicado que no te gusta este blog.'
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