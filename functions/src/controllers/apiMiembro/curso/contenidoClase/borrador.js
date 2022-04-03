const fs = require('fs')
const { request, response } = require("express")

const Respuesta = require("../../../../models/Respuesta")
const manejadorErrores = require('../../../../helpers/ManejoErrores')
const Errores = require('../../../../models/Error/Errores')
const ClaseBorrador = require('../../../../models/Cursos/clase/ClaseBorrador')
const ContenidoClaseBorrador = require('../../../../models/Cursos/contenidoClase/ContenidoClaseBorrador')

const controller = {}

controller.agregarContenidoClaseVideoBorrador = async (req = request, res = response) => {
    try {
        const { datos, body, params, files } = req
        const { uidSolicitante, datosAuthSolicitante } = datos
        const { datosActualizados } = body
        const { documentoContenidoClase, documentoClase } = datosActualizados

        const respuesta = new Respuesta()
        let codigo = 'exito'
        
        const file = files[0]

        // duration
        // resolution
        // width
        // height
        // sample_aspect_ratio
        // display_aspect_ratio

        // uid,
        // tipoContenido,
        // videoData,
        // size,               // mb
        // fileName, 
        // fileExtension, 
        // mimeType,
        // encoding,
        // fechaActualizacion,

        // Agregar el archivo contenido clase
        ContenidoClaseBorrador.subirContenido({
            esVideo: true,
            uidCurso: params.uidCurso,
            uidClase: params.uidClase,
            fileData: {
                rutaArchivoTemp: file.filePath, 
                extensionArchivo: file.fileExtension
            }
        }).then(response => {
            // Eliminar archivo temp
            fs.unlink(file.filePath, (err => {
                if ( err ) {
                    throw new Errores({
                        codigo: 'error/usuario_mala_solicitud',
                        mensaje: 'Error al eliminar el archivo temporal.',
                        resultado: err
                    })
                }
            }))
        })
        
        // Actualizar el documento contenido clase
        ContenidoClaseBorrador.actualizarDocumento(uidSolicitante,
            params.uidCurso,
            params.uidClase,
            documentoContenidoClase)
        
        // Actualizar el documento clase
        ClaseBorrador.actualizar(uidSolicitante, 
            params.uidCurso,
            params.uidUnidad,
            params.uidClase, 
            documentoClase)

        // Retornar respuesta
        respuesta.setRespuestaPorCodigo(codigo, {
            mensaje: '¡Se agrego un contenido a una clase!',
            resultado: null
        })
        const status = respuesta.getStatusCode()
        
        return res.status( status ).json( respuesta.getRespuesta() )
    } catch (error) {
        console.log('Error - agregarContenidoClaseVideo: ', error)

        const {
            status,
            respuesta
        } = manejadorErrores( error )

        return res.status( status ).json( respuesta )
    }
}



controller.agregarContenidoClaseArticuloBorrador = async (req = request, res = response) => {
    try {
        const { datos, body, params } = req
        const { uidSolicitante, datosAuthSolicitante } = datos
        const { uidCurso, uidUnidad, uidClase } = params
        const { rutaArchivoTemp } = body

        const respuesta = new Respuesta()
        let codigo = 'exito'
        
        // Agregar el archivo contenido clase
        ContenidoClaseBorrador.subirContenido({
            verificacion: true,
            uidCurso: uidCurso,
            uidClase: uidClase,
            fileData: {
                nombreArchivo: 'articulo.md',
                rutaArchivoTemp: rutaArchivoTemp,
                extensionArchivo: 'md'
            }
        }).then(response => {
            // Eliminar archivo temp
            fs.unlink(rutaArchivoTemp, (err => {
                if ( err ) {
                    throw new Errores({
                        codigo: 'error/usuario_mala_solicitud',
                        mensaje: 'Error al eliminar el archivo temporal.',
                        resultado: err
                    })
                }
            }))
        })

        // Retornar respuesta
        respuesta.setRespuestaPorCodigo(codigo, {
            mensaje: '¡Se agrego un contenido a una clase!',
            resultado: null
        })
        const status = respuesta.getStatusCode()
        
        return res.status( status ).json( respuesta.getRespuesta() )
    } catch (error) {
        console.log('Error - agregarContenidoClaseArticulo: ', error)

        const {
            status,
            respuesta
        } = manejadorErrores( error )

        return res.status( status ).json( respuesta )
    }
}



