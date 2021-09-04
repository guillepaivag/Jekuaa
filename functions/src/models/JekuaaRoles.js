class JekuaaRoles {

    constructor ( datosRoles ) {
        
        if (!datosRoles) {
            this.rol = 'estudiante'
            this.secciones = []
            this.instructor = false

            return
        }

        const {
            rol,
            secciones,
            instructor
        } = datosRoles

        this.rol = rol
        this.secciones = secciones
        this.instructor = instructor

    }



    /* 
        GETTERS: Se obtienen los datos de los atributos
    */

    getDatosRoles () {
        return {
            rol: this.getRol(),
            secciones: this.getSecciones(),
            instructor: this.getInstructor()
        }
    }

    getRol () {
        return this.rol
    }

    getSecciones () {
        return this.secciones
    }

    getInstructor () {
        return this.instructor
    }




    /* 
        SETTERS: Se agregan los datos que se desee a los atributos
    */

    setDatosRoles (datosRoles) {
        
        if (!datosRoles) {
            this.setRol(null)
            this.setSecciones(null)
            this.setInstructor(null)
            return
        }

        const {
            rol,
            secciones,
            instructor
        } = datosRoles

        this.setRol(rol)
        this.setSecciones(secciones)
        this.setInstructor(instructor)

    }

    setRol (rol) {
        if (!rol) {
            this.rol = 'estudiante'
            return
        }

        this.rol = rol
    }

    setSecciones (secciones) {
        if (!secciones) {
            this.secciones = []
            return
        }

        this.secciones = secciones
    }

    setInstructor (instructor) {
        if (!instructor) {
            this.instructor = false
            return
        }

        this.instructor = instructor
    }




    /* 
        ACCIONES: Se trabajara con la base de datos
    */


        /* 
            ###############################
                 METODOS NO ESTATICOS
            ###############################
        */



        /* 
            ###############################
                   METODOS ESTATICOS
            ###############################
        */
}

module.exports = JekuaaRoles