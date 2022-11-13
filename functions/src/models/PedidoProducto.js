const db = require("../../db")
const Pedido = require("./Pedido");

const COLECCION = 'PedidosProductos'

class PedidoProducto extends Pedido {
    constructor (data = {}) {
        const {
            cantidadPaquetesDeItems,
            cantidadTotalItems,
            costoTotal,
            formaDePago,
            fechaCompra,
            items,
            tieneAlgunReembolso,
            todoReembolsado,
            cantidadReembolsado,
        } = data

        super(data)

        this.cantidadPaquetesDeItems = cantidadPaquetesDeItems ? cantidadPaquetesDeItems : 0
        this.cantidadTotalItems = cantidadTotalItems ? cantidadTotalItems : 0
        this.costoTotal = costoTotal ? costoTotal : 0
        this.formaDePago = formaDePago ? formaDePago : ''
        this.fechaCompra = fechaCompra ? fechaCompra : null
        this.items = items ? items : [] // [{ tipoItem, uidItem, }]
        this.tieneAlgunReembolso = tieneAlgunReembolso !== undefined ? tieneAlgunReembolso : false
        this.todoReembolsado = todoReembolsado !== undefined ? todoReembolsado : false
        this.cantidadReembolsado = cantidadReembolsado ? cantidadReembolsado : 0
    
    }

    getPedidoProducto () {
        return {
            ...super.getPedido(),
            cantidadPaquetesDeItems: this.cantidadPaquetesDeItems,
            cantidadTotalItems: this.cantidadTotalItems,
            costoTotal: this.costoTotal,
            formaDePago: this.formaDePago,
            fechaCompra: this.fechaCompra,
            items: this.items,
            tieneAlgunReembolso: this.tieneAlgunReembolso,
            todoReembolsado: this.todoReembolsado,
            cantidadReembolsado: this.cantidadReembolsado,
        }
    }

    setPedidoProducto (data = {}) {
        const {
            cantidadPaquetesDeItems,
            cantidadTotalItems,
            costoTotal,
            formaDePago,
            fechaCompra,
            items,
            tieneAlgunReembolso,
            todoReembolsado,
            cantidadReembolsado,
        } = data

        super.setPedido(data)

        this.cantidadPaquetesDeItems = cantidadPaquetesDeItems ? cantidadPaquetesDeItems : 0
        this.cantidadTotalItems = cantidadTotalItems ? cantidadTotalItems : 0
        this.costoTotal = costoTotal ? costoTotal : 0
        this.formaDePago = formaDePago ? formaDePago : ''
        this.fechaCompra = fechaCompra ? fechaCompra : null
        this.items = items ? items : [] // [{ tipoItem, uidItem, }]
        this.tieneAlgunReembolso = tieneAlgunReembolso !== undefined ? tieneAlgunReembolso : false
        this.todoReembolsado = todoReembolsado !== undefined ? todoReembolsado : false
        this.cantidadReembolsado = cantidadReembolsado ? cantidadReembolsado : 0
        
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