const admin = require('../../../../firebase-service')
const db = require('../../../../db')

const COLECCION = 'Moderadores'

class Moderador {
    constructor(datos = {}) {
        const {
            uid, 
            funciones,
            fechaComienzo, 
        } = datos

        this.uid = uid ? uid : ''
        this.funciones = funciones ? funciones : []
        this.fechaComienzo = fechaComienzo ? fechaComienzo : admin.firestore.Timestamp.fromDate( new Date() )
    }


    getModerador () {
        return { 
            uid: this.uid, 
            funciones: this.funciones, 
            fechaComienzo: this.fechaComienzo,
        }
    }


    setModerador ( datos = {} ) {
        const { 
            uid, 
            funciones,
            fechaComienzo, 
        } = datos

        this.setUID(uid)
        this.setFunciones(funciones)
        this.setFechaComienzo(fechaComienzo)

        return this
    }

    setUID ( uid = '' ) {
        this.uid = uid
        return this
    }

    setFunciones ( funciones = [] ) {
        this.funciones = funciones
        return this
    }

    setFechaComienzo ( fechaComienzo = admin.firestore.Timestamp.fromDate( new Date() ) ) {
        this.fechaComienzo = fechaComienzo
        return this
    }

    async importarDatosModerador ( uid = '' ) {
        const documento = await db.collection(COLECCION).doc(uid).get()

        if ( !documento.exists ) return null

        const datosModerador = documento.data()

        this.setModerador( datosModerador )

        return this
    }


    /* 
     *    ################################
     *           METODOS ESTATICOS
     *    ################################
    */

    static async crearModerador ( moderador = new Moderador() ) {
        await db
        .collection(COLECCION)
        .doc(moderador.uid)
        .set(moderador.getModerador())

        return true
    }

    static async actualizarModerador ( uid = '', datosActualizados = {} ) {
        await db.collection(COLECCION).doc(uid).update(datosActualizados)

        return true
    }

    static async eliminarModerador ( uid = '' ) {
        await db.collection(COLECCION).doc(uid).delete()

        return true
    }

}

module.exports = Moderador