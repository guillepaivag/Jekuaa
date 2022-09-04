const { request, response } = require("express")
const CursoBorrador = require("../../../../models/Cursos/curso/CursoBorrador")
const Respuesta = require("../../../../models/Respuesta")
const manejadorErrores = require('../../../../helpers/manejoErrores')
const CursoPublicado = require("../../../../models/Cursos/curso/CursoPublicado")
const ContenidoClase = require("../../../../models/Cursos/contenidoClase/ContenidoClase")
const ContenidoVideoBorrador = require("../../../../models/Cursos/contenidoClase/ContenidoVideoBorrador")
const ContenidoVideoPublicado = require("../../../../models/Cursos/contenidoClase/ContenidoVideoPublicado")
const ContenidoArticuloBorrador = require("../../../../models/Cursos/contenidoClase/ContenidoArticuloBorrador")
const ContenidoArticuloPublicado = require("../../../../models/Cursos/contenidoClase/ContenidoArticuloPublicado")
const ContenidoYoutubeBorrador = require("../../../../models/Cursos/contenidoClase/contenidoYoutube/ContenidoYoutubeBorrador")

const controller = {}

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
        console.log('Error - crearCursoBorrador: ', error)

        const respuesta = manejadorErrores( error )
        return res.status( respuesta.estado ).json( respuesta.getRespuesta() )
    }
}

controller.actualizarAuxiliares = async (req = request, res = response) => {
    try {
        const { datos, body, params } = req
        const { uidSolicitante, datosAuthSolicitante } = datos
        const { auxiliares, tienePublicado } = body

        const respuesta = new Respuesta()
        let estado = 'exito'

        CursoBorrador.actualizarCurso(params.uidCurso, { auxiliares })
        
        if (tienePublicado)
            CursoPublicado.actualizarCurso(params.uidCurso, { auxiliares })

        // Retornar respuesta
        respuesta.setRespuesta({
            estado: 200,
            mensaje: 'exito',
            resultado: null
        })
        
        return res.status( respuesta.estado ).json( respuesta.getRespuesta() )

    } catch (error) {
        console.log('Error - actualizarAuxiliares: ', error)

        const respuesta = manejadorErrores( error )
        return res.status( respuesta.estado ).json( respuesta.getRespuesta() )
    }
}

controller.obtenerUrlVideoClase = async (req = request, res = response) => {
    try {
        const { datos, body, params } = req
        const { uidSolicitante, datosAuthSolicitante } = datos
        const { uidCurso, uidClase } = params

        const respuesta = new Respuesta()
        let estado = 'exito'
        
        // Obtener video
        const result = await ContenidoClase.obtenerDocumentoBorrador(uidCurso, uidClase)

        let url = ''
        if (result.contenidoClase.estadoDocumento) {
            url = await ContenidoVideoBorrador.generarUrlVideo({
                rutaPrefix: `${uidCurso}/${uidClase}/video.`,
            })
        } else {
            url = await ContenidoVideoPublicado.generarUrlVideo({
                rutaPrefix: `${uidCurso}/${uidClase}/video.`,
            })
        }

        // Retornar respuesta
        respuesta.setRespuesta({
            estado: 200,
            mensaje: 'exito',
            resultado: url
        })
        
        return res.status( respuesta.estado ).json( respuesta.getRespuesta() )

    } catch (error) {
        console.log('Error - obtenerUrlVideoClase: ', error)

        const respuesta = manejadorErrores( error )
        return res.status( respuesta.estado ).json( respuesta.getRespuesta() )
    }
}

controller.obtenerArticuloClase = async (req = request, res = response) => {
    try {
        const { datos, body, params } = req
        const { uidSolicitante, datosAuthSolicitante } = datos
        const { uidCurso, uidClase } = params

        const respuesta = new Respuesta()
        let estado = 'exito'
        
        // Creación del curso borrador
        const result = await ContenidoClase.obtenerDocumentoBorrador(uidCurso, uidClase)
        
        let articulo = ''
        if (result.contenidoClase.estadoDocumento) {
            articulo = await ContenidoArticuloBorrador.obtenerArticulo({
                rutaPrefix: `${uidCurso}/${uidClase}/articulo.md`,
                getMarkdown: false
            })
        } else {
            articulo = await ContenidoArticuloPublicado.obtenerArticulo({
                rutaPrefix: `${uidCurso}/${uidClase}/articulo.md`,
                getMarkdown: false
            })
        }

        // Retornar respuesta
        respuesta.setRespuesta({
            estado: 200,
            mensaje: 'exito',
            resultado: articulo
        })
        
        return res.status( respuesta.estado ).json( respuesta.getRespuesta() )

    } catch (error) {
        console.log('Error - obtenerArticuloClase: ', error)

        const respuesta = manejadorErrores( error )
        return res.status( respuesta.estado ).json( respuesta.getRespuesta() )
    }
}

controller.obtenerVideoYoutubeClase = async (req = request, res = response) => {
    
    try {
        const { datos, body, params } = req
        const { uidSolicitante, datosAuthSolicitante } = datos
        const { uidCurso, uidClase } = params

        const respuesta = new Respuesta()

        const result = await ContenidoClase.obtenerDocumentoBorrador(uidCurso, uidClase)
        const contenidoYoutubeBorrador = new ContenidoYoutubeBorrador(result.contenidoClase)

        // Retornar respuesta
        respuesta.setRespuesta({
            estado: 200,
            mensaje: 'exito',
            resultado: {
                codigoVideoYoutube: contenidoYoutubeBorrador.codigoVideoYoutube,
                duracion: contenidoYoutubeBorrador.duracion
            }
        })
        
        return res.status( respuesta.estado ).json( respuesta.getRespuesta() )

    } catch (error) {
        console.log('Error - obtenerVideoYoutubeClase: ', error)

        const respuesta = manejadorErrores( error )
        return res.status( respuesta.estado ).json( respuesta.getRespuesta() )
    }

}


module.exports = controller