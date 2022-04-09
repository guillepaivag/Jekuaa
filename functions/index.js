const functions = require('firebase-functions')

const config = require('./config')
const isProduction = config.environment.mode === 'production'

// NUXT SSR
const appNuxt = require('./src/apps/nuxt')

// REST-API DE JEKUAAPY
const api = require('./src/apps/estudiante')
const apiMiembro = require('./src/apps/miembro')
const apiModerador = require('./src/apps/moderador')

// Funciones Cloud Functions
const {
  indexBlogAlgolia, 
  indexCursoBorradorAlgolia,
  indexCursoPublicadoAlgolia
} = require('./src/functions/algolia')

const {
  eventoCreacionBlog,
  eventoActualizacionBlog,
  eventoEliminacionBlog,
  meGustaBlog,
  noMeGustaBlog,
} = require('./src/functions/blogs')

const {
  eventoCreacionUsuario,
  eventoActualizacionUsuario,
  eventoEliminacionUsuario,
  comienzoProcesoEliminacion,
  cancelarProcesoEliminacion,
} = require('./src/functions/usuarios')

const { validacionEstadoDocumentoCursoBorrador } = require('./src/functions/curso/borrador/curso')

const { 
  validacionEstadoDocumentoUnidadBorrador, 
  eventoEliminacionUnidadBorrador, 
} = require('./src/functions/curso/borrador/unidad')

const { 
  eventoCreacionClaseBorrador,
  eventoActualizacionClaseBorrador,
  eventoEliminacionClaseBorrador,
  actualizacionDuracionCUC
} = require('./src/functions/curso/borrador/clase')

const { validacionContenidoClase } = require('./src/functions/curso/borrador/contenidoClase')
const { eventoPublicacionCurso } = require('./src/functions/curso/publicacion')


// SSR Para el cliente con Nuxt.js
if (isProduction) 
  exports.defaultNuxtSSR = functions.region('us-central1').https.onRequest(appNuxt)

// REST-API de Jekuaapy
exports.api = functions.region('southamerica-east1').https.onRequest(api)
exports.apiMiembro = functions.region('southamerica-east1').https.onRequest(apiMiembro)
exports.apiModerador = functions.region('southamerica-east1').https.onRequest(apiModerador)


// TRIGGERS:

// Funciones para usuarios de Jekuaapy
exports.eventoCreacionUsuario = eventoCreacionUsuario
exports.eventoActualizacionUsuario = eventoActualizacionUsuario
exports.eventoEliminacionUsuario = eventoEliminacionUsuario
// exports.comienzoProcesoEliminacion = comienzoProcesoEliminacion
// exports.cancelarProcesoEliminacion = cancelarProcesoEliminacion

// Funciones para blogs de Jekuaapy
exports.eventoCreacionBlog = eventoCreacionBlog
exports.eventoActualizacionBlog = eventoActualizacionBlog
exports.eventoEliminacionBlog = eventoEliminacionBlog
exports.meGustaBlog = meGustaBlog
exports.noMeGustaBlog = noMeGustaBlog

// Funciones para cursos borrador de Jekuaapy
exports.validacionEstadoDocumentoCursoBorrador = validacionEstadoDocumentoCursoBorrador


// Funciones para unidades borrador de Jekuaapy
exports.validacionEstadoDocumentoUnidadBorrador = validacionEstadoDocumentoUnidadBorrador
exports.eventoEliminacionUnidadBorrador = eventoEliminacionUnidadBorrador


// Funciones para clases borrador de Jekuaapy
exports.eventoCreacionClaseBorrador = eventoCreacionClaseBorrador
exports.eventoActualizacionClaseBorrador = eventoActualizacionClaseBorrador
exports.actualizacionDuracionCUC = actualizacionDuracionCUC
exports.eventoEliminacionClaseBorrador = eventoEliminacionClaseBorrador


// Funciones para contenido clase borrador de Jekuaapy
exports.validacionContenidoClase = validacionContenidoClase


// Publicación de curso
exports.eventoPublicacionCurso = eventoPublicacionCurso


// Indexación ALGOLIA
exports.indexBlogAlgolia = indexBlogAlgolia
exports.indexCursoBorradorAlgolia = indexCursoBorradorAlgolia
exports.indexCursoPublicadoAlgolia = indexCursoPublicadoAlgolia