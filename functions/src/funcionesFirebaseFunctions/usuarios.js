const functions = require('firebase-functions')
const admin = require('../../firebase-service')
const db = require('../../db')
const Usuario = require('../models/Usuarios/Usuario')
const Miembro = require('../models/Usuarios/TiposUsuarios/Miembro')
const InformacionUsuario = require('../models/Usuarios/InformacionUsuario')
const Roles = require('../models/Usuarios/helpers/Roles')
const Authentication = require('../models/Usuarios/Authentication')
const ffUsuarios = {}









ffUsuarios.eventoCreacionUsuario = functions
.region('southamerica-east1')
.firestore.document('Usuarios/{uid}')
.onCreate(async ( change, context ) => {
    const document = change
    const { uid } = context.params

    const usuario = new Usuario(document.data())
    
    // Datos Información del usuario
    const informacionUsuario = new InformacionUsuario({ uid })
    InformacionUsuario.crear(informacionUsuario)

    // Datos Miembro 
    const rol = new Roles(usuario.rol)
    const docRol = await rol.obtenerDocumentoRol()

    if ( docRol.data().esMiembro ) {
        const miembro = new Miembro({ uid })
        Miembro.crearMiembro( miembro )
    }

    // Contador de usuarios
    const incrementar = admin.firestore.FieldValue.increment(1)
    db.collection('Contadores').doc('usuarios').update({ cantidad: incrementar })
    
})









ffUsuarios.eventoActualizacionUsuario = functions
.region('southamerica-east1')
.firestore.document('Usuarios/{uid}')
.onUpdate(async ( change, context ) => {
    const docNuevo = change.after
    const docViejo = change.before
    const { uid } = context.params
    
    const usuarioNuevo = new Usuario(docNuevo.data())
    const usuarioViejo = new Usuario(docViejo.data())

    // Datos Miembro
    const rol = new Roles(usuarioNuevo.rol)
    const docRol = await rol.obtenerDocumentoRol()

    if ( docRol.data().esMiembro ) {
        // Verificar si existe documento
        const miembro = new Miembro()
        const existe = await miembro.importarDatosMiembro( uid )

        // Si no existe, crear
        if (!existe) {
            miembro.setUID( uid )
            Miembro.crearMiembro( miembro )
        }
    }
})








ffUsuarios.eventoEliminacionUsuario = functions
.region('southamerica-east1')
.firestore.document('Usuarios/{uid}')
.onDelete(async ( change, context ) => {
    const document = change
    const { uid } = context.params

    // Datos Información del usuario
    InformacionUsuario.eliminar( uid )

    // Datos Me gusta Blog
    const snapshotsBlogsMG = await db
        .collection('Usuarios').doc(uid)
        .collection('BlogsMG').get()

    for (let i = 0; i < snapshotsBlogsMG.docs.length; i++) {
        const doc = snapshotsBlogsMG.docs[i]
        await doc.ref.delete()
    }

    // Datos Miembro
    const miembro = new Miembro()
    const existe = await miembro.importarDatosMiembro( uid )

    if ( existe ) {
        Miembro.eliminarMiembro( uid )

        // Datos Blogs
        const snapshotsBlogs = await db
        .collection('Blogs').where('publicador', '==', uid).get()
            
        for (let i = 0; i < snapshotsBlogs.docs.length; i++) {
            const doc = snapshotsBlogs.docs[i]
            await doc.ref.delete()
        }
        
        // Datos Cursos Borrador/Publicado

    }

    // Contador de usuarios
    const decrementar = admin.firestore.FieldValue.increment(-1)
    db.collection('Contadores').doc('usuarios').update({ cantidad: decrementar })
})









ffUsuarios.comienzoProcesoEliminacion = functions
.region('southamerica-east1')
.firestore.document('SolicitudesEliminacion/{uid}')
.onCreate(async ( change, context ) => {
    
    // // Crear NODE-CRON

    //     // Si existe en SolicitudesEliminacion eliminar usuario
    //     const doc = await db.collection('SolicitudesEliminacion').doc(change.id).get()
    //     if (!doc.exists) return

    //     // Eliminar usuario
    //     const auth = new Authentication( change.id )
    //     await auth.eliminarUsuario()
    //     await Usuario.eliminarUsuarioPorUID( change.id )
    
})






ffUsuarios.cancelarProcesoEliminacion = functions
.region('southamerica-east1')
.firestore.document('SolicitudesEliminacion/{uid}')
.onDelete(async ( change, context ) => {
    
    // Cancelar NODE-CRON
    change.id
    
})


module.exports = ffUsuarios