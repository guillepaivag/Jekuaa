const admin = require('../../firebase-service')
const db = require('../../db')
const Blog = require("../models/Blog")
const ErrorJekuaa = require("../models/Error/ErroresJekuaa")
const Usuario = require("../models/Usuario")
const utils_blog = require("../utils/Blog")
const esReferenciaBlog = require("../utils/esReferenciaBlog")
const { v4: uuidv4 } = require('uuid')
const { milliseconds_a_timestamp } = require('../utils/Timestamp')
const showdown = require('showdown')
const configJekuaa = require('../../configJekuaa')

const middlewares = {}

middlewares.verificadorDeDatosRequeridos  = (req, res, next) => {
    try {
        const { jekuaaDatos, body } = req
        const { datosBlog, contenidoBlog } = body

        const esOperacionAgregar = req.method === 'POST'

        if (!Object.keys(body).length) {
            throw new ErrorJekuaa({
                codigo: 'jekuaa/error/usuario_mala_solicitud',
                mensaje: 'No existen los datos necesarios.'
            })
        }

        if ( (!datosBlog || !Object.keys(datosBlog).length) && !contenidoBlog ) {
            throw new ErrorJekuaa({
                codigo: 'jekuaa/error/usuario_mala_solicitud',
                mensaje: 'No existen los datos necesarios.'
            })
        }

        if (esOperacionAgregar) {
            
            if (Object.keys(body).length !== 2) {
                throw new ErrorJekuaa({
                    codigo: 'jekuaa/error/usuario_mala_solicitud',
                    mensaje: 'No existen los datos necesarios.'
                })
            }

            if ( !datosBlog ) {
                throw new ErrorJekuaa({
                    codigo: 'jekuaa/error/usuario_mala_solicitud',
                    mensaje: 'No existen los datos necesarios.'
                })
            }

            const {
                uid,
                referencia,
                titulo,
                descripcion,
                publicador,
                seccion,
                categoria,
                subCategorias,
                cantidadMeGusta,
                habilitado,
                publicado,
                revision,
                fechaCreacion,
                fechaActualizacion,
            } = datosBlog
    
            if ( !referencia ) {
                throw new ErrorJekuaa({
                    codigo: 'jekuaa/error/usuario_mala_solicitud',
                    mensaje: 'La referencia del blog debe existir.'
                })
            }
        
            if ( !titulo ) {
                throw new ErrorJekuaa({
                    codigo: 'jekuaa/error/usuario_mala_solicitud',
                    mensaje: 'El titulo debe existir.'
                })
            }
        
            if ( !descripcion ) {
                throw new ErrorJekuaa({
                    codigo: 'jekuaa/error/usuario_mala_solicitud',
                    mensaje: 'La descripción debe existir.'
                })
            }
        
            if ( !publicador ) {
                throw new ErrorJekuaa({
                    codigo: 'jekuaa/error/usuario_mala_solicitud',
                    mensaje: 'El publicador debe existir.'
                })
            }
        
            if ( seccion ) {
                if ( !categoria ) {
                    throw new ErrorJekuaa({
                        codigo: 'jekuaa/error/usuario_mala_solicitud',
                        mensaje: 'La categoría debe existir.'
                    })
                }
            
                if ( !subCategorias || !subCategorias.length ) {
                    throw new ErrorJekuaa({
                        codigo: 'jekuaa/error/usuario_mala_solicitud',
                        mensaje: 'Debe haber al menos una sub-categoria.'
                    })
                }
            }
        
            if ( !contenidoBlog ) {
                throw new ErrorJekuaa({
                    codigo: 'jekuaa/error/usuario_mala_solicitud',
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
        const { jekuaaDatos, body } = req
        const { datosBlog, contenidoBlog } = body

        if (datosBlog) {
            if (typeof datosBlog != 'object') {
                throw new ErrorJekuaa({
                    codigo: 'jekuaa/error/usuario_mala_solicitud',
                    mensaje: 'Los datosBlog debe ser un objecto.'
                })
            }
            
            const {
                uid,
                referencia,
                titulo,
                descripcion,
                publicador,
                seccion,
                categoria,
                subCategorias,
                cantidadMeGusta,
                habilitado,
                publicado,
                revision,
                fechaCreacion,
                fechaActualizacion,
            } = datosBlog
    
            const esRutaAdmin = req.originalUrl.split('/')[2] === 'adminJekuaa'
            const esOperacionAgregar = req.method === 'POST'
        
            /**
             * Tipos de datos: Formato y tipo de datos 
             * correctos para un blog
             * 
            */
    
            // // Constante
            // if ( esOperacionAgregar && uid != undefined && typeof uid != 'string' ) {
            //     throw new ErrorJekuaa({
            //         codigo: 'jekuaa/error/usuario_mala_solicitud',
            //         mensaje: 'La uid del blog debe ser string.'
            //     })
            // }
    
            if ( !!referencia && typeof referencia != 'string' ) {
                throw new ErrorJekuaa({
                    codigo: 'jekuaa/error/usuario_mala_solicitud',
                    mensaje: 'La referencia del blog debe ser string.'
                })
            }
        
            if ( !!titulo && typeof titulo != 'string' ) {
                throw new ErrorJekuaa({
                    codigo: 'jekuaa/error/usuario_mala_solicitud',
                    mensaje: 'El titulo del blog debe ser string.'
                })
            }
        
            if ( !!descripcion && typeof descripcion != 'string' ) {
                throw new ErrorJekuaa({
                    codigo: 'jekuaa/error/usuario_mala_solicitud',
                    mensaje: 'La descripción del blog debe ser string.'
                })
            }

            if (esOperacionAgregar) {
                if ( typeof publicador != 'string' ) {
                    throw new ErrorJekuaa({
                        codigo: 'jekuaa/error/usuario_mala_solicitud',
                        mensaje: 'El publicador del blog debe ser string.'
                    })
                }

                if (seccion) {
                    if (typeof seccion != 'string' ) {
                        throw new ErrorJekuaa({
                            codigo: 'jekuaa/error/usuario_mala_solicitud',
                            mensaje: 'La sección del blog debe ser string.'
                        })
                    } 

                    if ( typeof categoria != 'string' ) {
                        throw new ErrorJekuaa({
                            codigo: 'jekuaa/error/usuario_mala_solicitud',
                            mensaje: 'La categoría del blog debe ser string.'
                        })
                    }
                
                    if (!(subCategorias instanceof Array)) {
                        throw new ErrorJekuaa({
                            codigo: 'jekuaa/error/usuario_mala_solicitud',
                            mensaje: 'Las subCategorias del blog debe ser un arreglo de string.'
                        })
                    }
                    
                    for (let i = 0; i < subCategorias.length; i++) {
                        const subCategoria = subCategorias[i]
                        if (typeof subCategoria != 'string') {
                            throw new ErrorJekuaa({
                                codigo: 'jekuaa/error/usuario_mala_solicitud',
                                mensaje: 'Las subCategorias del blog debe ser un arreglo de string.'
                            })
                        }
                    }
                }
            } else {
                if (seccion !== '') {
                    if ( !!seccion && typeof seccion !== 'string' ) {
                        throw new ErrorJekuaa({
                            codigo: 'jekuaa/error/usuario_mala_solicitud',
                            mensaje: 'La sección del blog debe ser string.'
                        })
                    }
    
                    if ( !!categoria && typeof categoria !== 'string' ) {
                        throw new ErrorJekuaa({
                            codigo: 'jekuaa/error/usuario_mala_solicitud',
                            mensaje: 'La categoría del blog debe ser string.'
                        })
                    }
                
                    if ( !!subCategorias ) {
                        if (!(subCategorias instanceof Array)) {
                            throw new ErrorJekuaa({
                                codigo: 'jekuaa/error/usuario_mala_solicitud',
                                mensaje: 'Las subCategorias del blog debe ser un arreglo de string.'
                            })
                        }
                        
                        for (let i = 0; i < subCategorias.length; i++) {
                            const subCategoria = subCategorias[i]
                            if (typeof subCategoria != 'string') {
                                throw new ErrorJekuaa({
                                    codigo: 'jekuaa/error/usuario_mala_solicitud',
                                    mensaje: 'Las subCategorias del blog debe ser un arreglo de string.'
                                })
                            }
                        }
                    }
                }
            }
        
            if ( esRutaAdmin && habilitado != undefined && typeof habilitado != 'boolean' ) {
                throw new ErrorJekuaa({
                    codigo: 'jekuaa/error/usuario_mala_solicitud',
                    mensaje: 'El estado habilitado del blog debe ser boolean.'
                })
            }
            
            if ( publicado != undefined && typeof publicado != 'boolean' ) {
                throw new ErrorJekuaa({
                    codigo: 'jekuaa/error/usuario_mala_solicitud',
                    mensaje: 'El estado publicado del blog debe ser boolean.'
                })
            }
        
            if ( esRutaAdmin && revision != undefined && typeof revision != 'boolean' ) {
                throw new ErrorJekuaa({
                    codigo: 'jekuaa/error/usuario_mala_solicitud',
                    mensaje: 'El estado revision del blog debe ser boolean.'
                })
            }
        }
    
        if ( !!contenidoBlog && typeof contenidoBlog != 'string' ) {
            throw new ErrorJekuaa({
                codigo: 'jekuaa/error/usuario_mala_solicitud',
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
        const { jekuaaDatos, body, params } = req
        const { uidSolicitante, datosAuthSolicitante } = jekuaaDatos
        const { datosBlog, contenidoBlog } = body
    
        const usuario = new Usuario()
        await usuario.importarDatosUsuarioPorUID(uidSolicitante) 
        const datosUsuario = usuario.getDatosUsuario()

        const esOperacionAgregar = req.method === 'POST'

        if (!esOperacionAgregar) {
            var docBlog = await db.collection('Blogs').doc(params.uid).get()
        }

        if ( datosBlog ) {
            const {
                uid,                    // constante
                referencia,             // usuario
                titulo,                 // usuario
                descripcion,            // usuario
                publicador,             // constante
                seccion,                // usuario
                categoria,              // usuario
                subCategorias,          // usuario
                cantidadMeGusta,        // automatico
                habilitado,             // mj
                publicado,              // usuario
                revision,               // mj
                fechaCreacion,          // constante
                fechaActualizacion,     // automatico
            } = datosBlog

            if ( referencia ) {
                if ( !esReferenciaBlog(referencia) ) {
                    throw new ErrorJekuaa({
                        codigo: 'jekuaa/error/usuario_mala_solicitud',
                        mensaje: 'Debe ser una referencia de blog válida.'
                    })
                }

                const valido = referencia.length >= 10 && referencia.length <= 100
                if ( !valido ) {
                    throw new ErrorJekuaa({
                        codigo: 'jekuaa/error/usuario_mala_solicitud',
                        mensaje: 'La referencia debe ser mayor/igual a 10 y menor/igual a 100.'
                    })
                }

                const documents = await db.collection('Blogs').where('referencia', '==', referencia).get()
                
                if (!documents.empty) {
                    throw new ErrorJekuaa({
                        codigo: 'jekuaa/error/usuario_mala_solicitud',
                        mensaje: 'Ya existe esta referencia.'
                    })
                }
            }

            if ( titulo ) {
                const valido = titulo.length >= 10 && titulo.length <= 100
                if ( !valido ) {
                    throw new ErrorJekuaa({
                        codigo: 'jekuaa/error/usuario_mala_solicitud',
                        mensaje: 'El titulo debe ser mayor/igual a 10 y menor/igual a 100.'
                    })
                }
            }

            if ( descripcion ) {
                const valido = descripcion.length >= 10 && descripcion.length <= 500
                if ( !valido ) {
                    throw new ErrorJekuaa({
                        codigo: 'jekuaa/error/usuario_mala_solicitud',
                        mensaje: 'La descripción debe ser mayor/igual a 10 y menor/igual a 100.'
                    })
                }
            }
        
            // La uid del solicitante debe ser igual a la uid del dueño del blog
            if ( publicador ) {
                if (publicador != datosUsuario.uid) {
                    throw new ErrorJekuaa({
                        codigo: 'jekuaa/error/usuario_no_autorizado',
                        mensaje: 'No puedes agregar un blog a nombre de otro usuario que no seas tu.'
                    })
                }
                
                await Usuario.errorNoExisteUsuario({
                    uid: datosUsuario.uid
                })
            }

            if (esOperacionAgregar) {
                /* Descripción de la verificacion de sección, categorias y subcategorias: (creación)
                 * ---------------------------------------------------------------------------------------
                 * Si la sección es: string vacio ('') o undefined no se verificara nada, por el hecho de que
                 * cuando la sección es string vacio ('') o undefined el blog pasa a ser un blog normal sin sección,
                 * entonces, la categoria y subcategorias se eliminan por tanto no es necesario realizar
                 * una verificación. 
                */

                if (seccion) {
                    let valido = subCategorias.length >= 1 && subCategorias.length <= 3
                    if ( !valido ) {
                        throw new ErrorJekuaa({
                            codigo: 'jekuaa/error/usuario_mala_solicitud',
                            mensaje: 'Por blog puede haber de 1 a 3 sub-categorias.'
                        })
                    }
                    
                    let ref = db.collection('Secciones').doc(seccion)
                    ref = ref.collection('Categorias').doc(categoria)

                    for (let i = 0; i < subCategorias.length; i++) {
                        const subCategoria = subCategorias[i]
                        
                        doc = await ref.collection('SubCategorias').doc(subCategoria).get()
                        if (!doc.exists) {
                            throw new ErrorJekuaa({
                                codigo: 'jekuaa/error/usuario_mala_solicitud',
                                mensaje: `Hubo un problema al encontrar los datos de sección: ${seccion}/${categoria}/${subCategoria}.`
                            })
                        }
                    }
                }

                
            } else if (seccion !== undefined || categoria || (subCategorias && subCategorias.length)) {
                /* Descripción de la verificacion de sección, categorias y subcategorias: (actualización)
                 * ---------------------------------------------------------------------------------------
                 * Si la sección es: string vacio ('') no se verificara nada, por el hecho de que
                 * cuando la sección es string vacio ('') el blog pasa a ser un blog normal sin sección,
                 * entonces, la categoria y subcategorias se eliminan por tanto no es necesario realizar
                 * una verificación. 
                */

                if (seccion !== '') {
                    let seccionSeleccionada = seccion ? seccion : docBlog.data().seccion
                    let categoriaSeleccionada = categoria ? categoria : docBlog.data().categoria
                    if (subCategorias) {
                        let valido = subCategorias.length >= 1 && subCategorias.length <= 3
                        if ( !valido ) {
                            throw new ErrorJekuaa({
                                codigo: 'jekuaa/error/usuario_mala_solicitud',
                                mensaje: 'Por blog puede haber de 1 a 3 sub-categorias.'
                            })
                        }
                    }
                    let subCategoriasSeleccionadas = subCategorias ? subCategorias : docBlog.data().subCategorias

                    let ref = db.collection('Secciones').doc(seccionSeleccionada)
                    ref = ref.collection('Categorias').doc(categoriaSeleccionada)

                    for (let i = 0; i < subCategoriasSeleccionadas.length; i++) {
                        const subCategoria = subCategoriasSeleccionadas[i]
                        const doc = await ref.collection('SubCategorias').doc(subCategoria).get()

                        if (!doc.exists) {
                            throw new ErrorJekuaa({
                                codigo: 'jekuaa/error/usuario_mala_solicitud',
                                mensaje: `Hubo un problema al encontrar los datos de sección: ${seccionSeleccionada}/${categoriaSeleccionada}/${subCategoria}.`
                            })
                        }
                    }
                }
            }
        }

        if (contenidoBlog) {
            let converter = new showdown.Converter()
            let html = converter.makeHtml(contenidoBlog)

            let soloTexto = html.replace(/(<([^>]+)>)/ig,"")
            soloTexto =  soloTexto.replace(/[\n\r]+/g, '')
            soloTexto = soloTexto.replace(/\s{2,10}/g, ' ')
            soloTexto = soloTexto.trim()
            
            const valido = soloTexto.length >= 50
            if ( !valido ) {
                throw new ErrorJekuaa({
                    codigo: 'jekuaa/error/usuario_mala_solicitud',
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
        const { jekuaaDatos, body, params } = req
        const { uid } = params
        const { datosBlog, contenidoBlog } = body

        let datosBlogFormateado
        const esRutaAdmin = req.originalUrl.split('/')[2] === 'adminJekuaa'
        const esOperacionAgregar = req.method === 'POST'

        if (esOperacionAgregar) {
            // datosBlog.uid = uuidv4()
            datosBlog.uid = admin.firestore().collection('Blogs').doc().id
            datosBlogFormateado = utils_blog.construirDatosParaNuevoBlog(datosBlog, contenidoBlog, esRutaAdmin)
        } else {
            datosBlogFormateado = utils_blog.construirDatosParaActualizacionBlog(uid, datosBlog, contenidoBlog, esRutaAdmin)
        }

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

        const esRutaEstudiante = req.originalUrl.split('/')[2] === 'estudiante'

        const docBlog = await Blog.errorBlogPorUID(uid, 'no-existe')
        
        if (esRutaEstudiante) {
            if (!docBlog.data().publicado || !docBlog.data().habilitado) {
                throw new ErrorJekuaa({
                    codigo: 'jekuaa/error/usuario_mala_solicitud',
                    mensaje: `El blog esta deshabilitado.`
                })
            }
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

        const rutaModo = configJekuaa.environment.mode === 'production' ? 'prod' : 'dev'
        const ruta = `blogs/${rutaModo}/${uid}.md`

        // Verificacion de existencia de archivo
        const existe = await Blog.existeArchivoBlog(ruta)
        if ( !existe ) {
            throw new ErrorJekuaa({
                codigo: 'jekuaa/error/usuario_mala_solicitud',
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
        const { jekuaaDatos, params } = req
        const { uidSolicitante, datosAuthSolicitante } = jekuaaDatos
        const { uid } = params

        const blog = new Blog()
        await blog.importarDatosBlogPorUID( uid )

        if ( uidSolicitante !== blog.getBlog().publicador ) {
            throw new ErrorJekuaa({
                codigo: 'jekuaa/error/usuario_no_autorizado',
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

        jekuaaDatos.refBlogMG = ref
        jekuaaDatos.docBlogMG = doc

        next()
    } catch (error) {
        next(error)
    }
}

module.exports = middlewares