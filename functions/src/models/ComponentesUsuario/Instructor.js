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
        this.fechaComienzoInstructor = fechaComienzoInstructor ? fechaComienzoInstructor : null
        this.cantidadCursos = cantidadCursos ? cantidadCursos : 0
        this.cantidadEstudiantes = cantidadEstudiantes ? cantidadEstudiantes : 0
        this.informacionInstructor = informacionInstructor ? informacionInstructor : ''
    }




    /* 
        GETTERS: Se obtienen los datos de los atributos
    */

    // Metodo
    
    getInstructor () {
        return { 
            uid: this.uid, 
            fechaComienzoInstructor: this.fechaComienzoInstructor, 
            cantidadCursos: this.cantidadCursos, 
            cantidadEstudiantes: this.cantidadEstudiantes, 
            informacionInstructor: this.informacionInstructor,
        }
    }



    /* 
        SETTERS: Se agregan los datos que se desee a los atributos
    */

    // Metodo

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

    setFechaComienzoInstructor ( fechaComienzoInstructor = null ) {
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
        ACCIONES: Se trabajara con la base de datos
    */

        /* 
            ###############################
                 METODOS NO ESTATICOS
            ###############################
        */

    async crearInstructor () {
        await this.crearNuevoInstructor(this.getInstructor())
        return this
    }

    
        /* 
            ###############################
                   METODOS ESTATICOS
            ###############################
        */

    static async crearNuevoInstructor ( datosInstructor = new Instructor() ) {

        const { 
            uid, fechaComienzoInstructor, cantidadCursos, 
            cantidadEstudiantes, informacionInstructor,
        } = datosInstructor

        return await db.collection(COLECCION_INSTRUCTOR).doc(uid).set({ 
            uid,
            fechaComienzoInstructor: admin.firestore.Timestamp.fromDate( new Date() ),
            cantidadCursos: cantidadCursos ? cantidadCursos : 0, 
            cantidadEstudiantes: cantidadEstudiantes ? cantidadEstudiantes : 0,
            informacionInstructor: informacionInstructor ? informacionInstructor : '',
        })
    }

    static datosValidosParaInstructor ( datosInstructor ) {
        
    }

    static async permisoPorRol (rol) {
        const doc = await db.collection('Roles').doc(this.rol).get()

        return doc.data().permisoInstructor
    }
}

module.exports = Instructor