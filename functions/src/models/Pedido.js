const db = require("../../db")
const COLECCION = 'Pedidos'

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
 *      precioUnitarioOriginal: 205,
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
 *      precioUnitarioOriginal: 15.99,
 *      porcentajeDescuento: 0,
 *      cantidadUnitarioPackPoint: 200,
 *      bonusPackPoint: 10,
 *      cantidadTotalPoints: 210,
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
            uid, uidComprador, 
            cantidadItems, costoTotal, items, 
            estado, fechaPedido,
            cantidadReembolsado, todoReembolsado, tieneReembolso,  
            fechaCompra, datosPago,
        } = data

        this.uid = uid ? uid : db.collection(COLECCION).doc().id
        this.uidComprador = uidComprador ? uidComprador : ''
        
        this.cantidadItems = cantidadItems ? cantidadItems : 0
        this.costoTotal = costoTotal ? costoTotal : 0
        this.items = items ? items : [] // [{ tipoItem, uidItem, }]
        
        this.estado = estado ? estado : 'pendiente' // pendiente, cancelado, completado
        this.fechaPedido = fechaPedido ? fechaPedido : null
        
        this.cantidadReembolsado = cantidadReembolsado ? cantidadReembolsado : 0
        this.todoReembolsado = todoReembolsado !== undefined ? todoReembolsado : false
        this.tieneReembolso = tieneReembolso !== undefined ? tieneReembolso : false

        this.fechaCompra = fechaCompra ? fechaCompra : null
        this.datosPago = datosPago ? datosPago : null
    }

    getPedido () {
        return { 
            uid: this.uid, 
            uidComprador: this.uidComprador, 
 
            cantidadItems: this.cantidadItems,
            costoTotal: this.costoTotal, 
            items: this.items, 

            estado: this.estado, 
            fechaPedido: this.fechaPedido, 

            cantidadReembolsado: this.cantidadReembolsado,
            todoReembolsado: this.todoReembolsado,
            tieneReembolso: this.tieneReembolso, 

            fechaCompra: this.fechaCompra, 
            datosPago: this.datosPago, 
        }
    }

    setPedido ( data = {} ) {
        const { 
            uid, uidComprador, 
            cantidadItems, costoTotal, items, 
            estado, fechaPedido,
            cantidadReembolsado, todoReembolsado, tieneReembolso,  
            fechaCompra, datosPago,
        } = data

        this.setUid(uid)
        this.setUidComprador(uidComprador)
        
        this.setCantidadItems(cantidadItems)
        this.setCostoTotal(costoTotal)
        this.setItems(items)

        this.setEstado(estado)
        this.setFechaPedido(fechaPedido)

        this.setCantidadReembolsado(cantidadReembolsado)
        this.setTodoReembolsado(todoReembolsado)
        this.setTieneReembolso(tieneReembolso)

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

    setFechaCompra ( fechaCompra = null ) {
        this.fechaCompra = fechaCompra
        return this
    }

    setDatosPago ( datosPago = null ) {
        this.datosPago = datosPago
        return this
    }
}

module.exports = Pedido