const functions = require('firebase-functions')

const admin = require('../../../../firebase-service')
const db = require('../../../../db')
const CursoBorrador = require('../../../models/Cursos/curso/CursoBorrador')
const ffCursos = {}


// SI SE ACTUALIZA UN DOCUMENTO CURSO, VERIFICAR SU VALIDEZ
ffCursos.validacionEstadoDocumentoCursoBorrador = functions
.region('southamerica-east1')
.firestore.document('CursosBorrador/{uidCursoBorrador}')
.onUpdate(async ( change, context ) => {
    const docNuevo = change.after
    const docViejo = change.before

    const { uidCursoBorrador } = context.params
    
    const cursoBorrador = new CursoBorrador( docNuevo.data() )
    const cursoBorradorViejo = new CursoBorrador( docViejo.data() )

    const datosActualizados = {}
    let mensajesError = []

    // Verificaciones
    if ( cursoBorrador.responsable === '' ) mensajesError.push('No existe responsable en este curso, se necesita un responsable.')

    if ( cursoBorrador.contribuyentes.length === 0 ) mensajesError.push('No existen contribuyentes en el curso, se necesita al menos un contribuyente.')
    if ( !cursoBorrador.contribuyentes.includes(cursoBorrador.responsable) ) mensajesError.push('El responsable no pertenece a los contribuyentes.')
    
    if ( cursoBorrador.fotoPerfil === '' ) mensajesError.push('No existe una foto de perfil en este curso, favor actualizar.')
    
    if ( cursoBorrador.titulo === '' ) mensajesError.push('No existe titulo en este curso, favor actualizar.')
    
    if ( cursoBorrador.referenciaURL === '' ) mensajesError.push('No existe referencia url en este curso, favor actualizar.')
    
    if ( cursoBorrador.descripcion === '' ) mensajesError.push('No existe descripción en este curso, favor actualizar.')
    
    if ( cursoBorrador.requisitos.length === 0 ) mensajesError.push('No existen requisitos en este curso, favor actualizar.')
    
    if ( cursoBorrador.objetivos.length === 0 ) mensajesError.push('No existen objetivos en este curso, favor actualizar.')
    
    if ( cursoBorrador.nivel === '' ) mensajesError.push('No existe nivel en este curso, favor actualizar.')

    if ( cursoBorrador.seccion ) {
        if ( cursoBorrador.categoria === '' ) mensajesError.push('No existe una categoria, favor actualizar.')
        if ( cursoBorrador.subCategorias.length === 0 ) mensajesError.push('No existen subcategorias, favor actualizar.')
    }
    
    if ( cursoBorrador.duracion === 0 ) mensajesError.push('La duración del curso es 0, favor agregar contenido.')
    
    if ( cursoBorrador.idioma === '' ) mensajesError.push('No existe idioma principal en este curso, favor actualizar.')

    if ( cursoBorrador.mensajesError.length === mensajesError.length ) {
        // No actualizar si tienen los mismos valores
        for (let i = 0; i < cursoBorrador.mensajesError.length; i++) {
            const mensaje = cursoBorrador.mensajesError[i]
            if (!mensajesError.includes(mensaje)) {
                datosActualizados.mensajesError = mensajesError
                break
            }
        }
    } else {
        datosActualizados.mensajesError = mensajesError
    }

    // Actualizar
    if ( Object.keys(datosActualizados).length ) {
        db
        .collection('CursosBorrador').doc(uidCursoBorrador)
        .update(datosActualizados)
    }
})


module.exports = ffCursos