function obtenerEdad ( valor = Date.now() ) {
    return (Date.now() - valor) * 3.2*Math.pow(10, -11)
}

module.exports = obtenerEdad