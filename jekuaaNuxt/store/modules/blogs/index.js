const collectionName = 'Blogs'

export const state = {

}


export const getters = {

}


export const actions = {
    async paginarBlogs ({dispatch}, data) {
        const { ultimaUID, filtros, esRutaEstudiante, } = data
        const db = this.$firebase.firestore()

        let ref = db.collection(collectionName)
        ref = await dispatch('filtrar', { ref, filtros, esRutaEstudiante })
        ref = ref.orderBy('uid').limit( 5 )
        if (ultimaUID) ref = ref.startAfter(ultimaUID)

        const documentSnapshots = await ref.get()
        
        if (!documentSnapshots.docs.length) throw new Error('No hay blogs')

        let ultimoDocumento = documentSnapshots.docs[documentSnapshots.docs.length-1]
        
        let blogs = []
        for (let i = 0; i < documentSnapshots.docs.length; i++) {
            const element = documentSnapshots.docs[i]
            blogs.push( element.data() )
        }

        const existeMasDatos = blogs.length ? 
        await dispatch('verificarSiHayMasDatos', { 
            ultimaUID: ultimoDocumento.id, 
            filtros, 
            esRutaEstudiante 
        }) : false
        
        return {
            blogs,
            ultimaUID: ultimoDocumento.id,
            existeMasDatos,
        }
    },
    filtrar({}, data) {
        let { ref, filtros, esRutaEstudiante } = data

        if ( esRutaEstudiante ) 
            ref = ref.where('habilitado', '==', true).where('publicado', '==', true)

        if (!filtros || typeof filtros !== 'object') 
            filtros = {}

        const {
            seccion, categoria, subCategorias,
            publicador, habilitado, publicado,
            revision,
        } = filtros

        if ( seccion ) {
            ref = ref.where('seccion', '==', seccion)
        }
        if ( categoria ) {
            ref = ref.where('categoria', '==', categoria)
        }
        if ( subCategorias && subCategorias.length ) {
            ref = ref.where('subCategorias', 'array-contains-any', subCategorias)
        }
        if ( publicador ) {
            ref = ref.where('publicador', '==', publicador)
        }

        if ( !esRutaEstudiante && habilitado !== undefined ) {
            ref = ref.where('habilitado ', '==', habilitado)
        }
        if ( !esRutaEstudiante && publicado !== undefined ) {
            ref = ref.where('publicado ', '==', publicado)
        }
        if ( !esRutaEstudiante && revision !== undefined ) {
            ref = ref.where('revision  ', '==', revision )
        }

        return ref
    },
    async verificarSiHayMasDatos ({dispatch}, data) {
        let { ultimaUID, filtros, esRutaEstudiante, } = data

        const db = this.$firebase.firestore()
        let ref = db.collection(collectionName)
        ref = await dispatch('filtrar', { ref, filtros, esRutaEstudiante })
        ref = ref.orderBy('uid').startAfter(ultimaUID).limit(1)
        const siguienteDato = await ref.get()
        const existeMasDatos = !siguienteDato.empty

        return existeMasDatos
    }
}


export const mutations = {}
