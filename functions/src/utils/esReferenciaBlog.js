function esReferenciaBlog (cadena) {
    return /^[a-zA-Z0-9-]+$/.test(cadena)
}

module.exports = esReferenciaBlog