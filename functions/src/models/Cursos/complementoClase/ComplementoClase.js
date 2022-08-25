class ComplementoClase {
    constructor ( datos = {} ) {
        const {
            uid,
        } = datos
        
        this.uid = uid ? uid : ''
    }
}

module.exports = ComplementoClase