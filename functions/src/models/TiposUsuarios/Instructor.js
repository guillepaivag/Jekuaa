const admin = require('../../../firebase-service')
const db = require('../../../db')

const COLECCION_INSTRUCTOR = 'Instructores'

class Instructor {
    
    
    constructor ( datosInstructor ) {
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

    setDatosInstructor ( datosInstructor ) {
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

    setUID ( uid ) {
        if ( !uid ) {
            this.uid = ''
            return 
        }

        this.uid = uid
    }

    setFechaComienzoInstructor ( fechaComienzoInstructor ) {
        if ( !fechaComienzoInstructor ) {
            this.fechaComienzoInstructor = null
            return 
        }

        this.fechaComienzoInstructor = fechaComienzoInstructor
    }

    setCantidadCursos ( cantidadCursos ) {
        if ( !cantidadCursos ) {
            this.cantidadCursos = 0
            return 
        }

        this.cantidadCursos = cantidadCursos
    }

    setCantidadEstudiantes ( cantidadEstudiantes ) {
        if ( !cantidadEstudiantes ) {
            this.cantidadEstudiantes = 0
            return 
        }

        this.cantidadEstudiantes = cantidadEstudiantes
    }

    setLinks ( links ) {
        if ( !links ) {
            this.links = []
            return 
        }

        this.links = links
    }

    setInformacionInstructor ( informacionInstructor ) {
        if ( !informacionInstructor ) {
            this.informacionInstructor = ''
            return 
        }

        this.informacionInstructor = informacionInstructor
    }

    setEspecializacionesIntereses ( especializacionesIntereses ) {
        if ( !especializacionesIntereses ) {
            this.especializacionesIntereses = []
            return 
        }

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

    // Metodo

    async guardarInstructor () {

        await this.crearNuevoInstructor(this.getInstructor())

        return this
    }

    
        /* 
            ###############################
                   METODOS ESTATICOS
            ###############################
        */

    static async crearNuevoInstructor ( datosInstructor ) {

        const { 
            uid, fechaComienzoInstructor, cantidadCursos, 
            cantidadEstudiantes, links, informacionInstructor,
            especializacionesIntereses
        } = datosInstructor

        if ( cantidadCursos && typeof cantidadCursos != 'number' ) {
            throw new Error('La cantidadCursos debe ser de tipo number.')
        }

        if ( cantidadEstudiantes && typeof cantidadEstudiantes != 'number' ) {
            throw new Error('La cantidadEstudiantes debe ser de tipo number.')
        }

        if ( links && ( typeof links != 'object' || !(links instanceof Array) ) ) {
            throw new Error('Los links debe ser de tipo object (Array).')
        }

        if ( informacionInstructor && typeof informacionInstructor != 'string' ) {
            throw new Error('La informacionInstructor debe ser de tipo string.')
        }

        if ( especializacionesIntereses && ( typeof especializacionesIntereses != 'object' || !(especializacionesIntereses instanceof Array) ) ) {
            throw new Error('Las especializacionesIntereses debe ser de tipo object (Array).')
        }
        
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