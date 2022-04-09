const admin = require('../../../../../firebase-service')
const db = require('../../../../../db')
const utils_blog = require("../../../../utils/blog")

const Blog = require("../../../../models/Blogs/Blog")
const Errores = require("../../../../models/Error/Errores")
const Usuario = require("../../../../models/Usuarios/Usuario")
const Authentication = require('../../../../models/Usuarios/Authentication')
const esReferenciaURL = require("../../../../utils/esReferenciaURL")
const Roles = require('../../../../models/Usuarios/helpers/Roles')

const middlewares = {}

middlewares.verificadorDeDatosRequeridos  = (req, res, next) => {
    try {
        const { datos, body } = req
        const { datosBlog, contenidoBlog } = body

        const esOperacionAgregar = req.method === 'POST'

        if (!Object.keys(body).length) {
            throw new Errores({
                codigo: 'error/usuario_mala_solicitud',
                mensaje: 'No existen los datos necesarios.'
            })
        }

        if ( (!datosBlog || !Object.keys(datosBlog).length) && !contenidoBlog ) {
            throw new Errores({
                codigo: 'error/usuario_mala_solicitud',
                mensaje: 'No existen los datos necesarios.'
            })
        }

        if (esOperacionAgregar) {
            
            if (Object.keys(body).length !== 2) {
                throw new Errores({
                    codigo: 'error/usuario_mala_solicitud',
                    mensaje: 'No existen los datos necesarios.'
                })
            }

            if ( !datosBlog ) {
                throw new Errores({
                    codigo: 'error/usuario_mala_solicitud',
                    mensaje: 'No existen los datos necesarios.'
                })
            }

            const {
                uid,
                referencia,
                titulo,
                descripcion,
                equipo,
                publicador,
                seccion,
                categorias,
                cantidadMeGusta,
                habilitado,
                publicado,
                revision,
                fechaCreacion,
                fechaActualizacion,
            } = datosBlog
    
            if ( !referencia ) {
                throw new Errores({
                    codigo: 'error/usuario_mala_solicitud',
                    mensaje: 'La referencia del blog debe existir.'
                })
            }
        
            if ( !titulo ) {
                throw new Errores({
                    codigo: 'error/usuario_mala_solicitud',
                    mensaje: 'El titulo debe existir.'
                })
            }
        
            if ( !descripcion ) {
                throw new Errores({
                    codigo: 'error/usuario_mala_solicitud',
                    mensaje: 'La descripción debe existir.'
                })
            }
        
            if ( !publicador ) {
                throw new Errores({
                    codigo: 'error/usuario_mala_solicitud',
                    mensaje: 'El publicador debe existir.'
                })
            }
        
            if ( seccion ) {
                if ( !categorias || !categorias.length ) {
                    throw new Errores({
                        codigo: 'error/usuario_mala_solicitud',
                        mensaje: 'La categoría debe existir.'
                    })
                }
            }
        
            if ( !contenidoBlog ) {
                throw new Errores({
                    codigo: 'error/usuario_mala_solicitud',
                    mensaje: 'El contenido del blog debe existir.'
                })
            }
        }

        next()
    } catch (error) {
        next(error)
    }
}

