const ContenidoClaseBorrador = require("../../../../models/Cursos/contenidoClase/ContenidoClaseBorrador")
const timestamp = require("../../../../utils/timestamp")

const helper = {}

helper.esValidoElContenidoClaseVideo = ( datos = {file, object, uidCurso, uidClase} ) => {
    const { file, object, uidClase, uidCurso } = datos
    
    const mensajesError = []

    // Extensiones permitidas
    if ( file.fileExtension !== 'mp4' && file.fileExtension !== 'mov' && file.fileExtension !== 'wmv' && file.fileExtension !== 'mkv' ) 
        mensajesError.push('Solo se admiten videos de tipo .mp4, .mov, .wmv o .mkv, favor actualize el contenido.')
    
    // Resolucion
    if ( file.metadata.streams[0].height !== 720 && file.metadata.streams[0].height !== 1080 ) 
        mensajesError.push('La resolución permitida solo es de 720 o 1080, favor actualize el contenido.')
    
    // Duracion
    const minuteDuration = file.metadata.format.duration / 60
    const minDuration = 1
    const maxDuration = 60 * 2
    
    if ( minuteDuration < minDuration ) 
        mensajesError.push('El video es muy corto, no tiene que durar menos de 1 minuto, favor actualize el contenido.')
    
    if ( minuteDuration > maxDuration ) 
        mensajesError.push('El video es muy largo, no tiene que durar más de 1 hora, favor actualize el contenido.')
    
    // Tamaño
    const mbSize = file.size / 1000000
    const maxSize = 4000
    if ( mbSize > maxSize ) 
        mensajesError.push('El video debe tener un tamaño menor a 4GB, favor actualize el contenido.')

    return mensajesError
}



helper.construirElContenidoClaseVideo = (file) => {
    // Construcción del documento contenido clase
    const videoData = {}

    videoData.duration = file.metadata.format.duration
    videoData.resolution = file.metadata.streams[0].width
    videoData.width = file.metadata.streams[0].width
    videoData.height = file.metadata.streams[0].height
    videoData.sample_aspect_ratio = file.metadata.streams[0].sample_aspect_ratio
    videoData.display_aspect_ratio = file.metadata.streams[0].display_aspect_ratio

    const documentoContenidoClase = {
        tipoContenido: 'video',
        videoData: videoData,
        size: file.size,
        fileName: file.fileName, 
        fileExtension: file.fileExtension, 
        mimeType: file.mimeType,
        fechaActualizacion: timestamp.milliseconds_a_timestamp( Date.now() ),
    }

    // Construcción del documento clase
    const documentoClase = {
        duracion: file.metadata.format.duration,
        tipoClase: 'video',
    }

    return {
        documentoContenidoClase,
        documentoClase
    }
}



helper.esValidoElContenidoClaseArticulo = ( datos = {file, object, uidCurso, uidClase} ) => {
    const { file, object, uidClase, uidCurso } = datos
    
    const mensajesError = []

    // Extensiones permitidas
    if ( file.fileExtension !== 'md' ) 
        mensajesError.push('Solo se admiten archivos de tipo .md, favor actualize el contenido.')
    
    // Filename
    if ( file.fileName !== 'articulo.md' ) 
        mensajesError.push('El nombre del archivo es incorrecto, favor actualize el contenido.')
    
    // Tamaño
    const mbSize = file.size / 1000000
    const maxSize = 10
    if ( mbSize > maxSize ) 
        mensajesError.push('El articulo debe tener un tamaño menor a 10MB, favor actualize el contenido.')

    return mensajesError
}



helper.construirElContenidoClaseArticulo = (file) => {
    // Construcción del documento contenido clase
    const videoData = {}

    videoData.duration = file.metadata.format.duration
    videoData.resolution = file.metadata.streams[0].width
    videoData.width = file.metadata.streams[0].width
    videoData.height = file.metadata.streams[0].height
    videoData.sample_aspect_ratio = file.metadata.streams[0].sample_aspect_ratio
    videoData.display_aspect_ratio = file.metadata.streams[0].display_aspect_ratio

    const documentoContenidoClase = {
        tipoContenido: 'video',
        videoData: videoData,
        size: file.size,
        fileName: file.fileName, 
        fileExtension: file.fileExtension, 
        mimeType: file.mimeType,
        fechaActualizacion: timestamp.milliseconds_a_timestamp( Date.now() ),
    }

    // Construcción del documento clase
    const documentoClase = {
        duracion: file.metadata.format.duration,
        tipoClase: 'video',
    }

    return {
        documentoContenidoClase,
        documentoClase
    }
}

module.exports = helper