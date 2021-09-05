const admin = require('../../firebase-service')
const db = require('../../db')
const JekuaaPremium = require('./JekuaaPremium')
const JekuaaRoles = require('./JekuaaRoles')

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
        this.jekuaaPremium = jekuaaPremium ? jekuaaPremium : null
        this.jekuaaRoles = jekuaaRoles ? jekuaaRoles : new JekuaaRoles().getDatosRoles()
        this.jekuaaPoint = jekuaaPoint ? jekuaaPoint : 0
    }
    



    /* 
        GETTERS: Se obtienen los datos de los atributos
    */

    getUsuario () {
        return this
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
    }

    setUID ( uid = '' ) {
        if (uid) {
            this.uid = uid
            return
        }

        this.uid = ''
    }

    setNombreUsuario ( nombreUsuario = '' ) {
        if (nombreUsuario) {
            this.nombreUsuario = nombreUsuario
            return
        }

        this.nombreUsuario = ''
    }

    setCorreo ( correo = '' ) {
        if (correo) {
            this.correo = correo
            return
        }

        this.correo = ''
    }

    setNombreCompleto ( nombreCompleto = '' ) {
        if (nombreCompleto) {
            this.nombreCompleto = nombreCompleto
            return
        }

        this.nombreCompleto = ''
    }

    setFechaNacimiento ( fechaNacimiento = null ) {
        if (fechaNacimiento) {
            this.fechaNacimiento = fechaNacimiento
            return
        }

        this.fechaNacimiento = null
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

        this.jekuaaPremium = null
    }

    setJekuaaRoles ( jekuaaRoles = null ) {
        if (jekuaaRoles) {
            const {
                rol,
                secciones,
                instructor
            } = jekuaaRoles

            this.jekuaaRoles = new JekuaaRoles(jekuaaRoles).getDatosRoles()
            return
        }

        this.jekuaaRoles = new JekuaaRoles().getDatosRoles()
    }

    setJekuaaPoints ( jekuaaPoint = 0 ) {
        if (jekuaaPoint) {
            this.jekuaaPoint = jekuaaPoint
            return
        }

        this.jekuaaPoint = 0
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
        
        if ( !uid ) {
            throw new Error('La uid debe existir.')
        }

        if ( typeof uid != 'string' ) {
            throw new Error('La uid debe ser un string.')
        }

        const documentoUsuario = await db.collection(COLECCION_USUARIO).doc(uid).get()

        if ( !documentoUsuario.exists ) {
            throw new Error('No existe el usuario.')
        }

        const datosUsuario = documentoUsuario.data()

        this.setUsuario(datosUsuario)

        return this.getUsuario()
    }

    async obtenerDatosDeAuthentication () {
        
        if ( !this.uid ) {
            throw new Error('La uid debe existir.')
        }
        
        if ( typeof this.uid != 'string' ) {
            throw new Error('La uid debe ser string.')
        }
    
        // Recolectamos los datos de firebase authentication
        const datosUsuarioAuthentication = await admin.auth().getUser(this.uid)
    
        return datosUsuarioAuthentication
    }

    async guardarUsuario (contrasenha = String) {
        
        if ( this.uid && this.uid.length > 0 ) {
            const docUsuario = await db.collection(COLECCION_USUARIO).doc(this.uid).get()

            if ( docUsuario.exists ) {
                throw new Error(`Ya existe el usuario con la uid ${this.uid}.`)
            }
        }

        this.uid = await Usuario.crearNuevoUsuario({
            nombreUsuario: this.nombreUsuario,
            correo: this.correo,
            nombreCompleto: this.nombreCompleto,
            fechaNacimiento: this.fechaNacimiento,
        }, contrasenha)
     
        return this.getUsuario()
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

        if ( new Date(datosUsuario.fechaNacimiento.seconds * 1000).getTime() != this.fechaNacimiento.getTime() ) {
            datosUsuarioDBActualizar.fechaNacimiento = admin.firestore.Timestamp.fromDate(this.fechaNacimiento)
        }

        await admin.auth().updateUser(this.uid, datosUsuarioAuthActualizar)
        await db.collection(COLECCION_USUARIO).doc(this.uid).update(datosUsuarioDBActualizar)

        return this.getUsuario()
        
    }

    async actualizarNombreUsuario () {

    }

    async actualizarCorreo () {
        
    }

    async actualizarNombreCompleto () {
        
    }

    async actualizarFechaNacimineto () {
        
    }

    async obtenerCurso (uidCurso = String) {
        
    }

    async solicitarClasePorCurso (uidCurso = String, uidClase = String) {

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

    static async crearNuevoUsuario ( datosNuevoUsuario, contrasenha ) {

        const {
            correo,
            nombreUsuario,
            nombreCompleto,
            fechaNacimiento
        } = datosNuevoUsuario

        if ( !correo || !contrasenha || !nombreUsuario ) {
            throw new Error('Debe existir el correo, contraseña y un nombre de usuario para registrarse.')
        }

        if ( typeof nombreUsuario != 'string' ) {
            throw new Error('El nombre de usuario debe ser de tipo string.')
        }

        if ( typeof correo != 'string' ) {
            throw new Error('El correo debe ser de tipo string.')
        }

        if ( typeof contrasenha != 'string' ) {
            throw new Error('El correo debe ser de tipo string.')
        }

        if ( nombreCompleto && ( typeof nombreCompleto != 'string' ) ) {
            throw new Error('El nombre completo debe ser de tipo string.')
        }

        if ( fechaNacimiento && ( typeof fechaNacimiento != 'object' ) ) {
            throw new Error('La fecha de nacimiento debe ser de tipo object.')
        }
        
        const existeNombreUsuario = !(await db.collection(COLECCION_USUARIO).where('nombreUsuario', '==', nombreUsuario).get()).empty

        if ( existeNombreUsuario ) {
            throw new Error(`Ya existe el nombre de usuario ${nombreUsuario}`)
        }

        const usuarioAuthNuevo = await admin.auth().createUser({
            email: correo,
            password: contrasenha,
            displayName: nombreUsuario,
        })

        const datosUsuario = {
            uid: usuarioAuthNuevo.uid,
            nombreUsuario: nombreUsuario,
            correo: correo,
            nombreCompleto: nombreCompleto ? nombreCompleto : null,
            fechaNacimiento: fechaNacimiento ? admin.firestore.Timestamp.fromDate(fechaNacimiento) : null,
            jekuaaPremium: null,
            jekuaaRoles: new JekuaaRoles().getDatosRoles(),
            jekuaaPoint: 0
        }
        
        const informacionDeDatosUsuario = {
            rol: 'estudiante',
            jekuaaPremium: false
        }

        await admin.firestore().collection(COLECCION_USUARIO).doc(usuarioAuthNuevo.uid).set(datosUsuario)
        await admin.auth().setCustomUserClaims(usuarioAuthNuevo.uid, informacionDeDatosUsuario)

        return usuarioAuthNuevo.uid

    }
    
    static async actualizarNombreUsuarioPorUID ( uid, nombreUsuario ) {

        if ( !uid ) {
            throw new Error('Para actualizar el nombre de usuario se debe tener la uid primeramente.')
        }

        if ( !nombreUsuario ) {
            throw new Error('Para actualizar el nombre de usuario debe existir el nombre de usuario.')
        }

        if ( typeof nombreUsuario != 'string' ) {
            throw new Error('El nombre de usuario debe ser de tipo string.')
        }

        await admin.auth().updateUser(uid, {
            displayName: nombreUsuario,
        })

        await db.collection(COLECCION_USUARIO).doc(uid).update({
            nombreUsuario: nombreUsuario
        })

        return true
    }

    static async actualizarCorreoPorUID ( uid, correo ) {

        if ( !uid ) {
            throw new Error('Para actualizar el correo se debe tener la uid primeramente.')
        }

        if ( !correo ) {
            throw new Error('Para actualizar el correo debe existir el correo.')
        }

        if ( typeof correo != 'string' ) {
            throw new Error('El correo debe ser de tipo string.')
        }

        await admin.auth().updateUser(uid, {
            email: correo,
        })

        await db.collection(COLECCION_USUARIO).doc(uid).update({
            correo: correo
        })

        return true
    }

    static async actualizarNombreCompletoPorUID ( uid, nombreCompleto ) {

        if ( !uid ) {
            throw new Error('Para actualizar el nombre completo se debe tener la uid primeramente.')
        }

        if ( nombreCompleto && typeof nombreCompleto != 'string' ) {
            throw new Error('El nombre completo debe ser de tipo string.')
        }

        await db.collection(COLECCION_USUARIO).doc(uid).update({
            nombreCompleto: nombreCompleto ? nombreCompleto : ''
        })

        return true
    }

    static async actualizarFechaNaciminetoPorUID ( uid, fechaNacimiento ) {

        if ( !uid ) {
            throw new Error('Para actualizar la fecha de nacimiento se debe tener la uid primeramente.')
        }

        if ( fechaNacimiento && typeof fechaNacimiento != 'object' ) {
            throw new Error('La fecha de nacimiento debe ser de tipo object (Date).')
        }

        await db.collection(COLECCION_USUARIO).doc(uid).update({
            fechaNacimiento: fechaNacimiento ? admin.firestore.Timestamp.fromDate(fechaNacimiento) : null
        })

        return true

    }

    static async actualizarJekuaaPremiumPorUID ( uid, jekuaaPremium ) {

        if ( !uid ) {
            throw new Error('Para actualizar la fecha de nacimiento se debe tener la uid primeramente.')
        }

        if ( jekuaaPremium && typeof jekuaaPremium != 'object' ) {
            throw new Error('El jekuaa premium debe ser de tipo object.')
        }

        if ( jekuaaPremium && ( !jekuaaPremium.duracion || !jekuaaPremium.fechaCompra || !jekuaaPremium.plan ) ) {
            throw new Error('Para actualizar el jekuaaPremium de un usuario debe existir los datos premium.')
        }

        await db.collection(COLECCION_USUARIO).doc(uid).update({
            jekuaaPremium: jekuaaPremium ? jekuaaPremium : null
        })

        return true

    }

    static async actualizarRolPorUID ( uid, datosRol ) {

        if ( !uid ) {
            throw new Error('Para actualizar la fecha de nacimiento se debe tener la uid primeramente.')
        }

        if ( typeof datosRol != 'object' ) {
            throw new Error('Los datos rol debe contener la información necesaria.')
        }

        return true

    }

    static async actualizarJekuaaPointPorUID ( uid, jekuaaPoint ) {

        if ( !uid ) {
            throw new Error('Para actualizar la fecha de nacimiento se debe tener la uid primeramente.')
        }

        if ( jekuaaPoint && typeof jekuaaPoint != 'number' ) {
            throw new Error('El jekuaa point debe ser de tipo number.')
        }

        await db.collection(COLECCION_USUARIO).doc(uid).update({
            jekuaaPoint: jekuaaPoint ? jekuaaPoint : 0
        })

        return true

    }

    static verificadorDeFormato ( datosUsuario ) {
        const {
            uid,
            nombreUsuario,
            correo,
            nombreCompleto,
            fechaNacimiento,
            jekuaaPremium,
            jekuaaRoles,
            jekuaaPoint
        } = datosUsuario

        if ( uid && typeof uid != 'string' ) {
            throw new Error('La uid debe ser de tipo string.')
        }

        if ( nombreUsuario && typeof nombreUsuario != 'string' ) {
            throw new Error('El nombre de usuario debe ser de tipo string.')
        }

        if ( correo && typeof correo != 'string' ) {
            throw new Error('El correo debe ser de tipo string.')
        }

        if ( nombreCompleto && typeof nombreCompleto != 'string' ) {
            throw new Error('El nombre completo debe ser de tipo string.')
        }

        if ( fechaNacimiento && typeof fechaNacimiento != 'object' ) {
            throw new Error('La fecha de nacimiento debe ser de tipo object (Date).')
        }

        if ( jekuaaPremium ) {

            if ( typeof jekuaaPremium != 'object' ) {
                throw new Error('El jekuaaPremium debe ser de tipo object.')
            }

            const formatoJekuaaPremium = new JekuaaPremium({
                plan: jekuaaPremium.plan,
                fechaCompra: jekuaaPremium.fechaCompra,
                duracion: jekuaaPremium.duracion,
            })

            if( !formatoJekuaaPremium.formatoValido() ) { // ARREGLAR
                throw new Error('El jekuaaPremium es un objeto pero no tiene el formato valido.')
            }
        }

        if ( jekuaaRoles ) {

            if ( typeof jekuaaRoles != 'object' ) {
                throw new Error('El jekuaaRoles debe ser de tipo object.')
            }
            
            const formatoJekuaaRoles = new JekuaaRoles({
                rol: jekuaaRoles.rol,
                secciones: jekuaaRoles.secciones,
                instructor: jekuaaRoles.instructor
            })

            if ( !formatoJekuaaRoles.formatoValido() ) { // ARREGLAR
                throw new Error('El jekuaaRoles es un objeto pero no tiene el formato valido.')
            }

            if ( !formatoJekuaaRoles.cumpleCondiciones() ) { // ARREGLAR
                throw new Error('El jekuaaRoles es un objeto, tiene el formato valido pero no cumple las condiciones.')
            }
        }

        if ( jekuaaPoint && typeof jekuaaPoint != 'number' ) {
            throw new Error('El jekuaaPoint debe ser de tipo number.')
        }
    }
}

module.exports = Usuario