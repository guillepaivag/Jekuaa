const ContenidoClase = require("./ContenidoClase")
const timestamp = require('../../../utils/timestamp')
const admin = require("../../../../firebase-service")
const config = require("../../../../config")
const db = require("../../../../db")

/**
 *  estadoArchivo: 
 *      '', 'subiendo', 'procesando'
 */

const COLECCION_CONTENIDO_CLASE = 'ContenidoClasesBorrador'

class ContenidoClaseBorrador extends ContenidoClase {
    constructor (datos = {}) {
        super(datos)
        this.mensajesError = datos.mensajesError ? datos.mensajesError : []
        this.estadoDocumento = datos.estadoDocumento ? datos.estadoDocumento : ''
        this.estadoArchivo = datos.estadoArchivo ? datos.estadoArchivo : ''
    }

    getContenidoClaseBorrador () {
        return {
            ...super.getContenidoClase(),
            mensajesError: this.mensajesError,
            estadoDocumento: this.estadoDocumento,
            estadoArchivo: this.estadoArchivo,
        }
    }

    setContenidoClaseBorrador ( datos = {} ) {
        this.setContenidoClase(datos)
        this.setMensajesError(datos.mensajesError)
        this.setEstadoDocumento(datos.estadoDocumento)
        this.setEstadoArchivo(datos.estadoArchivo)
    }

    setContenidoClase ( contenidoClase = new ContenidoClase() ) {
        super.setContenidoClase( contenidoClase )
    }

    setMensajesError ( mensajesError = [] ) {
        this.mensajesError = mensajesError
    }

    setEstadoDocumento ( estadoDocumento = '' ) {
        this.estadoDocumento = estadoDocumento
    }

    setEstadoArchivo ( estadoArchivo = '' ) {
        this.estadoArchivo = estadoArchivo
    }


    async importarContenidoClasePorUID (uidCurso = '', uidClase = '') {
        const doc = await db
        .collection('CursosBorrador').doc( uidCurso )
        .collection('ContenidoClasesBorrador').doc( uidClase )
        .get()

        if (!doc.exists) return null

        this.setContenidoClaseBorrador(doc.data())

        return this
    }

    static async agregarDocumento ( uidCurso = '', contenidoClaseBorrador = new ContenidoClaseBorrador()  ) {        
        await db
        .collection('CursosBorrador').doc( uidCurso )
        .collection(COLECCION_CONTENIDO_CLASE).doc( contenidoClaseBorrador.uid )
        .set( contenidoClaseBorrador.getContenidoClaseBorrador() )

        return true
    }

    static async actualizarDocumento ( uidCurso = '', uidClase = '', datosActualizados = {} ) {
        await db
        .collection('CursosBorrador').doc( uidCurso )
        .collection(COLECCION_CONTENIDO_CLASE).doc( uidClase )
        .update(datosActualizados)

        return true
    }

    static async eliminarDocumento ( uidCurso = '', uidClase = ''  ) {        
        await db
        .collection('CursosBorrador').doc( uidCurso )
        .collection(COLECCION_CONTENIDO_CLASE).doc( uidClase )
        .delete()

        return true
    }


    // CREAR - ACTUALIZAR
    static async subirContenido ( datos = {verificacion, uidCurso, uidClase, fileData} ) {
        const { verificacion, uidCurso, uidClase, fileData } = datos
        const rutaModo = config.environment.mode === 'production' ? 'prod' : 'dev'

        // Crear/Actualizar el archivo contenido en Cloud Storage
        let bucketNameContenidoBorrador = rutaModo === 'prod' ? 'j-cursos-contenido-b' : 'j-cursos-contenido-b-dev'
        let bucketNameContenidoBorradorVerificacion = rutaModo === 'prod' ? 'j-cursos-contenido-bv' : 'j-cursos-contenido-bv-dev'
        await super.subirContenido({
            bucketName: !verificacion ? bucketNameContenidoBorrador : bucketNameContenidoBorradorVerificacion,
            uidCurso: uidCurso,
            uidClase: uidClase,
            fileData: fileData
        })

        return true
    }

    // ELIMINAR
    static async eliminarContenido (datos = {verificacion, uidCurso, uidClase}) {
        const { verificacion, uidCurso, uidClase } = datos
        const rutaModo = config.environment.mode === 'production' ? 'prod' : 'dev'
        
        // Eliminar el archivo contenido de Cloud Storage
        let bucketNameContenidoBorrador = rutaModo === 'prod' ? 'j-cursos-contenido-b' : 'j-cursos-contenido-b-dev'
        let bucketNameContenidoBorradorVerificacion = rutaModo === 'prod' ? 'j-cursos-contenido-bv' : 'j-cursos-contenido-bv-dev'
        await super.eliminarContenido({
            bucketName: !verificacion ? bucketNameContenidoBorrador : bucketNameContenidoBorradorVerificacion,
            uidCurso: uidCurso,
            uidClase: uidClase,
        })

        return true
    }

    static async generarUrlVideoClase (datos = {verificacion, uidCurso, uidClase}) {
        const { verificacion, uidCurso, uidClase } = datos
        const rutaModo = config.environment.mode === 'production' ? 'prod' : 'dev'

        let bucketNameContenidoBorrador = rutaModo === 'prod' ? 'j-cursos-contenido-b' : 'j-cursos-contenido-b-dev'
        let bucketNameContenidoBorradorVerificacion = rutaModo === 'prod' ? 'j-cursos-contenido-bv' : 'j-cursos-contenido-bv-dev'
        const url = await super.generarUrlVideoClase({
            bucketName: !verificacion ? bucketNameContenidoBorrador : bucketNameContenidoBorradorVerificacion,
            uidCurso: uidCurso,
            uidClase: uidClase,
        })
        
        return url
    }

    static async obtenerArticuloClase (datos = {verificacion, uidCurso, uidClase, getMarkdown}) {
        const { verificacion, uidCurso, uidClase, getMarkdown } = datos
        const rutaModo = config.environment.mode === 'production' ? 'prod' : 'dev'
        let bucketNameContenidoBorrador = rutaModo === 'prod' ? 'j-cursos-contenido-b' : 'j-cursos-contenido-b-dev'
        let bucketNameContenidoBorradorVerificacion = rutaModo === 'prod' ? 'j-cursos-contenido-bv' : 'j-cursos-contenido-bv-dev'

        const articulo = await super.obtenerArticuloClase({
            bucketName: !verificacion ? bucketNameContenidoBorrador : bucketNameContenidoBorradorVerificacion,
            uidCurso: uidCurso,
            uidClase: uidClase,
            getMarkdown: getMarkdown
        })

        return articulo
    }
}

module.exports = ContenidoClaseBorrador