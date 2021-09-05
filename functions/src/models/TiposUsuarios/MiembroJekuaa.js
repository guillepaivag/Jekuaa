const admin = require('../../../firebase-service')
const db = require('../../../db')
const Usuario = require("../Usuario")
const Blog = require('../Blog')
const JekuaaPremium = require('../JekuaaPremium')
const JekuaaRoles = require('../JekuaaRoles')

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

            const docUsuario = await db.collection(COLECCION_USUARIO).doc(uidUsuario).get()

            if ( !docUsuario.exists ) {
                throw new Error(`No existe el usuario con la uid ${uidUsuario}.`)
            }

            Usuario.verificadorDeFormato( datosActualizados )

            const datosUsuario = docUsuario.data()

            const datosUsuarioDBActualizar = {}
            const datosUsuarioAuthActualizar = {}

            const cambioNombreUsuario = nombreUsuario != datosUsuario.nombreUsuario
            if ( nombreUsuario && cambioNombreUsuario ) {
                datosUsuarioDBActualizar.nombreUsuario = nombreUsuario
                datosUsuarioAuthActualizar.displayName = nombreUsuario
            }

            const cambioCorreo = correo != datosUsuario.correo
            if ( correo && cambioCorreo ) {
                datosUsuarioDBActualizar.correo = correo
                datosUsuarioAuthActualizar.email = correo
            }

            const cambioNombreCompleto = nombreCompleto != datosUsuario.nombreCompleto
            if ( nombreCompleto && cambioNombreCompleto ) {
                datosUsuarioDBActualizar.nombreCompleto = nombreCompleto
            }

            const cambioFechaNacimiento = fechaNacimiento.getTime() != new Date(datosUsuario.fechaNacimiento.seconds * 1000).getTime()
            if ( fechaNacimiento && cambioFechaNacimiento ) {
                datosUsuarioDBActualizar.fechaNacimiento = admin.firestore.Timestamp.fromDate(fechaNacimiento)
            }

            const cambioPlan = jekuaaPremium.plan != datosUsuario.jekuaaPremium.plan
            const cambioFechaCompra = jekuaaPremium.fechaCompra.getTime() != new Date(datosUsuario.jekuaaPremium.fechaCompra.seconds * 1000).getTime()
            const cambioDuracion = jekuaaPremium.duracion != datosUsuario.jekuaaPremium.duracion
            const cambioJekuaaPremium = cambioPlan || cambioFechaCompra || cambioDuracion
            if ( jekuaaPremium && cambioJekuaaPremium ) {
                datosUsuarioDBActualizar.jekuaaPremium = JSON.parse( JSON.stringify( jekuaaPremium ) )
                datosUsuarioDBActualizar.jekuaaPremium.fechaCompra = admin.firestore.Timestamp.fromDate( jekuaaPremium.fechaCompra )
            }
            
            const cambioRol = jekuaaRoles.rol != datosUsuario.jekuaaRoles.rol
            const cambioSecciones = jekuaaPremium.secciones != datosUsuario.jekuaaPremium.secciones // ARREGLAR
            const cambioInstructor = jekuaaPremium.instructor != datosUsuario.jekuaaPremium.instructor
            const cambioJekuaaRoles = cambioRol || cambioSecciones || cambioInstructor
            if ( jekuaaRoles && cambioJekuaaRoles ) {
                datosUsuarioDBActualizar.jekuaaRoles = JSON.parse( JSON.stringify( jekuaaRoles ) )
            }

            const cambioJekuaaPoint = jekuaaPoint != datosUsuario.jekuaaPoint
            if ( jekuaaPoint && cambioJekuaaPoint ) {
                datosUsuarioDBActualizar.jekuaaPoint = jekuaaPoint
            }

            await admin.auth().updateUser(uidUsuario, datosUsuarioAuthActualizar)
            await db.collection(COLECCION_USUARIO).doc(uidUsuario).update(datosUsuarioDBActualizar)

            // Operar los datos de instructor en caso de cambio
            if ( !cambioInstructor ) {
                return 
            }

            const noExisteInstructor = !(await db.collection(COLECCION_INSTRUCTOR).doc(uidUsuario).get()).exists
            if (jekuaaPremium.instructor && noExisteInstructor) {
                // Agregar instructor
                // ARREGLAR
            }

            const usuario = new Usuario()
            await usuario.importarDatosUsuarioPorUID(uid)

            return usuario
        }
}

module.exports = MiembroJekuaa