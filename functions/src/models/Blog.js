const db = require('../../db')
const ErrorJekuaa = require('./Error/ErroresJekuaa')
const storage = require('../../GoogleStorage')
const showdown  = require('showdown')
const fs  = require('fs')
const configJekuaa = require('../../configJekuaa')

const COLECCION_BLOG = 'Blogs'

class Blog {

    constructor ( datosBlog = {} ) {
        const {
            uid, referencia, titulo, descripcion, publicador,
            seccion, categoria, subCategorias, cantidadMeGusta, habilitado,
            publicado, revision, fechaCreacion, fechaActualizacion
        } = datosBlog

        this.uid = uid ? uid : db.collection(COLECCION_BLOG).doc().id
        this.referencia = referencia ? referencia : ''
        this.titulo = titulo ? titulo : ''
        this.descripcion = descripcion ? descripcion : ''
        this.publicador = publicador ? publicador : ''
        this.seccion = seccion ? seccion : ''
        this.categoria = categoria ? categoria : ''
        this.subCategorias = subCategorias ? subCategorias : []
        this.cantidadMeGusta = cantidadMeGusta ? cantidadMeGusta : 0
        this.habilitado = habilitado ? habilitado : true
        this.publicado = publicado ? publicado : true
        this.revision = revision ? revision : true
        this.fechaCreacion = fechaCreacion ? fechaCreacion : null
        this.fechaActualizacion = fechaActualizacion ? fechaActualizacion : null
    }


    /* 
        GETTERS: Se obtienen los datos de los atributos
    */

    // Metodo
    
    getBlog () {
        return {
            uid: this.uid,                                  // Constante
            referencia: this.referencia,
            titulo: this.titulo,
            descripcion: this.descripcion,
            publicador: this.publicador,                    // Constante
            seccion: this.seccion,
            categoria: this.categoria,
            subCategorias: this.subCategorias,
            cantidadMeGusta: this.cantidadMeGusta,
            habilitado: this.habilitado,
            publicado: this.publicado,
            revision: this.revision,
            fechaCreacion: this.fechaCreacion,              // Constante
            fechaActualizacion: this.fechaActualizacion,
        }
    }

    /* 
        SETTERS: Se agregan los datos que se desee a los atributos
    */

    // Metodo

    setBLOG ( blog ) {
        this.setUID( ( blog && blog.uid ) ? blog.uid : null )
        this.setREFERENCIA( ( blog && blog.referencia ) ? blog.referencia : null )
        this.setTITULO( ( blog && blog.titulo ) ? blog.titulo : null )
        this.setDESCRIPCION( ( blog && blog.descripcion ) ? blog.descripcion : null )
        this.setPUBLICADOR( ( blog && blog.publicador ) ? blog.publicador : null )
        this.setSECCION( ( blog && blog.seccion ) ? blog.seccion : null )
        this.setCATEGORIA( ( blog && blog.categoria ) ? blog.categoria : null )
        this.setSUB_CATEGORIAS( ( blog && blog.subCategorias ) ? blog.subCategorias : null )
        this.setCANTIDAD_ME_GUSTA( ( blog && blog.cantidadMeGusta ) ? blog.cantidadMeGusta : null )
        this.setHABILITADO( ( blog && blog.habilitado ) ? blog.habilitado : null )
        this.setPUBLICADO( ( blog && blog.publicado ) ? blog.publicado : null )
        this.setREVISION( ( blog && blog.revision ) ? blog.revision : null )
        this.setFECHA_CREACION( ( blog && blog.fechaCreacion ) ? blog.fechaCreacion : null )
        this.setFECHA_ACTUALIZACION( ( blog && blog.fechaActualizacion ) ? blog.fechaActualizacion : null )
    }

    setUID ( uid = db.collection(COLECCION_BLOG).doc().id ) {
        this.uid = uid
    }

    setREFERENCIA ( referencia = '' ) {
        this.referencia = referencia
    }

    setTITULO ( titulo = '' ) {
        this.titulo = titulo
    }

    setDESCRIPCION ( descripcion = '' ) {
        this.descripcion = descripcion
    }

    setPUBLICADOR ( publicador = '' ) {
        this.publicador = publicador
    }

    setSECCION ( seccion = '' ) {
        this.seccion = seccion
    }

    setCATEGORIA ( categoria = '' ) {
        this.categoria = categoria
    }

    setSUB_CATEGORIAS ( subCategorias = [] ) {
        this.subCategorias = subCategorias
    }

    setCANTIDAD_ME_GUSTA ( cantidadMeGusta = 0 ) {
        this.cantidadMeGusta = cantidadMeGusta
    }

    setHABILITADO ( habilitado = true ) {
        this.habilitado = habilitado
    }

    setPUBLICADO ( publicado = true ) {
        this.publicado = publicado
    }

    setREVISION ( revision = true ) {
        this.revision = revision
    }

    setFECHA_CREACION ( fechaCreacion = null ) {
        this.fechaCreacion = fechaCreacion
    }

    setFECHA_ACTUALIZACION ( fechaActualizacion = null ) {
        this.fechaActualizacion = fechaActualizacion
    }

    
    /* 
        ACCIONES: Se trabajara con la base de datos
    */

        /* 
            ###############################
                 METODOS NO ESTATICOS
            ###############################
        */

