const TIPOS_CLASES_VALIDAS = [
    'video',
    'archivos',
    'video-archivos',
    'examen',
]

class DatosContenido_Clase {
    constructor (datos = {}) {
        const {
            tipoClase,
            existeContenido,
            extensionVideo,     // .MP4, .WMV, y .MOV
            extensionArchivo,   // .ZIP, RAR.
        } = datos

        this.tipoClase = tipoClase ? tipoClase : ''
        this.existeContenido = existeContenido ? existeContenido : false
        this.extensionVideo = extensionVideo ? extensionVideo : ''
        this.extensionArchivo = extensionArchivo ? extensionArchivo : ''
    }

    getDatosContenido_Clase ( getJSON = false ) {
        if ( getJSON ) {
            return JSON.parse( JSON.stringify( this ) )
        }

        return this
    }
}

module.exports = DatosContenido_Clase