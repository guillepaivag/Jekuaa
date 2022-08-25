const db = require("../../../../db");

const Clase = require("./Clase");

const COLECCION = 'ClasesPublicado'

class ClasePublicado extends Clase {
    constructor (datos = {}) {
        const {
            fechaCreacion,      // a
            fechaActualizacion, // a
        } = datos
        
        super(datos)
        this.fechaCreacion = fechaCreacion ? fechaCreacion : null
        this.fechaActualizacion = fechaActualizacion ? fechaActualizacion : null
    }


    getClasePublicado () {
        return {
            ...super.getClase(),
            fechaCreacion: this.fechaCreacion,
            fechaActualizacion: this.fechaActualizacion
        }
    }

    setClasePublicado (datos = {}) {
        this.setClase(datos)
        this.setFechaCreacion( datos.fechaCreacion )
        this.setFechaActualizacion( datos.fechaActualizacion )

        return this
    }

    setClase ( clase = new Clase() ) {
        super.setClase( clase )
    }

    setFechaCreacion ( fechaCreacion = null ) {
        this.fechaCreacion = fechaCreacion
    }

    setFechaActualizacion ( fechaActualizacion = null ) {
        this.fechaActualizacion = fechaActualizacion
    }

    async importarClasePorUID ( uidCurso = '', uidUnidad = '', uidClase = '' ) {
        const doc = await db
        .collection('CursosPublicado').doc( uidCurso )
        .collection('UnidadesPublicado').doc( uidUnidad )
        .collection(COLECCION).doc( uidClase )
        .get()

        if (!doc.exists) return null

        this.setClasePublicado(doc.data())

        return this
    }





    static async agregar (uidCurso = '', uidUnidad = '', clasePublicado = new ClasePublicado()) {
        await db
        .collection('CursosPublicado').doc(uidCurso)
        .collection('UnidadesPublicado').doc(uidUnidad)
        .collection(COLECCION).doc(clasePublicado.uid)
        .set( clasePublicado.getClasePublicado() )

        return true
    }

    static async obtenerPorUidClase ( uidClase = '' ) {
        const snapshot = await db
        .collectionGroup(COLECCION).where('uid', '==', uidClase)
        .get()

        if (snapshot.empty) return null

        const clasePublicado = new ClasePublicado()
        return clasePublicado.setClasePublicado(snapshot.docs[0].data())
    }
    
    static async actualizar (uidCurso = '', uidUnidad = '', uidClase = '', datosActualizados) {
        await db
        .collection('CursosPublicado').doc(uidCurso)
        .collection('UnidadesPublicado').doc(uidUnidad)
        .collection(COLECCION).doc(uidClase)
        .update( datosActualizados )

        return true
    }

    static async eliminar ( uidCurso = '', uidUnidad = '', uidClase = '' ) {
        await db
        .collection('CursosPublicado').doc(uidCurso)
        .collection('UnidadesPublicado').doc(uidUnidad)
        .collection(COLECCION).doc(uidClase)
        .delete()

        return true
    }
}

module.exports = ClasePublicado