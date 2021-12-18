const {Router} = require('express')
const router = Router()
const Respuesta = require('../models/Respuesta')

const admin = require('../../firebase-service')

router.post('/getSitemapRoutes', async (req, res) => {
    try {
        const { jekuaaDatos, body, files } = req

        const respuesta = new Respuesta()
        let codigo = 'jekuaa/exito'
        let listaSitemapRoutes = []
        let snapshots
        let docs

        snapshots = await admin.firestore().collection('Blogs').get()
        docs = snapshots.docs

        for (let i = 0; i < docs.length; i++) {
            const doc = docs[i]

            listaSitemapRoutes.push({
                tipo: 'blog',
                referencia: doc.data().referencia
            })
        }

        snapshots = await admin.firestore().collection('Usuarios').get()
        docs = snapshots.docs

        for (let i = 0; i < docs.length; i++) {
            const doc = docs[i]
            listaSitemapRoutes.push({
                tipo: 'usuario',
                referencia: doc.data().nombreUsuario
            })
        }

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