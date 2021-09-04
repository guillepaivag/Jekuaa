const admin = require('../../firebase-service')
const db = require('../../db')

const TAMANHO_MAXIMO_UID = 100
const COLECCION_BLOG = 'Blog'

class Blog {

    constructor ( datosBlog ) {
        const {
            uid,
            titulo,
            descripcion,
            publicador,
            etiquetas,
            habilitado
        } = datosBlog

        this.uid = uid ? uid : ''
        this.titulo = titulo ? titulo : ''
        this.descripcion = descripcion ? descripcion : ''
        this.publicador = publicador ? publicador : ''
        this.etiquetas = etiquetas ? etiquetas : ''
        this.habilitado = habilitado ? habilitado : ''
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
            etiquetas: this.etiquetas,
            habilitado: this.habilitado,
        }
    }



    /* 
        SETTERS: Se agregan los datos que se desee a los atributos
    */

    // Metodo

    setBLOG ( blog ) {
        const {
            uid,
            titulo,
            descripcion,
            publicador,
            etiquetas,
            habilitado,
        } = blog

        this.setUID(uid)
        this.setTITULO(titulo)
        this.setDESCRIPCION(descripcion)
        this.setPUBLICADOR(publicador)
        this.setETIQUETAS(etiquetas)
        this.setHABILITADO(habilitado)
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

    setETIQUETAS ( etiquetas ) {
        if ( !etiquetas ) {
            this.etiquetas = ''
            return
        }

        this.etiquetas = etiquetas
    }

    setHABILITADO ( habilitado ) {
        if ( !habilitado ) {
            this.habilitado = ''
            return
        }

        this.habilitado = habilitado
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
        if (uid.length > TAMANHO_MAXIMO_UID) {
            throw new Error(`La uid ${this.uid} para el blog excede el tamaño maximo ${TAMANHO_MAXIMO_UID}.`)
        }
        
        const documentBlog = await db.collection(COLECCION_BLOG).doc(uid).get()

        if (!documentBlog.exists) {
            throw new Error(`El blog con la uid ${uid} no existe.`)
        }

        const blog = documentBlog.data()

        this.setBlog( blog )

        return this
    }

    async crearBlog () {

        this.uid = this.titulo.trim().toLowerCase().replaceAll(' ', '-')

        if (this.uid.length > TAMANHO_MAXIMO_UID) {
            throw new Error(`La uid ${this.uid} para el blog excede el tamaño maximo ${TAMANHO_MAXIMO_UID}.`)
        }

        const blog = this.getBlog()
        await db.collection(COLECCION_BLOG).doc(this.uid).set(blog)

        return this
    }

    async actualizarBlog () {

        if (this.uid.length > TAMANHO_MAXIMO_UID) {
            throw new Error(`La uid ${this.uid} para el blog excede el tamaño maximo ${TAMANHO_MAXIMO_UID}.`)
        }

        const blog = this.getBlog()
        await db.collection(COLECCION_BLOG).doc(this.uid).update(blog)

        return this
    }

    async habilitarBlog () {

        if (this.uid.length > TAMANHO_MAXIMO_UID) {
            throw new Error(`La uid ${this.uid} para el blog excede el tamaño maximo ${TAMANHO_MAXIMO_UID}.`)
        }

        await db.collection(COLECCION_BLOG).doc(this.uid).update({
            habilitado: this.habilitado
        })

        return this
    }

    async eliminarBlog () {
        if (this.uid.length > TAMANHO_MAXIMO_UID) {
            throw new Error(`La uid ${this.uid} para el blog excede el tamaño maximo ${TAMANHO_MAXIMO_UID}.`)
        }

        await db.collection(COLECCION_BLOG).doc(this.uid).delete()

        return this
    }

    
        /* 
            ###############################
                   METODOS ESTATICOS
            ###############################
        */
}

module.exports = Blog