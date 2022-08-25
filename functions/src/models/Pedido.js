const db = require("../../db")
const { milliseconds_a_timestamp } = require("../utils/timestamp")
const DatosPago = require("./helpers/DatosPago")
const DetallesItem = require("./helpers/DetallesItem")
const COLECCION = 'Pedidos'
const COLECCION_DETALLES_ITEM = 'DetallesItems'

/**
 * DetallesItems:
 *  DetallesItem
 *      tipoItem, 
 *      uidItem,
 *      detalles,
 *      cantidad, 
 *      precioUnitario, 
 *      precioTotal,
 *      fechaReembolsado,
*/

/**
 * Tipos de items:
 * ---- TipoPedido: 'productos' ----
 * items: [{ 
 *  tipoItem: 'curso', 
 *  uidItem: '45s6da4fds56f156sd4fd', 
 *  detalles: {
 *      precioReal: 205,
 *      porcentajeDescuento: 0,
 *  },
 *  cantidad: 1, 
 *  precioUnitario: 205, 
 *  precioTotal: 205, 
 *  fechaReembolsado: null,
 * }]
 * 
 * ---- TipoPedido: 'monedas' ----
 * items: [{ 
 *  tipoItem: 'monedas', 
 *  uidItem: 'pack-3', 
 *  detalles: {
 *      precioReal: 15.99,
 *      porcentajeDescuento: 0,
 *      precioPoint: 200,
 *      bunus: 10,
 *      precioTotalPoint: 210,
 *  },
 *  cantidad: 5, 
 *  precioUnitario: 15.99, 
 *  precioTotal: 47.97, 
 *  fechaReembolsado: null,
 * }]
 */

class Pedido {
    constructor ( data = {} ) {
        const { 
            uid, uidComprador, tipoPedido, 
            cantidadItems, costoTotal, items, cantidadReembolsado, todoReembolsado,
            estado, fechaPedido,
            tieneReembolso, tieneRecibo, tieneFactura, fechaCompra, datosPago
        } = data

        this.uid = uid ? uid : db.collection(COLECCION).doc().id
        this.uidComprador = uidComprador ? uidComprador : ''
        this.tipoPedido = tipoPedido ? tipoPedido : 'productos' // productos, monedas
        
        this.cantidadItems = cantidadItems ? cantidadItems : 0
        this.costoTotal = costoTotal ? costoTotal : 0
        this.items = items ? items : [] // [{ tipoItem, uidItem, }]
        this.cantidadReembolsado = cantidadReembolsado ? cantidadReembolsado : 0
        this.todoReembolsado = todoReembolsado !== undefined ? todoReembolsado : false
        
        this.estado = estado ? estado : 'pendiente' // pendiente, cancelado, completado
        this.fechaPedido = fechaPedido ? fechaPedido : null

        this.tieneReembolso = tieneReembolso !== undefined ? tieneReembolso : false
        this.tieneRecibo = tieneRecibo !== undefined ? tieneRecibo : false
        this.tieneFactura = tieneFactura !== undefined ? tieneFactura : false
        this.fechaCompra = fechaCompra ? fechaCompra : null
        this.datosPago = datosPago ? datosPago : null
    }

    getPedido () {
        return { 
            uid: this.uid, 
            uidComprador: this.uidComprador, 
            tipoPedido: this.tipoPedido, 
            cantidadItems: this.cantidadItems,
            costoTotal: this.costoTotal, 
            items: this.items, 
            cantidadReembolsado: this.cantidadReembolsado,
            todoReembolsado: this.todoReembolsado,
            estado: this.estado, 
            fechaPedido: this.fechaPedido, 

            tieneReembolso: this.tieneReembolso, 
            tieneRecibo: this.tieneRecibo, 
            tieneFactura: this.tieneFactura, 
            fechaCompra: this.fechaCompra, 
            datosPago: this.datosPago, 
        }
    }

