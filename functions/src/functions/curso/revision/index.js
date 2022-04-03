const functions = require('firebase-functions')

const admin = require('../../../../firebase-service')
const db = require('../../../../db')

const CursoRevision = require('../../../models/Cursos/curso/CursoRevision')
const CursoBorrador = require('../../../models/Cursos/curso/CursoBorrador')
const CursoPublicado = require('../../../models/Cursos/curso/CursoPublicado')

const UnidadPublicado = require('../../../models/Cursos/unidad/UnidadPublicado')

const ClasePublicado = require('../../../models/Cursos/clase/ClasePublicado')


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

            // CLASES
            const snapshotClase = await docUnidad.ref.collection('ClasesBorrador').get()
            const docsClases = snapshotClase.docs

            for (let i = 0; i < docsClases.length; i++) {
                const docClase = docsClases[i]
                const dataClase = docClase.data()

                const clasePublicado = new ClasePublicado()
                clasePublicado.setClase( dataClase )

                
            }
        }

        // CONTENIDOS
        

    } else {
        // TODO: Filtrar las unidades, clases y contenidos que su estadoDocumento sea diferente de '' (vacio)

    }


})


module.exports = ff