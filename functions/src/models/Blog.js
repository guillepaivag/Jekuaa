const admin = require('../../firebase-service')
const db = require('../../db')
const ErrorJekuaa = require('./Error/ErroresJekuaa')
const storage = require('../../GoogleStorage')
const fs = require('fs')
const showdown  = require('showdown')
const ActualizacionBlog = require('./Blogs/ActualizacionBlog')

const COLECCION_BLOG = 'Blogs'
const COLECCION_BLOG_ACTUALIZACIONES = 'Actualizaciones'

class Blog {

    constructor ( datosBlog ) {
        this.uid = ( datosBlog && datosBlog.uid ) ? datosBlog.uid : ''
        this.titulo = ( datosBlog && datosBlog.titulo ) ? datosBlog.titulo : ''
        this.descripcion = ( datosBlog && datosBlog.descripcion ) ? datosBlog.descripcion : ''
        this.publicador = ( datosBlog && datosBlog.publicador ) ? datosBlog.publicador : ''
        this.seccion = ( datosBlog && datosBlog.seccion ) ? datosBlog.seccion : ''
        this.categoria = ( datosBlog && datosBlog.categoria ) ? datosBlog.categoria : ''
        this.subCategorias = ( datosBlog && datosBlog.subCategorias ) ? datosBlog.subCategorias : []
        this.habilitado = ( datosBlog && datosBlog.habilitado ) ? datosBlog.habilitado : false
        this.estado = ( datosBlog && datosBlog.estado ) ? datosBlog.estado : false
        this.actualizacionPendiente = ( datosBlog && datosBlog.actualizacionPendiente ) ? datosBlog.actualizacionPendiente : false
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
            titulo: this.titulo,
            descripcion: this.descripcion,
            publicador: this.publicador,                    // Constante
            seccion: this.seccion,
            categoria: this.categoria,
            subCategorias: this.subCategorias,
            habilitado: this.habilitado,
            estado: this.estado,
            actualizacionPendiente: this.actualizacionPendiente,
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
        this.setTITULO( ( blog && blog.titulo ) ? blog.titulo : null )
        this.setDESCRIPCION( ( blog && blog.descripcion ) ? blog.descripcion : null )
        this.setPUBLICADOR( ( blog && blog.publicador ) ? blog.publicador : null )
        this.setSECCION( ( blog && blog.seccion ) ? blog.seccion : null )
        this.setCATEGORIA( ( blog && blog.categoria ) ? blog.categoria : null )
        this.setSUB_CATEGORIAS( ( blog && blog.subCategorias ) ? blog.subCategorias : null )
        this.setHABILITADO( ( blog && blog.habilitado ) ? blog.habilitado : null )
        this.setESTADO( ( blog && blog.estado ) ? blog.estado : null )
        this.setACTUALIZACION_PENDIENTE( ( blog && blog.actualizacionPendiente ) ? blog.actualizacionPendiente : null )
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

    setHABILITADO ( habilitado ) {
        if ( !habilitado ) {
            this.habilitado = false
            return
        }

        this.habilitado = habilitado
    }

    setESTADO ( estado ) {
        if ( !estado ) {
            this.estado = 'no-existe-archivo'
            return
        }

        this.estado = estado
    }

    setACTUALIZACION_PENDIENTE ( actualizacionPendiente ) {
        if ( !actualizacionPendiente ) {
            this.actualizacionPendiente = null
            return
        }

        this.actualizacionPendiente = actualizacionPendiente
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

    async crearBlog () {

        const blog = this.getBlog()
        await db.collection(COLECCION_BLOG).doc(this.uid).set(blog)

        return this
    }

    async actualizarDatosBlog ( blog ) {
        if ( !blog || typeof blog != 'object' ) {
            throw new ErrorJekuaa({
                codigo: 'jekuaa/error/usuario_mala_solicitud',
                mensaje: `No hay datos que actualizar :D`
            })
        }

        await db.collection(COLECCION_BLOG).doc(this.uid).update( blog )

        return this
    }

    async crearSolicitudDeActualizacion ( datosActualizacion ) {

        const {
            fechaSolicitud,
            descripcionSolicitud,
            estado,
            fechaRespuesta,
            respuesta
        } = datosActualizacion

        // Crea una solicitud en su subcoleccion: Actualizaciones
        const solicitudActualizacionBlog = new ActualizacionBlog()
        solicitudActualizacionBlog.setUID_BLOG(this.uid)
        solicitudActualizacionBlog.setDatosBlog({
            descripcionSolicitud,
            fechaSolicitud,
            estado: 'pendiente',
            respuesta: '',
            fechaRespuesta: null,
        })
        const solicitudCreada = await solicitudActualizacionBlog.crearSolicitudActualizacion()

        // Cambia el estado y actualizacionPendiente
        await this.actualizarDatosBlog({
            estado: 'actualizacion-pendiente',
            actualizacionPendiente: solicitudCreada.id
        })

        return solicitudCreada
    }

    async obtenerContenido ( opciones ) {
        let rutaCloudStorage = opciones.pendiente ? 'blogs/pendientes' : 'blogs/publicados'

        const myBucket = storage.bucket('jekuaa-py.appspot.com')

        const file = myBucket.file(`${rutaCloudStorage}/${this.uid}.md`)

        // Descargar archivo (de publicados o pendientes)
        await file.download({
            destination: opciones.rutaArchivoTemp
        })

        // Obtener el contenido del archivo
        let contenido = fs.readFileSync( opciones.rutaArchivoTemp, 'utf-8' )

        // Borrar el archivo creado en el servidor
        fs.unlink( opciones.rutaArchivoTemp, (err => {
            if ( err ) {
                console.log(err)
                return
            }
            
        }))

        // Formatear de acuerdo a lo que se pide
        // Formato por defecto: Markdown (md)
        if ( opciones.formatoSalida === 'html' ) {
            const converter = new showdown.Converter()
            contenido = converter.makeHtml(contenido)
        }

        // Enviar string del contenido
        return contenido
    }

    async actualizarSolicitudDeActualizacion ( uid, datosActualizacion ) {

        const {
            fechaSolicitud,
            descripcionSolicitud,
            estado,
            fechaRespuesta,
            respuesta
        } = datosActualizacion

        const actualizacion = await db.collection(COLECCION_BLOG).doc(this.uid)
        .collection(COLECCION_BLOG_ACTUALIZACIONES).doc(uid)
        .update({
            estado,
            respuesta,
            fechaRespuesta,
        })

        return actualizacion.id
    }

    async habilitarBlog () {

        await db.collection(COLECCION_BLOG).doc(this.uid).update({
            pendiente: false,
            habilitado: this.habilitado
        })

        return this
    }

    async eliminarBlog () {

        await db.collection(COLECCION_BLOG).doc(this.uid).delete()

        return this
    }

    
        /* 
            ###############################
                   METODOS ESTATICOS
            ###############################
        */

    
    static async crearNuevoBlog ( datosBlog ) {
        const {
            uid,
            titulo,
            descripcion,
            publicador,
            seccion,
            categoria,
            subCategorias,
            habilitado,
            estado,
            actualizacionPendiente,
            fechaCreacion,
            fechaActualizacion,
        } = datosBlog

        const blog = new Blog()
        blog.setUID( uid )
        blog.setTITULO( titulo )
        blog.setDESCRIPCION( descripcion )      // Opcional
        blog.setPUBLICADOR( publicador )
        blog.setSECCION( seccion )
        blog.setCATEGORIA( categoria )
        blog.setSUB_CATEGORIAS( subCategorias ) // Opcional
        blog.setHABILITADO()                        // Default: false
        blog.setESTADO()                            // Default: no-existe-archivo
        blog.setACTUALIZACION_PENDIENTE()           // Default: null
        blog.setFECHA_CREACION( fechaCreacion )
        blog.setFECHA_ACTUALIZACION( fechaActualizacion )

        return await blog.crearBlog()
    }

    static async subirArchivoAStorage ( datosArchivo, pendiente ) {

        const {
            filepath,
            filename,
            mimetype
        } = datosArchivo
        const rutaArchivo = pendiente ? 'blogs/pendientes' : 'blogs/publicados'
        
        const bucket = storage.bucket('jekuaa-py.appspot.com')
        const response = await bucket.upload(filepath, {
            destination: `${rutaArchivo}/${filename}`,
            uploadType: 'media',
            metadata: {
                metadata: {
                    contentType: mimetype
                }
            }
        })

        return response
    }

    static async obtenerURL ( nombreArchivo, extensionArchivo, pendiente, segundosValidos ) {
        const action = 'read'
        const expires = new Date().getTime() + segundosValidos * 1000
        const ruta = pendiente ? 'blogs/pendientes' : 'blogs/publicados'

        const bucket = storage.bucket('jekuaa-py.appspot.com')
        const file = bucket.file(`${ruta}/${nombreArchivo}.${extensionArchivo}`)
        
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

        // Descargar archivo (de publicados o pendientes)
        await file.download({
            destination: opciones.rutaArchivoTemp
        })

        // Obtener el contenido del archivo
        let contenido = fs.readFileSync( opciones.rutaArchivoTemp, 'utf-8' )

        // Borrar el archivo creado en el servidor
        fs.unlink( opciones.rutaArchivoTemp, (err => {
            if ( err ) {
                console.log(err)
                return
            }
            
        }))

        // Formatear de acuerdo a lo que se pide
        // Formato por defecto: Markdown (md)
        if ( opciones.formatoSalida === 'html' ) {
            const converter = new showdown.Converter()
            contenido = converter.makeHtml(contenido)
        }

        // Enviar string del contenido
        return contenido
    }

    static async eliminarArchivoBlog ( filename ) {
        const bucket = storage.bucket('jekuaa-py.appspot.com')
        const file = bucket.file(`blogs/${filename}.md`)
        
        const resultado = await file.delete()
        
        return resultado
    }

    static async errorExisteBlogPorUID ( uid, operacion ) {
        const existe = (await db.collection(COLECCION_BLOG).doc(uid).get()).exists

        if ( operacion === 'existe' && existe ) {
            throw new ErrorJekuaa({
                codigo: 'jekuaa/error/usuario_mala_solicitud',
                mensaje: `Ya existe el blog ${uid}`
            })

        } else if ( operacion === 'no-existe' && !existe ) {
            throw new ErrorJekuaa({
                codigo: 'jekuaa/error/usuario_mala_solicitud',
                mensaje: `No existe el blog ${uid}`
            })
        }

    }
}

module.exports = Blog