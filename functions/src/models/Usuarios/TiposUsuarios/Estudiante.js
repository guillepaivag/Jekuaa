const db = require("../../../../db");
const { milliseconds_a_timestamp } = require('../../../utils/timestamp')
const Blog = require("../../Blogs/Blog");
const Errores = require("../../Error/Errores");
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
            throw new Errores({
                codigo: 'error/usuario_mala_solicitud',
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
    }
}

module.exports = Estudiante