const functions = require('firebase-functions')

const admin = require('../../../firebase-service')
const db = require('../../../db')
const timestamp = require('../../utils/timestamp')
const config = require('../../../config')
const rutaModo = config.environment.mode === 'production' ? 'prod' : 'dev'

const CursoBorrador = require('../../models/Cursos/curso/CursoBorrador')
const CursoPublicado = require('../../models/Cursos/curso/CursoPublicado')

const UnidadBorrador = require('../../models/Cursos/unidad/UnidadBorrador')
const UnidadPublicado = require('../../models/Cursos/unidad/UnidadPublicado')

const ClaseBorrador = require('../../models/Cursos/clase/ClaseBorrador')
const ClasePublicado = require('../../models/Cursos/clase/ClasePublicado')

const CursoEstadoPublicacion = require('../../models/Cursos/curso/CursoEstadoPublicacion')
const ElementoCursoEliminado = require('../../models/Cursos/curso/ElementoCursoEliminado')
const ContenidoVideoPublicado = require('../../models/Cursos/contenidoClase/ContenidoVideoPublicado')
const ContenidoArticuloPublicado = require('../../models/Cursos/contenidoClase/ContenidoArticuloPublicado')
const ContenidoClase = require('../../models/Cursos/contenidoClase/ContenidoClase')
const ContenidoVideoBorrador = require('../../models/Cursos/contenidoClase/ContenidoVideoBorrador')
const ContenidoArticuloBorrador = require('../../models/Cursos/contenidoClase/ContenidoArticuloBorrador')

const ff = {}


