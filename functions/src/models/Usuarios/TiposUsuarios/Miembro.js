const fs = require('fs')

const admin = require('../../../../firebase-service')
const db = require('../../../../db')

const Blog = require("../../Blogs/Blog")

const COLECCION_MIEMBRO = 'Miembros'

class Miembro {
    constructor(datos = {}) {
        const {
            uid, 
            funciones,
            cantidadBlogs, 
            cantidadCursos, 
            cantidadEstudiantes,
            fechaComienzo, 
        } = datos

        this.uid = uid ? uid : ''
        this.funciones = funciones ? funciones : []
        this.cantidadBlogs = cantidadBlogs ? cantidadBlogs : 0
        this.cantidadCursos = cantidadCursos ? cantidadCursos : 0
        this.cantidadEstudiantes = cantidadEstudiantes ? cantidadEstudiantes : 0
        this.fechaComienzo = fechaComienzo ? fechaComienzo : admin.firestore.Timestamp.fromDate( new Date() )
    }


    getMiembro () {
        return { 
            uid: this.uid, 
            funciones: this.funciones, 
            cantidadBlogs: this.cantidadBlogs, 
            cantidadCursos: this.cantidadCursos, 
            cantidadEstudiantes: this.cantidadEstudiantes, 
            fechaComienzo: this.fechaComienzo,
        }
    }


    setDatosMiembro ( datos = {} ) {
        const { 
            uid, 
            funciones,
            cantidadBlogs, 
            cantidadCursos, 
            cantidadEstudiantes,
            fechaComienzo, 
        } = datos

        this.setUID(uid)
        this.setFunciones(funciones)
        this.setCantidadCursos(cantidadBlogs)
        this.setCantidadEstudiantes(cantidadCursos)
        this.setCantidadBlogs(cantidadEstudiantes)
        this.setFechaComienzo(fechaComienzo)

        return this
    }

    setUID ( uid = '' ) {
        this.uid = uid
        return this
    }

    setFunciones ( funciones = [] ) {
        this.funciones = funciones
        return this
    }

    setCantidadCursos ( cantidadCursos = 0 ) {
        this.cantidadCursos = cantidadCursos
        return this
    }

    setCantidadEstudiantes ( cantidadEstudiantes = 0 ) {
        this.cantidadEstudiantes = cantidadEstudiantes
        return this
    }

    setCantidadBlogs ( cantidadBlogs = 0 ) {
        this.cantidadBlogs = cantidadBlogs
        return this
    }

    setFechaComienzo ( fechaComienzo = admin.firestore.Timestamp.fromDate( new Date() ) ) {
        this.fechaComienzo = fechaComienzo
        return this
    }

    async importarDatosMiembro ( uid = '' ) {
        const documento = await db.collection(COLECCION_MIEMBRO).doc(uid).get()

        if ( !documento.exists ) return null

        const datosMiembro = documento.data()

        this.setDatosMiembro( datosMiembro )

        return this
    }


    /* 
     *    ################################
     *           METODOS ESTATICOS
     *    ################################
    */

    static async crearMiembro ( miembro = new Miembro() ) {
        await db
        .collection(COLECCION_MIEMBRO)
        .doc(miembro.uid)
        .set(miembro.getMiembro())

        return true
    }

    static async actualizarMiembro ( uid = '', datosActualizados = {} ) {
        await db.collection(COLECCION_MIEMBRO).doc(uid).update(datosActualizados)

        return true
    }

    static async eliminarMiembro ( uid = '' ) {
        await db.collection(COLECCION_MIEMBRO).doc(uid).delete()

        return true
    }



    // ARREGLAR
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