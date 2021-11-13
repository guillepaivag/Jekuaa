const functions = require('firebase-functions')

// NUXT SSR
const appNuxt = require('./appNuxt')

// REST-API DE JEKUAA
const apiJekuaa = require('./apiJekuaa')

// Funciones Cloud Functions
const {
  registrarUsuarioPorCorreoYContrasenha
} = require('./src/funcionesFirebaseFunctions/usuarios')
const {
  indexBlogAlgolia
} = require('./src/funcionesFirebaseFunctions/algolia')

/*
 * FUNCIONES - FIREBASE CLOUD FUNCTIONS
 * Cloud Functions para Firebase es un framework sin 
 * servidores que te permite ejecutar de forma automática 
 * el código de backend en respuesta a las solicitudes HTTPS. 
 * Tu código JavaScript o TypeScript se almacena en la nube 
 * de Google y se ejecuta en un entorno administrado.
 */ 

// SSR Para el cliente con Nuxt.js
exports.nuxtssr = functions.region('southamerica-east1').https.onRequest(appNuxt)

// REST-API de Jekuaa
exports.apiJekuaa = functions.region('southamerica-east1').https.onRequest(apiJekuaa)

// Función de registro de usuarios de Jekuaa
exports.registrarUsuarioPorCorreoYContrasenha = registrarUsuarioPorCorreoYContrasenha

// Indexación para blogs
exports.indexBlogAlgolia = indexBlogAlgolia