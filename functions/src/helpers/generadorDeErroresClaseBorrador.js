const ClaseBorrador = require("../models/Cursos/clase/ClaseBorrador")

const generadorDeErroresClaseBorrador = async (claseBorrador = new ClaseBorrador()) => {
    const mensajesError = []

    if ( claseBorrador.titulo === '' ) 
        mensajesError.push('clase_no_existe_titulo')

    if ( !claseBorrador.contribuyentes.length ) 
        mensajesError.push('clase_no_existe_contribuyentes')

    if ( claseBorrador.descripcion === '' ) 
        mensajesError.push('clase_no_existe_descripcion')

    if ( claseBorrador.duracion === 0 ) 
        mensajesError.push('clase_no_existe_duracion')

    if ( claseBorrador.tipoClase === '' ) 
        mensajesError.push('clase_no_existe_tipoclase')

    return mensajesError
}

module.exports = generadorDeErroresClaseBorrador