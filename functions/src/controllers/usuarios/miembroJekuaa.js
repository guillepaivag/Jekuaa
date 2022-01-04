const manejadorErrores = require("../../helpers/ManejoErrores")
const Respuesta = require("../../models/Respuesta")
const MiembroJekuaa = require("../../models/ComponentesUsuario/TiposUsuarios/MiembroJekuaa")

const controller = {}

controller.crearBlog = async (req, res) => {
    
    try {
        const { jekuaaDatos, body } = req
        const { datosBlog, nombreBlogTemp, rutaArchivoTemp } = body

        const respuesta = new Respuesta()
        let codigo = 'jekuaa/exito'

        const blogRespuesta = await MiembroJekuaa.crearBlog(datosBlog, rutaArchivoTemp)

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
        const { jekuaaDatos, body, params } = req
        const { uidSolicitante, datosAuthSolicitante } = jekuaaDatos
        const { datosBlog, nombreBlogTemp, rutaArchivoTemp } = body
        const { uid } = params

        const respuesta = new Respuesta()
        let codigo = 'jekuaa/exito'

        const data = await MiembroJekuaa.actualizarBlog(uid, datosBlog, rutaArchivoTemp)

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

        const datosBlogEliminado = await MiembroJekuaa.eliminarBlog(uid)

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

controller.crearCurso = async (req, res) => {
    try {
        const { jekuaaDatos, body } = req
        const {  } = body

        const respuesta = new Respuesta()
        let codigo = 'jekuaa/exito'

        // Crear documento curso

        // Crear documentos de unidades por curso

        // Crear documentos de clases por curso

        // Crear archivos para cada clase por curso

        // Retornar respuesta
        respuesta.setRespuestaPorCodigo(codigo, {
            mensaje: '¡Se creó un curso!',
            resultado: blogRespuesta.getBlog()
        })
        const status = respuesta.getStatusCode()
        
        return res.status( status ).json( respuesta.getRespuesta() )
    } catch (error) {
        console.log('Error - crearCurso: ', error)

        const {
            status,
            respuesta
        } = manejadorErrores( error )

        return res.status( status ).json( respuesta )
    }
}

controller.actualizarCurso = async (req, res) => {
    try {
        const { jekuaaDatos, body } = req
        const {  } = body

        const respuesta = new Respuesta()
        let codigo = 'jekuaa/exito'



        // Retornar respuesta
        respuesta.setRespuestaPorCodigo(codigo, {
            mensaje: '¡Se actualizó un curso!',
            resultado: blogRespuesta.getBlog()
        })
        const status = respuesta.getStatusCode()
        
        return res.status( status ).json( respuesta.getRespuesta() )
    } catch (error) {
        console.log('Error - actualizarCurso: ', error)

        const {
            status,
            respuesta
        } = manejadorErrores( error )

        return res.status( status ).json( respuesta )
    }
}

controller.eliminarCurso = async (req, res) => {
    try {
        const { jekuaaDatos, body } = req
        const {  } = body

        const respuesta = new Respuesta()
        let codigo = 'jekuaa/exito'



        // Retornar respuesta
        respuesta.setRespuestaPorCodigo(codigo, {
            mensaje: '¡Se eliminó un curso!',
            resultado: blogRespuesta.getBlog()
        })
        const status = respuesta.getStatusCode()
        
        return res.status( status ).json( respuesta.getRespuesta() )
    } catch (error) {
        console.log('Error - eliminarCurso: ', error)

        const {
            status,
            respuesta
        } = manejadorErrores( error )

        return res.status( status ).json( respuesta )
    }
}

module.exports = controller