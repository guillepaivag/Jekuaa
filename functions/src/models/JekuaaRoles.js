const utilsRoles = require('../utils/usuarios/RolesSecciones')
const datosRoles = require('../InformacionEstatica/DatosRoles')
const seccionesValidas = require('../InformacionEstatica/SeccionesValidas')

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
            throw new TypeError('El rol de jekuaaRoles debe ser de tipo string.', 'JekuaaRoles.js')
        }

        if ( typeof this.secciones != 'object' && !(this.secciones instanceof Array) ) {
            throw new TypeError('Las secciones de jekuaaRoles debe ser un arreglo con las secciones validas.', 'JekuaaRoles.js')
        }

        if ( typeof this.instructor != 'boolean' ) {
            throw new TypeError('El permiso de instructor de jekuaaRoles debe ser de tipo boolean.', 'JekuaaRoles.js')
        }

        return true
    }

    cumpleCondiciones () {

        // Verificar rol valido
        if ( !utilsRoles.esValidoElRol( this.rol ) ) {
            throw new TypeError('No es un rol valido.', 'JekuaaRoles.js')
        }

        // Verificar secciones validas y de acuerdo al rol 
        if ( !utilsRoles.sonValidasLasSecciones( this.secciones ) ) {
            throw new TypeError('No son validas las secciones.', 'JekuaaRoles.js')
        }

        if ( this.secciones.length > 0 && !utilsRoles.rolNecesitaSecciones ( this.rol ) ) {
            throw new TypeError('El rol no necesita secciones.', 'JekuaaRoles.js')
        }

        if ( this.secciones.length === 0 && utilsRoles.rolNecesitaSecciones ( this.rol ) ) {
            throw new TypeError('El rol necesita secciones.', 'JekuaaRoles.js')
        }

        // Verificar instructor valido y de acuerdo al rol
        if ( this.instructor && !utilsRoles.esMiembroJekuaa ( this.rol ) ) {
            throw new TypeError('No tiene permisos para ser instructor.', 'JekuaaRoles.js')
        }

        return true
    }


    

        /* 
            ###############################
                   METODOS ESTATICOS
            ###############################
        */

    static esEstudiante ( rol ) {
        return rol === 'estudiante'
    }

    static esPropietario ( rol ) {
        return rol === 'propietario'
    }

    static esMiembroJekuaa ( rol ) {
        return utilsRoles.esMiembroJekuaa ( rol )
    }

    static necesitaSecciones ( rol ) {
        utilsRoles.rolNecesitaSecciones ( rol )
    }

    static informacionDatosRoles () {
        return datosRoles
    }

    static informacionSeccionesValidas () {
        return seccionesValidas
    }
}

module.exports = JekuaaRoles