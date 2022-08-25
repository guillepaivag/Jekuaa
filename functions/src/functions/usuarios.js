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
const sendEmailVerification = require('../services/sendEmailVerification.service')
const CursoPublicado = require('../models/Cursos/curso/CursoPublicado')
const Blog = require('../models/Blogs/Blog')
const CursoBorrador = require('../models/Cursos/curso/CursoBorrador')


const ff = {}
const rutaModo = config.environment.mode === 'production' ? 'prod' : 'dev'
const bucketNameFotoPerfil = rutaModo === 'prod' ? 'prod-j-fotos-perfiles' : 'dev-j-fotos-perfiles'





ff.eventoCreacionUsuario = functions
.region('southamerica-east1')
.auth
.user()
.onCreate(async (user) => {
    console.log('\n--------------\n')
    console.log('USUARIO: ', JSON.stringify(user))
    console.log('\n--------------\n')

    if (user.providerData[0].providerId === 'google.com' || user.providerData[0].providerId === 'facebook.com') {
        // Crear documento de usuario en la colección de 'Usuarios'
        const nombreUsuario = user.email.split('@')[0] + new Date(user.metadata.creationTime).getTime()

        const auth = new Authentication(user.uid)
        const usuario = new Usuario({
            uid: user.uid, 
            nombreUsuario: nombreUsuario, 
            correo: user.email, 
            fechaNacimiento: null, 
            plan: 'gratis', 
            rol: 'estudiante', 
            point: 0,
        })
        
        await auth.actualizarCustomUserClaims({
            rol: usuario.rol, 
            plan: usuario.plan
        })

        usuario.setUID(user.uid)
        await Usuario.crearUsuario(usuario)
    }

    // Datos Información del usuario
    const informacionUsuario = new InformacionUsuario({ uid: user.uid })
    InformacionUsuario.crear(informacionUsuario)

    // Contador de usuarios
    const incrementar = admin.firestore.FieldValue.increment(1)
    db.collection('Contadores').doc('usuarios').update({ cantidad: incrementar })

    // Enviar correo de verificación
    if (!user.emailVerified) await sendEmailVerification( user.email )

    return true
})






ff.eventoActualizacionUsuario = functions
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








