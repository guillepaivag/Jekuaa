const ErrorJekuaa = require("../models/Error/ErroresJekuaa")
const { categoriaPerteneceASeccion, subcategoriasPertenecenACategoria } = require("./Categorias")
const { rolNecesitaSecciones } = require("./usuarios/RolesSecciones")

const utils_blog = {}
const TAMANHO_MAXIMO_UID = 100

utils_blog.filtroDeDatosDiferentes = ( datosNuevos, datosViejos ) => {
    
    const {
        uid,
        titulo,
        descripcion,
        publicador,
        seccion,
        categoria,
        subCategorias,
        habilitado,
        estado,
        actualizacionActual,
        fechaCreacion,
        fechaActualizacion,
    } = datosNuevos

    const datosFiltrados = {}

    if ( titulo && titulo != datosViejos.titulo ) {
        datosFiltrados.titulo = titulo
    }

    if ( descripcion && descripcion != datosViejos.descripcion ) {
        datosFiltrados.descripcion = descripcion
    }

    if ( seccion && seccion != datosViejos.seccion ) {
        datosFiltrados.seccion = seccion
    }

    if ( categoria && categoria != datosViejos.categoria ) {
        datosFiltrados.categoria = categoria
    }

    if ( subCategorias ) {
        let subCategorias1 = JSON.stringify(subCategorias.sort())
        let subCategorias2 = JSON.stringify(datosViejos.subCategorias.sort())
        
        if ( subCategorias1 != subCategorias2 ) {
            datosFiltrados.subCategorias = subCategorias
        }
    }

    return datosFiltrados
}

utils_blog.verificadorDeTipoDeDatos = ( datosBlog ) => {

    const {
        uid,
        titulo,
        descripcion,
        publicador,
        seccion,
        categoria,
        subCategorias,
        habilitado,
        estado,
        actualizacionActual,
        fechaCreacion,
        fechaActualizacion,
    } = datosBlog

    /**
     * Tipos de datos: Formato y tipo de datos 
     * correctos para un blog
     * 
    */
    if ( uid && typeof uid != 'string' ) {
        throw new ErrorJekuaa({
            codigo: 'jekuaa/error/usuario_mala_solicitud',
            mensaje: 'La uid del blog debe ser string.'
        })
    }

    if ( titulo && typeof titulo != 'string' ) {
        throw new ErrorJekuaa({
            codigo: 'jekuaa/error/usuario_mala_solicitud',
            mensaje: 'El titulo del blog debe ser string.'
        })
    }

    if ( descripcion && typeof descripcion != 'string' ) {
        throw new ErrorJekuaa({
            codigo: 'jekuaa/error/usuario_mala_solicitud',
            mensaje: 'La descripción del blog debe ser string.'
        })
    }

    if ( publicador && typeof publicador != 'string' ) {
        throw new ErrorJekuaa({
            codigo: 'jekuaa/error/usuario_mala_solicitud',
            mensaje: 'El publicador del blog debe ser string.'
        })
    }

    if ( seccion && typeof seccion != 'string' ) {
        throw new ErrorJekuaa({
            codigo: 'jekuaa/error/usuario_mala_solicitud',
            mensaje: 'La sección del blog debe ser string.'
        })
    }

    if ( categoria && typeof categoria != 'string' ) {
        throw new ErrorJekuaa({
            codigo: 'jekuaa/error/usuario_mala_solicitud',
            mensaje: 'La categoría del blog debe ser string.'
        })
    }

    if ( subCategorias && !(subCategorias instanceof Array) ) {
        throw new ErrorJekuaa({
            codigo: 'jekuaa/error/usuario_mala_solicitud',
            mensaje: 'Las subCategorias del blog debe ser un arreglo de string.'
        })
    }

    if ( habilitado && typeof habilitado != 'boolean' ) {
        throw new ErrorJekuaa({
            codigo: 'jekuaa/error/usuario_mala_solicitud',
            mensaje: 'El estado habilitado del blog debe ser boolean.'
        })
    }

    if ( estado && typeof estado != 'string' ) {
        throw new ErrorJekuaa({
            codigo: 'jekuaa/error/usuario_mala_solicitud',
            mensaje: 'El estado del blog debe ser string.'
        })
    }

    if ( actualizacionActual && ( typeof actualizacionActual != 'string' || typeof actualizacionActual != 'object' ) ) {
        throw new ErrorJekuaa({
            codigo: 'jekuaa/error/usuario_mala_solicitud',
            mensaje: 'El estado actualizacionActual del blog debe ser string o object.'
        })
    }

    if ( fechaCreacion && typeof fechaCreacion != 'object' ) {
        throw new ErrorJekuaa({
            codigo: 'jekuaa/error/usuario_mala_solicitud',
            mensaje: 'La fecha de creación del blog debe ser un objeto Timestapm.'
        })
    }

    if ( fechaActualizacion && typeof fechaActualizacion != 'object' ) {
        throw new ErrorJekuaa({
            codigo: 'jekuaa/error/usuario_mala_solicitud',
            mensaje: 'La fecha de actualización del blog debe ser un objeto Timestapm.'
        })
    }

}

