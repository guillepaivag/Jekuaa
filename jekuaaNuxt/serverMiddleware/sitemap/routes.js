const { Router } = require('express')
const router = Router()
const axios = require('axios')

const { generateSitemap } = require('./parser')

router.get('/.xml', async function (req, res, next) {
  try {
    const baseURLJekuaapy = 'https://jekuaapy.com'
    const baseURL = process.env.NODE_ENV === 'production' ? 
    'https://southamerica-east1-jekuaa-py.cloudfunctions.net/apiJekuaa' : 
    'http://localhost:5001/jekuaa-py/southamerica-east1/apiJekuaa'

    const response = await axios.default.post(`${baseURL}/sitemap/getSitemapRoutes`, {}, {
      headers: {
        'Content-Type': 'application/json',
      }
    })
    const array = response.data.resultado

    const sitemapIndex = [
      {
        loc: `${baseURLJekuaapy}/`,
        lastmod: new Date().toISOString(),
        changefreq: 'daily',
        priority: 0.5,
      }, 
      {
        loc: `${baseURLJekuaapy}/autenticacion/inicioSesion/`,
        lastmod: new Date().toISOString(),
        changefreq: 'weekly',
        priority: 0.5,
      },
      {
        loc: `${baseURLJekuaapy}/autenticacion/registro/`,
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
        ruta = ruta + ''
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
    res.send(
      generateSitemap(sitemapIndex, `https://${req.headers.host}`)
    )

  } catch (e) {
    next(e)
  }
})

module.exports = router