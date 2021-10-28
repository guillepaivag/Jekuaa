const functions = require('firebase-functions')
const admin = require('firebase-admin')
const algoliasearch = require('algoliasearch')

const config = require('../config')

const algoliaControllers = {}

const INDEX_NAME = config.environment.mode === 'production' ? 'blogs_prod' : 'blogs_dev'

algoliaControllers.indexBlogAlgolia = 
functions.region('southamerica-east1').firestore.document('Blogs/{blogId}').onWrite(async ( change, context ) => {
    // "document" will be empty if it's deleted, otherwise, this contains
    // the updated values.
    const document = change.after.exists ? change.after.data() : null

    // Get the document ID. This will be used as the ID for the indexed content.
    const { blogId } = context.params

    // The API ID and key are stored using Cloud Functions config variables.
    // @see https://firebase.google.com/docs/functions/config-env
    const ALGOLIA_APP_ID = config.algolia_service.app_id
    const ALGOLIA_API_KEY = config.algolia_service.api_key

    // Create an Algolia Search API client.
    const client = algoliasearch.default(ALGOLIA_APP_ID, ALGOLIA_API_KEY)
    const index = client.initIndex(INDEX_NAME)

    async function deleteObject() {
        await index.deleteObject(blogId)

        return true 
    }

    async function saveObject() {
        await index.saveObject({
            objectID: document.uid,
            titulo: document.titulo,
            descripcion: document.descripcion,
            seccion: document.seccion,
            categoria: document.categoria,
            subCategorias: document.subCategorias,
            fechaActualizacion: document.fechaActualizacion.seconds * 1000
        })

        return true
    }

    if (!document) {
        return await deleteObject(blogId)
    }

    if (document.habilitado && document.publicado) {
        return await saveObject()
    } else {
        return await deleteObject(blogId)
    }
})

module.exports = algoliaControllers