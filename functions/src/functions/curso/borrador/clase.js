const functions = require('firebase-functions')
const admin = require('../../../../firebase-service')
const db = require('../../../../db')
const ClaseBorrador = require('../../../models/Cursos/clase/ClaseBorrador')
const Clase = require('../../../models/Cursos/clase/Clase')
const generadorDeErroresClaseBorrador = require('../../../helpers/generadorDeErroresClaseBorrador')
const ffClases = {}


// SECCION DE: "DOCUMENTOS"

/**
 * CAMBIO DE ESTADO SI EXISTE LOS DATOS NECESARIOS EN UN
 * DOCUMENTO PARA LA CLASE
*/
let documentPath = 'CursosBorrador/{uidCursoBorrador}'
documentPath += '/UnidadesBorrador/{uidUnidadBorrador}'
documentPath += '/ClasesBorrador/{uidClaseBorrador}'


/**
 * SI SE CREA UNA CLASE, 
 * AUMENTAR EL CONTADOR DE CLASES DE SU UNIDAD 
*/
ffClases.eventoCreacionClaseBorrador = functions
.region('southamerica-east1')
.firestore.document(documentPath)
.onCreate(async ( change, context ) => {
    const doc = change
    const { uidCursoBorrador, uidUnidadBorrador, uidClaseBorrador } = context.params
    const incrementar = admin.firestore.FieldValue.increment(1)

    // Incrementar cantidad de clases
    db
    .collection('CursosBorrador').doc(uidCursoBorrador)
    .update({ cantidadClases: incrementar })

    db
    .collection('CursosBorrador').doc(uidCursoBorrador)
    .collection('UnidadesBorrador').doc(uidUnidadBorrador)
    .update({ cantidadClases: incrementar })
    
})










ffClases.eventoActualizacionClaseBorrador = functions
.region('southamerica-east1')
.firestore.document(documentPath)
.onUpdate(async ( change, context ) => {
    const docNuevo = change.after
    const docViejo = change.before
    
    const { uidCursoBorrador, uidUnidadBorrador, uidClaseBorrador } = context.params

    const claseBorrador = new ClaseBorrador( docNuevo.data() )
    const claseBorradorViejo = new ClaseBorrador( docViejo.data() )

    const datosActualizados = {}
    const mensajesError = await generadorDeErroresClaseBorrador(claseBorrador)

    if ( claseBorrador.mensajesError.length === mensajesError.length ) {
        // No actualizar si tienen los mismos valores
        for (let i = 0; i < claseBorrador.mensajesError.length; i++) {
            const mensaje = claseBorrador.mensajesError[i]
            if (!mensajesError.includes(mensaje)) {
                datosActualizados.mensajesError = mensajesError
                break
            }
        }
    } else {
        datosActualizados.mensajesError = mensajesError
    }

    datosActualizados.contieneErrores = !!mensajesError.length

    // Debe existir el curso
    let ref = db.collection('CursosPublicado').doc(uidCursoBorrador)
    let doc = await ref.get()
    if (doc.exists) {
        // Una unidad nueva, siempre sera etiquetado como nuevo
        // hasta que se acepte los cambios o se eliminen
        if ( claseBorrador.estadoDocumento !== 'nuevo' && !claseBorrador.estadoDocumento.includes('cambioUnidad') ) {
            doc = await ref
            .collection('UnidadesPublicado').doc(uidUnidadBorrador)
            .collection('ClasesPublicado').doc(uidClaseBorrador)
            .get()
            const clasePublicada = new Clase( doc.data() )

            let huboCambio = false
            if ( !huboCambio ) 
                huboCambio = clasePublicada.ordenClase !== claseBorrador.ordenClase
            
            if ( !huboCambio ) 
                huboCambio = clasePublicada.titulo !== claseBorrador.titulo

            if ( !huboCambio ) {
                if ( clasePublicada.contribuyentes.length === claseBorrador.contribuyentes.length ) {
                    for (let i = 0; i < clasePublicada.contribuyentes.length; i++) {
                        const element = clasePublicada.contribuyentes[i]
                        if ( !claseBorrador.contribuyentes.includes(element) ) {
                            huboCambio = true
                            break
                        }
                    }
                } else {
                    huboCambio = true
                }
            }

            if ( !huboCambio ) 
                huboCambio = clasePublicada.descripcion !== claseBorrador.descripcion

            if ( !huboCambio ) 
                huboCambio = clasePublicada.duracion !== claseBorrador.duracion
            
            if ( !huboCambio ) 
                huboCambio = clasePublicada.tipoClase !== claseBorrador.tipoClase

            if ( !huboCambio ) {
                if ( clasePublicada.complementos.length === claseBorrador.complementos.length ) {
                    for (let i = 0; i < clasePublicada.complementos.length; i++) {
                        const element = clasePublicada.complementos[i]
                        if ( !claseBorrador.complementos.includes(element) ) {
                            huboCambio = true
                            break
                        }
                    }
                } else {
                    huboCambio = true
                }
            }

            if ( !huboCambio ) {
                if ( clasePublicada.subtitulos.length === claseBorrador.subtitulos.length ) {
                    for (let i = 0; i < clasePublicada.subtitulos.length; i++) {
                        const element = clasePublicada.subtitulos[i]
                        if ( !claseBorrador.subtitulos.includes(element) ) {
                            huboCambio = true
                            break
                        }
                    }
                } else {
                    huboCambio = true
                }
            }

            if ( !huboCambio ) 
                huboCambio = clasePublicada.vistaPrevia !== claseBorrador.vistaPrevia

            // Si es un documento sin cambios y hubo un cambio, actualizar a "actualizado"
            if ( huboCambio && claseBorrador.estadoDocumento === '' ) 
                datosActualizados.estadoDocumento = 'actualizado'

            // Si es un documento con cambios y no hubo cambios, actualizar a ""
            if ( !huboCambio && claseBorrador.estadoDocumento === 'actualizado' ) 
                datosActualizados.estadoDocumento = ''
        }
    }

    if ( Object.keys(datosActualizados).length ) {
        db
        .collection('CursosBorrador').doc(uidCursoBorrador)
        .collection('UnidadesBorrador').doc(uidUnidadBorrador)
        .collection('ClasesBorrador').doc(uidClaseBorrador)
        .update(datosActualizados)
    }
})







