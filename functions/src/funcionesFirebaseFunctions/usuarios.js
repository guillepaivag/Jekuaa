const functions = require('firebase-functions')
const admin = require('../../firebase-service')
const db = require('../../db')
const Respuesta = require('../models/Respuesta')
const Usuario = require('../models/Usuario')
const manejadorErrores = require('../helpers/ManejoErrores')
const ffUsuarios = {}

ffUsuarios.registrarUsuarioPorCorreoYContrasenha = 
functions.region('southamerica-east1').https.onCall( async (data, context) => {

    try {

        const respuesta = new Respuesta()
        let codigo = 'jekuaa/exito'

        if ( context && context.auth && context.auth.token ) {
            respuesta.setRespuestaPorCodigo('usuario_no_autorizado', {
                mensaje: 'No puedes registrarte, cierra sesión primeramente.',
                resultado: null
            })
            
            return {
                status: 403,
                respuesta: respuesta.getRespuesta()
            }
        }
    
        const {
            correo,
            contrasenha,
            nombreUsuario,
            nombreCompleto
        } = data

        const uidUsuario = await Usuario.crearNuevoUsuarioEstudiante({
            correo: correo,
            nombreUsuario: nombreUsuario,
            nombreCompleto: nombreCompleto,
        }, contrasenha)

        const usuario = new Usuario()
        usuario.setUID(uidUsuario)
        usuario.setNombreUsuario(nombreUsuario)
        usuario.setCorreo(correo)
        usuario.setNombreCompleto(nombreCompleto)
        
        respuesta.setRespuestaPorCodigo(codigo, {
            mensaje: 'Se a creado el usuario de forma correcta.',
            resultado: usuario
        })
        
        return {
            status: respuesta.getStatusCode(),
            respuesta: respuesta.getRespuesta()
        }

    } catch (error) {

        console.log('error', error)

        const {
            status,
            respuesta
        } = manejadorErrores( error )

        return {
            status,
            respuesta
        }

    }

}) 

functions.region('southamerica-east1').auth.user().onCreate((user) => {
    const incrementar = admin.firestore.FieldValue.increment(1)
    const esEstudiante = user.customClaims.jekuaaRol === 'estudiante'

    db.collection('Contadores').doc('usuarios').update({
        cantidad: incrementar
    })

    db.collection('InformacionUsuarios').doc(user.uid).set({
        uid,
        descripcion: '',
        especializaciones: '',
        intereses: '',
        rolDescriptivo: esEstudiante ? 'Estudiante de Jekuaa' : 'Miembro Jekuaa',
        redesSociales: [],
    })
})

functions.region('southamerica-east1').auth.user().onDelete((user) => {
    const decrementar = admin.firestore.FieldValue.increment(-1)

    db.collection('Contadores').doc('usuarios').update({
        cantidad: decrementar
    })

    db.collection('InformacionUsuarios').doc(user.uid).delete()
})

module.exports = ffUsuarios