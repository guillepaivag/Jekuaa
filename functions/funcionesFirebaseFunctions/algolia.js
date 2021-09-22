const functions = require('firebase-functions')
const config = require('../config')

const algoliaControllers = {}

const INDEX_NAME = config.environment.mode === 'production' ? 'blogs_prod' : 'blogs_dev'

algoliaControllers.indexBlog = functions.firestore.document('blogs/{blogId}').onWrite(( change, context ) => {
    // "document" will be empty if it's deleted, otherwise, this contains
    // the updated values.
    const document = change.after.exists ? change.after.data() : null

    // Get the document ID. This will be used as the ID for the indexed content.
    const { blogId } = context.params

    // The API ID and key are stored using Cloud Functions config variables.
    // @see https://firebase.google.com/docs/functions/config-env
    const ALGOLIA_APP_ID= config.algolia.app_id
    const ALGOLIA_API_KEY = config.algolia.api_key

    // Create an Algolia Search API client.
    const client = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_API_KEY)
    const index = client.initIndex(INDEX_NAME)

    function deleteObject() {
        return index.deleteObject(blogId)
        .then(() => {
            return true
        })
        .catch((error) => {
            console.error('Error deleting blog from index', error)
        })
    }

    function saveObject() {
        // The body property is stripped of HTMl tags and stop words.
        return index.saveObject({
            objectID: blogId,
            title: document.title,
            body: stopword.removeStopwords(document.body.replace(/(<([^>]+)>)/ig,"").split(' ')).join(' ').replace(/\s\s+/g, ' '),
            tags: document.tags,
            changed: document.changed.toMillis()
        })
        .then(() => {
            return true
        })
        .catch((error) => {
            console.error('Error indexing blog', error)
        })
    }

    if (!document) {
        return deleteObject(blogId)
    } else {
        if (!document.published) {
            return deleteObject(blogId)
        } else {
            return saveObject()
        }
    }
})

module.exports = algoliaControllers