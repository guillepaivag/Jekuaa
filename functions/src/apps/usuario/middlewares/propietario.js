const { request, response } = require("express")
const Errores = require("../../../models/Error/Errores")
const Authentication = require("../../../models/Usuarios/Authentication")
const Roles = require("../../../models/Usuarios/helpers/Roles")

const middlewares = {}

middlewares.validarDatosCambioRol = async (req = request, res = response, next) => {
    
    try {
        const { uidSolicitante, datosAuthSolicitante } = req.datos
        const { uidUsuario } = req.params
        const { rolNuevo } = req.body

        // Existencia de usuario
        const auth = new Authentication(uidUsuario)
        const userRecord = await auth.existeUsuario()
        req.datos.userRecord = userRecord

        if ( !userRecord ) {
            throw new Errores({
                estado: 400,
                mensajeCliente: 'no_existe_usuario',
                mensajeServidor: 'No existe este usuario.'
            })
        }
        
        // Existencia de rol
        const rol = new Roles(rolNuevo)
        const documentoRol = await rol.obtenerDocumentoRol()

        if (!documentoRol.exists) {
            throw new Errores({
                estado: 400,
                mensajeCliente: 'no_existe_rol',
                mensajeServidor: 'No existe este rol.'
            })
        }

        // Validaciones de datos
        if ( rolNuevo === userRecord.customClaims.rol ) {
            throw new Errores({
                estado: 400,
                mensajeCliente: 'ya_tiene_este_rol',
                mensajeServidor: 'Ya tiene este rol.'
            })
        }
        
        return next()

    } catch ( error ) {
        console.log('error', error)
        next(error)

    }

}

middlewares.validacionDeFuncionesParaModerador = async (req, res, next) => {
    
    try {
        const { datos, body } = req
        const { uidSolicitante, datosAuthSolicitante } = datos
        const { funciones } = body

        const funcionesValidas = [
            'moderador-usuarios',
            'moderador-cursos',
            'moderador-blogs',
        ]

        for (let i = 0; i < funciones.length; i++) {
            const funcion = funciones[i]
            
            let existe = funcionesValidas.includes(funcion)

            if (!existe) {
                throw new Errores({
                    estado: 400,
                    mensajeCliente: 'no_existe_esta_funcion',
                    mensajeServidor: `${funcion} no es una funcion válida.`
                })
            }
        }

        return next()

    } catch ( error ) {
        console.log('error', error)
        next(error)
    }

}

module.exports = middlewares