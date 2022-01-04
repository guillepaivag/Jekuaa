const db = require('../../../db')
const Usuario = require('../../models/ComponentesUsuario/Usuario')
const Respuesta = require('../../models/Respuesta')
const manejadorErrores = require('../../helpers/ManejoErrores')
const ErrorJekuaa = require('../../models/Error/ErroresJekuaa')
const fs = require('fs')
const Authentication = require('../../models/Authentication')
const InformacionUsuario = require('../../models/ComponentesUsuario/InformacionUsuario')

const controllerUsuario = {}

controllerUsuario.crearUsuario = async (req, res) => {

    try {
        const { jekuaaDatos, body } = req
        const { datosUsuario, contrasenha } = body

        // Crear usuario
        const auth = new Authentication()
        const usuario = new Usuario(datosUsuario)
        
        const uid = await auth.crear(usuario, contrasenha)
        usuario.setUID(uid)  
        usuario.crearUsuarioDB()

        const respuesta = new Respuesta()
        let codigo = 'jekuaa/exito'
        respuesta.setRespuestaPorCodigo(codigo, {
            mensaje: 'El usuario se creo de forma exitosa!',
            resultado: datosUsuarioNuevo
        })
        const status = respuesta.getStatusCode()
        
        return res.status( status ).json( respuesta.getRespuesta() )
        
    } catch ( error ) {
        console.log('Error - crearUsuario: ', error)

        const {
            status,
            respuesta
        } = manejadorErrores( error )

        return res.status( status ).json( respuesta )
    }

}

controllerUsuario.obtenerUsuario = async (req, res) => {
    try {
        const { jekuaaDatos, params } = req
        const { tipoIdentificador, valorIdentificador } = params

        let datosUsuario 

        if ( tipoIdentificador === 'nombreUsuario' ) {
            const doc = await db.collection('Usuarios').where('nombreUsuario', '==', valorIdentificador).get()
            
            if (doc.empty) {
                throw new ErrorJekuaa({
                    codigo: 'jekuaa/error/usuario_mala_solicitud',
                    mensaje: `No existe el usuario.`
                })
            }

            datosUsuario = doc.docs[0].data()
        } else if ( tipoIdentificador === 'correo' ) {
            const doc = await db.collection('Usuarios').where('correo', '==', valorIdentificador).get()
            
            if (doc.empty) {
                throw new ErrorJekuaa({
                    codigo: 'jekuaa/error/usuario_mala_solicitud',
                    mensaje: `No existe el usuario.`
                })
            }

            datosUsuario = doc.docs[0].data()
        } else if ( tipoIdentificador === 'uid' ) {
            const usuario = new Usuario()
            await usuario.importarDatosUsuarioPorUID(valorIdentificador)
            datosUsuario = usuario.getDatosUsuario()

        } else {
            throw new ErrorJekuaa({
                codigo: 'jekuaa/error/usuario_mala_solicitud',
                mensaje: `No hay datos para buscar el usuario.`
            })
        }

        delete datosUsuario.jekuaaPremium
        delete datosUsuario.jekuaaRol
        delete datosUsuario.jekuaaPoint
        delete datosUsuario.correo

        let codigo = 'jekuaa/exito'
        const respuesta = new Respuesta().setRespuestaPorCodigo(codigo, {
            mensaje: 'Los datos de los usuarios se enviaron de forma exitosa!',
            resultado: datosUsuario
        })
        const status = respuesta.getStatusCode()
        
        return res.status( status ).json( respuesta.getRespuesta() )
        
    } catch ( error ) {
        console.log('Error - obtenerMiUsuario: ', error)

        const {
            status,
            respuesta
        } = manejadorErrores( error )

        return res.status( status ).json( respuesta )

    }
}

