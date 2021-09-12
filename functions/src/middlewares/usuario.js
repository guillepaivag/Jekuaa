const admin = require('../../firebase-service')
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
                
                let codigo = 'jekuaa/error/usuario_deshabilitado'
                const respuesta = new Respuesta().setRespuestaPorCodigo( codigo )
                const status = respuesta.getInformacionPorCodigo().status

                return res.status( status ).json( respuesta.getRespuesta() )

            }

            return next()
    
        } catch ( error ) {
            console.log('error', error)

            let codigo = 'jekuaa/error/sistema'
            if ( error.code === 'auth/user-not-found' ) {
                codigo = 'jekuaa/error/usuario_no_autenticado'
            }

            const respuesta = new Respuesta().setRespuestaPorCodigo( codigo, {
                resultado: error
            } )
            const status = respuesta.getInformacionPorCodigo().status

            return res.status( status ).json( respuesta.getRespuesta() )
        }
    })
    
}

// FUNCIONES
getAuthToken = (req, res, next) => {
    const {auth} = req.body 

    req.jekuaaDatos = req.jekuaaDatos ? req.jekuaaDatos : {}
    
    if(auth && auth.split(' ')[0] === 'Bearer'){
        req.jekuaaDatos.authToken = auth.split(' ')[1]
    }else{
        req.jekuaaDatos.authToken = null
    }

    next()
}

module.exports = middlewaresUser