const { request, response } = require('express')
const TurndownService = require('turndown')
const path = require('path')
const fs = require('fs')
const os = require('os')

const middleware = {}

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