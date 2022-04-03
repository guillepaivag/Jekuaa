const functions = require('firebase-functions')
const admin = require('../../firebase-service')
const algoliasearch = require('algoliasearch')

const config = require('../../config')
const Blog = require('../models/Blogs/Blog')
const CursoBorrador = require('../models/Cursos/curso/CursoBorrador')
const CursoRevision = require('../models/Cursos/curso/CursoRevision')
const CursoPublicado = require('../models/Cursos/curso/CursoPublicado')

const algoliaControllers = {}

const INDEX_NAME_BLOGS = config.environment.mode === 'production' ? 'prod_blogs' : 'dev_blogs'
const INDEX_NAME_CURSOS_BORRADOR = config.environment.mode === 'production' ? 'prod_cursos_borrador' : 'dev_cursos_borrador'
const INDEX_NAME_CURSOS_REVISION = config.environment.mode === 'production' ? 'prod_cursos_revision' : 'dev_cursos_revision'
const INDEX_NAME_CURSOS_PUBLICADO = config.environment.mode === 'production' ? 'prod_cursos_publicado' : 'dev_cursos_publicado'

algoliaControllers.indexBlogAlgolia = 
functions.region('southamerica-east1').firestore.document('Blogs/{blogId}').onWrite(async ( change, context ) => {
    // "document" will be empty if it's deleted, otherwise, this contains
    // the updated values.
    const document = change.after.exists ? change.after.data() : null
    const oldDocument = change.before.exists ? change.before.data() : null
    
    // Get the document ID. This will be used as the ID for the indexed content.
    const { blogId } = context.params

    // The API ID and key are stored using Cloud Functions config variables.
    // @see https://firebase.google.com/docs/functions/config-env
    const ALGOLIA_APP_ID = config.algolia_service.app_id
    const ALGOLIA_API_KEY = config.algolia_service.api_key

    // Create an Algolia Search API client.
    const client = algoliasearch.default(ALGOLIA_APP_ID, ALGOLIA_API_KEY)
    const index = client.initIndex(INDEX_NAME_BLOGS)

    async function deleteObject() {
        await index.deleteObject(blogId)

        return true 
    }

    async function saveObject() {
        const blog = new Blog(document)
        const datosBlog = blog.getBlog()

        datosBlog.objectID = datosBlog.uid
        delete datosBlog.uid
        datosBlog.fechaCreacion = document.fechaCreacion.seconds
        datosBlog.fechaActualizacion = document.fechaActualizacion.seconds
        

        await index.saveObject(datosBlog)

        return true
    }

    if (!document) return await deleteObject(blogId)
    else return await saveObject()
    
})


algoliaControllers.indexCursoBorradorAlgolia = 
functions.region('southamerica-east1').firestore.document('CursosBorrador/{uidCursoBorrador}').onWrite(async ( change, context ) => {
    // "document" will be empty if it's deleted, otherwise, this contains
    // the updated values.
    const document = change.after.exists ? change.after.data() : null
    const oldDocument = change.before.exists ? change.before.data() : null
    
    // Get the document ID. This will be used as the ID for the indexed content.
    const { uidCursoBorrador } = context.params

    // The API ID and key are stored using Cloud Functions config variables.
    // @see https://firebase.google.com/docs/functions/config-env
    const ALGOLIA_APP_ID = config.algolia_service.app_id
    const ALGOLIA_API_KEY = config.algolia_service.api_key

    // Create an Algolia Search API client.
    const client = algoliasearch.default(ALGOLIA_APP_ID, ALGOLIA_API_KEY)
    const index = client.initIndex(INDEX_NAME_CURSOS_BORRADOR)

    async function deleteObject() {
        await index.deleteObject(uidCursoBorrador)

        return true 
    }

    async function saveObject() {
        const cursoBorrador = new CursoBorrador(document)
        const datosCursoBorrador = cursoBorrador.getCursoBorrador()

        datosCursoBorrador.objectID = datosCursoBorrador.uid
        delete datosCursoBorrador.uid
        
        datosCursoBorrador.datosPrecio.fechaFinDescuento ? 
        datosCursoBorrador.datosPrecio.fechaFinDescuento = datosCursoBorrador.datosPrecio.fechaFinDescuento.seconds : ''
        
        await index.saveObject(datosCursoBorrador)

        return true
    }

    if (!document) return await deleteObject()
    else return await saveObject()
    
})


