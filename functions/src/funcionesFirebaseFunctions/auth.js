const functions = require('firebase-functions')
const admin = require('../../firebase-service')
const db = require('../../db')
const InformacionUsuario = require('../models/ComponentesUsuario/InformacionUsuario')
const Instructor = require('../models/ComponentesUsuario/Instructor')
const ffAuth = {}

ffAuth.eventoCreacionUsuario = functions.region('southamerica-east1').auth.user().onCreate((user) => {
    // Contador de usuarios
    const incrementar = admin.firestore.FieldValue.increment(1)
    db.collection('Contadores').doc('usuarios').update({ cantidad: incrementar })

    // Información del usuario
    const informacionUsuario = new InformacionUsuario({ uid: user.uid })
    informacionUsuario.crear()
})

ffAuth.eventoEliminacionUsuario = functions.region('southamerica-east1').auth.user().onDelete((user) => {
    // Contador de usuarios
    const decrementar = admin.firestore.FieldValue.increment(-1)
    db.collection('Contadores').doc('usuarios').update({ cantidad: decrementar })

    // Información del usuario
    const informacionUsuario = new InformacionUsuario({ uid: user.uid })
    informacionUsuario.eliminar()
})

module.exports = ffAuth