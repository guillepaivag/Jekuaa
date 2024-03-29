const admin = require('../../../firebase-service')
const db = require('../../../db')
const storage = admin.storage()
const showdown  = require('showdown')
const fs  = require('fs')
const config = require('../../../config')

const COLECCION_BLOG = 'Blogs'

class Blog {

    constructor ( datosBlog = {} ) {
        const {
            uid, referencia, titulo, descripcion, equipo, publicador,
            seccion, categorias, mensajesError, contieneErrores, 
            cantidadMeGusta, habilitado, publicado, mensajesDeshabilitacion, revision, fechaCreacion, fechaActualizacion
        } = datosBlog

        this.uid = uid ? uid : db.collection(COLECCION_BLOG).doc().id
        this.referencia = referencia ? referencia : ''
        this.titulo = titulo ? titulo : ''
        this.descripcion = descripcion ? descripcion : ''
        this.equipo = equipo ? equipo : ''
        this.publicador = publicador ? publicador : ''
        this.seccion = seccion ? seccion : ''
        this.categorias = categorias ? categorias : []
        this.mensajesError = mensajesError ? mensajesError : []
        this.contieneErrores = contieneErrores !== undefined ? contieneErrores : false
        this.cantidadMeGusta = cantidadMeGusta ? cantidadMeGusta : 0
        this.habilitado = habilitado !== undefined ? habilitado : true
        this.mensajesDeshabilitacion = mensajesDeshabilitacion ? mensajesDeshabilitacion : []
        this.publicado = publicado !== undefined ? publicado : true
        this.revision = revision !== undefined ? revision : true
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
            equipo: this.equipo,
            publicador: this.publicador,                    // Constante
            seccion: this.seccion,
            categorias: this.categorias,
            mensajesError: this.mensajesError,
            contieneErrores: this.contieneErrores,
            cantidadMeGusta: this.cantidadMeGusta,
            habilitado: this.habilitado,
            publicado: this.publicado,
            mensajesDeshabilitacion: this.mensajesDeshabilitacion,
            revision: this.revision,
            fechaCreacion: this.fechaCreacion,              // Constante
            fechaActualizacion: this.fechaActualizacion,
        }
    }

    /* 
        SETTERS: Se agregan los datos que se desee a los atributos
    */

    // Metodo

    setBLOG ( blog = {} ) {
        this.setUID( blog.uid )
        this.setREFERENCIA( blog.referencia )
        this.setTITULO( blog.titulo )
        this.setDESCRIPCION( blog.descripcion )
        this.setEQUIPO( blog.equipo )
        this.setPUBLICADOR( blog.publicador )
        this.setSECCION( blog.seccion )
        this.setCATEGORIAS( blog.categorias )
        this.setMENSAJES_ERROR( blog.mensajesError )
        this.setCONTIENE_ERRORES( blog.contieneErrores )
        this.setCANTIDAD_ME_GUSTA( blog.cantidadMeGusta )
        this.setHABILITADO( blog.habilitado )
        this.setPUBLICADO( blog.publicado )
        this.setMENSAJES_DESHABILITACION( blog.mensajesDeshabilitacion )
        this.setREVISION( blog.revision )
        this.setFECHA_CREACION( blog.fechaCreacion )
        this.setFECHA_ACTUALIZACION( blog.fechaActualizacion )
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

    setEQUIPO ( equipo = '' ) {
        this.equipo = equipo
    }
    
    setPUBLICADOR ( publicador = '' ) {
        this.publicador = publicador
    }

    setSECCION ( seccion = '' ) {
        this.seccion = seccion
    }

    setCATEGORIAS ( categorias = [] ) {
        this.categorias = categorias
    }

    setMENSAJES_ERROR ( mensajesError = [] ) {
        this.mensajesError = mensajesError
    }
    
    setCONTIENE_ERRORES ( contieneErrores = false ) {
        this.contieneErrores = contieneErrores
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

    setMENSAJES_DESHABILITACION ( mensajesDeshabilitacion = [] ) {
        this.mensajesDeshabilitacion = mensajesDeshabilitacion
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
     *    ##################################
     *           METODOS NO ESTATICOS
     *    ##################################
    */

    // Importación de datos
    async importarDatosBlogPorUID ( uid ) {
        const documentBlog = await db.collection(COLECCION_BLOG).doc(uid).get()

        if (!documentBlog.exists) return null

        const blog = documentBlog.data()

        this.setBLOG( blog )

        return this
    }

    async importarDatosBlogPorReferencia ( referencia ) {
        const documentsBlog = await db.collection(COLECCION_BLOG).where('referencia', '==', referencia).get()

        if (documentsBlog.empty) return null

        const doc = documentsBlog.docs[0]

        const blog = doc.data()

        this.setBLOG( blog )

        return this
    }

    // Formateo de datos
    formatearDatos ( ) {
        this.uid = this.uid ? this.uid.trim() : ''
        this.referencia = this.referencia ? this.referencia.trim() : ''
        this.titulo = this.titulo ? this.titulo.trim() : ''
        this.descripcion = this.descripcion ? this.descripcion.trim() : ''
        this.publicador = this.publicador ? this.publicador.trim() : ''
        this.seccion = this.seccion ? this.seccion.trim() : ''
        for (let i = 0; i < this.categorias.length; i++) {
            this.categorias[i] = this.categorias[i].trim()
        }

        return this
    }


    /* 
     *    ################################
     *           METODOS ESTATICOS
     *    ################################
    */

    
    // CRUD Documentos
    static async crearNuevoBlog ( blog = new Blog() ) {
        const datosBlog = blog.getBlog()
        await db.collection(COLECCION_BLOG).doc(datosBlog.uid).set(datosBlog)
        return blog
    }

    static async actualizarBlog ( uid, datosBlog ) {
        await db.collection(COLECCION_BLOG).doc(uid).update( datosBlog )

        return datosBlog
    }

    static async eliminarBlog ( uid ) {
        await db.collection(COLECCION_BLOG).doc(uid).delete()
        return true
    }


    // CRUD Archivos
    static async obtenerContenido ( uid, extensionArchivo ) {
        const rutaModo = config.environment.mode === 'production' ? 'prod' : 'dev'

        const bucketName = rutaModo === 'prod' ? 'prod-j-blogs' : 'dev-j-blogs'
        const bucket = storage.bucket(bucketName)
        const file = bucket.file(`${uid}.md`)

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
        const rutaModo = config.environment.mode === 'production' ? 'prod' : 'dev'
        
        const bucketName = rutaModo === 'prod' ? 'prod-j-blogs' : 'dev-j-blogs'
        const bucket = storage.bucket(bucketName)

        const response = await bucket.upload(rutaArchivo, {
            destination: `${uid}.md`,
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
        const rutaModo = config.environment.mode === 'production' ? 'prod' : 'dev'
        
        const bucketName = rutaModo === 'prod' ? 'prod-j-blogs' : 'dev-j-blogs'
        const bucket = storage.bucket(bucketName)

        const file = bucket.file(`${nombreArchivo}.md`)

        const existe = (await file.exists())[0]

        const resultado = existe ? await file.delete() : null
        
        return resultado
    }


    // Existencia de documento y archivo
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
            throw new TypeError('Seleccionar un identificador para el blog.')
        }
    }

    static async existeArchivoBlog ( uid ) {       
        const rutaModo = config.environment.mode === 'production' ? 'prod' : 'dev'
        
        const bucketName = rutaModo === 'prod' ? 'prod-j-blogs' : 'dev-j-blogs'
        const bucket = storage.bucket(bucketName)
        
        const file = bucket.file(`${uid}.md`)
        const existe = (await file.exists())[0]

        return existe
    }
}

module.exports = Blog