const functions = require('firebase-functions')
const admin = require('../../../../firebase-service')
const db = require('../../../../db')
const ClaseBorrador = require('../../../models/Cursos/clase/ClaseBorrador')
const Clase = require('../../../models/Cursos/clase/Clase')
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
    let ref = db
    .collection('CursosBorrador').doc(uidCursoBorrador)
    .collection('UnidadesBorrador').doc(uidUnidadBorrador)

    const doc2 = await ref.get()

    if (doc2.exists) 
        ref.update({ cantidadClases: incrementar })
    
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
    let mensajesError = []

    if ( claseBorrador.titulo === '' ) 
        mensajesError.push('No hay titulo para esta clase, favor actualizar.')

    if ( claseBorrador.descripcion === '' ) 
        mensajesError.push('No hay una descripción para esta clase, favor actualizar.')

    if ( claseBorrador.duracion === 0 ) 
        mensajesError.push('La duración de la clase es 0, favor agregar contenido.')

    if ( claseBorrador.tipoClase === '' ) 
        mensajesError.push('No existe un tipo de clase para esta clase, favor agregue contenido.')

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

    // Debe existir el curso para realizar la revision
    let ref = db.collection('CursosPublicado').doc(uidCursoBorrador)
    let doc = await ref.get()
    if (doc.exists) {
        // Una unidad nueva, siempre sera etiquetado como nuevo
        // hasta que se acepte los cambios o se eliminen
        if ( claseBorrador.estadoDocumento !== 'nuevo' && claseBorrador.estadoDocumento !== 'cambioUnidad' ) {
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

            if ( !huboCambio ) 
                huboCambio = clasePublicada.descripcion !== claseBorrador.descripcion

            if ( !huboCambio ) 
                huboCambio = clasePublicada.duracionClase !== claseBorrador.duracionClase
            
            if ( !huboCambio ) 
                huboCambio = clasePublicada.tipoClase !== claseBorrador.tipoClase

            if ( !huboCambio ) {
                if ( clasePublicada.uidArchivos.length === claseBorrador.uidArchivos.length ) {
                    for (let i = 0; i < clasePublicada.uidArchivos.length; i++) {
                        const element = clasePublicada.uidArchivos[i]
                        if ( !claseBorrador.uidArchivos.includes(element) ) {
                            huboCambio = true
                            break
                        }
                    }
                } else {
                    huboCambio = true
                }
            }

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

    const claseBorrador = change.after.exists ? new ClaseBorrador( change.after.data() ) : null
    const claseBorradorViejo = change.before.exists ? new ClaseBorrador( change.before.data() ) : null

    // CREACION
    if (claseBorrador && !claseBorradorViejo) {
        
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
    const { uidCursoBorrador, uidUnidadBorrador, uidClaseBorrador } = context.params
    const decrementar = admin.firestore.FieldValue.increment(-1)

    let ref = db
    .collection('CursosBorrador').doc(uidCursoBorrador)
    .collection('UnidadesBorrador').doc(uidUnidadBorrador)

    // Decrementar cantidad de clases
    const doc2 = await ref.get()
    if (doc2.exists) 
        ref.update({ cantidadClases: decrementar })

    // Reordenar clases
    const snapshot = await ref.collection('ClasesBorrador')
    .where('ordenClase', '>', doc.data().ordenClase)
    .get()

    for (let i = 0; i < snapshot.docs.length; i++) {
        const doc = snapshot.docs[i]

        if (doc.exists) 
            doc.ref.update({ ordenClase: decrementar })
    }
})



// SECCION DE: "ARCHIVOS -> ARTICULO"

/**
 * SI SE AGREGA UN CONTENIDO EN ARTICULO, 
 * ELIMINAR VIDEO SI EXISTE
 * Y ACTUALIZAR "tipoClase" COMO "articulo" 
*/





/**
 * SI SE ELIMINA UN CONTENIDO EN ARTICULO, 
 * ACTUALIZAR "tipoClase" COMO "" 
*/







// SECCION DE: "ARCHIVOS -> VIDEO"
/**
 * SI SE AGREGA UN CONTENIDO EN VIDEO, 
 * ELIMINAR ARTICULO SI EXISTE
 * Y ACTUALIZAR "tipoClase" COMO "video"
 * Y ACTUALIZAR LA DURACIÓN DE LA CLASE DE ACUERDO AL VIDEO 
*/




/**
 * SI SE ACTUALIZA UN CONTENIDO EN VIDEO, 
 * ACTUALIZAR LA DURACIÓN DE LA CLASE DE ACUERDO AL VIDEO 
*/




/**
 * SI SE ELIMINA UN CONTENIDO EN VIDEO, 
 * ACTUALIZAR "tipoClase" COMO ""
 * Y LA DURACION EN 0 
*/




module.exports = ffClases