const admin = require('../../../../firebase-service')
const functions = require('firebase-functions')
const CursoPublicado = require('../../../models/Cursos/curso/CursoPublicado')
const Miembro = require('../../../models/Usuarios/TiposUsuarios/Miembro')
const db = require('../../../../db')

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

    if ( cursoPublicado.publicado && cursoPublicado.habilitado ) {
        // Cantidad total de cursos
        db.collection('Contadores').doc('cursos').update({ cantidad: incrementar })

        // Cantidad de cursos por miembro
        Miembro.actualizarMiembro(cursoPublicado.instructor, {
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

    const nuevoEsPublicado = cursoPublicadoNuevo.publicado && cursoPublicadoNuevo.habilitado
    const viejoEsPublicado = cursoPublicadoViejo.publicado && cursoPublicadoViejo.habilitado
    
    if (viejoEsPublicado && !nuevoEsPublicado) {
        // Cantidad total de cursos
        db.collection('Contadores').doc('cursos').update({ cantidad: decrementar })

        // Cantidad de cursos por miembro
        Miembro.actualizarMiembro(cursoPublicadoNuevo.instructor, {
            cantidadCursos: decrementar
        })
    }

    if (!viejoEsPublicado && nuevoEsPublicado) {
        // Cantidad total de cursos
        db.collection('Contadores').doc('cursos').update({ cantidad: incrementar })

        // Cantidad de cursos por miembro
        Miembro.actualizarMiembro(cursoPublicadoNuevo.instructor, {
            cantidadCursos: incrementar
        })
    }
})



ff.meGustaCurso = functions
.region('southamerica-east1')
.firestore.document('Usuarios/{uidUsuario}/CursosMG/{uidCurso}')
.onWrite(async ( change, context ) => {
    const { before, after } = change
    const { uidUsuario, uidCurso } = context.params

    const ref = db.collection('CursosPublicado').doc(uidCurso)

    if (!before.exists && after.exists) 
        ref.update({ cantidadMeGusta: incrementar })
    else if (before.exists && !after.exists)
        ref.update({ cantidadMeGusta: decrementar })
    else 
        console.log('Sin cambios.')
})



module.exports = ff