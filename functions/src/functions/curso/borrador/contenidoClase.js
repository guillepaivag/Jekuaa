const functions = require('firebase-functions')
const ffmpeg = require('fluent-ffmpeg')
const ffprobePath = require("@ffprobe-installer/ffprobe").path
// const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path

const admin = require('../../../../firebase-service')
const timestamp = require('../../../utils/timestamp')
const { 
    esValidoElContenidoClaseVideo, 
    esValidoElContenidoClaseArticulo 
} = require('./helpers/contenidoClase')
const config = require("../../../../config")
const db = require('../../../../db')
const CursoEstadoPublicacion = require('../../../models/Cursos/curso/CursoEstadoPublicacion')
const ContenidoClase = require('../../../models/Cursos/contenidoClase/ContenidoClase')
const ContenidoArticuloBorrador = require('../../../models/Cursos/contenidoClase/ContenidoArticuloBorrador')
const ContenidoVideoBorrador = require('../../../models/Cursos/contenidoClase/ContenidoVideoBorrador')

const ffContenidoClase = {}
const rutaModo = config.environment.mode === 'production' ? 'prod' : 'dev'
let bucketNameContenidoBorrador = rutaModo === 'prod' ? 'prod-j-cursos-contenido-b' : 'dev-j-cursos-contenido-b'
let bucketNameContenidoBorradorVerificacion = rutaModo === 'prod' ? 'prod-j-cursos-contenido-bv' : 'dev-j-cursos-contenido-bv'


