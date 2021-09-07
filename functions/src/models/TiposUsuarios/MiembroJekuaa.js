const admin = require('../../../firebase-service')
const db = require('../../../db')
const Usuario = require("../Usuario")
const Blog = require('../Blog')
const JekuaaPremium = require('../JekuaaPremium')
const JekuaaRoles = require('../JekuaaRoles')
const Instructor = require('./Instructor')

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
    crearUsuario ( datosUsuario ) {
        
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

    static async actalizarUsuarioPorUID ( uidUsuario, datosActualizados ) {

        const {
            nombreUsuario,
            correo,
            nombreCompleto,
            fechaNacimiento,
            jekuaaPremium,
            jekuaaRoles,
            jekuaaPoint
        } = datosActualizados

        if ( !Object.keys( datosActualizados ).length ) {
            throw new Error(`No hay datos para actualizar.`)
        }

        const docUsuario = await db.collection(COLECCION_USUARIO).doc(uidUsuario).get()

        if ( !docUsuario.exists ) {
            throw new Error(`No existe el usuario con la uid ${uidUsuario}.`)
        }

        const datosUsuario = docUsuario.data()

        const {
            datosUsuarioDBActualizar,
            datosUsuarioAuthActualizar,
            datosUsuarioAuthClaimsActualizar
        } = Usuario.construirDatosParaActualizar (datosActualizados, datosUsuario)

        Usuario.verificadorDeFormatoParaActualizar( datosUsuarioDBActualizar )

        await admin.auth().updateUser(uidUsuario, datosUsuarioAuthActualizar)
        await db.collection(COLECCION_USUARIO).doc(uidUsuario).update(datosUsuarioDBActualizar)
        await admin.auth().setCustomUserClaims(uidUsuario, datosUsuarioAuthClaimsActualizar)

        const usuario = new Usuario()
        await usuario.importarDatosUsuarioPorUID(uidUsuario)

        // Operar los datos de instructor en caso de cambio
        const cambioInstructor = jekuaaRoles ? jekuaaRoles.instructor != datosUsuario.jekuaaRoles.instructor : false
        if ( !cambioInstructor ) {
            return usuario 
        }

        const noExisteInstructor = !(await db.collection(COLECCION_INSTRUCTOR).doc(uidUsuario).get()).exists
        if ( jekuaaRoles.instructor && noExisteInstructor ) {
            // Agregar instructor

            Instructor.crearNuevoInstructor({
                uid: uidUsuario
            })
        }

        return usuario 
    }
}

module.exports = MiembroJekuaa