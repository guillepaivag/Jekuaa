const fs = require('fs')
const { request, response } = require("express")

const Respuesta = require("../../../../models/Respuesta")
const Errores = require('../../../../models/Error/Errores')
const ContenidoClase = require('../../../../models/Cursos/contenidoClase/ContenidoClase')
const ContenidoVideoBorrador = require('../../../../models/Cursos/contenidoClase/ContenidoVideoBorrador')
const ContenidoVideoPublicado = require('../../../../models/Cursos/contenidoClase/ContenidoVideoPublicado')
const ContenidoArticuloBorrador = require('../../../../models/Cursos/contenidoClase/ContenidoArticuloBorrador')
const ContenidoArticuloPublicado = require('../../../../models/Cursos/contenidoClase/ContenidoArticuloPublicado')
const manejadorErrores = require('../../../../helpers/manejoErrores')
const config = require("../../../../../config")
const ContenidoYoutubeBorrador = require('../../../../models/Cursos/contenidoClase/contenidoYoutube/ContenidoYoutubeBorrador')
const { milliseconds_a_timestamp } = require('../../../../utils/timestamp')
const db = require('../../../../../db')

const controller = {}


controller.agregarContenidoClaseArticuloBorrador = async (req = request, res = response) => {
    try {
        const { datos, body, params } = req
        const { uidSolicitante, datosAuthSolicitante } = datos
        const { uidCurso, uidUnidad, uidClase } = params
        const { rutaArchivoTemp } = body

        const respuesta = new Respuesta()
        let estado = 'exito'
        
        const rutaModo = config.environment.mode === 'production' ? 'prod' : 'dev'
        const bucketNameVerificacion = rutaModo === 'prod' ? 'prod-j-cursos-contenido-bv' : 'dev-j-cursos-contenido-bv'

        // Agregar el archivo contenido clase
        await ContenidoClase.subirContenidoArchivo({
            bucketName: bucketNameVerificacion,
            rutaDestino: `${uidCurso}/${uidClase}/articulo.md`,
            fileData: {
                rutaArchivoTemp: rutaArchivoTemp,
                extensionArchivo: 'md'
            }
        }).then(response => {
            // Eliminar archivo temp
            fs.unlink(rutaArchivoTemp, (err => {
                if ( err ) {
                    throw new Errores({
                        estado: 500,
                        mensajeCliente: 'error_desconocido',
                        mensajeServidor: 'Error al eliminar el archivo temporal.',
                        resultado: err,
                    })
                }
            }))
        })

        // Retornar respuesta
        respuesta.setRespuesta({
            estado: 200,
            mensaje: 'exito',
            resultado: null
        })
        
        return res.status( respuesta.estado ).json( respuesta.getRespuesta() )

    } catch (error) {
        console.log('Error - agregarContenidoClaseArticulo: ', error)

        const respuesta = manejadorErrores( error )
        return res.status( respuesta.estado ).json( respuesta.getRespuesta() )
    }
}



controller.agregarContenidoClaseVideoYoutubeBorrador = async (req = request, res = response) => {
    try {
        const { datos, body, params } = req
        const { uidSolicitante, datosAuthSolicitante } = datos
        const { uidCurso, uidUnidad, uidClase } = params
        const { duracion, codigoVideoYoutube } = body

        const respuesta = new Respuesta()
        let estado = 'exito'

        // Obtener documento de contenido de clase borrador
        const result = await ContenidoClase.obtenerDocumentoBorrador(uidCurso, uidClase)

        if ( result.contenidoClase.estadoContenido === 'procesando' ) 
            throw new Error('Ya se esta procesando un archivo.')

        // Actualizar como procesando el estadoContenido
        await ContenidoClase.actualizarDocumentoBorrador(uidCurso, uidClase, {
            estadoContenido: 'procesando'
        })

        if (result.tipoContenido === 'video' || result.tipoContenido === 'articulo') {
            // Eliminar el archivo video||articulo de borrador
            const fileNameAux = result.contenidoClase.tipoContenido === 'video' ?
            `video.${result.contenidoClase.fileExtension}` : 'articulo.md'

            const rutaModo = config.environment.mode === 'production' ? 'prod' : 'dev'
            const bucketNameContenidoBorrador = rutaModo === 'prod' ? 'prod-j-cursos-contenido-b' : 'dev-j-cursos-contenido-b'

            await ContenidoClase.eliminarContenidoArchivo({
                bucketName: bucketNameContenidoBorrador,
                rutaPrefix: `${uidCurso}/${uidClase}/${fileNameAux}`
            })
            
        }

        // Actualizar documento contenido clase
        const documentoContenidoClase = new ContenidoYoutubeBorrador({
            uid: uidClase,
            tipoContenido: 'video-youtube',

            duracion: duracion,
            codigoVideoYoutube: codigoVideoYoutube,
            fechaSubida: milliseconds_a_timestamp( Date.now() ),

            mensajesError: [],
            contieneErrores: false,
            estadoDocumento: result.contenidoClase.estadoDocumento === 'nuevo' ? 'nuevo' : 'actualizado',
            estadoContenido: '',
        }).getContenidoYoutubeBorrador()
        await ContenidoClase.agregarDocumentoBorrador(uidCurso, documentoContenidoClase)
        
        // Actualizar documento clase
        const documentoClase = {
            duracion: duracion,
            tipoClase: 'video-youtube',
        }
        const snapshot = await db.collectionGroup('ClasesBorrador').where('uid', '==', uidClase).get()
        const docs = snapshot.docs
        for (let i = 0; i < docs.length; i++) {
            const doc = docs[i]
            await doc.ref.update(documentoClase)
        }
        
        // Retornar respuesta
        respuesta.setRespuesta({
            estado: 200,
            mensaje: 'exito',
            resultado: null
        })
        
        return res.status( respuesta.estado ).json( respuesta.getRespuesta() )

    } catch (error) {
        console.log('Error - agregarContenidoClaseVideoYoutubeBorrador: ', error)

        const respuesta = manejadorErrores( error )
        return res.status( respuesta.estado ).json( respuesta.getRespuesta() )
    }
}