controller.eliminarContenidoClaseBorrador = async (req = request, res = response) => {
    try {
        const { datos, body, params } = req
        const { uidSolicitante, datosAuthSolicitante } = datos

        const respuesta = new Respuesta()
        let codigo = 'exito'

        const contenidoClaseBorrador = new ContenidoClaseBorrador()
        const existe = await contenidoClaseBorrador.importarContenidoClasePorUID(params.uidCurso,
            params.uidClase)

        if (!existe) {
            throw new Errores({
                codigo: 'error/usuario_mala_solicitud',
                mensaje: 'No existe esta clase.',
            })
        }

        if (contenidoClaseBorrador.estadoArchivo !== '') {
            throw new Errores({
                codigo: 'error/usuario_mala_solicitud',
                mensaje: 'Se esta subiendo o procesando un contenido para esta clase, intentelo más tarde.',
            })
        }
        
        // Eliminar el archivo en cloud storage
        ContenidoClaseBorrador.eliminarContenido({
            verificacion: false,
            uidCurso: params.uidCurso,
            uidClase: params.uidClase
        })

        // Actualizar por defecto el documento contenido clase
        const documentoContenidoClase = {
            tipoContenido: '',
            videoData: null,
            size: 0,
            fileName: '', 
            fileExtension: '', 
            mimeType: '',
            encoding: '',
            fechaActualizacion: null,
            estadoArchivo: '',
            estadoDocumento: contenidoClaseBorrador.estadoDocumento === 'nuevo' ? 'nuevo' : 'actualizado',
            mensajesError: [],
            contieneErrores: false,
        }
        ContenidoClaseBorrador.actualizarDocumento(params.uidCurso,
            params.uidClase,
            documentoContenidoClase)


        // Actualizar el campo "tipoClase" del documento clase vacio
        const documentoClase = {
            duracion: 0,
            tipoClase: ''
        }
        ClaseBorrador.actualizar(params.uidCurso,
            params.uidUnidad,
            params.uidClase, 
            documentoClase)


        // Retornar respuesta
        respuesta.setRespuestaPorCodigo(codigo, {
            mensaje: '¡Se eliminó un contenido!',
            resultado: null
        })
        const status = respuesta.getStatusCode()
        
        return res.status( status ).json( respuesta.getRespuesta() )
    } catch (error) {
        console.log('Error - eliminarContenidoClase: ', error)

        const {
            status,
            respuesta
        } = manejadorErrores( error )

        return res.status( status ).json( respuesta )
    }
}



controller.obtenerUrlVideoClaseBorrador = async (req = request, res = response) => {
    
    try {
        const { datos, body, params } = req
        const { uidSolicitante, datosAuthSolicitante } = datos
        const { uidCurso, uidClase } = params

        const respuesta = new Respuesta()
        let codigo = 'exito'
        
        const url = await ContenidoClaseBorrador.generarUrlVideoClase({
            verificacion: false,
            uidCurso: uidCurso,
            uidClase: uidClase
        })

        // Retornar respuesta
        respuesta.setRespuestaPorCodigo(codigo, {
            mensaje: '¡Se generó la url del video!',
            resultado: url
        })
        const status = respuesta.getStatusCode()
        
        return res.status( status ).json( respuesta.getRespuesta() )
    } catch (error) {
        console.log('Error - obtenerUrlVideoClaseBorrador: ', error)

        const {
            status,
            respuesta
        } = manejadorErrores( error )

        return res.status( status ).json( respuesta )
    }

}




controller.obtenerArticuloClaseBorrador = async (req = request, res = response) => {

    try {
        const { datos, body, params } = req
        const { uidSolicitante, datosAuthSolicitante } = datos
        const { uidCurso, uidClase } = params

        const respuesta = new Respuesta()
        let codigo = 'exito'
        
        const articulo = await ContenidoClaseBorrador.obtenerArticuloClase({
            verificacion: false,
            uidCurso: uidCurso,
            uidClase: uidClase,
            getMarkdown: false
        })

        // Retornar respuesta
        respuesta.setRespuestaPorCodigo(codigo, {
            mensaje: '¡Se generó el articulo de la clase!',
            resultado: articulo
        })
        const status = respuesta.getStatusCode()
        
        return res.status( status ).json( respuesta.getRespuesta() )
    } catch (error) {
        console.log('Error - obtenerUrlVideoClaseBorrador: ', error)

        const {
            status,
            respuesta
        } = manejadorErrores( error )

        return res.status( status ).json( respuesta )
    }

}

module.exports = controller