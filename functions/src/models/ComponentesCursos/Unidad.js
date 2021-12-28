const admin = require('../../../firebase-service')
const db = require('../../../db')

const COLECCION_CURSOS = 'Cursos'
const COLECCION_UNIDAD = 'UnidadCurso'

class Unidad {
    constructor (datos = {}) {
        const {
            uid,
            ordenUnidad,
            nombreUnidad,
            cantidadClases,
        } = datos
        
        this.uid = uid ? uid : db.collection(COLECCION_CURSOS).doc().id
        this.ordenUnidad = ordenUnidad ? ordenUnidad : 0
        this.nombreUnidad = nombreUnidad ? nombreUnidad : ''
        this.cantidadClases = cantidadClases ? cantidadClases : 0
    }

    getUnidad ( getJSON ) {
        if ( getJSON ) {
            return JSON.parse( JSON.stringify( this ) )
        }

        return this
    }

    setUnidad (datos = {}) {
        this.setUid (datos.uid)
        this.setOrdenUnidad (datos.ordenUnidad)
        this.setNombreUnidad (datos.nombreUnidad)
        this.setCantidadClases (datos.cantidadClases)
    }

    setUid (uid = db.collection(COLECCION_CURSOS).doc().id) {
        this.uid = uid
    }

    setOrdenUnidad (ordenUnidad = 0) {
        this.ordenUnidad = ordenUnidad
    }

    setNombreUnidad (nombreUnidad = '') {
        this.nombreUnidad = nombreUnidad
    }

    setCantidadClases (cantidadClases = 0) {
        this.cantidadClases = cantidadClases
    }

    async importarUnidadPorUID (uidCurso, uidUnidad) {
        const doc = await db.collection(COLECCION_CURSOS).doc( uidCurso )
        .collection(COLECCION_UNIDAD).doc( uidUnidad )
        .get()

        this.setUnidad(doc.data())

        return this
    }

    async agregar ( uidCurso ) {
        const unidad = this.getUnidad( true )
        
        await db.collection(COLECCION_CURSOS).doc( uidCurso )
        .collection(COLECCION_UNIDAD).add(unidad)

        return this
    }

    async actualizar ( uidCurso, datosActualizados ) {
        await db.collection(COLECCION_CURSOS).doc( uidCurso )
        .collection(COLECCION_UNIDAD).doc(this.uid).update(datosActualizados)

        return this
    }

    async eliminar ( uidCurso ) {
        await db.collection(COLECCION_CURSOS).doc( uidCurso )
        .collection(COLECCION_UNIDAD).doc(this.uid).delete()

        return this
    }

    static async obtenerUnidades ( uidCurso ) {
        const docs = await db.collection(COLECCION_CURSOS).doc( uidCurso )
        .collection(COLECCION_UNIDAD).get()

        let unidades = []
        for (let i = 0; i < docs.docs.length; i++) {
            const doc = docs.docs[i]
            unidades.push(doc.data())
        }

        return unidades
    }
}

module.exports = Unidad