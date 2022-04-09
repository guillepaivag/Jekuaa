const TurndownService = require('turndown')
const path = require('path')
const fs = require('fs')
const os = require('os')

const ClaseBorrador = require("../../../../models/Cursos/clase/ClaseBorrador")
const Errores = require("../../../../models/Error/Errores")
const timestamp = require("../../../../utils/timestamp")
const ContenidoClaseBorrador = require('../../../../models/Cursos/contenidoClase/ContenidoClaseBorrador')
const { request, response } = require('express')

const middleware = {}

middleware.esValidoElContenidoClaseVideo = async (req, res, next) => {
    try {
        const { datos, body, files, params } = req
        const { uidSolicitante, datosAuthSolicitante } = datos
        const { uidCurso, uidUnidad, uidClase } = params

        const file = files[0]

        // Verificación de validez de la clase
        const claseBorrador = new ClaseBorrador()
        const existe = await claseBorrador.importarClasePorUID(uidCurso, 
            uidUnidad, 
            uidClase)

        if (!existe) {
            throw new Errores({
                codigo: 'error/usuario_mala_solicitud',
                mensaje: 'No existe esta clase.'
            })
        }

        // Extensiones permitidas
        if ( file.fileExtension !== 'mp4' && file.fileExtension !== 'mov' && file.fileExtension !== 'wmv' && file.fileExtension !== 'mkv' ) {
            throw new Errores({
                codigo: 'error/usuario_mala_solicitud',
                mensaje: 'Solo se admiten videos de tipo .mp4, .mov, .wmv o .mkv'
            })
        }

        // Resolucion


        // Duracion
        const minuteDuration = file.metadata.format.duration / 60
        const minDuration = 1
        const maxDuration = 60 * 2
        
        // if ( minuteDuration < minDuration ) {
        //     throw new Errores({
        //         codigo: 'error/usuario_mala_solicitud',
        //         mensaje: 'El video es muy corto, no tiene que durar menos de 1 minuto, favor agregue más contenido.'
        //     })
        // }
        
        if ( minuteDuration > maxDuration ) {
            throw new Errores({
                codigo: 'error/usuario_mala_solicitud',
                mensaje: 'El video es muy largo, no tiene que durar más de 1 hora, favor dividir el video en partes.'
            })
        }

        // Tamaño
        const mbSize = file.size / 1000000
        const maxSize = 4000
        if ( mbSize > maxSize ) {
            throw new Errores({
                codigo: 'error/usuario_mala_solicitud',
                mensaje: 'El video debe tener un tamaño menor a 4GB.'
            })
        }

        next()
    } catch (error) {
        next(error)
    }
}







middleware.construirElContenidoClaseVideo = async (req, res, next) => {
    try {
        const { datos, body, files, params } = req
        const { uidCurso, uidUnidad, uidClase } = params
        const { uidSolicitante, datosAuthSolicitante } = datos

        const file = files[0]
        let documentoClase = {}
        let documentoContenidoClase = {}

        // Construcción del documento contenido clase
        const videoData = {}

        videoData.duration = file.metadata.format.duration
        videoData.resolution = file.metadata.streams[0].width
        videoData.width = file.metadata.streams[0].width
        videoData.height = file.metadata.streams[0].height
        videoData.sample_aspect_ratio = file.metadata.streams[0].sample_aspect_ratio
        videoData.display_aspect_ratio = file.metadata.streams[0].display_aspect_ratio

        documentoContenidoClase = {
            tipoContenido: 'video',
            videoData: videoData,
            size: file.size,
            fileName: file.fileName, 
            fileExtension: file.fileExtension, 
            mimeType: file.mimeType,
            fechaActualizacion: timestamp.milliseconds_a_timestamp( Date.now() ),
        }

        // Construcción del documento clase
        documentoClase = {
            duracion: file.metadata.format.duration,
            tipoClase: 'video',
        }

        // Agregando los datos actualizados al req.body
        req.body.datosActualizados = {
            documentoContenidoClase: documentoContenidoClase,
            documentoClase: documentoClase,
        }

        next()
    } catch (error) {
        next(error)
    }
}







middleware.esValidoElContenidoClaseArticulo = async (req, res, next) => {
    try {
        const { datos, body, params } = req
        const { uidSolicitante, datosAuthSolicitante } = datos
        const { uidCurso, uidUnidad, uidClase } = params

        // Verificación de validez de la clase
        const contenidoClaseBorrador = new ContenidoClaseBorrador()
        const existe = await contenidoClaseBorrador.importarContenidoClasePorUID(uidCurso, uidClase)

        if (!existe) {
            throw new Errores({
                codigo: 'error/usuario_mala_solicitud',
                mensaje: 'No existe esta clase.'
            })
        }
        
        if (contenidoClaseBorrador.estadoArchivo !== 'subiendo') {
            throw new Errores({
                codigo: 'error/usuario_mala_solicitud',
                mensaje: 'Esta clase debe estar en estado "subiendo".'
            })
        }

        next()
    } catch (error) {
        next(error)
    }
}







middleware.construirElContenidoClaseArticulo = async (req, res, next) => {
    try {
        const { datos, body, params } = req
        const { uidSolicitante, datosAuthSolicitante } = datos
        const { uidCurso, uidUnidad, uidClase } = params
        const { articulo } = body

        // // Actualizar a estado "subiendo"
        // await ContenidoClaseBorrador.actualizarDocumento(uidCurso, uidClase, {
        //     estadoArchivo: 'subiendo',
        // })

        // Pasar de HTML a Markdown
        const nombreBlogTemp = 'articulo.md'
        const rutaArchivoTemp = path.join(os.tmpdir(), nombreBlogTemp)

        let turndownService = new TurndownService()
        let markdown = turndownService.turndown(articulo)

        // Crear archivo Markdown
        fs.writeFileSync(rutaArchivoTemp, markdown)

        req.body.rutaArchivoTemp = rutaArchivoTemp

        next()
    } catch (error) {
        next(error)
    }
}



middleware.validarDatosParaCambiarEstadoArchivo = async (req=request, res=response, next) => {
    try {
        const { datos, body, params } = req
        const { uidSolicitante, datosAuthSolicitante } = datos
        const { uidCurso, uidClase } = params
        const { estadoArchivo } = body

        const contenidoClaseBorrador = new ContenidoClaseBorrador()
        await contenidoClaseBorrador.importarContenidoClasePorUID(uidCurso, uidClase)

        if (contenidoClaseBorrador.estadoArchivo === 'procesando') {
            throw new Errores({
                codigo: 'error/usuario_mala_solicitud',
                mensaje: 'El contenido para esta clase ya se esta procesando.'
            })
        }

        if (estadoArchivo === undefined) {
            throw new Errores({
                codigo: 'error/usuario_mala_solicitud',
                mensaje: 'Datos invalidos.'
            })
        }

        if (typeof estadoArchivo !== 'string') {
            throw new Errores({
                codigo: 'error/usuario_mala_solicitud',
                mensaje: 'Datos invalidos.'
            })
        }

        if (estadoArchivo !== 'subiendo' || estadoArchivo !== '') {
            throw new Errores({
                codigo: 'error/usuario_mala_solicitud',
                mensaje: 'Datos invalidos.'
            })
        }

        if (estadoArchivo === contenidoClaseBorrador.estadoArchivo) {
            throw new Errores({
                codigo: 'error/usuario_mala_solicitud',
                mensaje: 'Este estado ya esta en proceso.'
            })
        }

        next()
    } catch (error) {
        next(error)
    }
}





module.exports = middleware