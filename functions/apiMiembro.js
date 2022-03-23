const express = require('express')
const cors = require('cors')({
  origin: true
})
const manejadorErrores = require('./src/helpers/ManejoErrores')

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
apiMiembro.use('/blog', require('./src/routes/apiMiembro/blog'))

// CURSOS BORRADOR
apiMiembro.use('/curso/borrador/cursos', require('./src/routes/apiMiembro/curso/borrador/cursos'))
apiMiembro.use('/curso/borrador/unidades', require('./src/routes/apiMiembro/curso/borrador/unidades'))
apiMiembro.use('/curso/borrador/clases', require('./src/routes/apiMiembro/curso/borrador/clases'))
apiMiembro.use('/curso/borrador/contenidoClase', require('./src/routes/apiMiembro/curso/borrador/contenidoClase'))

// REVISION
apiMiembro.use('/curso/revision', require('./src/routes/apiMiembro/curso/revision'))

// MANEJO DE ERRORES
apiMiembro.use((err, req, res, next) => { 
  console.log('Error en middleware: ', err)
  
  const { status, respuesta } = manejadorErrores( err )
  return res.status( status ).json( respuesta )
})


module.exports = apiMiembro