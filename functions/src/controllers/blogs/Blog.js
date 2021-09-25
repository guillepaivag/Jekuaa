const Blog = require("../../models/Blog")
const manejadorErrores = require("../../models/Error/ManejoErrores/ManejadorErrores")
const Respuesta = require("../../models/Respuesta")
const MiembroJekuaa = require("../../models/TiposUsuarios/MiembroJekuaa")
const Busboy = require("busboy")
const { verificadorDeFormato, verificadorDeDatosRequeridos } = require("../../utils/Blog")
const { milliseconds_a_timestamp } = require("../../utils/Timestamp")
const ErrorJekuaa = require("../../models/Error/ErroresJekuaa")
const os = require('os')
const path = require('path')
const fs = require('fs')

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
        blogNuevo.fechaCreacion = milliseconds_a_timestamp( Date.now() )
        blogNuevo.fechaActualizacion = milliseconds_a_timestamp( Date.now() )

        // Verificar los datos del blog (datosBlog)
        verificadorDeDatosRequeridos ( blogNuevo )
        verificadorDeFormato( blogNuevo, usuarioSolicitante )

        // Agregar a Firestore
        const blogRespuesta = await Blog.crearNuevoBlog( blogNuevo )

        // Obtener url del blog
        const urlBlog = await Blog.obtenerURL( blogRespuesta.uid )

        // Retornar respuesta
        respuesta.setRespuestaPorCodigo(codigo, {
            mensaje: '¡El blog se creo de forma exitosa!',
            resultado: urlBlog
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


controller.guardarArchivoBlog = async (req, res) => {
    try {
        const { jekuaaDatos, params, files } = req
        const { uidSolicitante, datosAuthSolicitante } = jekuaaDatos
        const { uid } = params

        await Blog.errorExisteBlogPorUID( uid, 'no-existe' )
        const blog = new Blog()
        await blog.importarDatosBlogPorUID( uid )

        if ( uidSolicitante !== blog.getBlog().publicador ) {
            throw new ErrorJekuaa({
                codigo: 'jekuaa/error/usuario_no_autorizado',
                mensaje: `No puedes crear/actualizar este blog.`
            })
        }

        const respuesta = new Respuesta()
        let codigo = 'jekuaa/exito'

        const busboy = new Busboy({ headers: req.headers })
        let uploadData = null

        // Agregar a Storage
        busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
            // os.tmpdir() -> C:\Users\i3\AppData\Local\Temp
            // const filepath = path.join(os.tmpdir(), filename)
            let dirArray = ['..', '..', 'temp', 'blogs']
            let dirVerificacion = path.join(__dirname)
            for (let i = 0; i < dirArray.length; i++) {
                const element = dirArray[i]

                dirVerificacion = path.join(dirVerificacion, element)
                
                if ( element != '..' && !fs.existsSync(dirVerificacion) ){
                    fs.mkdirSync(dirVerificacion)
                }

            }
            const extNameFile = path.extname(filename)
            const filepath = path.join(__dirname, '..', '..', 'temp', 'blogs', `${uid}${extNameFile}`)
            uploadData = { filepath: filepath, filename: `${uid}${extNameFile}`, mimetype: mimetype }
            file.pipe( fs.createWriteStream( filepath ) )
        })
    
        busboy.on('finish', async () => {
            
            // Subir el archivo
            let archivoCreado = await Blog.subirArchivoAStorage( uploadData )

            // Borrar el archivo creado en el servidor
            fs.unlinkSync(uploadData.filepath)

            // Obtener url del blog
            const urlBlog = await Blog.obtenerURL( uid )

            // Retornar respuesta
            respuesta.setRespuestaPorCodigo(codigo, {
                mensaje: '¡El archivo del blog se creo de forma exitosa!',
                resultado: urlBlog
            })
            const status = respuesta.getStatusCode()
            
            return res.status( status ).json( respuesta.getRespuesta() )

        })

        busboy.end(req.rawBody)

    } catch (error) {
        console.log('Error - guardarArchivoBlog: ', error)

        const {
            status,
            respuesta
        } = manejadorErrores( error )

        return res.status( status ).json( respuesta )
    }
}

controller.obtenerArchivoBlog = () => {
    
}

controller.eliminarArchivoBlog = () => {
    
}

module.exports = controller