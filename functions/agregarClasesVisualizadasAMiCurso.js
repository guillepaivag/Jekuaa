const db = require("./db");

async function run () {
    const snapshotMiCurso = await db.collectionGroup('MisCursos').get()

    for (const docMiCurso of snapshotMiCurso.docs) {
        if ( docMiCurso.data().cantidadVisualizada > 0) {
            const snapshotProgresoClase = await docMiCurso.ref.collection('ProgresosClases').get()
        
            const clasesVisualizadas = snapshotProgresoClase.docs.map(docProgresoClase => {
                if (docProgresoClase.data().visualizado) return docProgresoClase.id
                return null
            })

            console.log('\n-------------------------------\n')
            console.log('Usuario', docMiCurso.ref.parent.parent.id)
            console.log('Curso', docMiCurso.ref.id)
            console.log('clasesVisualizadas', clasesVisualizadas)
            console.log('\n-------------------------------\n')

            docMiCurso.ref.update({ clasesVisualizadas })
        }
        
        else if (docMiCurso.data().cantidadVisualizada === 0) {
            docMiCurso.ref.update({ clasesVisualizadas: [] })
        }
    }
}