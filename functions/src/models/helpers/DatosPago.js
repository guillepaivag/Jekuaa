/**
 * formaDePago: Points, Visa ****0407, MasterCard ****0407, etc..
 */

class DatosPago {
    constructor (data = {}) {
        const { formaDePago, gratis } = data

        this.formaDePago = formaDePago ? formaDePago : ''
        this.gratis = gratis ? gratis : false
    }

    getDatosPago () {
        return {
            formaDePago: this.formaDePago,
            gratis: this.gratis,
        }
    }

    setDatosPago ( data = {} ) {
        const { formaDePago, gratis } = data

        this.setFormaDePago(formaDePago)
        this.setGratis(gratis)
        return this
    }

    setFormaDePago (formaDePago = '') {
        this.formaDePago = formaDePago
        return this
    }

    setGratis (gratis = false) {
        this.gratis = gratis
        return this
    }
}

module.exports = DatosPago