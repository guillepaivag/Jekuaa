const Blog = require("../models/Blog")
const ErrorJekuaa = require("../models/Error/ErroresJekuaa")
const path = require('path')
const fs = require('fs')
const { milliseconds_a_timestamp } = require("./Timestamp")

const utils_blog = {}

utils_blog.construirDatosParaNuevoBlog = ( datosBlog, contenidoBlog, esRutaAdmin ) => {
    
    // Referencia del blog
    const blog = new Blog(datosBlog)
    const datosBlogFormateado = blog.formatearDatos().getBlog()

    datosBlogFormateado.cantidadMeGusta = 0
    !esRutaAdmin ? datosBlogFormateado.habilitado = true : ''
    !esRutaAdmin ? datosBlogFormateado.revision = true : ''
    datosBlogFormateado.fechaCreacion = milliseconds_a_timestamp( Date.now() )
    datosBlogFormateado.fechaActualizacion = milliseconds_a_timestamp( Date.now() )

    // Archivo del blog
    let dirArray = ['..', 'temp', 'blogs']
    let dirVerificacion = path.join(__dirname)
    for (let i = 0; i < dirArray.length; i++) {
        const element = dirArray[i]

        dirVerificacion = path.join(dirVerificacion, element)
        
        if ( element != '..' && !fs.existsSync(dirVerificacion) ){
            fs.mkdirSync(dirVerificacion)
        }
    }
    const separador = `~`
    const nombreBlogTemp = `${Date.now()}${separador}${datosBlog.uid}.md`
    const rutaArchivoTemp = path.join(__dirname, '..', 'temp', 'blogs', nombreBlogTemp)

    fs.writeFileSync(rutaArchivoTemp, contenidoBlog)

    return {
        datosBlog: datosBlogFormateado,
        nombreBlogTemp,
        rutaArchivoTemp,
    }
}

utils_blog.construirDatosParaActualizacionBlog = ( uidBlog, datosBlog, contenidoBlog, esRutaAdmin ) => {
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

    const datosActualizados = {}
    const resultado = {}

    if (datosBlog != undefined) {
        // Referencia del blog
        if (esRutaAdmin && Object.keys(datosBlog).length) {
            referencia != undefined ? datosActualizados.referencia = referencia : ''
            titulo != undefined ? datosActualizados.titulo = titulo : ''
            descripcion != undefined ? datosActualizados.descripcion = descripcion : ''
            seccion != undefined ? datosActualizados.seccion = seccion : ''
            categoria != undefined ? datosActualizados.categoria = categoria : ''
            subCategorias != undefined ? datosActualizados.subCategorias = subCategorias : ''
            habilitado != undefined ? datosActualizados.habilitado = habilitado : ''
            publicado != undefined ? datosActualizados.publicado = publicado : ''
            revision != undefined ? datosActualizados.revision = revision : ''
        }

        if (!esRutaAdmin && Object.keys(datosBlog).length) {
            referencia != undefined ? datosActualizados.referencia = referencia : ''
            titulo != undefined ? datosActualizados.titulo = titulo : ''
            descripcion != undefined ? datosActualizados.descripcion = descripcion : ''
            seccion != undefined ? datosActualizados.seccion = seccion : ''
            categoria != undefined ? datosActualizados.categoria = categoria : ''
            subCategorias != undefined ? datosActualizados.subCategorias = subCategorias : ''
            publicado != undefined ? datosActualizados.publicado = publicado : ''
        }
    }
    
    // Archivo del blog
    if (contenidoBlog != undefined) {
        let dirArray = ['..', 'temp', 'blogs']
        let dirVerificacion = path.join(__dirname)
        for (let i = 0; i < dirArray.length; i++) {
            const element = dirArray[i]

            dirVerificacion = path.join(dirVerificacion, element)
            
            if ( element != '..' && !fs.existsSync(dirVerificacion) ){
                fs.mkdirSync(dirVerificacion)
            }
        }
        const separador = `~`
        const nombreBlogTemp = `${Date.now()}${separador}${uidBlog}.md`
        const rutaArchivoTemp = path.join(__dirname, '..', 'temp', 'blogs', nombreBlogTemp)

        fs.writeFileSync(rutaArchivoTemp, contenidoBlog)

        resultado.nombreBlogTemp = nombreBlogTemp
        resultado.rutaArchivoTemp = rutaArchivoTemp
    }

    if ((datosBlog && Object.keys(datosBlog).length) || contenidoBlog) {
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