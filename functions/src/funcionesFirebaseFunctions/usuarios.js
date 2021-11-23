const functions = require('firebase-functions')
const admin = require('../../firebase-service')
const db = require('../../db')
const ffUsuarios = {}

ffUsuarios.eventoCreacionUsuario = functions.region('southamerica-east1').auth.user().onCreate((user) => {
    const incrementar = admin.firestore.FieldValue.increment(1)
    const esEstudiante = user.customClaims.jekuaaRol === 'estudiante'

    db.collection('Contadores').doc('usuarios').update({
        cantidad: incrementar
    })

    db.collection('InformacionUsuarios').doc(user.uid).set({
        uid: user.uid,
        descripcion: '',
        especializaciones: '',
        intereses: '',
        rolDescriptivo: 'Estudiante de Jekuaa',
        redesSociales: [],
    })
})

ffUsuarios.eventoEliminacionUsuario = functions.region('southamerica-east1').auth.user().onDelete((user) => {
    const decrementar = admin.firestore.FieldValue.increment(-1)

    db.collection('Contadores').doc('usuarios').update({
        cantidad: decrementar
    })

    db.collection('InformacionUsuarios').doc(user.uid).delete()
})

module.exports = ffUsuarios