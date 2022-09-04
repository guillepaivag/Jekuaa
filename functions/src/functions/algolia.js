const functions = require('firebase-functions')
const admin = require('../../firebase-service')
const algoliasearch = require('algoliasearch')

const config = require('../../config')
const Blog = require('../models/Blogs/Blog')
const CursoBorrador = require('../models/Cursos/curso/CursoBorrador')
const CursoPublicado = require('../models/Cursos/curso/CursoPublicado')
const Usuario = require('../models/Usuarios/Usuario')

const algoliaControllers = {}

const INDEX_NAME_USUARIOS = config.environment.mode === 'production' ? 'prod_usuarios' : 'dev_usuarios'
const INDEX_NAME_BLOGS = config.environment.mode === 'production' ? 'prod_blogs' : 'dev_blogs'
const INDEX_NAME_CURSOS_BORRADOR = config.environment.mode === 'production' ? 'prod_cursos_borrador' : 'dev_cursos_borrador'
const INDEX_NAME_CURSOS_PUBLICADO = config.environment.mode === 'production' ? 'prod_cursos_publicado' : 'dev_cursos_publicado'




algoliaControllers.indexUsuarioAlgolia = 
functions.region('southamerica-east1').firestore.document('Usuarios/{uidUsuario}').onWrite(async ( change, context ) => {
    // "document" will be empty if it's deleted, otherwise, this contains
    // the updated values.
    const document = change.after.exists ? change.after.data() : null
    const oldDocument = change.before.exists ? change.before.data() : null
    
    // Get the document ID. This will be used as the ID for the indexed content.
    const { uidUsuario } = context.params

    // The API ID and key are stored using Cloud Functions config variables.
    // @see https://firebase.google.com/docs/functions/config-env
    const ALGOLIA_APP_ID = config.algolia_service.app_id
    const ALGOLIA_API_KEY = config.algolia_service.api_key

    // Create an Algolia Search API client.
    const client = algoliasearch.default(ALGOLIA_APP_ID, ALGOLIA_API_KEY)
    const index = client.initIndex(INDEX_NAME_USUARIOS)

    async function deleteObject() {
        await index.deleteObject(uidUsuario)

        return true 
    }

    async function saveObject() {
        const usuario = new Usuario(document)
        const datosUsuario = usuario.getUsuario()

        datosUsuario.objectID = datosUsuario.uid
        delete datosUsuario.uid

        if (document.fechaNacimiento) 
            datosUsuario.fechaNacimiento = document.fechaNacimiento.seconds

        await index.saveObject(datosUsuario)

        return true
    }

    if (!document) return await deleteObject()
    else return await saveObject()
    
})


algoliaControllers.indexBlogAlgolia = 
functions.region('southamerica-east1').firestore.document('Blogs/{blogId}').onWrite(async ( change, context ) => {
    // "document" will be empty if it's deleted, otherwise, this contains
    // the updated values.
    const blogNuevo = change.after.exists ? new Blog(change.after.data()) : null
    const blogViejo = change.before.exists ? new Blog(change.before.data()) : null
    
    // Get the document ID. This will be used as the ID for the indexed content.
    const { blogId } = context.params

    // The API ID and key are stored using Cloud Functions config variables.
    // @see https://firebase.google.com/docs/functions/config-env
    const ALGOLIA_APP_ID = config.algolia_service.app_id
    const ALGOLIA_API_KEY = config.algolia_service.api_key

    // Create an Algolia Search API client.
    const client = algoliasearch.default(ALGOLIA_APP_ID, ALGOLIA_API_KEY)
    const index = client.initIndex(INDEX_NAME_BLOGS)
    const indexDisabled = client.initIndex(INDEX_NAME_BLOGS+'_oculto')

    async function deleteObjectFromPublishedIndex() {
        await index.deleteObject(blogId)

        return true 
    }

    async function saveObjectFromPublishedIndex() {
        const datosBlog = blogNuevo.getBlog()

        datosBlog.objectID = datosBlog.uid
        delete datosBlog.uid
        datosBlog.fechaCreacion = blogNuevo.fechaCreacion.seconds
        datosBlog.fechaActualizacion = blogNuevo.fechaActualizacion.seconds
        
        await index.saveObject(datosBlog)

        return true
    }

    async function deleteObjectFromDisabledIndex() {
        await indexDisabled.deleteObject(blogId)

        return true 
    }

    async function saveObjectFromDisabledIndex() {
        const datosBlog = blogNuevo.getBlog()

        datosBlog.objectID = datosBlog.uid
        delete datosBlog.uid
        datosBlog.fechaCreacion = blogNuevo.fechaCreacion.seconds
        datosBlog.fechaActualizacion = blogNuevo.fechaActualizacion.seconds
        
        await indexDisabled.saveObject(datosBlog)

        return true
    }

    const publicadoViejo = blogViejo.publicado && blogViejo.habilitado
    const publicadoNuevo = blogNuevo.publicado && blogNuevo.habilitado

    if ( !blogViejo && blogNuevo ) {
        // Creacion de un objeto
        return await saveObjectFromDisabledIndex()

    } else if ( blogViejo && !blogNuevo ) {
        // Eliminacion de un objeto
        await deleteObjectFromDisabledIndex()
        return await deleteObjectFromPublishedIndex()
    
    } else if ( blogViejo && blogNuevo ) {
        if ( !publicadoViejo && publicadoNuevo ) {
            // Publicacion de algo despublicado
            await deleteObjectFromDisabledIndex()
            return await saveObjectFromPublishedIndex()
        
        } else if ( publicadoViejo && !publicadoNuevo ) {
            // Despublicacion de algo publicado
            await deleteObjectFromPublishedIndex()
            return await saveObjectFromDisabledIndex()
    
        } else {
            if ( publicadoNuevo ) return await saveObjectFromPublishedIndex() 
            else return await saveObjectFromDisabledIndex()
        }
    }
    
})


