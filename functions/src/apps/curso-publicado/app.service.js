const express = require('express')
const cors = require('cors')
const manejadorErrores = require('../../helpers/manejoErrores')

const api = express()

api.use(cors({
  credentials: true,
  origin: ['https://jekuaapy.com', 'https://jekuaa-py.web.app', 'http://localhost:3000'],
  methods: ['GET','POST','DELETE','PUT','UPDATE','PATCH'],
  allowedHeaders: ['Authorization', 'Content-Type']
}))
api.use(express.json())
api.use(express.urlencoded({ extended: false }))

// CURSOS
api.use('/', require('./routes'))
api.use('/miembro', require('./routes/miembro'))
api.use('/moderador', require('./routes/moderador'))

// MANEJO DE ERRORES
api.use((err, req, res, next) => { 
  console.log('Error en middleware: ', err)
  
  const respuesta = manejadorErrores( err )
  return res.status( respuesta.estado ).json( respuesta.getRespuesta() )
})


module.exports = api