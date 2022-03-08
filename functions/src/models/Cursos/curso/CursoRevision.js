const admin = require('../../../../firebase-service')
const db = require('../../../../db')
const { milliseconds_a_timestamp } = require('../../../utils/timestamp')

const COLECCION_CURSOS = 'CursosRevision'

class CursoRevision {
    constructor (datos = {}) {
        const { 
            uid,
            refCursoBorrador,
            tipoCurso,
            revisionAdministracion, 
            revisionInstitucion,
            fechaInicioRevision,
        } = datos

        this.uid = uid ? uid : ''
        this.refCursoBorrador = refCursoBorrador ? refCursoBorrador : null
        this.tipoCurso = tipoCurso ? tipoCurso : 'instructor'
        this.revisionAdministracion = revisionAdministracion ? revisionAdministracion : {
            estado: 'revision',
            mensaje: '',
            fechaRespuesta: null
        }
        this.revisionInstitucion = revisionInstitucion ? revisionInstitucion : {
            estado: 'revision',
            mensaje: '',
            fechaRespuesta: null
        }
        this.fechaInicioRevision = fechaInicioRevision ? fechaInicioRevision : null
    }


    getRevision () {
        return {
            uid: this.uid,
            refCursoBorrador: this.refCursoBorrador,
            tipoCurso: this.tipoCurso,
            revisionAdministracion: this.revisionAdministracion,
            revisionInstitucion: this.revisionInstitucion,
            fechaInicioRevision: this.fechaInicioRevision,
        }
    }




    static async existeCursoRevision ( uidCurso = '' ) {
        const doc = await db.collection(COLECCION_CURSOS).doc(uidCurso).get()

        if ( !doc.exists ) return false

        return doc.data().revisionAdministracion.estado === 'revision' || doc.data().revisionInstitucion.estado === 'revision'
    }

    static async crearRevisión ( uidCurso = '', revision = new CursoRevision() ) {
        revision.fechaInicioRevision = milliseconds_a_timestamp( Date.now() )
        await db.collection(COLECCION_CURSOS).doc(uidCurso).set(revision.getRevision())
    
        return true
    }

    static async cancelarRevisión ( uidCurso = '' ) {
        await db.collection(COLECCION_CURSOS).doc(uidCurso).delete()
    
        return true
    }

    static async aceptarCursoPorAdministracion ( uidCurso = '', mensaje = '' ) {
        const revisionAdministracion = {
            estado: !mensaje.length ? 'aceptado' : 'rechazado',
            mensaje: mensaje,
            fechaRespuesta: milliseconds_a_timestamp( Date.now() )
        }
        
        await db.collection(COLECCION_CURSOS).doc(uidCurso).update({ revisionAdministracion })
    
        return true
    }

    static async aceptarCursoPorInstitucion ( uidCurso = '', mensaje = '' ) {
        const revisionInstitucion = {
            estado: !mensaje.length ? 'aceptado' : 'rechazado',
            mensaje: mensaje,
            fechaRespuesta: milliseconds_a_timestamp( Date.now() )
        }

        await db.collection(COLECCION_CURSOS).doc(uidCurso).update({ revisionInstitucion })
    
        return true
    }
}

module.exports = CursoRevision