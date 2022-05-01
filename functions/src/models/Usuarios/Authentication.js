const config = require('../../../config')
const admin = require('../../../firebase-service')
const Usuario = require('./Usuario')
const db = require('../../../db')

const COLECCION_USUARIO = 'Usuarios'

class Authentication {
    constructor ( uid = '' ) {
        this.uid = uid
    }


    /* 
     *    ################################
     *           METODOS NO ESTATICOS
     *    ################################
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
            rol: usuario.rol,
            plan: usuario.plan,
        })

        this.uid = usuarioAuthNuevo.uid

        return usuarioAuthNuevo.uid
    }

    async existeUsuario () {
        try {
            return await this.obtener()
        } catch (error) {
            return null
        }
    }
    
    async obtener () {
        // Recolectamos los datos de firebase authentication
        return await admin.auth().getUser(this.uid)
    }

    async actualizar (datosActualizados = { auth, claims }) {
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

    async aceptarFotoEnVerificacion ( datos = { bucketOrigin, bucketDestination, rutaOrigin, rutaDestination } ) {
        const { bucketOrigin, bucketDestination, rutaOrigin, rutaDestination } = datos

        const storage = admin.storage()

        // Mover al storage aceptado
        const bucketO = storage.bucket(bucketOrigin)
        const fileO = bucketO.file(rutaOrigin)

        const bucketD = storage.bucket(bucketDestination)
        const fileD = bucketD.file(rutaDestination)

        await fileO.copy(fileD)
        console.log('fileD.publicUrl()', fileD.publicUrl())

        // Actualizar con la nueva URL
        this.actualizarFotoPerfil( fileD.publicUrl() )

        // Eliminar la foto en verificación
        this.eliminarFotoPerfilVerificacion()
    }

    async actualizarFotoPerfil ( urlFoto = '' ) {
        await admin.auth().updateUser(this.uid, { 
            photoURL: urlFoto
        })

        return urlFoto
    }

    async eliminarFotoPerfil () {
        const rutaModo = config.environment.mode === 'production' ? 'prod' : 'dev'

        let bucketNameFotoPerfil = rutaModo === 'prod' ? 'prod-j-fotos-perfiles' : 'dev-j-fotos-perfiles'

        const bucket = admin.storage().bucket(bucketNameFotoPerfil)
        await bucket.deleteFiles({ prefix: `${this.uid}` })
        
        await admin.auth().updateUser( this.uid, { photoURL: null })

        return this
    }

    async eliminarFotoPerfilVerificacion ( fileNamePrefix = '' ) {
        const rutaModo = config.environment.mode === 'production' ? 'prod' : 'dev'

        let bucketNameFotoPerfil = rutaModo === 'prod' ? 'prod-j-fotos-perfiles-v' : 'dev-j-fotos-perfiles-v'

        const bucket = admin.storage().bucket(bucketNameFotoPerfil)
        if (fileNamePrefix) await bucket.deleteFiles({ prefix: `${this.uid}/${fileNamePrefix}` }) 
        else await bucket.deleteFiles({ prefix: `${this.uid}/` })

        return this
    }

    async eliminarUsuario (  ) {
        await admin.auth().deleteUser( this.uid )

        return this
    }

    
    /* 
     *    ################################
     *           METODOS ESTATICOS
     *    ################################
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