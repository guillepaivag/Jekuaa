const admin = require('../../../../firebase-service')
const db = require('../../../../db')
const MiembroJekuaa = require('../../../models/TiposUsuarios/MiembroJekuaa')
const utilsRoles = require('../../../utils/usuarios/RolesSecciones')
const Usuario = require('../../../models/Usuario')
const timestamp = require('../../../utils/Timestamp')
const Respuesta = require('../../../models/Respuesta')
const manejadorErrores = require('../../../models/Error/ManejoErrores/ManejadorErrores')
const ErrorJekuaa = require('../../../models/Error/ErroresJekuaa')
const controller = {}

controller.obtenerDatosRoles = async (req, res) => {
    try {
        const { jekuaaDatos } = req
        const { uidSolicitante, datosAuthSolicitante } = jekuaaDatos

        const respuesta = new Respuesta()
        let codigo = 'jekuaa/exito'

        const resultado = utilsRoles.getDatosRoles()

        respuesta.setRespuestaPorCodigo(codigo, {
            mensaje: 'Datos de roles enviado con exito!',
            resultado
        })
        const status = respuesta.getStatusCode()
        
        return res.status( status ).json( respuesta.getRespuesta() )
    } catch (error) {
        console.log('Error - obtenerDatosRoles: ', error)

        const {
            status,
            respuesta
        } = manejadorErrores( error )

        return res.status( status ).json( respuesta )
    }
}

controller.obtenerDatosSecciones = async (req, res) => {
    try {
        const { jekuaaDatos } = req
        const { uidSolicitante, datosAuthSolicitante } = jekuaaDatos

        const respuesta = new Respuesta()
        let codigo = 'jekuaa/exito'

        const resultado = utilsRoles.getDatosSecciones()

        respuesta.setRespuestaPorCodigo(codigo, {
            mensaje: 'Se obtuvo los datos de las secciones con exito!',
            resultado
        })
        const status = respuesta.getStatusCode()
        
        return res.status( status ).json( respuesta.getRespuesta() )
    } catch (error) {
        console.log('Error - obtenerDatosSecciones: ', error)

        const {
            status,
            respuesta
        } = manejadorErrores( error )

        return res.status( status ).json( respuesta )
    }
}

controller.obtenerSecciones = async (req, res) => {
    try {
        const { jekuaaDatos } = req
        const { uidSolicitante, datosAuthSolicitante } = jekuaaDatos

        const respuesta = new Respuesta()
        let codigo = 'jekuaa/exito'

        const resultado = utilsRoles.getSeccionesValidas()

        respuesta.setRespuestaPorCodigo(codigo, {
            mensaje: 'Lista de secciones validas obtenidas con exito!',
            resultado
        })
        const status = respuesta.getStatusCode()
        
        return res.status( status ).json( respuesta.getRespuesta() )
    } catch (error) {
        console.log('Error - obtenerSecciones: ', error)

        const {
            status,
            respuesta
        } = manejadorErrores( error )

        return res.status( status ).json( respuesta )
    }
}

controller.obtenerCategoriasPorSeccion = async (req, res) => {
    try {
        const { jekuaaDatos, params } = req
        const { seccion } = params
        const { uidSolicitante, datosAuthSolicitante } = jekuaaDatos

        const respuesta = new Respuesta()
        let codigo = 'jekuaa/exito'

        // Verificar que la sección exista
        if ( !seccion ) {
            throw new ErrorJekuaa({
                codigo: 'jekuaa/error/usuario_mala_solicitud',
                mensaje: `No hay sección que buscar.`
            })
        }

        const seccionValida = utilsRoles.sonValidasLasSecciones([seccion])
        if ( !seccionValida ) {
            throw new ErrorJekuaa({
                codigo: 'jekuaa/error/usuario_mala_solicitud',
                mensaje: `No existe la sección ${seccion}.`
            })
        }

        // Obtener las categorias de la sección
        const resultado = utilsRoles.categoriasPorSeccion( seccion )

        respuesta.setRespuestaPorCodigo(codigo, {
            mensaje: `Se obtuvo las categorias de la sección: ${seccion}`,
            resultado
        })
        const status = respuesta.getStatusCode()
        
        return res.status( status ).json( respuesta.getRespuesta() )
    } catch (error) {
        console.log('Error - obtenerCategoriasPorSeccion: ', error)

        const {
            status,
            respuesta
        } = manejadorErrores( error )

        return res.status( status ).json( respuesta )
    }
}

controller.obtenerSubcategoriasPorSeccionCategoria = async (req, res) => {
    try {
        const { jekuaaDatos, params } = req
        const { seccion, categoria } = params
        const { uidSolicitante, datosAuthSolicitante } = jekuaaDatos

        const respuesta = new Respuesta()
        let codigo = 'jekuaa/exito'

        // Verificar que la sección exista
        if ( !seccion ) {
            throw new ErrorJekuaa({
                codigo: 'jekuaa/error/usuario_mala_solicitud',
                mensaje: `No hay sección que buscar.`
            })
        }

        const seccionValida = utilsRoles.sonValidasLasSecciones([seccion])
        if ( !seccionValida ) {
            throw new ErrorJekuaa({
                codigo: 'jekuaa/error/usuario_mala_solicitud',
                mensaje: `No existe la sección ${seccion}.`
            })
        }

        // Verificar que la sección exista
        if ( !categoria ) {
            throw new ErrorJekuaa({
                codigo: 'jekuaa/error/usuario_mala_solicitud',
                mensaje: `No hay categoria que buscar.`
            })
        }

        const categoriaValida = utilsRoles.sonValidasLasCategorias( seccion, [categoria] )
        if ( !categoriaValida ) {
            throw new ErrorJekuaa({
                codigo: 'jekuaa/error/usuario_mala_solicitud',
                mensaje: `No existe la categoria: ${categoria}.`
            })
        }

        const resultado = utilsRoles.subcategoriasPorSeccionCategoria( seccion, categoria )

        respuesta.setRespuestaPorCodigo(codigo, {
            mensaje: `Se obtuvo las subcategorias de la sección *${seccion}* y categoria *${categoria}*.`,
            resultado
        })
        const status = respuesta.getStatusCode()
        
        return res.status( status ).json( respuesta.getRespuesta() )
    } catch (error) {
        console.log('Error - obtenerDatosRoles: ', error)

        const {
            status,
            respuesta
        } = manejadorErrores( error )

        return res.status( status ).json( respuesta )
    }
}

module.exports = controller