class DatosPrecio_Curso {
    constructor (datos = {}) {
        const {
            precio,
            descuento,
        } = datos
        
        this.precio = precio ? precio : 0
        this.descuento = descuento ? {
            precio: descuento.precio,
            porcentaje: descuento.porcentaje,
            fechaInicio: descuento.fechaInicio,
            fechaFin: descuento.fechaFin,
        } : null
    }

    getDatosPrecio_Curso () {
        return {
            precio: this.precio,
            descuento: this.descuento,
        }
    }
}

module.exports = DatosPrecio_Curso