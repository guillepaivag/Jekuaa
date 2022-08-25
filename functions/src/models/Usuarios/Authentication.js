const config = require('../../../config')
const admin = require('../../../firebase-service')
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
    async crear ( datos = { correo, nombreCompleto, rol, plan }, contrasenha = '' ) {
        const { correo, nombreCompleto, rol, plan } = datos

        // Crear una autenticacion para el nuevo usuario
        const usuarioAuthNuevo = await admin.auth().createUser({
            email: correo,
            password: contrasenha,
            displayName: nombreCompleto,
        })

        this.uid = usuarioAuthNuevo.uid

        return usuarioAuthNuevo.uid
    }
    
    async obtener () {
        // Recolectamos los datos de firebase authentication
        return await admin.auth().getUser(this.uid)
    }
    
    async existeUsuario () {
        try {
            return await this.obtener()
        } catch (error) {
            return null
        }
    }
    
    async actualizar (datosActualizados = { auth, claims }) {
        const { auth, claims } = datosActualizados
        
        if (auth) await admin.auth().updateUser(this.uid, auth)
        if (claims) await admin.auth().setCustomUserClaims(this.uid, claims)

        return this
    }

    async actualizarCustomUserClaims (customClaims = {}) {
        // Crear los reclamos de autenticacion para el nuevo usuario
        await admin.auth().setCustomUserClaims(this.uid, customClaims)
    }

    async actualizarContrasenha ( contrasenha ) {
        return admin.auth().updateUser(this.uid, { password: contrasenha })
    }

    async habilitar ( habilitar ) {
        return await admin.auth().updateUser(this.uid, { disabled: !habilitar })
    }

    async aceptarFotoEnVerificacion (bucketName, filePath, filePathDestination) {
        const storage = admin.storage()

        const bucket = storage.bucket(bucketName)
        
        const file = bucket.file(filePath)
        const data = await file.move(filePathDestination)

        const destinationFile = data[0]
        const apiResponse = data[1]

        // Actualizar con la nueva URL
        this.actualizarFotoPerfil( destinationFile.publicUrl() )
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

        await admin.auth().updateUser( this.uid, { photoURL: null })

        const bucket = admin.storage().bucket(bucketNameFotoPerfil)
        await bucket.deleteFiles({ prefix: `${this.uid}/foto.` })

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
    
    static async existeUsuario ( identificadores = {} ) {

        const { uid, nombreUsuario, correo } = identificadores

        if ( uid ) {
            try {
                return await admin.auth().getUser(uid)
            } catch (error) {
                return null
            }
        }

        if ( nombreUsuario ) {
            const snapshot = await db
            .collection(COLECCION_USUARIO)
            .where('nombreUsuario', '==', nombreUsuario)
            .where('eliminado', '!=', true)
            .get()

            return !snapshot.empty
        }

        if ( correo ) {
            try {
                return await admin.auth().getUserByEmail( correo )
            } catch (error) {
                return null
            }
        }
    }
}

module.exports = Authentication