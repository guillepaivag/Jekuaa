const TurndownService = require('turndown')
const path = require('path')
const fs = require('fs')
const os = require('os')

const ClaseBorrador = require("../../../../models/Cursos/clase/ClaseBorrador")
const Errores = require("../../../../models/Error/Errores")
const timestamp = require("../../../../utils/timestamp")
const ContenidoClaseBorrador = require('../../../../models/Cursos/contenidoClase/ContenidoClaseBorrador')
const { request, response } = require('express')

const middleware = {}



middleware.esValidoElContenidoClaseArticulo = async (req, res, next) => {
    try {
        const { datos, body, params } = req
        const { uidSolicitante, datosAuthSolicitante } = datos
        const { uidCurso, uidUnidad, uidClase } = params

        // Verificación de validez de la clase
        const contenidoClaseBorrador = new ContenidoClaseBorrador()
        const existe = await contenidoClaseBorrador.importarContenidoClasePorUID(uidCurso, uidClase)

        if (!existe) {
            throw new Errores({
                codigo: 'error/usuario_mala_solicitud',
                mensaje: 'No existe esta clase.'
            })
        }
        
        if (contenidoClaseBorrador.estadoArchivo === 'procesando') {
            throw new Errores({
                codigo: 'error/usuario_mala_solicitud',
                mensaje: 'Hay un contenido para esta clase que ya se está procesando.'
            })
        }

        next()
    } catch (error) {
        next(error)
    }
}







middleware.construirElContenidoClaseArticulo = async (req, res, next) => {
    try {
        const { datos, body, params } = req
        const { uidSolicitante, datosAuthSolicitante } = datos
        const { uidCurso, uidUnidad, uidClase } = params
        const { articulo } = body

        // Pasar de HTML a Markdown
        const nombreBlogTemp = 'articulo.md'
        const rutaArchivoTemp = path.join(os.tmpdir(), nombreBlogTemp)

        let turndownService = new TurndownService()
        let markdown = turndownService.turndown(articulo)

        // Crear archivo Markdown
        fs.writeFileSync(rutaArchivoTemp, markdown)

        req.body.rutaArchivoTemp = rutaArchivoTemp

        next()
    } catch (error) {
        next(error)
    }
}



module.exports = middleware