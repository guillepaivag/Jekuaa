const db = require("../../../db")
const ErrorJekuaa = require("../Error/ErroresJekuaa")

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
        this.rolDescriptivo = rolDescriptivo ? rolDescriptivo : 'Estudiante de Jekuaa'
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

    setRolDescriptivo (rolDescriptivo = 'Estudiante de Jekuaa') {
        this.rolDescriptivo = rolDescriptivo
        return this
    }

    setRedesSociales (redesSociales = []) {
        this.redesSociales = redesSociales
        return this
    }

    async importarInformacionUsuario (uid) {
        const doc = await db.collection('InformacionUsuarios').doc(uid).get()
        this.setInformacionUsuario(doc.data())
        return this
    }

    async crear () {
        if (!!this.uid) {
            throw new ErrorJekuaa({
                codigo: 'jekuaa/error/usuario_mala_solicitud',
                mensaje: `Se requiere una uid válida.`
            })
        }
        
        await db.collection('InformacionUsuarios').doc(this.uid).set({
            uid: this.uid,
            descripcion: this.descripcion,
            especializaciones: this.especializaciones,
            intereses: this.intereses,
            rolDescriptivo: this.rolDescriptivo,
            redesSociales: this.redesSociales,
        })

        return this
    }

    static async actualizar (uid, datos) {
        await db.collection('InformacionUsuarios').doc(uid).update(datos)
        return this
    }

    static async eliminar ( uid ) {
        await db.collection('InformacionUsuarios').doc(uid).delete()

        return this
    }
}

module.exports = InformacionUsuario