middlewares.verificadorDeTipoDeDatos = (req, res, next) => {
    try {
        const { datos, body } = req
        const { datosBlog, contenidoBlog } = body

        if (datosBlog) {
            if (typeof datosBlog != 'object') {
                throw new Errores({
                    codigo: 'error/usuario_mala_solicitud',
                    mensaje: 'Los datosBlog debe ser un objecto.'
                })
            }
            
            const {
                uid,
                referencia,
                titulo,
                descripcion,
                equipo,
                publicador,
                seccion,
                categorias,
                cantidadMeGusta,
                habilitado,
                publicado,
                revision,
                fechaCreacion,
                fechaActualizacion,
            } = datosBlog

            const esOperacionAgregar = req.method === 'POST'
        
            /**
             * Tipos de datos: Formato y tipo de datos 
             * correctos para un blog
             * 
            */
    
            if ( !!referencia && typeof referencia != 'string' ) {
                throw new Errores({
                    codigo: 'error/usuario_mala_solicitud',
                    mensaje: 'La referencia del blog debe ser string.'
                })
            }
        
            if ( !!titulo && typeof titulo != 'string' ) {
                throw new Errores({
                    codigo: 'error/usuario_mala_solicitud',
                    mensaje: 'El titulo del blog debe ser string.'
                })
            }
        
            if ( !!descripcion && typeof descripcion != 'string' ) {
                throw new Errores({
                    codigo: 'error/usuario_mala_solicitud',
                    mensaje: 'La descripción del blog debe ser string.'
                })
            }

            if ( esOperacionAgregar ) {                
                if ( typeof publicador != 'string' ) {
                    throw new Errores({
                        codigo: 'error/usuario_mala_solicitud',
                        mensaje: 'El publicador del blog debe ser string.'
                    })
                }

                if (seccion) {
                    if (typeof seccion != 'string' ) {
                        throw new Errores({
                            codigo: 'error/usuario_mala_solicitud',
                            mensaje: 'La sección del blog debe ser string.'
                        })
                    } 
                
                    if (!(categorias instanceof Array)) {
                        throw new Errores({
                            codigo: 'error/usuario_mala_solicitud',
                            mensaje: 'Las categorias del blog debe ser un arreglo de string.'
                        })
                    }
                    
                    for (let i = 0; i < categorias.length; i++) {
                        const categoria = categorias[i]
                        if (typeof categoria != 'string') {
                            throw new Errores({
                                codigo: 'error/usuario_mala_solicitud',
                                mensaje: 'Las categorias del blog debe ser un arreglo de string.'
                            })
                        }
                    }
                }
            } else {
                if (seccion !== undefined && seccion !== '') {
                    if ( !!seccion && typeof seccion !== 'string' ) {
                        throw new Errores({
                            codigo: 'error/usuario_mala_solicitud',
                            mensaje: 'La sección del blog debe ser string.'
                        })
                    }
                
                    if ( !!categorias ) {
                        if (!(categorias instanceof Array)) {
                            throw new Errores({
                                codigo: 'error/usuario_mala_solicitud',
                                mensaje: 'Las categorias del blog debe ser un arreglo de string.'
                            })
                        }
                        
                        for (let i = 0; i < categorias.length; i++) {
                            const categoria = categorias[i]
                            if (typeof categoria != 'string') {
                                throw new Errores({
                                    codigo: 'error/usuario_mala_solicitud',
                                    mensaje: 'Las categorias del blog debe ser un arreglo de string.'
                                })
                            }
                        }
                    }
                }
            }
            
            if ( publicado != undefined && typeof publicado != 'boolean' ) {
                throw new Errores({
                    codigo: 'error/usuario_mala_solicitud',
                    mensaje: 'El estado publicado del blog debe ser boolean.'
                })
            }
        }
    
        if ( !!contenidoBlog && typeof contenidoBlog != 'string' ) {
            throw new Errores({
                codigo: 'error/usuario_mala_solicitud',
                mensaje: 'El contenido del blog debe ser string.'
            })
        }

        next()

    } catch (error) {
        next(error)
        
    }
}

