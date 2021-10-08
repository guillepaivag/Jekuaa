const admin = require('../../firebase-service')
const ErroresJekuaa = require('../models/Error/ErroresJekuaa')
const manejadorErrores = require('../models/Error/ManejoErrores/ManejadorErrores')
const Respuesta = require('../models/Respuesta')
const utilsUsuarios = require('../utils/Usuario')
const utilsRolesSecciones = require('../utils/usuarios/RolesSecciones')
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

middlewaresUser.validacionCreacionUsuario = async ( req, res, next ) => {
    
    try {
        const { params, jekuaaDatos, body } = req
        const { datosUsuario, contrasenha, confirmacionContrasenha } = body
        const { uidSolicitante, datosAuthSolicitante } = jekuaaDatos
        const { uid } = params
        
        // Existencia de datos requeridos
        utilsUsuarios.verificarDatosRequeridos ( datosUsuario, contrasenha, confirmacionContrasenha )

        // Verificacion de los tipos de datos (existentes)
        utilsUsuarios.verificarTipoDeDatosCliente ( datosUsuario, contrasenha, confirmacionContrasenha )

        // Verificacion de validez de datos (existentes)
        utilsUsuarios.validarDatosExistentesCliente ( datosUsuario, contrasenha, confirmacionContrasenha )
        
        // Construir datos para produccion
        jekuaaDatos.datosUsuarioProduccion = {}
        jekuaaDatos.datosUsuarioProduccion.nuevoUsuario = utilsUsuarios.construirDatosParaProduccion ( datosUsuario, contrasenha )
        
        return next()

    } catch (error) {

        const {
            status,
            respuesta
        } = manejadorErrores( error )

        return res.status( status ).json( respuesta )

    }
    
}

// FUNCIONES
getAuthToken = (req, res, next) => {
    const { authorization } = req.headers

    req.jekuaaDatos = req.jekuaaDatos ? req.jekuaaDatos : {}
    
    if(authorization && authorization.split(' ')[0] === 'Bearer'){
        req.jekuaaDatos.authToken = authorization.split(' ')[1]
    }else{
        req.jekuaaDatos.authToken = null
    }

    next()
}

module.exports = middlewaresUser