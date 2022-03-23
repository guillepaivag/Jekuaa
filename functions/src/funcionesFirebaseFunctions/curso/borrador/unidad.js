const functions = require('firebase-functions')
const admin = require('../../../../firebase-service')
const db = require('../../../../db')
const UnidadBorrador = require('../../../models/Cursos/unidad/UnidadBorrador')
const Unidad = require('../../../models/Cursos/unidad/Unidad')
const ffUnidades = {}



// CAMBIO DE ESTADO SI EXISTE CLASES EN UNIDAD
const documentPath = 'CursosBorrador/{uidCursoBorrador}/UnidadesBorrador/{uidUnidadBorrador}'



ffUnidades.validacionEstadoDocumentoUnidadBorrador = functions
.region('southamerica-east1')
.firestore.document(documentPath)
.onUpdate(async ( change, context ) => {
    const docNuevo = change.after
    const docViejo = change.before

    const { uidCursoBorrador, uidUnidadBorrador } = context.params

    const unidadBorrador = new UnidadBorrador( docNuevo.data() )
    const unidadBorradorViejo = new UnidadBorrador( docViejo.data() )
    const datosActualizados = {}
    let mensajesError = []

    // Verificaciones
    if ( unidadBorrador.nombreUnidad === '' ) 
        mensajesError.push('La unidad no tiene nombre, favor actualizar.')

    if ( unidadBorrador.cantidadClases === 0 ) 
        mensajesError.push('No existen clases en esta unidad, favor agregar contenido.')

    if ( unidadBorrador.duracion === 0 ) 
        mensajesError.push('La duración de la unidad es 0, favor agregar contenido.')
   
    if ( unidadBorrador.mensajesError.length === mensajesError.length ) {
        // No actualizar si tienen los mismos valores
        for (let i = 0; i < unidadBorrador.mensajesError.length; i++) {
            const mensaje = unidadBorrador.mensajesError[i]
            if (!mensajesError.includes(mensaje)) {
                datosActualizados.mensajesError = mensajesError
                break
            }
        }
    } else {
        datosActualizados.mensajesError = mensajesError
    }
    
    datosActualizados.contieneErrores = !!mensajesError.length

    // Debe existir el curso para realizar la revision
    let ref = db.collection('CursosPublicado').doc(uidCursoBorrador)
    let doc = await ref.get()
    if (doc.exists) {
        // Una unidad nueva, siempre sera etiquetado como nuevo
        // hasta que se acepte los cambios o se eliminen
        if ( docNuevo.data().estadoDocumento !== 'nuevo' ) {
            doc = await ref.collection('Unidades').doc(uidUnidadBorrador).get()
            const unidadPublicado = new Unidad( doc.data() )

            let huboCambio = false
            if ( !huboCambio ) 
                huboCambio = unidadPublicado.ordenUnidad !== unidadBorrador.ordenUnidad
            
            if ( !huboCambio ) 
                huboCambio = unidadPublicado.nombreUnidad !== unidadBorrador.nombreUnidad

            if ( !huboCambio ) 
                huboCambio = unidadPublicado.cantidadClases !== unidadBorrador.cantidadClases

            // Si es un documento sin cambios y hubo un cambio, actualizar a "actualizado"
            if ( huboCambio && unidadBorrador.estadoDocumento === '' ) 
                datosActualizados.estadoDocumento = 'actualizado'

            // Si es un documento con cambios y no hubo cambios, actualizar a ""
            if ( !huboCambio && unidadBorrador.estadoDocumento === 'actualizado' ) 
                datosActualizados.estadoDocumento = ''
        }
    }


    if ( Object.keys(datosActualizados).length ) {
        await db
        .collection('CursosBorrador').doc(uidCursoBorrador)
        .collection('UnidadesBorrador').doc(uidUnidadBorrador)
        .update(datosActualizados)
    }
    
})







// ELIMINAR TODAS LAS CLASES
ffUnidades.eventoEliminacionUnidadBorrador = functions
.region('southamerica-east1')
.firestore.document(documentPath)
.onDelete(async (document, context) => {
    const doc = document

    const { uidCursoBorrador, uidUnidadBorrador } = context.params

    // REORDENAR UNIDADES
    const snapshot = await db
    .collection('CursosBorrador').doc(uidCursoBorrador)
    .collection('UnidadesBorrador')
    .where('ordenUnidad', '>', doc.data().ordenUnidad)
    .get()

    for (let i = 0; i < snapshot.docs.length; i++) {
        const doc = snapshot.docs[i]
        if (!doc.exists) continue
        const decrementar = admin.firestore.FieldValue.increment(-1)
        doc.ref.update({ ordenUnidad: decrementar })
    }

})





module.exports = ffUnidades