const configJekuaa = require('../../configJekuaa')
const admin = require('../../firebase-service')
const Usuario = require('./ComponentesUsuario/Usuario')
const db = require('../../db')

const COLECCION_USUARIO = 'Usuarios'

class Authentication {
    constructor ( uid = '' ) {
        this.uid = uid
    }


    /* 
        ###############################
                    METODOS
        ###############################
    */

    async crear ( usuario = new Usuario(), contrasenha = '' ) {
        // Crear una autenticacion para el nuevo usuario
        const usuarioAuthNuevo = await admin.auth().createUser({
            email: usuario.correo,
            password: contrasenha,
            displayName: usuario.nombreUsuario,
        })

        // Crear los reclamos de autenticacion para el nuevo usuario
        admin.auth().setCustomUserClaims(usuarioAuthNuevo.uid, {
            jekuaaRol: usuario.jekuaaRol,
            jekuaaPremium: usuario.jekuaaPremium.plan,
            instructor: usuario.instructor
        })

        return usuarioAuthNuevo.uid
    }
    
    async obtener () {
        // Recolectamos los datos de firebase authentication
        return await admin.auth().getUser(this.uid)
    }

    async actualizar (datosActualizados = {}) {
        const { auth, claims } = datosActualizados
        
        if (auth) await admin.auth().updateUser(this.uid, auth)
        if (claims) await admin.auth().setCustomUserClaims(this.uid, claims)

        return this
    }

    async actualizarContrasenha ( contrasenha ) {
        return admin.auth().updateUser(this.uid, { password: contrasenha })
    }

    async habilitar ( habilitar ) {
        return await admin.auth().updateUser(this.uid, { disabled: !habilitar })
    }

    async actualizarFotoPerfil ( rutaArchivo, extensionArchivo ) {

        const bucket = admin.storage().bucket('jekuaa-fotoperfil')
        const cienAnhos = (31557600 * 1000)

        const rutaModo = configJekuaa.environment.mode === 'production' ? 'prod' : 'dev'

        await bucket.deleteFiles({ prefix: `${rutaModo}/${this.uid}.` })

        let rutaStorage = `${rutaModo}/${this.uid}.${extensionArchivo}`
        await bucket.upload(rutaArchivo, {
            destination: rutaStorage,
            uploadType: 'media',
            metadata: {
                metadata: {
                    contentType: `.${extensionArchivo}`
                }
            }
        })

        const links = await bucket.file(rutaStorage).getSignedUrl({
            action: 'read',
            expires: Date.now() + cienAnhos * 1000
        })

        await admin.auth().updateUser(this.uid, { 
            photoURL: links[0]
        })

        return links[0]
    }

    async eliminarFotoPerfil (  ) {
        const rutaModo = configJekuaa.environment.mode === 'production' ? 'prod' : 'dev'

        const bucket = admin.storage().bucket('jekuaa-fotoperfil')
        await bucket.deleteFiles({ prefix: `${rutaModo}/${this.uid}.` })
        await admin.auth().updateUser( this.uid, { photoURL: null })

        return this
    }

    async eliminarUsuario (  ) {
        await admin.auth().deleteUser( this.uid )

        return this
    }

    
    /* 
        ###############################
                METODOS ESTATICOS
        ###############################
    */
    
    static async existeUsuario ( identificadores ) {

        const { uid, nombreUsuario, correo } = identificadores

        if ( uid ) {
            try {
                await admin.auth().getUser(uid)
                return true
            } catch (error) {
                return false
            }
        }

        if ( nombreUsuario ) {
            const docs = await db.collection(COLECCION_USUARIO).where('nombreUsuario', '==', nombreUsuario).get()
            return !docs.empty
        }

        if ( correo ) {
            try {
                await admin.auth().getUserByEmail( correo )
                return true
            } catch (error) {
                return false
            }
        }
    }
}

module.exports = Authentication