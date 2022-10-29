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

        console.log('articulo', articulo)

        let turndownService = new TurndownService({
            headingStyle: 'setext',
            hr: '* * *',
            bulletListMarker: '*',
            codeBlockStyle: 'fenced',
            fence: '```',
            emDelimiter: '_',
            strongDelimiter: '**',
            linkStyle: 'inlined',
            linkReferenceStyle: 'full',
            br: '  ',
            blankReplacement: function (content, node) {
                return node.isBlock ? '\n\n' : ''
            },
            keepReplacement: function (content, node) {
                return node.isBlock ? '\n\n' + node.outerHTML + '\n\n' : node.outerHTML
            },
            defaultReplacement: function (content, node) {
                return node.isBlock ? '\n\n' + content + '\n\n' : content
            }
        })

        let markdown = turndownService.turndown(articulo)
        console.log('markdown', markdown)

        // Crear archivo Markdown
        fs.writeFileSync(rutaArchivoTemp, markdown, 'utf8')

        req.body.rutaArchivoTemp = rutaArchivoTemp

        next()
    } catch (error) {
        next(error)
    }
}



module.exports = middleware