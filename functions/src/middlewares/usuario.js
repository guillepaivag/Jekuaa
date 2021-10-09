const admin = require('../../firebase-service')
const ErrorJekuaa = require('../models/Error/ErroresJekuaa')
const ErroresJekuaa = require('../models/Error/ErroresJekuaa')
const JekuaaRoles = require('../models/JekuaaRoles')
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
            next(error)
        }
    })
    
}

middlewaresUser.validacionCreacionUsuario = async ( req, res, next ) => {
    
    const { params, jekuaaDatos, body } = req
    const { datosUsuario, contrasenha, confirmacionContrasenha } = body
    const { uidSolicitante, datosAuthSolicitante } = jekuaaDatos
    const { uid } = params

    try {
        // Existencia de datos requeridos
        utilsUsuarios.verificarDatosRequeridos ( datosUsuario, contrasenha, confirmacionContrasenha )

        // Verificacion de los tipos de datos (existentes)
        utilsUsuarios.verificarTipoDeDatosCliente ( datosUsuario, contrasenha, confirmacionContrasenha )

        // Verificacion de validez de datos (existentes)
        await utilsUsuarios.validarDatosExistentesCliente ( datosUsuario, contrasenha, confirmacionContrasenha )
        
        // Construir datos para produccion
        jekuaaDatos.datosUsuarioProduccion = {}
        jekuaaDatos.datosUsuarioProduccion.nuevoUsuario = utilsUsuarios.construirDatosParaNuevoUsuario ( datosUsuario, contrasenha )
        
        return next()

    } catch (error) {
        next(error)
    }
    
}

middlewaresUser.esMiembroJekuaa = async (req, res, next) => {
    
    try {

        const { uidSolicitante, datosAuthSolicitante } = req.jekuaaDatos
        
        const jekuaaRol = new JekuaaRoles({
            rol: datosAuthSolicitante.customClaims.jekuaaRol
        })

        const documentoRol = await jekuaaRol.obtenerDocumentoRol()
        
        if ( !jekuaaRol.esMiembroJekuaa(documentoRol) ) {
            // No autorizado
            throw new ErrorJekuaa({
                codigo: 'jekuaa/error/usuario_no_autorizado'
            })
        }

        return next()

    } catch ( error ) {
        next(error)

    }

}

middlewaresUser.esDeMayorIgualNivel = async ( req, res, next ) => {
    
    try {
        
        const { params, jekuaaDatos } = req
        const { uidSolicitante, datosAuthSolicitante } = jekuaaDatos
        const { uid } = params

        const datosAuthUsuario = await admin.auth().getUser( uid )

        if ( datosAuthSolicitante.customClaims.jekuaaRol !== 'propietario' ) {
            // El solicitante debe tener mayor o igual nivel que el usuario a actualizar
            const diferenciaNivelRol = await JekuaaRoles.compararNivelRoles(datosAuthSolicitante.customClaims.jekuaaRol, 
                datosAuthUsuario.customClaims.jekuaaRol)

            if ( diferenciaNivelRol < 0 ) {
                // No autorizado
                throw new ErrorJekuaa({
                    codigo: 'jekuaa/error/usuario_no_autorizado'
                })
            }
        }

        return next()

    } catch (error) {
        next(error)

    }
    
}

middlewaresUser.esDeMayorNivel = async ( req, res, next ) => {
    
    try {
        const { params, jekuaaDatos } = req
        const { uidSolicitante, datosAuthSolicitante } = jekuaaDatos
        const { uid } = params

        const datosAuthUsuario = await admin.auth().getUser( uid )

        if ( datosAuthSolicitante.customClaims.jekuaaRol !== 'propietario' ) {
            const diferenciaNivelRol = await JekuaaRoles.compararNivelRoles(datosAuthSolicitante.customClaims.jekuaaRol, 
                datosAuthUsuario.customClaims.jekuaaRol)
    
            if ( diferenciaNivelRol <= 0 ) {
                // No autorizado
                throw new ErrorJekuaa({
                    codigo: 'jekuaa/error/usuario_no_autorizado'
                })
            }
        }

        return next()

    } catch (error) {
        next(error)

    }
    
}

middlewaresUser.permisoParaOperarUnRol = async ( req, res, next ) => {
    
    try {
        const { jekuaaDatos, body } = req
        const { datosAuthSolicitante } = jekuaaDatos
        const { datosUsuario } = body
        
        if ( datosAuthSolicitante.customClaims.jekuaaRol !== 'propietario' ) {
            // El solicitante no puede crear un usuario con mayor rol que el de el mismo
            if ( datosUsuario.jekuaaRoles ) {
                const diferenciaNivelRol = await JekuaaRoles.compararNivelRoles(datosAuthSolicitante.customClaims.jekuaaRol, 
                    datosUsuario.jekuaaRoles.jekuaaRol)

                if ( diferenciaNivelRol < 0 ) {
                    //No autorizado
                    throw new ErrorJekuaa({
                        codigo: 'jekuaa/error/usuario_no_autorizado',
                        mensaje: 'No puedes crear o actualizar un usuario con mayor rol que el tuyo.'
                    })
                }
            }
        }

        return next()

    } catch (error) {
        next(error)

    }
    
}

middlewaresUser.validacionActualizacionUsuario = async ( req, res, next ) => {
    
    const { params, jekuaaDatos, body } = req
    const { datosUsuario, contrasenha, confirmacionContrasenha } = body
    const { uidSolicitante, datosAuthSolicitante } = jekuaaDatos
    const { uid } = params

    try {
        if ( !Object.keys(datosUsuario).length && !contrasenha ) {
            throw new ErrorJekuaa({
                codigo: 'jekuaa/error/usuario_mala_solicitud',
                mensaje: 'No hay datos que actualizar.'
            })
        }

        // Verificacion de los tipos de datos (existentes)
        await utilsUsuarios.verificarTipoDeDatosCliente ( datosUsuario, contrasenha, confirmacionContrasenha )

        // Verificacion de validez de datos (existentes)
        await utilsUsuarios.validarDatosExistentesCliente ( datosUsuario, contrasenha, confirmacionContrasenha )
        
        // Construir datos para produccion
        jekuaaDatos.datosUsuarioProduccion = {}
        jekuaaDatos.datosUsuarioProduccion.datosActualizados = utilsUsuarios.construirDatosParaActualizarUsuario ( datosUsuario, contrasenha )
        
        return next()

    } catch (error) {
        next(error)
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