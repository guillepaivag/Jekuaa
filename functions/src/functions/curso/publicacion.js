const functions = require('firebase-functions')

const admin = require('../../../firebase-service')
const db = require('../../../db')
const timestamp = require('../../utils/timestamp')

const CursoBorrador = require('../../models/Cursos/curso/CursoBorrador')
const CursoPublicado = require('../../models/Cursos/curso/CursoPublicado')

const UnidadBorrador = require('../../models/Cursos/unidad/UnidadBorrador')
const UnidadPublicado = require('../../models/Cursos/unidad/UnidadPublicado')

const ClaseBorrador = require('../../models/Cursos/clase/ClaseBorrador')
const ClasePublicado = require('../../models/Cursos/clase/ClasePublicado')

const ContenidoClaseBorrador = require('../../models/Cursos/contenidoClase/ContenidoClaseBorrador')
const ContenidoClasePublicado = require('../../models/Cursos/contenidoClase/ContenidoClasePublicado')

const CursoEstadoPublicacion = require('../../models/Cursos/curso/CursoEstadoPublicacion')
const ElementoCursoEliminado = require('../../models/Cursos/curso/ElementoCursoEliminado')

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

                const contenidoClasePublicado = new ContenidoClasePublicado()
                contenidoClasePublicado.setContenidoClase(dataContenidoClase)

                // Contenido
                await ContenidoClasePublicado.copiarContenidoDeBorrador({
                    uidCurso: uidCursoEstadoPublicacion,
                    uidClase: contenidoClasePublicado.uid
                })

                // Documento
                await ContenidoClasePublicado.agregarDocumento(uidCursoEstadoPublicacion, contenidoClasePublicado)
                ContenidoClaseBorrador.actualizarDocumento(uidCursoEstadoPublicacion, contenidoClasePublicado.uid, {
                    estadoDocumento: ''
                })
            }

        } else {
            // TODO: Filtrar las unidades, clases y contenidos que su estadoDocumento sea diferente de '' (vacio)
            if (cursoBorrador.estadoDocumento === 'actualizado') {
                CursoPublicado.actualizarCurso(uidCursoEstadoPublicacion, cursoBorrador.getCurso())
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

                    await UnidadPublicado.agregar(uidCursoEstadoPublicacion, unidadPublicado)
                    UnidadBorrador.actualizar(uidCursoEstadoPublicacion, unidadBorrador.uid, {
                        estadoDocumento: ''
                    })
                }

                if (unidadBorrador.estadoDocumento === 'actualizado') {
                    UnidadPublicado.actualizar(uidCursoEstadoPublicacion, unidadBorrador.uid, unidadBorrador.getUnidad())
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
        
                        await ClasePublicado.agregar(uidCursoEstadoPublicacion, unidadBorrador.uid, clasePublicado)
                        ClaseBorrador.actualizar(uidCursoEstadoPublicacion, unidadBorrador.uid, claseBorrador.uid, {
                            estadoDocumento: ''
                        })
                    }
        
                    if (claseBorrador.estadoDocumento === 'actualizado') {
                        ClasePublicado.actualizar(uidCursoEstadoPublicacion, unidadBorrador.uid, claseBorrador.uid, claseBorrador.getClase())
                        ClaseBorrador.actualizar(uidCursoEstadoPublicacion, unidadBorrador.uid, claseBorrador.uid, {
                            estadoDocumento: ''
                        })
                    }

                    if ( claseBorrador.estadoDocumento.includes('cambioUnidad') ) {
                        const array = claseBorrador.estadoDocumento.split('/')
                        const uidUnidadVieja = array[1]
                        const uidUnidadNueva = array[2]

                        // Agregar clase a la nueva unidad
                        const clasePublicado = new ClasePublicado( claseBorrador.getClase() )
                        ClasePublicado.agregar(uidCursoEstadoPublicacion, uidUnidadNueva, clasePublicado)

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
                const contenidoClaseBorrador = new ContenidoClaseBorrador(docContenidoClase.data())

                if (contenidoClaseBorrador.estadoDocumento === 'nuevo') {
                    const contenidoClasePublicado = new ContenidoClasePublicado(docContenidoClase.data())

                    // Contenido
                    await ContenidoClasePublicado.copiarContenidoDeBorrador({
                        uidCurso: uidCursoEstadoPublicacion,
                        uidClase: contenidoClasePublicado.uid
                    })

                    // Documento
                    await ContenidoClasePublicado.agregarDocumento(uidCursoEstadoPublicacion, contenidoClasePublicado)
                    ContenidoClaseBorrador.actualizarDocumento(uidCursoEstadoPublicacion, contenidoClasePublicado.uid, {
                        estadoDocumento: ''
                    })
                }
                
                if (contenidoClaseBorrador.estadoDocumento === 'actualizado') {
                    // Contenido
                    const contenidoClasePublicado = new ContenidoClasePublicado()
                    await contenidoClasePublicado.importarContenidoClasePorUID(uidCursoEstadoPublicacion, contenidoClaseBorrador.uid)

                    await ContenidoClasePublicado.eliminarContenidoPrefix({
                        rutaContenidoPrefix: `${uidCursoEstadoPublicacion}/${contenidoClaseBorrador.uid}/${contenidoClasePublicado.fileName}`
                    })
                    ContenidoClasePublicado.copiarContenidoDeBorrador({
                        uidCurso: uidCursoEstadoPublicacion,
                        uidClase: contenidoClaseBorrador.uid
                    })

                    // Documento
                    ContenidoClasePublicado.actualizarDocumento(uidCursoEstadoPublicacion, contenidoClaseBorrador.uid, contenidoClaseBorrador.getContenidoClase())
                    ContenidoClaseBorrador.actualizarDocumento(uidCursoEstadoPublicacion, contenidoClaseBorrador.uid, {
                        estadoDocumento: ''
                    })
                }

                if (contenidoClaseBorrador.estadoDocumento) {
                    // Eliminar los archivos del curso-borrador
                    const rutaArchivo = `${uidCursoEstadoPublicacion}/${contenidoClaseBorrador.uid}/${contenidoClaseBorrador.fileName}`
                    
                    ContenidoClaseBorrador.eliminarContenidoPrefix({
                        verificacion: false,
                        rutaContenidoPrefix: rutaArchivo
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

                    const contenidoClasePublicado = new ContenidoClasePublicado()
                    await contenidoClasePublicado.importarContenidoClasePorUID(uidCurso, uidClase)

                    // Contenido
                    ContenidoClasePublicado.eliminarContenidoPrefix({
                        rutaContenidoPrefix: `${uidCurso}/${uidClase}/${contenidoClasePublicado.fileName}`
                    })
                    
                    // Documento
                    ContenidoClasePublicado.eliminarDocumento(uidCurso, uidClase)
                }

                // Eliminar de ElementosCursoEliminado
                ElementoCursoEliminado.eliminar(uidCursoEstadoPublicacion, elementoCursoEliminado.uid)
            }
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