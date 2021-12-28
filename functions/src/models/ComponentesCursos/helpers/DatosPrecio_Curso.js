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
        } = datos
        
        this.precio = precio ? precio : 0
        this.estado = estado ? estado : 'gratis'
        this.porcetajeDescuento = porcetajeDescuento ? porcetajeDescuento : 0
    }
}

module.exports = DatosPrecio_Curso