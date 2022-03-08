const db = require("../../../../db");
const Clase = require("./Clase");

const COLLECTION_CLASES_BORRADOR = 'ClasesBorrador'

class ClaseBorrador extends Clase {
    constructor ( datos = {} ) {
        super(datos)
        this.mensajesError = datos.mensajesError ? datos.mensajesError : []
        this.estadoDocumento = datos.estadoDocumento ? datos.estadoDocumento : ''
    }

    getClaseBorrador () {
        return {
            ...super.getClase(),
            mensajesError: this.mensajesError,
            estadoDocumento: this.estadoDocumento,
        }
    }

    setClaseBorrador ( datos = {} ) {
        this.setClase(datos)
        this.setMensajesError(datos.mensajesError)
        this.setEstadoDocumento(datos.estadoDocumento)
    }

    setClase ( clase = new Clase() ) {
        super.setClase( clase )
    }
    
    setMensajesError ( mensajesError = [] ) {
        this.mensajesError = mensajesError
    }

    setEstadoDocumento ( estadoDocumento = '' ) {
        this.estadoDocumento = estadoDocumento
    }



    async importarClasePorUID ( uidCurso = '', uidUnidad = '', uidClase = '' ) {
        const doc = await db
        .collection('CursosBorrador').doc( uidCurso )
        .collection('UnidadesBorrador').doc( uidUnidad )
        .collection(COLLECTION_CLASES_BORRADOR).doc( uidClase )
        .get()

        if (!doc.exists) return null

        this.setClaseBorrador(doc.data())

        return this
    }














    /**
     * DOCUMENTO DE CLASES
    */

    static async agregar (uidCurso = '', uidUnidad = '', claseBorrador = new ClaseBorrador()) {
        await db
        .collection('CursosBorrador').doc(uidCurso)
        .collection('UnidadesBorrador').doc(uidUnidad)
        .collection(COLLECTION_CLASES_BORRADOR).doc(claseBorrador.uid)
        .set( claseBorrador.getClaseBorrador() )

        return true
    }
    
    static async actualizar (uidCurso = '', uidUnidad = '', uidClase = '', datosActualizados) {
        await db
        .collection('CursosBorrador').doc(uidCurso)
        .collection('UnidadesBorrador').doc(uidUnidad)
        .collection(COLLECTION_CLASES_BORRADOR).doc(uidClase)
        .update( datosActualizados )

        return true
    }

    static async eliminar ( uidCurso = '', uidUnidad = '', uidClase = '' ) {
        await db
        .collection('CursosBorrador').doc(uidCurso)
        .collection('UnidadesBorrador').doc(uidUnidad)
        .collection(COLLECTION_CLASES_BORRADOR).doc(uidClase)
        .delete()

        return true
    }

    static async obtenerClases ( uidCurso = '', uidUnidad = '' ) {
        const snapshot = await db
        .collection('CursosBorrador').doc(uidCurso)
        .collection('UnidadesBorrador').doc(uidUnidad)
        .collection(COLLECTION_CLASES_BORRADOR)
        .get()

        if (snapshot.empty) return []

        const docs = snapshot.docs
        let clases = []
        for (let i = 0; i < docs.length; i++) {
            const doc = docs[i]
            clases.push(doc.data())
        }

        return clases
    }


    static async obtenerUltimaClasePorCursoUnidad ( uidCurso = '', uidUnidad = '' ) {
        const snapshot = await db
        .collection('CursosBorrador').doc( uidCurso )
        .collection('UnidadesBorrador').doc( uidUnidad )
        .collection(COLLECTION_CLASES_BORRADOR).orderBy('ordenClase', 'desc').limit(1)
        .get()

        return snapshot.docs.length ? new ClaseBorrador(snapshot.docs[0].data()) : null
    }

}

module.exports = ClaseBorrador