const db = require('../../db')
const COLECCION = 'RegistrosDeActividadPorProducto'

class RegistroActividadProducto {
    constructor ( data = {} ) {
        const {
            uid, 
            uidComprador, uidVendedor, 
            tipoProducto, uidProducto, 
            uidPedido, referenciaPedido,
            uidDetallesItem, referenciaDetallesItem, 
            fechaCompra, fechaReembolso,
        } = data

        this.uid = uid ? uid : db.collection(COLECCION).doc().id
        this.uidComprador = uidComprador ? uidComprador : ''
        this.uidVendedor = uidVendedor ? uidVendedor : ''
        this.tipoProducto = tipoProducto ? tipoProducto : ''
        this.uidProducto = uidProducto ? uidProducto : ''
        this.uidPedido = uidPedido ? uidPedido : ''
        this.referenciaPedido = referenciaPedido ? referenciaPedido : null
        this.uidDetallesItem = uidDetallesItem ? uidDetallesItem : ''
        this.referenciaDetallesItem = referenciaDetallesItem ? referenciaDetallesItem : null
        this.fechaCompra = fechaCompra ? fechaCompra : null
        this.fechaReembolso = fechaReembolso ? fechaReembolso : null
    }

    getRegistroActividadProducto () {
        return {
            uid: this.uid, 
            uidComprador: this.uidComprador, 
            uidVendedor: this.uidVendedor, 
            tipoProducto: this.tipoProducto, 
            uidProducto: this.uidProducto, 
            uidPedido: this.uidPedido, 
            referenciaPedido: this.referenciaPedido,
            uidDetallesItem: this.uidDetallesItem, 
            referenciaDetallesItem: this.referenciaDetallesItem, 
            fechaCompra: this.fechaCompra, 
            fechaReembolso: this.fechaReembolso,
        }
    }

    setRegistroActividadProducto ( data = {} ) {
        const {
            uid, 
            uidComprador, uidVendedor, 
            tipoProducto, uidProducto, 
            uidPedido, referenciaPedido,
            uidDetallesItem, referenciaDetallesItem, 
            fechaCompra, fechaReembolso,
        } = data

        this.uid = uid ? uid : db.collection(COLECCION).doc().id
        this.uidComprador = uidComprador ? uidComprador : ''
        this.uidVendedor = uidVendedor ? uidVendedor : ''
        this.tipoProducto = tipoProducto ? tipoProducto : ''
        this.uidProducto = uidProducto ? uidProducto : ''
        this.uidPedido = uidPedido ? uidPedido : ''
        this.referenciaPedido = referenciaPedido ? referenciaPedido : null
        this.uidDetallesItem = uidDetallesItem ? uidDetallesItem : ''
        this.referenciaDetallesItem = referenciaDetallesItem ? referenciaDetallesItem : null
        this.fechaCompra = fechaCompra ? fechaCompra : null
        this.fechaReembolso = fechaReembolso ? fechaReembolso : null
    }

    async importarRegistroActividadProducto ( uidPedido = '', uidDetallesItem = '' ) {
        const snapshot = await db.collection(COLECCION)
        .where('uidPedido', '==', uidPedido)
        .where('uidDetallesItem', '==', uidDetallesItem)
        .get()

        if (snapshot.empty) return null
        const doc = snapshot.docs[0]

        this.setRegistroActividadProducto( doc.data() )

        return this
    }

    static async agregarRegistroActividadProducto ( registroActividadProducto = new RegistroActividadProducto() ) {
        const uid = registroActividadProducto.uid
        await db.collection(COLECCION).doc(uid).set( registroActividadProducto.getRegistroActividadProducto() )

        return registroActividadProducto
    }

    static async obtenerRegistroActividadProducto ( uidPedido = '', uidDetallesItem = '' ) {
        const registroActividadProducto = new RegistroActividadProducto()
        return await registroActividadProducto.importarRegistroActividadProducto(uidPedido, uidDetallesItem)
    }
    
    static async actualizarRegistroActividadProducto ( uidPedido = '', uidDetallesItem = '', datosActualizados = {} ) {
        const snapshot = await db.collection(COLECCION)
        .where('uidPedido', '==', uidPedido)
        .where('uidDetallesItem', '==', uidDetallesItem)
        .get()

        if (snapshot.empty) return null
        const doc = snapshot.docs[0]

        await doc.ref.update(datosActualizados)
    }

    static async eliminarRegistroActividadProducto ( uidPedido = '', uidDetallesItem = '' ) {
        const snapshot = await db.collection(COLECCION)
        .where('uidPedido', '==', uidPedido)
        .where('uidDetallesItem', '==', uidDetallesItem)
        .get()

        if (snapshot.empty) return null
        const doc = snapshot.docs[0]

        await doc.ref.delete()
    }
}

module.exports = RegistroActividadProducto