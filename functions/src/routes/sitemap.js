const {Router} = require('express')
const router = Router()
const Respuesta = require('../models/Respuesta')

const Sitemap = require('../models/Sitemap')

router.post('/getSitemapRoutes', async (req, res) => {
    try {
        const { jekuaaDatos, body, files } = req

        const respuesta = new Respuesta()
        let codigo = 'jekuaa/exito'
        
        let listaSitemapRoutes = await Sitemap.getReferencias()

        respuesta.setRespuestaPorCodigo(codigo, {
            mensaje: '¡Datos de sitemaps recuperados!',
            resultado: listaSitemapRoutes
        })
        const status = respuesta.getStatusCode()
        
        return res.status( status ).json( respuesta.getRespuesta() )
        
    } catch (error) {
        console.log('Error - getSitemapRoutes: ', error)

        const {
            status,
            respuesta
        } = manejadorErrores( error )

        return res.status( status ).json( respuesta )
    }
})

module.exports = router