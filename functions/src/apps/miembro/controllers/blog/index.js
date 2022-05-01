const manejadorErrores = require("../../../../helpers/ManejoErrores")
const Blog = require("../../../../models/Blogs/Blog")
const Errores = require("../../../../models/Error/Errores")
const Respuesta = require("../../../../models/Respuesta")
const Miembro = require("../../../../models/Usuarios/TiposUsuarios/Miembro")

const controller = {}

controller.crearBlog = async (req, res) => {
    
    try {
        const { datos, body } = req
        const { datosBlog, rutaArchivoTemp } = body

        const respuesta = new Respuesta()
        let codigo = 'exito'

        const blogRespuesta = await Miembro.crearBlog(datosBlog, rutaArchivoTemp)

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

controller.actualizarDatosBlog = async (req, res) => {
    try {
        const { datos, body, params } = req
        const { uidSolicitante, datosAuthSolicitante } = datos
        const { datosBlog, rutaArchivoTemp } = body
        const { uid } = params

        const respuesta = new Respuesta()
        let codigo = 'exito'

        const data = await Miembro.actualizarBlog(uid, datosBlog, rutaArchivoTemp)

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
        const { datos, params } = req
        const { uidSolicitante, datosAuthSolicitante } = datos
        const { uid } = params

        const respuesta = new Respuesta()
        let codigo = 'exito'

        const blog = new Blog()
        await blog.importarDatosBlogPorUID(uid)

        const datosBlogEliminado = await Miembro.eliminarBlog(uid)

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


controller.obtenerDatosBlog = async (req, res) => {
    try {
        const { params } = req
        const { uid } = params

        const respuesta = new Respuesta()
        let codigo = 'exito'

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
        let codigo = 'exito'

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

module.exports = controller