    // Metodo
    async importarDatosBlogPorUID ( uid ) {
        const documentBlog = await db.collection(COLECCION_BLOG).doc(uid).get()

        if (!documentBlog.exists) {
            throw new ErrorJekuaa({
                codigo: 'jekuaa/error/usuario_mala_solicitud',
                mensaje: `El blog con la uid ${uid} no existe.`
            })
        }

        const blog = documentBlog.data()

        this.setBLOG( blog )

        return this
    }

    async importarDatosBlogPorReferencia ( referencia ) {
        const documentsBlog = await db.collection(COLECCION_BLOG).where('referencia', '==', referencia).get()

        if (documentsBlog.empty) {
            throw new ErrorJekuaa({
                codigo: 'jekuaa/error/usuario_mala_solicitud',
                mensaje: `El blog con la referencia ${referencia} no existe.`
            })
        }

        const doc = documentsBlog.docs[0]

        const blog = doc.data()

        this.setBLOG( blog )

        return this
    }

    async crearBlog () {
        const blog = this.getBlog()
        await db.collection(COLECCION_BLOG).doc(this.uid).set(blog)

        return this
    }

    async actualizarBlog ( blog ) {
        await db.collection(COLECCION_BLOG).doc(this.uid).update( blog )

        return this
    }

    async eliminarBlog () {
        // Eliminar blog
        await db.collection(COLECCION_BLOG).doc(this.uid).delete()

        return this
    }

    formatearDatos ( ) {
        this.uid = this.uid ? this.uid.trim() : ''
        this.referencia = this.referencia ? this.referencia.trim() : ''
        this.titulo = this.titulo ? this.titulo.trim() : ''
        this.descripcion = this.descripcion ? this.descripcion.trim() : ''
        this.publicador = this.publicador ? this.publicador.trim() : ''
        this.seccion = this.seccion ? this.seccion.trim() : ''
        this.categoria = this.categoria ? this.categoria.trim() : ''
        for (let i = 0; i < this.subCategorias.length; i++) {
            this.subCategorias[i] = this.subCategorias[i].trim()
        }

        return this
    }


        /* 
            ###############################
                   METODOS ESTATICOS
            ###############################
        */

    
    static async crearNuevoBlog ( datosBlog ) {
        const blog = new Blog(datosBlog)

        return await blog.crearBlog()
    }

    static async actualizarBlog ( uid, datosBlog ) {
        const blog = new Blog()
        blog.setUID(uid)
        await blog.actualizarBlog(datosBlog)

        return datosBlog
    }

    static async eliminarBlog ( uid ) {
        const result = await db.collection(COLECCION_BLOG).doc(uid).delete()
        return result
    }

    static async obtenerContenido ( uid, extensionArchivo ) {
        const bucket = storage.bucket('jekuaa-blogs')

        const rutaModo = configJekuaa.environment.mode === 'production' ? 'prod' : 'dev'
        const file = bucket.file(`${rutaModo}/${uid}.md`)

        const archivo = file.createReadStream()
        return await new Promise((resolve, reject) => {
            let contenido = ''
            archivo
            .on('data', contenidoObtenido => {
                // Obtener el contenido del archivo
                contenido += contenidoObtenido
            })
            .on('end', () => {
                // Formatear de acuerdo a lo que se pide
                // Formato por defecto: Markdown (md)
                if ( extensionArchivo === 'html' ) {
                    const converter = new showdown.Converter()
                    contenido = converter.makeHtml(contenido)
                }
                
                resolve(contenido)
            })
            .on('error', err => {
                reject(err)
            })
        })

    }

    static async subirArchivoBlogAStorage ( rutaArchivo, uid ) {
        const bucket = storage.bucket('jekuaa-blogs')

        const rutaModo = configJekuaa.environment.mode === 'production' ? 'prod' : 'dev'
        const response = await bucket.upload(rutaArchivo, {
            destination: `${rutaModo}/${uid}.md`,
            uploadType: 'media',
            metadata: {
                metadata: {
                    contentType: '.md'
                }
            }
        })

        return response
    }

    static async eliminarArchivoBlog ( nombreArchivo ) {
        const bucket = storage.bucket('jekuaa-blogs')
        const rutaModo = configJekuaa.environment.mode === 'production' ? 'prod' : 'dev'
        const file = bucket.file(`${rutaModo}/${nombreArchivo}.md`)

        const existe = (await file.exists())[0]

        const resultado = existe ? await file.delete() : null
        
        return resultado
    }

    static async existeDocumentoBlog ( identificadores = {} ) {
        const {
            uid, referencia,
        } = identificadores

        if (uid) {
            const doc = await db.collection(COLECCION_BLOG).doc(uid).get()
            return doc.exists
        } else if (referencia) {
            const blogsDocs = await db.collection(COLECCION_BLOG).where('referencia', '==', referencia).get()
            return !blogsDocs.empty
        } else {
            throw new ErrorJekuaa({
                codigo: 'jekuaa/error/usuario_mala_solicitud',
                mensaje: `Seleccionar un identificador para el blog.`
            })
        }
    }

    static async existeArchivoBlog ( uid ) {       
        const bucket = storage.bucket('jekuaa-blogs')
        
        const rutaModo = configJekuaa.environment.mode === 'production' ? 'prod' : 'dev'
        const file = bucket.file(`${rutaModo}/${uid}.md`)

        const existe = (await file.exists())[0]

        return existe
    }
}

module.exports = Blog