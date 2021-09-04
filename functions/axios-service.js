const axios = require('axios')
const environment = require('./config').environment

const baseURL = environment === 'production' ? 'https://us-central1-jekuaa-py.cloudfunctions.net/appJekuaa' :
                                                'http://localhost:5001/jekuaa-py/us-central1/appJekuaa'
const axiosRef = axios.default.create({
    baseURL
})

module.exports = axios.default