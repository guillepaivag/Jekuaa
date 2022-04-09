const admin = require('../../../../firebase-service')
const config = require("../../../../config")
const ContenidoClase = require("./ContenidoClase")
const ContenidoClaseBorrador = require('./ContenidoClaseBorrador')

const COLECCION = 'ContenidoClasesPublicado'

class ContenidoClasePublicado extends ContenidoClase {
    constructor (datos = {}) {
        super(datos)
        this.fechaCreacion = datos.fechaCreacion ? datos.fechaCreacion : null
        this.fechaActualizacion = datos.fechaActualizacion ? datos.fechaActualizacion : null
    }

    getContenidoClasePublicado () {
        return {
            ...super.getContenidoClase(),
            fechaCreacion: this.fechaCreacion,
            fechaActualizacion: this.fechaActualizacion,
        }
    }
    
    setContenidoClasePublicado ( datos = {} ) {
        this.setContenidoClase(datos)
        this.setFechaCreacion(datos.fechaCreacion)
        this.setFechaActualizacion(datos.fechaActualizacion)
    }

    setContenidoClase ( contenidoClase = new ContenidoClase() ) {
        super.setContenidoClase( contenidoClase )
    }

    setFechaCreacion ( fechaCreacion = null ) {
        this.fechaCreacion = fechaCreacion
    }

    setFechaActualizacion ( fechaActualizacion = null ) {
        this.fechaActualizacion = fechaActualizacion
    } 



    async importarContenidoClasePorUID (uidCurso = '', uidClase = '') {
        const doc = await db
        .collection('CursosPublicado').doc( uidCurso )
        .collection(COLECCION).doc( uidClase )
        .get()

        if (!doc.exists) return null

        this.setContenidoClasePublicado(doc.data())

        return this
    }

    static async agregarDocumento ( uidCurso = '', contenidoClasePublicado = new ContenidoClasePublicado()  ) {        
        await db
        .collection('CursosPublicado').doc( uidCurso )
        .collection(COLECCION).doc( contenidoClasePublicado.uid )
        .set( contenidoClasePublicado.getContenidoClasePublicado() )

        return true
    }

    static async actualizarDocumento ( uidCurso = '', uidClase = '', datosActualizados = {} ) {
        await db
        .collection('CursosPublicado').doc( uidCurso )
        .collection(COLECCION).doc( uidClase )
        .update(datosActualizados)

        return true
    }

    static async eliminarDocumento ( uidCurso = '', uidClase = ''  ) {        
        await db
        .collection('CursosPublicado').doc( uidCurso )
        .collection(COLECCION).doc( uidClase )
        .delete()

        return true
    }

    // CREAR - ACTUALIZAR
    static async subirContenido () {
        // Crear/Actualizar el archivo contenido en Cloud Storage

        // Actualizar el documento contenido en Cloud Firestore
    }

    static async actualizarContenidoDesdeBorrador (uidCurso = '', uidClase = '') {
        const rutaModo = config.environment.mode === 'production' ? 'prod' : 'dev'
        let bucketNameContenidoPublicado = rutaModo === 'prod' ? 'j-cursos-contenido' : 'j-cursos-contenido-dev'
        let bucketNameContenidoBorrador = rutaModo === 'prod' ? 'j-cursos-contenido-b' : 'j-cursos-contenido-b-dev'
        
        // Eliminación del contenido de una "carpeta"
        await super.eliminarContenido({
            bucketName: bucketNameContenidoPublicado,
            uidCurso: uidCurso,
            uidClase: uidClase
        })

        // Agregar el contenido borrador
        const contenidoClaseBorrador = new ContenidoClaseBorrador()
        await contenidoClaseBorrador.importarContenidoClasePorUID(uidCurso, uidClase)
        const rutaContenido = `${uidCurso}/${uidClase}/${contenidoClaseBorrador.fileName}`
        super.copiarContenido({
            bucket1: bucketNameContenidoBorrador,
            bucket2: bucketNameContenidoPublicado,
            rutaContenido1: rutaContenido,
            rutaContenido2: rutaContenido
        })

    }

    // ELIMINAR
    static async eliminarContenido () {
        // Eliminar el archivo contenido de Cloud Storage

        // Poner como documento contenido por defecto el documento contenido
    }

    static async generarUrlFirmadaVideoClase () {
        
    }

    static async obtenerArticuloClase () {
        
    }
}

module.exports = ContenidoClasePublicado