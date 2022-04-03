const TurndownService = require('turndown')

const Blog = require("../models/Blogs/Blog")
const Errores = require("../models/Error/Errores")
const path = require('path')
const fs = require('fs')
const os = require('os')
const { milliseconds_a_timestamp } = require("./timestamp")

const utils_blog = {}

utils_blog.construirDatosParaNuevoBlog = ( datosBlog, contenidoBlog ) => {
    
    // Referencia del blog
    const blog = new Blog(datosBlog)
    const datosBlogFormateado = blog.formatearDatos().getBlog()

    datosBlogFormateado.equipo = ''
    if (!datosBlogFormateado.seccion) {
        datosBlogFormateado.seccion = ''
        datosBlogFormateado.categorias = []
    }
    datosBlogFormateado.cantidadMeGusta = 0
    datosBlogFormateado.fechaCreacion = milliseconds_a_timestamp( Date.now() )
    datosBlogFormateado.fechaActualizacion = milliseconds_a_timestamp( Date.now() )

    // Archivo del blog
    let dirArray = ['blogs']
    let dirVerificacion = path.join(os.tmpdir())
    for (let i = 0; i < dirArray.length; i++) {
        const element = dirArray[i]
        dirVerificacion = path.join(dirVerificacion, element)
        if ( !fs.existsSync(dirVerificacion) ) 
            fs.mkdirSync(dirVerificacion)
    }
    const nombreBlogTemp = `${Date.now()}~${datosBlog.uid}.md`
    const rutaArchivoTemp = path.join(os.tmpdir(), 'blogs', nombreBlogTemp)

    let turndownService = new TurndownService()
    let markdown = turndownService.turndown(contenidoBlog)

    fs.writeFileSync(rutaArchivoTemp, markdown)

    return {
        datosBlog: datosBlogFormateado,
        nombreBlogTemp,
        rutaArchivoTemp,
    }
}

utils_blog.construirDatosParaActualizacionBlog = ( uidBlog, datosBlog, contenidoBlog ) => {

    const datosActualizados = {}
    const resultado = {}

    if (datosBlog) {
        const {
            uid,                    // constante
            referencia,             // usuario
            titulo,                 // usuario
            descripcion,            // usuario
            equipo,            // constante
            publicador,             // constante
            seccion,                // usuario
            categorias,              // usuario
            cantidadMeGusta,        // automatico
            habilitado,             // adminJk
            publicado,              // usuario
            revision,               // adminJk
            fechaCreacion,          // constante
            fechaActualizacion,     // automatico
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
            publicado != undefined ? datosActualizados.publicado = publicado : ''
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
        const rutaArchivoTemp = path.join(os.tmpdir(), 'blogs', nombreBlogTemp)

        let turndownService = new TurndownService()
        let markdown = turndownService.turndown(contenidoBlog)

        fs.writeFileSync(rutaArchivoTemp, markdown)

        resultado.nombreBlogTemp = nombreBlogTemp
        resultado.rutaArchivoTemp = rutaArchivoTemp
    }

    if ((datosActualizados && Object.keys(datosActualizados).length) || contenidoBlog) {
        datosActualizados.fechaActualizacion = milliseconds_a_timestamp( Date.now() )
        resultado.datosBlog = datosActualizados
    } else {
        throw new Errores({
            codigo: 'error/usuario_mala_solicitud',
            mensaje: 'No hay datos para actualizar.'
        })
    }

    return resultado
}

module.exports = utils_blog