const fs = require('fs')

const admin = require('../../../../firebase-service')
const db = require('../../../../db')
const timestamp = require('../../../utils/timestamp')
const Usuario = require('../../../models/Usuarios/Usuario')
const Respuesta = require('../../../models/Respuesta')
const Errores = require('../../../models/Error/Errores')
const Authentication = require('../../../models/Usuarios/Authentication')
const InformacionUsuario = require('../../../models/Usuarios/InformacionUsuario')
const manejadorErrores = require('../../../helpers/manejoErrores')
const sendEmailVerification = require('../../../services/sendEmailVerification.service')

const controllerUsuario = {}

controllerUsuario.crearUsuario = async (req, res) => {

    try {
        const { datos, body } = req
        const { nombreCompleto, datosUsuario, contrasenha } = body

        // Crear usuario
        const auth = new Authentication()
        const usuario = new Usuario(datosUsuario)
        
        const uid = await auth.crear({
            correo: usuario.correo, 
            nombreCompleto: nombreCompleto, 
            rol: usuario.rol, 
            plan: usuario.plan
        }, contrasenha)

        await auth.actualizarCustomUserClaims({
            rol: usuario.rol, 
            plan: usuario.plan
        })
        
        usuario.setUID(uid)
        await Usuario.crearUsuario(usuario)

        const respuesta = new Respuesta()

        // Retornar respuesta
        respuesta.setRespuesta({
            estado: 200,
            mensaje: 'exito',
            resultado: usuario
        })
        
        return res.status( respuesta.estado ).json( respuesta.getRespuesta() )
        
    } catch ( error ) {
        console.log('Error - crearUsuario: ', error)

        const respuesta = manejadorErrores( error )
        return res.status( respuesta.estado ).json( respuesta.getRespuesta() )
    }

}

controllerUsuario.obtenerUsuario = async (req, res) => {
    try {
        const { datos, params } = req
        const { tipoIdentificador, valorIdentificador } = params

        let datosUsuario = null

        if ( tipoIdentificador === 'nombreUsuario' ) {
            const snapshot = await db
            .collection('Usuarios')
            .where('nombreUsuario', '==', valorIdentificador)
            .where('eliminado', '!=', true)
            .get()
            
            if (snapshot.empty) {
                throw new Errores({
                    estado: 400,
                    mensajeCliente: 'no_existe_usuario',
                    mensajeServidor: 'No existe el usuario.'
                })
            }

            datosUsuario = snapshot.docs[0].data()
        } else if ( tipoIdentificador === 'correo' ) {
            const snapshot = await db
            .collection('Usuarios')
            .where('correo', '==', valorIdentificador)
            .where('eliminado', '!=', true)
            .get()
            
            if (snapshot.empty) {
                throw new Errores({
                    estado: 400,
                    mensajeCliente: 'no_existe_usuario',
                    mensajeServidor: 'No existe el usuario.'
                })
            }

            datosUsuario = snapshot.docs[0].data()
        } else if ( tipoIdentificador === 'uid' ) {
            const doc = await db.collection('Usuarios').doc(valorIdentificador).get()
            datosUsuario = doc.data()

            if (!doc.exists || doc.data().eliminado) {
                throw new Errores({
                    estado: 400,
                    mensajeCliente: 'no_existe_usuario',
                    mensajeServidor: 'No existe el usuario.'
                })
            }

        } else {
            throw new TypeError('No hay datos para buscar el usuario.')
        }

        delete datosUsuario.plan
        delete datosUsuario.rol
        delete datosUsuario.point
        delete datosUsuario.correo

        const respuesta = new Respuesta()

        // Retornar respuesta
        respuesta.setRespuesta({
            estado: 200,
            mensaje: 'exito',
            resultado: datosUsuario
        })
        
        return res.status( respuesta.estado ).json( respuesta.getRespuesta() )
        
    } catch ( error ) {
        console.log('Error - obtenerMiUsuario: ', error)

        const respuesta = manejadorErrores( error )
        return res.status( respuesta.estado ).json( respuesta.getRespuesta() )

    }
}

