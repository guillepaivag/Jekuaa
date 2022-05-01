const admin = require('../../../../firebase-service')
const functions = require('firebase-functions')
const CursoPublicado = require('../../../models/Cursos/curso/CursoPublicado')
const Miembro = require('../../../models/Usuarios/TiposUsuarios/Miembro')

const ff = {}

const incrementar = admin.firestore.FieldValue.increment(1)
const decrementar = admin.firestore.FieldValue.increment(-1)

ff.creacionCursoPublicado = functions
.region('southamerica-east1')
.firestore.document('CursosPublicado/{uidCursoPublicado}')
.onCreate(async ( change, context ) => {
    const doc = change

    const { uidCursoPublicado } = context.params
    
    const cursoPublicado = new CursoPublicado( doc.data() )

    if ( cursoPublicado.publicado && !cursoPublicado.deshabilitado ) {
        // Cantidad total de cursos
        db.collection('Contadores').doc('cursos').update({ cantidad: incrementar })

        // Cantidad de cursos por miembro
        Miembro.actualizarMiembro(cursoPublicado.responsable, {
            cantidadCursos: incrementar
        })
    }

})




ff.actualizacionCursoPublicado = functions
.region('southamerica-east1')
.firestore.document('CursosPublicado/{uidCursoPublicado}')
.onUpdate(async ( change, context ) => {
    const docNuevo = change.after
    const docViejo = change.before

    const { uidCursoPublicado } = context.params
    
    const cursoPublicadoNuevo = new CursoPublicado( docNuevo.data() )
    const cursoPublicadoViejo = new CursoPublicado( docViejo.data() )

    const nuevoEsPublicado = cursoPublicadoNuevo.publicado && !cursoPublicadoNuevo.deshabilitado
    const viejoEsPublicado = cursoPublicadoViejo.publicado && !cursoPublicadoViejo.deshabilitado
    
    if (viejoEsPublicado && !nuevoEsPublicado) {
        // Cantidad total de cursos
        db.collection('Contadores').doc('cursos').update({ cantidad: decrementar })

        // Cantidad de cursos por miembro
        Miembro.actualizarMiembro(cursoPublicadoNuevo.responsable, {
            cantidadCursos: decrementar
        })
    }

    if (!viejoEsPublicado && nuevoEsPublicado) {
        // Cantidad total de cursos
        db.collection('Contadores').doc('cursos').update({ cantidad: incrementar })

        // Cantidad de cursos por miembro
        Miembro.actualizarMiembro(cursoPublicadoNuevo.responsable, {
            cantidadCursos: incrementar
        })
    }
})




ff.eliminacionCursoPublicado = functions
.region('southamerica-east1')
.firestore.document('CursosPublicado/{uidCursoPublicado}')
.onDelete(async ( change, context ) => {
    const doc = change

    const { uidCursoPublicado } = context.params
    
    const cursoPublicado = new CursoPublicado( doc.data() )

    // Cantidad total de cursos
    db.collection('Contadores').doc('cursos').update({ cantidad: decrementar })
    
    // Cantidad de cursos por miembro
    Miembro.actualizarMiembro(cursoPublicado.responsable, {
        cantidadCursos: decrementar
    })
    
})


module.exports = ff