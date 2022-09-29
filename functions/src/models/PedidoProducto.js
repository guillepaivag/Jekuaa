const db = require("../../db")
const Pedido = require("./Pedido");

const COLECCION = 'PedidosProductos'

class PedidoProducto extends Pedido {
    constructor (data = {}) {
        super(data)
        this.tipoPedido = 'productos'
    }

    getPedidoProducto () {
        return {
            ...super.getPedido(),
            tipoPedido: this.tipoPedido
        }
    }

    setPedidoProducto (data = {}) {
        super.setPedido(data)
        return this
    }

    async importarPedidoProducto ( uidUsuario = '', uidPedido = '' ) {
        const doc = await db.collection('Usuarios').doc(uidUsuario)
        .collection(COLECCION).doc(uidPedido).get()

        if (!doc.exists) return null
        return this.setPedidoProducto(doc.data())
    }

    static async agregar ( uidUsuario = '', pedidoProducto = new PedidoProducto() ) {
        const data = pedidoProducto.getPedidoProducto()
        
        await db.collection('Usuarios').doc(uidUsuario)
        .collection(COLECCION).doc(data.uid)
        .set(data)
    }

    static async obtener ( uidUsuario = '', uidPedido = '' ) {
        const pedidoProducto = new PedidoProducto()
        return await pedidoProducto.importarPedidoProducto(uidUsuario, uidPedido)
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

module.exports = PedidoProducto