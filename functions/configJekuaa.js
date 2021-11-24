const functions = require('firebase-functions')

let configJekuaa = Object.keys(functions.config()).length ? 
        functions.config() : require('./config_dev.json')

console.log('configJekuaa', configJekuaa)

module.exports = configJekuaa