controllerUsuario.obtenerUsuarioAuth = async (req, res) => {
    try {
        const { jekuaaDatos, params } = req
        const { tipoIdentificador, valorIdentificador } = params
        
        let datosAuth 
        let uid

        if ( tipoIdentificador === 'nombreUsuario' ) {
            const doc = await db.collection('Usuarios').where('nombreUsuario', '==', valorIdentificador).get()
            
            if (doc.empty) {
                throw new ErrorJekuaa({
                    codigo: 'jekuaa/error/usuario_mala_solicitud',
                    mensaje: `No existe el usuario.`
                })
            }

            let datosUsuario = doc.docs[0].data()

            uid = datosUsuario.uid
        } else if ( tipoIdentificador === 'correo' ) {
            const doc = await db.collection('Usuarios').where('correo', '==', valorIdentificador).get()
            
            if (doc.empty) {
                throw new ErrorJekuaa({
                    codigo: 'jekuaa/error/usuario_mala_solicitud',
                    mensaje: `No existe el usuario.`
                })
            }

            let datosUsuario = doc.docs[0].data()

            uid = datosUsuario.uid
        } else if ( tipoIdentificador === 'uid' ) {
            uid = valorIdentificador

        } else {
            throw new ErrorJekuaa({
                codigo: 'jekuaa/error/usuario_mala_solicitud',
                mensaje: `No hay datos para buscar el usuario.`
            })
        }

        const auth = new Authentication(uid)
        let responseDatosAuth = await auth.obtener()
        
        datosAuth = JSON.parse( JSON.stringify( responseDatosAuth ) )

        delete datosAuth.email
        delete datosAuth.emailVerified
        delete datosAuth.disabled
        delete datosAuth.passwordHash
        delete datosAuth.passwordSalt
        delete datosAuth.customClaims.jekuaaPremium
        delete datosAuth.customClaims.jekuaaRol
        delete datosAuth.tokensValidAfterTime
        delete datosAuth.providerData
        
        let codigo = 'jekuaa/exito'
        const respuesta = new Respuesta().setRespuestaPorCodigo(codigo, {
            mensaje: 'Los datos de los usuarios se enviaron de forma exitosa!',
            resultado: datosAuth
        })
        const status = respuesta.getStatusCode()
        
        return res.status( status ).json( respuesta.getRespuesta() )
        
    } catch ( error ) {
        console.log('Error - obtenerMiUsuario: ', error)

        const {
            status,
            respuesta
        } = manejadorErrores( error )

        return res.status( status ).json( respuesta )

    }
}

controllerUsuario.obtenerUsuarioInfo = async (req, res) => {
    try {
        const { jekuaaDatos, params } = req
        const { tipoIdentificador, valorIdentificador } = params
        
        let datosInfo 
        let uid

        if ( tipoIdentificador === 'nombreUsuario' ) {
            const doc = await db.collection('Usuarios').where('nombreUsuario', '==', valorIdentificador).get()
            
            if (doc.empty) {
                throw new ErrorJekuaa({
                    codigo: 'jekuaa/error/usuario_mala_solicitud',
                    mensaje: `No existe el usuario.`
                })
            }

            let datosUsuario = doc.docs[0].data()

            uid = datosUsuario.uid
        } else if ( tipoIdentificador === 'correo' ) {
            const doc = await db.collection('Usuarios').where('correo', '==', valorIdentificador).get()
            
            if (doc.empty) {
                throw new ErrorJekuaa({
                    codigo: 'jekuaa/error/usuario_mala_solicitud',
                    mensaje: `No existe el usuario.`
                })
            }

            let datosUsuario = doc.docs[0].data()

            uid = datosUsuario.uid
        } else if ( tipoIdentificador === 'uid' ) {
            uid = valorIdentificador

        } else {
            throw new ErrorJekuaa({
                codigo: 'jekuaa/error/usuario_mala_solicitud',
                mensaje: `No hay datos para buscar el usuario.`
            })
        }
        const info = new InformacionUsuario()
        await info.importarInformacionUsuario(uid)
        datosInfo = info.getInformacionUsuario(true)

        // if (!datosInfo.exists) {
        //     throw new ErrorJekuaa({
        //         codigo: 'jekuaa/error/usuario_mala_solicitud',
        //         mensaje: `No existe datos de este usuario.`
        //     })
        // }
        
        let codigo = 'jekuaa/exito'
        const respuesta = new Respuesta().setRespuestaPorCodigo(codigo, {
            mensaje: 'Los datos de los usuarios se enviaron de forma exitosa!',
            resultado: datosInfo
        })
        const status = respuesta.getStatusCode()
        
        return res.status( status ).json( respuesta.getRespuesta() )
        
    } catch ( error ) {
        console.log('Error - obtenerMiUsuario: ', error)

        const {
            status,
            respuesta
        } = manejadorErrores( error )

        return res.status( status ).json( respuesta )

    }
}

