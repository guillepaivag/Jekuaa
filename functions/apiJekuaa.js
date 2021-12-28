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
apiJekuaa.use('/usuario', require('./src/routes/usuario'))
apiJekuaa.use('/estudiante', require('./src/routes/estudiante'))
apiJekuaa.use('/miembroJekuaa', require('./src/routes/miembroJekuaa'))
// apiJekuaa.use('/instructor', require('./src/routes/instructor'))
apiJekuaa.use('/blog', require('./src/routes/blog'))
apiJekuaa.use('/sitemap', require('./src/routes/sitemap'))

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