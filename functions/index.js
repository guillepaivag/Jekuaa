const functions = require('firebase-functions')

// NUXT SSR
const appNuxt = require('./appNuxt')

// REST-API DE JEKUAA
const apiJekuaa = require('./apiJekuaa')

// Funciones Cloud Functions
const {
  indexBlogAlgolia
} = require('./src/funcionesFirebaseFunctions/algolia')

const {
  eventoCreacionBlog,
  eventoActualizacionBlog,
  eventoEliminacionBlog,
} = require('./src/funcionesFirebaseFunctions/blogs')

const {
  eventoCreacionUsuario,
  eventoEliminacionUsuario,
} = require('./src/funcionesFirebaseFunctions/usuarios')

/*
 * FUNCIONES - FIREBASE CLOUD FUNCTIONS
 * Cloud Functions para Firebase es un framework sin 
 * servidores que te permite ejecutar de forma automática 
 * el código de backend en respuesta a las solicitudes HTTPS. 
 * Tu código JavaScript o TypeScript se almacena en la nube 
 * de Google y se ejecuta en un entorno administrado.
 */ 

// SSR Para el cliente con Nuxt.js
exports.defaultJekuaaNuxtSSR = functions.region('us-central1').https.onRequest(appNuxt)

// REST-API de Jekuaa
exports.apiJekuaa = functions.region('southamerica-east1').https.onRequest(apiJekuaa)

// Funciones para usuarios de Jekuaa
exports.eventoCreacionUsuario = eventoCreacionUsuario
exports.eventoEliminacionUsuario = eventoEliminacionUsuario

// Funciones para blogs de Jekuaa
exports.eventoCreacionBlog = eventoCreacionBlog
exports.eventoActualizacionBlog = eventoActualizacionBlog
exports.eventoEliminacionBlog = eventoEliminacionBlog

// Indexación para blogs
exports.indexBlogAlgolia = indexBlogAlgolia