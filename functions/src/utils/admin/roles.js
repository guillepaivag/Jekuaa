const utilsRoles = {}

const roles = [
    {
        rol: 'propietario',
        nivel: 10
    },
    {
        rol: 'gerente',
        nivel: 9
    },
    {
        rol: 'moderador',
        nivel: 5
    },
    {
        rol: 'miembro',
        nivel: 4
    },
    {
        rol: 'estudiante',
        nivel: 1
    },
]

utilsRoles.getRoles = () => {
    return roles
}

utilsRoles.verificacionDeRolMayorAOtroRol = (rol, rolAVerificar) => {

    const datosRol = roles.find(datos => rol === datos.rol)
    const datosRolAVerificar = roles.find(datos => rolAVerificar === datos.rol)

    return datosRol.nivel - datosRolAVerificar.nivel

} 

module.exports = utilsRoles