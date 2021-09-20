const admin = require('../../firebase-service')
const db = require('../../db')
const JekuaaPremium = require('./JekuaaPremium')
const JekuaaRoles = require('./JekuaaRoles')
const ErrorJekuaa = require('./Error/ErroresJekuaa')

const COLECCION_USUARIO = 'Usuarios'

class Usuario {

    constructor ( datosUsuario ) {
        if ( datosUsuario ) {
            var { 
                uid, nombreUsuario, correo, 
                nombreCompleto, fechaNacimiento,
                jekuaaPremium, jekuaaRoles, jekuaaPoint
            } = datosUsuario
        }

        this.uid = uid ? uid : ''
        this.nombreUsuario = nombreUsuario ? nombreUsuario : ''
        this.correo = correo ? correo : ''
        this.nombreCompleto = nombreCompleto ? nombreCompleto : ''
        this.fechaNacimiento = fechaNacimiento ? fechaNacimiento : null
        this.jekuaaPremium = jekuaaPremium ? jekuaaPremium : new JekuaaPremium()
        this.jekuaaRoles = jekuaaRoles ? jekuaaRoles : new JekuaaRoles()
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
            jekuaaRoles: this.jekuaaRoles,
            jekuaaPoint: this.jekuaaPoint
        }
    }

    getUsuarioJSON () {
        return {
            uid: this.uid,
            nombreUsuario: this.nombreUsuario,
            correo: this.correo, 
            nombreCompleto: this.nombreCompleto,
            fechaNacimiento: this.fechaNacimiento,
            jekuaaPremium: this.jekuaaPremium.getDatosPremium(),
            jekuaaRoles: this.jekuaaRoles.getDatosRoles(),
            jekuaaPoint: this.jekuaaPoint
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

    getJekuaaRoles () {
        return this.jekuaaRoles
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
            jekuaaPremium, jekuaaRoles, jekuaaPoint
        } = datosUsuario

        this.setUID(uid)
        this.setNombreUsuario(nombreUsuario)
        this.setCorreo(correo)
        this.setNombreCompleto(nombreCompleto)
        this.setFechaNacimiento(fechaNacimiento)
        this.setJekuaaPremium(jekuaaPremium)
        this.setJekuaaRoles(jekuaaRoles)
        this.setJekuaaPoints(jekuaaPoint)

        return this
    }

    setUID ( uid = '' ) {
        if (uid) {
            this.uid = uid
            return
        }

        this.uid = ''

        return this
    }

    setNombreUsuario ( nombreUsuario = '' ) {
        if (nombreUsuario) {
            this.nombreUsuario = nombreUsuario
            return
        }

        this.nombreUsuario = ''

        return this
    }

    setCorreo ( correo = '' ) {
        if (correo) {
            this.correo = correo
            return
        }

        this.correo = ''

        return this
    }

    setNombreCompleto ( nombreCompleto = '' ) {
        if (nombreCompleto) {
            this.nombreCompleto = nombreCompleto
            return
        }

        this.nombreCompleto = ''

        return this
    }

    setFechaNacimiento ( fechaNacimiento = null ) {
        if (fechaNacimiento) {
            this.fechaNacimiento = fechaNacimiento
            return
        }

        this.fechaNacimiento = null

        return this
    }

    setJekuaaPremium ( jekuaaPremium = null ) {
        if (jekuaaPremium) {
            const {
                fechaCompra,
                duracion,
                plan
            } = jekuaaPremium

            this.jekuaaPremium = new JekuaaPremium(jekuaaPremium)
            return
        }

        this.jekuaaPremium = new JekuaaPremium()

        return this
    }

    setJekuaaRoles ( jekuaaRoles = null ) {
        if (jekuaaRoles) {
            const {
                rol,
                secciones,
                instructor
            } = jekuaaRoles

            this.jekuaaRoles = new JekuaaRoles(jekuaaRoles)
            return
        }

        this.jekuaaRoles = new JekuaaRoles()

        return this
    }

    setJekuaaPoints ( jekuaaPoint = 0 ) {
        if (jekuaaPoint) {
            this.jekuaaPoint = jekuaaPoint
            return
        }

        this.jekuaaPoint = 0

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

    async actualizarDatosPersonales () {
        const docUsuario = await db.collection(COLECCION_USUARIO).doc(this.uid).get()

        if ( !docUsuario.exists ) {
            throw new Error(`No existe el usuario con la uid ${this.uid}.`)
        }

        if ( !this.uid ) {
            throw new Error('Para actualizar el usuario se debe tener la uid primeramente.')
        }

        if ( !this.nombreUsuario ) {
            throw new Error('Para actualizar el nombre de usuario debe existir el nombre de usuario.')
        }

        if ( !this.correo ) {
            throw new Error('Para actualizar el correo debe existir el correo.')
        }

        if ( typeof this.nombreUsuario != 'string' ) {
            throw new Error('El nombre de usuario debe ser de tipo string.')
        }

        if ( typeof this.correo != 'string' ) {
            throw new Error('El correo debe ser de tipo string.')
        }

        if ( typeof this.nombreCompleto != 'string' ) {
            throw new Error('El nombre completo debe ser de tipo string.')
        }

        if ( typeof this.fechaNacimiento != 'object' ) {
            throw new Error('La fecha de nacimiento debe ser de tipo object (Date).')
        }

        const datosUsuario = docUsuario.data()

        const datosUsuarioDBActualizar = {}
        const datosUsuarioAuthActualizar = {}

        if ( datosUsuario.nombreUsuario != this.nombreUsuario ) {
            datosUsuarioDBActualizar.nombreUsuario = this.nombreUsuario
            datosUsuarioAuthActualizar.displayName = this.nombreUsuario
        }

        if ( datosUsuario.correo != this.correo ) {
            datosUsuarioDBActualizar.correo = this.correo
            datosUsuarioAuthActualizar.email = this.correo
        }

        if ( datosUsuario.nombreCompleto != this.nombreCompleto ) {
            datosUsuarioDBActualizar.nombreCompleto = this.nombreCompleto
        }

        if ( this.fechaNacimiento ) {
            datosUsuarioDBActualizar.fechaNacimiento = admin.firestore.Timestamp.fromDate( this.fechaNacimiento )
        }

        await admin.auth().updateUser(this.uid, datosUsuarioAuthActualizar)
        await db.collection(COLECCION_USUARIO).doc(this.uid).update(datosUsuarioDBActualizar)

        return this
        
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

    static async crearNuevoUsuarioEstudiante ( datosNuevoUsuario, contrasenha ) {

        const {
            correo,
            nombreUsuario,
            nombreCompleto,
            fechaNacimiento
        } = datosNuevoUsuario

        if ( !correo || !contrasenha || !nombreUsuario ) {
            throw new Error('Debe existir el correo, contraseña y un nombre de usuario para registrarse.')
        }

        if ( nombreCompleto && ( typeof nombreCompleto != 'string' ) ) {
            throw new Error('El nombre completo debe ser de tipo string.')
        }

        if ( fechaNacimiento && ( typeof fechaNacimiento != 'object' ) ) {
            throw new Error('La fecha de nacimiento debe ser de tipo object (Date).')
        }
        
        await Usuario.errorExisteUsuario({
            nombreUsuario
        })

        const usuarioAuthNuevo = await admin.auth().createUser({
            email: correo,
            password: contrasenha,
            displayName: nombreUsuario,
        })

        let datosUsuario = new Usuario()
        datosUsuario.setUsuario( datosNuevoUsuario )
        datosUsuario.setUID( usuarioAuthNuevo.uid )
        datosUsuario = datosUsuario.getUsuarioJSON()

        await admin.firestore().collection(COLECCION_USUARIO).doc(usuarioAuthNuevo.uid).set(datosUsuario)
        await admin.auth().setCustomUserClaims(usuarioAuthNuevo.uid, {
            rol: 'estudiante',
            jekuaaPremium: false
        })

        return usuarioAuthNuevo.uid

    }

    static async obtenerDatosDeAuthenticationPorUID ( uid ) {
        
        // Recolectamos los datos de firebase authentication
        const datosUsuarioAuthentication = await admin.auth().getUser( uid )
    
        return datosUsuarioAuthentication

    }

    static async errorExisteUsuario ( identificadores ) {

        const {
            uid,
            nombreUsuario,
            correo
        } = identificadores

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