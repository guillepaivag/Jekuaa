const TurndownService = require('turndown')
const path = require('path')
const fs = require('fs')
const os = require('os')

const db = require('../../../../db')
const { milliseconds_a_timestamp } = require("../../../utils/timestamp")
const esCodigo = require("../../../utils/esCodigo")

const Blog = require("../../../models/Blogs/Blog")
const Errores = require("../../../models/Error/Errores")
const Miembro = require("../../../models/Usuarios/TiposUsuarios/Miembro")


const middlewares = {}


middlewares.esMiembroBlogger = async (req = request, res = response, next) => {
    try {
        const { datos, body } = req
        const { uidSolicitante, datosAuthSolicitante } = datos

        const miembro = new Miembro()
        await miembro.importarDatosMiembro(uidSolicitante)

        const esBlogger = miembro.funciones.includes('blogger')
        if (!esBlogger) {
            throw new Errores({
                estado: 401,
                mensajeCliente: 'sin_permisos',
                mensajeServidor: 'No tienes el permiso de blogger.',
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
        const { uidBlog } = params

        const blog = new Blog()
        await blog.importarDatosBlogPorUID( uidBlog )

        if ( uidSolicitante !== blog.getBlog().publicador ) {
            throw new Errores({
                estado: 401,
                mensajeCliente: 'sin_permisos',
                mensajeServidor: `Sin permisos, no es el publicador de este blog.`
            })
        }

        next()
    } catch (error) {
        next(error)
    }
}



middlewares.verificadorDeDatosRequeridos  = (req, res, next) => {
    try {
        const { datos, body } = req
        const { datosBlog, contenidoBlog } = body

        const esOperacionAgregar = req.method === 'POST'

        if (!Object.keys(body).length) {
            throw new TypeError('No existen los datos necesarios.')
        }

        if (esOperacionAgregar) {

            if ( !datosBlog ) {
                throw new TypeError('No existen los datos necesarios.')
            }

            const { referencia, titulo } = datosBlog
    
            if ( !referencia ) {
                throw new TypeError('La referencia del blog debe existir.')
            }
        
            if ( !titulo ) {
                throw new TypeError('El titulo debe existir.')
            }
        
        } else {
            if ( (!datosBlog || !Object.keys(datosBlog).length) && !contenidoBlog ) {
                throw new TypeError('No existen los datos necesarios.')
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

        const esOperacionAgregar = req.method === 'POST'

        if (esOperacionAgregar) {
            if (typeof datosBlog != 'object') {
                throw new TypeError('Los datosBlog debe ser un objecto.')
            }

            const {
                referencia,
                titulo,
            } = datosBlog

            if ( typeof referencia != 'string' ) {
                throw new TypeError('La referencia del blog debe ser string.')
            }
        
            if ( typeof titulo != 'string' ) {
                throw new TypeError('El titulo del blog debe ser string.')
            }

        } else {
            if (datosBlog) {
                if (typeof datosBlog != 'object') {
                    throw new TypeError('Los datosBlog debe ser un objecto.')
                }
                
                const {
                    referencia,
                    titulo,
                    descripcion,
                    seccion,
                    categorias,
                    publicado,
                } = datosBlog

        
                if ( !!referencia && typeof referencia != 'string' ) {
                    throw new TypeError('La referencia del blog debe ser string.')
                }
            
                if ( !!titulo && typeof titulo != 'string' ) {
                    throw new TypeError('El titulo del blog debe ser string.')
                }
            
                if ( !!descripcion && typeof descripcion != 'string' ) {
                    throw new TypeError('La descripción del blog debe ser string.')
                }

                if (seccion !== undefined && seccion !== '') {
                    if ( !!seccion && typeof seccion !== 'string' ) {
                        throw new TypeError('La sección del blog debe ser string.')
                    }
                
                    if ( !!categorias ) {
                        if (!(categorias instanceof Array)) {
                            throw new TypeError('Las categorias del blog debe ser un arreglo de string.')
                        }
                        
                        for (let i = 0; i < categorias.length; i++) {
                            const categoria = categorias[i]
                            if (typeof categoria != 'string') {
                                throw new TypeError('Las categorias del blog debe ser un arreglo de string.')
                            }
                        }
                    }
                }

                if ( publicado !== undefined && typeof publicado !== 'boolean' ) {
                    throw new TypeError('El estado publicado del blog debe ser boolean.')
                }

            }
        }
    
        if ( !!contenidoBlog && typeof contenidoBlog !== 'string' ) {
            throw new TypeError('El contenido del blog debe ser string.')
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

        const esOperacionAgregar = req.method === 'POST'

        if (esOperacionAgregar) {
            const {
                referencia,
                titulo,
            } = datosBlog

            if ( referencia ) {
                if ( !esCodigo(referencia) ) {
                    throw new Errores({
                        estado: 400,
                        mensajeCliente: 'codigo_invalido',
                        mensajeServidor: 'Debe ser un código de blog válida.'
                    })
                }

                const valido = referencia.length >= 1 && referencia.length <= 100
                if ( !valido ) {
                    throw new TypeError('La referencia debe ser mayor/igual a 10 y menor/igual a 100.')
                }

                const existe = await Blog.existeDocumentoBlog({referencia})
                
                if (existe) {
                    throw new Errores({
                        estado: 400,
                        mensajeCliente: 'ya_existe_codigo_blog',
                        mensajeServidor: 'Ya existe este código-blog.'
                    })
                }
            }

            if ( titulo ) {
                const valido = titulo.length >= 10 && titulo.length <= 100
                if ( !valido ) {
                    throw new TypeError('El titulo debe ser mayor/igual a 10 y menor/igual a 100.')
                }
            }

        } else {
            if (datosBlog) {
                
                const {
                    referencia,
                    titulo,
                    descripcion,
                    seccion,
                    categorias,
                } = datosBlog

                if ( referencia ) {
                    if ( !esCodigo(referencia) ) {
                        throw new Errores({
                            estado: 400,
                            mensajeCliente: 'codigo_invalido',
                            mensajeServidor: 'Debe ser un código de blog válida.'
                        })
                    }

                    const valido = referencia.length >= 1 && referencia.length <= 100
                    if ( !valido ) {
                        throw new TypeError('El código debe ser mayor/igual a 10 y menor/igual a 100.')
                    }

                    const existe = await Blog.existeDocumentoBlog({referencia})
                    
                    if (existe) {
                        throw new Errores({
                            estado: 400,
                            mensajeCliente: 'ya_existe_codigo_blog',
                            mensajeServidor: 'Ya existe este código-blog.'
                        })
                    }
                }

                if ( titulo ) {
                    const valido = titulo.length >= 10 && titulo.length <= 100
                    if ( !valido ) {
                        throw new TypeError('El titulo debe ser mayor/igual a 10 y menor/igual a 100.')
                    }
                }

                if ( descripcion ) {
                    const valido = descripcion.length >= 10 && descripcion.length <= 500
                    if ( !valido ) {
                        throw new TypeError('La descripción debe ser mayor/igual a 10 y menor/igual a 100.')
                    }
                }

                /* Descripción de la verificacion de sección y categorias: (creación)
                * ---------------------------------------------------------------------------------------
                * Si la sección es: string vacio ('') o undefined no se verificara nada, por el hecho de que
                * cuando la sección es string vacio ('') o undefined el blog pasa a ser un blog normal sin sección,
                * entonces, las categorias se eliminan por tanto no es necesario realizar una verificación.
                */

                const docBlog = await db.collection('Blogs').doc(params.uidBlog).get()

                if (seccion) {
                    let seccionSeleccionada = seccion ? seccion : docBlog.data().seccion
                    if (categorias) {
                        let valido = categorias.length >= 1 && categorias.length <= 3
                        if ( !valido ) {
                            throw new TypeError('Por blog puede haber de 1 a 3 categorias.')
                        }
                    }
                    let categoriasSeleccionadas = categorias ? categorias : docBlog.data().categorias

                    let ref = db.collection('Secciones').doc(seccionSeleccionada)

                    for (let i = 0; i < categoriasSeleccionadas.length; i++) {
                        const categoria = categoriasSeleccionadas[i]
                        const doc = await ref.collection('Categorias').doc(categoria).get()

                        if (!doc.exists) {
                            throw new Errores({
                                estado: 400,
                                mensajeCliente: 'no_existe_seccion_o_categorias',
                                mensajeServidor: `Hubo un problema al encontrar los datos de sección: ${seccionSeleccionada}/${categoria}.`
                            })
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
                    throw new TypeError('El tamaño del blog debe ser mayor a 50 carácteres.')
                }
            }
        }

        next()
    } catch (error) {
        next(error)
    }
}



middlewares.construirDatosBlogPOST = (req, res, next) => {
    try {
        const { datos, body, params } = req
        const { uidSolicitante, datosAuthSolicitante } = datos
        const { uidBlog } = params
        const { datosBlog, contenidoBlog } = body

        // Referencia del blog
        const blog = new Blog()
        const datosBlogFormateado = blog.formatearDatos().getBlog()

        datosBlogFormateado.publicador = uidSolicitante
        datosBlogFormateado.referencia = datosBlog.referencia
        datosBlogFormateado.titulo = datosBlog.titulo

        datosBlogFormateado.publicado = true
        datosBlogFormateado.habilitado = false
        datosBlogFormateado.contieneErrores = true
        datosBlogFormateado.mensajesError = [
            'Falta una descripción para el blog.',
            'Falta contenido para el blog.'
        ]
        datosBlogFormateado.fechaCreacion = milliseconds_a_timestamp( Date.now() )
        datosBlogFormateado.fechaActualizacion = milliseconds_a_timestamp( Date.now() )

        // Archivo del blog
        let dirArray = ['blogs']
        let dirVerificacion = path.join(os.tmpdir())
        for (let i = 0; i < dirArray.length; i++) {
            const element = dirArray[i]
            dirVerificacion = path.join(dirVerificacion, element)
            if ( !fs.existsSync(dirVerificacion) ) fs.mkdirSync(dirVerificacion)

        }
        const nombreBlogTemp = `${Date.now()}~${blog.uid}.md`
        const rutaArchivoTemp = path.join(os.tmpdir(), 'blogs', nombreBlogTemp)

        fs.writeFileSync(rutaArchivoTemp, '', 'utf8')
        
        req.body.datosBlog = datosBlogFormateado
        req.body.rutaArchivoTemp = rutaArchivoTemp

        next()
    } catch (error) {
        next(error)
    }
}



middlewares.construirDatosBlogPUT = (req, res, next) => {
    try {
        const { datos, body, params } = req
        const { uidSolicitante, datosAuthSolicitante } = datos
        const { uidBlog } = params
        const { datosBlog, contenidoBlog } = body

        const datosActualizados = {}
        let rutaArchivoTemp = ''

        if (datosBlog) {
            const {
                referencia,
                titulo,
                descripcion,
                seccion,
                categorias,
                publicado,
            } = datosBlog
            
            // Referencia del blog
            if (Object.keys(datosBlog).length) {
                referencia ? datosActualizados.referencia = referencia : ''
                titulo ? datosActualizados.titulo = titulo : ''
                descripcion ? datosActualizados.descripcion = descripcion : ''
                if (seccion === '') {
                    datosActualizados.seccion = ''
                    datosActualizados.categorias = []
                } else {
                    seccion ? datosActualizados.seccion = seccion : ''
                    categorias && categorias.length ? datosActualizados.categorias = categorias : ''
                }
                publicado !== undefined ? datosActualizados.publicado = publicado : ''
            }
        }
        
        // Archivo del blog
        if (contenidoBlog) {
            let dirArray = ['blogs']
            let dirVerificacion = path.join(os.tmpdir())
            for (let i = 0; i < dirArray.length; i++) {
                const element = dirArray[i]
                dirVerificacion = path.join(dirVerificacion, element)
                if ( !fs.existsSync(dirVerificacion) ) fs.mkdirSync(dirVerificacion)
            }
            const nombreBlogTemp = `${Date.now()}~${uidBlog}.md`
            rutaArchivoTemp = path.join(os.tmpdir(), 'blogs', nombreBlogTemp)
    
            let turndownService = new TurndownService({
                headingStyle: 'setext',
                hr: '* * *',
                bulletListMarker: '*',
                codeBlockStyle: 'fenced',
                fence: '```',
                emDelimiter: '_',
                strongDelimiter: '**',
                linkStyle: 'inlined',
                linkReferenceStyle: 'full',
                br: '  ',
                blankReplacement: function (content, node) {
                    return node.isBlock ? '\n\n' : ''
                },
                keepReplacement: function (content, node) {
                    return node.isBlock ? '\n\n' + node.outerHTML + '\n\n' : node.outerHTML
                },
                defaultReplacement: function (content, node) {
                    return node.isBlock ? '\n\n' + content + '\n\n' : content
                }
            })

            let markdown = turndownService.turndown(contenidoBlog)
    
            fs.writeFileSync(rutaArchivoTemp, markdown, 'utf8')
        }
    
        const existeDatosParaActualizar = (datosActualizados && Object.keys(datosActualizados).length) || rutaArchivoTemp
        
        if (!existeDatosParaActualizar) {
            throw new TypeError('No hay datos para actualizar.')
        }

        datosActualizados.fechaActualizacion = milliseconds_a_timestamp( Date.now() )
        
        req.body.datosBlog = datosActualizados
        req.body.rutaArchivoTemp = rutaArchivoTemp

        next()
    } catch (error) {
        next(error)
    }
}


module.exports = middlewares