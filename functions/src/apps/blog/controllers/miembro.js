const Blog = require("../../../models/Blogs/Blog")
const Respuesta = require("../../../models/Respuesta")
const Miembro = require("../../../models/Usuarios/TiposUsuarios/Miembro")
const manejadorErrores = require("../../../helpers/manejoErrores")

const controller = {}

controller.crearBlog = async (req, res) => {
    
    try {
        const { datos, body } = req
        const { datosBlog, rutaArchivoTemp } = body

        const respuesta = new Respuesta()

        const blogRespuesta = await Miembro.crearBlog(datosBlog, rutaArchivoTemp)

        // Retornar respuesta
        respuesta.setRespuesta({
            estado: 200,
            mensaje: 'exito',
            resultado: blogRespuesta.getBlog(),
        })
        
        return res.status( respuesta.estado ).json( respuesta.getRespuesta() )

    } catch (error) {
        console.log('Error - crearBlog: ', error)

        const respuesta = manejadorErrores( error )
        return res.status( respuesta.estado ).json( respuesta.getRespuesta() )
    }

}

controller.actualizarDatosBlog = async (req, res) => {
    try {
        const { datos, body, params } = req
        const { uidSolicitante, datosAuthSolicitante } = datos
        const { datosBlog, rutaArchivoTemp } = body
        const { uidBlog } = params

        const respuesta = new Respuesta()
        let estado = 'exito'

        const data = await Miembro.actualizarBlog(uidBlog, datosBlog, rutaArchivoTemp)

        // Retornar respuesta
        respuesta.setRespuesta({
            estado: 200,
            mensaje: 'exito',
            resultado: data,
        })
        
        return res.status( respuesta.estado ).json( respuesta.getRespuesta() )

    } catch (error) {
        console.log('Error - actualizarDatosBlog: ', error)

        const respuesta = manejadorErrores( error )
        return res.status( respuesta.estado ).json( respuesta.getRespuesta() )
    }
}

controller.eliminarBlog = async (req, res) => {
    try {
        const { datos, params } = req
        const { uidSolicitante, datosAuthSolicitante } = datos
        const { uidBlog } = params

        const respuesta = new Respuesta()
        let estado = 'exito'

        const blog = new Blog()
        await blog.importarDatosBlogPorUID(uidBlog)

        const datosBlogEliminado = await Miembro.eliminarBlog(uidBlog)

        // Retornar respuesta
        respuesta.setRespuesta({
            estado: 200,
            mensaje: 'exito',
            resultado: datosBlogEliminado,
        })
        
        return res.status( respuesta.estado ).json( respuesta.getRespuesta() )

    } catch (error) {
        console.log('Error - eliminarBlog: ', error)

        const respuesta = manejadorErrores( error )
        return res.status( respuesta.estado ).json( respuesta.getRespuesta() )
    }
}


controller.obtenerDatosBlog = async (req, res) => {
    try {
        const { params } = req
        const { uidBlog } = params

        const respuesta = new Respuesta()
        let estado = 'exito'

        const blog = new Blog()
        await blog.importarDatosBlogPorUID( uidBlog )

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

        // Obtener archivo
        const contenido = await Blog.obtenerContenido(uidBlog, 'md')

        // Retornar respuesta
        respuesta.setRespuesta({
            estado: 200,
            mensaje: 'exito',
            resultado: contenido,
        })
        
        return res.status( respuesta.estado ).json( respuesta.getRespuesta() )

    } catch (error) {
        console.log('Error - obtenerContenidoBlog: ', error)

        const respuesta = manejadorErrores( error )
        return res.status( respuesta.estado ).json( respuesta.getRespuesta() )
    }
}

module.exports = controller