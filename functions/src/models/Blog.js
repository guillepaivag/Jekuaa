const admin = require('../../firebase-service')
const db = require('../../db')
const ErrorJekuaa = require('./Error/ErroresJekuaa')
const storage = require('../../GoogleStorage')
const fs = require('fs')
const showdown  = require('showdown')
const Usuario = require('./Usuario')

const COLECCION_BLOG = 'Blogs'
const COLECCION_BLOG_ACTUALIZACIONES = 'Actualizaciones'

class Blog {

    constructor ( datosBlog ) {
        this.uid = ( datosBlog && datosBlog.uid ) ? datosBlog.uid : ''
        this.referencia = ( datosBlog && datosBlog.referencia ) ? datosBlog.referencia : ''
        this.titulo = ( datosBlog && datosBlog.titulo ) ? datosBlog.titulo : ''
        this.descripcion = ( datosBlog && datosBlog.descripcion ) ? datosBlog.descripcion : ''
        this.publicador = ( datosBlog && datosBlog.publicador ) ? datosBlog.publicador : ''
        this.seccion = ( datosBlog && datosBlog.seccion ) ? datosBlog.seccion : ''
        this.categoria = ( datosBlog && datosBlog.categoria ) ? datosBlog.categoria : ''
        this.subCategorias = ( datosBlog && datosBlog.subCategorias ) ? datosBlog.subCategorias : []
        this.cantidadMeGusta = ( datosBlog && datosBlog.cantidadMeGusta ) ? datosBlog.cantidadMeGusta : 0
        this.habilitado = ( datosBlog && datosBlog.habilitado ) ? datosBlog.habilitado : true
        this.publicado = ( datosBlog && datosBlog.publicado ) ? datosBlog.publicado : true
        this.revision = ( datosBlog && datosBlog.revision ) ? datosBlog.revision : true
        this.fechaCreacion = ( datosBlog && datosBlog.fechaCreacion ) ? datosBlog.fechaCreacion : null
        this.fechaActualizacion = ( datosBlog && datosBlog.fechaActualizacion ) ? datosBlog.fechaActualizacion : null
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

    setUID ( uid ) {
        if ( !uid ) {
            this.uid = ''
            return
        }

        this.uid = uid
    }

    setREFERENCIA ( referencia ) {
        if ( !referencia ) {
            this.referencia = ''
            return
        }

        this.referencia = referencia
    }

    setTITULO ( titulo ) {
        if ( !titulo ) {
            this.titulo = ''
            return
        }

        this.titulo = titulo
    }

    setDESCRIPCION ( descripcion ) {
        if ( !descripcion ) {
            this.descripcion = ''
            return
        }

        this.descripcion = descripcion
    }

    setPUBLICADOR ( publicador ) {
        if ( !publicador ) {
            this.publicador = ''
            return
        }

        this.publicador = publicador
    }

    setSECCION ( seccion ) {
        if ( !seccion ) {
            this.seccion = ''
            return
        }

        this.seccion = seccion
    }

    setCATEGORIA ( categoria ) {
        if ( !categoria ) {
            this.categoria = ''
            return
        }

        this.categoria = categoria
    }

    setSUB_CATEGORIAS ( subCategorias ) {
        if ( !subCategorias ) {
            this.subCategorias = []
            return
        }

        this.subCategorias = subCategorias
    }

    setCANTIDAD_ME_GUSTA ( cantidadMeGusta ) {
        if ( !cantidadMeGusta ) {
            this.cantidadMeGusta = 0
            return
        }

        this.cantidadMeGusta = cantidadMeGusta
    }

    setHABILITADO ( habilitado ) {
        if ( !habilitado ) {
            this.habilitado = true
            return
        }

        this.habilitado = habilitado
    }

    setPUBLICADO ( publicado ) {
        if ( !publicado ) {
            this.publicado = true
            return
        }

        this.publicado = publicado
    }

    setREVISION ( revision ) {
        if ( !revision ) {
            this.revision = true
            return
        }

        this.revision = revision
    }

    setFECHA_CREACION ( fechaCreacion ) {
        if ( !fechaCreacion ) {
            this.fechaCreacion = null
            return
        }

        this.fechaCreacion = fechaCreacion
    }

    setFECHA_ACTUALIZACION ( fechaActualizacion ) {
        if ( !fechaActualizacion ) {
            this.fechaActualizacion = null
            return
        }

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
        if ( !blog || typeof blog != 'object' ) {
            throw new ErrorJekuaa({
                codigo: 'jekuaa/error/usuario_mala_solicitud',
                mensaje: `No hay datos para crear un blog.`
            })
        }
        
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

    async subirArchivoAStorage ( datosArchivo ) {

        const {
            filepath,
            filename,
            mimetype
        } = datosArchivo
        const rutaArchivo = `blogs/${filename}`
        
        const bucket = storage.bucket('jekuaa-py.appspot.com')
        const response = await bucket.upload(filepath, {
            destination: rutaArchivo,
            uploadType: 'media',
            metadata: {
                metadata: {
                    contentType: mimetype
                }
            }
        })

        return response
    }

    async obtenerContenido ( opciones ) {
        let rutaCloudStorage = process.env.NODE_ENV ? 'blogs/prod' : 'blogs/dev'

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

    async borrarArchivoBlog ( opciones ) {
        let rutaCloudStorage = opciones && opciones.pendiente ? 'blogs/pendientes' : 'blogs/publicados'

        const bucket = storage.bucket('jekuaa-py.appspot.com')

        const file = bucket.file(`${rutaCloudStorage}/${this.uid}.md`)

        const existe = (await file.exists())[0]

        if ( !existe ) {
            throw new ErrorJekuaa({
                codigo: 'jekuaa/error/usuario_mala_solicitud',
                mensaje: `No existe el blog.`
            })
        }

        const data = await file.delete()
        const apiResponse = data[0]
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

    static async existeArchivoBlog ( rutaArchivo ) {
        const bucket = storage.bucket('jekuaa-blogs')
        const file = bucket.file(rutaArchivo)

        const existe = (await file.exists())[0]

        return existe
    }

    static async subirArchivoAStorage ( rutaArchivo, uid ) {
        const bucket = storage.bucket('jekuaa-blogs')

        const rutaModo = process.env.NODE_ENV ? 'prod' : 'dev'
        const response = await bucket.upload(rutaArchivo, {
            destination: `blogs/${rutaModo}/${uid}.md`,
            uploadType: 'media',
            metadata: {
                metadata: {
                    contentType: '.md'
                }
            }
        })

        return response
    }

    static async obtenerURL ( nombreArchivo, opcionesBlog ) {

        // opcionesBlog: pendiente, segundosValidos
        const action = 'read'
        const expires = new Date().getTime() + opcionesBlog.segundosValidos * 1000
        const rutaArchivo = `blogs/${nombreArchivo}.md`

        const bucket = storage.bucket('jekuaa-py.appspot.com')
        const file = bucket.file(rutaArchivo)

        const existe = (await file.exists())[0]

        if ( !existe ) {
            throw new ErrorJekuaa({
                codigo: 'jekuaa/error/usuario_mala_solicitud',
                mensaje: `No existe el blog ${nombreArchivo}`
            })
        }
        
        const links = await file.getSignedUrl({
            action,
            expires
        })
        
        return links[0]
    }

    static async obtenerContenidoPorUID ( nombreArchivo, opciones ) {
        let rutaCloudStorage = opciones.pendiente ? 'blogs/pendientes' : 'blogs/publicados'

        const myBucket = storage.bucket('jekuaa-py.appspot.com')

        const file = myBucket.file(`${rutaCloudStorage}/${nombreArchivo}.md`)

        const archivo = file.createReadStream()

        let contenido = ''
        archivo.on('data', function(contenidoObtenido) {
            contenido += contenidoObtenido;
        })
        
        archivo.on('end', function() {
            return contenido
        })

        archivo.on('error', function(err) {
            console.log('err', err)
        })
    }

    static async eliminarBlog ( uid ) {
        const result = await db.collection(COLECCION_BLOG).doc(uid).delete()
        return result
    }

    static async eliminarArchivoBlog ( nombreArchivo ) {
        const bucket = storage.bucket('jekuaa-blogs')
        const modo = process.env.NODE_ENV ? 'prod' : 'dev'
        const file = bucket.file(`blogs/${modo}/${nombreArchivo}.md`)

        const existe = (await file.exists())[0]

        const resultado = existe ? await file.delete() : null
        
        return resultado
    }

    static async errorBlogPorUID ( uid, operacion ) {
        const existe = (await db.collection(COLECCION_BLOG).doc(uid).get()).exists

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
    
    static async obtenerImagenPorSeccion(seccion) {
        // These options will allow temporary read access to the file
        const options = {
            version: 'v4',
            action: 'read',
            expires: Date.now() + (24 * 60) * 60 * 1000, // 24 horas
        }

        // Get a v4 signed URL for reading the file
        const [url] = await storage
            .bucket(`jekuaa-py.appspot.com`)
            .file(`imagenes-secciones/${seccion}.png`)
            .getSignedUrl(options);
            
        return url
    }

    static async inicializarListaBlogs (opciones) {
        let { maximoPorPagina, filtros } = opciones
        
        !maximoPorPagina ? maximoPorPagina = 5 : ''
        
        let blogs = []

        let ref = db.collection('Blogs')
        ref = Blog.filtrar( ref, filtros )
        ref = ref.orderBy('uid').limit( maximoPorPagina )
        const documentSnapshots = await ref.get()
        
        let ultimoDocumento = documentSnapshots.docs[documentSnapshots.docs.length-1]
        let ultimaUID = ultimoDocumento.id
        for (let i = 0; i < documentSnapshots.docs.length; i++) {
            const element = documentSnapshots.docs[i]
            
            const uidPublicador = element.data().publicador

            const datosAuthPublicador = await Usuario.verDatosAuthPorUID( uidPublicador )
            const imgBlog = await Blog.obtenerImagenPorSeccion(element.data().seccion)

            const datosBlog = {
                imgBlog: imgBlog,
                blog: element.data(),
                publicador: {
                    nombreUsuario: datosAuthPublicador.displayName,
                }
            }
            
            blogs.push( datosBlog )
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
        let { ultimaUID, maximoPorPagina, filtros, } = opciones
        
        !maximoPorPagina ? maximoPorPagina = 5 : ''

        let blogs = []
        
        let ref = db.collection('Blogs')
        ref = Blog.filtrar( ref, filtros )
        ref = ref.orderBy('uid').startAfter(ultimaUID).limit(maximoPorPagina)
        const documentSnapshots = await ref.get()
        
        let ultimoDocumento = documentSnapshots.docs[documentSnapshots.docs.length-1]
        ultimaUID = ultimoDocumento.id
        for (let i = 0; i < documentSnapshots.docs.length; i++) {
            const element = documentSnapshots.docs[i]
            
            const uidPublicador = element.data().publicador

            const datosAuthPublicador = await Usuario.verDatosAuthPorUID( uidPublicador )
            const imgBlog = await Blog.obtenerImagenPorSeccion(element.data().seccion)

            const datosBlog = {
                imgBlog: imgBlog,
                blog: element.data(),
                publicador: {
                    nombreUsuario: datosAuthPublicador.displayName,
                }
            }
            
            blogs.push( datosBlog )
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

        if ( filtros.seccion ) {
            ref = ref.where('seccion', '==', filtros.seccion)
        }
        if ( filtros.categoria ) {
            ref = ref.where('categoria', '==', filtros.categoria)
        }
        if ( filtros.subCategorias ) {
            ref = ref.where('subCategorias', 'array-contains-any', filtros.subCategorias)
        }

        return ref
    }
}

module.exports = Blog