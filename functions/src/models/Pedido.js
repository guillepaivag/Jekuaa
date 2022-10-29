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
            estado, fechaPedido,
        } = data

        this.uid = uid ? uid : db.collection(COLECCION).doc().id
        this.uidComprador = uidComprador ? uidComprador : ''

        this.estado = estado ? estado : 'pendiente' // pendiente, cancelado, completado
        this.fechaPedido = fechaPedido ? fechaPedido : null
    }

    getPedido () {
        return { 
            uid: this.uid, 
            uidComprador: this.uidComprador, 

            estado: this.estado, 
            fechaPedido: this.fechaPedido, 
        }
    }

    setPedido ( data = {} ) {
        const { 
            uid, uidComprador, 
            estado, fechaPedido,
        } = data

        this.setUid(uid)
        this.setUidComprador(uidComprador)
        
        this.setEstado(estado)
        this.setFechaPedido(fechaPedido)

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


    setEstado (estado = 'pendiente') {
        this.estado = estado
        return this
    }

    setFechaPedido ( fechaPedido = null ) {
        this.fechaPedido = fechaPedido
        return this
    }

}

module.exports = Pedido