const { request, response } = require("express")
const manejadorErrores = require("../../../helpers/manejoErrores")
const Respuesta = require("../../../models/Respuesta")
const Equipo = require("../../../models/Equipo/Equipo")
const timestamp = require("../../../utils/timestamp")
const controller = {}

controller.crearEquipo = async (req = request, res = response) => {
    
    try {
        const { datos, body, requestStartTime } = req
        const { uidSolicitante, datosAuthSolicitante } = datos

        const respuesta = new Respuesta()

        const datosEquipo = {
            codigo: body.codigo,
            nombre: body.nombre,
            descripcion: body.descripcion,
            responsable: body.responsable,
            fechaCreado: timestamp.milliseconds_a_timestamp(requestStartTime),
        }

        // Creamos el equipo
        const equipo = new Equipo( datosEquipo )

        await Equipo.crearEquipo( equipo )

        // Retornar respuesta
        respuesta.setRespuesta({
            estado: 200,
            mensaje: 'exito',
            resultado: equipo
        })
        
        return res.status( respuesta.estado ).json( respuesta.getRespuesta() )

    } catch (error) {
        console.log('Error - obtenerEquipos: ', error)

        const respuesta = manejadorErrores( error )
        return res.status( respuesta.estado ).json( respuesta.getRespuesta() )
    }

}

controller.actualizarEquipo = async (req = request, res = response) => {
    
    try {
        const { datos, body, params, requestStartTime } = req
        const { uidSolicitante, datosAuthSolicitante } = datos
        const { datosActualizados } = body
        const { uidEquipo } = params

        const respuesta = new Respuesta()

        // Actualizamos el equipo
        let resultado = await Equipo.actalizarEquipoPorUID(uidEquipo, datosActualizados)

        // Retornar respuesta
        respuesta.setRespuesta({
            estado: 200,
            mensaje: 'exito',
            resultado: resultado
        })
        
        return res.status( respuesta.estado ).json( respuesta.getRespuesta() )

    } catch (error) {
        console.log('Error - obtenerEquipos: ', error)

        const respuesta = manejadorErrores( error )
        return res.status( respuesta.estado ).json( respuesta.getRespuesta() )
    }

}

controller.eliminarEquipo = async (req = request, res = response) => {
    
    try {
        const { datos, params, requestStartTime } = req
        const { uidSolicitante, datosAuthSolicitante } = datos
        const { uidEquipo } = params

        const respuesta = new Respuesta()

        const datosEquipo = {
            eliminado: true,
            fechaEliminado: timestamp.milliseconds_a_timestamp(requestStartTime),
        }

        // Actualizamos el estado eliminado del equipo
        let resultado = await Equipo.actalizarEquipoPorUID(uidEquipo, datosEquipo)

        // Retornar respuesta
        respuesta.setRespuesta({
            estado: 200,
            mensaje: 'exito',
            resultado: resultado
        })
        
        return res.status( respuesta.estado ).json( respuesta.getRespuesta() )

    } catch (error) {
        console.log('Error - obtenerEquipos: ', error)

        const respuesta = manejadorErrores( error )
        return res.status( respuesta.estado ).json( respuesta.getRespuesta() )
    }

}

module.exports = controller