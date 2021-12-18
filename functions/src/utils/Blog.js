const Blog = require("../models/Blog")
const ErrorJekuaa = require("../models/Error/ErroresJekuaa")
const path = require('path')
const fs = require('fs')
const os = require('os')
const { milliseconds_a_timestamp } = require("./Timestamp")

const utils_blog = {}

utils_blog.construirDatosParaNuevoBlog = ( datosBlog, contenidoBlog, esRutaAdmin ) => {
    
    // Referencia del blog
    const blog = new Blog(datosBlog)
    const datosBlogFormateado = blog.formatearDatos().getBlog()

    if (!datosBlogFormateado.seccion) {
        datosBlogFormateado.seccion = ''
        datosBlogFormateado.categoria = ''
        datosBlogFormateado.subCategorias = []
    }
    datosBlogFormateado.cantidadMeGusta = 0
    !esRutaAdmin ? datosBlogFormateado.habilitado = true : ''
    !esRutaAdmin ? datosBlogFormateado.revision = true : ''
    datosBlogFormateado.fechaCreacion = milliseconds_a_timestamp( Date.now() )
    datosBlogFormateado.fechaActualizacion = milliseconds_a_timestamp( Date.now() )

    // Archivo del blog
    let dirArray = ['jekuaa', 'blogs']
    let dirVerificacion = path.join(os.tmpdir())
    for (let i = 0; i < dirArray.length; i++) {
        const element = dirArray[i]
        dirVerificacion = path.join(dirVerificacion, element)
        if ( !fs.existsSync(dirVerificacion) ) fs.mkdirSync(dirVerificacion)

    }
    const nombreBlogTemp = `${Date.now()}~${datosBlog.uid}.md`
    const rutaArchivoTemp = path.join(os.tmpdir(), 'jekuaa', 'blogs', nombreBlogTemp)

    fs.writeFileSync(rutaArchivoTemp, contenidoBlog)

    return {
        datosBlog: datosBlogFormateado,
        nombreBlogTemp,
        rutaArchivoTemp,
    }
}

utils_blog.construirDatosParaActualizacionBlog = ( uidBlog, datosBlog, contenidoBlog, esRutaAdmin ) => {

    const datosActualizados = {}
    const resultado = {}

    if (datosBlog) {
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
            habilitado,             // adminJk
            publicado,              // usuario
            revision,               // adminJk
            fechaCreacion,          // constante
            fechaActualizacion,     // automatico
        } = datosBlog

        // Referencia del blog
        if (esRutaAdmin && Object.keys(datosBlog).length) {
            referencia ? datosActualizados.referencia = referencia : ''
            titulo ? datosActualizados.titulo = titulo : ''
            descripcion ? datosActualizados.descripcion = descripcion : ''

            if (seccion === '') {
                datosActualizados.seccion = ''
                datosActualizados.categoria = ''
                datosActualizados.subCategorias = []
            } else {
                seccion ? datosActualizados.seccion = seccion : ''
                categoria ? datosActualizados.categoria = categoria : ''
                subCategorias && subCategorias.length ? datosActualizados.subCategorias = subCategorias : ''
            }

            habilitado != undefined ? datosActualizados.habilitado = habilitado : ''
            publicado != undefined ? datosActualizados.publicado = publicado : ''
            revision != undefined ? datosActualizados.revision = revision : ''
        }

        if (!esRutaAdmin && Object.keys(datosBlog).length) {
            referencia ? datosActualizados.referencia = referencia : ''
            titulo ? datosActualizados.titulo = titulo : ''
            descripcion ? datosActualizados.descripcion = descripcion : ''
            if (seccion === '') {
                datosActualizados.seccion = ''
                datosActualizados.categoria = ''
                datosActualizados.subCategorias = []
            } else {
                seccion ? datosActualizados.seccion = seccion : ''
                categoria ? datosActualizados.categoria = categoria : ''
                subCategorias && subCategorias.length ? datosActualizados.subCategorias = subCategorias : ''
            }
            publicado != undefined ? datosActualizados.publicado = publicado : ''
        }
    }
    
    // Archivo del blog
    if (contenidoBlog) {
        let dirArray = ['jekuaa', 'blogs']
        let dirVerificacion = path.join(os.tmpdir())
        for (let i = 0; i < dirArray.length; i++) {
            const element = dirArray[i]
            dirVerificacion = path.join(dirVerificacion, element)
            if ( !fs.existsSync(dirVerificacion) ) fs.mkdirSync(dirVerificacion)
        }
        const nombreBlogTemp = `${Date.now()}~${uidBlog}.md`
        const rutaArchivoTemp = path.join(os.tmpdir(), 'jekuaa', 'blogs', nombreBlogTemp)

        fs.writeFileSync(rutaArchivoTemp, contenidoBlog)

        resultado.nombreBlogTemp = nombreBlogTemp
        resultado.rutaArchivoTemp = rutaArchivoTemp
    }

    if ((datosActualizados && Object.keys(datosActualizados).length) || contenidoBlog) {
        datosActualizados.fechaActualizacion = milliseconds_a_timestamp( Date.now() )
        resultado.datosBlog = datosActualizados
    } else {
        throw new ErrorJekuaa({
            codigo: 'jekuaa/error/usuario_mala_solicitud',
            mensaje: 'No hay datos para actualizar.'
        })
    }

    return resultado
}

module.exports = utils_blog