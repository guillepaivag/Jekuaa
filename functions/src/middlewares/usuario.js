const admin = require('../../firebase-service')
const middlewaresUser = {}

// MIDDLEWARES
middlewaresUser.estaAutenticado = (req, res, next) => {
    getAuthToken(req, res, async () => {
        
        try {
            const { authToken } = req

            const userInfo = await admin.auth().verifyIdToken(authToken)
            req.requesterUID = userInfo.uid

            return next()
    
        } catch (error) {
            console.log('error', error)

            return res.status(401).json({error: 'You are not authorized'})
        }
    })
}

// FUNCIONES
getAuthToken = (req, res, next) => {
    const {auth} = req.body 

    if(auth && auth.split(' ')[0] === 'Bearer'){
        req.authToken = auth.split(' ')[1]
    }else{
        req.authToken = null
    }

    next()
}

module.exports = middlewaresUser