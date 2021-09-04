const admin = require('firebase-admin')

const serviceAccount = require('./jekuaaServiceAccountKey.json')

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://jekuaa-py.firebaseio.com"
})

console.log('Administracion de firebase lista')

module.exports = admin