const functions = require('firebase-functions')

let config = Object.keys(functions.config()).length ? 
        functions.config() : require('./config_dev.json')

console.log('config', config)

module.exports = config