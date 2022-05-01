const express = require('express')
const cors = require('cors')({
  origin: true
})
const manejadorErrores = require('../../helpers/ManejoErrores')

const apiModerador = express()

apiModerador.use((req, res, next) => {
  res.set('Access-Control-Allow-Origin', 'https://jekuaapy.com')
  res.set('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method, token')
  res.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE')
  next()
})

apiModerador.use((req, res, next) => { cors(req, res, () => { next() }) })
apiModerador.use(express.json())
apiModerador.use(express.urlencoded({ extended: true }))

// USUARIO
apiModerador.use('/usuario', require('./routes/usuario'))

// MANEJO DE ERRORES
apiModerador.use((err, req, res, next) => { 
  console.log('Error en middleware: ', err)
  
  const { status, respuesta } = manejadorErrores( err )
  return res.status( status ).json( respuesta )
})


module.exports = apiModerador