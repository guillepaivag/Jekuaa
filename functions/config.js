const functions = require('firebase-functions')

let config = {
    environment: 'development'
}

if( Object.keys(functions.config()).length ) {
    config = functions.config().config
    config.environment === 'development' ? console.log('config', config) : ''
}

module.exports = config