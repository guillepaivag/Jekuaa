const db = require('../../db')
const utilsRoles = require('../utils/usuarios/RolesSecciones')
const ErrorJekuaa = require('./Error/ErroresJekuaa')

class JekuaaRoles {

    constructor ( datosRoles ) {
        
        if (!datosRoles || !datosRoles.rol) {
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

        this.rol = rol ? rol : 'estudiante'
        this.secciones = secciones ? secciones : []
        this.instructor = instructor ? instructor : false

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

        if ( !(this.secciones instanceof Array) ) {
            throw new TypeError('Las secciones de jekuaaRoles debe ser un arreglo con las secciones validas.', 'JekuaaRoles.js')
        }

        if ( typeof this.instructor != 'boolean' ) {
            throw new TypeError('El permiso de instructor de jekuaaRoles debe ser de tipo boolean.', 'JekuaaRoles.js')
        }

        return true
    }

    validarTodosLosTiposDeDatosCliente ( jekuaaRoles ) {
        if ( !jekuaaRoles.rol || !jekuaaRoles.instructor || !jekuaaRoles.secciones ) {
            throw new ErrorJekuaa({
                codigo: 'jekuaa/error/usuario_mala_solicitud',
                mensaje: 'No existen todos los datos de jekuaaRoles.'
            })
        }
        
        if ( typeof jekuaaRoles.rol != 'string' ) {
            throw new TypeError('El plan debe de ser de tipo string.', 'JekuaaRoles.js')
        }
        
        if ( typeof jekuaaRoles.instructor != 'boolean' ) {
            throw new TypeError('El estado instructor debe ser de tipo boolean.', 'JekuaaRoles.js')
        }
    
        if ( !(jekuaaRoles.secciones instanceof Array) ) {
            throw new TypeError('Las secciones debe de ser un arreglo de string.', 'JekuaaRoles.js')
        }

        if (jekuaaRoles.secciones.length) {
            for (let i = 0; i < jekuaaRoles.secciones.length; i++) {
                const element = jekuaaRoles.secciones[i]
                if ( typeof element != 'string' ) {
                    throw new TypeError('Las secciones de un miembro jekuaa debe ser de tipo string.', 'JekuaaRoles.js')
                }
            }
        }
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

    obtenerReferenciaRol () {
        const ref = db.collection('Roles').doc(this.rol)

        return ref
    }

    async obtenerDocumentoRol () {
        const data = await db.collection('Roles').doc(this.rol).get()

        return data
    }

    obtenerDatosRol ( documentoRol ) {
        return documentoRol.data()
    }

    existeRol (documentoRol) {
        return documentoRol.exists
    }

    necesitaSecciones (documentoRol) {
        const data = this.obtenerDatosRol(documentoRol)

        return data.secciones === 'requerido'
    }

    permisoDeInstructor (documentoRol) {
        const data = this.obtenerDatosRol(documentoRol)

        return data.instructor
    }
    
    esMiembroJekuaa (documentoRol) {
        const data = this.obtenerDatosRol(documentoRol)

        return data.esMiembroJekuaa
    }

    esEstudiante (documentoRol) {
        return documentoRol.id === 'estudiante'
    }

    async seccionesValidas (secciones) {
        
        let seccionesValidas = []

        const seccionesValidasFirestore = await db.collection('Secciones').get()
        seccionesValidasFirestore.forEach((seccionValida) => {
            seccionesValidas.push(seccionValida.id)
        })

        for (let i = 0; i < secciones.length; i++) {
            const seccion = secciones[i]
            let existe = seccionesValidas.includes(seccion)
            if (!existe) {
                return false
            }
        }

        return true
    }

    async validarDatosCliente () {
        const documentoRol = await this.obtenerDocumentoRol()

        // Verificar rol valido
        const existeRol = this.existeRol(documentoRol)

        if (!existeRol) {
            throw new ErrorJekuaa({
                codigo: 'jekuaa/error/usuario_mala_solicitud',
                mensaje: 'No existe este rol.'
            })
        }

        // Verificar secciones validas y de acuerdo al rol
        const necesitaSecciones = this.necesitaSecciones(documentoRol)

        if (necesitaSecciones) {
            // Si no existen secciones, mandar un error
            if (!this.secciones.length) {
                throw new ErrorJekuaa({
                    codigo: 'jekuaa/error/usuario_mala_solicitud',
                    mensaje: 'Se requiere secciones y no existen.'
                })
            }

            // Si las secciones no son validas, mandar un error
            const seccionesValidas = await this.seccionesValidas( this.secciones )
            if (!seccionesValidas) {
                throw new ErrorJekuaa({
                    codigo: 'jekuaa/error/usuario_mala_solicitud',
                    mensaje: 'Se requiere secciones y no existen.'
                })
            }
        } else {
            // Si no necesita secciones y existen secciones, mandar un error
            if (this.secciones.length) {
                throw new ErrorJekuaa({
                    codigo: 'jekuaa/error/usuario_mala_solicitud',
                    mensaje: 'No se requieren secciones para este rol.'
                })
            }
        }

        // Verificar el estado instructor y de acuerdo al rol
        if (this.instructor) {
            if (this.permisoDeInstructor(documentoRol) === 'no-requerido') {
                throw new ErrorJekuaa({
                    codigo: 'jekuaa/error/usuario_mala_solicitud',
                    mensaje: 'No tiene permiso para ser instructor.'
                })
            }
        } else {
            if (this.permisoDeInstructor(documentoRol) === 'requerido') {
                throw new ErrorJekuaa({
                    codigo: 'jekuaa/error/usuario_mala_solicitud',
                    mensaje: 'Este rol requiere que se sea instructor.'
                })
            }
        }
        
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
        return utilsRoles.rolNecesitaSecciones ( rol )
    }

    static informacionDatosRoles () {
        return utilsRoles.getDatosRoles()
    }

    static informacionSeccionesValidas () {
        return utilsRoles.getSeccionesValidas()
    }

    static async existeRol ( rol ) {
        const rolDoc = await db.collection('Roles').doc(rol).get()

        return rolDoc.exists
    }
}

module.exports = JekuaaRoles