algoliaControllers.indexCursoRevisionAlgolia = 
functions.region('southamerica-east1').firestore.document('CursosRevision/{uidCursoRevision}').onWrite(async ( change, context ) => {
    // "document" will be empty if it's deleted, otherwise, this contains
    // the updated values.
    const document = change.after.exists ? change.after.data() : null
    const oldDocument = change.before.exists ? change.before.data() : null
    
    // Get the document ID. This will be used as the ID for the indexed content.
    const { uidCursoRevision } = context.params

    // The API ID and key are stored using Cloud Functions config variables.
    // @see https://firebase.google.com/docs/functions/config-env
    const ALGOLIA_APP_ID = config.algolia_service.app_id
    const ALGOLIA_API_KEY = config.algolia_service.api_key

    // Create an Algolia Search API client.
    const client = algoliasearch.default(ALGOLIA_APP_ID, ALGOLIA_API_KEY)
    const index = client.initIndex(INDEX_NAME_CURSOS_REVISION)

    async function deleteObject() {
        await index.deleteObject(uidCursoRevision)

        return true 
    }

    async function saveObject() {
        const cursoRevision = new CursoRevision(document)
        const datosCursoRevision = cursoRevision.getRevision()

        const cursoBorrador = new CursoBorrador()
        await cursoBorrador.importarDatosDeUnCurso(uidCursoRevision)

        datosCursoRevision.objectID = datosCursoRevision.uid
        delete datosCursoRevision.uid

        datosCursoRevision.datosCurso = cursoBorrador.getCurso()
        
        datosCursoRevision.fechaInicioRevision ? 
        datosCursoRevision.fechaInicioRevision = datosCursoRevision.fechaInicioRevision.seconds : ''
        
        await index.saveObject(datosCursoRevision)

        return true
    }

    if (!document) return await deleteObject()
    else return await saveObject()
    
})


algoliaControllers.indexCursoPublicadoAlgolia = 
functions.region('southamerica-east1').firestore.document('CursosPublicado/{uidCursoPublicado}').onWrite(async ( change, context ) => {
    // "document" will be empty if it's deleted, otherwise, this contains
    // the updated values.
    const document = change.after.exists ? change.after.data() : null
    const oldDocument = change.before.exists ? change.before.data() : null
    
    // Get the document ID. This will be used as the ID for the indexed content.
    const { uidCursoPublicado } = context.params

    // The API ID and key are stored using Cloud Functions config variables.
    // @see https://firebase.google.com/docs/functions/config-env
    const ALGOLIA_APP_ID = config.algolia_service.app_id
    const ALGOLIA_API_KEY = config.algolia_service.api_key

    // Create an Algolia Search API client.
    const client = algoliasearch.default(ALGOLIA_APP_ID, ALGOLIA_API_KEY)
    const index = client.initIndex(INDEX_NAME_CURSOS_PUBLICADO)

    async function deleteObject() {
        await index.deleteObject(uidCursoPublicado)

        return true 
    }

    async function saveObject() {
        const cursoPublicado = new CursoPublicado(document)
        const datosCursoPublicado = cursoPublicado.getCursoPublicado()

        datosCursoPublicado.objectID = datosCursoPublicado.uid
        delete datosCursoPublicado.uid

        datosCursoPublicado.datosPrecio.fechaFinDescuento ? 
        datosCursoPublicado.datosPrecio.fechaFinDescuento = datosCursoPublicado.datosPrecio.fechaFinDescuento.seconds : ''

        datosCursoPublicado.fechaCreacion ? 
        datosCursoPublicado.fechaCreacion = datosCursoPublicado.fechaCreacion.seconds : ''

        datosCursoPublicado.fechaActualizacion ? 
        datosCursoPublicado.fechaActualizacion = datosCursoPublicado.fechaActualizacion.seconds : ''
        
        await index.saveObject(datosCursoPublicado)

        return true
    }

    if (!document) return await deleteObject()
    else return await saveObject()
    
})


module.exports = algoliaControllers