const { request, response } = require("express")
const db = require("../../../../db")
const manejadorErrores = require("../../../helpers/manejoErrores")
const Respuesta = require("../../../models/Respuesta")
const Authentication = require("../../../models/Usuarios/Authentication")
const Miembro = require("../../../models/Usuarios/TiposUsuarios/Miembro")

const controllers = {}

controllers.obtenerUsuario = async (req = request, res = response) => {
    try {
        const { datos, body, params } = req
        const { uidSolicitante, datosAuthSolicitante } = datos
        const { tipo, codigo } = params

        const respuesta = new Respuesta()

        const snapshot = await db.collection('Usuarios').where(tipo, '==', codigo).get()
        if (snapshot.empty) throw new Error('No existe el usuario.')

        const auth = new Authentication(snapshot.docs[0].id)
        const userData = await auth.obtener()

        // Retornar respuesta
        respuesta.setRespuesta({
            estado: 200,
            mensaje: 'exito',
            resultado: {
                firestore: snapshot.docs[0].data(),
                auth: userData,
            }
        })
        
        return res.status( respuesta.estado ).json( respuesta.getRespuesta() )
        
    } catch (error) {
        console.log('Error - obtenerUsuario: ', error)

        const respuesta = manejadorErrores( error )
        return res.status( respuesta.estado ).json( respuesta.getRespuesta() )
    }
}

controllers.asignarFuncionesMiembro = async (req = request, res = response) => {
    try {
        const { datos, body, params } = req
        const { uidSolicitante, datosAuthSolicitante } = datos
        const { funciones } = body

        const respuesta = new Respuesta()
        let estado = 'exito'

        await Miembro.actualizarMiembro(params.uidUsuario, {
            funciones: funciones
        })

        // Retornar respuesta
        respuesta.setRespuesta({
            estado: 200,
            mensaje: 'exito',
            resultado: null
        })
        
        return res.status( respuesta.estado ).json( respuesta.getRespuesta() )
        
    } catch (error) {
        console.log('Error - asignarFuncionesMiembro: ', error)

        const respuesta = manejadorErrores( error )
        return res.status( respuesta.estado ).json( respuesta.getRespuesta() )
    }
}


module.exports = controllers