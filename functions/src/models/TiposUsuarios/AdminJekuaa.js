const admin = require('../../../firebase-service')
const db = require('../../../db')
const Blog = require('../Blog')
const Instructor = require('./Instructor')
const ErrorJekuaa = require('../Error/ErroresJekuaa')
const MiembroJekuaa = require('./MiembroJekuaa')

const COLECCION_USUARIO = 'Usuarios'
const COLECCION_INSTRUCTOR = 'Instructores'

class AdminJekuaa extends MiembroJekuaa {

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

}

module.exports = AdminJekuaa