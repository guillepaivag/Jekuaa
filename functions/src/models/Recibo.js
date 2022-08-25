const db = require("../../db")
const COLECCION = 'HistorialDeCompras'

class Recibo {
    constructor ( uid = '' ) {
        this.uid = uid ? uid : ''
    }
}

module.exports = Recibo