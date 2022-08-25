const admin = require("../../../../firebase-service")
const ContenidoClase = require("./ContenidoClase")

/**
 * IMPORTANTE:
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

class ContenidoVideo extends ContenidoClase {
    constructor (data = {}) {
        const {
            videoData,
            size,               // mb
            fileName, 
            fileExtension, 
            mimeType,
            fechaSubida,
        } = data

        super(data)
        this.videoData = videoData ? videoData : null
        this.size = size ? size : 0
        this.fileName = fileName ? fileName : ''
        this.fileExtension = fileExtension ? fileExtension : ''
        this.mimeType = mimeType ? mimeType : ''
        this.fechaSubida = fechaSubida ? fechaSubida : null
    }

    getContenidoVideo () {
        return {
            ...super.getContenidoClase(),
            videoData: this.videoData,
            size: this.size,
            fileName: this.fileName,
            fileExtension: this.fileExtension,
            mimeType: this.mimeType,
            fechaSubida: this.fechaSubida,
        }
    }

    setContenidoVideo (data = {}) {
        this.setContenidoClase(data)
        this.setVideoData( data.videoData )
        this.setsize( data.size )
        this.setFileName( data.fileName )
        this.setFileExtension( data.fileExtension )
        this.setMimeType( data.mimeType )
        this.setFechaSubida( data.fechaSubida )
    }

    setContenidoClase (contenidoClase = new ContenidoClase()) {
        super.setContenidoClase(contenidoClase)
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

    setFechaSubida ( fechaSubida = null ) {
        this.fechaSubida = fechaSubida
    } 

    static async generarUrlVideo ( datos = { bucketName, rutaPrefix, segundos } ) {
        const { bucketName, rutaPrefix, segundos } = datos

        const bucket = admin.storage().bucket(bucketName)
        const response = await bucket.getFiles({ prefix: rutaPrefix })
        const files = response[0]
        const file = files[0]
        const segundosAux = segundos ? segundos : 18000 // 18000s -> 5hrs

        const links = await file.getSignedUrl({
            action: 'read',
            expires: Date.now() + segundosAux * 1000
        })

        const link = links[0]

        return link
    }
    
    
}

module.exports = ContenidoVideo