controllerUsuario.obtenerUsuarioAuth = async (req, res) => {
    try {
        const { datos, params } = req
        const { tipoIdentificador, valorIdentificador } = params

        let uid = ''

        if ( tipoIdentificador === 'nombreUsuario' ) {
            const snapshot = await db
            .collection('Usuarios')
            .where('nombreUsuario', '==', valorIdentificador)
            .where('eliminado', '!=', true)
            .get()
            
            if (snapshot.empty) {
                throw new Errores({
                    estado: 400,
                    mensajeCliente: 'no_existe_usuario',
                    mensajeServidor: 'No existe el usuario.'
                })
            }

            uid = snapshot.docs[0].id
        } else if ( tipoIdentificador === 'correo' ) {
            const snapshot = await db
            .collection('Usuarios')
            .where('correo', '==', valorIdentificador)
            .where('eliminado', '!=', true)
            .get()
            
            if (snapshot.empty) {
                throw new Errores({
                    estado: 400,
                    mensajeCliente: 'no_existe_usuario',
                    mensajeServidor: 'No existe el usuario.'
                })
            }

            uid = snapshot.docs[0].id
        } else if ( tipoIdentificador === 'uid' ) {
            const doc = await db.collection('Usuarios').doc(valorIdentificador).get()

            if (!doc.exists || doc.data().eliminado) {
                throw new Errores({
                    estado: 400,
                    mensajeCliente: 'no_existe_usuario',
                    mensajeServidor: 'No existe el usuario.'
                })
            }
            
            uid = valorIdentificador
        } else {
            throw new TypeError('No hay datos para buscar el usuario.')
        }

        const auth = new Authentication(uid)
        const responseDatosAuth = await auth.obtener()
        const datosAuth = JSON.parse( JSON.stringify( responseDatosAuth ) )

        delete datosAuth.email
        delete datosAuth.emailVerified
        delete datosAuth.disabled
        delete datosAuth.providerData
        delete datosAuth.customClaims.plan
        delete datosAuth.customClaims.rol

        delete datosAuth.passwordHash
        delete datosAuth.passwordSalt
        delete datosAuth.tokensValidAfterTime

        // Retornar respuesta
        const respuesta = new Respuesta()
        respuesta.setRespuesta({
            estado: 200,
            mensaje: 'exito',
            resultado: datosAuth
        })
        
        return res.status( respuesta.estado ).json( respuesta.getRespuesta() )
        
    } catch ( error ) {
        console.log('Error - obtenerMiUsuario: ', error)

        const respuesta = manejadorErrores( error )
        return res.status( respuesta.estado ).json( respuesta.getRespuesta() )

    }
}

controllerUsuario.obtenerUsuarioInfo = async (req, res) => {
    try {
        const { datos, params } = req
        const { tipoIdentificador, valorIdentificador } = params
         
        let uid = ''

        if ( tipoIdentificador === 'nombreUsuario' ) {
            const snapshot = await db
            .collection('Usuarios')
            .where('nombreUsuario', '==', valorIdentificador)
            .where('eliminado', '!=', true)
            .get()
            
            if (snapshot.empty) {
                throw new Errores({
                    estado: 400,
                    mensajeCliente: 'no_existe_usuario',
                    mensajeServidor: 'No existe el usuario.'
                })
            }

            uid = snapshot.docs[0].id
        } else if ( tipoIdentificador === 'correo' ) {
            const snapshot = await db
            .collection('Usuarios')
            .where('correo', '==', valorIdentificador)
            .where('eliminado', '!=', true)
            .get()
            
            if (snapshot.empty) {
                throw new Errores({
                    estado: 400,
                    mensajeCliente: 'no_existe_usuario',
                    mensajeServidor: 'No existe el usuario.'
                })
            }

            uid = snapshot.docs[0].id
        } else if ( tipoIdentificador === 'uid' ) {
            const doc = await db.collection('Usuarios').doc(valorIdentificador).get()

            if (!doc.exists || doc.data().eliminado) {
                throw new Errores({
                    estado: 400,
                    mensajeCliente: 'no_existe_usuario',
                    mensajeServidor: 'No existe el usuario.'
                })
            }
            
            uid = valorIdentificador

        } else {
            throw new TypeError('No hay datos para buscar el usuario.')
        }

        const info = new InformacionUsuario()
        await info.importarInformacionUsuario(uid)
        const datosInfo = info.getInformacionUsuario(true)
        
        // Retornar respuesta
        const respuesta = new Respuesta()
        respuesta.setRespuesta({
            estado: 200,
            mensaje: 'exito',
            resultado: datosInfo
        })
        
        return res.status( respuesta.estado ).json( respuesta.getRespuesta() )
        
    } catch ( error ) {
        console.log('Error - obtenerMiUsuario: ', error)

        const respuesta = manejadorErrores( error )
        return res.status( respuesta.estado ).json( respuesta.getRespuesta() )

    }
}

