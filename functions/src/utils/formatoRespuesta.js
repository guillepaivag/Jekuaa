const formatoRespuesta = (status, respuesta) => {
    const { codigo, mensaje, resultado } = respuesta
    
    return {
        status,
        respuesta: {
            codigo,
            mensaje,
            resultado
        }
    }
}

module.exports = formatoRespuesta