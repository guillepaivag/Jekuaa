const db = require('../../db')
const ErrorJekuaa = require('./Error/ErroresJekuaa')

class JekuaaRoles {

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

    obtenerDatosRol ( documentoRol ) {
        return documentoRol.data()
    }

    existeRol (documentoRol) {
        return documentoRol.exists
    }

    esMiembroJekuaa (documentoRol) {
        const data = this.obtenerDatosRol(documentoRol)
        return data.esMiembroJekuaa
    }

    esEstudiante (documentoRol) {
        return documentoRol.id === 'estudiante'
    }

        /* 
            ###############################
                   METODOS ESTATICOS
            ###############################
        */


    static async obtenerDocumentoRol ( rol ) {
        const rolDoc = await db.collection('Roles').doc(rol).get()

        return rolDoc
    }

    static async existeRol ( rol ) {
        const rolDoc = await db.collection('Roles').doc(rol).get()

        return rolDoc.exists
    }

    static async compararNivelRoles ( rolX, rolY ) {
        const datoRolX = await db.collection('Roles').doc(rolX).get()
        const datoRolY = await db.collection('Roles').doc(rolY).get()

        return datoRolX.data().nivel - datoRolY.data().nivel
    }
}

module.exports = JekuaaRoles