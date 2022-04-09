const functions = require('firebase-functions')

const admin = require('../../../../firebase-service')
const db = require('../../../../db')
const timestamp = require('../../../utils/timestamp')

const CursoBorrador = require('../../../models/Cursos/curso/CursoBorrador')
const CursoPublicado = require('../../../models/Cursos/curso/CursoPublicado')

const UnidadBorrador = require('../../../models/Cursos/unidad/UnidadBorrador')
const UnidadPublicado = require('../../../models/Cursos/unidad/UnidadPublicado')

const ClaseBorrador = require('../../../models/Cursos/clase/ClaseBorrador')
const ClasePublicado = require('../../../models/Cursos/clase/ClasePublicado')

const ContenidoClaseBorrador = require('../../../models/Cursos/contenidoClase/ContenidoClaseBorrador')
const ContenidoClasePublicado = require('../../../models/Cursos/contenidoClase/ContenidoClasePublicado')

const CursoEstadoPublicacion = require('../../../models/Cursos/curso/CursoEstadoPublicacion')

const ff = {}


// SI SE ACTUALIZA UN DOCUMENTO CURSO, VERIFICAR SU VALIDEZ
ff.eventoPublicacionCurso = functions
.region('southamerica-east1')
.firestore.document('CursosEstadoPublicacion/{uidCursoEstadoPublicacion}')
.onWrite(async ( change, context ) => {
    const docNuevo = change.after
    const docViejo = change.before

    const { uidCursoEstadoPublicacion } = context.params

    if (docViejo.exists && !docNuevo.exists) return
    
    const CEPViejo = new CursoEstadoPublicacion(docViejo.data())
    const CEPNuevo = new CursoEstadoPublicacion(docNuevo.data())

    const esPublicacion = ( !docViejo.exists && docNuevo.exists && CEPNuevo.estado ) || ( docViejo.exists && docNuevo.exists && CEPViejo.estado === false && CEPNuevo.estado === true )
    if ( !esPublicacion ) return

    const cursoBorrador = new CursoBorrador()
    await cursoBorrador.importarDatosDeUnCurso(uidCursoEstadoPublicacion)

    if (cursoBorrador.estadoDocumento === 'nuevo') {
        // "Si el curso borrador es nuevo, las unidades y clases tambien lo seran"
        // TODO: Agregar el curso, las unidades, las clases y sus contenidos.

        // CURSO
        const cursoPublicado = new CursoPublicado()
        cursoPublicado.setCurso( cursoBorrador.getCurso() )

        await CursoPublicado.crearCurso(cursoPublicado)
        // CursoBorrador.actualizarCurso(uidCursoEstadoPublicacion, {
        //     estadoDocumento: ''
        // })

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
            // UnidadBorrador.actualizar(uidCursoEstadoPublicacion, unidadPublicado.uid, {
            //     estadoDocumento: ''
            // })

            // CLASES
            const snapshotClase = await docUnidad.ref.collection('ClasesBorrador').get()
            const docsClases = snapshotClase.docs

            for (let j = 0; j < docsClases.length; j++) {
                const docClase = docsClases[j]
                const dataClase = docClase.data()

                const clasePublicado = new ClasePublicado()
                clasePublicado.setClase( dataClase )

                await ClasePublicado.agregar(uidCursoEstadoPublicacion, unidadPublicado.uid, clasePublicado)
                // ClaseBorrador.actualizar(uidCursoEstadoPublicacion, unidadPublicado.uid, clasePublicado.uid, {
                //     estadoDocumento: ''
                // })
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
            ContenidoClasePublicado.actualizarContenidoDesdeBorrador(uidCursoEstadoPublicacion, contenidoClasePublicado.uid)

            // Documento
            await ContenidoClasePublicado.agregarDocumento(uidCursoEstadoPublicacion, contenidoClasePublicado)
            // ContenidoClaseBorrador.actualizarDocumento(uidCursoEstadoPublicacion, contenidoClasePublicado.uid, {
            //     estadoDocumento: ''
            // })
        }

    } else {
        // TODO: Filtrar las unidades, clases y contenidos que su estadoDocumento sea diferente de '' (vacio)
        if (cursoBorrador.estadoDocumento === 'actualizado') {
            
        }

        let ref = db.collection('CursosBorrador').doc(uidCursoEstadoPublicacion)
        const snapshotUnidades = await ref.collection('UnidadesBorrador').get()
        const docsUnidades = snapshotUnidades.docs

        for (let i = 0; i < docsUnidades.length; i++) {
            const docUnidad = docsUnidades[i]
            const unidadBorrador = new UnidadBorrador(docUnidad.data())

            if (unidadBorrador.estadoDocumento === 'nuevo') {
                
            }

            if (unidadBorrador.estadoDocumento === 'actualizado') {
                
            }

            const snapshotClase = await docUnidad.ref.collection('ClasesBorrador').get()
            const docsClases = snapshotClase.docs

            for (let j = 0; j < docsClases.length; j++) {
                const docClase = docsClases[j]
                const claseBorrador = new ClaseBorrador(docClase.data())

                if (claseBorrador.estadoDocumento === 'nuevo') {
                
                }
    
                if (claseBorrador.estadoDocumento === 'actualizado') {
                    
                }

                if (claseBorrador.estadoDocumento === 'cambioUnidad') {
                    
                }
            }
        }

        const snapshotContenidoClase = await db
        .collection('CursosBorrador').doc(uidCursoEstadoPublicacion)
        .collection('ContenidoClasesBorrador').get()

        const docsContenidoClases = snapshotContenidoClase.docs

        for (let i = 0; i < docsContenidoClases.length; i++) {
            const docContenidoClase = docsContenidoClases[i]
            const contenidoClaseBorrador = new ContenidoClaseBorrador(docContenidoClase.data())
            
            if (contenidoClaseBorrador.estadoDocumento === 'actualizado') {
                
            }
        }

        
        // Documentos eliminados en referencia de los documentos de CursoPublicado
        
    }

    // CursoEstadoPublicacion.actualizarDocumento(uidCursoEstadoPublicacion, {
    //     estado: false,
    //     fechaPublicado: timestamp.milliseconds_a_timestamp(Date.now())
    // })

})


module.exports = ff