const express = require('express')
const cors = require('cors')({ origin: true })
const manejadorErrores = require('../../helpers/manejoErrores')

const api = express()

api.use((req, res, next) => {
  res.set('Access-Control-Allow-Origin', 'https://jekuaapy.com')
  res.set('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method, token')
  res.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE')
  next()
})

api.use((req, res, next) => { cors(req, res, () => { next() }) })
api.use(express.json())
api.use(express.urlencoded({ extended: true }))

// GENERAL
api.use('/', require('./routes'))

// MIEMBRO
api.use('/miembro', require('./routes/miembro'))

// MODERADOR
api.use('/moderador', require('./routes/moderador'))

// MANEJO DE ERRORES
api.use((err, req, res, next) => { 
  console.log('Error en middleware: ', err)
  
  const respuesta = manejadorErrores( err )
  return res.status( respuesta.estado ).json( respuesta.getRespuesta() )
})


module.exports = api