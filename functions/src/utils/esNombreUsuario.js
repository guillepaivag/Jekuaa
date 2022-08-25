function esNombreUsuario (cadena) {
    return /^[a-zA-Z0-9_]+$/.test(cadena)
}

module.exports = esNombreUsuario