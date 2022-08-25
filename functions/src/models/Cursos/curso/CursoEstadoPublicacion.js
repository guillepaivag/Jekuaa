const admin = require('../../../../firebase-service')
const db = require('../../../../db')

const COLECCION = 'CursosEstadoPublicacion'

class CursoEstadoPublicacion {
    constructor (datos = {}) {
        const { uid, estado, fechaSolicitud, fechaPublicado } = datos

        this.uid = uid ? uid : ''
        this.estado = estado ? estado : false
        this.fechaSolicitud = fechaSolicitud ? fechaSolicitud : null
        this.fechaPublicado = fechaPublicado ? fechaPublicado : null
    }


    getCursoEstadoPublicacion () {
        return {
            uid: this.uid,
            estado: this.estado,
            fechaSolicitud: this.fechaSolicitud,
            fechaPublicado: this.fechaPublicado,
        }
    }


    setCursoEstadoPublicacion (datos = {}) {
        const { uid, estado, fechaSolicitud, fechaPublicado } = datos

        this.setUid(uid)
        this.setEstado(estado)
        this.setFechaSolicitud(fechaSolicitud)
        this.setFechaPublicado(fechaPublicado)
        
        return this
    }

    setUid (uid = '') {
        this.uid = uid
        return this
    }

    setEstado (estado = false) {
        this.estado = estado
        return this
    }

    setFechaSolicitud (fechaSolicitud = null) {
        this.fechaSolicitud = fechaSolicitud
        return this
    }

    setFechaPublicado (fechaPublicado = null) {
        this.fechaPublicado = fechaPublicado
        return this
    }


    async importarDatosDocumento ( uid = '' ) {       
        const doc = await db
        .collection(COLECCION).doc(uid)
        .get()

        if (!doc.exists) return null

        let datos = doc.data()

        this.setCursoEstadoPublicacion( datos )

        return this
    }








    /* 
     *    ################################
     *           METODOS ESTATICOS
     *    ################################
    */

    // CRUD Curso
    static async agregarDocumento ( cursoEstadoPublicacion = new CursoEstadoPublicacion() ) {
        const datos = cursoEstadoPublicacion.getCursoEstadoPublicacion()
        
        await db
        .collection(COLECCION).doc(cursoEstadoPublicacion.uid)
        .set(datos)

        return true
    }

    static async actualizarDocumento ( uidCurso = '', datosActualizados = {} ) {
        await db
        .collection(COLECCION).doc(uidCurso)
        .update(datosActualizados)

        return true
    }

    static async eliminarDocumento ( uidCurso = '' ) {
        await db
        .collection(COLECCION).doc(uidCurso)
        .delete()
        
        return true
    }

}

module.exports = CursoEstadoPublicacion