const Errores = require("../../../models/Error/Errores")

const middleware = {}

middleware.validacionDeFuncionesParaMiembro = async (req, res, next) => {
    
    try {
        const { datos, body } = req
        const { uidSolicitante, datosAuthSolicitante } = datos
        const { funciones } = body

        const funcionesValidas = [
            'instructor',
            'blogger'
        ]

        for (let i = 0; i < funciones.length; i++) {
            const funcion = funciones[i]
            
            let existe = funcionesValidas.includes(funcion)

            if (!existe) {
                throw new Errores({
                    codigo: 'error/usuario_mala_solicitud'
                })
            }
        }

        return next()

    } catch ( error ) {
        console.log('error', error)
        next(error)
    }

}


module.exports = middleware