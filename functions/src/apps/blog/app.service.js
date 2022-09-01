const express = require('express')
const cors = require('cors')
const manejadorErrores = require('../../helpers/manejoErrores')

const api = express()

// api.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', 'https://jekuaapy.com')
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE')
//   res.setHeader('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method, token')
//   res.setHeader('Access-Control-Allow-Credentials', true)
//   next()
// })

// api.use(cors({
//   credentials: true,
//   origin: 'https://jekuaapy.com',
//   methods: ['GET','POST','DELETE','PUT','UPDATE','PATCH'],
//   allowedHeaders: ['Authorization', 'Content-Type']
// }))

api.use(cors({
  credentials: true,
  origin: ['https://jekuaapy.com', 'https://jekuaa-py.web.app', 'http://localhost:3000'],
  methods: ['GET','POST','DELETE','PUT','UPDATE','PATCH'],
  allowedHeaders: ['Authorization', 'Content-Type']
}))
api.use(express.json())
api.use(express.urlencoded({ extended: false }))

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