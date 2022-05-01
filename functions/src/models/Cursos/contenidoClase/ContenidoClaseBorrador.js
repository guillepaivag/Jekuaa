const ContenidoClase = require("./ContenidoClase")
const timestamp = require('../../../utils/timestamp')
const admin = require("../../../../firebase-service")
const config = require("../../../../config")
const db = require("../../../../db")

/**
 *  estadoArchivo: '', 'procesando'
 */

const COLECCION_CONTENIDO_CLASE = 'ContenidoClasesBorrador'

class ContenidoClaseBorrador extends ContenidoClase {
    constructor (datos = {}) {
        super(datos)
        this.mensajesError = datos.mensajesError ? datos.mensajesError : []
        this.contieneErrores = datos.contieneErrores ? datos.contieneErrores : false
        this.estadoDocumento = datos.estadoDocumento ? datos.estadoDocumento : ''
        this.estadoArchivo = datos.estadoArchivo ? datos.estadoArchivo : ''
    }

    getContenidoClaseBorrador () {
        return {
            ...super.getContenidoClase(),
            mensajesError: this.mensajesError,
            contieneErrores: this.contieneErrores,
            estadoDocumento: this.estadoDocumento,
            estadoArchivo: this.estadoArchivo,
        }
    }

    setContenidoClaseBorrador ( datos = {} ) {
        this.setContenidoClase(datos)
        this.setMensajesError(datos.mensajesError)
        this.setContieneErrores(datos.contieneErrores)
        this.setEstadoDocumento(datos.estadoDocumento)
        this.setEstadoArchivo(datos.estadoArchivo)
    }

    setContenidoClase ( contenidoClase = new ContenidoClase() ) {
        super.setContenidoClase( contenidoClase )
    }

    setMensajesError ( mensajesError = [] ) {
        this.mensajesError = mensajesError
    }

    setContieneErrores ( contieneErrores = false ) {
        this.contieneErrores = contieneErrores
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
        let bucketNameContenidoBorrador = rutaModo === 'prod' ? 'prod-j-cursos-contenido-b' : 'dev-j-cursos-contenido-b'
        let bucketNameContenidoBorradorVerificacion = rutaModo === 'prod' ? 'prod-j-cursos-contenido-bv' : 'dev-j-cursos-contenido-bv'
        await super.subirContenido({
            bucketName: !verificacion ? bucketNameContenidoBorrador : bucketNameContenidoBorradorVerificacion,
            uidCurso: uidCurso,
            uidClase: uidClase,
            fileData: fileData
        })
    }

    // ELIMINAR
    static async eliminarContenidoPrefix (datos = {verificacion, rutaContenidoPrefix}) {
        const { verificacion, rutaContenidoPrefix } = datos
        const rutaModo = config.environment.mode === 'production' ? 'prod' : 'dev'
        
        // Eliminar el archivo contenido de Cloud Storage
        let bucketNameContenidoBorrador = rutaModo === 'prod' ? 'prod-j-cursos-contenido-b' : 'dev-j-cursos-contenido-b'
        let bucketNameContenidoBorradorVerificacion = rutaModo === 'prod' ? 'prod-j-cursos-contenido-bv' : 'dev-j-cursos-contenido-bv'

        await super.eliminarContenidoPrefix({
            bucketName: !verificacion ? bucketNameContenidoBorrador : bucketNameContenidoBorradorVerificacion,
            rutaContenidoPrefix: rutaContenidoPrefix
        })
    }

    // GENERAR URL VIDEO
    static async generarUrlVideoClase (datos = {verificacion, uidCurso, uidClase}) {
        const { verificacion, uidCurso, uidClase } = datos
        
        const rutaModo = config.environment.mode === 'production' ? 'prod' : 'dev'
        let bucketNameContenidoBorrador = rutaModo === 'prod' ? 'prod-j-cursos-contenido-b' : 'dev-j-cursos-contenido-b'
        let bucketNameContenidoBorradorVerificacion = rutaModo === 'prod' ? 'prod-j-cursos-contenido-bv' : 'dev-j-cursos-contenido-bv'

        const contenidoClaseBorrador = new ContenidoClaseBorrador()
        await contenidoClaseBorrador.importarContenidoClasePorUID(uidCurso, uidClase)
        const rutaStorage = `${uidCurso}/${uidClase}/${contenidoClaseBorrador.fileName}`

        const url = await super.generarUrlVideoClasePrefix({
            bucketName: !verificacion ? bucketNameContenidoBorrador : bucketNameContenidoBorradorVerificacion,
            rutaContenidoPrefix: rutaStorage
        })
        
        return url
    }

    // OBTENER ARTICULO
    static async obtenerArticuloClase (datos = {verificacion, uidCurso, uidClase, getMarkdown}) {
        const { verificacion, uidCurso, uidClase, getMarkdown } = datos
        const rutaModo = config.environment.mode === 'production' ? 'prod' : 'dev'
        let bucketNameContenidoBorrador = rutaModo === 'prod' ? 'prod-j-cursos-contenido-b' : 'dev-j-cursos-contenido-b'
        let bucketNameContenidoBorradorVerificacion = rutaModo === 'prod' ? 'prod-j-cursos-contenido-bv' : 'dev-j-cursos-contenido-bv'

        const rutaStorage = `${uidCurso}/${uidClase}/articulo.md`
        const articulo = await super.obtenerArticuloClasePrefix({
            bucketName: !verificacion ? bucketNameContenidoBorrador : bucketNameContenidoBorradorVerificacion,
            rutaContenidoPrefix: rutaStorage,
            getMarkdown: getMarkdown
        })

        return articulo
    }

    // VERFICADOR DE EXISTENCIA DE ERRORES
    static async tieneErrores ( uidCurso = '' ) {
        const snapshot = await db
        .collection('CursosBorrador').doc(uidCurso)
        .collection(COLECCION_CONTENIDO_CLASE).where('contieneErrores', '==', true).limit(1)
        .get()

        return !!snapshot.docs.length
    }
}

module.exports = ContenidoClaseBorrador