const express = require('express')
const cors = require('cors')({
  origin: true
})
const manejadorErrores = require('../../helpers/ManejoErrores')

const apiMiembro = express()

apiMiembro.use((req, res, next) => {
  res.set('Access-Control-Allow-Origin', 'https://jekuaapy.com')
  res.set('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method, token')
  res.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE')
  next()
})

apiMiembro.use((req, res, next) => { cors(req, res, () => { next() }) })
apiMiembro.use(express.json())
apiMiembro.use(express.urlencoded({ extended: true }))

// BLOGS
apiMiembro.use('/blog', require('./routes/blog'))

// CURSOS BORRADOR
apiMiembro.use('/curso-borrador', require('./routes/curso-borrador'))
apiMiembro.use('/curso-borrador/unidad', require('./routes/curso-borrador/unidad'))
apiMiembro.use('/curso-borrador/clase', require('./routes/curso-borrador/clase'))
apiMiembro.use('/curso-borrador/contenidoClase', require('./routes/curso-borrador/contenidoClase'))

// MANEJO DE ERRORES
apiMiembro.use((err, req, res, next) => { 
  console.log('Error en middleware: ', err)
  
  const { status, respuesta } = manejadorErrores( err )
  return res.status( status ).json( respuesta )
})


module.exports = apiMiembro