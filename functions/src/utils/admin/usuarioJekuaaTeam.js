const admin = require('firebase-admin')
const db = require('../../../db')
const formatoRespuesta = require('../../helpers/formatoRespuesta')
const {
    verificacionDeSeccionValida,
    necesitaSecciones
} = require('../../helpers/secciones/verificacionSecciones')
const utilsAdminUsuarioJekuaaTeam = {}

utilsAdminUsuarioJekuaaTeam.obtenerDatosDeUnUsuarioJekuaaTeamPorUID = async ( uid ) => {

    if ( !uid ) {
        return formatoRespuesta(400, {
            codigo: 'Error-Usuario',
            mensaje: `Debe ser una uid valida.`,
            resultado: null
        })
    }

    const datosUsuarioJekuaaTeamDoc = await db.collection('UsuariosJekuaaTeam').doc(uid).get()

    if ( !datosUsuarioJekuaaTeamDoc.exists ) {
        return formatoRespuesta(400, {
            codigo: 'Error-Usuario',
            mensaje: `No existe el usuario con la uid ${uid} como parte del JekuaaTeam.`,
            resultado: null
        })
    }

    const datosUsuarioJekuaaTeam = datosUsuarioJekuaaTeamDoc.data()

    return formatoRespuesta(200, {
        codigo: 'Exito',
        mensaje: 'Se obtuvo los datos del usuario como JekuaaTeam con exito.',
        resultado: datosUsuarioJekuaaTeam
    })

}

utilsAdminUsuarioJekuaaTeam.actualizarSeccionesDeUnUsuarioJekuaaTeamPorUID = async ( uid, seccionesNuevas ) => {

    // Verificamos la existencia de un usuario y 
    // si existe obtenemos los datos
    const { obtenerDatosDeUnUsuarioJekuaaTeamPorUID } = utilsAdminUsuarioJekuaaTeam

    let datosUsuarioJekuaaTeam = await obtenerDatosDeUnUsuarioJekuaaTeamPorUID( uid )

    if ( datosUsuarioJekuaaTeam.respuesta.codigo.includes('Error') ) {
        return formatoRespuesta(datosUsuarioJekuaaTeam.status, datosUsuarioJekuaaTeam.respuesta)
    }

    datosUsuarioJekuaaTeam = datosUsuarioJekuaaTeam.respuesta.resultado

    // Obtenemos los datos de authenticacion del usuario
    const datosUsuarioAuthentication = await admin.auth().getUser(uid)

    // Verificamos si el usuario necesita secciones
    if ( !necesitaSecciones( datosUsuarioAuthentication.customClaims.rol ) ) {
        return formatoRespuesta(400, {
            codigo: 'Error-Usuario',
            mensaje: `Este usuario tiene un rol que no necesita secciones.`,
            resultado: null
        })
    }

    // Verificamos si las secciones son validas
    if ( !verificacionDeSeccionValida(seccionesNuevas) ) {
        return formatoRespuesta(400, {
            codigo: 'Error-Usuario',
            mensaje: `No son validas las secciones que quieres actualizar.`,
            resultado: null
        })
    }

    const seccionesActualizadas = await db.collection('UsuariosJekuaaTeam')
                                        .doc(uid)
                                        .update({
                                            secciones: seccionesNuevas
                                        })

    return formatoRespuesta(200, {
        codigo: 'Exito',
        mensaje: 'Se actualizo las secciones de trabajo del usuario de forma correcta.',
        resultado: seccionesActualizadas
    })

}

utilsAdminUsuarioJekuaaTeam.actualizarPermisoDeInstructor = async ( uid, habilitadoComoInstructor, datosInstructorParaAgregar ) => {

    if ( !uid ) {
        return formatoRespuesta(400, {
            codigo: 'Error-Usuario',
            mensaje: `Debe ser una uid valida.`,
            resultado: null
        })
    }

    if ( typeof habilitadoComoInstructor != 'boolean' ) {
        return formatoRespuesta(400, {
            codigo: 'Error-Usuario',
            mensaje: `Debe ser boolean el valor del instructor habilitado.`,
            resultado: gananciaAcumuladaActualizada
        })
    }

    const datosUsuariosJekuaaTeamInstructor = await db.collection('UsuariosJekuaaTeam').doc(uid).update({
        instructor: habilitadoComoInstructor
    })

    // No instructor
    if ( !habilitadoComoInstructor ) {
        return formatoRespuesta(200, {
            codigo: 'Exito',
            mensaje: habilitadoComoInstructor ? `${uid} habilitado como instructor.` : `${uid} deshabilitado como instructor.`,
            resultado: {
                datosUsuariosJekuaaTeamInstructor,
                nuevoInstructor: null
            }
        }) 
    }

    const documentoInstructor = await db.collection('Instructores').doc(uid).get()

    // Ya existe el instructor
    if ( documentoInstructor.exists ) {
        return formatoRespuesta(200, {
            codigo: 'Exito',
            mensaje: habilitadoComoInstructor ? `${uid} habilitado como instructor.` : `${uid} deshabilitado como instructor.`,
            resultado: {
                datosUsuariosJekuaaTeamInstructor,
                nuevoInstructor: false
            }
        }) 
    }

    const datosNuevoInstructor = {
        uid,
        fechaComienzoInstructor: admin.firestore.Timestamp.fromDate(new Date()),
        cantidadCursos: 0,
        cantidadEstudiantes: 0,
        links: {
			portafolio: datosInstructorParaAgregar ? datosInstructorParaAgregar.links.portafolio : '',
			facebook: datosInstructorParaAgregar ? datosInstructorParaAgregar.links.facebook : '',
			instagram: datosInstructorParaAgregar ? datosInstructorParaAgregar.links.instagram : '',
			github: datosInstructorParaAgregar ? datosInstructorParaAgregar.links.github : '',
			linkedin: datosInstructorParaAgregar ? datosInstructorParaAgregar.links.linkedin : ''
		},
        informacionInstructor: datosInstructorParaAgregar ? datosInstructorParaAgregar.informacionInstructor : '',
        especializacionesIntereses: datosInstructorParaAgregar ? datosInstructorParaAgregar.especializacionesIntereses : '',
    }

    const documentoInstructorCreado = await db.collection('Instructores').doc(uid).set(datosNuevoInstructor)

    return formatoRespuesta(200, {
        codigo: 'Exito',
        mensaje: `${uid} esta como instructor nuevo.`,
        resultado: {
            datosUsuariosJekuaaTeamInstructor,
            nuevoInstructor: documentoInstructorCreado
        }
    }) 
}

module.exports = utilsAdminUsuarioJekuaaTeam