function esReferenciaURL (cadena) {
    return /^[a-zA-Z0-9-]+$/.test(cadena)
}

module.exports = esReferenciaURL