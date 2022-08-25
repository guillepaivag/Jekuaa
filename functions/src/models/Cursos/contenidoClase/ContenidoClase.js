const admin = require("../../../../firebase-service")
const db = require("../../../../db")

class ContenidoClase {
    constructor ( datos = {} ) {
        const {
            uid,
            tipoContenido,
        } = datos

        this.uid = uid ? uid : ''
        this.tipoContenido = tipoContenido ? tipoContenido : ''
    }

    getContenidoClase () {
        return {
            uid: this.uid,
            tipoContenido: this.tipoContenido,
        }
    }

    setContenidoClase ( datos = {} ) {
        this.setUid( datos.uid )
        this.setTipoContenido( datos.tipoContenido )
    }

    setUid ( uid = '' ) {
        this.uid = uid
    } 

    setTipoContenido ( tipoContenido = '' ) {
        this.tipoContenido = tipoContenido
    } 

    /* Documentos */
    static async agregarDocumentoBorrador ( uidCurso = '', contenidoClase = {} ) {
        await db
        .collection('CursosBorrador').doc( uidCurso )
        .collection('ContenidoClasesBorrador').doc( contenidoClase.uid )
        .set( contenidoClase )

        return true
    }

    static async agregarDocumentoPublicado ( uidCurso = '', contenidoClase = {} ) {
        await db
        .collection('CursosPublicado').doc( uidCurso )
        .collection('ContenidoClasesPublicado').doc( contenidoClase.uid )
        .set( contenidoClase )

        return true
    }

    static async obtenerDocumentoBorrador (uidCurso = '', uidClase = '') {
        const doc = await db
        .collection('CursosBorrador').doc( uidCurso )
        .collection('ContenidoClasesBorrador').doc( uidClase )
        .get()

        if (!doc.exists) return null

        return {
            tipoContenido: String(doc.data().tipoContenido),
            contenidoClase: doc.data()
        }
    }

    static async obtenerDocumentoPublicado (uidCurso = '', uidClase = '') {
        const doc = await db
        .collection('CursosPublicado').doc( uidCurso )
        .collection('ContenidoClasesPublicado').doc( uidClase )
        .get()

        if (!doc.exists) return null

        return {
            tipoContenido: String(doc.data().tipoContenido),
            contenidoClase: doc.data()
        }
    }

    static async actualizarDocumentoBorrador ( uidCurso = '', uidClase = '', datosActualizados = {} ) {
        await db
        .collection('CursosBorrador').doc( uidCurso )
        .collection('ContenidoClasesBorrador').doc( uidClase )
        .update(datosActualizados)

        return true
    }

    static async actualizarDocumentoPublicado ( uidCurso = '', uidClase = '', datosActualizados = {} ) {
        await db
        .collection('CursosPublicado').doc( uidCurso )
        .collection('ContenidoClasesPublicado').doc( uidClase )
        .update(datosActualizados)

        return true
    }

    static async eliminarDocumentoBorrador ( uidCurso = '', uidClase = ''  ) {        
        await db
        .collection('CursosBorrador').doc( uidCurso )
        .collection('ContenidoClasesBorrador').doc( uidClase )
        .delete()

        return true
    }

    static async eliminarDocumentoPublicado ( uidCurso = '', uidClase = ''  ) {        
        await db
        .collection('CursosPublicado').doc( uidCurso )
        .collection('ContenidoClasesPublicado').doc( uidClase )
        .delete()

        return true
    }

    static async tieneErroresBorrador ( uidCurso = '' ) {
        const snapshot = await db
        .collection('CursosBorrador').doc(uidCurso)
        .collection('ContenidoClasesBorrador').where('contieneErrores', '==', true).limit(1)
        .get()

        return !!snapshot.docs.length
    }


    /* Archivos */
    static async subirContenidoArchivo (datos = { bucketName, rutaDestino, fileData }) {
        const { bucketName, rutaDestino, fileData } = datos
        const { rutaArchivoTemp, extensionArchivo, } = fileData

        const bucket = admin.storage().bucket(bucketName)

        const response = await bucket.upload(rutaArchivoTemp, {
            destination: rutaDestino,
            uploadType: 'media',
            metadata: {
                metadata: {
                    contentType: `.${extensionArchivo}`
                }
            }
        })
 
        return response
    }
    
    static async moverContenidoArchivo (datos = {bucketOrigin, bucketDestination, rutaOrigin, rutaDestination}) {
        const { bucketOrigin, bucketDestination, rutaOrigin, rutaDestination } = datos

        const storage = admin.storage()

        const bucket1 = storage.bucket(bucketOrigin)
        const file1 = bucket1.file(rutaOrigin)

        const bucket2 = storage.bucket(bucketDestination)
        const file2 = bucket2.file(rutaDestination)

        await file1.move(file2)
    }

    static async eliminarContenidoArchivo ( datos = { bucketName, rutaPrefix } ) {
        const { bucketName, rutaPrefix } = datos
    
        const bucket = admin.storage().bucket(bucketName)
        await bucket.deleteFiles({ prefix: rutaPrefix })
    }
}

module.exports = ContenidoClase