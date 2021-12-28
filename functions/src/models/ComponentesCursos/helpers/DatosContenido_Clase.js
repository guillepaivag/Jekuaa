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
            extensionArchivos,  // .ZIP, RAR.
        } = datos

        this.tipoClase = tipoClase ? tipoClase : ''
        this.existeContenido = existeContenido ? existeContenido : false
        this.extensionVideo = extensionVideo ? extensionVideo : ''
        this.extensionArchivos = extensionArchivos ? extensionArchivos : ''
    }
}

module.exports = DatosContenido_Clase