algoliaControllers.indexCursoBorradorAlgolia = 
functions.region('southamerica-east1').firestore.document('CursosBorrador/{uidCursoBorrador}').onWrite(async ( change, context ) => {
    // "document" will be empty if it's deleted, otherwise, this contains
    // the updated values.
    const document = change.after.exists ? change.after.data() : null
    const oldDocument = change.before.exists ? change.before.data() : null
    
    // Get the document ID. This will be used as the ID for the indexed content.
    const { uidCursoBorrador } = context.params

    // The API ID and key are stored using Cloud Functions config variables.
    // @see https://firebase.google.com/docs/functions/config-env
    const ALGOLIA_APP_ID = config.algolia_service.app_id
    const ALGOLIA_API_KEY = config.algolia_service.api_key

    // Create an Algolia Search API client.
    const client = algoliasearch.default(ALGOLIA_APP_ID, ALGOLIA_API_KEY)
    const index = client.initIndex(INDEX_NAME_CURSOS_BORRADOR)

    async function deleteObject() {
        await index.deleteObject(uidCursoBorrador)

        return true 
    }

    async function saveObject() {
        const cursoBorrador = new CursoBorrador(document)
        const datosCursoBorrador = cursoBorrador.getCursoBorrador()

        datosCursoBorrador.objectID = datosCursoBorrador.uid
        delete datosCursoBorrador.uid
        
        datosCursoBorrador.datosPrecio.descuento ? 
        datosCursoBorrador.datosPrecio.descuento.fechaInicio = datosCursoBorrador.datosPrecio.descuento.fechaInicio.seconds : ''

        datosCursoBorrador.datosPrecio.descuento ? 
        datosCursoBorrador.datosPrecio.descuento.fechaFin = datosCursoBorrador.datosPrecio.descuento.fechaFin.seconds : ''
        
        await index.saveObject(datosCursoBorrador)

        return true
    }

    if (!document) return await deleteObject()
    else return await saveObject()
    
})


