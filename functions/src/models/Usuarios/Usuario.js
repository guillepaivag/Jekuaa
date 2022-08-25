const admin = require('../../../firebase-service')
const db = require('../../../db')

const COLECCION_USUARIO = 'Usuarios'

class Usuario {

    constructor ( datosUsuario = {} ) {
        const { 
            uid, nombreUsuario, correo, 
            fechaNacimiento, plan, rol, point,
            eliminado, datosAuth,
        } = datosUsuario

        this.uid = uid ? uid : ''
        this.nombreUsuario = nombreUsuario ? nombreUsuario : ''
        this.correo = correo ? correo : ''
        this.fechaNacimiento = fechaNacimiento ? fechaNacimiento : null
        this.plan = plan ? plan : 'gratis'
        this.rol = rol ? rol : 'estudiante'
        this.point = point ? point : 0
        this.eliminado = eliminado !== undefined ? eliminado : false
        this.datosAuth = datosAuth ? datosAuth : null
        
    }
    



    /* 
        GETTERS: Se obtienen los datos de los atributos
    */

    getUsuario () {
        return {
            uid: this.uid,
            nombreUsuario: this.nombreUsuario,
            correo: this.correo, 
            fechaNacimiento: this.fechaNacimiento,
            plan: this.plan,
            rol: this.rol,
            point: this.point,
            eliminado: this.eliminado,
            datosAuth: this.datosAuth,
        }
    }



    /* 
        SETTERS: Se agregan los datos que se desee a los atributos
    */

    setUsuario ( datosUsuario = {} ) {
        const { 
            uid, nombreUsuario, correo, 
            fechaNacimiento, plan, rol, point,
            eliminado, datosAuth,
        } = datosUsuario

        this.setUID(uid)
        this.setNombreUsuario(nombreUsuario)
        this.setCorreo(correo)
        this.setFechaNacimiento(fechaNacimiento)
        this.setPlan(plan)
        this.setRol(rol)
        this.setPoints(point)
        this.setEliminado(eliminado)
        this.setDatosAuth(datosAuth)

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
    
    setFechaNacimiento ( fechaNacimiento = null ) {
        this.fechaNacimiento = fechaNacimiento
        return this
    }

    setPlan ( plan = 'gratis' ) {
        this.plan = plan
        return this
    }

    setRol ( rol = 'estudiante' ) {
        this.rol = rol
        return this
    }

    setPoints ( point = 0 ) {
        this.point = point
        return this
    }

    setEliminado ( eliminado ) {
        this.eliminado = eliminado !== undefined ? eliminado : false
        return this
    }
    
    setDatosAuth ( datosAuth = null ) {
        this.datosAuth = datosAuth
        return this
    }


    /* 
        ACCIONES: Se trabajara con la base de datos
    */

    /* 
     *    ################################
     *           METODOS NO ESTATICOS
     *    ################################
    */

    async importarDatosUsuarioPorUID ( uid = '' ) {
        const documentoUsuario = await db.collection(COLECCION_USUARIO).doc(uid).get()

        if ( !documentoUsuario.exists ) return null

        const datosUsuario = documentoUsuario.data()

        this.setUsuario( datosUsuario )

        return this
    }
    
    /* 
     *    ################################
     *           METODOS ESTATICOS
     *    ################################
    */


    /* 
        DESCRIPCION: Se crea un usuario a partir de los datos personales 
        y datos de registro como el correo, contraseña y un dato obligatorio para
        el registro como el nombre de usuario.
    */

    static async crearUsuario ( usuario = new Usuario() ) {
        // Crear los datos en firestore para el nuevo usuario
        await db.collection(COLECCION_USUARIO).doc(usuario.uid).set(usuario.getUsuario())

        return true
    }

    static async obtenerUsuarioPorUID ( uid = '' ) {
        const usuario = new Usuario()
        return await usuario.importarDatosUsuarioPorUID(uid)
    }

    static async actalizarUsuarioPorUID ( uidUsuario = '', datosActualizados = null ) {
        // Actualizar los datos de firestore del usuario
        if (datosActualizados) await db.collection(COLECCION_USUARIO).doc(uidUsuario).update(datosActualizados)
        return !!datosActualizados 
    }

    static async eliminarUsuarioPorUID ( uidUsuario = '' ) {
        return await db.collection(COLECCION_USUARIO).doc(uidUsuario).delete()
    }
}

module.exports = Usuario