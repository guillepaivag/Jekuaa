const functions = require('firebase-functions')
const admin = require('../../../../firebase-service')
const db = require('../../../../db')
const ClasePublicado = require('../../../models/Cursos/clase/ClasePublicado')
const ff = {}


const documentPath = 'CursosPublicado/{uidCursoPublicado}' + 
'/UnidadesPublicado/{uidUnidadPublicado}' + 
'/ClasesPublicado/{uidClasePublicado}'


ff.eliminacionClasePublicado = functions
.region('southamerica-east1')
.firestore.document(documentPath)
.onDelete(async ( change, context ) => {
    const doc = change
    const clasePublicado = new ClasePublicado(doc.data())
    const { uidCursoPublicado, uidUnidadPublicado, uidClasePublicado } = context.params
    
    const decrementar = admin.firestore.FieldValue.increment(-1)

    // Leer todos los progresos referentes a la clase elimianda de todos los estudiantes
    const snapshot = await db
    .collectionGroup('ProgresosClases')
    .where('uidClase', '==', uidClasePublicado)
    .get()

    for (const docProgresoClase of snapshot.docs) {
        const refMiCurso = docProgresoClase.ref.parent.parent

        // Eliminar todos los progresos
        docProgresoClase.ref.delete()

        // Decrementar la cantidad visualizada de su curso
        refMiCurso.update({ cantidadVisualizada: decrementar })
    }
    
    return true
})


module.exports = ff