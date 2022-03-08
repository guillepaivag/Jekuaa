const ESTADOS_VALIDOS = [
    'gratis',
    'descuento',
    'pago',
]

class DatosPrecio_Curso {
    constructor (datos = {}) {
        const {
            precio,
            estado,
            porcetajeDescuento,
            fechaFinDescuento,
        } = datos
        
        this.precio = precio ? precio : 0
        this.estado = estado ? estado : 'gratis'
        this.porcetajeDescuento = porcetajeDescuento ? porcetajeDescuento : 0
        this.fechaFinDescuento = fechaFinDescuento ? fechaFinDescuento : null
    }

    getDatosPrecio_Curso () {
        return {
            precio: this.precio,
            estado: this.estado,
            porcetajeDescuento: this.porcetajeDescuento,
            fechaFinDescuento: this.fechaFinDescuento,
        }
    }
}

module.exports = DatosPrecio_Curso