utils_blog.verificadorDeCondicionesDeBlogUsuario = ( datosBlog, usuarioSolicitante ) => {

    const {
        uid,
        titulo,
        descripcion,
        publicador,
        seccion,
        categoria,
        subCategorias,
        habilitado,
        estado,
        actualizacionActual,
        fechaCreacion,
        fechaActualizacion,
    } = datosBlog

    /**
     * Verificación de datos: Formato correcto
     * para un blog.
     * 
    */
    if ( uid && uid.length > TAMANHO_MAXIMO_UID ) {
        throw new ErrorJekuaa({
            codigo: 'jekuaa/error/usuario_mala_solicitud',
            mensaje: `La uid ${this.uid} para el blog excede el tamaño maximo ${TAMANHO_MAXIMO_UID}.`
        })
    }

    // La uid del solicitante debe ser igual a la uid del dueño del blog
    if ( publicador && publicador != usuarioSolicitante.uid ) {
        throw new ErrorJekuaa({
            codigo: 'jekuaa/error/usuario_no_autorizado',
            mensaje: 'No puedes agregar un blog a nombre de otro usuario que no seas tu.'
        })
    }

    // La seccion solo es valida si el solicitante pertenece a esa seccion
    if ( seccion && rolNecesitaSecciones( usuarioSolicitante.jekuaaRoles.rol ) ) {
        const seccionValida = usuarioSolicitante.jekuaaRoles.secciones.includes( seccion )
        if ( !seccionValida ) {
            throw new ErrorJekuaa({
                codigo: 'jekuaa/error/usuario_no_autorizado',
                mensaje: 'No se puede agregar un blog de una sección en la que no formas parte.'
            })
        }
    }

    // Verificacion de que la categoria pertenezca a la seccion
    if ( seccion && categoria && !categoriaPerteneceASeccion( seccion, categoria ) ) {
        throw new ErrorJekuaa({
            codigo: 'jekuaa/error/usuario_mala_solicitud',
            mensaje: 'Esta categoría no pertenece a esta sección.'
        })
    }

    // Verificacion de que la subcategoria pertenezca a la seccion y la categoria
    if ( seccion && categoria && subCategorias && !subcategoriasPertenecenACategoria( seccion, categoria, subCategorias ) ) {
        throw new ErrorJekuaa({
            codigo: 'jekuaa/error/usuario_mala_solicitud',
            mensaje: 'Algunas de estas subcategorias no pertenecen a esta categoría y sección.'
        })
    }

    // La fecha de creacion debe ser menor o igual a la de actualizacion
    if ( fechaActualizacion ) {
        if ( !fechaCreacion ) {
            throw new ErrorJekuaa({
                codigo: 'jekuaa/error/usuario_mala_solicitud',
                mensaje: 'No se tiene el dato de fechaCreacion para verificar la validez de fechaActualizacion.'
            })
        }

        if ( fechaCreacion.seconds > fechaActualizacion.seconds ) {
            throw new ErrorJekuaa({
                codigo: 'jekuaa/error/usuario_mala_solicitud',
                mensaje: 'La fecha de creación no puede ser estrictamente mayor que la fecha de actualización.'
            })
        }
        
    }

}

utils_blog.verificadorDeDatosRequeridos = ( datosBlog ) => {
    const {
        uid,
        titulo,
        descripcion,
        publicador,
        seccion,
        categoria,
        subCategorias,
        habilitado,
        estado,
        actualizacionActual,
        fechaCreacion,
        fechaActualizacion,
    } = datosBlog

    if ( !uid ) {
        throw new ErrorJekuaa({
            codigo: 'jekuaa/error/usuario_mala_solicitud',
            mensaje: 'La uid debe existir.'
        })
    }

    if ( !titulo ) {
        throw new ErrorJekuaa({
            codigo: 'jekuaa/error/usuario_mala_solicitud',
            mensaje: 'El titulo debe existir.'
        })
    }

    if ( !publicador ) {
        throw new ErrorJekuaa({
            codigo: 'jekuaa/error/usuario_mala_solicitud',
            mensaje: 'El publicador debe existir.'
        })
    }

    if ( !seccion ) {
        throw new ErrorJekuaa({
            codigo: 'jekuaa/error/usuario_mala_solicitud',
            mensaje: 'La sección debe existir.'
        })
    }

    if ( !categoria ) {
        throw new ErrorJekuaa({
            codigo: 'jekuaa/error/usuario_mala_solicitud',
            mensaje: 'La categoría debe existir.'
        })
    }

}

utils_blog.generadorDeDatosParaActualizar = ( datosNuevos, datosViejos, usuarioSolicitante ) => {

    // Verificador de tipos de datos
    utils_blog.verificadorDeTipoDeDatos( datosNuevos )

    // Verificador de condiciones de datos del blog de acuerdo a los datos del usuario
    utils_blog.verificadorDeCondicionesDeBlogUsuario( datosNuevos, usuarioSolicitante )

    // Verificar campos constantes
    utils_blog.verificadorDeDatosConstantes( datosNuevos, datosViejos )

    // Generador de datos diferentes (nuevos)
    return utils_blog.filtroDeDatosDiferentes( datosNuevos, datosViejos )

}

utils_blog.verificadorDeDatosConstantes = ( datosNuevos, datosViejos ) => {

    const {
        uid,                    // Constante
        titulo,
        descripcion,
        publicador,             // Constante
        seccion,
        categoria,
        subCategorias,
        habilitado,             // Automatico
        estado,                 // Automatico
        actualizacionActual,    // Automatico
        fechaCreacion,          // Constante
        fechaActualizacion,     // Automatico
    } = datosNuevos

    if ( uid ) {
        throw new ErrorJekuaa({
            codigo: 'jekuaa/error/usuario_mala_solicitud',
            mensaje: 'No se puede editar la uid.'
        })
    }

    if ( publicador ) {
        throw new ErrorJekuaa({
            codigo: 'jekuaa/error/usuario_mala_solicitud',
            mensaje: 'No se puede editar el publicador.'
        })
    }

    if ( fechaCreacion && fechaCreacion.seconds != datosViejos.fechaCreacion.seconds ) {
        throw new ErrorJekuaa({
            codigo: 'jekuaa/error/usuario_mala_solicitud',
            mensaje: 'No se puede editar la fechaCreacion del blog.'
        })
    }

}

module.exports = utils_blog