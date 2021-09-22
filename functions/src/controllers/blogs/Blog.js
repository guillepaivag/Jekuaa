const Blog = require("../../models/Blog")
const manejadorErrores = require("../../models/Error/ManejoErrores/ManejadorErrores")
const Respuesta = require("../../models/Respuesta")
const MiembroJekuaa = require("../../models/TiposUsuarios/MiembroJekuaa")
const { verificadorDeFormato, verificadorDeDatosRequeridos } = require("../../utils/Blog")
const { milliseconds_a_timestamp } = require("../../utils/Timestamp")

const controller = {}

controller.crearBlog = async (req, res) => {
    
    try {
        const { jekuaaDatos, body } = req
        const { uidSolicitante, datosAuthSolicitante } = jekuaaDatos
        const { datosBlog } = body

        const respuesta = new Respuesta()
        let codigo = 'jekuaa/exito'

        const blogNuevo = JSON.parse( JSON.stringify( datosBlog ) )

        // Datos del solicitante
        const usuarioSolicitante = await MiembroJekuaa.verDatosUsuarioPorUID( uidSolicitante )

        // Parseo de fecha a Timestamp
        blogNuevo.fechaCreacion = blogNuevo.fechaCreacion ? 
        milliseconds_a_timestamp( blogNuevo.fechaCreacion ) : blogNuevo.fechaCreacion
        blogNuevo.fechaActualizacion = blogNuevo.fechaActualizacion ? 
        milliseconds_a_timestamp( blogNuevo.fechaActualizacion ) : blogNuevo.fechaActualizacion

        // Verificar los datos del blog (datosBlog)
        verificadorDeDatosRequeridos ( blogNuevo )
        verificadorDeFormato( blogNuevo, usuarioSolicitante )

        // Agregar a Firestore
        const blogRespuesta = {}
        blogRespuesta.blog = await Blog.crearNuevoBlog( datosBlog )

        // // Agregar a Storage
        // blogNuevo.archivo = await 

        // Retornar respuesta
        respuesta.setRespuestaPorCodigo(codigo, {
            mensaje: '¡El blog se creo de forma exitosa!',
            resultado: blogRespuesta
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


module.exports = controller