controller.obtenerUrlVideoClaseBorrador = async (req = request, res = response) => {
    
    try {
        const { datos, body, params } = req
        const { uidSolicitante, datosAuthSolicitante } = datos
        const { uidCurso, uidClase } = params

        const respuesta = new Respuesta()
        let estado = 'exito'

        const result = await ContenidoClase.obtenerDocumentoBorrador(uidCurso, uidClase)

        let url = ''
        if (result.contenidoClase.estadoDocumento) {
            url = await ContenidoVideoBorrador.generarUrlVideo({
                rutaPrefix: `${uidCurso}/${uidClase}/video.`,
            })
        } else {
            url = await ContenidoVideoPublicado.generarUrlVideo({
                rutaPrefix: `${uidCurso}/${uidClase}/video.`,
            })
        }

        // Retornar respuesta
        respuesta.setRespuesta({
            estado: 200,
            mensaje: 'exito',
            resultado: url
        })
        
        return res.status( respuesta.estado ).json( respuesta.getRespuesta() )

    } catch (error) {
        console.log('Error - obtenerUrlVideoClaseBorrador: ', error)

        const respuesta = manejadorErrores( error )
        return res.status( respuesta.estado ).json( respuesta.getRespuesta() )
    }

}



controller.obtenerArticuloClaseBorrador = async (req = request, res = response) => {

    try {
        const { datos, body, params } = req
        const { uidSolicitante, datosAuthSolicitante } = datos
        const { uidCurso, uidClase } = params

        const respuesta = new Respuesta()
        let estado = 'exito'

        const result = await ContenidoClase.obtenerDocumentoBorrador(uidCurso, uidClase)
        
        let articulo = ''
        if (result.contenidoClase.estadoDocumento) {
            articulo = await ContenidoArticuloBorrador.obtenerArticulo({
                rutaPrefix: `${uidCurso}/${uidClase}/articulo.md`,
                getMarkdown: false
            })
        } else {
            articulo = await ContenidoArticuloPublicado.obtenerArticulo({
                rutaPrefix: `${uidCurso}/${uidClase}/articulo.md`,
                getMarkdown: false
            })
        }

        // Retornar respuesta
        respuesta.setRespuesta({
            estado: 200,
            mensaje: 'exito',
            resultado: articulo
        })
        
        return res.status( respuesta.estado ).json( respuesta.getRespuesta() )

    } catch (error) {
        console.log('Error - obtenerUrlVideoClaseBorrador: ', error)

        const respuesta = manejadorErrores( error )
        return res.status( respuesta.estado ).json( respuesta.getRespuesta() )
    }

}



controller.obtenerVideoYoutubeClaseBorrador = async (req = request, res = response) => {
    
    try {
        const { datos, body, params } = req
        const { uidSolicitante, datosAuthSolicitante } = datos
        const { uidCurso, uidClase } = params

        const respuesta = new Respuesta()

        const result = await ContenidoClase.obtenerDocumentoBorrador(uidCurso, uidClase)
        const contenidoYoutubeBorrador = new ContenidoYoutubeBorrador(result.contenidoClase)

        // Retornar respuesta
        respuesta.setRespuesta({
            estado: 200,
            mensaje: 'exito',
            resultado: {
                codigoVideoYoutube: contenidoYoutubeBorrador.codigoVideoYoutube,
                duracion: contenidoYoutubeBorrador.duracion
            }
        })
        
        return res.status( respuesta.estado ).json( respuesta.getRespuesta() )

    } catch (error) {
        console.log('Error - obtenerVideoYoutubeClaseBorrador: ', error)

        const respuesta = manejadorErrores( error )
        return res.status( respuesta.estado ).json( respuesta.getRespuesta() )
    }

}



module.exports = controller