const admin = require('../../../firebase-service')
const db = require('../../../db')

const COLECCION_INSTRUCTOR = 'Instructores'

class Instructor {
    
    constructor ( datosInstructor = {} ) {
        const { 
            uid, fechaComienzoInstructor, cantidadCursos, 
            cantidadEstudiantes, informacionInstructor,
        } = datosInstructor

        this.uid = uid ? uid : ''
        this.fechaComienzoInstructor = fechaComienzoInstructor ? fechaComienzoInstructor : admin.firestore.Timestamp.fromDate( new Date() )
        this.cantidadCursos = cantidadCursos ? cantidadCursos : 0
        this.cantidadEstudiantes = cantidadEstudiantes ? cantidadEstudiantes : 0
        this.informacionInstructor = informacionInstructor ? informacionInstructor : ''
    }




    /* 
        GETTERS: Se obtienen los datos de los atributos
    */

    getInstructor ( getFormatDB = false ) {
        if ( getFormatDB ) {
            return { 
                uid: this.uid, 
                fechaComienzoInstructor: this.fechaComienzoInstructor, 
                cantidadCursos: this.cantidadCursos, 
                cantidadEstudiantes: this.cantidadEstudiantes, 
                informacionInstructor: this.informacionInstructor,
            }
        }
        
        return this
    }


    /* 
        SETTERS: Se agregan los datos que se desee a los atributos
    */

    setDatosInstructor ( datosInstructor = {} ) {
        const { 
            uid, fechaComienzoInstructor, cantidadCursos, 
            cantidadEstudiantes, informacionInstructor,
        } = datosInstructor

        this.setUID(uid)
        this.setFechaComienzoInstructor(fechaComienzoInstructor)
        this.setCantidadCursos(cantidadCursos)
        this.setCantidadEstudiantes(cantidadEstudiantes)
        this.setInformacionInstructor(informacionInstructor)
    }

    setUID ( uid = '' ) {
        this.uid = uid
    }

    setFechaComienzoInstructor ( fechaComienzoInstructor = admin.firestore.Timestamp.fromDate( new Date() ) ) {
        this.fechaComienzoInstructor = fechaComienzoInstructor
    }

    setCantidadCursos ( cantidadCursos = 0 ) {
        this.cantidadCursos = cantidadCursos
    }

    setCantidadEstudiantes ( cantidadEstudiantes = 0 ) {
        this.cantidadEstudiantes = cantidadEstudiantes
    }

    setInformacionInstructor ( informacionInstructor = '' ) {
        this.informacionInstructor = informacionInstructor
    }
    
    
    /* 
     *    ################################
     *           METODOS NO ESTATICOS
     *    ################################
    */

    async importarDatosInstructor ( uid = '' ) {
        const doc = await db.collection(COLECCION_INSTRUCTOR).doc(uid).get()
        if (!doc.exists) return null

        this.setDatosInstructor( doc.data() )

        return this
    }
    
    /* 
     *    ################################
     *           METODOS ESTATICOS
     *    ################################
    */

    static async crearInstructor ( datosInstructor = new Instructor() ) {

        db
        .collection(COLECCION_INSTRUCTOR)
        .doc(datosInstructor.uid)
        .set( datosInstructor.getInstructor( true ) )

        return true
    }

    static async eliminarInstructor ( uid ) {
        db.collection(COLECCION_INSTRUCTOR).doc(uid).delete()

        return true
    }

    static async permisoPorRol (rol) {
        const doc = await db.collection('Roles').doc(this.rol).get()

        return doc.data().permisoInstructor
    }
}

module.exports = Instructor