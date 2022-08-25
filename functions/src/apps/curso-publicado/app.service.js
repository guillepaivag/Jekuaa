const express = require('express')
const cors = require('cors')({
  origin: true
})
const manejadorErrores = require('../../helpers/manejoErrores')

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

// CURSOS
apiModerador.use('/', require('./routes'))
apiModerador.use('/miembro', require('./routes/miembro'))
apiModerador.use('/moderador', require('./routes/moderador'))

// MANEJO DE ERRORES
apiModerador.use((err, req, res, next) => { 
  console.log('Error en middleware: ', err)
  
  const respuesta = manejadorErrores( err )
  return res.status( respuesta.estado ).json( respuesta.getRespuesta() )
})


module.exports = apiModerador