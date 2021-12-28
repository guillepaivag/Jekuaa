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

    async obtenerContenido ( opciones ) {
        let rutaCloudStorage = configJekuaa.environment.mode === 'production' ? 'blogs/prod' : 'blogs/dev'

        const bucket = storage.bucket('jekuaa-blogs')

        const file = bucket.file(`${rutaCloudStorage}/${this.uid}.md`)

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
                if ( opciones.extensionArchivo === 'html' ) {
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

    static async existeArchivoBlog ( rutaArchivo ) {
        const bucket = storage.bucket('jekuaa-blogs')
        const file = bucket.file(rutaArchivo)

        const existe = (await file.exists())[0]

        return existe
    }

    static async subirArchivoBlogAStorage ( rutaArchivo, uid, mantenerArchivo ) {
        const bucket = storage.bucket('jekuaa-blogs')

        const rutaModo = configJekuaa.environment.mode === 'production' ? 'prod' : 'dev'
        const response = await bucket.upload(rutaArchivo, {
            destination: `blogs/${rutaModo}/${uid}.md`,
            uploadType: 'media',
            metadata: {
                metadata: {
                    contentType: '.md'
                }
            }
        })

        if (!mantenerArchivo) {
            // Borrar el archivo creado en el servidor
            fs.unlink(rutaArchivo, (err => {
                if ( err ) {
                    console.log('Error al eliminar el archivo temporal: ', err)
                    return
                }
            }))
        }

        return response
    }

    static async eliminarArchivoBlog ( nombreArchivo ) {
        const bucket = storage.bucket('jekuaa-blogs')
        const modo = configJekuaa.environment.mode === 'production' ? 'prod' : 'dev'
        const file = bucket.file(`blogs/${modo}/${nombreArchivo}.md`)

        const existe = (await file.exists())[0]

        const resultado = existe ? await file.delete() : null
        
        return resultado
    }

    static async errorBlogPorUID ( uid, operacion ) {
        const doc = await db.collection(COLECCION_BLOG).doc(uid).get()
        const existe = doc.exists

        if ( operacion === 'existe' && existe ) {
            throw new ErrorJekuaa({
                codigo: 'jekuaa/error/usuario_mala_solicitud',
                mensaje: `Existe el blog.`
            })

        } else if ( operacion === 'no-existe' && !existe ) {
            throw new ErrorJekuaa({
                codigo: 'jekuaa/error/usuario_mala_solicitud',
                mensaje: `No existe el blog.`
            })
        }

        return doc
    }

    static async errorBlogPorReferencia ( referencia, operacion ) {
        const blogsDocs = await db.collection(COLECCION_BLOG).where('referencia', '==', referencia).get()

        if ( operacion === 'existe' && !blogsDocs.empty ) {
            throw new ErrorJekuaa({
                codigo: 'jekuaa/error/usuario_mala_solicitud',
                mensaje: `Existe el blog.`
            })

        } else if ( operacion === 'no-existe' && blogsDocs.empty ) {
            throw new ErrorJekuaa({
                codigo: 'jekuaa/error/usuario_mala_solicitud',
                mensaje: `No existe el blog.`
            })
        }

    }

    static async inicializarListaBlogs (opciones) {
        let { maximoPorPagina, filtros, esRutaMiembroJekuaa, } = opciones
        
        !maximoPorPagina ? maximoPorPagina = 5 : ''
        
        let blogs = []

        let ref = db.collection('Blogs')

        if (!esRutaMiembroJekuaa) 
            ref = ref.where('habilitado', '==', true).where('publicado', '==', true)
        
        ref = Blog.filtrar( ref, filtros )
        ref = ref.orderBy('uid').limit( maximoPorPagina )
        const documentSnapshots = await ref.get()
        
        if (!documentSnapshots.docs.length) {
            throw new ErrorJekuaa({
                codigo: 'jekuaa/error/usuario_mala_solicitud',
                mensaje: `¡Todavía no tienes blogs publicados!`
            })
        }

        let ultimoDocumento = documentSnapshots.docs[documentSnapshots.docs.length-1]
        let ultimaUID = ultimoDocumento.id
        for (let i = 0; i < documentSnapshots.docs.length; i++) {
            const element = documentSnapshots.docs[i]
            blogs.push( element.data() )
        }
        
        const existeMasDatos = blogs.length ? await Blog.verificarSiHayMasDatos({
            ultimaUID,
            filtros,
        }) : false
        
        return {
            blogs,
            ultimaUID,
            existeMasDatos,
        }
    }

    static async paginarListaBlogs (opciones) {
        let { ultimaUID, maximoPorPagina, filtros, esRutaMiembroJekuaa, } = opciones
        
        !maximoPorPagina ? maximoPorPagina = 5 : ''

        let blogs = []
        
        let ref = db.collection('Blogs')

        if (!esRutaMiembroJekuaa) {
            ref = ref.where('habilitado', '==', true).where('publicado', '==', true)
        }

        ref = Blog.filtrar( ref, filtros )
        ref = ref.orderBy('uid').startAfter(ultimaUID).limit(maximoPorPagina)
        const documentSnapshots = await ref.get()
        
        let ultimoDocumento = documentSnapshots.docs[documentSnapshots.docs.length-1]
        ultimaUID = ultimoDocumento.id
        for (let i = 0; i < documentSnapshots.docs.length; i++) {
            const element = documentSnapshots.docs[i]
            blogs.push( element.data() )
        }
        
        const existeMasDatos = await Blog.verificarSiHayMasDatos({
            ultimaUID,
            filtros,
        })
        
        return {
            blogs,
            ultimaUID,
            existeMasDatos,
        }
    }

    static async verificarSiHayMasDatos (opciones) {
        let { ultimaUID, filtros, } = opciones

        let ref = db.collection('Blogs')
        ref = Blog.filtrar( ref, filtros )
        ref = ref.orderBy('uid').startAfter(ultimaUID).limit(1)
        const siguienteDato = await ref.get()
        const existeMasDatos = !siguienteDato.empty

        return existeMasDatos
    }

    static filtrar ( ref, filtros ) {
        if (!filtros || !Object.keys(filtros).length) {
            return ref
        }

        const {
            seccion, categoria, subCategorias,
            publicador, habilitado, publicado,
            revision,
        } = filtros

        if ( seccion ) {
            ref = ref.where('seccion', '==', seccion)
        }
        if ( categoria ) {
            ref = ref.where('categoria', '==', categoria)
        }
        if ( subCategorias && subCategorias.length ) {
            ref = ref.where('subCategorias', 'array-contains-any', subCategorias)
        }
        if ( publicador ) {
            ref = ref.where('publicador', '==', publicador)
        }

        if ( habilitado !== undefined ) {
            ref = ref.where('habilitado ', '==', habilitado)
        }
        if ( publicado !== undefined ) {
            ref = ref.where('publicado ', '==', publicado)
        }
        if ( revision !== undefined ) {
            ref = ref.where('revision  ', '==', revision )
        }

        return ref
    }
}

module.exports = Blog