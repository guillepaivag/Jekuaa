const db = require("../../db")

const COLECCION = 'MisCursos'

/**
 * tipoAcceso: vistaPrevia, suscripcion, completo
 */

class MisCursos {
    constructor(data = {}) {
        const { uid, tipoAcceso, ultimaActividad, uidEstudiante, cantidadVisualizada } = data
        this.uid = uid ? uid : ''
        this.tipoAcceso = tipoAcceso ? tipoAcceso : 'vistaPrevia' // vistaPrevia, suscripcion, completo
        this.ultimaActividad = ultimaActividad ? ultimaActividad : null
        this.uidEstudiante = uidEstudiante ? uidEstudiante : ''
        this.cantidadVisualizada = cantidadVisualizada ? cantidadVisualizada : 0
    }

    getMisCursos() {
        return {
            uid: this.uid,
            tipoAcceso: this.tipoAcceso,
            ultimaActividad: this.ultimaActividad,
            uidEstudiante: this.uidEstudiante,
            cantidadVisualizada: this.cantidadVisualizada,
        }
    }

    setMisCursos(data = {}) {
        const { uid, tipoAcceso, ultimaActividad, uidEstudiante, cantidadVisualizada } = data
        this.setUid( uid )
        this.setTipoAcceso( tipoAcceso )
        this.setUltimaActividad( ultimaActividad )
        this.setUltimaActividad( uidEstudiante )
        this.setCantidadVisualizada( cantidadVisualizada )

        return this
    }

    setUid( uid = '' ) {
        this.uid = uid
        return this
    }

    setTipoAcceso( tipoAcceso = 'vistaPrevia' ) {
        this.tipoAcceso = tipoAcceso
        return this
    }

    setUltimaActividad( ultimaActividad = null ) {
        this.ultimaActividad = ultimaActividad
        return this
    }

    setUidEstudiante( uidEstudiante = '' ) {
        this.uidEstudiante = uidEstudiante
        return this
    }

    setCantidadVisualizada ( cantidadVisualizada = 0 ) {
        this.cantidadVisualizada = cantidadVisualizada
        return this
    }

    async importarMisCursos ( uidUsuario = '', uidCurso = '' ) {
        const doc = await db.collection('Usuarios').doc(uidUsuario)
        .collection(COLECCION).doc(uidCurso).get()
        if (!doc.exists) return null
        return this.setMisCursos(doc.data())
    }

    static async agregar ( uidUsuario = '', misCursos = new MisCursos() ) {
        const data = misCursos.getMisCursos()
        
        await db.collection('Usuarios').doc(uidUsuario)
        .collection(COLECCION).doc(data.uid)
        .set(data)
    }

    static async obtener ( uidUsuario = '', uidCurso = '' ) {
        const misCursos = new MisCursos()
        return await misCursos.importarMisCursos(uidUsuario, uidCurso)
    }

    static async actualizar ( uidUsuario = '', uidCurso = '', datosActualizados = {} ) {
        await db.collection('Usuarios').doc(uidUsuario)
        .collection(COLECCION).doc(uidCurso)
        .update(datosActualizados)
    }

    static async eliminar ( uidUsuario = '', uidCurso = '' ) {
        await db.collection('Usuarios').doc(uidUsuario)
        .collection(COLECCION).doc(uidCurso)
        .delete()
    }

}

module.exports = MisCursos