middlewares.verificadorDeDatosBlog = async (req, res, next) => {
    try {
        const { datos, body, params } = req
        const { uidSolicitante, datosAuthSolicitante } = datos
        const { datosBlog, contenidoBlog } = body
    
        const usuario = new Usuario()
        await usuario.importarDatosUsuarioPorUID(uidSolicitante) 
        const datosUsuario = usuario.getDatosUsuario()

        const esOperacionAgregar = req.method === 'POST'

        if ( datosBlog ) {
            const {
                uid,                    // constante
                referencia,             // usuario
                titulo,                 // usuario
                descripcion,            // usuario
                equipo,
                publicador,             // constante
                seccion,                // usuario
                categorias,              // usuario
                cantidadMeGusta,        // automatico
                habilitado,             // mj
                publicado,              // usuario
                revision,               // mj
                fechaCreacion,          // constante
                fechaActualizacion,     // automatico
            } = datosBlog

            if ( referencia ) {
                if ( !esReferenciaURL(referencia) ) {
                    throw new Errores({
                        codigo: 'error/usuario_mala_solicitud',
                        mensaje: 'Debe ser una referencia de blog válida.'
                    })
                }

                const valido = referencia.length >= 1 && referencia.length <= 100
                if ( !valido ) {
                    throw new Errores({
                        codigo: 'error/usuario_mala_solicitud',
                        mensaje: 'La referencia debe ser mayor/igual a 10 y menor/igual a 100.'
                    })
                }

                const existe = await Blog.existeDocumentoBlog({referencia})
                
                if (existe) {
                    throw new Errores({
                        codigo: 'error/usuario_mala_solicitud',
                        mensaje: 'Ya existe esta referencia url.'
                    })
                }
            }

            if ( titulo ) {
                const valido = titulo.length >= 10 && titulo.length <= 100
                if ( !valido ) {
                    throw new Errores({
                        codigo: 'error/usuario_mala_solicitud',
                        mensaje: 'El titulo debe ser mayor/igual a 10 y menor/igual a 100.'
                    })
                }
            }

            if ( descripcion ) {
                const valido = descripcion.length >= 10 && descripcion.length <= 500
                if ( !valido ) {
                    throw new Errores({
                        codigo: 'error/usuario_mala_solicitud',
                        mensaje: 'La descripción debe ser mayor/igual a 10 y menor/igual a 100.'
                    })
                }
            }

            if (esOperacionAgregar) {

                // La uid del solicitante debe ser igual a la uid del dueño del blog
                if ( publicador ) {
                    if (publicador !== datosUsuario.uid) {
                        throw new Errores({
                            codigo: 'error/usuario_no_autorizado',
                            mensaje: 'No puedes agregar un blog a nombre de otro usuario que no seas tu.'
                        })
                    }
    
                    const existe = await Authentication.existeUsuario({ uid: datosUsuario.uid })
                    
                    if (!existe) {
                        throw new Errores({
                            codigo: 'error/usuario_mala_solicitud',
                            mensaje: 'No existe este usuario.'
                        })
                    }

                }

                /* Descripción de la verificacion de sección y categorias: (creación)
                 * ---------------------------------------------------------------------------------------
                 * Si la sección es: string vacio ('') o undefined no se verificara nada, por el hecho de que
                 * cuando la sección es string vacio ('') o undefined el blog pasa a ser un blog normal sin sección,
                 * entonces, las categorias se eliminan por tanto no es necesario realizar una verificación.
                */

                if (seccion) {
                    let valido = categorias.length >= 1 && categorias.length <= 3
                    if ( !valido ) {
                        throw new Errores({
                            codigo: 'error/usuario_mala_solicitud',
                            mensaje: 'Por blog puede haber de 1 a 3 categorias.'
                        })
                    }
                    
                    let ref = db.collection('Secciones').doc(seccion)

                    for (let i = 0; i < categorias.length; i++) {
                        const categoria = categorias[i]
                        
                        doc = await ref.collection('Categorias').doc(categoria).get()
                        if (!doc.exists) {
                            throw new Errores({
                                codigo: 'error/usuario_mala_solicitud',
                                mensaje: `Hubo un problema al encontrar los datos de sección: ${seccion}/${categoria}.`
                            })
                        }
                    }
                }

                
            } else if (seccion !== undefined || (categorias && categorias.length)) {
                /* Descripción de la verificacion de sección y categorias: (creación)
                 * ---------------------------------------------------------------------------------------
                 * Si la sección es: string vacio ('') o undefined no se verificara nada, por el hecho de que
                 * cuando la sección es string vacio ('') o undefined el blog pasa a ser un blog normal sin sección,
                 * entonces, las categorias se eliminan por tanto no es necesario realizar una verificación.
                */

                const docBlog = await db.collection('Blogs').doc(params.uid).get()

                if (seccion !== '') {
                    let seccionSeleccionada = seccion ? seccion : docBlog.data().seccion
                    if (categorias) {
                        let valido = categorias.length >= 1 && categorias.length <= 3
                        if ( !valido ) {
                            throw new Errores({
                                codigo: 'error/usuario_mala_solicitud',
                                mensaje: 'Por blog puede haber de 1 a 3 categorias.'
                            })
                        }
                    }
                    let categoriasSeleccionadas = categorias ? categorias : docBlog.data().categorias

                    let ref = db.collection('Secciones').doc(seccionSeleccionada)

                    for (let i = 0; i < categoriasSeleccionadas.length; i++) {
                        const categoria = categoriasSeleccionadas[i]
                        const doc = await ref.collection('Categorias').doc(categoria).get()

                        if (!doc.exists) {
                            throw new Errores({
                                codigo: 'error/usuario_mala_solicitud',
                                mensaje: `Hubo un problema al encontrar los datos de sección: ${seccionSeleccionada}/${categoria}.`
                            })
                        }
                    }
                }
            }
        }

        if (contenidoBlog) {
            let soloTexto = contenidoBlog.replace(/(<([^>]+)>)/ig, '')
            soloTexto =  soloTexto.replace(/[\n\r]+/g, '')
            soloTexto = soloTexto.replace(/\s{2,10}/g, ' ')
            soloTexto = soloTexto.trim()
            
            const valido = soloTexto.length >= 50
            if ( !valido ) {
                throw new Errores({
                    codigo: 'error/usuario_mala_solicitud',
                    mensaje: 'El tamaño del blog debe ser mayor a 50 carácteres.'
                })
            }
        }

        next()
    } catch (error) {
        next(error)
    }
}

