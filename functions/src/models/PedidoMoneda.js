const db = require("../../db")
const Pedido = require("./Pedido");

const COLECCION = 'PedidosMonedas'

class PedidoMoneda extends Pedido {
    constructor (data = {}) {
        const { 
            tieneRecibo, tieneFactura
        } = data

        super(data)
        this.tipoPedido = 'monedas'
        this.tieneRecibo = tieneRecibo !== undefined ? tieneRecibo : false
        this.tieneFactura = tieneFactura !== undefined ? tieneFactura : false
    }

    getPedidoMoneda () {
        return {
            ...super.getPedido(),
            tipoPedido: this.tipoPedido,
            tieneRecibo: this.tieneRecibo,
            tieneFactura: this.tieneFactura,
        }
    }

    setPedidoMoneda (data = {}) {
        const { 
            tieneRecibo, tieneFactura
        } = data

        super.setPedido(data)
        this.tieneRecibo = tieneRecibo !== undefined ? tieneRecibo : false
        this.tieneFactura = tieneFactura !== undefined ? tieneFactura : false
        
        return this
    }

    async importarPedidoMoneda ( uidUsuario = '', uidPedido = '' ) {
        const doc = await db.collection('Usuarios').doc(uidUsuario)
        .collection(COLECCION).doc(uidPedido).get()

        if (!doc.exists) return null
        return this.setPedidoMoneda(doc.data())
    }

    static async agregar ( uidUsuario = '', pedidoMoneda = new PedidoMoneda() ) {
        const data = pedidoMoneda.getPedidoMoneda()
        
        await db.collection('Usuarios').doc(uidUsuario)
        .collection(COLECCION).doc(data.uid)
        .set(data)
    }

    static async obtener ( uidUsuario = '', uidPedido = '' ) {
        const pedidoMoneda = new PedidoMoneda()
        return await pedidoMoneda.importarPedidoMoneda(uidUsuario, uidPedido)
    }

    static async actualizar ( uidUsuario = '', uidPedido = '', datosActualizados = {} ) {
        await db.collection('Usuarios').doc(uidUsuario)
        .collection(COLECCION).doc(uidPedido)
        .update(datosActualizados)
    }

    static async eliminar ( uidUsuario = '', uidPedido = '' ) {
        await db.collection('Usuarios').doc(uidUsuario)
        .collection(COLECCION).doc(uidPedido)
        .delete()
    }
}

module.exports = PedidoMoneda