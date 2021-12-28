const ErrorJekuaa = require("../models/Error/ErroresJekuaa")

const middlewares = {}

middlewares.velidarDatosMeGustaBlog = async (req, res, next) => {
    try {
        const { jekuaaDatos, body, params } = req
        const { uidSolicitante, datosAuthSolicitante } = jekuaaDatos
        const { uid } = params
        const { meGusta } = body

        if (!Object.keys(body).length) {
            throw new ErrorJekuaa({
                codigo: 'jekuaa/error/usuario_mala_solicitud',
                mensaje: `Se requiere una operación.`
            })
        }

        if (meGusta === undefined) {
            throw new ErrorJekuaa({
                codigo: 'jekuaa/error/usuario_mala_solicitud',
                mensaje: `Se requiere una operación.`
            })
        }

        if (typeof meGusta !== 'boolean') {
            throw new ErrorJekuaa({
                codigo: 'jekuaa/error/usuario_mala_solicitud',
                mensaje: `Debe ser un boolean al dar me gusta un blog.`
            })
        }

        const ref = db.collection('Usuarios').doc(uidSolicitante)
        .collection('BlogsMG').doc(uid)
        const doc = await ref.get()

        // Middleware me gusta
        if (meGusta) {
            if (doc.exists) {
                throw new ErrorJekuaa({
                    codigo: 'jekuaa/error/usuario_mala_solicitud',
                    mensaje: `Ya haz indicado que te gusta el blog.`
                })
            }
            
        } else {
            if (!doc.exists) {
                throw new ErrorJekuaa({
                    codigo: 'jekuaa/error/usuario_mala_solicitud',
                    mensaje: `El blog no esta en tus gustos.`
                })
            }
        }

        next()
    } catch (error) {
        next(error)
    }
}

module.exports = middlewares