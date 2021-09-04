const admin = require('./firebase-service')
const express = require('express')
const Usuario = require('./src/models/Usuario')

const app = express()

app.set('port', 1605)

const usuario1 = new Usuario()



app.listen(app.get('port'), () => {
    console.log(`Server connected in port ${app.get('port')}`)
})