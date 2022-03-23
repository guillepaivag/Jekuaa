const Errores = require("../../../models/Error/Errores")

const middleware = {}

middleware.validarMensajeCursoRevisionNoAceptado = async (req, res, next) => {
    
    try {
        const { datos, body } = req
        const { uidSolicitante, datosAuthSolicitante } = datos
        const { mensaje } = body

        if (!mensaje) {
            throw new Errores({
                codigo: 'error/usuario_mala_solicitud'
            })
        }

        if (mensaje.length === 0) {
            throw new Errores({
                codigo: 'error/usuario_mala_solicitud'
            })
        }

        return next()

    } catch ( error ) {
        console.log('error', error)
        next(error)
    }

}


module.exports = middleware