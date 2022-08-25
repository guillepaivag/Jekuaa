const db = require("../../../db")

class InformacionUsuario {
    constructor (datos = {}) {
        const {
            uid,
            descripcion,
            especializaciones,
            intereses,
            rolDescriptivo,
            redesSociales,
        } = datos

        this.uid = uid ? uid : ''
        this.descripcion = descripcion ? descripcion : ''
        this.especializaciones = especializaciones ? especializaciones : ''
        this.intereses = intereses ? intereses : ''
        this.rolDescriptivo = rolDescriptivo ? rolDescriptivo : 'estudiante'
        this.redesSociales = redesSociales ? redesSociales : []
    }

    getInformacionUsuario ( getJSON ) {
        if ( getJSON ) {
            return JSON.parse( JSON.stringify( this ) )
        }

        return this
    }

    setInformacionUsuario (datos = {}) {
        const {
            uid,
            descripcion,
            especializaciones,
            intereses,
            rolDescriptivo,
            redesSociales,
        } = datos

        this.setUid(uid)
        this.setDescripcion(descripcion)
        this.setEspecializaciones(especializaciones)
        this.setIntereses(intereses)
        this.setRolDescriptivo(rolDescriptivo)
        this.setRedesSociales(redesSociales)
    }

    setUid (uid = '') {
        this.uid = uid
        return this
    }

    setDescripcion (descripcion = '') {
        this.descripcion = descripcion
        return this
    }

    setEspecializaciones (especializaciones = '') {
        this.especializaciones = especializaciones
        return this
    }

    setIntereses (intereses = '') {
        this.intereses = intereses
        return this
    }

    setRolDescriptivo (rolDescriptivo = 'estudiante') {
        this.rolDescriptivo = rolDescriptivo
        return this
    }

    setRedesSociales (redesSociales = []) {
        this.redesSociales = redesSociales
        return this
    }

    /* 
     *    ################################
     *           METODOS NO ESTATICOS
     *    ################################
    */

    async importarInformacionUsuario (uid) {
        const doc = await db.collection('InformacionUsuarios').doc(uid).get()
        this.setInformacionUsuario(doc.data())
        return this
    }

    /* 
     *    ################################
     *           METODOS ESTATICOS
     *    ################################
    */

    static async crear ( informacionUsuario = new InformacionUsuario() ) {
        
        await db.collection('InformacionUsuarios').doc(informacionUsuario.uid).set({
            uid: informacionUsuario.uid,
            descripcion: informacionUsuario.descripcion,
            especializaciones: informacionUsuario.especializaciones,
            intereses: informacionUsuario.intereses,
            rolDescriptivo: informacionUsuario.rolDescriptivo,
            redesSociales: informacionUsuario.redesSociales,
        })

        return true
    }

    static async actualizar (uid = '', datos = {}) {
        await db.collection('InformacionUsuarios').doc(uid).update(datos)
        return true
    }

    static async eliminar ( uid ) {
        await db.collection('InformacionUsuarios').doc(uid).delete()
        return true
    }
}

module.exports = InformacionUsuario