middlewares.construirDatosBlog = (req, res, next) => {
    try {
        const { datos, body, params } = req
        const { uid } = params
        const { datosBlog, contenidoBlog } = body

        let datosBlogFormateado
        const esOperacionAgregar = req.method === 'POST'

        if (esOperacionAgregar) datosBlogFormateado = utils_blog.construirDatosParaNuevoBlog(datosBlog, contenidoBlog)
        else datosBlogFormateado = utils_blog.construirDatosParaActualizacionBlog(uid, datosBlog, contenidoBlog)
        
        req.body.datosBlog = datosBlogFormateado.datosBlog
        req.body.nombreBlogTemp = datosBlogFormateado.nombreBlogTemp
        req.body.rutaArchivoTemp = datosBlogFormateado.rutaArchivoTemp

        next()
    } catch (error) {
        next(error)
    }
}

middlewares.verificacionExistenciaBlog = async (req, res, next) => {
    try {
        const { params } = req
        const { uid } = params

        const existe = await Blog.existeDocumentoBlog({ uid })
        
        if (!existe) {
            throw new Errores({
                codigo: 'error/usuario_mala_solicitud',
                mensaje: `No existe el blog.`
            })
        }

        next()
    } catch (error) {
        next(error)
    }
}

middlewares.verificacionExistenciaArchivoBlog = async (req, res, next) => {
    try {
        const { params } = req
        const { uid } = params

        // Verificacion de existencia de archivo
        const existe = await Blog.existeArchivoBlog(uid)
        if ( !existe ) {
            throw new Errores({
                codigo: 'error/usuario_mala_solicitud',
                mensaje: `No existe el archivo.`
            })
        }

        next()
    } catch (error) {
        next(error)
    }
}

middlewares.esPropietarioDelBlog = async (req, res, next) => {
    try {
        const { datos, params } = req
        const { uidSolicitante, datosAuthSolicitante } = datos
        const { uid } = params

        const blog = new Blog()
        await blog.importarDatosBlogPorUID( uid )

        if ( uidSolicitante !== blog.getBlog().publicador ) {
            throw new Errores({
                codigo: 'error/usuario_no_autorizado',
                mensaje: `No puedes eliminar este blog.`
            })
        }

        next()
    } catch (error) {
        next(error)
    }
}

middlewares.velidarDatosMeGustaBlog = async (req, res, next) => {
    try {
        const { datos, body, params } = req
        const { uidSolicitante, datosAuthSolicitante } = datos
        const { uid } = params
        const { meGusta } = body

        if (!Object.keys(body).length) {
            throw new Errores({
                codigo: 'error/usuario_mala_solicitud',
                mensaje: `Se requiere una operación.`
            })
        }

        if (meGusta === undefined) {
            throw new Errores({
                codigo: 'error/usuario_mala_solicitud',
                mensaje: `Se requiere una operación.`
            })
        }

        if (typeof meGusta !== 'boolean') {
            throw new Errores({
                codigo: 'error/usuario_mala_solicitud',
                mensaje: `Debe ser un boolean al dar me gusta un blog.`
            })
        }

        const ref = db.collection('Usuarios').doc(uidSolicitante)
        .collection('BlogsMG').doc(uid)
        const doc = await ref.get()

        // Middleware me gusta
        if (meGusta) {
            if (doc.exists) {
                throw new Errores({
                    codigo: 'error/usuario_mala_solicitud',
                    mensaje: `Ya haz indicado que te gusta el blog.`
                })
            }
            
        } else {
            if (!doc.exists) {
                throw new Errores({
                    codigo: 'error/usuario_mala_solicitud',
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