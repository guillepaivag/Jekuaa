const functions = require('firebase-functions')
const ffmpeg = require('fluent-ffmpeg')
const ffprobePath = require("@ffprobe-installer/ffprobe").path
// const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path

const admin = require('../../../../firebase-service')
const ContenidoClaseBorrador = require('../../../models/Cursos/contenidoClase/ContenidoClaseBorrador')
const timestamp = require('../../../utils/timestamp')
const { 
    esValidoElContenidoClaseVideo, 
    esValidoElContenidoClaseArticulo 
} = require('./helpers/contenidoClase')
const config = require("../../../../config")
const db = require('../../../../db')

const ffContenidoClase = {}
const rutaModo = config.environment.mode === 'production' ? 'prod' : 'dev'
let bucketNameContenidoBorrador = rutaModo === 'prod' ? 'j-cursos-contenido-b' : 'j-cursos-contenido-b-dev'
let bucketNameContenidoBorradorVerificacion = rutaModo === 'prod' ? 'j-cursos-contenido-bv' : 'j-cursos-contenido-bv-dev'

ffmpeg.setFfprobePath(ffprobePath)
// ffmpeg.setFfmpegPath(ffmpegPath)

ffContenidoClase.validacionContenidoClase = functions
.region('southamerica-east1')
.storage
.bucket(bucketNameContenidoBorradorVerificacion)
.object().onFinalize(async (object, context) => {
    console.log('object', JSON.stringify(object))

    let estadoDelProceso = 'iniciando'
    
    try {
        const array1 = object.name.split('.')
        const fileExtension = array1[array1.length-1]
        const uidCurso = object.name.split('/')[0]
        const uidClase = object.name.split('/')[1]
        const fileName = object.name.split('/')[2]
        const esArticulo = fileExtension.includes('md')
        
        let file = null
        let videoData = null
        let documentoContenidoClase = {}
        let documentoClase = {}
        estadoDelProceso = 'verificando'

        // Si el documento contenidoClase no esta como "subiendo"
        const contenidoClaseBorrador = new ContenidoClaseBorrador()
        const existe = !!(await contenidoClaseBorrador.importarContenidoClasePorUID(uidCurso, uidClase))
        
        if (!existe || contenidoClaseBorrador.estadoArchivo !== 'subiendo') {
            // TODO: Eiminar el archivo subido en "validacion"
            console.log('No existe este curso o no hay un curso subiendose.')
            throw new Error('No existe este curso o no hay un curso subiendose.')
        }

        // TODO: Actualizar el documento contenidoClase como "procesando"
        await ContenidoClaseBorrador.actualizarDocumento(uidCurso, uidClase, {
            estadoArchivo: 'procesando'
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

            // TODO: Verificacion de datos del archivo
            const mensajesError = esValidoElContenidoClaseArticulo({
                file,
                object,
                uidCurso,
                uidClase,
            })

            // TODO: Construcción del documento contenido clase
            documentoContenidoClase = {
                tipoContenido: 'articulo',
                videoData: null,
                size: file.size,
                fileName: file.fileName,
                fileExtension: file.fileExtension,
                mimeType: file.mimeType,
                fechaActualizacion: timestamp.milliseconds_a_timestamp( Date.now() ),
                mensajesError: mensajesError,
                contieneErrores: !!mensajesError.length,
                estadoDocumento: contenidoClaseBorrador.estadoDocumento === 'nuevo' ? 'nuevo' : 'actualizado',
                estadoArchivo: '',
            }

            // TODO: Construcción del documento clase
            documentoClase = {
                duracion: 0,
                tipoClase: 'articulo',
            }

        } else {
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
            
            const promiseAll = []
            promiseAll.push(new Promise((resolve, reject) => {
                ffmpeg.ffprobe(file.filePath, function(err, metadata) {
                    if (err) return reject(err)
                    file.metadata = metadata
                    resolve()
                })
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
            documentoContenidoClase = {
                tipoContenido: 'video',
                videoData: videoData,
                size: file.size,
                fileName: file.fileName,
                fileExtension: file.fileExtension,
                mimeType: file.mimeType,
                fechaActualizacion: timestamp.milliseconds_a_timestamp( Date.now() ),
                mensajesError: mensajesError,
                contieneErrores: !!mensajesError.length,
                estadoDocumento: contenidoClaseBorrador.estadoDocumento === 'nuevo' ? 'nuevo' : 'actualizado',
                estadoArchivo: '',
            }
            
            // TODO: Construcción del documento clase
            documentoClase = {
                duracion: file.metadata.format.duration,
                tipoClase: 'video',
            }
        }

        estadoDelProceso = 'actualizacion'
        // TODO: Si existe contenido, eliminar el "actual" (asincrono)
        if (contenidoClaseBorrador.tipoContenido) {
            const bucket = admin.storage().bucket(bucketNameContenidoBorrador)
            const rutaDestino = `${uidCurso}/${uidClase}`
            const response = await bucket.getFiles({
                prefix: rutaDestino
            })
            const files = response[0]
            files[0].delete()
        }

        // TODO: Mover el archivo de "validacion" a "actual"
        const promiseAll = []
        promiseAll.push(new Promise((resolve, reject) => {
            const currentBucket = admin.storage().bucket(bucketNameContenidoBorradorVerificacion)
            const currentFile = currentBucket.file(object.name)

            const anotherBucket = admin.storage().bucket(bucketNameContenidoBorrador)
            const anotherFile = anotherBucket.file(object.name)
            
            currentFile.move(anotherFile, function(err, destinationFile, apiResponse) {
                if (err) return reject(err)
                else return resolve()
            })
        }))
        await Promise.all(promiseAll)

        // TODO: Actualizar el documento contenidoClaseBorrador
        await ContenidoClaseBorrador.actualizarDocumento(uidCurso, uidClase, documentoContenidoClase)

        // TODO: Actualizar el documento claseBorrador
        const snapshot = await db.collectionGroup('ClasesBorrador').where('uid', '==', uidClase).limit(1).get()
        const doc = snapshot.docs[0]
        await doc.ref.update(documentoClase)
    } catch (error) {
        console.log('Error al actualizar un contenido a la clase: ', error)

        // TODO: Eliminar video de "j-cursos-contenido-bv"
        const bucketPrueba = admin.storage().bucket(bucketNameContenidoBorradorVerificacion)
        bucketPrueba.file(object.name).delete()

        if (estadoDelProceso === 'actualizacion') {
            const uidCurso = object.name.split('/')[0]
            const uidClase = object.name.split('/')[1]

            // TODO: Eliminar video de "j-cursos-contenido-b"
            const bucket = admin.storage().bucket(bucketNameContenidoBorrador)
            const rutaDestino = `${uidCurso}/${uidClase}`
            bucket.deleteFiles({
                prefix: rutaDestino
            })

            // TODO: Actualizar por defecto "contenidoClase"
            // con un mensaje de error: "Hubo un problema al subir este video, inténtelo de nuevo."
            ContenidoClaseBorrador.actualizarDocumento(uidCurso, uidClase, {
                estadoArchivo: '',
                fechaActualizacion: null,
                fileExtension: '',
                fileName: '',
                mensajesError: ['Hubo un problema al subir este video, inténtelo de nuevo.'],
                contieneErrores: true,
                mimeType: '',
                size: 0,
                tipoContenido: '',
                videoData: null
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