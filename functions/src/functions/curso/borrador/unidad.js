const functions = require('firebase-functions')
const admin = require('../../../../firebase-service')
const db = require('../../../../db')
const UnidadBorrador = require('../../../models/Cursos/unidad/UnidadBorrador')
const Unidad = require('../../../models/Cursos/unidad/Unidad')
const ElementoCursoEliminado = require('../../../models/Cursos/curso/ElementoCursoEliminado')
const generadorDeErroresUnidadBorrador = require('../../../helpers/generadorDeErroresUnidadBorrador')
const ffUnidades = {}



// CAMBIO DE ESTADO SI EXISTE CLASES EN UNIDAD
const documentPath = 'CursosBorrador/{uidCursoBorrador}/UnidadesBorrador/{uidUnidadBorrador}'




ffUnidades.creacionUnidadBorrador = functions
.region('southamerica-east1')
.firestore.document(documentPath)
.onCreate(async (document, context) => {
    const doc = document
    const unidadBorrador = new UnidadBorrador(doc.data())

    const { uidCursoBorrador, uidUnidadBorrador } = context.params
    const incrementar = admin.firestore.FieldValue.increment(1)

    // Incrementar cantidad de unidades
    db
    .collection('CursosBorrador').doc(uidCursoBorrador)
    .update({ cantidadUnidades: incrementar })

})









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

    // Verificaciones
    const mensajesError = await generadorDeErroresUnidadBorrador(unidadBorrador)
   
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

    // Debe existir el curso
    let ref = db.collection('CursosPublicado').doc(uidCursoBorrador)
    let doc = await ref.get()
    if (doc.exists) {
        // Una unidad nueva, siempre sera etiquetado como nuevo
        // hasta que se acepte los cambios o se eliminen
        if ( docNuevo.data().estadoDocumento !== 'nuevo' ) {
            doc = await ref.collection('UnidadesPublicado').doc(uidUnidadBorrador).get()
            const unidadPublicado = new Unidad( doc.data() )

            let huboCambio = false
            if ( !huboCambio ) 
                huboCambio = unidadPublicado.ordenUnidad !== unidadBorrador.ordenUnidad
            
            if ( !huboCambio ) 
                huboCambio = unidadPublicado.nombreUnidad !== unidadBorrador.nombreUnidad

            if ( !huboCambio ) 
                huboCambio = unidadPublicado.cantidadClases !== unidadBorrador.cantidadClases

            if ( !huboCambio ) 
                huboCambio = unidadPublicado.duracion !== unidadBorrador.duracion

            // Si es un documento sin cambios y hubo un cambio, actualizar a "actualizado"
            if ( huboCambio && unidadBorrador.estadoDocumento === '' ) 
                datosActualizados.estadoDocumento = 'actualizado'

            // Si es un documento con cambios y no hubo cambios, actualizar a ""
            if ( !huboCambio && unidadBorrador.estadoDocumento === 'actualizado' ) 
                datosActualizados.estadoDocumento = ''
        }
    }

    if ( Object.keys(datosActualizados).length ) {
        db
        .collection('CursosBorrador').doc(uidCursoBorrador)
        .collection('UnidadesBorrador').doc(uidUnidadBorrador)
        .update(datosActualizados)
    }
    
})








ffUnidades.eventoEliminacionUnidadBorrador = functions
.region('southamerica-east1')
.firestore.document(documentPath)
.onDelete(async (document, context) => {
    const doc = document
    const unidadBorrador = new UnidadBorrador(doc.data())

    const { uidCursoBorrador, uidUnidadBorrador } = context.params
    const decrementar = admin.firestore.FieldValue.increment(-1)

    // Decrementar cantidad de unidades
    db
    .collection('CursosBorrador').doc(uidCursoBorrador)
    .update({ cantidadUnidades: decrementar })

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