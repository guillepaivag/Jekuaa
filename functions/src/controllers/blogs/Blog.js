const Blog = require("../../models/Blog")
const manejadorErrores = require("../../models/Error/ManejoErrores/ManejadorErrores")
const Respuesta = require("../../models/Respuesta")
const MiembroJekuaa = require("../../models/TiposUsuarios/MiembroJekuaa")
const Busboy = require("busboy")
const {
    verificadorDeTipoDeDatos,
    verificadorDeCondicionesDeBlogUsuario, 
    verificadorDeDatosRequeridos,
    verificadorDeDatosConstantes,
    generadorDeDatosParaActualizar
} = require("../../utils/Blog")
const { milliseconds_a_timestamp } = require("../../utils/Timestamp")
const ErrorJekuaa = require("../../models/Error/ErroresJekuaa")
const os = require('os')
const path = require('path')
const fs = require('fs')
const JekuaaRoles = require("../../models/JekuaaRoles")
const { esMiembroJekuaa } = require("../../utils/usuarios/RolesSecciones")
const ActualizacionBlog = require("../../models/Blogs/ActualizacionBlog")

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
        verificadorDeTipoDeDatos( blogNuevo )
        verificadorDeCondicionesDeBlogUsuario( blogNuevo, usuarioSolicitante )

        // Agregar a Firestore
        const blogRespuesta = await Blog.crearNuevoBlog( blogNuevo )

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
        const { jekuaaDatos, params } = req
        const { uidSolicitante, datosAuthSolicitante } = jekuaaDatos
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

