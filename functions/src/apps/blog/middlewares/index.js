const db = require('../../../../db')
const Errores = require("../../../models/Error/Errores")
const Blog = require("../../../models/Blogs/Blog")

const middlewares = {}

middlewares.velidarDatosMeGustaBlog = async (req, res, next) => {
    try {
        const { datos, body, params } = req
        const { uidSolicitante, datosAuthSolicitante } = datos
        const { uidBlog } = params
        const { meGusta } = body

        if (!Object.keys(body).length) {
            throw new TypeError('Se requiere una operación.')
        }

        if (meGusta === undefined) {
            throw new TypeError('Se requiere una operación.')
        }

        if (typeof meGusta !== 'boolean') {
            throw new TypeError('Debe ser un boolean al dar me gusta un blog.')
        }

        const ref = db.collection('Usuarios').doc(uidSolicitante)
        .collection('BlogsMG').doc(uidBlog)
        const doc = await ref.get()

        // Middleware me gusta
        if (meGusta) {
            if (doc.exists) {
                throw new Errores({
                    estado: 400,
                    mensajeCliente: 'ya_te_gusta_este_blog',
                    mensajeServidor: `Ya haz indicado que te gusta el blog.`
                })
            }
            
        } else {
            if (!doc.exists) {
                throw new Errores({
                    estado: 400,
                    mensajeCliente: 'no_te_gusta_este_blog',
                    mensajeServidor: `El blog no esta en tus gustos.`
                })
            }
        }

        next()
    } catch (error) {
        next(error)
    }
}

middlewares.verificacionExistenciaBlog = async (req, res, next) => {
    console.time('timeObtenerBlog')
    console.log('timeObtenerBlog gogogogog')
    try {
        const { params } = req
        const { uidBlog } = params

        const existe = await Blog.existeDocumentoBlog({ uid: uidBlog })
        
        if (!existe) {
            throw new Errores({
                estado: 400,
                mensajeCliente: 'no_existe_blog',
                mensajeServidor: `No existe el blog.`
            })
        }

        next()
    } catch (error) {
        next(error)
    }
}

module.exports = middlewares