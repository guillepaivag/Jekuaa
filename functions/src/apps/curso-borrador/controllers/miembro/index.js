const { request, response } = require("express")
const CursoBorrador = require("../../../../models/Cursos/curso/CursoBorrador")
const Respuesta = require("../../../../models/Respuesta")
const manejadorErrores = require('../../../../helpers/manejoErrores')
const CursoEstadoPublicacion = require("../../../../models/Cursos/curso/CursoEstadoPublicacion")
const timestamp = require("../../../../utils/timestamp")
const CursoPublicado = require("../../../../models/Cursos/curso/CursoPublicado")

const controller = {}

// DOCUMENTO "CURSO"
controller.crearCursoBorrador = async (req = request, res = response) => {
    try {
        const { datos, body, params } = req
        const { uidSolicitante, datosAuthSolicitante } = datos
        const { datosCurso } = body

        const respuesta = new Respuesta()
        let estado = 'exito'

        const cursoBorrador = new CursoBorrador(datosCurso)
        
        // Creación del curso borrador
        await CursoBorrador.agregarCursoBorrador(cursoBorrador)

        // Retornar respuesta
        respuesta.setRespuesta({
            estado: 200,
            mensaje: 'exito',
            resultado: null
        })
        
        return res.status( respuesta.estado ).json( respuesta.getRespuesta() )

    } catch (error) {
        console.log('Error - obtenerDatosBlog: ', error)

        const respuesta = manejadorErrores( error )
        return res.status( respuesta.estado ).json( respuesta.getRespuesta() )
    }
}

controller.actualizarCursoBorrador = async (req = request, res = response) => {
    try {
        const { datos, body, params } = req
        const { uidSolicitante, datosAuthSolicitante } = datos
        const { datosCurso } = body

        const respuesta = new Respuesta()
        let estado = 'exito'

        // Actualizar curso borrador
        await CursoBorrador.actualizarCurso(params.uidCurso, datosCurso)

        // Retornar respuesta
        respuesta.setRespuesta({
            estado: 200,
            mensaje: 'exito',
            resultado: datosCurso
        })
        
        return res.status( respuesta.estado ).json( respuesta.getRespuesta() )

    } catch (error) {
        console.log('Error - actualizarCursoBorrador: ', error)

        const respuesta = manejadorErrores( error )
        return res.status( respuesta.estado ).json( respuesta.getRespuesta() )
    }
}

controller.quitarAuxiliar = async (req = request, res = response) => {
    try {
        const { datos, params } = req
        const { uidSolicitante, datosAuthSolicitante } = datos
        const uidCurso = params.uidCurso
        const uidUsuario = params.uidUsuario

        const respuesta = new Respuesta()
        let estado = 'exito'

        const cursoBorrador = new CursoBorrador()
        const existe = await cursoBorrador.importarDatosDeUnCurso(uidCurso)
        const auxiliares = cursoBorrador.auxiliares
        const index = auxiliares.findIndex(v => v === uidUsuario)
        if (index !== -1) auxiliares.splice(index, 1)

        CursoBorrador.actualizarCurso(uidCurso, { auxiliares })
        if (cursoBorrador.estadoDocumento !== 'nuevo') 
            CursoPublicado.actualizarCurso(uidCurso, { auxiliares })

        // Retornar respuesta
        respuesta.setRespuesta({
            estado: 200,
            mensaje: 'exito',
            resultado: auxiliares
        })
        
        return res.status( respuesta.estado ).json( respuesta.getRespuesta() )

    } catch (error) {
        console.log('Error - quitarAuxiliar: ', error)

        const respuesta = manejadorErrores( error )
        return res.status( respuesta.estado ).json( respuesta.getRespuesta() )
    }
}

controller.actualizarDatosPrecio = async (req = request, res = response) => {
    try {
        const { datos, body, params } = req
        const { uidSolicitante, datosAuthSolicitante } = datos
        const { tienePublicado, datosPrecio } = body
        const uidCurso = params.uidCurso

        const respuesta = new Respuesta()
        let estado = 'exito'

        CursoBorrador.actualizarCurso(uidCurso, { datosPrecio })
        if (tienePublicado) CursoPublicado.actualizarCurso(uidCurso, { datosPrecio })

        // Retornar respuesta
        respuesta.setRespuesta({
            estado: 200,
            mensaje: 'exito',
            resultado: { tienePublicado, datosPrecio }
        })
        
        return res.status( respuesta.estado ).json( respuesta.getRespuesta() )

    } catch (error) {
        console.log('Error - actualizarDatosPrecio: ', error)

        const respuesta = manejadorErrores( error )
        return res.status( respuesta.estado ).json( respuesta.getRespuesta() )
    }
}

controller.publicarCursoBorrador = async (req = request, res = response) => {
    try {
        const { datos, body, params } = req
        const { uidSolicitante, datosAuthSolicitante } = datos
        const { esNuevo } = datos

        const respuesta = new Respuesta()
        let estado = 'exito'

        if (esNuevo) {
            const cursoEstadoPublicacion = new CursoEstadoPublicacion()
            cursoEstadoPublicacion.uid = params.uidCurso
            cursoEstadoPublicacion.estado = true
            cursoEstadoPublicacion.fechaSolicitud = timestamp.milliseconds_a_timestamp(Date.now())
            cursoEstadoPublicacion.fechaPublicado = null

            await CursoEstadoPublicacion.agregarDocumento(cursoEstadoPublicacion)
        } else {
            await CursoEstadoPublicacion.actualizarDocumento(params.uidCurso, {
                estado: true,
                fechaSolicitud: timestamp.milliseconds_a_timestamp(Date.now()),
                fechaPublicado: null
            })
        }

        // Retornar respuesta
        respuesta.setRespuesta({
            estado: 200,
            mensaje: 'exito',
            resultado: null
        })
        
        return res.status( respuesta.estado ).json( respuesta.getRespuesta() )

    } catch (error) {
        console.log('Error - publicarCursoBorrador: ', error)

        const respuesta = manejadorErrores( error )
        return res.status( respuesta.estado ).json( respuesta.getRespuesta() )
    }
}

module.exports = controller