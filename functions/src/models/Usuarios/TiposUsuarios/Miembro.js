const fs = require('fs')

const Blog = require("../../Blogs/Blog")
const Estudiante = require("./Estudiante")

class Miembro extends Estudiante {
    constructor(datos) {
        const {} = datos
    }


    static async crearBlog (datosBlog, rutaArchivoTemp) {
        // Agregar a Firestore
        const blog = new Blog(datosBlog)
        const blogRespuesta = await Blog.crearNuevoBlog( blog )

        // Agregar archivo blog (contenido)
        await Blog.subirArchivoBlogAStorage( rutaArchivoTemp, blog.uid )

        // Borrar el archivo creado en el servidor
        fs.unlink(rutaArchivoTemp, (err => {
            if ( err ) {
                console.log('Error al eliminar el archivo temporal: ', err)
                return
            }
        }))

        return blogRespuesta
    }

    static async actualizarBlog (uid, datosBlog, rutaArchivoTemp) {
        // Actualizar a Firestore
        let blogRespuesta
        if (datosBlog && Object.keys(datosBlog).length) {
            blogRespuesta = await Blog.actualizarBlog( uid, datosBlog )
        }

        // Actualizar archivo blog (contenido)
        let archivoCreado
        if (rutaArchivoTemp) {
            archivoCreado = await Blog.subirArchivoBlogAStorage( rutaArchivoTemp, uid )

            // Borrar el archivo creado en el servidor
            fs.unlink(rutaArchivoTemp, (err => {
                if ( err ) {
                    console.log('Error al eliminar el archivo temporal: ', err)
                    return
                }
            }))
        }

        const data = {}
        blogRespuesta ? data.blogRespuesta = blogRespuesta : ''
        archivoCreado ? data.archivoCreado = archivoCreado : ''

        return data
    }

    static async eliminarBlog (uid) {
        // Eliminar los datos del blog en Firestore
        const datosBlogEliminado = await Blog.eliminarBlog( uid )

        // Eliminar el archivo del blog en Storage
        await Blog.eliminarArchivoBlog( uid )

        return datosBlogEliminado
    }
}

module.exports = Miembro