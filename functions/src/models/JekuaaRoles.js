const utilsRoles = require('../utils/usuarios/RolesSecciones')

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

        formatoValido () {

            if ( typeof this.rol != 'string' ) {
                return false
            }

            if ( typeof this.secciones != 'object' && !(this.secciones instanceof Array) ) {
                return false
            }

            if ( typeof this.instructor != 'boolean' ) {
                return false
            }

            return true
        }

        cumpleCondiciones () {

            // Verificar rol valido
            if ( !utilsRoles.esValidoElRol( this.rol ) ) {
                return false
            }

            // Verificar secciones validas y de acuerdo al rol 
            if ( !utilsRoles.sonValidasLasSecciones( this.secciones ) ) {
                return false
            }

            if ( this.secciones.length > 0 && !utilsRoles.rolNecesitaSecciones ( this.rol ) ) {
                return false
            }

            if ( this.secciones.length === 0 && utilsRoles.rolNecesitaSecciones ( this.rol ) ) {
                return false
            }

            // Verificar instructor valido y de acuerdo al rol
            if ( this.instructor && !utilsRoles.esMiembroJekuaa ( this.rol ) ) {
                return false
            }

            return true
        }


        /* 
            ###############################
                   METODOS ESTATICOS
            ###############################
        */
}

module.exports = JekuaaRoles