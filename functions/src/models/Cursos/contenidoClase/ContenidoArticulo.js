const showdown  = require('showdown')
const admin = require("../../../../firebase-service")
const ContenidoClase = require("./ContenidoClase")

class ContenidoArticulo extends ContenidoClase {
    constructor (data = {}) {
        const {
            size,               // mb
            fileName, 
            fileExtension, 
            mimeType,
            fechaSubida,
        } = data

        super(data)
        this.size = size ? size : 0
        this.fileName = fileName ? fileName : ''
        this.fileExtension = fileExtension ? fileExtension : ''
        this.mimeType = mimeType ? mimeType : ''
        this.fechaSubida = fechaSubida ? fechaSubida : null
    }

    getContenidoArticulo () {
        return {
            ...super.getContenidoClase(),
            size: this.size,
            fileName: this.fileName,
            fileExtension: this.fileExtension,
            mimeType: this.mimeType,
            fechaSubida: this.fechaSubida,
        }
    }

    setContenidoArticulo (data = {}) {
        this.setContenidoClase(data)
        this.setsize( data.size )
        this.setFileName( data.fileName )
        this.setFileExtension( data.fileExtension )
        this.setMimeType( data.mimeType )
        this.setFechaSubida( data.fechaSubida )
    }

    setContenidoClase (contenidoClase = new ContenidoClase()) {
        super.setContenidoClase(contenidoClase)
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

    static async obtenerArticulo ( datos = { bucketName, rutaPrefix, getMarkdown } ) {
        const { bucketName, rutaPrefix, getMarkdown } = datos

        const bucket = admin.storage().bucket(bucketName)
        const response = await bucket.getFiles({ prefix: rutaPrefix })
        const files = response[0]
        const file = files[0]

        const archivo = file.createReadStream()
        return await new Promise((resolve, reject) => {
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

module.exports = ContenidoArticulo