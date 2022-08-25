const admin = require('./firebase-service')
const db = require("./db");
const ClasePublicado = require('./src/models/Cursos/clase/ClasePublicado');
const ProgresoClase = require('./src/models/ProgresoClase');
const Errores = require('./src/models/Error/Errores');
const decrementar = admin.firestore.FieldValue.increment(-1)

test2()

async function test1() {
    const uid = ''

    const auth = new Authentication(uid)
    const datosAuth = await auth.obtener()
    
    // Marcar como usuario eliminado
    db.collection('Usuarios').doc(uid).update({
        eliminado: true,
        datosAuth: {
            uid: datosAuth.uid,
            email: datosAuth.email,
            emailVerified: datosAuth.emailVerified,
            displayName: datosAuth.displayName,
            photoURL: datosAuth.photoURL,
            phoneNumber: datosAuth.phoneNumber,
            disabled: datosAuth.disabled,
            metadata: datosAuth.metadata,
            customClaims: datosAuth.customClaims,
            tokensValidAfterTime: datosAuth.tokensValidAfterTime,
            tenantId: datosAuth.tenantId,
            providerData: datosAuth.providerData,
        },
    })

    // Contador de usuarios
    const decrementar = admin.firestore.FieldValue.increment(-1)
    db.collection('Contadores').doc('usuarios').update({ 
        cantidad: decrementar 
    })

    const doc = await db.collection('Miembros').doc(uid).get()

    // Si es miembro:
    if (doc.exists) {
        const miembro = new Miembro(doc.data())

        // (Producto: Blog) Deshabilitar blogs del miembro
        if (miembro.funciones.includes('blogger')) {
            const snapshot = await db.collection('Blogs').where('publicador', '==', uid).get()
            for (const iterator of snapshot.docs) {
                const uidBlog = iterator.id
                const blog = new Blog(iterator.data())
                blog.mensajesDeshabilitacion.push('sin_publicador')

                db.collection('Blogs').doc(uidBlog).update({
                    habilitado: false,
                    mensajesDeshabilitacion: blog.mensajesDeshabilitacion,
                })
            }
        }

        // (Producto: Curso) Si SOLAMENTE es "responsable" -> deshabilitar y responsable = 'sin-responsable'
        if (miembro.funciones.includes('responsable')) {
            const snapshot = await db.collection('CursosPublicado').where('responsable', '==', uid).get()
            for (const iterator of snapshot.docs) {
                const uidCurso = iterator.id
                const cursoPublicado = new CursoPublicado(iterator.data())
                cursoPublicado.mensajesDeshabilitacion.push('sin_responsable')

                await db.collection('CursosPublicado').doc(uidCurso).update({
                    responsable: 'sin_responsable',
                    habilitado: false,
                    mensajesDeshabilitacion: cursoPublicado.mensajesDeshabilitacion,
                })
            }
        }
        
        // (Producto: Curso) Si es "instructor" -> deshabilitar
        if ( miembro.funciones.includes('instructor') ) {
            const snapshot = await db.collection('CursosPublicado').where('instructor', '==', uid).get()
            for (const iterator of snapshot.docs) {
                const uidCurso = iterator.id
                const cursoPublicado = new CursoPublicado(iterator.data())
                cursoPublicado.mensajesDeshabilitacion.push('sin_instructor')

                await db.collection('CursosPublicado').doc(uidCurso).update({
                    habilitado: false,
                    mensajesDeshabilitacion: cursoPublicado.mensajesDeshabilitacion,
                })
            }
        }

        // (Producto: Curso) Si SOLAMENTE es "auxiliar" -> quitar auxiliar
        if (miembro.funciones.includes('instructor-auxiliar')) {
            const snapshot = await db.collection('CursosPublicado').where('auxiliares', 'array-contains', uid).get()
            for (const iterator of snapshot.docs) {
                const uidCurso = iterator.id
                const cursoPublicado = new CursoPublicado(iterator.data())
                const index = cursoPublicado.auxiliares.findIndex(v => v === uid)
                cursoPublicado.auxiliares.slice(index, 1)

                await db.collection('CursosPublicado').doc(uidCurso).update({
                    auxiliares: cursoPublicado.auxiliares,
                })
            }
        }
    }
}

async function test2() {
    const uidClasePublicado = 'QV9DeGEXFeYUJOK7MJQR'
    
    const snapshot = await db
    .collectionGroup('ProgresosClases')
    .where('uidClase', '==', uidClasePublicado)
    .get()

    for (const docProgresoClase of snapshot.docs) {
        const refMiCurso = docProgresoClase.ref.parent.parent

        docProgresoClase.ref.delete()
        refMiCurso.update({ cantidadVisualizada: decrementar })
    }
}