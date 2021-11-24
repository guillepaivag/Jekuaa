const admin = require('../../firebase-service')
const db = require('../../db')
const JekuaaPremium = require('./JekuaaPremium')
const JekuaaRoles = require('./JekuaaRoles')
const ErrorJekuaa = require('./Error/ErroresJekuaa')
const utilsUsuario = require('../utils/Usuario')
const storage = require('../../GoogleStorage')
const configJekuaa = require('../../configJekuaa')

const COLECCION_USUARIO = 'Usuarios'

class Usuario {

    constructor ( datosUsuario ) {
        if ( datosUsuario ) {
            var { 
                uid, nombreUsuario, correo, 
                nombreCompleto, fechaNacimiento,
                jekuaaPremium, jekuaaRol, instructor, jekuaaPoint
            } = datosUsuario
        }

        this.uid = uid ? uid : ''
        this.nombreUsuario = nombreUsuario ? nombreUsuario : ''
        this.correo = correo ? correo : ''
        this.nombreCompleto = nombreCompleto ? nombreCompleto : ''
        this.fechaNacimiento = fechaNacimiento ? fechaNacimiento : null
        this.jekuaaPremium = jekuaaPremium ? jekuaaPremium : new JekuaaPremium()
        this.jekuaaRol = jekuaaRol ? jekuaaRol : 'estudiante'
        this.instructor = instructor ? instructor : false
        this.jekuaaPoint = jekuaaPoint ? jekuaaPoint : 0
    }
    



    /* 
        GETTERS: Se obtienen los datos de los atributos
    */

    getUsuario () {
        return {
            uid: this.uid,
            nombreUsuario: this.nombreUsuario,
            correo: this.correo, 
            nombreCompleto: this.nombreCompleto,
            fechaNacimiento: this.fechaNacimiento,
            jekuaaPremium: this.jekuaaPremium,
            jekuaaRol: this.jekuaaRol,
            instructor: this.instructor,
            jekuaaPoint: this.jekuaaPoint,
        }
    }

    getDatosUsuario () {
        return {
            uid: this.uid,
            nombreUsuario: this.nombreUsuario,
            correo: this.correo, 
            nombreCompleto: this.nombreCompleto,
            fechaNacimiento: this.fechaNacimiento,
            jekuaaPremium: this.jekuaaPremium.getDatosPremium(),
            jekuaaRol: this.jekuaaRol,
            instructor: this.instructor,
            jekuaaPoint: this.jekuaaPoint,
        }
    }

    getUID () {
        return this.uid
    }

    getNombreUsuario () {
        return this.nombreUsuario
    }

    getCorreo () {
        return this.correo
    }

    getNombreCompleto () {
        return this.nombreCompleto
    }

    getFechaNacimiento () {
        return this.fechaNacimiento
    }

    getJekuaaPremium () {
        return this.jekuaaPremium
    }

    getJekuaaRol () {
        return this.jekuaaRoles
    }

    getInstructor () {
        return this.instructor
    }

    getJekuaaPoints () {
        return this.jekuaaPoint
    }




    /* 
        SETTERS: Se agregan los datos que se desee a los atributos
    */

    setUsuario ( datosUsuario ) {
        const { 
            uid, nombreUsuario, correo, 
            nombreCompleto, fechaNacimiento,
            jekuaaPremium, jekuaaRol, instructor, jekuaaPoint
        } = datosUsuario

        this.setUID(uid)
        this.setNombreUsuario(nombreUsuario)
        this.setCorreo(correo)
        this.setNombreCompleto(nombreCompleto)
        this.setFechaNacimiento(fechaNacimiento)
        this.setJekuaaPremium(jekuaaPremium)
        this.setJekuaaRol(jekuaaRol)
        this.setInstructor(instructor)
        this.setJekuaaPoints(jekuaaPoint)

        return this
    }

    setUID ( uid = '' ) {
        this.uid = uid
        return this
    }

    setNombreUsuario ( nombreUsuario = '' ) {
        this.nombreUsuario = nombreUsuario
        return this
    }

    setCorreo ( correo = '' ) {
        this.correo = correo
        return this
    }

    setNombreCompleto ( nombreCompleto = '' ) {
        this.nombreCompleto = nombreCompleto
        return this
    }

    setFechaNacimiento ( fechaNacimiento = null ) {
        this.fechaNacimiento = fechaNacimiento
        return this
    }

    setJekuaaPremium ( jekuaaPremium = new JekuaaPremium() ) {
        if (jekuaaPremium) {
            this.jekuaaPremium = new JekuaaPremium({
                plan: jekuaaPremium.plan,
                fechaCompra: jekuaaPremium.fechaCompra,
                fechaHasta: jekuaaPremium.fechaHasta,
            })
        } else {
            this.jekuaaPremium = jekuaaPremium
        }

        return this
    }

    setJekuaaRol ( jekuaaRol = 'estudiante' ) {
        this.jekuaaRol = jekuaaRol
        return this
    }

    setInstructor ( instructor = false ) {
        this.instructor = !!instructor
        return this
    }

    setJekuaaPoints ( jekuaaPoint = 0 ) {
        this.jekuaaPoint = jekuaaPoint
        return this
    }




