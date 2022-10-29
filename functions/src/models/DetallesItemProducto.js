const DetallesItem = require("./DetallesItem");
const db = require("../../db")

const COLECCION = 'DetallesItemsProducto'

class DetallesItemProducto extends DetallesItem {
    constructor (data = {}) {
        const {
            precioUnitarioOriginal,
            porcentajeDescuento,
            precioUnitario,
            cantidad,
            precioTotal,
            tieneAlgunReembolso,
            todoReembolsado,
            cantidadReembolsado,
        } = data

        super(data)

        this.precioUnitarioOriginal = precioUnitarioOriginal ? precioUnitarioOriginal : 0
        this.porcentajeDescuento = porcentajeDescuento ? porcentajeDescuento : 0
        this.precioUnitario = precioUnitario ? precioUnitario : 0
        this.cantidad = cantidad ? cantidad : 0
        this.precioTotal = precioTotal ? precioTotal : 0
        this.tieneAlgunReembolso = tieneAlgunReembolso !== undefined ? tieneAlgunReembolso : false
        this.todoReembolsado = todoReembolsado !== undefined ? todoReembolsado : false
        this.cantidadReembolsado = cantidadReembolsado ? cantidadReembolsado : 0
    }

    getDetalleItemProducto () {
        return { 
            ...super.getDetallesItem(),
            precioUnitarioOriginal: this.precioUnitarioOriginal, 
            porcentajeDescuento: this.porcentajeDescuento, 
            precioUnitario: this.precioUnitario, 
            cantidad: this.cantidad, 
            precioTotal: this.precioTotal, 
            tieneAlgunReembolso: this.tieneAlgunReembolso, 
            todoReembolsado: this.todoReembolsado, 
            cantidadReembolsado: this.cantidadReembolsado, 
        }
    }

    setDetalleItemProducto (data = {}) {
        const {
            precioUnitarioOriginal,
            porcentajeDescuento,
            precioUnitario,
            cantidad,
            precioTotal,
            tieneAlgunReembolso,
            todoReembolsado,
            cantidadReembolsado,
        } = data

        super.setDetallesItem(data)

        this.precioUnitarioOriginal = precioUnitarioOriginal ? precioUnitarioOriginal : 0
        this.porcentajeDescuento = porcentajeDescuento ? porcentajeDescuento : 0
        this.precioUnitario = precioUnitario ? precioUnitario : 0
        this.cantidad = cantidad ? cantidad : 0
        this.precioTotal = precioTotal ? precioTotal : 0
        this.tieneAlgunReembolso = tieneAlgunReembolso !== undefined ? tieneAlgunReembolso : false
        this.todoReembolsado = todoReembolsado !== undefined ? todoReembolsado : false
        this.cantidadReembolsado = cantidadReembolsado ? cantidadReembolsado : 0

        return this
    }

    async importarDetallesItemProducto ( uidUsuario = '', uidPedido = '', uidDetallesItem = '' ) {

        const doc = await db
        .collection('Usuarios').doc(uidUsuario)
        .collection('PedidosProductos').doc(uidPedido)
        .collection(COLECCION).doc(uidDetallesItem)
        .get()

        if (!doc.exists) return null
        return this.setDetalleItemProducto(doc.data())
    }

    static async crear ( uidUsuario = '', uidPedido = '', detallesItems = [] ) {

        for (let i = 0; i < detallesItems.length; i++) {
            const detallesItemProducto = new DetallesItemProducto(detallesItems[i])
            
            await db
            .collection('Usuarios').doc(uidUsuario)
            .collection('PedidosProductos').doc(uidPedido)
            .collection(COLECCION).doc(detallesItemProducto.uidItem)
            .set(detallesItemProducto.getDetalleItemProducto())
        }

    }

    static async obtener ( uidUsuario = '', uidPedido = '', uidDetallesItem = '' ) {
        const detallesItemProducto = new DetallesItemProducto()
        return await detallesItemProducto.importarDetallesItemProducto(uidUsuario, uidPedido, uidDetallesItem)
    }

    static async actualizar ( uidUsuario = '', uidPedido = '', uidDetallesItem = '', datosActualizados = {} ) {
        await db
        .collection('Usuarios').doc(uidUsuario)
        .collection('PedidosProductos').doc(uidPedido)
        .collection(COLECCION).doc(uidDetallesItem)
        .update(datosActualizados)
    }
}

module.exports = DetallesItemProducto