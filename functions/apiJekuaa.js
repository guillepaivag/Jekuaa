const express = require('express')
const cors = require('cors')({
  origin: true
})
const manejadorErrores = require('./src/helpers/ManejoErrores')

const apiJekuaa = express()

apiJekuaa.use((req, res, next) => {
  res.set('Access-Control-Allow-Origin', 'https://jekuaa.web.app')
  res.set('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method, token')
  res.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE')
  // res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE')
  next()
})

apiJekuaa.use((req, res, next) => {
  cors(req, res, () => {
    next()
  })
})
apiJekuaa.use(express.json())
apiJekuaa.use(express.urlencoded({
  extended: true
}))

// RUTAS
apiJekuaa.use('/usuarios', require('./src/routes/usuarios/Usuario'))
apiJekuaa.use('/blog', require('./src/routes/blogs/Blog'))

// MANEJO DE ERRORES
apiJekuaa.use((err, req, res, next) => { 
  console.log('err', err)
  
  const {
      status,
      respuesta
  } = manejadorErrores( err )

  return res.status( status ).json( respuesta )
})


module.exports = apiJekuaa