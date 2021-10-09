const admin = require('../../../firebase-service')
const db = require('../../../db')
const Usuario = require("../Usuario")
const Blog = require('../Blog')
const Instructor = require('./Instructor')
const ErrorJekuaa = require('../Error/ErroresJekuaa')
const { 
    verificadorDeFormatoProduccion,
    construirDatosParaActualizarYVerificarFormatoParaDB,
    construirDatosParaActualizarUsuario
} = require('../../utils/Usuario')


const COLECCION_USUARIO = 'Usuarios'
const COLECCION_INSTRUCTOR = 'Instructores'

class MiembroJekuaa extends Usuario {

    constructor ( datos ) {
        const {
            datosUsuario
        } = datos

        super( datosUsuario )
    }
    


    /* 
        GETTERS: Se obtienen los datos de los atributos
    */







    /* 
        SETTERS: Se agregan los datos que se desee a los atributos
    */

    




    /* 
        ACCIONES: Se trabajara con la base de datos
    */


        /* 
            ###############################
                 METODOS NO ESTATICOS
            ###############################
        */

    // CRUD BLOG
    async crearBlog ( datosBlog ) {
        const blog = new Blog (datosBlog)

        await blog.crearBlog()

        return blog
    }

    async verBlog ( uidBlog ) {
        const blog = new Blog ()

        await blog.importarDatosBlogPorUID( uidBlog )

        return blog
    }

    async editarBlog ( uidBlog, datosBlog ) {
        const blog = new Blog ()

        blog.setBLOG( datosBlog )
        blog.setUID( uidBlog )
        await blog.actualizarBlog()

        return blog
    }

    async habilitarBlog ( uidBlog, habilitado ) {
        const blog = new Blog ()

        await blog.importarDatosBlogPorUID( uidBlog )
        blog.setHABILITADO(habilitado)
        await blog.habilitarBlog()

        return blog
    }

    async eliminarBlog ( uidBlog ) {
        const blog = new Blog ()

        await blog.importarDatosBlogPorUID( uidBlog )
        await blog.eliminarBlog()

        return blog
    }

    // CRUD USUARIO
    crearUsuario ( datosUsuario, contrasenha ) {
        
    }

    verUsuario ( uidUsuario ) {

    }

    editarUsuario ( uidUsuario, datosUsuario ) {

    }

    habilitarUsuario ( uidUsuario, habilitado ) {
        
    }

    eliminarUsuario ( uidUsuario ) {

    }

        /* 
            ###############################
                   METODOS ESTATICOS
            ###############################
        */

    // Usuarios
    static async crearNuevoUsuario ( datosUsuario, contrasenha ) {
        const {
            nombreUsuario,
            correo,
            nombreCompleto,
            fechaNacimiento,
            jekuaaPremium,
            jekuaaRoles,
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
            jekuaaRol: jekuaaRoles.rol,
            jekuaaPremium: jekuaaPremium.plan
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
            jekuaaRoles,
            jekuaaPoint
        } = datosActualizados

        const datosAuth = await admin.auth().getUser(uidUsuario)
        
        const datosAuthActualizados = Usuario.construirDatosAutentication (datosActualizados, datosAuth)
        const datosAuthClaimsActualizados = Usuario.construirDatosReclamosAutenticacion (datosActualizados, datosAuth.customClaims)

        // Actualizar la autenticacion del usuario
        Object.keys(datosAuthActualizados).length ? 
        await admin.auth().updateUser(uidUsuario, datosAuthActualizados) : ''

        // Actualizar los reclamos de autenticacion del usuario
        Object.keys(datosAuthClaimsActualizados).length ? 
        await admin.auth().setCustomUserClaims(uidUsuario, datosAuthClaimsActualizados) : ''

        // Actualizar los datos de firestore del usuario
        Object.keys(datosActualizados).length ? 
        await db.collection(COLECCION_USUARIO).doc(uidUsuario).update(datosActualizados) : ''

        const usuario = new Usuario()

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

    static async verDatosUsuarioPorUID ( uidUsuario ) {
        const usuario = new Usuario()
        await usuario.importarDatosUsuarioPorUID( uidUsuario )

        return usuario.getUsuario()
    }

    static async verDatosAuthPorUID ( uidUsuario ) {
        const datosAuth = await Usuario.obtenerDatosDeAuthenticationPorUID( uidUsuario )

        return datosAuth
    }

    static async habilitarUsuarioPorUID ( uidUsuario, habilitar ) {

        let resultado = await admin.auth().updateUser(uidUsuario, {
            disabled: !habilitar,
        })

        return resultado
    }

    static async eliminarUsuarioPorUID ( uidUsuario ) {

        let authEliminado = await admin.auth().deleteUser( uidUsuario )
        let firestoreEliminado = await admin.firestore().collection(COLECCION_USUARIO)
                                .doc(uidUsuario).delete()

        return {
            authEliminado,
            firestoreEliminado
        }
    }

}

module.exports = MiembroJekuaa