const functions = require('firebase-functions')
const ffmpeg = require('fluent-ffmpeg')
const ffprobePath = require("@ffprobe-installer/ffprobe").path
// const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path

const admin = require('../../../../firebase-service')
const db = require('../../../../db')
const config = require('../../../../config')
const CursoBorrador = require('../../../models/Cursos/curso/CursoBorrador')
const Curso = require('../../../models/Cursos/curso/Curso')
const CursoPublicado = require('../../../models/Cursos/curso/CursoPublicado')
const generadorDeErroresCursoBorrador = require('../../../helpers/generadorDeErroresCursoBorrador')
const ffCursos = {}


const rutaModo = config.environment.mode === 'production' ? 'prod' : 'dev'
const bucketNameFotoCurso = rutaModo === 'prod' ? 'prod-j-fotos-cursos' : 'dev-j-fotos-cursos'


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
    
    // Verificaciones
    const mensajesError = await generadorDeErroresCursoBorrador(cursoBorrador)

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


ffCursos.actualizacionFotoCurso = functions
.region('southamerica-east1')
.storage
.bucket(bucketNameFotoCurso)
.object().onFinalize(async (object, context) => {
    console.log('object', JSON.stringify(object))
    console.log('context', JSON.stringify(context))

    /**
     * Formato del Object verificacion: uidCurso/tipo/verificacion/nombre.extension
     * Formato del Object borrador: uidCurso/tipo/borrador-${milisegundos}.extension
     * Formato del Object publicado: uidCurso/tipo/publicado-${milisegundos}.extension
     * --------------------
     * Tipos: 
     * 1. fotoCurso
     * 2. fotoPortada
     * 
     * Estados:
     * 1. verificacion
     * 2. borrador
     * 3. publicado
    */

    try {
        const array1 = object.name.split('/')
        const array2 = object.name.split('.')

        const uidCurso = array1[0]
        const tipo = array1[1]
        const estado = array1[2]
        const fileExtension = array2[array2.length-1]

        const bucketPrueba = admin.storage().bucket(bucketNameFotoCurso)
        const linkPrueba = bucketPrueba.file(object.name).publicUrl()

        if (estado.includes('verificacion') || estado.includes('borrador')) {
            const cursoBorrador = new CursoBorrador()
            const existe = await cursoBorrador.importarDatosDeUnCurso(uidCurso)
            if (!existe) throw new Error('No existe este curso.')

        } else if (estado.includes('publicado')) {
            const cursoPublicado = new CursoPublicado()
            const existe = await cursoPublicado.importarDatosDeUnCurso(uidCurso)
            if (!existe) throw new Error('No existe este curso.')

        } else {
            throw new Error('No es verificacion, borrador ni publicado.')
        }

        if ( !estado.includes('verificacion') ) return
        
        /* Verificaciones */
        let imgMetadata = null
        ffmpeg.setFfprobePath(ffprobePath)
        
        const promiseAll = []
        promiseAll.push(new Promise((resolve, reject) => {
            ffmpeg.ffprobe(linkPrueba, function(err, metadata) {
                if (err) return reject(err)
                imgMetadata = metadata
                resolve()
            })
        }))

        await Promise.all(promiseAll)
        console.log('imgMetadata', JSON.stringify(imgMetadata))

        // png | jpg | jpeg
        if (fileExtension !== 'png' && fileExtension !== 'jpg' && fileExtension !== 'jpeg') 
            throw new Error('Extensión incorrecta.')
        
        // 2mb
        const sizeBytes = Number(object.size)
        const sizeMB = sizeBytes / 1024 / 1024

        if (sizeMB > 2) 
            throw new Error('La foto del curso solo puede ser hasta 2MB.')

        // Resolución
        if (tipo === 'fotoCurso') {
            // 1024x600
            if (imgMetadata.streams[0].width !== 1024 || imgMetadata.streams[0].height !== 600) 
                throw new Error('La resolución de la foto del curso es 1024x600.')

        } else {
            // 1920x1080
            if (imgMetadata.streams[0].width !== 1920 || imgMetadata.streams[0].height !== 1080) 
                throw new Error('La resolución de la foto de portada es 1920x1080.')
        }

        // Eliminar la foto borrador actual
        await admin.storage().bucket(bucketNameFotoCurso).deleteFiles({ prefix: `${uidCurso}/${tipo}/borrador-` })

        // Mover la foto-verificacion como foto-borrador
        const bucket = admin.storage().bucket(bucketNameFotoCurso)
        const file = bucket.file(object.name)

        const data = await file.move(`${uidCurso}/${tipo}/borrador-${Date.now()}.${fileExtension}`)
        
        const destinationFile = data[0]
        const apiResponse = data[1]

        // Actualizacion de la URL
        if ( tipo === 'fotoCurso' ) {
            CursoBorrador.actualizarCurso(uidCurso, {
                fotoPerfil: destinationFile.publicUrl()
            })
        } else {
            CursoBorrador.actualizarCurso(uidCurso, {
                fotoPortada: destinationFile.publicUrl()
            })
        }

    } catch (error) {
        console.log('Error al actualizar una foto del curso: ', error)

        // Eliminar foto de perfil en verificacion
        const file = admin.storage().bucket(bucketNameFotoCurso).file( object.name )
        file.delete()
    }
    
})


module.exports = ffCursos