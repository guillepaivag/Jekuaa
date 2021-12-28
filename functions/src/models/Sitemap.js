const db = require("../../db")

class Sitemap {
    constructor () {

    }

    static async getReferencias () {
        let listaSitemapRoutes = []
        let snapshots
        let docs

        snapshots = await db.collection('Blogs').get()
        docs = snapshots.docs

        for (let i = 0; i < docs.length; i++) {
            const doc = docs[i]

            listaSitemapRoutes.push({
                tipo: 'blog',
                referencia: doc.data().referencia
            })
        }

        snapshots = await db.collection('Usuarios').get()
        docs = snapshots.docs

        for (let i = 0; i < docs.length; i++) {
            const doc = docs[i]
            listaSitemapRoutes.push({
                tipo: 'usuario',
                referencia: doc.data().nombreUsuario
            })
        }

        return listaSitemapRoutes
    }
}

module.exports = Sitemap