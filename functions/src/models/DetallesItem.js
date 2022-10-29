/**
 * MONEDAS:
 *  detalles: {
 *      precioUnitarioOriginal: 15.99,
 *      porcentajeDescuento: 0,
 *      cantidadUnitarioPackPoint: 200,
 *      bonusPackPoint: 10,
 *      cantidadTotalPoints: 210,
 *  },
 */


class DetallesItem {
    constructor (data = {}) {
        const { tipoItem, uidItem, uidPedido, } = data

        this.tipoItem = tipoItem ? tipoItem : ''
        this.uidItem = uidItem ? uidItem : ''
        this.uidPedido = uidPedido ? uidPedido : ''
    }

    getDetallesItem () {
        return { 
            tipoItem: this.tipoItem, 
            uidItem: this.uidItem, 
            uidPedido: this.uidPedido, 
        }
    }

    setDetallesItem (data = {}) {
        const { tipoItem, uidItem, uidPedido, } = data

        this.tipoItem = tipoItem ? tipoItem : ''
        this.uidItem = uidItem ? uidItem : ''
        this.uidPedido = uidPedido ? uidPedido : ''

        return this
    }

}

module.exports = DetallesItem