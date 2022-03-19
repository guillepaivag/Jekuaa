const db = require('../../../../db')
const Usuario = require('../../../models/Usuarios/Usuario')
const Respuesta = require('../../../models/Respuesta')
const manejadorErrores = require('../../../helpers/ManejoErrores')
const Errores = require('../../../models/Error/Errores')
const fs = require('fs')
const Authentication = require('../../../models/Usuarios/Authentication')
const InformacionUsuario = require('../../../models/Usuarios/InformacionUsuario')
const timestamp = require('../../../utils/timestamp')

const controllerUsuario = {}

controllerUsuario.crearUsuario = async (req, res) => {

    try {
        const { datos, body } = req
        const { datosUsuario, contrasenha } = body

        // Crear usuario
        const auth = new Authentication()
        const usuario = new Usuario(datosUsuario)
        
        const uid = await auth.crear(usuario, contrasenha)
        
        usuario.setUID(uid)  
        await Usuario.crearUsuario(usuario)

        const respuesta = new Respuesta()
        let codigo = 'exito'
        respuesta.setRespuestaPorCodigo(codigo, {
            mensaje: 'El usuario se creo de forma exitosa!',
            resultado: null,
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
        const { datos, params } = req
        const { tipoIdentificador, valorIdentificador } = params

        let datosUsuario 

        if ( tipoIdentificador === 'nombreUsuario' ) {
            const doc = await db.collection('Usuarios').where('nombreUsuario', '==', valorIdentificador).get()
            
            if (doc.empty) {
                throw new Errores({
                    codigo: 'error/usuario_mala_solicitud',
                    mensaje: `No existe el usuario.`
                })
            }

            datosUsuario = doc.docs[0].data()
        } else if ( tipoIdentificador === 'correo' ) {
            const doc = await db.collection('Usuarios').where('correo', '==', valorIdentificador).get()
            
            if (doc.empty) {
                throw new Errores({
                    codigo: 'error/usuario_mala_solicitud',
                    mensaje: `No existe el usuario.`
                })
            }

            datosUsuario = doc.docs[0].data()
        } else if ( tipoIdentificador === 'uid' ) {
            const usuario = new Usuario()
            await usuario.importarDatosUsuarioPorUID(valorIdentificador)
            datosUsuario = usuario.getDatosUsuario()

        } else {
            throw new Errores({
                codigo: 'error/usuario_mala_solicitud',
                mensaje: `No hay datos para buscar el usuario.`
            })
        }

        delete datosUsuario.plan
        delete datosUsuario.rol
        delete datosUsuario.point
        delete datosUsuario.correo

        let codigo = 'exito'
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
        const { datos, params } = req
        const { tipoIdentificador, valorIdentificador } = params
        
        let datosAuth 
        let uid

        if ( tipoIdentificador === 'nombreUsuario' ) {
            const doc = await db.collection('Usuarios').where('nombreUsuario', '==', valorIdentificador).get()
            
            if (doc.empty) {
                throw new Errores({
                    codigo: 'error/usuario_mala_solicitud',
                    mensaje: `No existe el usuario.`
                })
            }

            let datosUsuario = doc.docs[0].data()

            uid = datosUsuario.uid
        } else if ( tipoIdentificador === 'correo' ) {
            const doc = await db.collection('Usuarios').where('correo', '==', valorIdentificador).get()
            
            if (doc.empty) {
                throw new Errores({
                    codigo: 'error/usuario_mala_solicitud',
                    mensaje: `No existe el usuario.`
                })
            }

            let datosUsuario = doc.docs[0].data()

            uid = datosUsuario.uid
        } else if ( tipoIdentificador === 'uid' ) {
            uid = valorIdentificador

        } else {
            throw new Errores({
                codigo: 'error/usuario_mala_solicitud',
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
        delete datosAuth.customClaims.plan
        delete datosAuth.customClaims.rol
        delete datosAuth.tokensValidAfterTime
        delete datosAuth.providerData
        
        let codigo = 'exito'
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
        const { datos, params } = req
        const { tipoIdentificador, valorIdentificador } = params
        
        let datosInfo 
        let uid

        if ( tipoIdentificador === 'nombreUsuario' ) {
            const doc = await db.collection('Usuarios').where('nombreUsuario', '==', valorIdentificador).get()
            
            if (doc.empty) {
                throw new Errores({
                    codigo: 'error/usuario_mala_solicitud',
                    mensaje: `No existe el usuario.`
                })
            }

            let datosUsuario = doc.docs[0].data()

            uid = datosUsuario.uid
        } else if ( tipoIdentificador === 'correo' ) {
            const doc = await db.collection('Usuarios').where('correo', '==', valorIdentificador).get()
            
            if (doc.empty) {
                throw new Errores({
                    codigo: 'error/usuario_mala_solicitud',
                    mensaje: `No existe el usuario.`
                })
            }

            let datosUsuario = doc.docs[0].data()

            uid = datosUsuario.uid
        } else if ( tipoIdentificador === 'uid' ) {
            uid = valorIdentificador

        } else {
            throw new Errores({
                codigo: 'error/usuario_mala_solicitud',
                mensaje: `No hay datos para buscar el usuario.`
            })
        }
        const info = new InformacionUsuario()
        await info.importarInformacionUsuario(uid)
        datosInfo = info.getInformacionUsuario(true)

        // if (!datosInfo.exists) {
        //     throw new Errores({
        //         codigo: 'error/usuario_mala_solicitud',
        //         mensaje: `No existe datos de este usuario.`
        //     })
        // }
        
        let codigo = 'exito'
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
        const { datos, body } = req
        const { uidSolicitante, datosAuthSolicitante } = datos
        const { datosUsuario, contrasenha, datosAuth, datosClaims } = body

        const auth = new Authentication(uidSolicitante)

        // Actualizar authenticacion
        if (datosAuth || datosClaims) 
            auth.actualizar({ auth: datosAuth, claims: datosClaims })
        
        // Actualizar usuario
        if ( datosUsuario ) 
            Usuario.actalizarUsuarioPorUID( uidSolicitante, datosUsuario )

        // Actualizacion de contraseña
        if ( contrasenha ) 
            auth.actualizarContrasenha( contrasenha )

        const respuesta = new Respuesta()
        let codigo = 'exito'

        respuesta.setRespuestaPorCodigo(codigo, {
            mensaje: 'El usuario se actualizó de forma exitosa!',
            resultado: { datosUsuario, contrasenha, datosAuth, datosClaims }
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

controllerUsuario.actualizarMiInformacion = async (req, res) => {
    try {
        const { datos, body } = req
        const { uidSolicitante, datosAuthSolicitante } = datos
        const { datosActualizados } = body
        
        const respuesta = new Respuesta()
        let codigo = 'exito'

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

controllerUsuario.actualizarFotoPerfil = async (req, res) => {
    try {
        const { datos, body, files } = req
        const { uidSolicitante, datosAuthSolicitante } = datos
        
        const respuesta = new Respuesta()
        let codigo = 'exito'
        
        const file = files[0]
        const auth = new Authentication(uidSolicitante)
        const url = await auth.actualizarFotoPerfil(file.filePath, file.fileExtension)

        // Borrar el archivo creado en el servidor
        fs.unlink(file.filePath, (err => {
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
        const { datos } = req
        const { uidSolicitante, datosAuthSolicitante } = datos
        
        const respuesta = new Respuesta()
        let codigo = 'exito'

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

controllerUsuario.procesoEliminacion = async (req, res) => {
    try {
        const { datos } = req
        const { uidSolicitante, datosAuthSolicitante } = datos

        const esComienzo = req.originalUrl.includes('comienzo')

        const respuesta = new Respuesta()
        let codigo = 'exito'

        if (esComienzo) {
            // Si existe no se crea la solicitud
            const doc = await db.collection('SolicitudesEliminacion').doc(uidSolicitante).get()
            if (doc.exists) {
                throw new Errores({
                    codigo: 'error/usuario_mala_solicitud',
                    mensaje: `Tu cuenta ya está en proceso de eliminación.`
                })
            }

            // Crear solicitud de eliminación
            let fechaSolicitud = new Date()
            let fechaEliminacion = new Date()
            fechaEliminacion.setDate(fechaEliminacion.getDate() + 30)
            
            await doc.ref.set({
                uid: uidSolicitante,
                fechaSolicitud: timestamp.milliseconds_a_timestamp( fechaSolicitud.getTime() ),
                fechaEliminacion: timestamp.milliseconds_a_timestamp( fechaEliminacion.getTime() ),
            })
        } else {
            // Sino existe no se elimina la solicitud
            const doc = await db.collection('SolicitudesEliminacion').doc(uidSolicitante).get()
            if (!doc.exists) {
                throw new Errores({
                    codigo: 'error/usuario_mala_solicitud',
                    mensaje: `Tu cuenta no está en proceso de eliminación.`
                })
            }

            // Elimina solicitud de eliminación
            await doc.ref.delete()
        }

        respuesta.setRespuestaPorCodigo(codigo, {
            mensaje: 'Te has eliminado de forma correcta.',
            resultado: null
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