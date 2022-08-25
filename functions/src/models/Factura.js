const db = require("../../db")
const COLECCION = 'HistorialDeCompras'

class Factura {
    constructor ( uid = '' ) {
        this.uid = uid ? uid : ''
    }
}

module.exports = Factura