const admin = require('../../../firebase-service')
const db = require('../../../db')
const JekuaaPremium = require('../JekuaaPremium')
const ErrorJekuaa = require('../Error/ErroresJekuaa')
const utilsUsuario = require('../../utils/usuario')

const configJekuaa = require('../../../configJekuaa')
const InformacionUsuario = require('./InformacionUsuario')

const COLECCION_USUARIO = 'Usuarios'

class Usuario {

    constructor ( datosUsuario = {} ) {
        const { 
            uid, nombreUsuario, correo, 
            nombreCompleto, fechaNacimiento,
            jekuaaPremium, jekuaaRol, instructor, jekuaaPoint
        } = datosUsuario

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

    async crearUsuarioDB () {
        // Crear los datos en firestore para el nuevo usuario
        db.collection(COLECCION_USUARIO).doc(this.uid).set(this.getDatosUsuario())

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
    static async actalizarDatosUsuarioPorUID ( uidUsuario = '', datosActualizados = null ) {
        // Actualizar los datos de firestore del usuario
        if (datosActualizados) db.collection(COLECCION_USUARIO).doc(uidUsuario).update(datosActualizados)
        return !!datosActualizados 
    }

    static async eliminarUsuarioPorUID ( uidUsuario ) {
        return await db.collection(COLECCION_USUARIO).doc(uidUsuario).delete()
    }
}

module.exports = Usuario