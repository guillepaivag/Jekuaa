const functions = require('firebase-functions')

const admin = require('../../../../firebase-service')
const db = require('../../../../db')
const CursoBorrador = require('../../../models/Cursos/curso/CursoBorrador')
const Curso = require('../../../models/Cursos/curso/Curso')
const ffCursos = {}


// SI SE ACTUALIZA UN DOCUMENTO CURSO, VERIFICAR SU VALIDEZ
ffCursos.validacionEstadoDocumentoCursoBorrador = functions
.region('southamerica-east1')
.firestore.document('CursosBorrador/{uidCursoBorrador}')
.onUpdate(async ( change, context ) => {
    const docNuevo = change.after
    const docViejo = change.before

    const { uidCursoBorrador } = context.params
    
    const cursoBorrador = new CursoBorrador( docNuevo.data() )
    const cursoBorradorViejo = new CursoBorrador( docViejo.data() )

    const datosActualizados = {}
    let mensajesError = []

    // Verificaciones
    if ( cursoBorrador.responsable === '' ) mensajesError.push('No existe responsable en este curso, se necesita un responsable.')

    if ( cursoBorrador.contribuyentes.length === 0 ) mensajesError.push('No existen contribuyentes en el curso, se necesita al menos un contribuyente.')
    if ( !cursoBorrador.contribuyentes.includes(cursoBorrador.responsable) ) mensajesError.push('El responsable no pertenece a los contribuyentes.')
    
    if ( cursoBorrador.fotoPerfil === '' ) mensajesError.push('No existe una foto de perfil en este curso, favor actualizar.')
    
    if ( cursoBorrador.titulo === '' ) mensajesError.push('No existe titulo en este curso, favor actualizar.')
    
    if ( cursoBorrador.referenciaURL === '' ) mensajesError.push('No existe referencia url en este curso, favor actualizar.')
    
    if ( cursoBorrador.descripcion === '' ) mensajesError.push('No existe descripción en este curso, favor actualizar.')
    
    if ( cursoBorrador.requisitos.length === 0 ) mensajesError.push('No existen requisitos en este curso, favor actualizar.')
    
    if ( cursoBorrador.objetivos.length === 0 ) mensajesError.push('No existen objetivos en este curso, favor actualizar.')
    
    if ( cursoBorrador.nivel === '' ) mensajesError.push('No existe nivel en este curso, favor actualizar.')

    if ( cursoBorrador.seccion ) {
        if ( cursoBorrador.categorias.length === 0 ) mensajesError.push('No existen categorias, favor actualizar.')
    }
    
    if ( cursoBorrador.duracion === 0 ) mensajesError.push('La duración del curso es 0, favor agregar contenido.')
    
    if ( cursoBorrador.idioma === '' ) mensajesError.push('No existe idioma principal en este curso, favor actualizar.')

    if ( cursoBorrador.mensajesError.length === mensajesError.length ) {
        // No actualizar si tienen los mismos valores
        for (let i = 0; i < cursoBorrador.mensajesError.length; i++) {
            const mensaje = cursoBorrador.mensajesError[i]
            if (!mensajesError.includes(mensaje)) {
                datosActualizados.mensajesError = mensajesError
                break
            }
        }
    } else {
        datosActualizados.mensajesError = mensajesError
    }

    datosActualizados.contieneErrores = !!mensajesError.length

    // Debe existir el curso
    let ref = db.collection('CursosPublicado').doc(uidCursoBorrador)
    let doc = await ref.get()
    if (doc.exists) {
        // Una unidad nueva, siempre sera etiquetado como nuevo
        // hasta que se acepte los cambios o se eliminen
        if ( docNuevo.data().estadoDocumento !== 'nuevo' ) {
            const cursoPublicado = new Curso( doc.data() )

            let huboCambio = false
            if ( !huboCambio ) {
                if (cursoPublicado.contribuyentes.length === cursoBorrador.contribuyentes.length) {
                    for (let i = 0; i < cursoPublicado.contribuyentes.length; i++) {
                        const contribuyente = cursoPublicado.contribuyentes[i]
                        if ( !cursoBorrador.contribuyentes.includes(contribuyente) ) {
                            huboCambio = true
                            break
                        }
                    }
                } else {
                    huboCambio = true
                }
            }
            
            if ( !huboCambio ) 
                huboCambio = cursoPublicado.fotoPerfil !== cursoBorrador.fotoPerfil

            if ( !huboCambio ) 
                huboCambio = cursoPublicado.titulo !== cursoBorrador.titulo

            if ( !huboCambio ) 
                huboCambio = cursoPublicado.descripcion !== cursoBorrador.descripcion

            if ( !huboCambio ) {
                if (cursoPublicado.requisitos.length === cursoBorrador.requisitos.length) {
                    for (let i = 0; i < cursoPublicado.requisitos.length; i++) {
                        const requisito = cursoPublicado.requisitos[i]
                        if ( !cursoBorrador.requisitos.includes(requisito) ) {
                            huboCambio = true
                            break
                        }
                    }
                } else {
                    huboCambio = true
                }
            }

            if ( !huboCambio ) {
                if (cursoPublicado.objetivos.length === cursoBorrador.objetivos.length) {
                    for (let i = 0; i < cursoPublicado.objetivos.length; i++) {
                        const objetivo = cursoPublicado.objetivos[i]
                        if ( !cursoBorrador.objetivos.includes(objetivo) ) {
                            huboCambio = true
                            break
                        }
                    }
                } else {
                    huboCambio = true
                }
            }

            if ( !huboCambio ) 
                huboCambio = cursoPublicado.nivel !== cursoBorrador.nivel

            if ( !huboCambio ) 
                huboCambio = cursoPublicado.seccion !== cursoBorrador.seccion

            if ( !huboCambio ) {
                if (cursoPublicado.categorias.length === cursoBorrador.categorias.length) {
                    for (let i = 0; i < cursoPublicado.categorias.length; i++) {
                        const categoria = cursoPublicado.categorias[i]
                        if ( !cursoBorrador.categorias.includes(categoria) ) {
                            huboCambio = true
                            break
                        }
                    }
                } else {
                    huboCambio = true
                }
            }

            if ( !huboCambio ) 
                huboCambio = cursoPublicado.duracion !== cursoBorrador.duracion
            
            if ( !huboCambio ) 
                huboCambio = cursoPublicado.idioma !== cursoBorrador.idioma

            if ( !huboCambio ) {
                if (cursoPublicado.subTitulos.length === cursoBorrador.subTitulos.length) {
                    for (let i = 0; i < cursoPublicado.subTitulos.length; i++) {
                        const subTitulo = cursoPublicado.subTitulos[i]
                        if ( !cursoBorrador.subTitulos.includes(subTitulo) ) {
                            huboCambio = true
                            break
                        }
                    }
                } else {
                    huboCambio = true
                }
            }
            

            // Si es un documento sin cambios y hubo un cambio, actualizar a "actualizado"
            if ( huboCambio && cursoBorrador.estadoDocumento === '' ) 
                datosActualizados.estadoDocumento = 'actualizado'

            // Si es un documento con cambios y no hubo cambios, actualizar a ""
            if ( !huboCambio && cursoBorrador.estadoDocumento === 'actualizado' ) 
                datosActualizados.estadoDocumento = ''
        }
    }

    // Actualizar
    if ( Object.keys(datosActualizados).length ) {
        db
        .collection('CursosBorrador').doc(uidCursoBorrador)
        .update(datosActualizados)
    }
})


module.exports = ffCursos