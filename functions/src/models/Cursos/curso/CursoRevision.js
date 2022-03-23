const admin = require('../../../../firebase-service')
const db = require('../../../../db')
const { milliseconds_a_timestamp } = require('../../../utils/timestamp')
const CursoBorrador = require('./CursoBorrador')

const COLECCION_CURSOS = 'CursosRevision'

/**
 * ESTADOS:
 * espera
 * revision
 * no-aceptado
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
            revision,
            datosCurso,
            estadoModeracion, 
            fechaInicioRevision,
        } = datos

        this.uid = uid ? uid : ''
        this.esNuevo = esNuevo !== undefined ? esNuevo : false
        this.revision = revision !== undefined ? revision : false
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
        this.fechaInicioRevision = fechaInicioRevision ? fechaInicioRevision : null
    }


    getRevision () {
        return {
            uid: this.uid,
            esNuevo: this.esNuevo,
            revision: this.revision,
            datosCurso: this.datosCurso,
            estadoModeracion: this.estadoModeracion,
            fechaInicioRevision: this.fechaInicioRevision,
        }
    }




    static async existeCursoRevision ( uidCurso = '' ) {
        const doc = await db.collection(COLECCION_CURSOS).doc(uidCurso).get()

        if (!doc.exists) return false

        const revision = new CursoRevision(doc.data())

        return !!revision.revision
    }

    static async obtenerInformacionDeRevision ( uidCurso = '' ) {
        const doc = await db.collection(COLECCION_CURSOS).doc(uidCurso).get()

        if (!doc.exists) return null

        const revision = new CursoRevision(doc.data())

        return revision.estadoModeracion
    }

    static async crearNuevaRevision ( uidCurso = '' ) {
        const revision = new CursoRevision()
        const docRevision = await db.collection(COLECCION_CURSOS).doc(uidCurso).get()
        const docCursoBorrador = await db.collection('CursosBorrador').doc(uidCurso).get()
        const cursoBorrador = new CursoBorrador(docCursoBorrador.data())

        revision.uid = uidCurso
        revision.esNuevo = !docRevision.exists
        revision.revision = true
        revision.datosCurso = {
            uid: cursoBorrador.uid,
            responsable: cursoBorrador.responsable,
            equipo: cursoBorrador.equipo,
        }
        revision.fechaInicioRevision = milliseconds_a_timestamp( Date.now() )

        await db.collection(COLECCION_CURSOS).doc(uidCurso).set(revision.getRevision())

        return true
    }

    static async activarRevision ( uidCurso = '', activar = false ) {
        await db.collection(COLECCION_CURSOS).doc(uidCurso).update({
            revision: activar
        })
        return true
    }
    
    static async eliminarRevision ( uidCurso = '' ) {
        await db.collection(COLECCION_CURSOS).doc(uidCurso).delete()
        return true
    }

    static async aceptarCursoPorModeracion ( uidCurso = '', mensaje = '' ) {
        const estadoModeracion = {
            estado: !mensaje.length ? 'aceptado' : 'rechazado',
            mensaje: !mensaje.length ? '' : mensaje,
            fechaRespuesta: milliseconds_a_timestamp( Date.now() )
        }
        
        await db.collection(COLECCION_CURSOS).doc(uidCurso).update({ estadoModeracion })
    
        return true
    }
}

module.exports = CursoRevision