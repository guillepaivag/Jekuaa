const getAuthToken = (req, res, next) => {
    const { authorization } = req.headers

    req.jekuaaDatos = req.jekuaaDatos ? req.jekuaaDatos : {}
    
    if(authorization && authorization.split(' ')[0] === 'Bearer'){
        req.jekuaaDatos.authToken = authorization.split(' ')[1]
    }else{
        req.jekuaaDatos.authToken = null
    }

    next()
}

module.exports = getAuthToken