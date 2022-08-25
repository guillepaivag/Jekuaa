const db = require("../../db")
const COLECCION = 'ProgresosClases'

class ProgresoClase {
    constructor ( data = {} ) {
        const { uidClase, uidCurso, visualizado } = data 
        this.uidClase = uidClase ? uidClase : ''
        this.uidCurso = uidCurso ? uidCurso : ''
        this.visualizado = visualizado ? visualizado : false
    }

    getProgresoClase () {
        return {
            uidClase: this.uidClase,
            uidCurso: this.uidCurso,
            visualizado: this.visualizado,
        }
    }

    setProgresoClase ( data = {} ) {
        const { uidClase, uidCurso, visualizado } = data 
        this.setUidClase (uidClase)
        this.setUidCurso (uidCurso)
        this.setVisualizado (visualizado)
        return this
    }

    setUidClase (uidClase = '') {
        this.uidClase = uidClase
        return this
    }

    setUidCurso (uidCurso = '') {
        this.uidCurso = uidCurso
        return this
    }

    setVisualizado (visualizado = false) {
        this.visualizado = visualizado
        return this
    }

    async importarProgresoClase ( uidUsuario = '', uidCurso = '', uidClase = '' ) {
        const doc = await db.collection('Usuarios').doc(uidUsuario)
        .collection('MisCursos').doc(uidCurso)
        .collection(COLECCION).doc(uidClase)
        .get()

        if (!doc.exists) return null
        return this.setProgresoClase(doc.data())
    }
    
    static async obtener ( uidUsuario = '', uidCurso = '', uidClase = '' ) {
        const progresoClase = new ProgresoClase()
        return await progresoClase.importarProgresoClase(uidUsuario, uidCurso, uidClase)
    }

    static async agregar ( uidUsuario = '', progresoClase = new ProgresoClase() ) {
        const data = progresoClase.getProgresoClase()
        
        await db.collection('Usuarios').doc(uidUsuario)
        .collection('MisCursos').doc(data.uidCurso)
        .collection(COLECCION).doc(data.uidClase)
        .set(data)
    }

    static async actualizar ( uidUsuario = '', uidCurso = '', uidClase = '', datosActualizados = {} ) {
        await db.collection('Usuarios').doc(uidUsuario)
        .collection('MisCursos').doc(uidCurso)
        .collection(COLECCION).doc(uidClase)
        .update(datosActualizados)
    }

}

module.exports = ProgresoClase