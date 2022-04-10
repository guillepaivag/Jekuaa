const admin = require('../../../../firebase-service')
const db = require('../../../../db')

const COLECCION = 'ElementosCursoEliminado'

class ElementoCursoEliminado {
    constructor (data = {}) {
        const { uid, tipo, datos } = data

        this.uid = uid ? uid : ''
        this.tipo = tipo ? tipo : ''
        this.datos = datos ? datos : {
            uidCurso: '',
            uidUnidad: '',
            uidClase: '',
        }
    }

    getElementoCursoEliminado () {
        return {
            uid: this.uid,
            tipo: this.tipo,
            datos: this.datos,
        }
    }

    setElementoCursoEliminado (data = {}) {
        this.setUid(data.uid)
        this.setTipo(data.tipo)
        this.setDatos(data.datos)
    }

    setUid (uid = '') {
        this.uid = uid
    }

    setTipo (tipo = '') {
        this.tipo = tipo
    }

    setDatos (datos = {uidCurso, uidUnidad, uidClase}) {
        this.datos = datos
    }


    async importarDatosDeDocumento ( uidCurso = '', uidElementoCursoEliminado = '' ) {
        const doc = await db
        .collection('CursosBorrador').doc( uidCurso )
        .collection(COLECCION).doc( uidElementoCursoEliminado )
        .get()

        if (!doc.exists) return null

        this.setElementoCursoEliminado(doc.data())

        return this
    }














    /**
     * DOCUMENTO DE CLASES
    */

    static async agregar (uidCurso = '', elementoCursoEliminado = new ElementoCursoEliminado()) {
        await db
        .collection('CursosBorrador').doc(uidCurso)
        .collection(COLECCION).doc(elementoCursoEliminado.uid)
        .set( elementoCursoEliminado.getElementoCursoEliminado() )

        return true
    }
    
    static async actualizar (uidCurso = '', uidElementoCursoEliminado = '', datosActualizados) {
        await db
        .collection('CursosBorrador').doc(uidCurso)
        .collection(COLECCION).doc(uidElementoCursoEliminado)
        .update( datosActualizados )

        return true
    }

    static async eliminar ( uidCurso = '', uidElementoCursoEliminado = '' ) {
        await db
        .collection('CursosBorrador').doc(uidCurso)
        .collection(COLECCION).doc(uidElementoCursoEliminado)
        .delete()

        return true
    }

}

module.exports = ElementoCursoEliminado