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
        
        const rutaDestino = `${uidCurso}/${uidClase}/${fileData.nombreArchivo}`
 
        return await Clase.subirArchivo(bucketName, rutaDestino, fileData)
    }

    static async copiarContenido (datos = {bucket1, bucket2, rutaContenido1, rutaContenido2}) {
        const { bucket1, bucket2, rutaContenido1, rutaContenido2 } = datos

        await Clase.copiarContenido(bucket1, bucket2, rutaContenido1, rutaContenido2)
    }

    static async existeContenido ( datos = { bucketName, uidCurso, uidClase, fileData } ) {
        const { bucketName, uidCurso, uidClase, fileData } = datos
        
        const rutaDestino = `${uidCurso}/${uidClase}/${fileData.nombreArchivo}`

        return Clase.existeArchivo(bucketName, rutaDestino)
    }

    static async eliminarContenido ( datos = { bucketName, uidCurso, uidClase } ) {
        const { bucketName, uidCurso, uidClase } = datos
        
        const rutaDestino = `${uidCurso}/${uidClase}/`

        await Clase.eliminarArchivo(bucketName, rutaDestino)

        return true
    }

    static async generarUrlVideoClase ( datos = { bucketName, uidCurso, uidClase } ) {
        const { bucketName, uidCurso, uidClase } = datos

        const rutaDestino = `${uidCurso}/${uidClase}/`

        const bucket = admin.storage().bucket(bucketName)
        const response = await bucket.getFiles({
            prefix: rutaDestino
        })
        const files = response[0]
        const file = files[0]

        const links = await file.getSignedUrl({
            action: 'read',
            expires: Date.now() + 10 * 1000
        })

        return links[0]
    }

    static async obtenerArticuloClase ( datos = { bucketName, uidCurso, uidClase, getMarkdown } ) {
        const { bucketName, uidCurso, uidClase, getMarkdown } = datos
        
        const rutaDestino = `${uidCurso}/${uidClase}/articulo.md`

        const bucket = admin.storage().bucket(bucketName)
        const file = bucket.file(rutaDestino)

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