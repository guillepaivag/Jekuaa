/**
 * PRODUCTOS:
 *  detalles: {
 *      precioReal: 205,
 *      porcentajeDescuento: 0,
 *  },
 * 
 * 
 * MONEDAS:
 *  detalles: {
 *      precioReal: 15.99,
 *      porcentajeDescuento: 0,
 *      cantidadPoint: 200,
 *      bunus: 10,
 *      cantidadTotalPoint: 210,
 *  },
 */

const db = require("../../../db")

const COLECCION = 'DetallesItems'

class DetallesItem {
    constructor (data = {}) {
        const { tipoItem, uidItem, detalles, 
            cantidad, precioUnitario, precioTotal, 
            fechaReembolsado } = data

        this.tipoItem = tipoItem ? tipoItem : ''
        this.uidItem = uidItem ? uidItem : ''
        this.detalles = detalles ? detalles : {}
        this.cantidad = cantidad ? cantidad : 0
        this.precioUnitario = precioUnitario ? precioUnitario : 0
        this.precioTotal = precioTotal ? precioTotal : 0
        this.fechaReembolsado = fechaReembolsado ? fechaReembolsado : null
    }

    getDetallesItem () {
        return { 
            tipoItem: this.tipoItem, 
            uidItem: this.uidItem, 
            detalles: this.detalles, 
            cantidad: this.cantidad, 
            precioUnitario: this.precioUnitario, 
            precioTotal: this.precioTotal, 
            fechaReembolsado: this.fechaReembolsado, 
        }
    }

    setDetallesItem (data = {}) {
        const { tipoItem, uidItem, detalles, 
            cantidad, precioUnitario, precioTotal, 
            fechaReembolsado } = data

        this.tipoItem = tipoItem ? tipoItem : ''
        this.uidItem = uidItem ? uidItem : ''
        this.detalles = detalles ? detalles : {}
        this.cantidad = cantidad ? cantidad : 0
        this.precioUnitario = precioUnitario ? precioUnitario : 0
        this.precioTotal = precioTotal ? precioTotal : 0
        this.fechaReembolsado = fechaReembolsado ? fechaReembolsado : null

        return this
    }

    async importarDetallesItem ( uidUsuario = '', uidPedido = '', uidDetallesItem = '' ) {
        const doc = await db
        .collection('Usuarios').doc(uidUsuario)
        .collection('Pedidos').doc(uidPedido)
        .collection(COLECCION).doc(uidDetallesItem)
        .get()

        if (!doc.exists) return null
        return this.setDetallesItem(doc.data())
    }

    static async obtener ( uidUsuario = '', uidPedido = '', uidDetallesItem = '' ) {
        const detallesItem = new DetallesItem()
        return await detallesItem.importarDetallesItem(uidUsuario, uidPedido, uidDetallesItem)
    }

    static async actualizar ( uidUsuario = '', uidPedido = '', uidDetallesItem = '', datosActualizados = {} ) {
        await db
        .collection('Usuarios').doc(uidUsuario)
        .collection('Pedidos').doc(uidPedido)
        .collection(COLECCION).doc(uidDetallesItem)
        .update(datosActualizados)
    }
}

module.exports = DetallesItem