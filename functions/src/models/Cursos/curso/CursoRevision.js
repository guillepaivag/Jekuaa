const admin = require('../../../../firebase-service')
const db = require('../../../../db')
const { milliseconds_a_timestamp } = require('../../../utils/timestamp')
const CursoBorrador = require('./CursoBorrador')

const COLECCION = 'CursosRevision'

/**
 * ESTADOS:
 * espera
 * revision
 * rechazado
 * aceptado
 * ------------
 * datosCurso: {
 *  uid,
 *  responsable,
 *  equipo
 * }
 */

class CursoRevision {
    constructor (datos = {}) {
        const { 
            uid,
            esNuevo,
            activado,
            datosCurso,
            estadoModeracion, 
            estadoPublicacion, 
            fechaInicioRevision,
        } = datos

        this.uid = uid ? uid : ''
        this.esNuevo = esNuevo !== undefined ? esNuevo : false
        this.activado = activado !== undefined ? activado : false
        this.datosCurso = datosCurso ? datosCurso : {
            uid: '',
            responsable: '',
            equipo: '',
        }
        this.estadoModeracion = estadoModeracion ? estadoModeracion : {
            estado: 'espera',
            mensaje: '',
            fechaRespuesta: null
        }
        this.estadoPublicacion = estadoPublicacion ? estadoPublicacion : ''
        this.fechaInicioRevision = fechaInicioRevision ? fechaInicioRevision : null
    }


    getRevision () {
        return {
            uid: this.uid,
            esNuevo: this.esNuevo,
            activado: this.activado,
            datosCurso: this.datosCurso,
            estadoModeracion: this.estadoModeracion,
            estadoPublicacion: this.estadoPublicacion,
            fechaInicioRevision: this.fechaInicioRevision,
        }
    }

    setRevision (datos = {}) {
        const { 
            uid,
            esNuevo,
            activado,
            datosCurso,
            estadoModeracion, 
            estadoPublicacion, 
            fechaInicioRevision,
        } = datos

        this.setUID(uid)
        this.setEsNuevo(esNuevo)
        this.setActivado(activado)
        this.setDatosCurso(datosCurso)
        this.setEstadoModeracion(estadoModeracion)
        this.setEstadoPublicacion(estadoPublicacion)
        this.setFechaInicioRevision(fechaInicioRevision)
    }

    setUID (uid = '') {
        this.uid = uid
    }

    setEsNuevo (esNuevo = false) {
        this.esNuevo = esNuevo
    }

    setActivado (activado = false) {
        this.activado = activado
    }

    setDatosCurso (datosCurso = { uid: '', responsable: '', equipo: '' }) {
        this.datosCurso = datosCurso
    }

    setEstadoModeracion (estadoModeracion = { estado: 'espera', mensaje: '', fechaRespuesta: null }) {
        this.estadoModeracion = estadoModeracion
    }

    setEstadoPublicacion (estadoPublicacion = '') {
        this.estadoPublicacion = estadoPublicacion
    }

    setFechaInicioRevision (fechaInicioRevision = null) {
        this.fechaInicioRevision = fechaInicioRevision
    }

    async importarDatosDeUnCursoRevision ( uidCurso = '' ) {       
        const doc = await db
        .collection(COLECCION).doc(uidCurso)
        .get()

        if (!doc.exists) return null

        let datos = doc.data()

        this.setRevision( datos )

        return this
    }


    

    static async esRevisionActivada ( uidCurso = '' ) {
        const doc = await db.collection(COLECCION).doc(uidCurso).get()

        if (!doc.exists) return false

        const revision = new CursoRevision(doc.data())

        return !!revision.activado
    }

    static async obtenerInformacionDeRevision ( uidCurso = '' ) {
        const doc = await db.collection(COLECCION).doc(uidCurso).get()

        if (!doc.exists) return null

        const revision = new CursoRevision(doc.data())

        return revision.estadoModeracion
    }

    static async crearNuevaRevision ( uidCurso = '' ) {
        const revision = new CursoRevision()
        const docRevision = await db.collection(COLECCION).doc(uidCurso).get()
        const docCursoBorrador = await db.collection('CursosBorrador').doc(uidCurso).get()
        const cursoBorrador = new CursoBorrador(docCursoBorrador.data())

        revision.uid = uidCurso
        revision.esNuevo = !docRevision.exists
        revision.activado = true
        revision.datosCurso = {
            uid: cursoBorrador.uid,
            responsable: cursoBorrador.responsable,
            equipo: cursoBorrador.equipo,
        }
        revision.estadoModeracion = {
            estado: 'espera',
            mensaje: '',
            fechaRespuesta: null
        }
        revision.estadoPublicacion = ''
        revision.fechaInicioRevision = milliseconds_a_timestamp( Date.now() )

        await db.collection(COLECCION).doc(uidCurso).set(revision.getRevision())

        return true
    }

    static async activarRevision ( uidCurso = '', activar = false ) {
        await db.collection(COLECCION).doc(uidCurso).update({
            activado: activar
        })
        return true
    }
    
    static async actualizarRevision ( uidCurso = '', datosActualizados = {} ) {
        await db.collection(COLECCION).doc(uidCurso).update(datosActualizados)
        return true
    }
    
    static async eliminarRevision ( uidCurso = '' ) {
        await db.collection(COLECCION).doc(uidCurso).delete()
        return true
    }

    static async aceptarCursoPorModeracion ( uidCurso = '', mensaje = '' ) {
        const estadoModeracion = {
            estado: !mensaje.length ? 'aceptado' : 'rechazado',
            mensaje: !mensaje.length ? '' : mensaje,
            fechaRespuesta: milliseconds_a_timestamp( Date.now() )
        }
        
        await db.collection(COLECCION).doc(uidCurso).update({
            activado: false,
            estadoModeracion,
            estadoPublicacion: !mensaje.length ? 'proceso' : ''
        })
    
        return true
    }
}

module.exports = CursoRevision