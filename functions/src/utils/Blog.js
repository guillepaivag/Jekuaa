const ErrorJekuaa = require("../models/Error/ErroresJekuaa")
const { categoriaPerteneceASeccion, subcategoriasPertenecenACategoria } = require("./Categorias")
const { rolNecesitaSecciones } = require("./usuarios/RolesSecciones")

const utils_blog = {}
const TAMANHO_MAXIMO_UID = 100

utils_blog.construirDatosParaActualizar = ( datosNuevos, datosViejos ) => {
    
    

    return {

    }
}

utils_blog.verificadorDeFormato = ( datosBlog, usuarioSolicitante ) => {

    const {
        uid,
        titulo,
        descripcion,
        publicador,
        seccion,
        categoria,
        subCategorias,
        habilitado,
        pendiente,
        fechaCreacion,
        fechaActualizacion,
    } = datosBlog

    /**
     * Tipos de datos: Formato y tipo de datos 
     * correctos para un blog
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

    if ( pendiente && typeof pendiente != 'boolean' ) {
        throw new ErrorJekuaa({
            codigo: 'jekuaa/error/usuario_mala_solicitud',
            mensaje: 'El estado pendiente del blog debe ser boolean.'
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

    /**
     * Verificación de datos: Formato correcto
     * para un blog.
    */
    if ( uid && uid.length > TAMANHO_MAXIMO_UID ) {
        throw new ErrorJekuaa({
            codigo: 'jekuaa/error/usuario_mala_solicitud',
            mensaje: `La uid ${this.uid} para el blog excede el tamaño maximo ${TAMANHO_MAXIMO_UID}.`
        })
    }

    if ( publicador && publicador != usuarioSolicitante.uid ) {
        throw new ErrorJekuaa({
            codigo: 'jekuaa/error/usuario_no_autorizado',
            mensaje: 'No puedes agregar un blog a nombre de otro usuario que no seas tu.'
        })
    }

    if ( seccion && rolNecesitaSecciones( usuarioSolicitante.jekuaaRoles.rol ) ) {
        const seccionValida = usuarioSolicitante.jekuaaRoles.secciones.includes( seccion )
        if ( !seccionValida ) {
            throw new ErrorJekuaa({
                codigo: 'jekuaa/error/usuario_no_autorizado',
                mensaje: 'No se puede agregar un blog de una sección en la que no formas parte.'
            })
        }
    }

    if ( !categoriaPerteneceASeccion( seccion, categoria ) ) {
        throw new ErrorJekuaa({
            codigo: 'jekuaa/error/usuario_mala_solicitud',
            mensaje: 'Esta categoría no pertenece a esta sección.'
        })
    }

    if ( !subcategoriasPertenecenACategoria( seccion, categoria, subCategorias ) ) {
        throw new ErrorJekuaa({
            codigo: 'jekuaa/error/usuario_mala_solicitud',
            mensaje: 'Algunas de estas subcategorias no pertenecen a esta categoría y sección.'
        })
    }

    if ( habilitado === true && pendiente === true ) {
        throw new ErrorJekuaa({
            codigo: 'jekuaa/error/usuario_mala_solicitud',
            mensaje: 'Un blog no puede estar habilitado y en estado pendiente a la vez.'
        })
    }

    if ( ( fechaCreacion && fechaActualizacion ) && fechaCreacion.seconds > fechaActualizacion.seconds ) {
        throw new ErrorJekuaa({
            codigo: 'jekuaa/error/usuario_mala_solicitud',
            mensaje: 'La fecha de creación no puede ser estrictamente mayor que la fecha de actualización.'
        })
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
        pendiente,
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

    if ( !subCategorias ) {
        throw new ErrorJekuaa({
            codigo: 'jekuaa/error/usuario_mala_solicitud',
            mensaje: 'La subcategoria debe existir.'
        })
    }
}

utils_blog.construirDatosParaActualizarYVerificarFormato = ( datosNuevos, datosViejos ) => {
    
    // Datos Construidos
    const {

    } = utils_blog.construirDatosParaActualizar( datosNuevos, datosViejos )

    // Verificar formato
    utils_blog.verificadorDeFormato( datosUsuarioDBActualizar )

    // Retornar los datos solo para actualizar
    return {
        
    }
}

module.exports = utils_blog