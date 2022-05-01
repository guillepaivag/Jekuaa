const functions = require('firebase-functions')
const admin = require('../../firebase-service')
const db = require('../../db')
const config = require('../../config')
const Usuario = require('../models/Usuarios/Usuario')
const Miembro = require('../models/Usuarios/TiposUsuarios/Miembro')
const InformacionUsuario = require('../models/Usuarios/InformacionUsuario')
const Roles = require('../models/Usuarios/helpers/Roles')
const Authentication = require('../models/Usuarios/Authentication')
const Moderador = require('../models/Usuarios/TiposUsuarios/Moderador')


const ffUsuarios = {}
const rutaModo = config.environment.mode === 'production' ? 'prod' : 'dev'
const bucketNameFotoPerfilVerificacion = rutaModo === 'prod' ? 'prod-j-fotos-perfiles-v' : 'dev-j-fotos-perfiles-v'
const bucketNameFotoPerfil = rutaModo === 'prod' ? 'prod-j-fotos-perfiles' : 'dev-j-fotos-perfiles'









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

    if ( docRol.data().esModerador ) {
        const moderador = new Moderador({ uid })
        Moderador.crearModerador( moderador )
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

    if ( docRol.data().esModerador ) {
        // Verificar si existe documento
        const moderador = new Moderador()
        const existe = await moderador.importarDatosModerador( uid )

        // Si no existe, crear
        if (!existe) {
            moderador.setUID( uid )
            Moderador.crearModerador( moderador )
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
        doc.ref.delete()
    }

    // Datos Miembro
    const miembro = new Miembro()
    const existeMiembro = await miembro.importarDatosMiembro( uid )
    if ( existeMiembro ) Miembro.eliminarMiembro( uid )

    // Datos Moderador
    const moderador = new Moderador()
    const existeModerador = await moderador.importarDatosModerador( uid )
    if ( existeModerador ) Moderador.eliminarModerador( uid )
    
    // Datos Blogs
    const snapshotsBlogs = await db
    .collection('Blogs').where('publicador', '==', uid).get()
        
    for (let i = 0; i < snapshotsBlogs.docs.length; i++) {
        const doc = snapshotsBlogs.docs[i]
        doc.ref.delete()
    }

    // Datos Cursos Borrador/Publicado


    // Contador de usuarios
    const decrementar = admin.firestore.FieldValue.increment(-1)
    db.collection('Contadores').doc('usuarios').update({ cantidad: decrementar })
})









// uidUsuario/nombreArchivo.extension
ffUsuarios.actualizacionFotoPerfilDeUsuario = functions
.region('southamerica-east1')
.storage
.bucket(bucketNameFotoPerfilVerificacion)
.object().onFinalize(async (object, context) => {
    console.log('object', JSON.stringify(object))
    console.log('context', JSON.stringify(context))

    try {
        console.log('object.name', object.name)

        const array2 = object.name.split('/')
        const uidUsuario = array2[0]
        console.log('array2', array2)
        console.log('uidUsuario', uidUsuario)

        const array1 = object.name.split('.')
        const fileExtension = array1[array1.length-1]
        console.log('array1', array1)
        console.log('fileExtension', fileExtension)

        const auth = new Authentication(uidUsuario)

        
        // png | jpg | jpeg
        if (fileExtension !== 'png' && fileExtension !== 'jpg' && fileExtension !== 'jpeg') {
            throw new Error('Extensión incorrecta.')
        }
        

        // // 5mb
        // const size = Number(object.size)


        // if (size > 5) 
        //     throw new Error('La foto de perfil solo puede pesar hasta 5MB.')

        
        // Eliminar la foto publicada
        const userRecord = await auth.existeUsuario()
        if (!userRecord) throw new Error('No existe este usuario.')
        if (userRecord.photoURL) await auth.eliminarFotoPerfil()

        // Publicar la foto verificada
        await auth.aceptarFotoEnVerificacion({
            bucketOrigin: rutaModo === 'prod' ? 'prod-j-fotos-perfiles-v' : 'dev-j-fotos-perfiles-v',
            bucketDestination: rutaModo === 'prod' ? 'prod-j-fotos-perfiles' : 'dev-j-fotos-perfiles',
            rutaOrigin: object.name,
            rutaDestination: `${uidUsuario}.${fileExtension}`
        })

    } catch (error) {
        console.log('Error al actualizar una foto de perfil: ', error)

        // Eliminar foto de perfil en verificacion
        const fileV = admin.storage().bucket(bucketNameFotoPerfilVerificacion).file( object.name )
        fileV.delete()

        const file = admin.storage().bucket(bucketNameFotoPerfil).file( object.name )
        file.delete()
    }
    
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