ffClases.actualizacionDuracionCUC = functions
.region('southamerica-east1')
.firestore.document(documentPath)
.onWrite(async ( change, context ) => {    
    const { uidCursoBorrador, uidUnidadBorrador, uidClaseBorrador } = context.params

    const claseBorradorViejo = change.before.exists ? new ClaseBorrador( change.before.data() ) : null
    const claseBorrador = change.after.exists ? new ClaseBorrador( change.after.data() ) : null

    // CREACION
    if (claseBorrador && !claseBorradorViejo) {
        if (claseBorrador.duracion) {
            const incrementar = admin.firestore.FieldValue.increment( claseBorrador.duracion )
        
            db
            .collection('CursosBorrador').doc(uidCursoBorrador)
            .update({
                duracion: incrementar
            })

            db
            .collection('CursosBorrador').doc(uidCursoBorrador)
            .collection('UnidadesBorrador').doc(uidUnidadBorrador)
            .update({
                duracion: incrementar
            })
        }
    }

    // ACTUALIZACION
    if (claseBorrador && claseBorradorViejo) {
        if ( claseBorrador.duracion !== claseBorradorViejo.duracion ) {
            const total = claseBorrador.duracion - claseBorradorViejo.duracion
            const incrementar = admin.firestore.FieldValue.increment( total )
    
            db
            .collection('CursosBorrador').doc(uidCursoBorrador)
            .update({
                duracion: incrementar
            })
    
            db
            .collection('CursosBorrador').doc(uidCursoBorrador)
            .collection('UnidadesBorrador').doc(uidUnidadBorrador)
            .update({
                duracion: incrementar
            })
        }
    }

    // ELIMINACION
    if (!claseBorrador && claseBorradorViejo) {
        if (claseBorradorViejo.duracion) {
            const incrementar = admin.firestore.FieldValue.increment( -claseBorradorViejo.duracion )
        
            db
            .collection('CursosBorrador').doc(uidCursoBorrador)
            .update({
                duracion: incrementar
            })

            db
            .collection('CursosBorrador').doc(uidCursoBorrador)
            .collection('UnidadesBorrador').doc(uidUnidadBorrador)
            .update({
                duracion: incrementar
            })
        }
    }

})





/**
 * SI SE ELIMINA UNA CLASE, 
 * DISMINUIR EL CONTADOR DE CLASES DE SU UNIDAD 
*/
ffClases.eventoEliminacionClaseBorrador = functions
.region('southamerica-east1')
.firestore.document(documentPath)
.onDelete(async ( change, context ) => {
    const doc = change
    const claseBorrador = new ClaseBorrador(doc.data())

    const { uidCursoBorrador, uidUnidadBorrador, uidClaseBorrador } = context.params
    const decrementar = admin.firestore.FieldValue.increment(-1)

    // Decrementar cantidad de clases
    db
    .collection('CursosBorrador').doc(uidCursoBorrador)
    .update({ cantidadClases: decrementar })

    db
    .collection('CursosBorrador').doc(uidCursoBorrador)
    .collection('UnidadesBorrador').doc(uidUnidadBorrador)
    .update({ cantidadClases: decrementar })

    // Reordenar clases
    const snapshot = await ref.collection('ClasesBorrador')
    .where('ordenClase', '>', doc.data().ordenClase)
    .get()

    for (let i = 0; i < snapshot.docs.length; i++) {
        const doc = snapshot.docs[i]
        if (doc.exists) doc.ref.update({ ordenClase: decrementar })
    }

})


module.exports = ffClases