const { Storage } = require('@google-cloud/storage')

const config = require('./config')

const isProduction = config.environment.mode === 'production'

// Creates a client
const storage = new Storage({
    projectId: isProduction ? 'jekuaa-py' : 'jekuaa-py-dev',
    keyFilename: isProduction ? 'jekuaapyServiceAccountKey.json' : 'jekuaapyServiceAccountKeyDev.json'
})

module.exports= storage