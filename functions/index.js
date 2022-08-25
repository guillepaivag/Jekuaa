const functions = require('firebase-functions')

const config = require('./config')
const isProduction = config.environment.mode === 'production'

// NUXT SSR
const AppNuxt = require('./src/apps/nuxt')

// REST-API
const ServiceUsuario = require('./src/apps/usuario/app.service')
const ServiceBlog = require('./src/apps/blog/app.service')
const ServiceCursoBorrador = require('./src/apps/curso-borrador/app.service')
const ServiceCursoPublicado = require('./src/apps/curso-publicado/app.service')
const ServicePedido = require('./src/apps/pedido/app.service')

// Funciones Cloud Functions
const {
  indexBlogAlgolia, 
  indexCursoBorradorAlgolia,
  indexCursoPublicadoAlgolia,
  indexUsuarioAlgolia
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
  actualizacionFotoPerfilDeUsuario,
} = require('./src/functions/usuarios')

const { validacionEstadoDocumentoCursoBorrador, actualizacionFotoCurso } = require('./src/functions/curso/borrador')

const { 
  validacionEstadoDocumentoUnidadBorrador, 
  eventoEliminacionUnidadBorrador,
  creacionUnidadBorrador, 
} = require('./src/functions/curso/borrador/unidad')

const { 
  eventoCreacionClaseBorrador,
  eventoActualizacionClaseBorrador,
  eventoEliminacionClaseBorrador,
  actualizacionDuracionCUC
} = require('./src/functions/curso/borrador/clase')

const { validacionContenidoClase } = require('./src/functions/curso/borrador/contenidoClase')
const { eventoPublicacionCurso } = require('./src/functions/curso/publicacion')
const { creacionCursoPublicado, actualizacionCursoPublicado, meGustaCurso } = require('./src/functions/curso/publicado')
const { pedidoCompletado, reembolsoDeUnProducto } = require('./src/functions/pedidos')
const { eliminacionClasePublicado } = require('./src/functions/curso/publicado/clase')


// SSR Para el cliente con Nuxt.js
if (isProduction) 
  exports.defaultNuxtSSR = functions.region('us-central1').https.onRequest(AppNuxt)

// REST-API
exports.serviceUsuario = functions.region('southamerica-east1').https.onRequest(ServiceUsuario)
exports.serviceBlog = functions.region('southamerica-east1').https.onRequest(ServiceBlog)
exports.serviceCursoBorrador = functions.region('southamerica-east1').https.onRequest(ServiceCursoBorrador)
exports.serviceCursoPublicado = functions.region('southamerica-east1').https.onRequest(ServiceCursoPublicado)
exports.servicePedido = functions.region('southamerica-east1').https.onRequest(ServicePedido)


// TRIGGERS:

// Funciones para usuarios
exports.eventoCreacionUsuario = eventoCreacionUsuario
exports.eventoActualizacionUsuario = eventoActualizacionUsuario
exports.eventoEliminacionUsuario = eventoEliminacionUsuario
exports.actualizacionFotoPerfilDeUsuario = actualizacionFotoPerfilDeUsuario
// exports.comienzoProcesoEliminacion = comienzoProcesoEliminacion
// exports.cancelarProcesoEliminacion = cancelarProcesoEliminacion

// Funciones para blogs
exports.eventoCreacionBlog = eventoCreacionBlog
exports.eventoActualizacionBlog = eventoActualizacionBlog
exports.eventoEliminacionBlog = eventoEliminacionBlog
exports.meGustaBlog = meGustaBlog
exports.noMeGustaBlog = noMeGustaBlog

// Funciones para cursos borrador
exports.validacionEstadoDocumentoCursoBorrador = validacionEstadoDocumentoCursoBorrador
exports.actualizacionFotoCurso = actualizacionFotoCurso


// Funciones para unidades borrador
exports.creacionUnidadBorrador = creacionUnidadBorrador
exports.validacionEstadoDocumentoUnidadBorrador = validacionEstadoDocumentoUnidadBorrador
exports.eventoEliminacionUnidadBorrador = eventoEliminacionUnidadBorrador


// Funciones para clases borrador
exports.eventoCreacionClaseBorrador = eventoCreacionClaseBorrador
exports.eventoActualizacionClaseBorrador = eventoActualizacionClaseBorrador
exports.actualizacionDuracionCUC = actualizacionDuracionCUC
exports.eventoEliminacionClaseBorrador = eventoEliminacionClaseBorrador


// Funciones para contenido clase borrador
exports.validacionContenidoClase = validacionContenidoClase


// Funciones para cursos publicado
exports.creacionCursoPublicado = creacionCursoPublicado
exports.actualizacionCursoPublicado = actualizacionCursoPublicado
exports.eliminacionClasePublicado = eliminacionClasePublicado
exports.meGustaCurso = meGustaCurso

// Publicación de curso
exports.eventoPublicacionCurso = eventoPublicacionCurso

// Indexación ALGOLIA
exports.indexUsuarioAlgolia = indexUsuarioAlgolia
exports.indexBlogAlgolia = indexBlogAlgolia
exports.indexCursoBorradorAlgolia = indexCursoBorradorAlgolia
exports.indexCursoPublicadoAlgolia = indexCursoPublicadoAlgolia

// Pedidos
exports.pedidoCompletado = pedidoCompletado
exports.reembolsoDeUnProducto = reembolsoDeUnProducto