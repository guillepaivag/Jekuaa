const seccionesValidas = [
    'informatica',
    'matematica'
]

const verificadorDeSecciones = {}

verificadorDeSecciones.verificacionDeSeccionValida = ( secciones = [] ) => {

    if ( !secciones instanceof Array ) {
        return false
    }

    if ( !secciones.length ) {
        return false
    }

    for (let i = 0; i < secciones.length; i++) {
        const seccionSeleccionada = secciones[i];
        
        if ( !seccionesValidas.includes(seccionSeleccionada) ) {
            return false
        }
    }

    return true

}

verificadorDeSecciones.necesitaSecciones = ( rol ) => {
    return rol != 'propietario' && rol != 'estudiante'
}

module.exports = verificadorDeSecciones