const fs = require('fs')
const { request, response } = require("express")

const Respuesta = require("../../../../models/Respuesta")
const Errores = require('../../../../models/Error/Errores')
const ContenidoClase = require('../../../../models/Cursos/contenidoClase/ContenidoClase')
const ContenidoVideoBorrador = require('../../../../models/Cursos/contenidoClase/ContenidoVideoBorrador')
const ContenidoVideoPublicado = require('../../../../models/Cursos/contenidoClase/ContenidoVideoPublicado')
const ContenidoArticuloBorrador = require('../../../../models/Cursos/contenidoClase/ContenidoArticuloBorrador')
const ContenidoArticuloPublicado = require('../../../../models/Cursos/contenidoClase/ContenidoArticuloPublicado')
const manejadorErrores = require('../../../../helpers/manejoErrores')
const config = require("../../../../../config")

const controller = {}


controller.agregarContenidoClaseArticuloBorrador = async (req = request, res = response) => {
    try {
        const { datos, body, params } = req
        const { uidSolicitante, datosAuthSolicitante } = datos
        const { uidCurso, uidUnidad, uidClase } = params
        const { rutaArchivoTemp } = body

        const respuesta = new Respuesta()
        let estado = 'exito'
        
        const rutaModo = config.environment.mode === 'production' ? 'prod' : 'dev'
        const bucketNameVerificacion = rutaModo === 'prod' ? 'prod-j-cursos-contenido-bv' : 'dev-j-cursos-contenido-bv'

        // Agregar el archivo contenido clase
        await ContenidoClase.subirContenidoArchivo({
            bucketName: bucketNameVerificacion,
            rutaDestino: `${uidCurso}/${uidClase}/articulo.md`,
            fileData: {
                rutaArchivoTemp: rutaArchivoTemp,
                extensionArchivo: 'md'
            }
        }).then(response => {
            // Eliminar archivo temp
            fs.unlink(rutaArchivoTemp, (err => {
                if ( err ) {
                    throw new Errores({
                        estado: 500,
                        mensajeCliente: 'error_desconocido',
                        mensajeServidor: 'Error al eliminar el archivo temporal.',
                        resultado: err,
                    })
                }
            }))
        })

        // Retornar respuesta
        respuesta.setRespuesta({
            estado: 200,
            mensaje: 'exito',
            resultado: null
        })
        
        return res.status( respuesta.estado ).json( respuesta.getRespuesta() )

    } catch (error) {
        console.log('Error - agregarContenidoClaseArticulo: ', error)

        const respuesta = manejadorErrores( error )
        return res.status( respuesta.estado ).json( respuesta.getRespuesta() )
    }
}


controller.obtenerUrlVideoClaseBorrador = async (req = request, res = response) => {
    
    try {
        const { datos, body, params } = req
        const { uidSolicitante, datosAuthSolicitante } = datos
        const { uidCurso, uidClase } = params

        const respuesta = new Respuesta()
        let estado = 'exito'

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
        console.log('Error - obtenerUrlVideoClaseBorrador: ', error)

        const respuesta = manejadorErrores( error )
        return res.status( respuesta.estado ).json( respuesta.getRespuesta() )
    }

}



controller.obtenerArticuloClaseBorrador = async (req = request, res = response) => {

    try {
        const { datos, body, params } = req
        const { uidSolicitante, datosAuthSolicitante } = datos
        const { uidCurso, uidClase } = params

        const respuesta = new Respuesta()
        let estado = 'exito'

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
        console.log('Error - obtenerUrlVideoClaseBorrador: ', error)

        const respuesta = manejadorErrores( error )
        return res.status( respuesta.estado ).json( respuesta.getRespuesta() )
    }

}


module.exports = controller