algoliaControllers.indexCursoPublicadoAlgolia = 
functions.region('southamerica-east1').firestore.document('CursosPublicado/{uidCursoPublicado}').onWrite(async ( change, context ) => {
    
    try {
        // "document" will be empty if it's deleted, otherwise, this contains
        // the updated values.
        const cursoPublicadoNuevo = change.after.exists ? new CursoPublicado(change.after.data()) : null
        const cursoPublicadoViejo = change.before.exists ? new CursoPublicado(change.before.data()) : null
        
        // Get the document ID. This will be used as the ID for the indexed content.
        const { uidCursoPublicado } = context.params

        // The API ID and key are stored using Cloud Functions config variables.
        // @see https://firebase.google.com/docs/functions/config-env
        const ALGOLIA_APP_ID = config.algolia_service.app_id
        const ALGOLIA_API_KEY = config.algolia_service.api_key

        // Create an Algolia Search API client.
        const client = algoliasearch.default(ALGOLIA_APP_ID, ALGOLIA_API_KEY)
        const index = client.initIndex(INDEX_NAME_CURSOS_PUBLICADO)
        const indexDisabled = client.initIndex(INDEX_NAME_CURSOS_PUBLICADO+'_oculto')

        async function deleteObjectFromPublishedIndex() {
            await index.deleteObject(uidCursoPublicado)

            return true 
        }

        async function saveObjectFromPublishedIndex() {
            const datosCursoPublicado = cursoPublicadoNuevo.getCursoPublicado()
            console.log('datosCursoPublicado', JSON.stringify(datosCursoPublicado))

            datosCursoPublicado.objectID = datosCursoPublicado.uid
            delete datosCursoPublicado.uid

            datosCursoPublicado.datosPrecio.descuento ? 
            datosCursoPublicado.datosPrecio.descuento.fechaInicio = datosCursoPublicado.datosPrecio.descuento.fechaInicio.seconds : ''

            datosCursoPublicado.datosPrecio.descuento ? 
            datosCursoPublicado.datosPrecio.descuento.fechaFin = datosCursoPublicado.datosPrecio.descuento.fechaFin.seconds : ''

            datosCursoPublicado.fechaCreacion ? 
            datosCursoPublicado.fechaCreacion = datosCursoPublicado.fechaCreacion.seconds : ''

            datosCursoPublicado.fechaActualizacion ? 
            datosCursoPublicado.fechaActualizacion = datosCursoPublicado.fechaActualizacion.seconds : ''
            
            await index.saveObject(datosCursoPublicado)

            return true
        }

        async function deleteObjectFromDisabledIndex() {
            await indexDisabled.deleteObject(uidCursoPublicado)

            return true 
        }

        async function saveObjectFromDisabledIndex() {
            const datosCursoPublicado = cursoPublicadoNuevo.getCursoPublicado()
            console.log('datosCursoPublicado', JSON.stringify(datosCursoPublicado))

            datosCursoPublicado.objectID = datosCursoPublicado.uid
            delete datosCursoPublicado.uid

            datosCursoPublicado.datosPrecio.descuento ? 
            datosCursoPublicado.datosPrecio.descuento.fechaInicio = datosCursoPublicado.datosPrecio.descuento.fechaInicio.seconds : ''

            datosCursoPublicado.datosPrecio.descuento ? 
            datosCursoPublicado.datosPrecio.descuento.fechaFin = datosCursoPublicado.datosPrecio.descuento.fechaFin.seconds : ''

            datosCursoPublicado.fechaCreacion ? 
            datosCursoPublicado.fechaCreacion = datosCursoPublicado.fechaCreacion.seconds : ''

            datosCursoPublicado.fechaActualizacion ? 
            datosCursoPublicado.fechaActualizacion = datosCursoPublicado.fechaActualizacion.seconds : ''
            
            await indexDisabled.saveObject(datosCursoPublicado)

            return true
        }

        const publicadoViejo = cursoPublicadoViejo.publicado && cursoPublicadoViejo.habilitado
        const publicadoNuevo = cursoPublicadoNuevo.publicado && cursoPublicadoNuevo.habilitado

        if ( !cursoPublicadoViejo && cursoPublicadoNuevo ) {
            return await saveObjectFromDisabledIndex()
    
        } else if ( cursoPublicadoViejo && !cursoPublicadoNuevo ) {
            await deleteObjectFromDisabledIndex()
            return await deleteObjectFromPublishedIndex()
        
        } else if ( cursoPublicadoViejo && cursoPublicadoNuevo ) {
            if ( !publicadoViejo && publicadoNuevo ) {
                // Publicacion de algo despublicado
                await deleteObjectFromDisabledIndex()
                return await saveObjectFromPublishedIndex()
            
            } else if ( publicadoViejo && !publicadoNuevo ) {
                // Despublicacion de algo publicado
                await deleteObjectFromPublishedIndex()
                return await saveObjectFromDisabledIndex()
        
            } else {
                if ( publicadoNuevo ) return await saveObjectFromPublishedIndex() 
                else return await saveObjectFromDisabledIndex()
            }
        }
        
    } catch (error) {
        console.log(error)
        console.log(JSON.stringify(error))
    }
    
})


module.exports = algoliaControllers