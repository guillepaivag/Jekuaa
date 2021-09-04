const admin = require('firebase-admin')
const db = require('../../../db')
const formatoRespuesta = require('../../helpers/formatoRespuesta')
const {
    necesitaSecciones,
    verificacionDeSeccionValida
} = require('../../helpers/secciones/verificacionSecciones')
const utilsAdminUser = {}

utilsAdminUser.obtenerDatosDeUnUsuarioPorUID = async ( uid ) => {
    
    let datosUsuario = {}

    if ( !uid ) {
        const respuesta = {
            codigo: 'Error-Usuario',
            mensaje: 'Hay que pasar una uid no nula.',
            resultado: null
        }

        return formatoRespuesta(400, respuesta)

    }

    if ( typeof uid != 'string' ) {
        return formatoRespuesta(400, {
            codigo: 'Error-Usuario',
            mensaje: 'La uid debe tener un formato valido.',
            resultado: null
        })
    }

    // Buscamos los datos del usuario
    const datosUsuarioDoc = await db.collection('Usuarios').doc(uid).get()
            
    // Si no hay datos como usuario, retornar la respuesta 
    if ( !datosUsuarioDoc.exists ) {
        const respuesta = {
            codigo: 'Error-Usuario',
            mensaje: 'No existe este usuario.',
            resultado: null
        }

        return formatoRespuesta(400, respuesta)
    }

    // Recolectamos los datos
    const datosUsuarioAuthentication = await admin.auth().getUser(uid)
    const datosUsuarioFirestore = datosUsuarioDoc.data()

    datosUsuario = Object.assign(datosUsuario, {
        datosUsuarioAuthentication,
        datosUsuarioFirestore
    })

    // Si es parte del grupo teamJekuaa
    if ( datosUsuarioFirestore.teamJekuaa ) {
        const datosUsuarioConJekuaaTeam = await getDatosUsuarioJekuaaTeamPorUID(uid, datosUsuario)

        datosUsuario = !!datosUsuarioConJekuaaTeam ? datosUsuarioConJekuaaTeam : datosUsuario
    }

    const respuesta = {
        codigo: 'Exito',
        mensaje: 'Usuario enviado con exito.',
        resultado: datosUsuario
    }

    return formatoRespuesta(200, respuesta)
}

utilsAdminUser.actualizarDatosPersonalesPorUID = async ( uid, datosPersonales ) => {
    const { fechaNacimiento, nombreUsuario, nombreCompleto, correo, fotoPerfil } = datosPersonales

    const datosPersonalesActualizadosFirestore = {}
    const datosPersonalesActualizadosAuthentication = {}
    const clavesDatosPersonales = ['fechaNacimiento', 
                                    'nombreUsuario', 
                                    'nombreCompleto', 
                                    'correo', 
                                    'fotoPerfil'
                                ]

    // VERIFICACION DE EXISTENCIA DE DATOS PARA ACTUALIZAR
    if (!datosPersonales) {
        return formatoRespuesta(400, {
            codigo: 'Error-Usuario',
            mensaje: 'Debe existir datos para actualizar.',
            resultado: null
        })
    }
    
    const keysDatosPersonales = Object.keys(datosPersonales)

    // VERIFICACION DE EXISTENCIA DE DATOS PARA ACTUALIZAR
    if (!keysDatosPersonales.length) {

        return formatoRespuesta(400, {
            codigo: 'Error-Usuario',
            mensaje: 'No se agrego ningun dato para actualizar el usuario.',
            resultado: null
        })
    }

    // VERIFICACION DE EXISTENCIA DE LA UID
    if (!uid) {
        return formatoRespuesta(400, {
            codigo: 'Error-Usuario',
            mensaje: 'Debe de ser una uid válido.',
            resultado: null
        })
    }

    if ( typeof uid != 'string' ) {
        return formatoRespuesta(400, {
            codigo: 'Error-Usuario',
            mensaje: 'La uid debe tener un formato valido.',
            resultado: null
        })
    }

    // VERIFICACION DE EXISTENCIA DE CLAVES DEL OBJETO 'datosPersonales'
    for (let i = 0; i < keysDatosPersonales.length; i++) {
        const element = keysDatosPersonales[i];
        
        if(!clavesDatosPersonales.includes(element)) {
            return formatoRespuesta(400, {
                codigo: 'Error-Usuario',
                mensaje: 'No tiene las claves correspondientes.',
                resultado: null
            })
        }
    }

    for (let i = 0; i < keysDatosPersonales.length; i++) {
        const element = keysDatosPersonales[i];
        
        if(element === clavesDatosPersonales[0]) {
            // Fecha de nacimiento

            // datosPersonales.fechaNacimiento = YYYY/MM/DD
            datosPersonalesActualizadosFirestore.fechaNacimiento = admin.firestore.Timestamp.fromDate(
                new Date( fechaNacimiento )
            )

        } else if (element === clavesDatosPersonales[1]) {
            // Nombre de usuario
            datosPersonalesActualizadosFirestore.nombreUsuario = nombreUsuario
            datosPersonalesActualizadosAuthentication.displayName = nombreUsuario
            
        } else if (element === clavesDatosPersonales[2]) {
            // Nombre completo
            datosPersonalesActualizadosFirestore.nombreCompleto = nombreCompleto
            
        } else if (element === clavesDatosPersonales[3]) {
            // Correo
            datosPersonalesActualizadosFirestore.correo = correo
            datosPersonalesActualizadosAuthentication.email = correo
            
        } else if (element === clavesDatosPersonales[4]) {
            // Correo
            datosPersonalesActualizadosAuthentication.photoURL = fotoPerfil
            
        }

    }

    const datosActualizadosAuthentication = await admin.auth().updateUser(uid, datosPersonalesActualizadosAuthentication)
    const datosActualizadosFirestore = await db.collection('Usuarios').doc(uid).update(datosPersonalesActualizadosFirestore)
    
    return formatoRespuesta(200, {
        codigo: 'Exito',
        mensaje: 'Se actualizo los datos personales del usuario de forma correcta.',
        resultado: {
            datosActualizadosFirestore,
            datosActualizadosAuthentication
        }
    })
}

