const getAuthToken = (req, res, next) => {
    const { authorization } = req.headers

    req.datos = req.datos ? req.datos : {}
    
    if(authorization && authorization.split(' ')[0] === 'Bearer'){
        req.datos.authToken = authorization.split(' ')[1]
    }else{
        req.datos.authToken = null
    }

    next()
}

module.exports = getAuthToken