ff.eventoEliminacionUsuario = functions
.region('southamerica-east1')
.auth
.user()
.onDelete(async (user) => {
    const uid = user.uid
    
    // Marcar como usuario eliminado
    db.collection('Usuarios').doc(uid).update({
        eliminado: true,
        datosAuth: {
            uid: user.uid,
            email: user.email,
            emailVerified: user.emailVerified,
            displayName: user.displayName,
            photoURL: user.photoURL,
            phoneNumber: user.phoneNumber,
            disabled: user.disabled,
            metadata: user.metadata,
            customClaims: user.customClaims,
            tokensValidAfterTime: user.tokensValidAfterTime,
            tenantId: user.tenantId,
            providerData: user.providerData,
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

        // (Producto: Blog) Deshabilitar blogs del miembro
        const snapshot0 = await db.collection('Blogs').where('publicador', '==', uid).get()
        for (const iterator of snapshot0.docs) {
            const uidBlog = iterator.id
            const blog = new Blog(iterator.data())
            if ( !blog.mensajesDeshabilitacion.includes('sin_publicador') ) {
                blog.mensajesDeshabilitacion.push('sin_publicador')
            }

            db.collection('Blogs').doc(uidBlog).update({
                habilitado: false,
                mensajesDeshabilitacion: blog.mensajesDeshabilitacion,
            })
        }

        // (Producto: Curso) Si SOLAMENTE es "responsable" -> deshabilitar y responsable = 'sin-responsable'
        const snapshot1 = await db.collection('CursosBorrador').where('responsable', '==', uid).get()
        for (const iterator of snapshot1.docs) {
            const uidCurso = iterator.id
            
            const cursoBorrador = new CursoBorrador(iterator.data())
            await CursoBorrador.actualizarCurso(uidCurso, {
                responsable: '',
            })

            if (cursoBorrador.estadoDocumento !== 'nuevo') {
                const cursoPublicado = await CursoPublicado.obtenerCurso(uidCurso)
                if ( !cursoPublicado.mensajesDeshabilitacion.includes('sin_responsable') ) {
                    cursoPublicado.mensajesDeshabilitacion.push('sin_responsable')
                }

                await db.collection('CursosPublicado').doc(uidCurso).update({
                    responsable: '',
                    habilitado: false,
                    mensajesDeshabilitacion: cursoPublicado.mensajesDeshabilitacion,
                })
            }
        }
        
        // (Producto: Curso) Si es "instructor" -> deshabilitar
        const snapshot2 = await db.collection('CursosBorrador').where('instructor', '==', uid).get()
        for (const iterator of snapshot2.docs) {
            const uidCurso = iterator.id

            const cursoBorrador = new CursoBorrador(iterator.data())
            await CursoBorrador.agregarCursoBorrador(uidCurso, {
                responsable: '',
                auxiliares: [],
            })

            if (cursoBorrador.estadoDocumento !== 'nuevo') {
                const cursoPublicado = await CursoPublicado.obtenerCurso(uidCurso)
                if ( !cursoPublicado.mensajesDeshabilitacion.includes('sin_instructor') ) {
                    cursoPublicado.mensajesDeshabilitacion.push('sin_instructor')
                }

                await db.collection('CursosPublicado').doc(uidCurso).update({
                    responsable: '',
                    auxiliares: [],
                    habilitado: false,
                    mensajesDeshabilitacion: cursoPublicado.mensajesDeshabilitacion,
                })
            }

        }

        // (Producto: Curso) Si SOLAMENTE es "auxiliar" -> quitar auxiliar
        const snapshot3 = await db.collection('CursosBorrador').where('auxiliares', 'array-contains', uid).get()
        for (const iterator of snapshot3.docs) {
            const uidCurso = iterator.id

            const cursoBorrador = new CursoBorrador(iterator.data())
            const index = cursoBorrador.auxiliares.findIndex(v => v === uid)
            cursoBorrador.auxiliares.slice(index, 1)

            await CursoBorrador.actualizarCurso(uidCurso, {
                auxiliares: cursoBorrador.auxiliares,
            })

            if (cursoBorrador.estadoDocumento !== 'nuevo') {
                await CursoPublicado.actualizarCurso(uidCurso, {
                    auxiliares: cursoBorrador.auxiliares,
                })
            }
        }
        
    }
})






// uidUsuario/nombreArchivo.extension
ff.actualizacionFotoPerfilDeUsuario = functions
.region('southamerica-east1')
.storage
.bucket(bucketNameFotoPerfil)
.object().onFinalize(async (object, context) => {
    console.log('object', JSON.stringify(object))
    console.log('context', JSON.stringify(context))

    /**
     * Formato Object Verificacion: uidUsuario/verificacion/nombre.extension
     * Formato Object Completado: uidUsuario/foto.extension
     * 
     * Tips: 
     * 1. verificacion
     */

    try {
        const array1 = object.name.split('/')
        const array2 = object.name.split('.')

        const uidUsuario = array1[0]
        const tipo = array1[1]
        const fileExtension = array2[array2.length-1]

        const auth = new Authentication(uidUsuario)

        const userRecord = await auth.existeUsuario()
        if (!userRecord) throw new Error('No existe este usuario.')

        const esValido = tipo.includes('verificacion') || tipo.includes('foto')
        if (!esValido) throw new Error('No es verificacion ni foto del usuario.')

        if (tipo.includes('foto')) return

        // Verificaciones

        // png | jpg | jpeg
        if (fileExtension !== 'png' && fileExtension !== 'jpg' && fileExtension !== 'jpeg') 
            throw new Error('Extensión incorrecta.')
        

        // // 5mb
        // const size = Number(object.size)


        // if (size > 5) 
        //     throw new Error('La foto de perfil solo puede pesar hasta 5MB.')

        
        // Eliminar la foto publicada
        await auth.eliminarFotoPerfil()

        // Publicar la foto verificada
        await auth.aceptarFotoEnVerificacion(bucketNameFotoPerfil, object.name, `${uidUsuario}/foto.${fileExtension}`)

    } catch (error) {
        console.log('Error al actualizar una foto de perfil: ', error)

        // Eliminar foto de perfil en verificacion
        const file = admin.storage().bucket(bucketNameFotoPerfil).file( object.name )
        file.delete()
    }
    
})




module.exports = ff