utilsAdminUser.actualizarJekuaaPointsPorUID = async ( uid, jekuaaPoint, operacion ) => {

    if (!uid) {
        return formatoRespuesta(400, {
            codigo: 'Error-Usuario',
            mensaje: 'Debe de ser una uid válido.',
            resultado: null
        })
    }

    if ( typeof uid != 'string' ) {
        return formatoRespuesta(400, {
            codigo: 'Error-Usuario',
            mensaje: 'La uid debe tener un formato valido.',
            resultado: null
        })
    }

    if (jekuaaPoint <= 0) {
        return formatoRespuesta(400, {
            codigo: 'Error-Usuario',
            mensaje: 'No se puede dar 0 o menos Jekuaa Points.',
            resultado: null
        })
    }

    if (!['suma', 'resta'].includes(operacion)) {
        return formatoRespuesta(400, {
            codigo: 'Error-Usuario',
            mensaje: 'Debe de ser una operacion válida.',
            resultado: null
        })
    }

    const datosUsuarioDoc = await db.collection('Usuarios').doc(uid).get()

    if (!datosUsuarioDoc.exists) {
        return formatoRespuesta(400, {
            codigo: 'Error-Usuario',
            mensaje: 'Debe existir el usuario.',
            resultado: null
        })
    }

    const datosUsuario = datosUsuarioDoc.data()
    let jekuaaPointTotal = 0

    if (operacion == 'suma') {
        jekuaaPointTotal = datosUsuario.jekuaaPoint + jekuaaPoint
    } else if (operacion == 'resta') {
        if (jekuaaPoint > datosUsuario.jekuaaPoint) {
            return formatoRespuesta(400, {
                codigo: 'Error-Usuario',
                mensaje: 'No se puede quedar con menos de 0 Jekuaa Points.',
                resultado: null
            })
        }

        jekuaaPointTotal = datosUsuario.jekuaaPoint - jekuaaPoint
    } 

    const jekuaaPointActualizado = await db.collection('Usuarios').doc(uid).update({
        jekuaaPoint: jekuaaPointTotal
    })

    let mensaje = ''
    switch (operacion) {
        case 'suma':
            mensaje = `Se agrego ${jekuaaPoint} Jekuaa Points a ${datosUsuario.nombreUsuario}.`
            break;
        
        case 'resta':
            mensaje = `Se descontó ${jekuaaPoint} Jekuaa Points a ${datosUsuario.nombreUsuario}.`
            break;
    
        default:
            break;
    }

    return formatoRespuesta(200, {
        codigo: 'Exito',
        mensaje,
        resultado: {
            jekuaaPointActualizado,
            datosUsuario: (await db.collection('Usuarios').doc(uid).get()).data()
        }
    })

}

