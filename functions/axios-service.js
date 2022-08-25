const axios = require('axios')

module.exports = function axiosRequest( baseURL ) {

    return axios.default.create({
        baseURL
    })
    
}