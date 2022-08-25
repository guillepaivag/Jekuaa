class Seccion {
    constructor( datos = {} ) {
        const { uid, nombre } = datos

        this.uid = uid ? uid : ''
        this.nombre = nombre ? nombre : ''
    }
}

module.exports = Seccion