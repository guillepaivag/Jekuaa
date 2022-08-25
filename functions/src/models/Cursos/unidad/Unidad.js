const admin = require('../../../../firebase-service')
const db = require('../../../../db')

const COLECCION_UNIDAD = 'UnidadesCurso'

class Unidad {
    constructor (datos = {}) {
        const {
            uid,
            ordenUnidad,
            nombreUnidad,
            cantidadClases,
            duracion,
        } = datos
        
        this.uid = uid ? uid : db.collection(COLECCION_UNIDAD).doc().id
        this.ordenUnidad = ordenUnidad ? ordenUnidad : 0
        this.nombreUnidad = nombreUnidad ? nombreUnidad : ''
        this.cantidadClases = cantidadClases ? cantidadClases : 0
        this.duracion = duracion ? duracion : 0
    }

    getUnidad ( ) {
        return {
            uid: this.uid,
            ordenUnidad: this.ordenUnidad,
            nombreUnidad: this.nombreUnidad,
            cantidadClases: this.cantidadClases,
            duracion: this.duracion,
        }
    }

    setUnidad (datos = {}) {
        this.setUid( datos.uid )
        this.setOrdenUnidad( datos.ordenUnidad )
        this.setNombreUnidad( datos.nombreUnidad )
        this.setCantidadClases( datos.cantidadClases )
        this.setDuracion( datos.duracion )
    }

    setUid (uid = db.collection(COLECCION_UNIDAD).doc().id) {
        this.uid = uid
        return this
    }

    setOrdenUnidad (ordenUnidad = 0) {
        this.ordenUnidad = ordenUnidad
        return this
    }

    setNombreUnidad (nombreUnidad = '') {
        this.nombreUnidad = nombreUnidad
        return this
    }

    setCantidadClases (cantidadClases = 0) {
        this.cantidadClases = cantidadClases
        return this
    }

    setDuracion ( duracion = 0 ) {
        this.duracion = duracion
        return this
    }

}

module.exports = Unidad