    setPedido ( data = {} ) {
        const { 
            uid, uidComprador, tipoPedido, 
            cantidadItems, costoTotal, items, cantidadReembolsado, todoReembolsado,
            estado, fechaPedido,
            tieneReembolso, tieneRecibo, tieneFactura, fechaCompra, datosPago
        } = data

        this.setUid(uid)
        this.setUidComprador(uidComprador)
        this.setTipoPedido(tipoPedido)
        this.setCantidadItems(cantidadItems)
        this.setCostoTotal(costoTotal)
        this.setItems(items)
        this.setCantidadReembolsado(cantidadReembolsado)
        this.setTodoReembolsado(todoReembolsado)
        this.setEstado(estado)
        this.setFechaPedido(fechaPedido)

        this.setTieneReembolso(tieneReembolso)
        this.setTieneRecibo(tieneRecibo)
        this.setTieneFactura(tieneFactura)
        this.setFechaCompra(fechaCompra)
        this.setDatosPago(datosPago)

        return this
    }

    setUid (uid = db.collection(COLECCION).doc().id) {
        this.uid = uid
        return this
    }

    setUidComprador ( uidComprador = '' ) {
        this.uidComprador = uidComprador
        return this
    }

    setTipoPedido ( tipoPedido = 'productos' ) {
        this.tipoPedido = tipoPedido
        return this
    }

    setCantidadItems ( cantidadItems = 0 ) {
        this.cantidadItems = cantidadItems
        return this
    }

    setCostoTotal ( costoTotal = 0 ) {
        this.costoTotal = costoTotal
        return this
    }

    setItems ( items = [] ) {
        this.items = items
        return this
    }

    setCantidadReembolsado ( cantidadReembolsado = 0 ) {
        this.cantidadReembolsado = cantidadReembolsado
        return this
    }

    setTodoReembolsado ( todoReembolsado = false ) {
        this.todoReembolsado = todoReembolsado
        return this
    }

    setEstado (estado = 'pendiente') {
        this.estado = estado
        return this
    }

    setFechaPedido ( fechaPedido = null ) {
        this.fechaPedido = fechaPedido
        return this
    }

    setTieneReembolso ( tieneReembolso = false ) {
        this.tieneReembolso = tieneReembolso
        return this
    }

    setTieneRecibo ( tieneRecibo = false ) {
        this.tieneRecibo = tieneRecibo
        return this
    }

    setTieneFactura ( tieneFactura = false ) {
        this.tieneFactura = tieneFactura
        return this
    }

    setFechaCompra ( fechaCompra = null ) {
        this.fechaCompra = fechaCompra
        return this
    }

    setDatosPago ( datosPago = null ) {
        this.datosPago = datosPago
        return this
    }

    async importarPedido ( uidUsuario = '', uidPedido = '' ) {
        const doc = await db.collection('Usuarios').doc(uidUsuario)
        .collection(COLECCION).doc(uidPedido).get()

        if (!doc.exists) return null
        return this.setPedido(doc.data())
    }

    static async agregar ( uidUsuario = '', pedido = new Pedido() ) {
        const data = pedido.getPedido()
        
        await db.collection('Usuarios').doc(uidUsuario)
        .collection(COLECCION).doc(data.uid)
        .set(data)
    }

    static async obtener ( uidUsuario = '', uidPedido = '' ) {
        const pedido = new Pedido()
        return await pedido.importarPedido(uidUsuario, uidPedido)
    }

    static async actualizar ( uidUsuario = '', uidPedido = '', datosActualizados = {} ) {
        await db.collection('Usuarios').doc(uidUsuario)
        .collection(COLECCION).doc(uidPedido)
        .update(datosActualizados)
    }

    static async eliminar ( uidUsuario = '',uidPedido = '' ) {
        await db.collection('Usuarios').doc(uidUsuario)
        .collection(COLECCION).doc(uidPedido)
        .delete()
    }

    // Personalizados
    static async crearDetallesItems ( uidUsuario = '', uidPedido = '', detallesItems = [] ) {

        for (let i = 0; i < detallesItems.length; i++) {
            const detallesItem = new DetallesItem(detallesItems[i])
            
            await db
            .collection('Usuarios').doc(uidUsuario)
            .collection(COLECCION).doc(uidPedido)
            .collection(COLECCION_DETALLES_ITEM).doc(detallesItem.uidItem)
            .set(detallesItem.getDetallesItem())
        }

    }

    static async reembolsar () {
        
    }
}

module.exports = Pedido