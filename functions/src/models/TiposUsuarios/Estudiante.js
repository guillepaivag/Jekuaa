const db = require("../../../db");
const Blog = require("../Blog");
const ErrorJekuaa = require("../Error/ErroresJekuaa");
const Usuario = require("../Usuario");

class Estudiante extends Usuario {
    
    constructor () {

    }

    static async darMeGustaBlog (uid, uidSolicitante, meGusta) {
        const blog = new Blog()
        await blog.importarDatosBlogPorUID(uid)
        const refBlogMG = db.collection('Usuarios').doc(uidSolicitante)
        .collection('BlogsMG').doc(uid)

        if (blog.getBlog().cantidadMeGusta === 0 && !meGusta) {
            // Retornar respuesta
            throw new ErrorJekuaa({
                codigo: 'jekuaa/error/usuario_mala_solicitud',
                mensaje: '¡No hay me gusta en este blog!',
            })
        }
        
        // Crear Me gusta del usuario
        if (meGusta) {
            refBlogMG.set({
                uid: uid,
                fechaMeGusta: milliseconds_a_timestamp( Date.now() )
            })
        } else {
            refBlogMG.delete()
        }

        const cantidadActual = blog.getBlog().cantidadMeGusta + (meGusta ? 1 : -1)

        // Aumentar el contador de MeGustas
        blog.actualizarBlog({
            cantidadMeGusta: cantidadActual
        })
    }
}

module.exports = Estudiante