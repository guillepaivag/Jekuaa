const generateSitemap = require('../helpers/generateSitemap')
const Sitemap = require('../models/Sitemap')

const middleware = {}

middleware.isSitemap = async (req, res, next) => {
    try {
        const esSitemap = req.originalUrl.split('/')[1] === 'sitemap.xml'

        if (!esSitemap) {
            return next()
        }

        const baseURLJekuaapy = 'https://jekuaapy.com'
  
        const array = await Sitemap.getReferencias()
    
        const sitemapIndex = [
            {
                loc: `${baseURLJekuaapy}/`,
                lastmod: new Date().toISOString(),
                changefreq: 'daily',
                priority: 0.5,
            }, 
            {
                loc: `${baseURLJekuaapy}/inicio/`,
                lastmod: new Date().toISOString(),
                changefreq: 'daily',
                priority: 0.5,
            }, 
            {
                loc: `${baseURLJekuaapy}/inicioSesion/`,
                lastmod: new Date().toISOString(),
                changefreq: 'weekly',
                priority: 0.5,
            },
            {
                loc: `${baseURLJekuaapy}/registro/`,
                lastmod: new Date().toISOString(),
                changefreq: 'weekly',
                priority: 0.5,
            },
            {
                loc: `${baseURLJekuaapy}/blogs/`,
                lastmod: new Date().toISOString(),
                changefreq: 'daily',
                priority: 0.5,
            },
        ]
        
        let sitemaps2 = array.map((element) => {
            let tipo = element.tipo
            let ruta = `${baseURLJekuaapy}`
            if (tipo === 'blog') {
                ruta = ruta + '/blog'
            } else if (tipo === 'usuario') {
                ruta = ruta + '/estudiante'
            }
    
            return {
                loc: `${ruta}/${element.referencia}`,
                lastmod: new Date().toISOString(),
                changefreq: 'daily',
                priority: 0.5,
            }
        })
    
        sitemapIndex.push(...sitemaps2)
    
        res.setHeader('Content-Type', 'application/xml')
        return res.send( generateSitemap(sitemapIndex, `https://${req.headers.host}`) )

    } catch (error) {
        next(error)
    }
}

module.exports = middleware