    /* 
        ACCIONES: Se trabajara con la base de datos
    */

        /* 
            ###############################
                 METODOS NO ESTATICOS
            ###############################
        */

    async importarDatosUsuarioPorUID ( uid ) {

        const documentoUsuario = await db.collection(COLECCION_USUARIO).doc(uid).get()

        if ( !documentoUsuario.exists ) {
            throw new ErrorJekuaa({
                codigo: 'jekuaa/error/usuario_mala_solicitud',
                mensaje: 'No existe el usuario.',
            })
        }

        const datosUsuario = documentoUsuario.data()

        this.setUsuario( datosUsuario )

        return this

    }

    async obtenerDatosDeAuthentication () {
    
        // Recolectamos los datos de firebase authentication
        const datosUsuarioAuthentication = await admin.auth().getUser(this.uid)
    
        return datosUsuarioAuthentication
    
    }
    
        /* 
            ###############################
                   METODOS ESTATICOS
            ###############################
        */


    /* 
        DESCRIPCION: Se crea un usuario a partir de los datos personales 
        y datos de registro como el correo, contraseña y un dato obligatorio para
        el registro como el nombre de usuario.
    */

    // Usuarios
    static async crearNuevoUsuario ( datosUsuario, contrasenha ) {
        const {
            nombreUsuario,
            correo,
            nombreCompleto,
            fechaNacimiento,
            jekuaaPremium,
            jekuaaRol,
            instructor,
            jekuaaPoint
        } = datosUsuario

        // Crear una autenticacion para el nuevo usuario
        const usuarioAuthNuevo = await admin.auth().createUser({
            email: correo,
            password: contrasenha,
            displayName: nombreUsuario,
        })

        // Crear los reclamos de autenticacion para el nuevo usuario
        await admin.auth().setCustomUserClaims(usuarioAuthNuevo.uid, {
            jekuaaRol: jekuaaRol,
            jekuaaPremium: jekuaaPremium.plan,
            instructor: instructor
        })

        // Crear los datos en firestore para el nuevo usuario
        await db.collection(COLECCION_USUARIO).doc(usuarioAuthNuevo.uid).set({
            ...datosUsuario,
            uid: usuarioAuthNuevo.uid
        })

        // // Crear instructor
        // if ( jekuaaRoles.instructor ) {
        //     // Agregar instructor
        //     Instructor.crearNuevoInstructor({
        //         uid: usuarioAuthNuevo.uid
        //     })
        // }

        const usuario = new Usuario({
            ...datosUsuario,
            uid: usuarioAuthNuevo.uid
        })

        return usuario
    }

    static async actalizarDatosUsuarioPorUID ( uidUsuario, datosActualizados ) {

        const {
            nombreUsuario,
            correo,
            nombreCompleto,
            fechaNacimiento,
            jekuaaPremium,
            jekuaaRol,
            instructor,
            jekuaaPoint
        } = datosActualizados

        const datosAuth = await admin.auth().getUser(uidUsuario)
        
        const datosAuthActualizados = utilsUsuario.construirDatosAutentication (datosActualizados, datosAuth)
        const datosAuthClaimsActualizados = utilsUsuario.construirDatosReclamosAutenticacion (datosActualizados, datosAuth.customClaims)

        // Actualizar la autenticacion del usuario
        Object.keys(datosAuthActualizados).length ? 
        await admin.auth().updateUser(uidUsuario, datosAuthActualizados) : ''

        // Actualizar los reclamos de autenticacion del usuario
        Object.keys(datosAuthClaimsActualizados).length ? 
        await admin.auth().setCustomUserClaims(uidUsuario, datosAuthClaimsActualizados) : ''

        // Actualizar los datos de firestore del usuario
        Object.keys(datosActualizados).length ? 
        await db.collection(COLECCION_USUARIO).doc(uidUsuario).update(datosActualizados) : ''

        // // Operar los datos de instructor en caso de cambio
        // const cambioInstructor = jekuaaRoles ? jekuaaRoles.instructor != datosUsuario.jekuaaRoles.instructor : false
        // if ( !cambioInstructor ) {
        //     return usuario 
        // }

        // const noExisteInstructor = !(await db.collection(COLECCION_INSTRUCTOR).doc(uidUsuario).get()).exists
        // if ( jekuaaRoles.instructor && noExisteInstructor ) {
        //     // Agregar instructor
        //     Instructor.crearNuevoInstructor({
        //         uid: uidUsuario
        //     })
        // }

        return uidUsuario 
    }

    static async actualizarContrasenhaPorUID ( uidUsuario, contrasenha ) {
        return admin.auth().updateUser(uidUsuario, {
            password: contrasenha,
        })
    }

    static async actualizarInformacion ( uid, datos ) {
        return db.collection('InformacionUsuarios').doc(uid).update(datos)
    }

    static async obtenerInformacionUsuarioPorUID ( uid ) {
        return db.collection('InformacionUsuarios').doc(uid).get()
    }

