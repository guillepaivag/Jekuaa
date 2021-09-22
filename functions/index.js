const functions = require('firebase-functions')

// NUXT SSR
const appNuxt = require('./appNuxt')

// REST-API DE JEKUAA
const apiJekuaa = require('./apiJekuaa')

// Funciones Cloud Functions
const {
  registrarUsuarioPorCorreoYContrasenha
} = require('./funcionesFirebaseFunctions/usuarios')
const {
  indexBlog
} = require('./funcionesFirebaseFunctions/algolia')

/*
 * FUNCIONES - FIREBASE CLOUD FUNCTIONS
 * Cloud Functions para Firebase es un framework sin 
 * servidores que te permite ejecutar de forma automática 
 * el código de backend en respuesta a las solicitudes HTTPS. 
 * Tu código JavaScript o TypeScript se almacena en la nube 
 * de Google y se ejecuta en un entorno administrado.
 */ 
exports.nuxtssr = functions.https.onRequest(appNuxt)

exports.apiJekuaa = functions.https.onRequest(apiJekuaa)

exports.registrarUsuarioPorCorreoYContrasenha = registrarUsuarioPorCorreoYContrasenha

exports.indexBlog = functions.firestore.document('blogs/{blogId}').onWrite(indexBlog)