utilsAdminUser.actualizarUsuarioJekuaaPremiumPorUID = async ( uid, jekuaaPremium ) => {
    
    if ( !uid ) {
        return formatoRespuesta(400, {
            codigo: 'Error-Usuario',
            mensaje: 'No existe una uid para actualizar los datos de JekuaaPremium.',
            resultado: null
        })

    }

    if ( typeof uid != 'string' ) {
        return formatoRespuesta(400, {
            codigo: 'Error-Usuario',
            mensaje: 'La uid debe tener un formato valido.',
            resultado: null
        })
    }

    const usuarioAuthentication = await admin.auth().getUser(uid)
    console.log('usuarioAuthentication', usuarioAuthentication)

    if ( !jekuaaPremium ) {
        const datosJekuaaPremiumActualizado = await db.collection('Usuarios').doc(uid).update({
            jekuaaPremium: null
        })

        await admin.auth().setCustomUserClaims(uid, {
            rol: usuarioAuthentication.customClaims.rol,
            jekuaaPremium: false
        })

        return formatoRespuesta(200, {
            codigo: 'Exito',
            mensaje: 'Se actualizo como null el campo jekuaaPremium.',
            resultado: datosJekuaaPremiumActualizado
        })
    }

    const { fechaCompra, duracion, plan } = jekuaaPremium

    if ( !fechaCompra || !duracion || !plan ) {

        return formatoRespuesta(400, {
            codigo: 'Error-Usuario',
            mensaje: 'No existen los datos necesarios para actualizar a usuario JekuaaPremium.',
            resultado: null
        })
    }

    const fechaCompraMCJ = admin.firestore.Timestamp.fromDate( new Date(fechaCompra) )
    const duracionMCJ = parseInt(duracion)
    const planMCJ = String(plan)

    const datosJekuaaPremiumActualizado = await db.collection('Usuarios').doc(uid).update({
        jekuaaPremium: { 
            fechaCompra: fechaCompraMCJ, 
            duracion: duracionMCJ, 
            plan: planMCJ
        }
    })

    await admin.auth().setCustomUserClaims(uid, {
        rol: usuarioAuthentication.customClaims.rol,
        jekuaaPremium: true
    })

    return formatoRespuesta(200, {
        codigo: 'Exito',
        mensaje: 'Se actualizo de forma correcta el campo jekuaaPremium.',
        resultado: datosJekuaaPremiumActualizado
    })

}

