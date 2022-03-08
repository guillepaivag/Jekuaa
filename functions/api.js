const admin = require('./firebase-service')
const express = require('express')
const cors = require('cors')({ origin: true })
const manejadorErrores = require('./src/helpers/ManejoErrores')
const https = require('https')
const fs = require('fs')
const os = require('os')
const path = require('path')

const api = express()

api.use((req, res, next) => {
  res.set('Access-Control-Allow-Origin', 'https://jekuaapy.com')
  res.set('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method, token')
  res.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE')
  next()
})

api.use((req, res, next) => { cors(req, res, () => { next() }) })
api.use(express.json())
api.use(express.urlencoded({ extended: true }))

// USUARIOS
api.use('/usuario', require('./src/routes/api/usuario'))

// BLOGS
api.use('/blog', require('./src/routes/api/blog'))

// MANEJO DE ERRORES
api.use((err, req, res, next) => { 
  console.log('Error en middleware: ', err)
  
  const { status, respuesta } = manejadorErrores( err )
  return res.status( status ).json( respuesta )
})


module.exports = api





// {
//   "kind": "storage#object",
//   "id": "jekuaa-py.appspot.com/Rain - 12156.mp4/1618174934043802",
//   "selfLink": "https://www.googleapis.com/storage/v1/b/jekuaa-py.appspot.com/o/Rain%20-%2012156.mp4",
//   "mediaLink": "https://content-storage.googleapis.com/download/storage/v1/b/jekuaa-py.appspot.com/o/Rain%20-%2012156.mp4?generation=1618174934043802&alt=media",
//   "name": "Rain - 12156.mp4",
//   "bucket": "jekuaa-py.appspot.com",
//   "generation": "1618174934043802",
//   "metageneration": "1",
//   "contentType": "video/mp4",
//   "storageClass": "STANDARD",
//   "size": "4842958",
//   "md5Hash": "SWWOiq6VPB9gyyFys6dU2A==",
//   "contentDisposition": "inline; filename*=utf-8''Rain%20-%2012156.mp4",
//   "crc32c": "7TClHg==",
//   "etag": "CJqZg7GL9+8CEAE=",
//   "timeCreated": "2021-04-11T21:02:14.076Z",
//   "updated": "2021-04-11T21:02:14.076Z",
//   "timeStorageClassUpdated": "2021-04-11T21:02:14.076Z",
//   "metadata": {
//     "firebaseStorageDownloadTokens": "562c2a93-5bdd-4465-ad3c-42d997813388"
//   }
// }
