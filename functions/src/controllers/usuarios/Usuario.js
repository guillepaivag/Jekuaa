const admin = require('../../../firebase-service')
const db = require('../../../db')
const Usuario = require('../../models/Usuario')
const Respuesta = require('../../models/Respuesta')
const manejadorErrores = require('../../helpers/ManejoErrores')
const ErrorJekuaa = require('../../models/Error/ErroresJekuaa')
const fs = require('fs')
const path = require('path')

const controllerUsuario = {}

controllerUsuario.obtenerMiUsuario = async (req, res) => {
    try {
        const { jekuaaDatos, params } = req
        const { uidSolicitante, datosAuthSolicitante } = jekuaaDatos

        // Obtener datos del usuario
        const datosUsuario = await Usuario.verDatosUsuarioPorUID( params.uid )

        if (params.uid !== uidSolicitante) {
            delete datosUsuario.uid
            delete datosUsuario.jekuaaPremium
            delete datosUsuario.jekuaaRol
            delete datosUsuario.jekuaaPoint
        }

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
        }

        respuesta.setRespuestaPorCodigo( codigo, {
            mensaje: 'El usuario se actualizó de forma exitosa!',
            resultado: datosUsuario
        } )
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
        let dirArray = ['..', '..', 'temp', 'image', 'fotoPerfil']
        let dirVerificacion = path.join(__dirname)
        for (let i = 0; i < dirArray.length; i++) {
            const element = dirArray[i]

            dirVerificacion = path.join(dirVerificacion, element)
            
            if ( element != '..' && !fs.existsSync(dirVerificacion) ){
                fs.mkdirSync(dirVerificacion)
            }
        }

        // Crear archivo foto de peril
        const separador = `~`
        const nombreBlogTemp = `${Date.now()}${separador}${uidSolicitante}.${extensionArchivo}`
        const rutaArchivoTemp = path.join(__dirname, '..', '..', 'temp', 'image', 'fotoPerfil', `${nombreBlogTemp}`)
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