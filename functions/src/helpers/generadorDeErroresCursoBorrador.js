const CursoBorrador = require("../models/Cursos/curso/CursoBorrador")

const generadorDeErroresCursoBorrador = async (cursoBorrador = new CursoBorrador()) => {
    const mensajesError = []

    if ( cursoBorrador.responsable === '' ) mensajesError.push('curso_no_existe_responsable')

    if ( cursoBorrador.instructor === '' ) mensajesError.push('curso_no_existe_instructor')

    if ( cursoBorrador.contribuyentes.length === 0 ) mensajesError.push('curso_no_existe_contribuyentes')
    if ( !cursoBorrador.contribuyentes.includes(cursoBorrador.instructor) ) mensajesError.push('curso_instructor_no_es_contribuyente')
    
    if ( cursoBorrador.fotoPerfil === '' ) mensajesError.push('curso_no_existe_foto_perfil')
    
    if ( cursoBorrador.fotoPortada === '' ) mensajesError.push('curso_no_existe_foto_portada')
    
    if ( cursoBorrador.titulo === '' ) mensajesError.push('curso_no_existe_titulo')
    
    if ( cursoBorrador.codigo === '' ) mensajesError.push('curso_no_existe_codigo_curso')
    
    if ( cursoBorrador.descripcion === '' ) mensajesError.push('curso_no_existe_descripcion')
    
    if ( cursoBorrador.requisitos.length === 0 ) mensajesError.push('curso_no_existe_requisitos')
    
    if ( cursoBorrador.objetivos.length === 0 ) mensajesError.push('curso_no_existe_objetivos')
    
    if ( cursoBorrador.nivel === '' ) mensajesError.push('curso_no_existe_nivel')

    if ( cursoBorrador.seccion === '' ) mensajesError.push('curso_no_existe_seccion')

    if ( cursoBorrador.categorias.length === 0 ) mensajesError.push('curso_no_existe_categorias')
    
    if ( cursoBorrador.duracion === 0 ) mensajesError.push('curso_no_existe_duracion')
    
    if ( cursoBorrador.idioma === '' ) mensajesError.push('curso_no_existe_idioma')

    return mensajesError
}

module.exports = generadorDeErroresCursoBorrador