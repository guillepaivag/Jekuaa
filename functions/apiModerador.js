const express = require('express')
const cors = require('cors')({
  origin: true
})
const manejadorErrores = require('./src/helpers/ManejoErrores')

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
apiModerador.use('/usuario', require('./src/routes/apiModerador/usuario'))

// BLOGS
apiModerador.use('/blog', require('./src/routes/apiModerador/blog'))

// CURSOS
apiModerador.use('/curso/revision', require('./src/routes/apiModerador/curso/revision'))
apiModerador.use('/curso/publicado', require('./src/routes/apiModerador/curso/publicado'))

// MANEJO DE ERRORES
apiModerador.use((err, req, res, next) => { 
  console.log('Error en middleware: ', err)
  
  const { status, respuesta } = manejadorErrores( err )
  return res.status( status ).json( respuesta )
})


module.exports = apiModerador