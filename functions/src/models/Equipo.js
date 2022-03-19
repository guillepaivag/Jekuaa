const admin = require('../../firebase-service')
const db = require('../../db')
const { milliseconds_a_timestamp } = require('../utils/timestamp')

const collectionName = 'Equipos'

class Equipo {
    constructor (data = {}) {
        const { 
            uid, 
            responsable, 
            referenciaUrl,
            nombre, 
            descripcion, 
            fotoPerfil, 
            cantidadCursos,
            fechaComienzo,
        } = data

        this.uid = uid ? uid : db.collection(collectionName).doc().id
        this.responsable = responsable ? responsable : ''
        this.referenciaUrl = referenciaUrl ? referenciaUrl : ''
        this.nombre = nombre ? nombre : ''
        this.descripcion = descripcion ? descripcion : ''
        this.fotoPerfil = fotoPerfil ? fotoPerfil : ''
        this.cantidadCursos = cantidadCursos ? cantidadCursos : 0
        this.fechaComienzo = fechaComienzo ? fechaComienzo : null
    }

    getEquipo () {
        return {
            uid: this.uid,
            responsable: this.responsable,
            referenciaUrl: this.referenciaUrl,
            nombre: this.nombre,
            descripcion: this.descripcion,
            fotoPerfil: this.fotoPerfil,
            cantidadCursos: this.cantidadCursos,
            fechaComienzo: this.fechaComienzo,
        }
    }

    setEquipo ( datos = {} ) {
        const { 
            uid, 
            responsable, 
            referenciaUrl,
            nombre, 
            descripcion, 
            fotoPerfil, 
            cantidadCursos,
            fechaComienzo,
        } = datos

        this.setUid(uid)
        this.setResponsable(responsable)
        this.setReferenciaUrl(referenciaUrl)
        this.setNombre(nombre)
        this.setDescripcion(descripcion)
        this.setFotoPerfil(fotoPerfil)
        this.setCantidadCursos(cantidadCursos)
        this.setFechaComienzo(fechaComienzo)
    }

    setUid (uid = db.collection('Equipo').doc().id) {
        this.uid = uid
    }

    setResponsable (responsable = '') {
        this.responsable = responsable
    }

    setReferenciaUrl (referenciaUrl = '') {
        this.referenciaUrl = referenciaUrl
    }

    setNombre (nombre = '') {
        this.nombre = nombre
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

    async importarDatosPorUID ( uid = '' ) {
        const doc = await db.collection(collectionName).doc(uid).get()

        if (!doc.exists) return null
    
        this.setEquipo( doc.data() )

        return this
    }



    /* 
     *    ################################
     *           METODOS ESTATICOS
     *    ################################
    */

    static async crearEquipo ( equipo = new Equipo() ) {
        const uid = db.collection(collectionName).doc().id
        await db.collection(collectionName).doc(uid).set( equipo.getEquipo() )

        return equipo
    }
    
    static async obtenerEquipo ( uid = '' ) {
        const equipo = new Equipo()
        const existe = await equipo.importarDatosPorUID( uid )
        return existe ? equipo : null
    }

    static async obtenerEquipoPorRerenciaURL ( referenciaUrl = '' ) {
        const docs = await db.collection(collectionName).where('referenciaUrl', '==', referenciaUrl).get()

        if (docs.empty) return null

        const doc = docs.docs[0]
        const equipo = new Equipo( doc.data() )

        return equipo
    }

    static async actualizarEquipo ( uid = '', datosActualizados = {} ) {
        await db.collection(collectionName).doc(uid).update(datosActualizados)

        return true
    }

    static async eliminarEquipo ( uid = '' ) {
        await db.collection(collectionName).doc(uid).delete()

        return true
    }
}

module.exports = Equipo