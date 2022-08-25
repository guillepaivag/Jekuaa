const db = require("../../db")

const COLECCION = 'InformesDeVentasDelInstructor'

class InformeVentaInstructor {
    constructor (data = {}) {
        const { uid, uidPedido, tipoProducto, uidProducto, fechaVenta, cantidadTotalPoints, fechaReembolsado } = data

        this.uid = uid ? uid : db.collection(COLECCION).doc().id
        this.uidPedido = uidPedido ? uidPedido : ''
        this.tipoProducto = tipoProducto ? tipoProducto : ''
        this.uidProducto = uidProducto ? uidProducto : ''
        this.fechaVenta = fechaVenta ? fechaVenta : null
        this.cantidadTotalPoints = cantidadTotalPoints ? cantidadTotalPoints : 0
        this.fechaReembolsado = fechaReembolsado ? fechaReembolsado : null
    }

    getInformeVentaInstructor () {
        return { 
            uid: this.uid, 
            uidPedido: this.uidPedido, 
            tipoProducto: this.tipoProducto, 
            uidProducto: this.uidProducto, 
            fechaVenta: this.fechaVenta, 
            cantidadTotalPoints: this.cantidadTotalPoints, 
            fechaReembolsado: this.fechaReembolsado 
        }
    }

    setInformeVentaInstructor (data = {}) {
        const { uid, uidPedido, tipoProducto, uidProducto, fechaVenta, cantidadTotalPoints, fechaReembolsado } = data

        this.uid = uid ? uid : db.collection(COLECCION).doc().id
        this.uidPedido = uidPedido ? uidPedido : ''
        this.tipoProducto = tipoProducto ? tipoProducto : ''
        this.uidProducto = uidProducto ? uidProducto : ''
        this.fechaVenta = fechaVenta ? fechaVenta : null
        this.cantidadTotalPoints = cantidadTotalPoints ? cantidadTotalPoints : 0
        this.fechaReembolsado = fechaReembolsado ? fechaReembolsado : null

        return this
    }

    async importarInformeVentaInstructor ( uidUsuario = '', uidInformeVentaInstructor = '' ) {
        const doc = await db.collection('Miembros').doc(uidUsuario)
        .collection(COLECCION).doc(uidInformeVentaInstructor).get()

        if (!doc.exists) return null
        return this.setInformeVentaInstructor(doc.data())
    }

    static async agregar ( uidUsuario = '', informeVentaInstructor = new InformeVentaInstructor() ) {
        const data = informeVentaInstructor.getInformeVentaInstructor()
        
        await db.collection('Miembros').doc(uidUsuario)
        .collection(COLECCION).doc(data.uid)
        .set(data)
    }

    static async obtener ( uidUsuario = '', uidInformeVentaInstructor = '' ) {
        const informeVentaInstructor = new InformeVentaInstructor()
        return await informeVentaInstructor.importarInformeVentaInstructor(uidUsuario, uidInformeVentaInstructor)
    }

    static async actualizar ( uidUsuario = '', uidInformeVentaInstructor = '', datosActualizados = {} ) {
        await db.collection('Miembros').doc(uidUsuario)
        .collection(COLECCION).doc(uidInformeVentaInstructor)
        .update(datosActualizados)
    }

    static async eliminar ( uidUsuario = '', uidInformeVentaInstructor = '' ) {
        await db.collection('Miembros').doc(uidUsuario)
        .collection(COLECCION).doc(uidInformeVentaInstructor)
        .delete()
    }
}

module.exports = InformeVentaInstructor