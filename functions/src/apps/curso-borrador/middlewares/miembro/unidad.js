const { request, response } = require("express")
const UnidadBorrador = require("../../../../models/Cursos/unidad/UnidadBorrador")
const generadorDeErroresUnidadBorrador = require('../../../../helpers/generadorDeErroresUnidadBorrador')

const middleware = {}

// VERIFICACIÓN DE DATOS REQUERIDOS
middleware.verificarDatosRequeridosPOST = (req = request, res = response, next) => {
    try {
        const { datos, body, params } = req
        const { uidSolicitante, datosAuthSolicitante } = datos
        const { datosUnidad } = body

        if (!Object.keys(body).length) {
            throw new TypeError('No existen los datos necesarios.')
        }

        if ( !datosUnidad || typeof datosUnidad !== 'object' ) {
            throw new TypeError('No existen los datos necesarios.')
        }
        
        if (!datosUnidad.nombreUnidad) {
            throw new TypeError('No existen el nombre de la unidad.')
        }

        next()
    } catch (error) {
        next(error)
    }
}

middleware.verificarDatosRequeridosPUT = (req = request, res = response, next) => {
    try {
        const { datos, body, params } = req
        const { uidSolicitante, datosAuthSolicitante } = datos
        const { datosUnidad } = body

        if (!Object.keys(body).length) {
            throw new TypeError('No existen los datos necesarios.')
        }

        if ( !datosUnidad || typeof datosUnidad !== 'object' ) {
            throw new TypeError('No existen los datos necesarios.')
        }
        
        if (!datosUnidad.nombreUnidad) {
            throw new TypeError('No existen el nombre de la unidad.')
        }

        next()
    } catch (error) {
        next(error)
    }
}



// VERIFICACIÓN DE TIPOS DE DATOS
middleware.verificadorDeTipoDeDatosPOST = (req = request, res = response, next) => {
    try {
        const { datos, body, params } = req
        const { uidSolicitante, datosAuthSolicitante } = datos
        const { datosUnidad } = body
        
        if ( typeof datosUnidad.nombreUnidad !== 'string' ) 
            throw new TypeError('El nombre de unidad debe ser string.', 'middleware/curso/unidad/borrador.js')

        next()
    } catch (error) {
        next(error)
    }
}

middleware.verificadorDeTipoDeDatosPUT = (req = request, res = response, next) => {
    try {
        const { datos, body, params } = req
        const { uidSolicitante, datosAuthSolicitante } = datos
        const { datosUnidad } = body
        
        if ( typeof datosUnidad.nombreUnidad !== 'string' ) 
            throw new TypeError('El nombre de unidad debe ser string.', 'middleware/curso/unidad/borrador.js')

        next()
    } catch (error) {
        next(error)
    }
}

// VERIFICACIÓN DE VALIDEZ DE DATOS
middleware.verificadorDeDatosPOST = (req = request, res = response, next) => {
    try {
        const { datos, body, params } = req
        const { uidSolicitante, datosAuthSolicitante } = datos
        const { datosUnidad } = body

        let valido = datosUnidad.nombreUnidad.length >= 1
        valido = valido && datosUnidad.nombreUnidad.length <= 60
        
        if ( !valido ) {
            throw new TypeError('El nombre de unidad debe tener entre 1 y 60 caracteres.')
        }

        next()
    } catch (error) {
        next(error)
    }
}

middleware.verificadorDeDatosPUT = (req = request, res = response, next) => {
    try {
        const { datos, body, params } = req
        const { uidSolicitante, datosAuthSolicitante } = datos
        const { datosUnidad } = body

        let valido = datosUnidad.nombreUnidad.length >= 1
        valido = valido && datosUnidad.nombreUnidad.length <= 60
        
        if ( !valido ) {
            throw new TypeError('El nombre de unidad debe tener entre 1 y 60 caracteres.')
        }

        next()
    } catch (error) {
        next(error)
    }
}

// CONSTRUCCIÓN DE DATOS
middleware.construirDatosUnidadBorradorPOST = async (req = request, res = response, next) => {
    try {
        const { datos, body, params } = req
        const { uidSolicitante, datosAuthSolicitante } = datos
        const { datosUnidad } = body
        
        const ultimaUnidad = await UnidadBorrador.obtenerUltimaUnidadPorCurso(params.uidCurso)
        
        const siguienteNumeroUnidad = ultimaUnidad ? ultimaUnidad.ordenUnidad + 1 : 1

        req.body.datosUnidad.nombreUnidad = datosUnidad.nombreUnidad.trim()
        req.body.datosUnidad.ordenUnidad = siguienteNumeroUnidad
        req.body.datosUnidad.estadoDocumento = 'nuevo'

        const unidadBorrador = new UnidadBorrador( req.body.datosUnidad )
        const mensajesError = await generadorDeErroresUnidadBorrador(unidadBorrador)

        req.body.datosUnidad.mensajesError = mensajesError
        req.body.datosUnidad.contieneErrores = !!mensajesError.length

        next()
    } catch (error) {
        next(error)
    }
}

middleware.construirDatosUnidadBorradorPUT = async (req = request, res = response, next) => {
    try {
        const { datos, body, params } = req
        const { uidSolicitante, datosAuthSolicitante } = datos
        const { datosUnidad } = body

        req.body.datosUnidad.nombreUnidad = datosUnidad.nombreUnidad.trim()

        next()
    } catch (error) {
        next(error)
    }
}

middleware.verificacionDeEstadoDocumentoPUT = async (req = request, res = response, next) => {
    try {
        const { datos, body, params } = req
        const { uidSolicitante, datosAuthSolicitante } = datos
        const { datosUnidad } = body

        if ( req.originalUrl.includes('actualizarUnidadBorrador') ) {
            const unidadBorrador = new UnidadBorrador()
            await unidadBorrador.importarUnidadPorUID(params.uidCurso, 
                params.uidUnidad)

            if ( unidadBorrador.estadoDocumento === '' ) 
                req.body.datosUnidad.estadoDocumento = 'actualizado'
            else if ( unidadBorrador.estadoDocumento === 'nuevo' ) 
                return next()
            else if ( unidadBorrador.estadoDocumento === 'actualizado' ) 
                return next()
            
        } else if ( req.originalUrl.includes('actualizarOrdenUnidadBorrador') ) {
            const uidUnidades = Object.keys(datosUnidad)
            for (let i = 0; i < uidUnidades.length; i++) {
                const uidUnidad = uidUnidades[i]
                
                const unidadBorrador = new UnidadBorrador()
                await unidadBorrador.importarUnidadPorUID(params.uidCurso, 
                    uidUnidad)
                
                if ( unidadBorrador.estadoDocumento === '' ) 
                    req.body.datosUnidad[uidUnidad].estadoDocumento = 'actualizado'
                else if ( unidadBorrador.estadoDocumento === 'nuevo' ) 
                    return next()
                else if ( unidadBorrador.estadoDocumento === 'actualizado' ) 
                    return next()
            }
        }

        next()
    } catch (error) {
        next(error)
    }
}

// PERMISO PARA UNIDAD BORRADOR


module.exports = middleware