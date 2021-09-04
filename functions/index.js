const admin = require('./firebase-service')
const ffUsuarios = require('./funcionesFirebaseFunctions/usuarios')
const functions = require('firebase-functions')
const cors = require('cors')
const { Nuxt } = require('nuxt')
const express = require('express')


/*
  APP NUXT
*/

const appNuxt = express()

const config = {
  dev: true
}
const configNuxt = require('./nuxt.config.js')

const nuxt = new Nuxt({...configNuxt, ...config})
// const nuxt = new Nuxt(config)

let isReady = false
const readyPromise = nuxt
  .ready()
  .then(() => {
    isReady = true
  })
  .catch(() => {
    process.exit(1)
  })

async function handleRequest(req, res) {
  if (!isReady) {
    await readyPromise
  }
  res.set('Cache-Control', 'public, max-age=1, s-maxage=1')
  await nuxt.render(req, res)
}

appNuxt.get('*', handleRequest)
appNuxt.use(handleRequest)

/*
  APP BACKEND
*/ 

const appJekuaa = express()

appJekuaa.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method, token');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});
var allowlist = ['http://localhost:5000', 'http://localhost:5001', 'http://localhost:3000', 'https://jekuaa-py.web.app']
var corsOptionsDelegate = function (req, callback) {
  var corsOptions;
  if (allowlist.indexOf(req.header('Origin')) !== -1) {
    corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false } // disable CORS for this request
  }
  callback(null, corsOptions) // callback expects two parameters: error and options
}
appJekuaa.use(cors(corsOptionsDelegate))
appJekuaa.use(express.json())
appJekuaa.use(express.urlencoded({extended: true}))

// rutas
appJekuaa.use('/miembroJekuaa', require('./src/routes/usuarios/MiembroJekuaa'))


/* FUNCIONES - FIREBASE CLOUD FUNCTIONS */ 
exports.nuxtssr = functions.https.onRequest(appNuxt)

exports.appJekuaa = functions.https.onRequest(appJekuaa)

exports.registrarUsuarioPorCorreoYContrasenha = ffUsuarios.registrarUsuarioPorCorreoYContrasenha

exports.getUserClaims = functions.https.onCall(async (data, context) => {

  console.log ('context', context)

  const uid = context.auth.uid
  let userRecord = null

  console.log('uid', uid)

  if(uid) {

    userRecord = await admin.auth().getUser(uid)
    console.log('userRecord.customClaims', userRecord.customClaims)
    console.log('tipoPremium: ', userRecord.customClaims['tipoPremium']);
    console.log('rol: ', userRecord.customClaims['rol']);
    return userRecord.customClaims
    
    // admin.auth().getUser(uid)
    // .then((userRecord) => {
    //   // The claims can be accessed on the user record.
    //   console.log('userRecord.customClaims', userRecord.customClaims)
    //   console.log('premium: ', userRecord.customClaims['premium']);
    //   console.log('rol: ', userRecord.customClaims['rol']);

    //   return userRecord
    // });

  } else {
    return {
      message: 'Se necesita la UID del usuario.'
    }
  }

})