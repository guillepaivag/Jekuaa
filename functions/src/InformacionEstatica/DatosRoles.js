/**
 * FUNCIONES PARA ACTUALIZAR LOS DATOS
 * VALIDOS DE ROLES
 */

function agregarRol ( datoRol ) {
    const {
        rol, nesecitaSecciones, esMiembroJekuaa, nivel
    } = datoRol

    datosRoles.push({
        rol,
        nesecitaSecciones,
        esMiembroJekuaa,
        nivel
    })
}

const datosRoles = []

agregarRol({
    rol: 'propietario',
    nesecitaSecciones: false,
    esMiembroJekuaa: true,
    nivel: 10
})
agregarRol({
    rol: 'miembroJekuaa',
    nesecitaSecciones: true,
    esMiembroJekuaa: true,
    nivel: 5
})
agregarRol({
    rol: 'estudiante',
    nesecitaSecciones: false,
    esMiembroJekuaa: false,
    nivel: 1
})

module.exports = datosRoles