ffContenidoClase.validacionContenidoClase = functions
.region('southamerica-east1')
.storage
.bucket(bucketNameContenidoBorradorVerificacion)
.object().onFinalize(async (object, context) => {
    let estadoDelProceso = 'iniciando'
    
    try {
        console.log('object', JSON.stringify(object))

        const array1 = object.name.split('.')
        const fileExtension = array1[array1.length-1]
        const uidCurso = object.name.split('/')[0]
        const uidClase = object.name.split('/')[1]
        const fileName = object.name.split('/')[2]
        const esArticulo = fileExtension.includes('md')
        console.log(uidCurso)
        console.log(uidClase)
        console.log(fileName)
        console.log(esArticulo)

        const cursoEstadoPublicacion = new CursoEstadoPublicacion()
        await cursoEstadoPublicacion.importarDatosDocumento(uidCurso)

        if (cursoEstadoPublicacion.estado) 
            throw new Error('Se esta publicando el curso.')
        
        let file = null
        let videoData = null
        let documentoContenidoClase = {}
        let documentoClase = {}
        estadoDelProceso = 'verificando'

        const result = await ContenidoClase.obtenerDocumentoBorrador(uidCurso, uidClase)
        
        if ( !result ) 
            throw new Error('No existe la clase.')
        
        console.log(JSON.stringify(result))
        if ( result.contenidoClase.estadoContenido === 'procesando' ) 
            throw new Error('Ya se esta procesando un archivo.')

        // TODO: Actualizar el documento contenidoClase como "procesando"
        await ContenidoClase.actualizarDocumentoBorrador(uidCurso, uidClase, {
            estadoContenido: 'procesando'
        })

        // TODO: Obtener, verificar y construir datos
        if (esArticulo) {
            // TODO: Obtener datos del archivo
            const bucketPrueba = admin.storage().bucket(bucketNameContenidoBorradorVerificacion)
            const linkPrueba = bucketPrueba.file(object.name).publicUrl()
            
            file = {
                filePath: linkPrueba,
                fileExtension: fileExtension,
                fileName: fileName,
                mimeType: object.contentType,
                size: Number(object.size),
            }
            
            const articuloHTML = await ContenidoArticuloBorrador.obtenerArticuloVerificacion({
                rutaPrefix: `${uidCurso}/${uidClase}/articulo.md`,
                getMarkdown: false
            })

            let soloTexto = articuloHTML.replace(/(<([^>]+)>)/ig, '')
            soloTexto =  soloTexto.replace(/[\n\r]+/g, '')
            soloTexto = soloTexto.replace(/\s{2,10}/g, ' ')
            soloTexto = soloTexto.trim()

            const duracionMinutos = soloTexto.split(' ').length / 200
            const duracionSegundos = duracionMinutos * 60

            // TODO: Verificacion de datos del archivo
            const mensajesError = esValidoElContenidoClaseArticulo({
                file,
                object,
                uidCurso,
                uidClase,
            })

            // TODO: Construcción del documento contenido clase
            documentoContenidoClase = new ContenidoArticuloBorrador({
                uid: uidClase,
                tipoContenido: 'articulo',
                size: file.size,
                fileName: file.fileName,
                fileExtension: file.fileExtension,
                mimeType: file.mimeType,
                fechaSubida: timestamp.milliseconds_a_timestamp( Date.now() ),
                mensajesError: mensajesError,
                contieneErrores: !!mensajesError.length,
                estadoDocumento: result.contenidoClase.estadoDocumento === 'nuevo' ? 'nuevo' : 'actualizado',
                estadoContenido: '',
            }).getContenidoArticuloBorrador()

            // TODO: Construcción del documento clase
            documentoClase = {
                duracion: duracionSegundos,
                tipoClase: 'articulo',
            }

        } else {
            // TODO: Obtener datos del archivo
            const bucketPrueba = admin.storage().bucket(bucketNameContenidoBorradorVerificacion)
            let linkPrueba = bucketPrueba.file(object.name).publicUrl()
            
            if (linkPrueba.includes('#')) {
                // https://codingpotions.com/replace-nodejs
                const stringToSearch = '#'
                const replacer = new RegExp(stringToSearch, 'g')
                linkPrueba = linkPrueba.replace(replacer, '%23')
            }

            file = {
                filePath: linkPrueba,
                fileExtension: fileExtension,
                fileName: fileName,
                mimeType: object.contentType,
                size: Number(object.size),
            }
            console.log('file', JSON.stringify( file ))

            ffmpeg.setFfprobePath(ffprobePath)
            // ffmpeg.setFfmpegPath(ffmpegPath)
            
            const promiseAll = []
            promiseAll.push(new Promise((resolve, reject) => {
                ffmpeg.ffprobe(file.filePath, function(err, metadata) {
                    if (err) return reject(err)
                    file.metadata = metadata
                    console.log('metadata', JSON.stringify( metadata ))
                    resolve()
                })

                // https://stackoverflow.com/questions/8802484/how-do-i-get-a-snapshot-still-of-a-video-in-nodejs/8804408#8804408
                // ffmpeg(file.filePath)
                // .on('end', function() {
                //     console.log('Screenshots taken');
                // })
                // .on('error', function(err) {
                //     console.error(err);
                // })
                // .screenshots({
                //     // Will take screenshots at 20%, 40%, 60% and 80% of the video
                //     count: 4,
                //     folder: '/path/to/output'
                // });
            }))

            await Promise.all(promiseAll)

            // TODO: Verificacion de datos del archivo
            const mensajesError = esValidoElContenidoClaseVideo({
                file,
                object,
                uidCurso,
                uidClase,
            })
            
            // TODO: Construcción del documento contenido clase
            videoData = {
                duration: file.metadata.format.duration,
                resolution: file.metadata.streams[0].height,
                width: file.metadata.streams[0].width,
                height: file.metadata.streams[0].height,
                sample_aspect_ratio: file.metadata.streams[0].sample_aspect_ratio,
                display_aspect_ratio: file.metadata.streams[0].display_aspect_ratio,
            }
            documentoContenidoClase = new ContenidoVideoBorrador({
                uid: uidClase,
                tipoContenido: 'video',
                videoData: videoData,
                size: file.size,
                fileName: file.fileName,
                fileExtension: file.fileExtension,
                mimeType: file.mimeType,
                fechaSubida: timestamp.milliseconds_a_timestamp( Date.now() ),
                mensajesError: mensajesError,
                contieneErrores: !!mensajesError.length,
                estadoDocumento: result.contenidoClase.estadoDocumento === 'nuevo' ? 'nuevo' : 'actualizado',
                estadoContenido: '',
            }).getContenidoVideoBorrador()
            
            // TODO: Construcción del documento clase
            documentoClase = {
                duracion: file.metadata.format.duration,
                tipoClase: 'video',
            }
        }

        console.log(JSON.stringify(documentoContenidoClase))
        console.log(JSON.stringify(documentoClase))

        estadoDelProceso = 'actualizacion'
        
        // TODO: Si existe contenido, eliminar el "actual" (asincrono)
        if (result.contenidoClase.tipoContenido === 'video' || result.contenidoClase.tipoContenido === 'articulo') {
            
            const fileNameAux = result.contenidoClase.tipoContenido === 'video' ?
            `video.${result.contenidoClase.fileExtension}` : 'articulo.md'

            await ContenidoClase.eliminarContenidoArchivo({
                bucketName: bucketNameContenidoBorrador,
                rutaPrefix: `${uidCurso}/${uidClase}/${fileNameAux}`
            })
            
        }

        // TODO: Mover el archivo de "validacion" a "borrador"
        await ContenidoClase.moverContenidoArchivo({
            bucketOrigin: bucketNameContenidoBorradorVerificacion,
            bucketDestination: bucketNameContenidoBorrador,
            rutaOrigin: object.name,
            rutaDestination: `${uidCurso}/${uidClase}/${esArticulo ? 'articulo' : 'video'}.${fileExtension}`
        })

        // TODO: Actualizar el documento Contenido Clase Borrador
        await ContenidoClase.agregarDocumentoBorrador(uidCurso, documentoContenidoClase)

        // TODO: Actualizar el documento claseBorrador
        const snapshot = await db.collectionGroup('ClasesBorrador').where('uid', '==', uidClase).get()
        const docs = snapshot.docs
        for (let i = 0; i < docs.length; i++) {
            const doc = docs[i]
            await doc.ref.update(documentoClase)
        }

        return true
        
    } catch (error) {
        console.log('Error al actualizar un contenido a la clase: ', error)

        // TODO: Eliminar video de "j-cursos-contenido-bv"
        const bucketPrueba = admin.storage().bucket(bucketNameContenidoBorradorVerificacion)
        bucketPrueba.file(object.name).delete()

        const uidCurso = object.name.split('/')[0]
        const uidClase = object.name.split('/')[1]

        if (estadoDelProceso === 'iniciando' || estadoDelProceso === 'verificando') {
            // TODO: Actualizar el documento contenidoClase como ""
            ContenidoClase.actualizarDocumentoBorrador(uidCurso, uidClase, {
                estadoContenido: ''
            })
        }

        if (estadoDelProceso === 'actualizacion') {
            // TODO: Eliminar video de "j-cursos-contenido-b"
            ContenidoClase.eliminarContenidoArchivo({
                bucketName: bucketNameContenidoBorrador,
                rutaPrefix: `${uidCurso}/${uidClase}/`
            })

            const result = await ContenidoClase.obtenerDocumentoBorrador(uidCurso, uidClase)

            // TODO: Actualizar por defecto "contenidoClase"
            // con un mensaje de error: "Hubo un problema al subir este video, inténtelo de nuevo."
            ContenidoClase.agregarDocumentoBorrador(uidCurso, {
                uid: uidClase,
                tipoContenido: '',
                mensajesError: ['Hubo un problema al subir un contenido, inténtelo de nuevo.'],
                contieneErrores: true,
                estadoDocumento: result.contenidoClase.estadoDocumento === 'nuevo' ? 'nuevo' : 'actualizado',
                estadoContenido: '',
            })

            // TODO: Actualziar por defecto "clase"
            const snapshot = await db.collectionGroup('ClasesBorrador').where('uid', '==', uidClase).limit(1).get()
            const doc = snapshot.docs[0]
            doc.ref.update({
                tipoClase: '',
                duracion: 0,
            })
        }

    }
    
})



module.exports = ffContenidoClase