const axios = require('axios')
const environment = require('./config').environment

module.exports = function axiosRequest( baseURL ) {

    return axios.default.create({
        baseURL
    })
    
}