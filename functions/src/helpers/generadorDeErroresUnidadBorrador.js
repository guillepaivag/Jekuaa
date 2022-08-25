const UnidadBorrador = require("../models/Cursos/unidad/UnidadBorrador")

const generadorDeErroresUnidadBorrador = async (unidadBorrador = new UnidadBorrador()) => {
    const mensajesError = []

    if ( unidadBorrador.nombreUnidad === '' ) 
        mensajesError.push('unidad_no_existe_nombre')

    if ( unidadBorrador.cantidadClases === 0 ) 
        mensajesError.push('unidad_no_existe_cantidad_clases')

    if ( unidadBorrador.duracion === 0 ) 
        mensajesError.push('unidad_no_existe_duracion')

    return mensajesError
}

module.exports = generadorDeErroresUnidadBorrador