controller.actualizarDatosBlog = async (req, res) => {
    try {
        const { jekuaaDatos, body, params } = req
        const { uidSolicitante, datosAuthSolicitante } = jekuaaDatos
        const { datosBlog } = body
        const { uid } = params

        await Blog.errorExisteBlogPorUID( uid, 'no-existe' )
        const respuesta = new Respuesta()
        let codigo = 'jekuaa/exito'

        const blog = new Blog()
        await blog.importarDatosBlogPorUID(uid)

        // Comprobación de que el blog sea del solicitante
        if ( uidSolicitante !== blog.getBlog().publicador ) {
            throw new ErrorJekuaa({
                codigo: 'jekuaa/error/usuario_no_autorizado',
                mensaje: `No puedes crear/actualizar este blog.`
            })
        }

        // Datos del solicitante
        const usuarioSolicitante = await MiembroJekuaa.verDatosUsuarioPorUID( uidSolicitante )

        // Variable blogNuevo para operar
        const blogNuevo = JSON.parse( JSON.stringify( datosBlog ) )

        // Parseo de fecha
        blogNuevo.fechaCreacion = milliseconds_a_timestamp( blog.getBlog().fechaCreacion.seconds * 1000 )
        blogNuevo.fechaActualizacion = milliseconds_a_timestamp( Date.now() )

        // Verificar los datos del blog y construccion de datos para actualizar
        const datosParaActualizar = generadorDeDatosParaActualizar( blogNuevo, blog.getBlog(), usuarioSolicitante )

        // Actualizar Blog
        await blog.actualizarDatosBlog( datosParaActualizar )

        // Retornar respuesta
        respuesta.setRespuestaPorCodigo(codigo, {
            mensaje: '¡Se actualizó los datos del blog de forma exitosa!',
            resultado: datosParaActualizar
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

controller.solicitarActualizacionDeContenido = async (req, res) => {
    try {
        const { jekuaaDatos, params, files, body } = req
        const { uidSolicitante, datosAuthSolicitante } = jekuaaDatos
        const { uid } = params
        const { datosActualizacion } = body

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

        // Clon de datosActualizacion
        const datosActualizacionClon = JSON.parse( datosActualizacion )

        // Parseo de fechaSolicitud
        datosActualizacionClon.fechaSolicitud = milliseconds_a_timestamp( Date.now() )

        const descripcionSolicitud = datosActualizacionClon.descripcionSolicitud
        if ( !descripcionSolicitud || typeof descripcionSolicitud != 'string' ) {
            let mensaje = 'No existe una descripcion de la solicitud.'
            if ( !!descripcionSolicitud ) {
                mensaje = 'No es del tipo de dato correcto la descripción.'
            }
            throw new ErrorJekuaa({
                codigo: 'jekuaa/error/usuario_mala_solicitud',
                mensaje
            })
        }

        const busboy = new Busboy({
            headers: req.headers
        })
        let datosArchivo = null

        // Agregar a Storage
        busboy.on('file', async (fieldname, file, filename, encoding, mimetype) => {

            const extNameFile = path.extname(filename)

            if ( extNameFile != '.md' ) {
                throw new ErrorJekuaa({
                    codigo: 'jekuaa/error/usuario_mala_solicitud',
                    mensaje: 'El archivo debe ser de tipo Markdown (.md)'
                })
            }

            const estadoActual = blog.getBlog().estado
            if ( estadoActual === 'actualizacion-pendiente' ) {
                // Obtener datos del estado de la solicitud actual.
                const uidSolicitudActualizacion = blog.getBlog().actualizacionPendiente
                const estadoSolicitud = `descartado`

                // Deshabilitar solicitud actual: actualizacion-pendiente
                const solicitudActualizacionBlog = new ActualizacionBlog()
                solicitudActualizacionBlog.setUID_BLOG(uid)
                solicitudActualizacionBlog.setUID_SOLICITUD(uidSolicitudActualizacion)
                solicitudActualizacionBlog.actualizarSolicitudActualizacion({
                    estado: estadoSolicitud
                })
            }

            // Crear nueva solicitud: no-existe-archivo, actualizacion-pendiente, publicado, no-publicado
            await blog.crearSolicitudDeActualizacion({
                fechaSolicitud: datosActualizacionClon.fechaSolicitud,
                descripcionSolicitud: datosActualizacionClon.descripcionSolicitud,
            })

            let dirArray = ['..', '..', 'temp', 'blogs']
            let dirVerificacion = path.join(__dirname)
            for (let i = 0; i < dirArray.length; i++) {
                const element = dirArray[i]

                dirVerificacion = path.join(dirVerificacion, element)
                
                if ( element != '..' && !fs.existsSync(dirVerificacion) ){
                    fs.mkdirSync(dirVerificacion)
                }
            }

            const filepath = path.join(__dirname, '..', '..', 'temp', 'blogs', `${uid}.md`)
            datosArchivo = {
                filepath: filepath, 
                filename: `${uid}.md`, 
                mimetype: mimetype
            }
            file.pipe( fs.createWriteStream( filepath ) )
        })
    
        busboy.on('finish', async () => {
            
            // Subir el archivo a actualizaciones pendientes
            let archivoCreado = await Blog.subirArchivoAStorage( datosArchivo, true )

            // Borrar el archivo creado en el servidor
            fs.unlinkSync( datosArchivo.filepath )

            // Obtener url del blog
            const urlBlog = await Blog.obtenerURL( uid, 'md', true, 3600 )

            // Retornar respuesta
            respuesta.setRespuestaPorCodigo(codigo, {
                mensaje: '¡El archivo del blog se creo de forma exitosa!',
                resultado: urlBlog,
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

controller.obtenerUrlFirmada = async (req, res) => {
    try {
        const { jekuaaDatos, params } = req
        const { uidSolicitante, datosAuthSolicitante } = jekuaaDatos
        const { uid } = params

        const respuesta = new Respuesta()
        let codigo = 'jekuaa/exito'

        // Obtener url del blog
        const urlBlog = await Blog.obtenerURL( uid, 'md', false, 3600 )

        // Retornar respuesta
        respuesta.setRespuestaPorCodigo(codigo, {
            mensaje: '¡URL del blog generada de forma exitosa!',
            resultado: urlBlog
        })
        const status = respuesta.getStatusCode()
        
        return res.status( status ).json( respuesta.getRespuesta() )

    } catch (error) {
        console.log('Error - obtenerUrlFirmada: ', error)

        const {
            status,
            respuesta
        } = manejadorErrores( error )

        return res.status( status ).json( respuesta )
    }
}

controller.obtenerContenidoBlog = async ( req, res ) => {
    try {
        const { params, body } = req
        const { opciones } = body
        const { uid } = params

        const respuesta = new Respuesta()
        let codigo = 'jekuaa/exito'
        const opcionesBlog = {}

        // Verificar existencia
        await Blog.errorExisteBlogPorUID( uid, 'no-existe' )
        const blog = new Blog()
        await blog.importarDatosBlogPorUID( uid )

        if ( blog.getBlog().estado === 'no-existe-archivo' ) {
            throw new ErrorJekuaa({
                codigo: 'jekuaa/error/usuario_mala_solicitud',
                mensaje: `No existe el blog: ${uid}`
            })
        }

        let dirArray = ['..', '..', 'temp', 'blogs']
        let dirVerificacion = path.join(__dirname)
        for (let i = 0; i < dirArray.length; i++) {
            const element = dirArray[i]

            dirVerificacion = path.join(dirVerificacion, element)
            
            if ( element != '..' && !fs.existsSync(dirVerificacion) ){
                fs.mkdirSync(dirVerificacion)
            }
        }

        const rutaArchivoTemp = path.join(__dirname, '..', '..', 'temp', 'blogs', `${uid}.md`)

        // Valores por defecto
        opcionesBlog.pendiente = false
        opcionesBlog.formatoSalida = 'html'
        opcionesBlog.rutaArchivoTemp = rutaArchivoTemp

        // Obtener archivo
        const contenido = await blog.obtenerContenido( opcionesBlog )

        // Retornar respuesta
        respuesta.setRespuestaPorCodigo(codigo, {
            mensaje: '¡El contenido del archivo se obtuvo con exito!',
            resultado: contenido
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

controller.obtenerContenidoBlogPendiente = async ( req, res ) => {
    try {
        const { jekuaaDatos, params, body } = req
        const { uidSolicitante, datosAuthSolicitante } = jekuaaDatos
        const { opciones } = body
        const { uid } = params


        const respuesta = new Respuesta()
        let codigo = 'jekuaa/exito'
        const opcionesBlog = {}

        // Verificar existencia
        await Blog.errorExisteBlogPorUID( uid, 'no-existe' )

        // Si se busca en estado pendiente, verificar que sea un Miembro Jekuaa
        if ( opciones && opciones.pendiente && !esMiembroJekuaa( datosAuthSolicitante.customClaims.rol ) ) {
            // No autorizado
            throw new ErrorJekuaa({
                codigo: 'jekuaa/error/usuario_no_autorizado'
            })
        }

        // Verificacion de tipos de datos
        if ( opciones && opciones.pendiente && typeof opciones.pendiente != 'boolean' ) {
            throw new ErrorJekuaa({
                codigo: 'jekuaa/error/usuario_mala_solicitud',
                mensaje: 'El estado pendiente del blog debe ser boolean.'
            })
        }
        if ( opciones && opciones.formatoSalida && typeof opciones.formatoSalida != 'string' ) {
            throw new ErrorJekuaa({
                codigo: 'jekuaa/error/usuario_mala_solicitud',
                mensaje: 'El formato de salida del blog debe ser string.'
            })
        }

        // Formato de salida valido
        const formatosSalidaValido = ['md', 'html']
        if ( opciones && opciones.formatoSalida && formatosSalidaValido.includes( opciones.formatoSalida ) ) {
            throw new ErrorJekuaa({
                codigo: 'jekuaa/error/usuario_mala_solicitud',
                mensaje: 'Este formato no es valido.'
            })
        }

        let dirArray = ['..', '..', 'temp', 'blogs']
        let dirVerificacion = path.join(__dirname)
        for (let i = 0; i < dirArray.length; i++) {
            const element = dirArray[i]

            dirVerificacion = path.join(dirVerificacion, element)
            
            if ( element != '..' && !fs.existsSync(dirVerificacion) ){
                fs.mkdirSync(dirVerificacion)
            }
        }

        const rutaArchivoTemp = path.join(__dirname, '..', '..', 'temp', 'blogs', `${uid}.md`)

        // Valores por defecto
        opcionesBlog.pendiente = opciones && opciones.pendiente ? opciones.pendiente : false
        opcionesBlog.formatoSalida = opciones && opciones.formatoSalida ? opciones.formatoSalida : 'md'
        opcionesBlog.rutaArchivoTemp = rutaArchivoTemp

        // Obtener archivo
        const contenido = await Blog.obtenerContenidoPorUID( uid, opcionesBlog )

        // Retornar respuesta
        respuesta.setRespuestaPorCodigo(codigo, {
            mensaje: '¡El contenido del archivo se obtuvo con exito!',
            resultado: contenido
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

controller.eliminarBlog = async (req, res) => {
    try {
        const { jekuaaDatos, params } = req
        const { uidSolicitante, datosAuthSolicitante } = jekuaaDatos
        const { uid } = params

        const respuesta = new Respuesta()
        let codigo = 'jekuaa/exito'

        await Blog.errorExisteBlogPorUID( uid, 'no-existe' )
        const blog = new Blog()
        await blog.importarDatosBlogPorUID( uid )

        if ( uidSolicitante !== blog.getBlog().publicador ) {
            throw new ErrorJekuaa({
                codigo: 'jekuaa/error/usuario_no_autorizado',
                mensaje: `No puedes eliminar este blog.`
            })
        }

        // Eliminar el archivo del blog en Storage
        const archivoBlogEliminado = await Blog.eliminarArchivoBlog( uid )

        // Eliminar los datos del blog en Firestore
        const datosBlogEliminado = await blog.eliminarBlog()

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

controller.habilitarBlog = async (req, res) => {
    try {
        const { jekuaaDatos, params, body } = req
        const { uidSolicitante, datosAuthSolicitante } = jekuaaDatos
        const { habilitar } = body
        const { uid } = params

        const respuesta = new Respuesta()
        let codigo = 'jekuaa/exito'

        await Blog.errorExisteBlogPorUID( uid, 'no-existe' )
        const blog = new Blog()
        await blog.importarDatosBlogPorUID( uid )

        if ( !JekuaaRoles.esPropietario( datosAuthSolicitante.customClaims.rol ) ) {
            if ( habilitar ) {
                throw new ErrorJekuaa({
                    codigo: 'jekuaa/error/usuario_no_autorizado',
                    mensaje: `No puedes habilitar el blog.`
                })
            }

            if ( uidSolicitante !== blog.getBlog().publicador ) {
                throw new ErrorJekuaa({
                    codigo: 'jekuaa/error/usuario_no_autorizado',
                    mensaje: `Este blog no es tuyo, no puedes operar este blog.`
                })
            }
        }

        let blogPendienteHabilitado = blog.getBlog().habilitado && blog.getBlog().pendiente
        let blogHabilitado = blog.getBlog().habilitado && !blog.getBlog().pendiente
        let blogDeshabilitado = !blog.getBlog().habilitado && !blog.getBlog().pendiente
        let blogPendienteDeshabilitado = !blog.getBlog().habilitado && blog.getBlog().pendiente

        if ( habilitar && blogHabilitado ) {
            throw new ErrorJekuaa({
                codigo: 'jekuaa/error/usuario_no_autorizado',
                mensaje: 'Ya esta habilitado.'
            })
        }

        if ( !habilitar && blogDeshabilitado ) {
            throw new ErrorJekuaa({
                codigo: 'jekuaa/error/usuario_no_autorizado',
                mensaje: 'Ya esta deshabilitado.'
            })
        }

        // Proceso de habilitación/deshabilitación del blog
        blog.setPENDIENTE( false )
        blog.setHABILITADO( !!habilitar )
        await blog.habilitarBlog()

        // Retornar respuesta
        respuesta.setRespuestaPorCodigo(codigo, {
            mensaje: '¡Se actualizó el estado de habilitación del blog de forma exitosa!',
            resultado: blog.getBlog()
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

module.exports = controller