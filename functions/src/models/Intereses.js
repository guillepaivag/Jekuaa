const admin = require('../../firebase-service')
const db = require('../../db')

class Interes {
    constructor (datosInteres) {
        this.uid = datosInteres && datosInteres.uid ? datosInteres.uid : ''
        this.seccion = datosInteres && datosInteres.seccion ? datosInteres.seccion : ''
        this.categorias = datosInteres && datosInteres.categorias ? datosInteres.categorias : ''
    }

    getInteres () {
        return {
            uid: this.uid,
            seccion: this.seccion,
            categorias: this.categorias,
        }
    }

    async agregarInteres ( uidUsuario ) {
        db.collection('Usuarios').doc(uidUsuario)
        .collection('MisIntereses').add(this.getInteres())
    }
}

module.exports = Interes