const admin = require('../../../firebase-service')
const db = require('../../../db')

const COLECCION_INSTRUCTOR = 'Instructores'

class Instructor {
    
    
    constructor ( datosInstructor = {} ) {
        const { 
            uid, fechaComienzoInstructor, cantidadCursos, 
            cantidadEstudiantes, links, informacionInstructor,
            especializacionesIntereses
        } = datosInstructor

        this.uid = uid ? uid : ''
        this.fechaComienzoInstructor = fechaComienzoInstructor ? fechaComienzoInstructor : null
        this.cantidadCursos = cantidadCursos ? cantidadCursos : 0
        this.cantidadEstudiantes = cantidadEstudiantes ? cantidadEstudiantes : 0
        this.links = links ? links : []
        this.informacionInstructor = informacionInstructor ? informacionInstructor : ''
        this.especializacionesIntereses = especializacionesIntereses ? especializacionesIntereses : []
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
            links: this.links, 
            informacionInstructor: this.informacionInstructor,
            especializacionesIntereses: this.especializacionesIntereses
        }
    }



    /* 
        SETTERS: Se agregan los datos que se desee a los atributos
    */

    // Metodo

    setDatosInstructor ( datosInstructor = {} ) {
        const { 
            uid, fechaComienzoInstructor, cantidadCursos, 
            cantidadEstudiantes, links, informacionInstructor,
            especializacionesIntereses
        } = datosInstructor

        this.setUID(uid)
        this.setFechaComienzoInstructor(fechaComienzoInstructor)
        this.setCantidadCursos(cantidadCursos)
        this.setCantidadEstudiantes(cantidadEstudiantes)
        this.setLinks(links)
        this.setInformacionInstructor(informacionInstructor)
        this.setEspecializacionesIntereses(especializacionesIntereses)
    }

    setUID ( uid = db.collection(COLECCION_INSTRUCTOR).doc().id ) {
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

    setLinks ( links = [] ) {
        this.links = links
    }

    setInformacionInstructor ( informacionInstructor = '' ) {
        this.informacionInstructor = informacionInstructor
    }

    setEspecializacionesIntereses ( especializacionesIntereses = [] ) {
        this.especializacionesIntereses = especializacionesIntereses
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

    static async crearNuevoInstructor ( datosInstructor = {} ) {

        const { 
            uid, fechaComienzoInstructor, cantidadCursos, 
            cantidadEstudiantes, links, informacionInstructor,
            especializacionesIntereses
        } = datosInstructor

        return await db.collection(COLECCION_INSTRUCTOR).doc(uid).set({ 
            uid,
            fechaComienzoInstructor: admin.firestore.Timestamp.fromDate( new Date() ),
            cantidadCursos: cantidadCursos ? cantidadCursos : 0, 
            cantidadEstudiantes: cantidadEstudiantes ? cantidadEstudiantes : 0,
            links: links ? links : [],
            informacionInstructor: informacionInstructor ? informacionInstructor : '',
            especializacionesIntereses: especializacionesIntereses ? especializacionesIntereses : []
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