controllerUsuario.actualizarMiUsuario = async (req, res) => {
    try {
        const { datos, body } = req
        const { uidSolicitante, datosAuthSolicitante } = datos
        const { datosUsuario, datosAuth, contrasenha } = body

        const auth = new Authentication(uidSolicitante)

        // Actualizar authenticacion
        if (datosAuth) {
            // Email no-verificado
            if (datosAuth.email) datosAuth.emailVerified = false
            await auth.actualizar({ auth: datosAuth })
            
            if (datosAuth.email) await sendEmailVerification( datosAuth.email )
        }
        
        // Actualizar usuario
        if ( datosUsuario ) 
            Usuario.actalizarUsuarioPorUID( uidSolicitante, datosUsuario )

        // Actualizacion de contraseña
        if ( contrasenha ) 
            auth.actualizarContrasenha( contrasenha )

        const respuesta = new Respuesta()

        // Retornar respuesta
        respuesta.setRespuesta({
            estado: 200,
            mensaje: 'exito',
            resultado: { datosUsuario, datosAuth }
        })
        
        return res.status( respuesta.estado ).json( respuesta.getRespuesta() )
        
    } catch ( error ) {
        console.log('Error - actualizarMiUsuario: ', error)

        const respuesta = manejadorErrores( error )
        return res.status( respuesta.estado ).json( respuesta.getRespuesta() )
    }
}

controllerUsuario.actualizarMiInformacion = async (req, res) => {
    try {
        const { datos, body } = req
        const { uidSolicitante, datosAuthSolicitante } = datos
        const { datosActualizados } = body
        
        const respuesta = new Respuesta()
        let estado = 'exito'

        // Actualizar usuario
        InformacionUsuario.actualizar(uidSolicitante, datosActualizados)

        // Retornar respuesta
        respuesta.setRespuesta({
            estado: 200,
            mensaje: 'exito',
            resultado: null
        })
        
        return res.status( respuesta.estado ).json( respuesta.getRespuesta() )
        
    } catch ( error ) {
        console.log('Error - actualizarMiInformacion: ', error)

        const respuesta = manejadorErrores( error )
        return res.status( respuesta.estado ).json( respuesta.getRespuesta() )
    }
}

controllerUsuario.eliminarFotoPerfil = async (req, res) => {
    try {
        const { datos } = req
        const { uidSolicitante, datosAuthSolicitante } = datos
        
        const respuesta = new Respuesta()
        let estado = 'exito'

        const auth = new Authentication(uidSolicitante)
        auth.eliminarFotoPerfil()

        // Retornar respuesta
        respuesta.setRespuesta({
            estado: 200,
            mensaje: 'exito',
            resultado: ''
        })
        
        return res.status( respuesta.estado ).json( respuesta.getRespuesta() )
        
    } catch ( error ) {
        console.log('Error - eliminarFotoPerfil: ', error)

        const respuesta = manejadorErrores( error )
        return res.status( respuesta.estado ).json( respuesta.getRespuesta() )
    }
}

controllerUsuario.obtenerLinkVerificacion = async (req, res) => {
    try {
        const { datos, params } = req
        const { datosAuthSolicitante } = datos
        
        const respuesta = new Respuesta()
        let estado = 'exito'

        await sendEmailVerification( datosAuthSolicitante.email )

        // Retornar respuesta
        respuesta.setRespuesta({
            estado: 200,
            mensaje: 'exito',
            resultado: datosAuthSolicitante.email
        })
        
        return res.status( respuesta.estado ).json( respuesta.getRespuesta() )
        
    } catch ( error ) {
        console.log('Error - obtenerLinkVerificacion: ', error)

        const respuesta = manejadorErrores( error )
        return res.status( respuesta.estado ).json( respuesta.getRespuesta() )
    }
}

module.exports = controllerUsuario