const admin = require('../../firebase-service')
const db = require('../../db')
const getAuthToken = require('../helpers/getAuthToken')
const ErrorJekuaa = require('../models/Error/ErroresJekuaa')
const ErroresJekuaa = require('../models/Error/ErroresJekuaa')
const JekuaaPremium = require('../models/JekuaaPremium')
const JekuaaRoles = require('../models/JekuaaRoles')
const Instructor = require('../models/TiposUsuarios/Instructor')
const Usuario = require('../models/Usuario')
const validarEmail = require('../utils/emailValido')
const esAlfanumerico = require('../utils/esAlfanumerico')
const obtenerEdad = require('../utils/obtenerEdad')
const utilsUsuarios = require('../utils/Usuario')
const middlewaresUser = {}

const COLECCION_USUARIO = 'Usuarios'

// MIDDLEWARES
middlewaresUser.estaAutenticado = (req, res, next) => {

    const myNext = async () => {
        
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
    }

    getAuthToken(req, res, myNext)
    
}

middlewaresUser.esMiembroJekuaa = async (req, res, next) => {
    
    try {
        const { uidSolicitante, datosAuthSolicitante } = req.jekuaaDatos
        
        const docRol = await JekuaaRoles.obtenerDocumentoRol(datosAuthSolicitante.customClaims.jekuaaRol)
        
        if ( !docRol.data().esMiembroJekuaa ) {
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

middlewaresUser.esAdmin = async (req, res, next) => {
    
    try {
        const { uidSolicitante, datosAuthSolicitante } = req.jekuaaDatos
        
        const documentoRol = await JekuaaRoles.obtenerDocumentoRol(datosAuthSolicitante.customClaims.jekuaaRol)

        if (!documentoRol.data().esAdmin) {
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
            if ( datosUsuario && datosUsuario.jekuaaRol ) {
                const diferenciaNivelRol = await JekuaaRoles.compararNivelRoles(datosAuthSolicitante.customClaims.jekuaaRol, 
                    datosUsuario.jekuaaRol)

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





middlewaresUser.verificarDatosRequeridos = ( req, res, next ) => {
    const { jekuaaDatos, body } = req
    const { uidSolicitante, datosAuthSolicitante } = jekuaaDatos
    const { datosUsuario, contrasenha, confirmacionContrasenha } = body
    
    try {
        if ( !datosUsuario ) {
            throw new ErrorJekuaa({
                codigo: 'jekuaa/error/usuario_mala_solicitud',
                mensaje: 'No hay datos para crear un usuario.'
            })
        }

        if ( !contrasenha ) {
            throw new ErrorJekuaa({
                codigo: 'jekuaa/error/usuario_mala_solicitud',
                mensaje: 'No existe la contraseña.'
            })
        }
    
        if ( !confirmacionContrasenha ) {
            throw new ErrorJekuaa({
                codigo: 'jekuaa/error/usuario_mala_solicitud',
                mensaje: 'No existe la confirmación de contraseña.'
            })
        }
    
        const {
            uid,
            nombreUsuario,
            correo,
            nombreCompleto,
            fechaNacimiento,
            jekuaaPremium,
            jekuaaRol,
            instructor,
            jekuaaPoint
        } = datosUsuario
    
        if ( !nombreUsuario ) {
            throw new ErrorJekuaa({
                codigo: 'jekuaa/error/usuario_mala_solicitud',
                mensaje: 'No existe el nombre de usuario.'
            })
        }
    
        if ( !correo ) {
            throw new ErrorJekuaa({
                codigo: 'jekuaa/error/usuario_mala_solicitud',
                mensaje: 'No existe el correo.'
            })
        }
        
        next()
    } catch (error) {
        next(error)
    }
}

middlewaresUser.verificarTipoDeDatosCliente = ( req, res, next ) => {
    const { jekuaaDatos, body } = req
    const { datosUsuario, contrasenha, confirmacionContrasenha } = body
    const { uidSolicitante, datosAuthSolicitante } = jekuaaDatos

    try {
        const esRutaAdmin = req.originalUrl.split('/')[2] === 'adminJekuaa'

        const {
            uid,
            nombreUsuario,
            correo,
            nombreCompleto,
            fechaNacimiento,
            jekuaaPremium,
            jekuaaRol,
            instructor,
            jekuaaPoint
        } = datosUsuario
    
        if ( nombreUsuario && typeof nombreUsuario != 'string' ) {
            throw new TypeError('El nombreUsuario debe ser de tipo string.', 'Usuario.js')
        }
    
        if ( correo && typeof correo != 'string' ) {
            throw new TypeError('El correo debe ser de tipo string.', 'Usuario.js')
        }
    
        if ( nombreCompleto && typeof nombreCompleto != 'string' ) {
            throw new TypeError('Debe de ser de tipo string el nombre completo del usuario.', 'Usuario.js')
        }
    
        if ( fechaNacimiento && typeof fechaNacimiento != 'number' ) {
            throw new TypeError('La fecha de nacimiento debe ser de tipo number en milisegundos.', 'Usuario.js')
        }
    
        if (esRutaAdmin) {

            if ( jekuaaPremium ) {
                if ( typeof jekuaaPremium != 'object' ) {
                    throw new TypeError('El campo jekuaaPremium debe ser un objeto.', 'Usuario.js')
                }
                const verificadorFormato = new JekuaaPremium(jekuaaPremium)
                verificadorFormato.validarTodosLosTiposDeDatos('cliente')
            }
        
            if ( jekuaaRol && typeof jekuaaRol != 'string' ) {
                throw new TypeError('El rol debe de ser de tipo string.', 'Usuario.js')
            }
        
            if ( instructor !== undefined && typeof instructor != 'boolean' ) {
                throw new TypeError('El estado instructor debe ser de tipo boolean.', 'Usuario.js')
            }
        
            if ( jekuaaPoint && typeof jekuaaPoint != 'number' ) {
                throw new TypeError('El jekuaaPoint no es de tipo numerico.', 'Usuario.js')
            }
        }
    
        if ( contrasenha && typeof contrasenha != 'string' ) {
            throw new TypeError('La contraseña debe ser de tipo string.', 'Usuario.js')
        }
    
        if ( contrasenha && confirmacionContrasenha && typeof confirmacionContrasenha != 'string' ) {
            throw new TypeError('La confirmación de contraseña debe ser de tipo string.', 'Usuario.js')
        }

        next()
        
    } catch (error) {
        next(error)
    }
}

middlewaresUser.validarDatosExistentesCliente = async (req, res, next) => {
    const { jekuaaDatos, params, body } = req
    const { datosUsuario, contrasenha, confirmacionContrasenha } = body
    const { uidSolicitante, datosAuthSolicitante } = jekuaaDatos
    
    try {
        const esRutaAdmin = req.originalUrl.split('/')[2] === 'adminJekuaa'
        const esOperacionAgregar = req.method === 'POST'
        
        const {
            uid,
            nombreUsuario,
            correo,
            nombreCompleto,
            fechaNacimiento,
            jekuaaPremium,
            jekuaaRol,
            instructor,
            jekuaaPoint
        } = datosUsuario
    
        let cantidadCaracteresValido
        let correoValido
        let fechaNacimientoValido
        let valido

        const datosActualesUsuario = await admin.auth().getUser(params.uid)
    
        if (datosUsuario) {
            // Nombre de usuario
            if ( nombreUsuario ) {
                // Verificar que sea alfanumerico
                if (!esAlfanumerico(nombreUsuario)) {
                    throw new ErrorJekuaa({
                        codigo: 'jekuaa/error/usuario_mala_solicitud',
                        mensaje: 'El nombre de usuario solo puede tener (a-z) (A-Z) (0-9) (_).'
                    })
                }
                
                // Verificar tamaño
                cantidadCaracteresValido = nombreUsuario.length >= 1 && nombreUsuario.length <= 20
                valido = cantidadCaracteresValido
                if ( !valido ) {
                    throw new ErrorJekuaa({
                        codigo: 'jekuaa/error/usuario_mala_solicitud',
                        mensaje: 'El nombre de usuario debe ser mayor a 0 y menor a 21.'
                    })
                }

                await Usuario.errorExisteUsuario({
                    nombreUsuario: datosUsuario.nombreUsuario
                })
            }
    
            // Correo
            if (correo) {
                cantidadCaracteresValido = correo.length >= 5 && correo.length <= 100
                correoValido = validarEmail(correo)
                valido = cantidadCaracteresValido && correoValido
                if ( !valido ) {
                    throw new ErrorJekuaa({
                        codigo: 'jekuaa/error/usuario_mala_solicitud',
                        mensaje: 'El correo debe ser válido y entre 5 a 100 carácteres.'
                    })
                }
            }
    
            // Nombre completo
            if (nombreCompleto) {
                cantidadCaracteresValido = nombreCompleto.length >= 1 && nombreCompleto.length <= 100
                valido = cantidadCaracteresValido
                if ( !valido ) {
                    throw new ErrorJekuaa({
                        codigo: 'jekuaa/error/usuario_mala_solicitud',
                        mensaje: 'El nombre completo debe ser mayor a 0 y menor a 101.'
                    })
                }
            }
    
            // Fecha de nacimiento
            if (fechaNacimiento) {
                // Solo si tiene 1 año de edad puede registrarse
                fechaNacimientoValido = obtenerEdad(fechaNacimiento)
                valido = fechaNacimientoValido >= 1
                if ( !valido ) {
                    throw new ErrorJekuaa({
                        codigo: 'jekuaa/error/usuario_mala_solicitud',
                        mensaje: 'El usuario debe tener al menos 1 año de edad.'
                    })
                }
            }
    
            if (esRutaAdmin) {

                // Jekuaa Premium
                if ( jekuaaPremium ) {
                    const jekuaaPlan = new JekuaaPremium({
                        plan: jekuaaPremium.plan,
                        fechaCompra: jekuaaPremium.fechaCompra,
                        fechaHasta: jekuaaPremium.fechaHasta,
                    })
    
                    await jekuaaPlan.validarDatosCliente()
                }
    
                // Jekuaa Roles
                if ( jekuaaRol ) {
                    let documentoRol = await JekuaaRoles.obtenerDocumentoRol(jekuaaRol)
                    
                    // Verificar rol valido
                    if (!documentoRol.exists) {
                        throw new ErrorJekuaa({
                            codigo: 'jekuaa/error/usuario_mala_solicitud',
                            mensaje: 'No existe este rol.'
                        })
                    }

                    // Verificar permiso para operar el rol
                    if ( datosAuthSolicitante.customClaims.jekuaaRol !== 'propietario' ) {
                        const diferenciaNivelRol = await JekuaaRoles.compararNivelRoles(datosAuthSolicitante.customClaims.jekuaaRol, 
                            jekuaaRol)
                
                        if ( diferenciaNivelRol <= 0 ) {
                            // No autorizado
                            throw new ErrorJekuaa({
                                codigo: 'jekuaa/error/usuario_no_autorizado'
                            })
                        }
                    }
                }
    
                // Instructor
                if ( instructor != undefined ) {
    
                    let rol = jekuaaRol

                    if (!jekuaaRol) {
                        rol = esOperacionAgregar ? 
                        'estudiante' : datosActualesUsuario.customClaims.jekuaaRol
                    }
                    
                    // Verificar si tiene permiso
                    const permisoInstructor = await Instructor.permisoPorRol(rol)
                    if (instructor && permisoInstructor === 'no-permitido') {
                        throw new ErrorJekuaa({
                            codigo: 'jekuaa/error/usuario_mala_solicitud',
                            mensaje: 'Este rol no tiene permisos de instructor.'
                        })
                    } else if (!instructor && permisoInstructor === 'requerido') {
                        throw new ErrorJekuaa({
                            codigo: 'jekuaa/error/usuario_mala_solicitud',
                            mensaje: 'Este rol necesita ser instructor.'
                        })
                    }
                }
    
                // Jekuaa Points
                if (jekuaaPoint) {
                    valido = jekuaaPoint >= 0
                    if ( !valido ) {
                        throw new ErrorJekuaa({
                            codigo: 'jekuaa/error/usuario_mala_solicitud',
                            mensaje: 'El Jekuaa Point debe ser mayor o igual a 0.'
                        })
                    }
                }
            }
        }
    
        // Contraseñas
        if ( contrasenha ) {
            cantidadCaracteresValido = contrasenha.length >= 6 && contrasenha.length <= 20
            valido = cantidadCaracteresValido
            if ( !valido ) {
                throw new ErrorJekuaa({
                    codigo: 'jekuaa/error/usuario_mala_solicitud',
                    mensaje: 'La contraseña debe ser mayor o igual a 6 y menor o igual a 20.'
                })
            }
        
            cantidadCaracteresValido = confirmacionContrasenha.length >= 6 && confirmacionContrasenha.length <= 20
            valido = cantidadCaracteresValido
            if ( !valido ) {
                throw new ErrorJekuaa({
                    codigo: 'jekuaa/error/usuario_mala_solicitud',
                    mensaje: 'La confirmación de contraseña debe ser mayor o igual a 6 y menor o igual a 20.'
                })
            }
        
            if (contrasenha !== confirmacionContrasenha) {
                throw new ErrorJekuaa({
                    codigo: 'jekuaa/error/usuario_mala_solicitud',
                    mensaje: 'La contraseña debe ser igual a la confirmación de contraseña.'
                })
            }
        }

        next()

    } catch (error) {
        next(error)
    }
}

middlewaresUser.construirDatosUsuario = ( req, res, next ) => {
    
    const { jekuaaDatos, body } = req
    const { datosUsuario, contrasenha } = body
    const { uidSolicitante, datosAuthSolicitante } = jekuaaDatos

    try {        
        const esRutaAdmin = req.originalUrl.split('/')[2] === 'adminJekuaa'
        const esOperacionAgregar = req.method === 'POST'
        let datos = null

        if (esOperacionAgregar) {
            // Construir datos para produccion
            datos = utilsUsuarios.construirDatosParaNuevoUsuario ( datosUsuario, contrasenha, esRutaAdmin )

            req.body.datosUsuario = datos.datosUsuario
            req.body.contrasenha = datos.contrasenha
        } else {
            // Construir datos para produccion
            datos = utilsUsuarios.construirDatosParaActualizarUsuario (datosUsuario, contrasenha, esRutaAdmin)

            req.body.datosUsuario = datos.datosUsuario && Object.keys(datos.datosUsuario).length ? 
            datos.datosUsuario : null

            req.body.contrasenha = datos.contrasenha ? datos.contrasenha : null
        }

        if ( !req.body.datosUsuario && !req.body.contrasenha ) {
            throw new ErrorJekuaa({
                codigo: 'jekuaa/error/usuario_mala_solicitud',
                mensaje: 'No hay datos para ' + (esOperacionAgregar ? 'agregar.' : 'actualizar.')
            })
        }
        
        return next()

    } catch (error) {
        next(error)
    }
    
}

middlewaresUser.sePuedeEliminarPropietario = async ( req, res, next ) => {
    const { jekuaaDatos, body, params } = req
    const { datosUsuario, contrasenha } = body
    const { uidSolicitante, datosAuthSolicitante } = jekuaaDatos

    try {      
        if (req.method === 'PUT' && datosUsuario.jekuaaRol === undefined) {
            return next()
        }
        
        const esRutaAdmin = req.originalUrl.split('/')[2] === 'adminJekuaa'
        const uid = esRutaAdmin ? params.uid : uidSolicitante
        const datosAuth = await admin.auth().getUser(uid)

        let verificar = false

        if (req.method === 'PUT') {
            // Si soy propietario y quiero quitarme el rol de propietario
            verificar = datosAuth.customClaims.jekuaaRol === 'propietario' && 
            datosUsuario.jekuaaRol !== 'propietario'
        } else if (req.method === 'DELETE') {
            verificar = datosAuth.customClaims.jekuaaRol === 'propietario'
        }
        
        // Verificación
        if (verificar) {
            const listDocuments = await db.collection(COLECCION_USUARIO).where('jekuaaRol', '==', 'propietario').get()
                
            if (listDocuments.size === 1) {
                throw new ErrorJekuaa({
                    codigo: 'jekuaa/error/usuario_mala_solicitud',
                    mensaje: 'Tiene que existir al menos un propietario en Jekuaa.'
                })
            }
        }
        
        return next()

    } catch (error) {
        next(error)
    }
}

module.exports = middlewaresUser