    static async verDatosUsuarioPorUID ( uidUsuario ) {
        const usuario = new Usuario()
        await usuario.importarDatosUsuarioPorUID( uidUsuario )

        return usuario.getDatosUsuario()
    }

    static async verDatosAuthPorUID ( uidUsuario ) {
        const datosAuth = await admin.auth().getUser(uidUsuario)

        return datosAuth
    }

    static async habilitarUsuarioPorUID ( uidUsuario, habilitar ) {
        let resultado = await admin.auth().updateUser(uidUsuario, {
            disabled: !habilitar,
        })

        return resultado
    }

    static async actualizarFotoPerfilPorUID ( uidUsuario, fotoPerfil ) {
        let resultado = await admin.auth().updateUser(uidUsuario, {
            photoURL: fotoPerfil ? fotoPerfil : null
        })

        return resultado
    }

    static async subirFotoPerfil ( opciones = { rutaArchivo, uidSolicitante, extensionArchivo } ) {
        const bucket = storage.bucket('jekuaa-fotoperfil')

        const rutaModo = configJekuaa.environment.mode === 'production' ? 'prod' : 'dev'
        const response = await bucket.upload(opciones.rutaArchivo, {
            destination: `${rutaModo}/${opciones.uidSolicitante}.${opciones.extensionArchivo}`,
            uploadType: 'media',
            metadata: {
                metadata: {
                    contentType: `.${opciones.extensionArchivo}`
                }
            }
        })

        return response
    }

    static async obtenerFotoPerfilURL ( nombreArchivo ) {

        // opcionesBlog: pendiente, segundosValidos
        const action = 'read'
        const cienAnhos = (31557600 * 1000)
        const expires = Date.now() + cienAnhos * 1000
        const rutaModo = configJekuaa.environment.mode === 'production' ? 'prod' : 'dev'
        const rutaArchivo = `${rutaModo}/${nombreArchivo}`

        const bucket = storage.bucket('jekuaa-fotoperfil')
        const file = bucket.file(rutaArchivo)

        const existe = (await file.exists())[0]

        if ( !existe ) {
            throw new ErrorJekuaa({
                codigo: 'jekuaa/error/usuario_mala_solicitud',
                mensaje: `No existe la foto de perfil ${rutaArchivo}`
            })
        }
        
        const links = await file.getSignedUrl({
            action,
            expires
        })
        
        return links[0]
    }

    static async eliminarFotoPerfilPorUID ( uidUsuario ) {
        const rutaModo = configJekuaa.environment.mode === 'production' ? 'prod' : 'dev'

        const bucket = admin.storage().bucket('jekuaa-fotoperfil')
        const resultado = await bucket.deleteFiles({
            prefix: `${rutaModo}/${uidUsuario}.`
        })

        return resultado
    }

    static async eliminarUsuarioPorUID ( uidUsuario ) {
        let authEliminado = await admin.auth().deleteUser( uidUsuario )
        let firestoreEliminado = await db.collection(COLECCION_USUARIO).doc(uidUsuario).delete()

        return {
            authEliminado,
            firestoreEliminado
        }
    }

    static async errorExisteUsuario ( identificadores ) {

        const { uid, nombreUsuario, correo } = identificadores

        if ( uid ) {

            let usuario = null
            try {
                usuario = await admin.auth().getUser(uid)

                if ( usuario ) {
                    throw new ErrorJekuaa({
                        codigo: 'jekuaa/error/usuario_mala_solicitud',
                        mensaje: 'Ya existe el usuario.'
                    })
                }

            } catch (error) {
                
            }

        }

        if ( nombreUsuario ) {
            const existe = !(await db.collection(COLECCION_USUARIO).where('nombreUsuario', '==', nombreUsuario).get()).empty

            if ( existe ) {
                throw new ErrorJekuaa({
                    codigo: 'jekuaa/error/usuario_mala_solicitud',
                    mensaje: 'Ya existe el usuario.'
                })
            }
        }

        if ( correo ) {

            let usuario = null
            try {
                usuario = await admin.auth().getUserByEmail( correo )

                if ( usuario ) {
                    throw new ErrorJekuaa({
                        codigo: 'jekuaa/error/usuario_mala_solicitud',
                        mensaje: 'Ya existe el usuario.'
                    })
                }
            
            } catch (error) {
                
            }
        }
    }
    
    static async errorNoExisteUsuario ( identificadores ) {

        const {
            uid,
            nombreUsuario,
            correo
        } = identificadores

        if ( uid ) {
            try {
                await admin.auth().getUser(uid)
            } catch (error) {
                console.log('error -> auth/user-not-found', error)

                throw new Error(`No existe el uid ${uid}`)
            }
        }

        if ( nombreUsuario ) {
            const existe = !(await db.collection(COLECCION_USUARIO).where('nombreUsuario', '==', nombreUsuario).get()).empty

            if ( existe ) {
                throw new Error(`No existe el nombre de usuario ${nombreUsuario}`)
            }
        }

        if ( correo ) {

            try {
                await admin.auth().getUserByEmail( correo )
            } catch (error) {
                console.log('error -> auth/user-not-found', error)

                throw new Error(`No existe el correo ${correo}`)
            }

        }
    }
}

module.exports = Usuario