// propietario
// moderador
// miembro, mri-miembro
// estudiante

const db = require('../../../../db')

class Roles {

    constructor ( rol ) {
        this.rol = rol ? rol : 'estudiante'
    }


    /* 
        GETTERS: Se obtienen los datos de los atributos
    */
    getRol () {
        return this.rol
    }


    /* 
        SETTERS: Se agregan los datos que se desee a los atributos
    */

    setRol (rol) {
        if (!rol) {
            this.rol = 'estudiante'
            return
        }

        this.rol = rol
    }


    /* 
        ACCIONES: Se trabajara con la base de datos
    */


        /* 
            ###############################
                 METODOS NO ESTATICOS
            ###############################
        */

    async obtenerDocumentoRol () {
        const documento = await db.collection('Roles').doc(this.rol).get()
        return documento
    }

        /* 
            ###############################
                   METODOS ESTATICOS
            ###############################
        */

    static async obtenerDatosRol ( rol = new Roles() ) {
        const documentoRol = await rol.obtenerDocumentoRol()
        
        return documentoRol.data()
    }

    static async existeRol ( rol = new Roles() ) {
        const documentoRol = await rol.obtenerDocumentoRol()

        return documentoRol.exists
    }

    static async esMiembro ( rol = new Roles() ) {
        const documentoRol = await rol.obtenerDocumentoRol()

        return documentoRol.data().esMiembro
    }

    static async esEstudiante ( rol = new Roles() ) {
        return rol.rol === 'estudiante'
    }

    static async compararNivelRoles ( rol1 = new Roles(), rol2 = new Roles() ) {
        const datoRol1 = await db.collection('Roles').doc(rol1.rol).get()
        const datoRol2 = await db.collection('Roles').doc(rol2.rol).get()

        return datoRol1.data().nivel - datoRol2.data().nivel
    }
}

module.exports = Roles