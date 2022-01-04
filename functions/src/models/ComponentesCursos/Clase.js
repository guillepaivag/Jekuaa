const configJekuaa = require("../../../configJekuaa")
const db = require("../../../db")
const admin = require("../../../firebase-service")
const DatosContenido_Clase = require("./helpers/DatosContenido_Clase")

const COLECCION_CURSOS = 'Cursos'
const COLECCION_UNIDAD = 'UnidadCurso'
const COLECCION_CLASES = 'ClasesCurso'

class Clase {
    constructor (datos = {}) {
        const {
            uid, referencia, ordenClase, titulo, 
            descripcion, esGratis, unidad, 
            datosContenidoClase, duracionClase
        } = datos
    
        this.uid = uid ? uid : db.collection().doc().id
        this.referencia = referencia ? referencia : ''
        this.ordenClase = ordenClase ? ordenClase : 0
        this.titulo = titulo ?  titulo : ''
        this.descripcion = descripcion ?  descripcion : ''
        this.esGratis = esGratis ? esGratis : true
        this.unidad = unidad ? unidad : 0
        this.datosContenidoClase = datosContenidoClase ? datosContenidoClase : new DatosContenido_Clase()
        this.duracionClase = duracionClase ? duracionClase : 0
    }

    getClase ( getJSON ) {
        if ( getJSON ) {
            return JSON.parse( JSON.stringify( this ) )
        }

        return this
    }

    setClase (clase = {}) {
        const {
            uid, referencia, ordenClase, titulo, 
            descripcion, esGratis, unidad, 
            datosContenidoClase, duracionClase
        } = datos

        this.setUid(uid)
        this.setReferencia(referencia)
        this.setOrdenClase(ordenClase)
        this.setTitulo(titulo)
        this.setDescripcion(descripcion)
        this.setEsGratis(esGratis)
        this.setUnidad(unidad)
        this.setDatosContenidoClase(datosContenidoClase)
        this.setDuracionClase(duracionClase)

        return this
    }

    setUid (uid = db.collection().doc().id) {
        this.uid = uid
        return this
    }

    setReferencia (referencia = '') {
        this.referencia = referencia
        return this
    }

    setOrdenClase (ordenClase = 0) {
        this.ordenClase = ordenClase
        return this
    }

    setTitulo (titulo = '') {
        this.titulo = titulo
        return this
    }

    setDescripcion (descripcion = '') {
        this.descripcion = descripcion
        return this
    }

    setEsGratis (esGratis = true) {
        this.esGratis = esGratis
        return this
    }

    setUnidad (unidad = 0) {
        this.unidad = unidad
        return this
    }

    setDatosContenidoClase (datosContenidoClase = new DatosContenido_Clase()) {
        this.datosContenidoClase = datosContenidoClase
        return this
    }

    setDuracionClase (duracionClase = 0) {
        this.duracionClase = duracionClase
        return this
    }

    async importarClasePorUID (uidCurso, uidClase) {
        const doc = await db.collection(COLECCION_CURSOS).doc( uidCurso )
        .collection(COLECCION_CLASES).doc( uidClase )
        .get()

        this.setClase(doc.data())

        return this
    }

    async agregar (uidCurso) {
        const clase = this.getClase( true )

        await db.collection(COLECCION_CURSOS).doc( uidCurso )
        .collection(COLECCION_CLASES).add(clase)

        return this
    }

    async actualizar (uidCurso, datosActualizados) {
        await db.collection(COLECCION_CURSOS).doc( uidCurso )
        .collection(COLECCION_CLASES).doc(this.uid).update(datosActualizados)

        return this
    }

    async eliminar (uidCurso) {
        await db.collection(COLECCION_CURSOS).doc( uidCurso )
        .collection(COLECCION_CLASES).doc(this.uid).delete()

        return this
    }

    async subirArchivo ( uidCurso, rutaArchivoTemp ) {
        const bucket = admin.storage().bucket('jekuaa-cursos')
        
        const nombreArchivo = 'archivo'
        const extensionArchivo = this.datosContenidoClase.extensionArchivo

        const rutaModo = configJekuaa.environment.mode === 'production' ? 'prod' : 'dev'
        const rutaClase = `${rutaModo}/${uidCurso}/clases/${this.uid}/${nombreArchivo}.${extensionArchivo}`
        const response = await bucket.upload(rutaArchivoTemp, {
            destination: rutaClase,
            uploadType: 'media',
            metadata: {
                metadata: {
                    contentType: `.${extensionArchivo}`
                }
            }
        })
        
        return response
    }

    async existeArchivo ( uidCurso ) {
        const bucket = admin.storage().bucket('jekuaa-cursos')

        const nombreArchivo = 'archivo'
        const extensionArchivo = this.datosContenidoClase.extensionArchivo
        
        const rutaModo = configJekuaa.environment.mode === 'production' ? 'prod' : 'dev'
        const rutaClase = `${rutaModo}/${uidCurso}/clases/${this.uid}/${nombreArchivo}.${extensionArchivo}`
        const file = bucket.file(rutaClase)

        const existe = (await file.exists())[0]

        return existe
    }

    async eliminarArchivo ( uidCurso ) {
        const bucket = admin.storage().bucket('jekuaa-cursos')
        
        const rutaModo = configJekuaa.environment.mode === 'production' ? 'prod' : 'dev'
        const nombreArchivo = 'archivo'
        const extensionArchivo = this.datosContenidoClase.extensionArchivo

        const rutaClase = `${rutaModo}/${uidCurso}/clases/${this.uid}/${nombreArchivo}.${extensionArchivo}`
        const resultado = await bucket.deleteFiles({ prefix: rutaClase })

        return resultado
    }

    static async obtenerClases ( uidCurso ) {
        const docs = await db.collection(COLECCION_CURSOS).doc( uidCurso )
        .collection(COLECCION_CLASES).get()

        let clases = []
        for (let i = 0; i < docs.docs.length; i++) {
            const doc = docs.docs[i]
            clases.push(doc.data())
        }

        return clases
    }
}

module.exports = Clase