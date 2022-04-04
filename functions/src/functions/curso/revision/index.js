const functions = require('firebase-functions')

const admin = require('../../../../firebase-service')
const db = require('../../../../db')

const CursoBorrador = require('../../../models/Cursos/curso/CursoBorrador')
const CursoRevision = require('../../../models/Cursos/curso/CursoRevision')
const CursoPublicado = require('../../../models/Cursos/curso/CursoPublicado')

const UnidadBorrador = require('../../../models/Cursos/unidad/UnidadBorrador')
const UnidadPublicado = require('../../../models/Cursos/unidad/UnidadPublicado')

const ClaseBorrador = require('../../../models/Cursos/clase/ClaseBorrador')
const ClasePublicado = require('../../../models/Cursos/clase/ClasePublicado')

const ContenidoClaseBorrador = require('../../../models/Cursos/contenidoClase/ContenidoClaseBorrador')
const ContenidoClasePublicado = require('../../../models/Cursos/contenidoClase/ContenidoClasePublicado')


const ff = {}

// SI SE ACTUALIZA UN DOCUMENTO CURSO, VERIFICAR SU VALIDEZ
ff.eventoActualizacionCursoRevision = functions
.region('southamerica-east1')
.firestore.document('CursosRevision/{uidCursoRevision}')
.onUpdate(async ( change, context ) => {
    const docNuevo = change.after
    const docViejo = change.before

    const { uidCursoRevision } = context.params
    
    const revisionViejo = new CursoRevision(docViejo.data())
    const revisionNuevo = new CursoRevision(docNuevo.data())

    let esPublicacion = revisionViejo.estadoModeracion.estado === 'revision' && revisionNuevo.estadoModeracion.estado === 'aceptado'
    if ( !esPublicacion ) return

    const cursoBorrador = new CursoBorrador()
    await cursoBorrador.importarDatosDeUnCurso(uidCursoRevision)
    const datosCursoBorrador = cursoBorrador.getCurso()

    if (cursoBorrador.estadoDocumento === 'nuevo') {
        // "Si el curso borrador es nuevo, las unidades y clases tambien lo seran"
        // TODO: Agregar el curso, las unidades, las clases y sus contenidos.

        // CURSO
        const cursoPublicado = new CursoPublicado()
        cursoPublicado.setCurso( datosCursoBorrador )

        await CursoPublicado.crearCurso(cursoPublicado)
        // CursoBorrador.actualizarCurso(uidCursoRevision, {
        //     estadoDocumento: ''
        // })

        // UNIDADES
        const snapshotUnidad = await db
        .collection('CursosBorrador').doc(uidCursoRevision)
        .collection('UnidadesBorrador').get()

        const docsUnidades = snapshotUnidad.docs

        for (let i = 0; i < docsUnidades.length; i++) {
            const docUnidad = docsUnidades[i]
            const dataUnidad = docUnidad.data()

            const unidadPublicado = new UnidadPublicado()
            unidadPublicado.setUnidad( dataUnidad )

            await UnidadPublicado.agregar(uidCursoRevision, unidadPublicado)
            // UnidadBorrador.actualizar(uidCursoRevision, unidadPublicado.uid, {
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

                await ClasePublicado.agregar(uidCursoRevision, unidadPublicado.uid, clasePublicado)
                // ClaseBorrador.actualizar(uidCursoRevision, unidadPublicado.uid, clasePublicado.uid, {
                //     estadoDocumento: ''
                // })
            }
        }

        // CONTENIDOS
        const snapshotContenidoClase = await db
        .collection('CursosBorrador').doc(uidCursoRevision)
        .collection('ContenidoClasesBorrador').get()

        const docsContenidoClases = snapshotContenidoClase.docs

        for (let i = 0; i < docsContenidoClases.length; i++) {
            const docContenidoClase = docsContenidoClases[i]
            const dataContenidoClase = docContenidoClase.data()

            const contenidoClasePublicado = new ContenidoClasePublicado()
            contenidoClasePublicado.setContenidoClase(dataContenidoClase)

            // Contenido
            

            // Documento
            await ContenidoClasePublicado.agregarDocumento(uidCursoRevision, contenidoClasePublicado)
            // ContenidoClaseBorrador.actualizarDocumento(uidCursoRevision, contenidoClasePublicado.uid, {
            //     estadoDocumento: ''
            // })
        }

    } else {
        // TODO: Filtrar las unidades, clases y contenidos que su estadoDocumento sea diferente de '' (vacio)

    }


})


module.exports = ff