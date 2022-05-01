const admin = require('../../../../firebase-service')
const db = require("../../../../db");
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
    static async copiarContenidoDeBorrador (datos = {uidCurso, uidClase}) {
        const { uidCurso, uidClase } = datos

        const rutaModo = config.environment.mode === 'production' ? 'prod' : 'dev'
        const bucketNameContenidoPublicado = rutaModo === 'prod' ? 'prod-j-cursos-contenido' : 'dev-j-cursos-contenido'
        const bucketNameContenidoBorrador = rutaModo === 'prod' ? 'prod-j-cursos-contenido-b' : 'dev-j-cursos-contenido-b'

        const contenidoClaseBorrador = new ContenidoClaseBorrador()
        await contenidoClaseBorrador.importarContenidoClasePorUID(uidCurso, uidClase)

        const rutaContenido = `${uidCurso}/${uidClase}/${contenidoClaseBorrador.fileName}`
        await super.copiarContenido({
            bucketOrigin: bucketNameContenidoBorrador,
            bucketDestination: bucketNameContenidoPublicado,
            rutaContenidoOrigin: rutaContenido,
            rutaContenidoDestination: rutaContenido
        })
    }

    // ELIMINAR
    static async eliminarContenidoPrefix ( datos = { rutaContenidoPrefix } ) {
        const { rutaContenidoPrefix } = datos

        const rutaModo = config.environment.mode === 'production' ? 'prod' : 'dev'
        const bucketNameContenidoPublicado = rutaModo === 'prod' ? 'prod-j-cursos-contenido' : 'dev-j-cursos-contenido'

        await super.eliminarContenidoPrefix({
            bucketName: bucketNameContenidoPublicado, 
            rutaContenidoPrefix: rutaContenidoPrefix
        })
    }

    static async generarUrlVideoClase (datos = {uidCurso, uidClase}) {
        const { uidCurso, uidClase } = datos

        const rutaModo = config.environment.mode === 'production' ? 'prod' : 'dev'
        const bucketNameContenido = rutaModo === 'prod' ? 'prod-j-cursos-contenido' : 'dev-j-cursos-contenido'

        const contenidoClasePublicado = new ContenidoClasePublicado()
        await contenidoClasePublicado.importarContenidoClasePorUID(uidCurso, uidClase)

        const rutaStorage = `${uidCurso}/${uidClase}/${contenidoClasePublicado.fileName}`

        const url = await super.generarUrlVideoClasePrefix({
            bucketName: bucketNameContenido,
            rutaContenidoPrefix: rutaStorage
        })
        
        return url
    }

    static async obtenerArticuloClase (datos = {uidCurso, uidClase, getMarkdown}) {
        const { uidCurso, uidClase, getMarkdown } = datos

        const rutaModo = config.environment.mode === 'production' ? 'prod' : 'dev'
        const bucketNameContenido = rutaModo === 'prod' ? 'prod-j-cursos-contenido' : 'dev-j-cursos-contenido'

        const rutaStorage = `${uidCurso}/${uidClase}/articulo.md`
        const articulo = await super.obtenerArticuloClasePrefix({
            bucketName: bucketNameContenido,
            rutaContenidoPrefix: rutaStorage,
            getMarkdown: getMarkdown
        })

        return articulo
    }
}

module.exports = ContenidoClasePublicado