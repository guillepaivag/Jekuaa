const admin = require('firebase-admin')
const db = require('../../../db')
const formatoRespuesta = require('../../helpers/formatoRespuesta')

const utilInstructor = {}

utilInstructor.obtenerDatosDeUnInstructorPorUID = async ( uid ) => {

    if ( !uid ) {
        return formatoRespuesta(400, {
            codigo: 'Error-Usuario',
            mensaje: 'No existe la uid para buscar el usuario',
            resultado: null
        })
    }

    if ( typeof uid != 'string' ) {
        return formatoRespuesta(400, {
            codigo: 'Error-Usuario',
            mensaje: 'La uid no esta en el formato correcto.',
            resultado: null
        })
    }

    const instructorDoc = await db.collection('Instructores').doc(uid).get()

    if ( !instructorDoc.exists ) {
        return formatoRespuesta(400, {
            codigo: 'Error-Usuario',
            mensaje: `No existe el usuario con la uid ${uid}.`,
            resultado: null
        })
    }

    const datosInstructor = instructorDoc.data()

    return formatoRespuesta(200, {
        codigo: 'Exito',
        mensaje: `Datos del usuario con la uid ${uid} enviado con exito.`,
        resultado: datosInstructor
    })

}

module.exports = utilInstructor