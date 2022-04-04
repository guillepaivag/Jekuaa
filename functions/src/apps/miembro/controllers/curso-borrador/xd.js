const { request, response } = require("express")
const CursoBorrador = require("../../../../models/Cursos/curso/CursoBorrador")
const Respuesta = require("../../../../models/Respuesta")
const manejadorErrores = require('../../../../helpers/ManejoErrores')
const DatosPrecio_Curso = require("../../../../models/Cursos/helpers/DatosPrecio_Curso")

const controller = {}

controller.actualizarPrecioCurso = async (req = request, res = response) => {
    try {
        const { datos, body, params } = req
        const { uidSolicitante, datosAuthSolicitante } = datos
        const { precio } = body

        const respuesta = new Respuesta()
        let codigo = 'exito'

        const datosPrecio = new DatosPrecio_Curso(precio)
        
        // Actualizar precio del curso borrador
        await CursoBorrador.actualizarCurso(params.uidCurso, {
            datosPrecio: datosPrecio.getDatosPrecio_Curso()
        })
        
        // Actualizar precio del curso publicado

        // Retornar respuesta
        respuesta.setRespuestaPorCodigo(codigo, {
            mensaje: '¡Se actualizó el precio del curso de forma exitosa!',
            resultado: datosCurso
        })
        const status = respuesta.getStatusCode()
        
        return res.status( status ).json( respuesta.getRespuesta() )
        
    } catch (error) {
        console.log('Error - actualizarPrecioCurso: ', error)

        const {
            status,
            respuesta
        } = manejadorErrores( error )

        return res.status( status ).json( respuesta )
    }
}

module.exports = controller