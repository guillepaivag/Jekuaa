const fs = require('fs')
const os = require('os')
const path = require('path')

const admin = require('../../../../firebase-service')
const db = require('../../../../db')
const utilsUsuarios = require('../../../utils/usuario')
const getAuthToken = require('../../../helpers/getAuthToken')
const esNombreUsuario = require('../../../utils/esNombreUsuario')
const obtenerEdad = require('../../../utils/obtenerEdad')
const validarEmail = require('../../../utils/emailValido')
const Errores = require('../../../models/Error/Errores')
const DatosPlan = require('../../../models/Usuarios/helpers/DatosPlan')
const Roles = require('../../../models/Usuarios/helpers/Roles')
const Instructor = require('../../../models/Usuarios/Instructor')
const Authentication = require('../../../models/Usuarios/Authentication')


const middlewaresUser = {}
const COLECCION_USUARIO = 'Usuarios'

// MIDDLEWARES
middlewaresUser.estaAutenticado = (req, res, next) => {

    const myNext = async () => {
        
        try {
            const { authToken } = req.datos

            const userInfo = await admin.auth().verifyIdToken( authToken )
            req.datos.uidSolicitante = userInfo.uid

            const datosAuthSolicitante = await admin.auth().getUser( userInfo.uid )
            req.datos.datosAuthSolicitante = datosAuthSolicitante

            if ( datosAuthSolicitante.disabled ) {
                throw new Errores({
                    codigo: 'error/usuario_no_autorizado',
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

middlewaresUser.esAdmin = async (req, res, next) => {
    
    try {
        const { uidSolicitante, datosAuthSolicitante } = req.datos
        
        const roles = new Roles(datosAuthSolicitante.customClaims.rol)
        const documentoRol = await roles.obtenerDocumentoRol()
        
        if ( !documentoRol.data().esAdmin ) 
            throw new Errores({ codigo: 'error/usuario_no_autorizado' })
        
        return next()

    } catch ( error ) {
        next(error)

    }

}

middlewaresUser.esPropietario = async (req, res, next) => {
    
    try {
        const { uidSolicitante, datosAuthSolicitante } = req.datos
        
        if ( datosAuthSolicitante.customClaims.rol !== 'propietario' ) 
            throw new Errores({ codigo: 'error/usuario_no_autorizado' })
        
        return next()

    } catch ( error ) {
        next(error)

    }

}

middlewaresUser.esDeMayorIgualNivel = async ( req, res, next ) => {
    
    try {
        const { params, datos } = req
        const { uidSolicitante, datosAuthSolicitante } = datos
        const { uid } = params

        const datosAuthUsuario = await admin.auth().getUser( uid )

        if ( datosAuthSolicitante.customClaims.rol !== 'propietario' ) {
            // El solicitante debe tener mayor o igual nivel que el usuario a actualizar
            const rol1 = new Roles(datosAuthSolicitante.customClaims.rol)
            const rol2 = new Roles(datosAuthUsuario.customClaims.rol)
            const diferenciaNivelRol = await Roles.compararNivelRoles(rol1, rol2)

            if ( diferenciaNivelRol < 0 ) 
                throw new Errores({ codigo: 'error/usuario_no_autorizado' })
        }

        return next()

    } catch (error) {
        next(error)

    }
    
}

middlewaresUser.esDeMayorNivel = async ( req, res, next ) => {
    
    try {
        const { params, datos } = req
        const { uidSolicitante, datosAuthSolicitante } = datos
        const { uid } = params

        const datosAuthUsuario = await admin.auth().getUser( uid )

        if ( datosAuthSolicitante.customClaims.rol !== 'propietario' ) {
            const rol1 = new Roles(datosAuthSolicitante.customClaims.rol)
            const rol2 = new Roles(datosAuthUsuario.customClaims.rol)
            const diferenciaNivelRol = await Roles.compararNivelRoles(rol1, rol2)
    
            if ( diferenciaNivelRol <= 0 ) 
                throw new Errores({ codigo: 'error/usuario_no_autorizado' })
        }

        return next()

    } catch (error) {
        next(error)

    }
    
}

middlewaresUser.permisoParaActualizarRol = async ( req, res, next ) => {
    
    try {
        const { datos, body } = req
        const { uidSolicitante,datosAuthSolicitante } = datos
        const { datosUsuario } = body
        
        if ( datosAuthSolicitante.customClaims.rol !== 'propietario' ) {
            // El solicitante no puede crear un usuario con mayor rol que el de el mismo
            if ( datosUsuario && datosUsuario.rol ) {
                const rol1 = new Roles(datosAuthSolicitante.customClaims.rol)
                const rol2 = new Roles(datosUsuario.rol)
                const diferenciaNivelRol = await Roles.compararNivelRoles(rol1, rol2)

                if ( diferenciaNivelRol < 0 ) {
                    //No autorizado
                    throw new Errores({
                        codigo: 'error/usuario_no_autorizado',
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

middlewaresUser.construirDatosInformacionUsuario = async ( req, res, next ) => {
    
    try {
        const { body, datos } = req
        const { uidSolicitante, datosAuthSolicitante } = datos
        const { descripcion, especializaciones, intereses, redesSociales, rolDescriptivo } = body

        req.body.datosActualizados = {}

        descripcion ? req.body.datosActualizados.descripcion = descripcion : ''
        especializaciones ? req.body.datosActualizados.especializaciones = especializaciones : ''
        intereses ? req.body.datosActualizados.intereses = intereses : ''
        redesSociales && redesSociales.length ? req.body.datosActualizados.redesSociales = redesSociales : ''

        return next()

    } catch (error) {
        next(error)

    }
    
}

middlewaresUser.validarFotoPerfil = async ( req, res, next ) => {
    
    try {
        const { datos, body, files } = req
        const { uidSolicitante, datosAuthSolicitante } = datos
        const {  } = body

        if (files.length <= 0) {
            throw new Errores({
                codigo: 'error/usuario_mala_solicitud',
                mensaje: 'No hay foto de perfil para actualizar.',
            })
        }
        const file = files[0]
        const fileMB = file.size * 0.000001

        const condicionTipo = file.mimeType.includes('image') && 
        (file.fileExtension === 'png' || file.fileExtension === 'jpg' || file.fileExtension === 'jpeg')
        
        if (!condicionTipo) {
            throw new Errores({
                codigo: 'error/usuario_mala_solicitud',
                mensaje: 'La foto de perfil tiene que ser imagen del tipo: png, jpg o jpeg.',
            })
        }

        if (fileMB > 1) {
            throw new Errores({
                codigo: 'error/usuario_mala_solicitud',
                mensaje: 'La foto de perfil no puede ser mayor a 1MB.',
            })
        }

        return next()

    } catch (error) {
        console.log('ERROR MIDDLEWARE: validarFotoPerfil ', error)
        next(error)
    }
    
}

middlewaresUser.verificarDatosRequeridos = ( req, res, next ) => {
    try {
        const { datos, body } = req
        const { datosUsuario, contrasenha, confirmacionContrasenha } = body
        
        const esOperacionAgregar = req.method === 'POST'

        if (!Object.keys(body).length) {
            throw new Errores({
                codigo: 'error/usuario_mala_solicitud',
                mensaje: 'No hay datos para crear un usuario.'
            })
        }

        if ( (!datosUsuario || !Object.keys(datosUsuario).length) && !contrasenha ) {
            throw new Errores({
                codigo: 'error/usuario_mala_solicitud',
                mensaje: 'No hay datos para crear un usuario.'
            })
        }

        if (esOperacionAgregar) {

            if (Object.keys(body).length !== 3) {
                throw new Errores({
                    codigo: 'error/usuario_mala_solicitud',
                    mensaje: 'No hay datos para crear un usuario.'
                })
            }

            if ( !datosUsuario ) {
                throw new Errores({
                    codigo: 'error/usuario_mala_solicitud',
                    mensaje: 'No hay datos para crear un usuario.'
                })
            }
    
            if ( !contrasenha ) {
                throw new Errores({
                    codigo: 'error/usuario_mala_solicitud',
                    mensaje: 'No existe la contraseña.'
                })
            }
        
            if ( !confirmacionContrasenha ) {
                throw new Errores({
                    codigo: 'error/usuario_mala_solicitud',
                    mensaje: 'No existe la confirmación de contraseña.'
                })
            }

            const {
                uid,
                nombreUsuario,
                correo,
                nombreCompleto,
                fechaNacimiento,
                datosPlan,
                rol,
                point
            } = datosUsuario
        
            if ( !nombreUsuario ) {
                throw new Errores({
                    codigo: 'error/usuario_mala_solicitud',
                    mensaje: 'Es requerido un nombre de usuario.'
                })
            }
        
            if ( !correo ) {
                throw new Errores({
                    codigo: 'error/usuario_mala_solicitud',
                    mensaje: 'Es requerido un correo.'
                })
            }
        }
        
        next()
    } catch (error) {
        next(error)
    }
}

middlewaresUser.verificarTipoDeDatosCliente = ( req, res, next ) => {
    try {
        const { datos, body } = req
        const { datosUsuario, contrasenha, confirmacionContrasenha } = body

        if (datosUsuario) {
            if (typeof datosUsuario != 'object') {
                throw new Errores({
                    codigo: 'error/usuario_mala_solicitud',
                    mensaje: 'Los datos usuario debe ser un objecto.'
                })
            }

            const {
                uid,
                nombreUsuario,
                correo,
                nombreCompleto,
                fechaNacimiento,
                datosPlan,
                rol,
                point,
            } = datosUsuario
        
            if ( nombreUsuario && typeof nombreUsuario !== 'string' ) {
                throw new TypeError('El nombreUsuario debe ser de tipo string.', 'Usuario.js')
            }
        
            if ( correo && typeof correo !== 'string' ) {
                throw new TypeError('El correo debe ser de tipo string.', 'Usuario.js')
            }
        
            if ( nombreCompleto && typeof nombreCompleto !== 'string' ) {
                throw new TypeError('Debe de ser de tipo string el nombre completo del usuario.', 'Usuario.js')
            }
        
            if ( fechaNacimiento && typeof fechaNacimiento !== 'number' ) {
                throw new TypeError('La fecha de nacimiento debe ser de tipo number en milisegundos.', 'Usuario.js')
            }
        }

        if ( contrasenha ) {
            if ( typeof contrasenha !== 'string' ) {
                throw new TypeError('La contraseña debe ser de tipo string.', 'Usuario.js')
            }
        
            if ( typeof confirmacionContrasenha !== 'string' ) {
                throw new TypeError('La confirmación de contraseña debe ser de tipo string.', 'Usuario.js')
            }
        }

        next()
        
    } catch (error) {
        next(error)
    }
}

middlewaresUser.validarDatosExistentesClienteCrear = async (req, res, next) => {
    const { datos = {}, params, body } = req
    const { uidSolicitante, datosAuthSolicitante } = datos
    const { datosUsuario, contrasenha, confirmacionContrasenha } = body
    
    try {
        let cantidadCaracteresValido
        let correoValido
        let fechaNacimientoValido
        let valido
    
        if (datosUsuario) {
            const {
                nombreUsuario,
                correo,
                nombreCompleto,
                fechaNacimiento,
                datosPlan,
                rol,
                point
            } = datosUsuario

            // Nombre de usuario
            if ( nombreUsuario ) {
                // Verificar que sea alfanumerico
                if (!esNombreUsuario(nombreUsuario)) {
                    throw new Errores({
                        codigo: 'error/usuario_mala_solicitud',
                        mensaje: 'El nombre de usuario solo puede tener: a-z A-Z 0-9 _'
                    })
                }
                
                // Verificar tamaño
                cantidadCaracteresValido = nombreUsuario.length >= 1 && nombreUsuario.length <= 20
                valido = cantidadCaracteresValido
                if ( !valido ) {
                    throw new Errores({
                        codigo: 'error/usuario_mala_solicitud',
                        mensaje: 'El nombre de usuario debe ser mayor a 0 y menor a 21.'
                    })
                }

                const existe = await Authentication.existeUsuario({ nombreUsuario })

                if (existe) {
                    throw new Errores({
                        codigo: 'error/usuario_mala_solicitud',
                        mensaje: `Ya existe el nombre de usuario ${nombreUsuario}.`
                    })
                }
            }
    
            // Correo
            if (correo) {
                cantidadCaracteresValido = correo.length >= 5 && correo.length <= 100
                correoValido = validarEmail(correo)
                valido = cantidadCaracteresValido && correoValido
                if ( !valido ) {
                    throw new Errores({
                        codigo: 'error/usuario_mala_solicitud',
                        mensaje: 'El correo debe ser válido y entre 5 a 100 carácteres.'
                    })
                }
            }
    
            // Nombre completo
            if (nombreCompleto) {
                cantidadCaracteresValido = nombreCompleto.length >= 1 && nombreCompleto.length <= 100
                valido = cantidadCaracteresValido
                if ( !valido ) {
                    throw new Errores({
                        codigo: 'error/usuario_mala_solicitud',
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
                    throw new Errores({
                        codigo: 'error/usuario_mala_solicitud',
                        mensaje: 'El usuario debe tener al menos 1 año de edad.'
                    })
                }
            }
        }
    
        // Contraseñas
        if ( contrasenha ) {
            cantidadCaracteresValido = contrasenha.length >= 6 && contrasenha.length <= 20
            valido = cantidadCaracteresValido
            if ( !valido ) {
                throw new Errores({
                    codigo: 'error/usuario_mala_solicitud',
                    mensaje: 'La contraseña debe ser mayor o igual a 6 y menor o igual a 20.'
                })
            }
        
            cantidadCaracteresValido = confirmacionContrasenha.length >= 6 && confirmacionContrasenha.length <= 20
            valido = cantidadCaracteresValido
            if ( !valido ) {
                throw new Errores({
                    codigo: 'error/usuario_mala_solicitud',
                    mensaje: 'La confirmación de contraseña debe ser mayor o igual a 6 y menor o igual a 20.'
                })
            }
        
            if (contrasenha !== confirmacionContrasenha) {
                throw new Errores({
                    codigo: 'error/usuario_mala_solicitud',
                    mensaje: 'La contraseña debe ser igual a la confirmación de contraseña.'
                })
            }
        }

        next()

    } catch (error) {
        next(error)
    }
}

middlewaresUser.validarDatosExistentesClienteActualizar = async (req, res, next) => {
    try {
        const { datos, params, body } = req
        const { datosUsuario, contrasenha, confirmacionContrasenha } = body
        const { uidSolicitante, datosAuthSolicitante } = datos
    
        let cantidadCaracteresValido
        let correoValido
        let fechaNacimientoValido
        let valido

        const uid = uidSolicitante

        const datosActualesUsuario = await admin.auth().getUser(uid)
    
        if (datosUsuario) {
            const {
                nombreUsuario,
                correo,
                nombreCompleto,
                fechaNacimiento,
                datosPlan,
                rol,
                point
            } = datosUsuario

            // Nombre de usuario
            if ( nombreUsuario ) {
                // Verificar que sea alfanumerico
                if (!esNombreUsuario(nombreUsuario)) {
                    throw new Errores({
                        codigo: 'error/usuario_mala_solicitud',
                        mensaje: 'El nombre de usuario solo puede tener (a-z) (A-Z) (0-9) (_).'
                    })
                }
                
                // Verificar tamaño
                cantidadCaracteresValido = nombreUsuario.length >= 1 && nombreUsuario.length <= 20
                valido = cantidadCaracteresValido
                if ( !valido ) {
                    throw new Errores({
                        codigo: 'error/usuario_mala_solicitud',
                        mensaje: 'El nombre de usuario debe ser mayor a 0 y menor a 21.'
                    })
                }

                const existe = await Authentication.existeUsuario({ nombreUsuario })

                if (existe) {
                    throw new Errores({
                        codigo: 'error/usuario_mala_solicitud',
                        mensaje: `Ya existe el nombre de usuario ${nombreUsuario}.`
                    })
                }
            }
    
            // Correo
            if (correo) {
                cantidadCaracteresValido = correo.length >= 5 && correo.length <= 100
                correoValido = validarEmail(correo)
                valido = cantidadCaracteresValido && correoValido
                if ( !valido ) {
                    throw new Errores({
                        codigo: 'error/usuario_mala_solicitud',
                        mensaje: 'El correo debe ser válido y entre 5 a 100 carácteres.'
                    })
                }
            }
    
            // Nombre completo
            if (nombreCompleto) {
                cantidadCaracteresValido = nombreCompleto.length >= 1 && nombreCompleto.length <= 100
                valido = cantidadCaracteresValido
                if ( !valido ) {
                    throw new Errores({
                        codigo: 'error/usuario_mala_solicitud',
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
                    throw new Errores({
                        codigo: 'error/usuario_mala_solicitud',
                        mensaje: 'El usuario debe tener al menos 1 año de edad.'
                    })
                }
            }
        }
    
        // Contraseñas
        if ( contrasenha ) {
            cantidadCaracteresValido = contrasenha.length >= 6 && contrasenha.length <= 20
            valido = cantidadCaracteresValido
            if ( !valido ) {
                throw new Errores({
                    codigo: 'error/usuario_mala_solicitud',
                    mensaje: 'La contraseña debe ser mayor o igual a 6 y menor o igual a 20.'
                })
            }
        
            cantidadCaracteresValido = confirmacionContrasenha.length >= 6 && confirmacionContrasenha.length <= 20
            valido = cantidadCaracteresValido
            if ( !valido ) {
                throw new Errores({
                    codigo: 'error/usuario_mala_solicitud',
                    mensaje: 'La confirmación de contraseña debe ser mayor o igual a 6 y menor o igual a 20.'
                })
            }
        
            if (contrasenha !== confirmacionContrasenha) {
                throw new Errores({
                    codigo: 'error/usuario_mala_solicitud',
                    mensaje: 'La contraseña debe ser igual a la confirmación de contraseña.'
                })
            }
        }

        next()

    } catch (error) {
        next(error)
    }
}

middlewaresUser.construirDatosUsuario = async ( req, res, next ) => {
    
    const { datos, body, params } = req
    const { datosUsuario, contrasenha } = body

    try {        
        const esOperacionAgregar = req.method === 'POST'
        let datos = {}

        if (esOperacionAgregar) {
            // Construir datos para produccion
            const { datosUsuarioConstruido, contrasenhaConstruido } = utilsUsuarios.construirDatosParaCrearUsuario ( datosUsuario, contrasenha )
            datos.datosUsuarioConstruido = datosUsuarioConstruido
            datos.contrasenhaConstruido = contrasenhaConstruido
        } else {
            // Construir datos para produccion
            const { datosUsuarioConstruido, contrasenhaConstruido } = utilsUsuarios.construirDatosParaActualizarUsuario (datosUsuario, contrasenha)
            datos.datosUsuarioConstruido = datosUsuarioConstruido
            datos.contrasenhaConstruido = contrasenhaConstruido
            datos.authConstruido = utilsUsuarios.construirDatosAutentication( datosUsuario )

            const uid = req.datos.uidSolicitante
            const auth = new Authentication(uid)
            datos.claimsConstruido = await utilsUsuarios.construirDatosReclamosAutenticacion(datosUsuario, auth)
        }

        // Pasar los datos obtenidos al body
        datos.datosUsuarioConstruido ? 
        req.body.datosUsuario = datos.datosUsuarioConstruido : ''

        datos.contrasenhaConstruido ?
        req.body.contrasenha = datos.contrasenhaConstruido : '' 

        datos.authConstruido ?
        req.body.datosAuth = datos.authConstruido : '' 

        datos.claimsConstruido ?
        req.body.datosClaims = datos.claimsConstruido : '' 

        if ( !datos.datosUsuarioConstruido && !datos.contrasenhaConstruido ) {
            throw new Errores({
                codigo: 'error/usuario_mala_solicitud',
                mensaje: 'No hay datos para ' + (esOperacionAgregar ? 'agregar.' : 'actualizar.')
            })
        }
        
        return next()

    } catch (error) {
        next(error)
    }
    
}

middlewaresUser.sePuedeEliminarPropietarioPUT = async ( req, res, next ) => {
    const { datos, body, params } = req
    const { datosUsuario, contrasenha } = body
    const { uidSolicitante, datosAuthSolicitante } = datos

    try {      
        if (!datosUsuario) return next()
        if (req.method === 'PUT' && datosUsuario.rol === undefined) return next()
        
        const uid = uidSolicitante
        const datosAuth = await admin.auth().getUser(uid)

        let verificar = false

        if (req.method === 'PUT') {
            // Si soy propietario y quiero quitarme el rol de propietario
            verificar = datosAuth.customClaims.rol === 'propietario' && 
            datosUsuario.rol !== 'propietario'
        } else if (req.method === 'DELETE') {
            verificar = datosAuth.customClaims.rol === 'propietario'
        }
        
        // Verificación
        if (verificar) {
            const listDocuments = await db.collection(COLECCION_USUARIO).where('rol', '==', 'propietario').get()
                
            if (listDocuments.size === 1) {
                throw new Errores({
                    codigo: 'error/usuario_mala_solicitud',
                    mensaje: 'Tiene que existir al menos un propietario.'
                })
            }
        }
        
        return next()

    } catch (error) {
        next(error)
    }
}

middlewaresUser.sePuedeEliminarPropietarioDELETE = async (req, res, next) => {
    const { datos, body, params } = req
    const { uidSolicitante, datosAuthSolicitante } = datos

    try {
        const uid = uidSolicitante
        let datosAuth = datosAuthSolicitante

        // Verificación
        if (datosAuth.customClaims.rol === 'propietario') {
            const listDocuments = await db
                .collection(COLECCION_USUARIO)
                .where('rol', '==', 'propietario')
                .get()
                
            if (listDocuments.size === 1) {
                throw new Errores({
                    codigo: 'error/usuario_mala_solicitud',
                    mensaje: 'Tiene que existir al menos un propietario.'
                })
            }
        }
        
        next()

    } catch (error) {
        next(error)
    }
}


module.exports = middlewaresUser