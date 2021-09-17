const admin = require('../../../firebase-service')
const db = require('../../../db')
const Usuario = require("../Usuario")
const Blog = require('../Blog')
const JekuaaPremium = require('../JekuaaPremium')
const JekuaaRoles = require('../JekuaaRoles')
const Instructor = require('./Instructor')
const formatos = require('../../utils/Timestamp')
const { verificadorDeFormatoParaDB, construirDatosParaActualizar } = require('../../utils/Usuario')
const ErrorJekuaa = require('../Error/ErroresJekuaa')

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

        if ( !Object.keys( datosUsuario ).length ) {
            throw new ErrorJekuaa({
                codigo: 'jekuaa/error/usuario_mala_solicitud',
                mensaje: 'No hay datos para crear un usuario.'
            })
        }

        if ( !nombreUsuario ) {
            throw new ErrorJekuaa({
                codigo: 'jekuaa/error/usuario_mala_solicitud',
                mensaje: 'No existe el nombre de usuario para crear un usuario.'
            })
        }

        if ( !contrasenha ) {
            throw new ErrorJekuaa({
                codigo: 'jekuaa/error/usuario_mala_solicitud',
                mensaje: 'No existe una contraseña para crear un usuario.'
            })
        }

        await Usuario.errorExisteUsuario({
            nombreUsuario
        })

        const usuarioNuevoJekuaa = new Usuario().setUsuario( datosUsuario ).getUsuarioJSON()

        verificadorDeFormatoParaDB( usuarioNuevoJekuaa )

        const usuarioAuthNuevo = await admin.auth().createUser({
            email: usuarioNuevoJekuaa.correo,
            password: contrasenha,
            displayName: usuarioNuevoJekuaa.nombreUsuario,
        })

        await admin.auth().setCustomUserClaims(usuarioAuthNuevo.uid, {
            rol: usuarioNuevoJekuaa.jekuaaRoles.rol,
            jekuaaPremium: !!usuarioNuevoJekuaa.jekuaaPremium.plan
        })

        await admin.firestore().collection(COLECCION_USUARIO).doc(usuarioAuthNuevo.uid).set({
            ...usuarioNuevoJekuaa,
            uid: usuarioAuthNuevo.uid
        })

        if ( usuarioNuevoJekuaa.jekuaaRoles.instructor ) {
            // Agregar instructor
            Instructor.crearNuevoInstructor({
                uid: usuarioAuthNuevo.uid
            })
        }

        const usuario = new Usuario({
            ...usuarioNuevoJekuaa,
            uid: usuarioAuthNuevo.uid
        })

        return usuario
    }

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
            throw new ErrorJekuaa({
                codigo: 'jekuaa/error/usuario_mala_solicitud',
                mensaje: 'No hay datos para actualizar un usuario.'
            })
        }

        const docUsuario = await db.collection(COLECCION_USUARIO).doc(uidUsuario).get()

        if ( !docUsuario.exists ) {
            throw new ErrorJekuaa({
                codigo: 'jekuaa/error/usuario_no_existe',
                mensaje: `No existe el usuario con la uid ${uidUsuario}.`
            })
        }

        const datosUsuario = docUsuario.data()

        const {
            datosUsuarioDBActualizar,
            datosUsuarioAuthActualizar,
            datosUsuarioAuthClaimsActualizar
        } = construirDatosParaActualizarYVerificarFormatoParaDB (datosActualizados, datosUsuario)

        Object.keys(datosUsuarioAuthActualizar).length > 0 ? 
        await admin.auth().updateUser(uidUsuario, datosUsuarioAuthActualizar) : ''

        Object.keys(datosUsuarioAuthClaimsActualizar).length > 0 ? 
        await admin.auth().setCustomUserClaims(uidUsuario, datosUsuarioAuthClaimsActualizar) : ''

        Object.keys(datosUsuarioDBActualizar).length > 0 ? 
        await db.collection(COLECCION_USUARIO).doc(uidUsuario).update(datosUsuarioDBActualizar) : ''

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

        

    }
}

module.exports = MiembroJekuaa