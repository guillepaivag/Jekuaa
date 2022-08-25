const Errores = require("../../../models/Error/Errores")

const middlewares = {}

middlewares.validacionDeFuncionesParaMiembro = async (req, res, next) => {
    
    try {
        const { datos, body } = req
        const { uidSolicitante, datosAuthSolicitante } = datos
        const { funciones } = body

        const funcionesValidas = [
            'instructor',
            'blogger',
            'instructor-auxiliar',
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