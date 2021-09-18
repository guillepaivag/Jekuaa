const admin = require('../../firebase-service')
const ErroresJekuaa = require('../models/Error/ErroresJekuaa')
const manejadorErrores = require('../models/Error/ManejoErrores/ManejadorErrores')
const Respuesta = require('../models/Respuesta')
const middlewaresUser = {}

// MIDDLEWARES
middlewaresUser.estaAutenticado = (req, res, next) => {

    getAuthToken(req, res, async () => {
        
        try {
            const { authToken } = req.jekuaaDatos

            const userInfo = await admin.auth().verifyIdToken( authToken )
            req.jekuaaDatos.uidSolicitante = userInfo.uid

            const datosAuthSolicitante = await admin.auth().getUser( userInfo.uid )
            req.jekuaaDatos.datosAuthSolicitante = datosAuthSolicitante

            if ( datosAuthSolicitante.disabled ) {

                throw new ErroresJekuaa({
                    codigo: 'jekuaa/error/usuario_no_autorizado',
                    mensaje: 'No estas autorizado, el usuario esta deshabilitado.',
                })

            }

            return next()
    
        } catch ( error ) {
            console.log('error', error)

            const {
                status,
                respuesta
            } = manejadorErrores( error )

            return res.status( status ).json( respuesta )
        }
    })
    
}

// FUNCIONES
getAuthToken = (req, res, next) => {
    const { auth } = req.body 

    req.jekuaaDatos = req.jekuaaDatos ? req.jekuaaDatos : {}
    
    if(auth && auth.split(' ')[0] === 'Bearer'){
        req.jekuaaDatos.authToken = auth.split(' ')[1]
    }else{
        req.jekuaaDatos.authToken = null
    }

    next()
}

module.exports = middlewaresUser