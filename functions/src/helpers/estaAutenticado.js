const { request, response } = require('express')

const admin = require('../../firebase-service')
const getAuthToken = require('./getAuthToken')

const estaAutenticado = (req = request, res = response, next) => {
    const myNext = async () => {
        
        try {
            const { authToken } = req.datos

            const userInfo = await admin.auth().verifyIdToken( authToken )
            req.datos.uidSolicitante = userInfo.uid

            const datosAuthSolicitante = await admin.auth().getUser( userInfo.uid )
            req.datos.datosAuthSolicitante = datosAuthSolicitante

            return next()
    
        } catch ( error ) {
            console.log('error', error)
            next(error)
        }
    }

    getAuthToken(req, res, myNext)
    
}

module.exports = estaAutenticado