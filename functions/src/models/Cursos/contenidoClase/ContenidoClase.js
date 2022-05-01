const showdown  = require('showdown')

const admin = require("../../../../firebase-service")
const Clase = require("../clase/Clase")


/**
 * IMPORTANTE:
 * 
 * Si el tipoContenido es 'video'
 * 
 * videoData es -> {
 *  duration:  480 <Segundo>
 *  resolution: 1080 <Resolucion>
 *  width: 720 <Pixel>
 *  height: 1080 <Pixel>
 *  sample_aspect_ratio: 1:1 <Relacion>
 *  display_aspect_ratio: 61:45 <Relacion>
 * }
 */

class ContenidoClase {
    constructor ( datos = {} ) {
        const {
            uid,
            tipoContenido,
            videoData,
            size,               // mb
            fileName, 
            fileExtension, 
            mimeType,
        } = datos

        this.uid = uid ? uid : ''
        this.tipoContenido = tipoContenido ? tipoContenido : ''
        this.videoData = videoData ? videoData : null
        this.size = size ? size : 0
        this.fileName = fileName ? fileName : ''
        this.fileExtension = fileExtension ? fileExtension : ''
        this.mimeType = mimeType ? mimeType : ''
    }

    getContenidoClase () {
        return {
            uid: this.uid,
            tipoContenido: this.tipoContenido,
            videoData: this.videoData,
            size: this.size,
            fileName: this.fileName,
            fileExtension: this.fileExtension,
            mimeType: this.mimeType,
        }
    }

    setContenidoClase ( datos = {} ) {
        this.setUid( datos.uid )
        this.setTipoContenido( datos.tipoContenido )
        this.setVideoData( datos.videoData )
        this.setsize( datos.size )
        this.setFileName( datos.fileName )
        this.setFileExtension( datos.fileExtension )
        this.setMimeType( datos.mimeType )
    }

    setUid ( uid = '' ) {
        this.uid = uid
    } 

    setTipoContenido ( tipoContenido = '' ) {
        this.tipoContenido = tipoContenido
    } 

    setVideoData ( videoData = null ) {
        this.videoData = videoData
    } 

    setsize ( size = 0 ) {
        this.size = size
    } 

    setFileName ( fileName = '' ) {
        this.fileName = fileName
    } 

    setFileExtension ( fileExtension = '' ) {
        this.fileExtension = fileExtension
    } 

    setMimeType ( mimeType = '' ) {
        this.mimeType = mimeType
    } 
    

    /**
     * CONTENIDO DE LAS CLASES
     */
    
    static async subirContenido (datos = { bucketName, uidCurso, uidClase, fileData }) {       
        const { bucketName, uidCurso, uidClase, fileData } = datos
        const { nombreArchivo, extensionArchivo, rutaArchivoTemp } = fileData
        
        const rutaDestino = `${uidCurso}/${uidClase}/${nombreArchivo}`

        const bucket = admin.storage().bucket(bucketName)

        const response = await bucket.upload(rutaArchivoTemp, {
            destination: rutaDestino,
            uploadType: 'media',
            metadata: {
                metadata: {
                    contentType: `.${extensionArchivo}`
                }
            }
        })
 
        return response
    }

    static async copiarContenido (datos = {bucketOrigin, bucketDestination, rutaContenidoOrigin, rutaContenidoDestination}) {
        const { bucketOrigin, bucketDestination, rutaContenidoOrigin, rutaContenidoDestination } = datos

        const storage = admin.storage()

        const bucket1 = storage.bucket(bucketOrigin)
        const file1 = bucket1.file(rutaContenidoOrigin)

        const bucket2 = storage.bucket(bucketDestination)
        const file2 = bucket2.file(rutaContenidoDestination)

        await file1.copy(file2)
    }

    static async existeContenido ( datos = { bucketName, uidCurso, uidClase, fileData } ) {
        const { bucketName, uidCurso, uidClase, fileData } = datos
        const { nombreArchivo } = fileData
        
        const rutaDestino = `${uidCurso}/${uidClase}/${nombreArchivo}`

        const bucket = admin.storage().bucket(bucketName)

        const file = bucket.file(rutaDestino)

        const existe = (await file.exists())[0]

        return existe
    }

    static async eliminarContenidoPrefix ( datos = { bucketName, rutaContenidoPrefix } ) {
        const { bucketName, rutaContenidoPrefix } = datos
    
        const bucket = admin.storage().bucket(bucketName)
        await bucket.deleteFiles({ prefix: rutaContenidoPrefix })
    }

    static async generarUrlVideoClasePrefix ( datos = { bucketName, rutaContenidoPrefix } ) {
        const { bucketName, rutaContenidoPrefix } = datos

        const bucket = admin.storage().bucket(bucketName)
        const response = await bucket.getFiles({ prefix: rutaContenidoPrefix })
        const files = response[0]
        const file = files[0]

        // file.publicUrl()
        const links = await file.getSignedUrl({
            action: 'read',
            expires: Date.now() + 10 * 1000
        })

        const link = links[0]

        return link
    }

    static async obtenerArticuloClasePrefix ( datos = { bucketName, rutaContenidoPrefix, getMarkdown } ) {
        const { bucketName, rutaContenidoPrefix, getMarkdown } = datos

        const bucket = admin.storage().bucket(bucketName)
        const response = await bucket.getFiles({
            prefix: rutaContenidoPrefix
        })
        const files = response[0]
        const file = files[0]

        const archivo = file.createReadStream()
        return new Promise((resolve, reject) => {
            let contenido = ''
            archivo
            .on('data', contenidoObtenido => {
                // Obtener el contenido del archivo
                contenido += contenidoObtenido
            })
            .on('end', () => {
                // Formatear de acuerdo a lo que se pide
                // Formato por defecto: HTML
                if ( !getMarkdown ) {
                    const converter = new showdown.Converter()
                    contenido = converter.makeHtml(contenido)
                }
                
                resolve(contenido)
            })
            .on('error', err => {
                reject(err)
            })
        })
    }
}

module.exports = ContenidoClase