utilsAdminUser.actualizarUsuarioRolPorUID = async ( uid, datosRol ) => {
    
    const { rol, secciones } = datosRol

    const nuevoRol = rol
    const nuevasSecciones = secciones

    const rolesValidos = [
        'estudiante',
        'miembro',
        'moderador',
        'gerente',
        'propietario'
    ]

    if ( !uid ) {
        return formatoRespuesta(400, {
            codigo: 'Error-Usuario',
            mensaje: 'No existe una uid para actualizar los datos del rol del usuario.',
            resultado: null
        })
    }

    if ( typeof uid != 'string' ) {
        return formatoRespuesta(400, {
            codigo: 'Error-Usuario',
            mensaje: 'La uid debe tener un formato valido.',
            resultado: null
        })
    }

    const usuarioAuthentication = await admin.auth().getUser(uid)

    if ( !usuarioAuthentication ) {
        return formatoRespuesta(400, {
            codigo: 'Error-Usuario',
            mensaje: 'No existe el usuario.',
            resultado: null
        })
    }

    if ( !nuevoRol ) {
        return formatoRespuesta(400, {
            codigo: 'Error-Usuario',
            mensaje: 'No existe un rol para actualizar el usuario.',
            resultado: null
        })
    }

    if ( typeof nuevoRol != 'string' ) {
        return formatoRespuesta(400, {
            codigo: 'Error-Usuario',
            mensaje: 'El rol debe tener un formato valido.',
            resultado: null
        })
    }

    if ( !rolesValidos.includes(nuevoRol) ) {
        return formatoRespuesta(400, {
            codigo: 'Error-Usuario',
            mensaje: 'No existe un rol valido.',
            resultado: null
        })
    }

    if ( nuevoRol === 'estudiante' ) {
        // Modificacion en la base de datos - Firebase Cloud Firestore
        const datosUsuarioActualizado_Firestore = await db.collection('Usuarios').doc(uid).update({
            jekuaaTeam: false
        })

        // Modificacion en authentication - Firebase authentication
        const datosUsuarioActualizado_Authentication = await admin.auth().setCustomUserClaims(uid, {
            rol: 'estudiante',
            jekuaaPremium: usuarioAuthentication.customClaims.jekuaaPremium
        })

        const datosUsuarioJekuaaTeamActualizado_Firestore = null
    
        return formatoRespuesta(200, {
            codigo: 'Exito',
            mensaje: 'Se a actualizado los datos del rol.',
            resultado: {
                datosUsuarioActualizado_Firestore,
                datosUsuarioActualizado_Authentication,
                datosUsuarioJekuaaTeamActualizado_Firestore
            }
        })

    }

    // Verificacion de que exista el usuario como parte del JekuaaTeam
    // Usuario como jekuaaTeam por primera vez
    const datosUsuarioJekuaaTeamDoc = await db.collection('UsuariosJekuaaTeam').doc(uid).get()
    if ( !datosUsuarioJekuaaTeamDoc.exists ) {

        if ( necesitaSecciones(nuevoRol) ) {

            if ( !nuevasSecciones instanceof Array ) {
                return formatoRespuesta(400, {
                    codigo: 'Error-Usuario',
                    mensaje: 'Las nuevas secciones deben tener un formato valido.',
                    resultado: null
                })
            }

            if ( !verificacionDeSeccionValida( nuevasSecciones ) ) {

                return formatoRespuesta(400, {
                    codigo: 'Error-Usuario',
                    mensaje: 'No son validas las secciones que quieres actualizar.',
                    resultado: null
                })
            }
        }

        const datosNuevoUsuarioJekuaaTeam = {
            uid: uid,
            instructor: false,
            rolJekuaaTeam: nuevoRol,
            secciones: necesitaSecciones(nuevoRol) ? nuevasSecciones : null
        }

        const datosUsuarioJekuaaTeamActualizado_Firestore = await db.collection('UsuariosJekuaaTeam')
                                                                    .doc(uid)
                                                                    .set(datosNuevoUsuarioJekuaaTeam)
        
        return formatoRespuesta(200, {
            codigo: 'Exito',
            mensaje: 'Se a actualizado los datos del rol.',
            resultado: {
                datosUsuarioActualizado_Firestore,
                datosUsuarioActualizado_Authentication,
                datosUsuarioJekuaaTeamActualizado_Firestore
            }
        })
    }
    
    const rolYSeccionActualizado = {
        rolJekuaaTeam: nuevoRol
    }

    if ( !necesitaSecciones(usuarioAuthentication.customClaims.rol) && necesitaSecciones(nuevoRol) ) {
        
        if ( !datosUsuarioJekuaaTeamDoc.data().secciones ) {

            if ( !verificacionDeSeccionValida( nuevasSecciones ) ) {

                return formatoRespuesta(400, {
                    codigo: 'Error-Usuario',
                    mensaje: 'No son validas las secciones que quieres actualizar.',
                    resultado: null
                })
            }

            rolYSeccionActualizado.secciones = nuevasSecciones
        }

    } else if ( necesitaSecciones(usuarioAuthentication.customClaims.rol) && !necesitaSecciones(nuevoRol) ) {
        rolYSeccionActualizado.secciones = null

    }

    // Modificacion en la base de datos - Firebase Cloud Firestore
    const datosUsuarioActualizado_Firestore = await db.collection('Usuarios').doc(uid).update({
        jekuaaTeam: true
    })

    // Modificacion en authentication - Firebase authentication
    const datosUsuarioActualizado_Authentication = await admin.auth().setCustomUserClaims(uid, {
        rol: nuevoRol,
        jekuaaPremium: usuarioAuthentication.customClaims.jekuaaPremium
    })

    const datosUsuarioJekuaaTeamActualizado_Firestore = await db.collection('UsuariosJekuaaTeam')
                                                                .doc(uid)
                                                                .update(rolYSeccionActualizado)

    return formatoRespuesta(200, {
        codigo: 'Exito',
        mensaje: 'Se a actualizado los datos del rol.',
        resultado: {
            datosUsuarioActualizado_Firestore,
            datosUsuarioActualizado_Authentication,
            datosUsuarioJekuaaTeamActualizado_Firestore
        }
    })

}

module.exports = utilsAdminUser