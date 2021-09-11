const admin = require('../../firebase-service')
const middlewaresUser = {}

// MIDDLEWARES
middlewaresUser.estaAutenticado = (req, res, next) => {

    getAuthToken(req, res, async () => {
        
        try {
            const { authToken } = req.jekuaaDatos

            const userInfo = await admin.auth().verifyIdToken(authToken)
            req.jekuaaDatos.uidSolicitante = userInfo.uid

            const datosAuthSolicitante = await admin.auth().getUser( userInfo.uid )
            req.jekuaaDatos.datosAuthSolicitante = datosAuthSolicitante

            return next()
    
        } catch (error) {
            console.log('error', error)

            return res.status(401).json({
                mensaje: 'No estas autorizado, favor iniciar sesión.',
                resultado: null
            })
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