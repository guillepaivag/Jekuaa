const admin = require('../../../firebase-service')
const db = require('../../../db')
const Usuario = require('../../models/Usuario')
const Respuesta = require('../../models/Respuesta')
const manejadorErrores = require('../../helpers/ManejoErrores')
const ErrorJekuaa = require('../../models/Error/ErroresJekuaa')
const fs = require('fs')
const os = require('os')
const path = require('path')

const controllerUsuario = {}

controllerUsuario.obtenerUsuario = async (req, res) => {
    try {
        const { jekuaaDatos, body } = req

        let datosUsuario 

        if (body.nombreUsuario) {
            const doc = await db.collection('Usuarios').where('nombreUsuario', '==', body.nombreUsuario).get()
            
            if (doc.empty) {
                throw new ErrorJekuaa({
                    codigo: 'jekuaa/error/usuario_mala_solicitud',
                    mensaje: `No existe el usuario.`
                })
            }

            datosUsuario = doc.docs[0].data()
        } else if (body.correo) {
            const doc = await db.collection('Usuarios').where('correo', '==', body.correo).get()
            
            if (doc.empty) {
                throw new ErrorJekuaa({
                    codigo: 'jekuaa/error/usuario_mala_solicitud',
                    mensaje: `No existe el usuario.`
                })
            }

            datosUsuario = doc.docs[0].data()
        } else if (body.uid) {
            datosUsuario = await Usuario.verDatosUsuarioPorUID( body.uid )

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
        const { jekuaaDatos, body } = req
        
        let datosAuth 
        let uid

        if (body.nombreUsuario) {
            const doc = await db.collection('Usuarios').where('nombreUsuario', '==', body.nombreUsuario).get()
            
            if (doc.empty) {
                throw new ErrorJekuaa({
                    codigo: 'jekuaa/error/usuario_mala_solicitud',
                    mensaje: `No existe el usuario.`
                })
            }

            let datosUsuario = doc.docs[0].data()

            uid = datosUsuario.uid
        } else if (body.correo) {
            const doc = await db.collection('Usuarios').where('correo', '==', body.correo).get()
            
            if (doc.empty) {
                throw new ErrorJekuaa({
                    codigo: 'jekuaa/error/usuario_mala_solicitud',
                    mensaje: `No existe el usuario.`
                })
            }

            let datosUsuario = doc.docs[0].data()

            uid = datosUsuario.uid
        } else if (body.uid) {
            uid = body.uid

        } else {
            throw new ErrorJekuaa({
                codigo: 'jekuaa/error/usuario_mala_solicitud',
                mensaje: `No hay datos para buscar el usuario.`
            })
        }

        let responseDatosAuth = await Usuario.verDatosAuthPorUID( uid )
        datosAuth = JSON.parse( JSON.stringify(responseDatosAuth) )

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
        const { jekuaaDatos, body } = req
        
        let datosInfo 
        let uid

        if (body.nombreUsuario) {
            const doc = await db.collection('Usuarios').where('nombreUsuario', '==', body.nombreUsuario).get()
            
            if (doc.empty) {
                throw new ErrorJekuaa({
                    codigo: 'jekuaa/error/usuario_mala_solicitud',
                    mensaje: `No existe el usuario.`
                })
            }

            let datosUsuario = doc.docs[0].data()

            uid = datosUsuario.uid
        } else if (body.correo) {
            const doc = await db.collection('Usuarios').where('correo', '==', body.correo).get()
            
            if (doc.empty) {
                throw new ErrorJekuaa({
                    codigo: 'jekuaa/error/usuario_mala_solicitud',
                    mensaje: `No existe el usuario.`
                })
            }

            let datosUsuario = doc.docs[0].data()

            uid = datosUsuario.uid
        } else if (body.uid) {
            uid = body.uid

        } else {
            throw new ErrorJekuaa({
                codigo: 'jekuaa/error/usuario_mala_solicitud',
                mensaje: `No hay datos para buscar el usuario.`
            })
        }

        datosInfo = await Usuario.obtenerInformacionUsuarioPorUID ( uid )

        if (!datosInfo.exists) {
            throw new ErrorJekuaa({
                codigo: 'jekuaa/error/usuario_mala_solicitud',
                mensaje: `No existe datos de este usuario.`
            })
        }
        
        let codigo = 'jekuaa/exito'
        const respuesta = new Respuesta().setRespuestaPorCodigo(codigo, {
            mensaje: 'Los datos de los usuarios se enviaron de forma exitosa!',
            resultado: datosInfo.data()
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
        const { datosUsuario, contrasenha } = body
        
        const respuesta = new Respuesta()
        let codigo = 'jekuaa/exito'

        // Actualizar usuario
        if ( datosUsuario ) {
            console.log('Actualizando datos del usuario...')
            await Usuario.actalizarDatosUsuarioPorUID( uidSolicitante, datosUsuario )
        }

        // Actualizacion de contraseña
        if ( contrasenha ) {
            console.log('Actualizando contraseña del usuario...')
            await Usuario.actualizarContrasenhaPorUID( uidSolicitante, contrasenha )
        }

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
        const { busboy } = body
        
        const respuesta = new Respuesta()
        let codigo = 'jekuaa/exito'

        let file = files[0]
        let data = Buffer.from(file.buffer)
        let extensionArchivo = file.mimetype.split('/')[1]

        // Crear ruta temporal para la foto de perfil
        let dirArray = ['imagenes', 'fotoPerfil']
        let dirVerificacion = path.join(os.tmpdir())
        for (let i = 0; i < dirArray.length; i++) {
            const element = dirArray[i]
            dirVerificacion = path.join(dirVerificacion, element)
            if ( !fs.existsSync(dirVerificacion) ) fs.mkdirSync(dirVerificacion)
        }

        // Crear archivo foto de peril
        const nombreTemp = `${Date.now()}~${uidSolicitante}.${extensionArchivo}`
        const rutaArchivoTemp = path.join(os.tmpdir(), 'imagenes', 'fotoPerfil', `${nombreTemp}`)
        fs.writeFileSync(rutaArchivoTemp, data)

        // Eliminar la foto de perfil anterior
        await Usuario.eliminarFotoPerfilPorUID(uidSolicitante)
        
        // Subir a Firebase Storage
        await Usuario.subirFotoPerfil({
            rutaArchivo: rutaArchivoTemp,
            uidSolicitante,
            extensionArchivo
        })

        // Obtener la url de la foto de perfil y actualizar la foto de perfil
        const url = await Usuario.obtenerFotoPerfilURL(`${uidSolicitante}.${extensionArchivo}`)
        Usuario.actualizarFotoPerfilPorUID(uidSolicitante, url)

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

        // Actualizar usuario
        const response = await Usuario.eliminarFotoPerfilPorUID(uidSolicitante)
        Usuario.actualizarFotoPerfilPorUID(uidSolicitante, '')

        if (!response) {
            throw new ErrorJekuaa({
                codigo: 'jekuaa/error/usuario_mala_solicitud',
                mensaje: `No existe la foto de perfil.`
            })
        }

        respuesta.setRespuestaPorCodigo(codigo, {
            mensaje: '¡Se eliminó la foto de perfil!',
            resultado: response
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
        const actualizacion = await Usuario.actualizarInformacion(uidSolicitante, datosActualizados)

        respuesta.setRespuestaPorCodigo(codigo, {
            mensaje: '¡La información del usuario se actualizó de forma exitosa!',
            resultado: actualizacion
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