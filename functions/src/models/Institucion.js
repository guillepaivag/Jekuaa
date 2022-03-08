const admin = require('../../firebase-service')
const db = require('../../db')
const { milliseconds_a_timestamp } = require('../utils/timestamp')

const collectionName = 'Instituciones'

class Institucion {
    constructor (data = {}) {
        const { 
            uid, 
            responsable, 
            referenciaUrl,
            nombreInstitucion, 
            descripcion, 
            fotoPerfil, 
            cantidadCursos,
            fechaComienzo,
        } = data

        this.uid = uid ? uid : db.collection(collectionName).doc().id
        this.responsable = responsable ? responsable : ''
        this.referenciaUrl = referenciaUrl ? referenciaUrl : ''
        this.nombreInstitucion = nombreInstitucion ? nombreInstitucion : ''
        this.descripcion = descripcion ? descripcion : ''
        this.fotoPerfil = fotoPerfil ? fotoPerfil : ''
        this.cantidadCursos = cantidadCursos ? cantidadCursos : 0
        this.fechaComienzo = fechaComienzo ? fechaComienzo : null
    }

    getInstitucion () {
        return {
            uid: this.uid,
            responsable: this.responsable,
            referenciaUrl: this.referenciaUrl,
            nombreInstitucion: this.nombreInstitucion,
            descripcion: this.descripcion,
            fotoPerfil: this.fotoPerfil,
            cantidadCursos: this.cantidadCursos,
            fechaComienzo: this.fechaComienzo,
        }
    }

    setInstitucion ( datos = {} ) {
        const { 
            uid, 
            responsable, 
            referenciaUrl,
            nombreInstitucion, 
            descripcion, 
            fotoPerfil, 
            cantidadCursos,
            fechaComienzo,
        } = datos

        this.setUid(uid)
        this.setResponsable(responsable)
        this.setReferenciaUrl(referenciaUrl)
        this.setNombreInstitucion(nombreInstitucion)
        this.setDescripcion(descripcion)
        this.setFotoPerfil(fotoPerfil)
        this.setCantidadCursos(cantidadCursos)
        this.setFechaComienzo(fechaComienzo)
    }

    setUid (uid = db.collection('Institucion').doc().id) {
        this.uid = uid
    }

    setResponsable (responsable = '') {
        this.responsable = responsable
    }

    setReferenciaUrl (referenciaUrl = '') {
        this.referenciaUrl = referenciaUrl
    }

    setNombreInstitucion (nombreInstitucion = '') {
        this.nombreInstitucion = nombreInstitucion
    }

    setDescripcion (descripcion = '') {
        this.descripcion = descripcion
    }

    setFotoPerfil (fotoPerfil = '') {
        this.fotoPerfil = fotoPerfil
    }

    setCantidadCursos ( cantidadCursos = 0 ) {
        this.cantidadCursos = cantidadCursos
    }

    setFechaComienzo ( fechaComienzo = null ) {
        this.fechaComienzo = fechaComienzo
    }


    /* 
     *    ################################
     *           METODOS NO ESTATICOS
     *    ################################
    */

    async importarDatosPorUID ( uidInstitucion = '' ) {
        const doc = await db.collection(collectionName).doc(uidInstitucion).get()

        if (!doc.exists) return null
    
        this.setInstitucion( doc.data() )

        return this
    }



    /* 
     *    ################################
     *           METODOS ESTATICOS
     *    ################################
    */

    static async crearInstitucion ( institucion = new Institucion() ) {
        const uid = db.collection(collectionName).doc().id
        await db.collection(collectionName).doc(uid).set( institucion.getInstitucion() )

        return institucion
    }
    
    static async obtenerInstitucion ( uidInstitucion = '' ) {
        const institucion = new Institucion()
        const existe = await institucion.importarDatosPorUID( uidInstitucion )
        return existe ? institucion.getInstitucion() : null
    }

    static async obtenerInstitucionPorRerenciaURL ( referenciaUrl = '' ) {
        const docs = await db.collection(collectionName).where('referenciaUrl', '==', referenciaUrl).get()

        if (docs.empty) return null

        const doc = docs.docs[0]
        const institucion = new Institucion( doc.data() )

        return institucion.getInstitucion()
    }

    static async actualizarInstitucion ( uidInstitucion = '', datosActualizados = {} ) {
        await db.collection(collectionName).doc(uidInstitucion).update(datosActualizados)

        return true
    }

    // Agregar un colaborador a una subcoleccion de "ColaboradoresInstitucion".
    static async enviarSolicitudColaborador ( uidInstitucion = '', uidColaborador = '' ) {
        // Crear solicitud
        await db
        .collection(collectionName).doc(uidInstitucion)
        .collection('ColaboradoresInstitucion').doc(uidColaborador)
        .set({
            uid: uidColaborador, 
            uidInstitucion: uidInstitucion,
            estado: 'solicitud', 
            fechaSolicitud: milliseconds_a_timestamp( Date.now() ), 
            fechaAceptado: null, 
        })

        return true
    }

    // Agregar un colaborador a una subcoleccion de "ColaboradoresInstitucion".
    static async aceptarSolicitudColaborador ( uidInstitucion = '', uidColaborador = '', esAceptado = false ) {
        if (!esAceptado) {
            return Institucion.quitarColaborador(uidInstitucion, uidColaborador)
        }

        await db
        .collection(collectionName).doc(uidInstitucion)
        .collection('ColaboradoresInstitucion').doc(uidColaborador)
        .update({
            estado: 'aceptado',
            fechaAceptado: milliseconds_a_timestamp( Date.now() ), 
        })

        return true
    }

    // Eliminar un colaborador de la subcoleccion de "ColaboradoresInstitucion".
    static async quitarColaborador ( uidInstitucion = '', uidColaborador = '' ) {
        await db
        .collection(collectionName).doc(uidInstitucion)
        .collection('ColaboradoresInstitucion').doc(uidColaborador)
        .delete()

        return true
    }

    static async eliminarInstitucion ( uidInstitucion = '' ) {
        await db.collection(collectionName).doc(uidInstitucion).delete()

        return true
    }
}

module.exports = Institucion