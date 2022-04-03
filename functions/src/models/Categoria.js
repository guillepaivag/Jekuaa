class Categoria {
    constructor( datos = {} ) {
        const { uid, nombre, seccion } = datos

        this.uid = uid ? uid : ''
        this.nombre = nombre ? nombre : ''
        this.seccion = seccion ? seccion : ''
    }
}

module.exports = Categoria