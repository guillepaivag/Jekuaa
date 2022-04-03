const { request, response } = require("express")
const CursoBorrador = require("../../../../models/Cursos/curso/CursoBorrador")
const Respuesta = require("../../../../models/Respuesta")
const manejadorErrores = require('../../../../helpers/ManejoErrores')

const controller = {}

// DOCUMENTO "CURSO"
controller.crearCursoBorrador = async (req = request, res = response) => {
    try {
        const { datos, body, params } = req
        const { uidSolicitante, datosAuthSolicitante } = datos
        const { datosCurso } = body

        const respuesta = new Respuesta()
        let codigo = 'exito'

        const cursoBorrador = new CursoBorrador(datosCurso)
        
        // Creación del curso borrador
        await CursoBorrador.agregarCursoBorrador(cursoBorrador)

        // Retornar respuesta
        respuesta.setRespuestaPorCodigo(codigo, {
            mensaje: '¡Se creo un curso de forma exitosa!',
            resultado: null
        })
        const status = respuesta.getStatusCode()
        
        return res.status( status ).json( respuesta.getRespuesta() )

    } catch (error) {
        console.log('Error - obtenerDatosBlog: ', error)

        const {
            status,
            respuesta
        } = manejadorErrores( error )

        return res.status( status ).json( respuesta )
    }
}

controller.actualizarCursoBorrador = async (req = request, res = response) => {
    try {
        const { datos, body, params } = req
        const { uidSolicitante, datosAuthSolicitante } = datos
        const { datosCurso } = body

        const respuesta = new Respuesta()
        let codigo = 'exito'

        // Actualizar curso borrador
        await CursoBorrador.actualizarCurso(params.uidCurso, datosCurso)

        // Retornar respuesta
        respuesta.setRespuestaPorCodigo(codigo, {
            mensaje: '¡Se actualizó un curso de forma exitosa!',
            resultado: datosCurso
        })
        const status = respuesta.getStatusCode()
        
        return res.status( status ).json( respuesta.getRespuesta() )

    } catch (error) {
        console.log('Error - actualizarCursoBorrador: ', error)

        const {
            status,
            respuesta
        } = manejadorErrores( error )

        return res.status( status ).json( respuesta )
    }
}

module.exports = controller