// SI SE ACTUALIZA UN DOCUMENTO CURSO, VERIFICAR SU VALIDEZ
ff.eventoPublicacionCurso = functions
.region('southamerica-east1')
.firestore.document('CursosEstadoPublicacion/{uidCursoEstadoPublicacion}')
.onWrite(async ( change, context ) => {
    
    try {
        const docNuevo = change.after
        const docViejo = change.before

        const { uidCursoEstadoPublicacion } = context.params

        if (docViejo.exists && !docNuevo.exists) return
        
        const CEPViejo = new CursoEstadoPublicacion(docViejo.data())
        const CEPNuevo = new CursoEstadoPublicacion(docNuevo.data())

        const esPublicacion = ( !docViejo.exists && docNuevo.exists && CEPNuevo.estado ) || ( docViejo.exists && docNuevo.exists && !CEPViejo.estado && CEPNuevo.estado )
        if ( !esPublicacion ) return

        const cursoBorrador = new CursoBorrador()
        await cursoBorrador.importarDatosDeUnCurso(uidCursoEstadoPublicacion)

        if (cursoBorrador.estadoDocumento === 'nuevo') {

            // CURSO
            const cursoPublicado = new CursoPublicado()
            cursoPublicado.setCurso( cursoBorrador.getCurso() )
            cursoPublicado.setFechaCreacion( timestamp.milliseconds_a_timestamp(Date.now()) )
            cursoPublicado.setFechaActualizacion( timestamp.milliseconds_a_timestamp(Date.now()) )

            await CursoPublicado.crearCurso(cursoPublicado)
            CursoBorrador.actualizarCurso(uidCursoEstadoPublicacion, {
                estadoDocumento: ''
            })




            // UNIDADES
            const snapshotUnidad = await db
            .collection('CursosBorrador').doc(uidCursoEstadoPublicacion)
            .collection('UnidadesBorrador').get()

            const docsUnidades = snapshotUnidad.docs

            for (let i = 0; i < docsUnidades.length; i++) {
                const docUnidad = docsUnidades[i]
                const dataUnidad = docUnidad.data()

                const unidadPublicado = new UnidadPublicado()
                unidadPublicado.setUnidad( dataUnidad )
                unidadPublicado.setFechaCreacion( timestamp.milliseconds_a_timestamp(Date.now()) )
                unidadPublicado.setFechaActualizacion( timestamp.milliseconds_a_timestamp(Date.now()) )

                await UnidadPublicado.agregar(uidCursoEstadoPublicacion, unidadPublicado)
                UnidadBorrador.actualizar(uidCursoEstadoPublicacion, unidadPublicado.uid, {
                    estadoDocumento: ''
                })


                

                // CLASES
                const snapshotClase = await docUnidad.ref.collection('ClasesBorrador').get()
                const docsClases = snapshotClase.docs

                for (let j = 0; j < docsClases.length; j++) {
                    const docClase = docsClases[j]
                    const dataClase = docClase.data()

                    const clasePublicado = new ClasePublicado()
                    clasePublicado.setClase( dataClase )
                    clasePublicado.setFechaCreacion( timestamp.milliseconds_a_timestamp(Date.now()) )
                    clasePublicado.setFechaActualizacion( timestamp.milliseconds_a_timestamp(Date.now()) )

                    await ClasePublicado.agregar(uidCursoEstadoPublicacion, unidadPublicado.uid, clasePublicado)
                    ClaseBorrador.actualizar(uidCursoEstadoPublicacion, unidadPublicado.uid, clasePublicado.uid, {
                        estadoDocumento: ''
                    })
                }
            }

            // CONTENIDOS
            const snapshotContenidoClase = await db
            .collection('CursosBorrador').doc(uidCursoEstadoPublicacion)
            .collection('ContenidoClasesBorrador').get()

            const docsContenidoClases = snapshotContenidoClase.docs

            for (let i = 0; i < docsContenidoClases.length; i++) {
                const docContenidoClase = docsContenidoClases[i]
                const dataContenidoClase = docContenidoClase.data()
                
                let contenidoClasePublicado = null
                if (dataContenidoClase.tipoContenido === 'video') 
                    contenidoClasePublicado = new ContenidoVideoPublicado(dataContenidoClase)
                else if (dataContenidoClase.tipoContenido === 'articulo') 
                    contenidoClasePublicado = new ContenidoArticuloPublicado(dataContenidoClase)
                
                contenidoClasePublicado.setFechaCreacion( timestamp.milliseconds_a_timestamp(Date.now()) )
                contenidoClasePublicado.setFechaActualizacion( timestamp.milliseconds_a_timestamp(Date.now()) )

                // Contenido
                let bucketOrigin = rutaModo === 'prod' ? 'prod-j-cursos-contenido-b' : 'dev-j-cursos-contenido-b'
                let bucketDestination = rutaModo === 'prod' ? 'prod-j-cursos-contenido' : 'dev-j-cursos-contenido'
                const ruta = `${uidCursoEstadoPublicacion}/${contenidoClasePublicado.uid}/${dataContenidoClase.tipoContenido}.${dataContenidoClase.fileExtension}`
                await ContenidoClase.moverContenidoArchivo({
                    bucketOrigin: bucketOrigin,
                    bucketDestination: bucketDestination,
                    rutaOrigin: ruta,
                    rutaDestination : ruta,
                })

                // Documento
                const datosContenidoClase = contenidoClasePublicado.tipoContenido === 'video' ?
                contenidoClasePublicado.getContenidoVideoPublicado() : contenidoClasePublicado.getContenidoArticuloPublicado()

                await ContenidoClase.agregarDocumentoPublicado(uidCursoEstadoPublicacion, datosContenidoClase)
                await ContenidoClase.actualizarDocumentoBorrador(uidCursoEstadoPublicacion, contenidoClasePublicado.uid, {
                    estadoDocumento: ''
                })
            }

        } else {
            // TODO: Filtrar las unidades, clases y contenidos que su estadoDocumento sea diferente de '' (vacio)
            if (cursoBorrador.estadoDocumento === 'actualizado') {
                CursoPublicado.actualizarCurso(uidCursoEstadoPublicacion, {
                    ...cursoBorrador.getCurso(),
                    fechaActualizacion: timestamp.milliseconds_a_timestamp(Date.now())
                })
                CursoBorrador.actualizarCurso(uidCursoEstadoPublicacion, {
                    estadoDocumento: ''
                })
            }


            
            let ref = db.collection('CursosBorrador').doc(uidCursoEstadoPublicacion)
            const snapshotUnidades = await ref.collection('UnidadesBorrador').get()
            const docsUnidades = snapshotUnidades.docs

            for (let i = 0; i < docsUnidades.length; i++) {
                const docUnidad = docsUnidades[i]
                const unidadBorrador = new UnidadBorrador(docUnidad.data())

                if (unidadBorrador.estadoDocumento === 'nuevo') {
                    const unidadPublicado = new UnidadPublicado()
                    unidadPublicado.setUnidad( unidadBorrador.getUnidad() )
                    unidadPublicado.setFechaCreacion( timestamp.milliseconds_a_timestamp(Date.now()) )
                    unidadPublicado.setFechaActualizacion( timestamp.milliseconds_a_timestamp(Date.now()) )

                    await UnidadPublicado.agregar(uidCursoEstadoPublicacion, unidadPublicado)
                    UnidadBorrador.actualizar(uidCursoEstadoPublicacion, unidadBorrador.uid, {
                        estadoDocumento: ''
                    })
                }

                if (unidadBorrador.estadoDocumento === 'actualizado') {
                    UnidadPublicado.actualizar(uidCursoEstadoPublicacion, unidadBorrador.uid, {
                        ...unidadBorrador.getUnidad(),
                        fechaActualizacion: timestamp.milliseconds_a_timestamp(Date.now())
                    })
                    UnidadBorrador.actualizar(uidCursoEstadoPublicacion, unidadBorrador.uid, {
                        estadoDocumento: ''
                    })
                }




                const snapshotClase = await docUnidad.ref.collection('ClasesBorrador').get()
                const docsClases = snapshotClase.docs

                for (let j = 0; j < docsClases.length; j++) {
                    const docClase = docsClases[j]
                    const claseBorrador = new ClaseBorrador(docClase.data())

                    if (claseBorrador.estadoDocumento === 'nuevo') {
                        const clasePublicado = new ClasePublicado()
                        clasePublicado.setClase( claseBorrador.getClase() )
                        clasePublicado.setFechaCreacion( timestamp.milliseconds_a_timestamp(Date.now()) )
                        clasePublicado.setFechaActualizacion( timestamp.milliseconds_a_timestamp(Date.now()) )
        
                        await ClasePublicado.agregar(uidCursoEstadoPublicacion, unidadBorrador.uid, clasePublicado)
                        ClaseBorrador.actualizar(uidCursoEstadoPublicacion, unidadBorrador.uid, claseBorrador.uid, {
                            estadoDocumento: ''
                        })
                    }
        
                    if (claseBorrador.estadoDocumento === 'actualizado') {
                        ClasePublicado.actualizar(uidCursoEstadoPublicacion, unidadBorrador.uid, claseBorrador.uid, {
                            ...claseBorrador.getClase(),
                            fechaActualizacion: timestamp.milliseconds_a_timestamp(Date.now())
                        })
                        ClaseBorrador.actualizar(uidCursoEstadoPublicacion, unidadBorrador.uid, claseBorrador.uid, {
                            estadoDocumento: ''
                        })
                    }

                    if ( claseBorrador.estadoDocumento.includes('cambioUnidad') ) {
                        const array = claseBorrador.estadoDocumento.split('/')
                        const uidUnidadVieja = array[1]
                        const uidUnidadNueva = array[2]

                        // Agregar clase a la nueva unidad
                        const clasePublicadoViejo = new ClasePublicado()
                        await clasePublicadoViejo.importarClasePorUID(uidCursoEstadoPublicacion, uidUnidadVieja, claseBorrador.uid)

                        const clasePublicadoNuevo = new ClasePublicado( claseBorrador.getClase() )
                        clasePublicadoNuevo.setFechaCreacion( clasePublicadoViejo.fechaCreacion )
                        clasePublicadoNuevo.setFechaActualizacion( timestamp.milliseconds_a_timestamp(Date.now()) )
                        
                        ClasePublicado.agregar(uidCursoEstadoPublicacion, uidUnidadNueva, clasePublicadoNuevo)

                        // Eliminar clase de la vieja unidad
                        ClasePublicado.eliminar(uidCursoEstadoPublicacion, uidUnidadVieja, claseBorrador.uid)
                        
                        ClaseBorrador.actualizar(uidCursoEstadoPublicacion, unidadBorrador.uid, claseBorrador.uid, {
                            estadoDocumento: ''
                        })
                    }
                }
            }




            const snapshotContenidoClase = await db
            .collection('CursosBorrador').doc(uidCursoEstadoPublicacion)
            .collection('ContenidoClasesBorrador').where('estadoDocumento', '!=', '').get()

            const docsContenidoClases = snapshotContenidoClase.docs

            for (let i = 0; i < docsContenidoClases.length; i++) {
                const docContenidoClase = docsContenidoClases[i]
                const dataContenidoClase = docContenidoClase.data()
                
                let contenidoClaseBorrador = null
                if (dataContenidoClase.tipoContenido === 'video') 
                    contenidoClaseBorrador = new ContenidoVideoBorrador(dataContenidoClase)
                else if (dataContenidoClase.tipoContenido === 'articulo') 
                    contenidoClaseBorrador = new ContenidoArticuloBorrador(dataContenidoClase)

                if (contenidoClaseBorrador.estadoDocumento === 'nuevo') {
                    let contenidoClasePublicado = null
                    if (dataContenidoClase.tipoContenido === 'video') 
                        contenidoClasePublicado = new ContenidoVideoPublicado(dataContenidoClase)
                    else if (dataContenidoClase.tipoContenido === 'articulo') 
                        contenidoClasePublicado = new ContenidoArticuloPublicado(dataContenidoClase)
                    
                    contenidoClasePublicado.setFechaCreacion( timestamp.milliseconds_a_timestamp(Date.now()) )
                    contenidoClasePublicado.setFechaActualizacion( timestamp.milliseconds_a_timestamp(Date.now()) )

                    // Contenido
                    let bucketOrigin = rutaModo === 'prod' ? 'prod-j-cursos-contenido-b' : 'dev-j-cursos-contenido-b'
                    let bucketDestination = rutaModo === 'prod' ? 'prod-j-cursos-contenido' : 'dev-j-cursos-contenido'
                    const ruta = `${uidCursoEstadoPublicacion}/${contenidoClasePublicado.uid}/${dataContenidoClase.tipoContenido}.${dataContenidoClase.fileExtension}`
                    await ContenidoClase.moverContenidoArchivo({
                        bucketOrigin: bucketOrigin,
                        bucketDestination: bucketDestination,
                        rutaOrigin: ruta,
                        rutaDestination : ruta,
                    })

                    // Documento
                    const datosContenidoClase = contenidoClasePublicado.tipoContenido === 'video' ?
                    contenidoClasePublicado.getContenidoVideoPublicado() : contenidoClasePublicado.getContenidoArticuloPublicado()

                    await ContenidoClase.agregarDocumentoPublicado(uidCursoEstadoPublicacion, datosContenidoClase)
                    await ContenidoClase.actualizarDocumentoBorrador(uidCursoEstadoPublicacion, contenidoClasePublicado.uid, {
                        estadoDocumento: ''
                    })
                }
                
                if (contenidoClaseBorrador.estadoDocumento === 'actualizado') {
                    // Contenido
                    const resultContenidoPublicado = await ContenidoClase.obtenerDocumentoPublicado(uidCursoEstadoPublicacion, contenidoClaseBorrador.uid)
                    const contenidoClasePublicado = resultContenidoPublicado.contenidoClase
                    
                    let bucketNameContenidoBorrador = rutaModo === 'prod' ? 'prod-j-cursos-contenido-b' : 'dev-j-cursos-contenido-b'
                    let bucketNameContenidoPublicado = rutaModo === 'prod' ? 'prod-j-cursos-contenido' : 'dev-j-cursos-contenido'
                    
                    const rutaPrefixEliminacion = contenidoClasePublicado.tipoContenido === 'video' ? 
                    `${uidCursoEstadoPublicacion}/${contenidoClasePublicado.uid}/video.${contenidoClasePublicado.fileExtension}` :
                    `${uidCursoEstadoPublicacion}/${contenidoClasePublicado.uid}/articulo.md`
                    await ContenidoClase.eliminarContenidoArchivo({
                        bucketName: bucketNameContenidoPublicado,
                        rutaPrefix: rutaPrefixEliminacion,
                    })

                    const rutaContenidoClase = contenidoClaseBorrador.tipoContenido === 'video' ? 
                    `${uidCursoEstadoPublicacion}/${contenidoClaseBorrador.uid}/video.${contenidoClaseBorrador.fileExtension}` :
                    `${uidCursoEstadoPublicacion}/${contenidoClaseBorrador.uid}/articulo.md`
                    await ContenidoClase.moverContenidoArchivo({
                        bucketOrigin: bucketNameContenidoBorrador,
                        bucketDestination: bucketNameContenidoPublicado,
                        rutaOrigin: rutaContenidoClase,
                        rutaDestination: rutaContenidoClase,
                    })

                    // Documento
                    const datosContenidoClase = contenidoClaseBorrador.tipoContenido === 'video' ?
                    contenidoClaseBorrador.getContenidoVideo() : contenidoClaseBorrador.getContenidoArticulo()

                    await ContenidoClase.actualizarDocumentoPublicado(uidCursoEstadoPublicacion, contenidoClaseBorrador.uid, {
                        ...datosContenidoClase,
                        fechaActualizacion: timestamp.milliseconds_a_timestamp(Date.now()),
                    })
                    await ContenidoClase.actualizarDocumentoBorrador(uidCursoEstadoPublicacion, contenidoClaseBorrador.uid, {
                        estadoDocumento: ''
                    })
                }
            }




            
            // Documentos eliminados en referencia de los documentos de CursoPublicado
            const snapshotElementoCursoEliminado = await db
            .collection('CursosBorrador').doc(uidCursoEstadoPublicacion)
            .collection('ElementosCursoEliminado').get()

            const docsElementoCursoEliminado = snapshotElementoCursoEliminado.docs

            for (let i = 0; i < docsElementoCursoEliminado.length; i++) {
                const docElementoCursoEliminado = docsElementoCursoEliminado[i]
                const elementoCursoEliminado = new ElementoCursoEliminado(docElementoCursoEliminado.data())

                // Eliminar el elemento del curso publicado por uid
                if (elementoCursoEliminado.tipo === 'unidad') {
                    const uidCurso = elementoCursoEliminado.datos.uidCurso
                    const uidUnidad = elementoCursoEliminado.datos.uidUnidad

                    // Documento
                    UnidadPublicado.eliminar(uidCurso, uidUnidad)
                    
                } else if (elementoCursoEliminado.tipo === 'clase') {
                    const uidCurso = elementoCursoEliminado.datos.uidCurso
                    const uidUnidad = elementoCursoEliminado.datos.uidUnidad
                    const uidClase = elementoCursoEliminado.datos.uidClase

                    // Documento
                    ClasePublicado.eliminar(uidCurso, uidUnidad, uidClase)

                } else if (elementoCursoEliminado.tipo === 'contenidoClase') {
                    const uidCurso = elementoCursoEliminado.datos.uidCurso
                    const uidClase = elementoCursoEliminado.datos.uidClase

                    // Contenido
                    let bucketNameContenidoPublicado = rutaModo === 'prod' ? 'prod-j-cursos-contenido' : 'dev-j-cursos-contenido'
                    const rutaPrefix = `${uidCurso}/${uidClase}/`
                    ContenidoClase.eliminarContenidoArchivo({
                        bucketName: bucketNameContenidoPublicado,
                        rutaPrefix: rutaPrefix,
                    })
                    
                    // Documento
                    ContenidoClase.eliminarDocumentoPublicado(uidCurso, uidClase)
                }

                // Eliminar de ElementosCursoEliminado
                ElementoCursoEliminado.eliminar(uidCursoEstadoPublicacion, elementoCursoEliminado.uid)
            }
        }

        const bucketNameFotoCurso = rutaModo === 'prod' ? 'prod-j-fotos-cursos' : 'dev-j-fotos-cursos'
        const bucket = admin.storage().bucket(bucketNameFotoCurso)
        
        // Foto curso
        const response1 = await bucket.getFiles({ prefix: `${uidCursoEstadoPublicacion}/fotoCurso/borrador-` })
        const files1 = response1[0]
        if (files1.length) {
            const file = files1[0]
            const array2 = file.name.split('.')
            const fileExtension = array2[array2.length-1]

            // Eliminar la foto publicada actual
            await admin.storage().bucket(bucketNameFotoCurso).deleteFiles({ prefix: `${uidCursoEstadoPublicacion}/fotoCurso/publicado-` })

            const data = await file.move(`${uidCursoEstadoPublicacion}/fotoCurso/publicado-${Date.now()}.${fileExtension}`)

            const destinationFile = data[0]
            const apiResponse = data[1]

            await CursoPublicado.actualizarCurso(uidCursoEstadoPublicacion, {
                fotoPerfil: destinationFile.publicUrl()
            })
            await CursoBorrador.actualizarCurso(uidCursoEstadoPublicacion, {
                fotoPerfil: destinationFile.publicUrl()
            })
        }

        // Foto portada
        const response2 = await bucket.getFiles({ prefix: `${uidCursoEstadoPublicacion}/fotoPortada/borrador-` })
        const files2 = response2[0]
        if (files2.length) {
            const file = files2[0]
            const array2 = file.name.split('.')
            const fileExtension = array2[array2.length-1]

            // Eliminar la foto publicada actual
            await admin.storage().bucket(bucketNameFotoCurso).deleteFiles({ prefix: `${uidCursoEstadoPublicacion}/fotoPortada/publicado-` })

            const data = await file.move(`${uidCursoEstadoPublicacion}/fotoPortada/publicado-${Date.now()}.${fileExtension}`)

            const destinationFile = data[0]
            const apiResponse = data[1]

            await CursoPublicado.actualizarCurso(uidCursoEstadoPublicacion, {
                fotoPortada: destinationFile.publicUrl()
            })
            await CursoBorrador.actualizarCurso(uidCursoEstadoPublicacion, {
                fotoPortada: destinationFile.publicUrl()
            })
        }

        CursoEstadoPublicacion.actualizarDocumento(uidCursoEstadoPublicacion, {
            estado: false,
            fechaPublicado: timestamp.milliseconds_a_timestamp(Date.now())
        })
        
    } catch (error) {
        console.log('Error al publicar un curso: ', error)
        console.log('Error al publicar un curso: ', JSON.stringify(error))
    }

})


module.exports = ff