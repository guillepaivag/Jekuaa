const express = require('express')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const manejadorErrores = require('./src/helpers/ManejoErrores')

const apiJekuaa = express()

apiJekuaa.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method, token');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
})

const allowlist = ['http://localhost:3000', 'https://jekuaa-py.web.app']
const corsOptionsDelegate = function (req, callback) {
  let corsOptions;
  if (allowlist.indexOf(req.header('Origin')) !== -1) {
    corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false } // disable CORS for this request
  }
  callback(null, corsOptions) // callback expects two parameters: error and options
}
apiJekuaa.use(cors(corsOptionsDelegate))
apiJekuaa.use(express.json())
// apiJekuaa.use(express.raw({
//   inflate: true,
//   limit: '100kb',
//   type: 'application/octet-stream'
// }))
apiJekuaa.use(express.urlencoded({
  extended: true
}))
// apiJekuaa.use(fileUpload())

// rutas
apiJekuaa.use('/usuarios', require('./src/routes/usuarios/Usuario'))
apiJekuaa.use('/blog', require('./src/routes/blogs/Blog'))

apiJekuaa.use((err, req, res, next) => { 
  console.log('err', err)
  console.log('err.errors', err.errors[0])
  
  const {
      status,
      respuesta
  } = manejadorErrores( err )

  return res.status( status ).json( respuesta )
})


module.exports = apiJekuaa