controllerUsuario.actualizarMiUsuario = async (req, res) => {
    try {
        const { jekuaaDatos, body } = req
        const { uidSolicitante, datosAuthSolicitante } = jekuaaDatos
        const { datosUsuario, contrasenha, datosAuth, datosClaims } = body

        const auth = new Authentication(uidSolicitante)

        // Actualizar authenticacion
        if (datosAuth || datosClaims) 
            auth.actualizar({ auth: datosAuth, claims: datosClaims })
        
        // Actualizar usuario
        if ( datosUsuario ) 
            Usuario.actalizarDatosUsuarioPorUID( uidSolicitante, datosUsuario )

        // Actualizacion de contraseña
        if ( contrasenha ) 
            auth.actualizarContrasenha( contrasenha )

        const respuesta = new Respuesta()
        let codigo = 'jekuaa/exito'

        respuesta.setRespuestaPorCodigo(codigo, {
            mensaje: 'El usuario se actualizó de forma exitosa!',
            resultado: datosUsuario
        })
        const status = respuesta.getStatusCode()
        
        return res.status( status ).json( respuesta.getRespuesta() )
        
    } catch ( error ) {
        console.log('Error - actualizarMiUsuario: ', error)

        const {
            status,
            respuesta
        } = manejadorErrores( error )

        return res.status( status ).json( respuesta )
    }
}

controllerUsuario.actualizarFotoPerfil = async (req, res) => {
    try {
        const { jekuaaDatos, body, files } = req
        const { uidSolicitante, datosAuthSolicitante } = jekuaaDatos
        const { busboy, extensionArchivo, rutaArchivoTemp } = body
        
        const respuesta = new Respuesta()
        let codigo = 'jekuaa/exito'

        const auth = new Authentication(uidSolicitante)
        const url = await auth.actualizarFotoPerfil(rutaArchivoTemp, extensionArchivo)

        // Borrar el archivo creado en el servidor
        fs.unlink(rutaArchivoTemp, (err => {
            if ( err ) {
                console.log('Error al eliminar el archivo temporal: ', err)
                return
            }
        }))
        
        respuesta.setRespuestaPorCodigo(codigo, {
            mensaje: '¡Se actualizó la foto de perfil!',
            resultado: url
        })
        const status = respuesta.getStatusCode()
        
        return res.status( status ).json( respuesta.getRespuesta() )
        
    } catch ( error ) {
        console.log('Error - actualizarFotoPerfil: ', error)

        const {
            status,
            respuesta
        } = manejadorErrores( error )

        return res.status( status ).json( respuesta )
    }
}

controllerUsuario.eliminarFotoPerfil = async (req, res) => {
    try {
        const { jekuaaDatos } = req
        const { uidSolicitante, datosAuthSolicitante } = jekuaaDatos
        
        const respuesta = new Respuesta()
        let codigo = 'jekuaa/exito'

        const auth = new Authentication(uidSolicitante)
        auth.eliminarFotoPerfil()

        respuesta.setRespuestaPorCodigo(codigo, {
            mensaje: '¡Se eliminó la foto de perfil!',
            resultado: ''
        })
        const status = respuesta.getStatusCode()
        
        return res.status( status ).json( respuesta.getRespuesta() )
        
    } catch ( error ) {
        console.log('Error - eliminarFotoPerfil: ', error)

        const {
            status,
            respuesta
        } = manejadorErrores( error )

        return res.status( status ).json( respuesta )
    }
}

controllerUsuario.actualizarMiInformacion = async (req, res) => {
    try {
        const { jekuaaDatos, body } = req
        const { uidSolicitante, datosAuthSolicitante } = jekuaaDatos
        const { datosActualizados } = body
        
        const respuesta = new Respuesta()
        let codigo = 'jekuaa/exito'

        // Actualizar usuario
        InformacionUsuario.actualizar(uidSolicitante, datosActualizados)

        respuesta.setRespuestaPorCodigo(codigo, {
            mensaje: '¡La información del usuario se actualizó de forma exitosa!',
            resultado: null
        })
        const status = respuesta.getStatusCode()
        
        return res.status( status ).json( respuesta.getRespuesta() )
        
    } catch ( error ) {
        console.log('Error - actualizarMiInformacion: ', error)

        const {
            status,
            respuesta
        } = manejadorErrores( error )

        return res.status( status ).json( respuesta )
    }
}

controllerUsuario.eliminarMiUsuario = async (req, res) => {
    try {
        const { jekuaaDatos } = req
        const { uidSolicitante, datosAuthSolicitante } = jekuaaDatos

        const respuesta = new Respuesta()
        let codigo = 'jekuaa/exito'

        const resultado = await Usuario.eliminarUsuarioPorUID( uidSolicitante )

        respuesta.setRespuestaPorCodigo(codigo, {
            mensaje: 'Te has eliminado de forma correcta.',
            resultado
        })
        const status = respuesta.getStatusCode()
        
        return res.status( status ).json( respuesta.getRespuesta() )
    } catch ( error ) {
        console.log('Error - eliminarMiUsuario: ', error)

        const {
            status,
            respuesta
        } = manejadorErrores( error )

        return res.status( status ).json( respuesta )
    }
}

module.exports = controllerUsuario