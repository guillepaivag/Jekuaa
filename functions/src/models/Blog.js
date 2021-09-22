const admin = require('../../firebase-service')
const db = require('../../db')
const ErrorJekuaa = require('./Error/ErroresJekuaa')

const COLECCION_BLOG = 'Blog'

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
        this.pendiente = ( datosBlog && datosBlog.pendiente ) ? datosBlog.pendiente : false
        this.fechaCreacion = ( datosBlog && datosBlog.fechaCreacion ) ? datosBlog.fechaCreacion : null
        this.fechaActualizacion = ( datosBlog && datosBlog.fechaActualizacion ) ? datosBlog.fechaActualizacion : null
    }


    /* 
        GETTERS: Se obtienen los datos de los atributos
    */

    // Metodo
    
    getBlog () {
        return {
            uid: this.uid,
            titulo: this.titulo,
            descripcion: this.descripcion,
            publicador: this.publicador,
            seccion: this.seccion,
            categoria: this.categoria,
            subCategorias: this.subCategorias,
            habilitado: this.habilitado,
            pendiente: this.pendiente,
            fechaCreacion: this.fechaCreacion,
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
        this.setPENDIENTE( ( blog && blog.pendiente ) ? blog.pendiente : null )
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

    setPENDIENTE ( pendiente ) {
        if ( !pendiente ) {
            this.pendiente = false
            return
        }

        this.pendiente = pendiente
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

        this.setBlog( blog )

        return this
    }

    async crearBlog () {

        const blog = this.getBlog()
        await db.collection(COLECCION_BLOG).doc(this.uid).set(blog)

        return this
    }

    async actualizarBlog () {

        const blog = this.getBlog()
        await db.collection(COLECCION_BLOG).doc(this.uid).update(blog)

        return this
    }

    async habilitarBlog () {

        await db.collection(COLECCION_BLOG).doc(this.uid).update({
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
            pendiente,
            fechaCreacion,
            fechaActualizacion,
        } = datosBlog

        const blog = new Blog()
        blog.setUID( uid )
        blog.setTITULO( titulo )
        blog.setDESCRIPCION( descripcion )
        blog.setPUBLICADOR( publicador )
        blog.setSECCION( seccion )
        blog.setCATEGORIA( categoria )
        blog.setSUB_CATEGORIAS( subCategorias )
        blog.setHABILITADO( false )
        blog.setPENDIENTE( true )
        blog.setFECHA_CREACION()
        blog.setFECHA_ACTUALIZACION()

        return await blog.crearBlog()
    }
}

module.exports = Blog