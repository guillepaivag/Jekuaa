const { Storage } = require('@google-cloud/storage')

// Creates a client
const storage = new Storage({
    projectId: 'jekuaa-py',
    keyFilename: 'jekuaaServiceAccountKey.json'
})

module.exports= storage