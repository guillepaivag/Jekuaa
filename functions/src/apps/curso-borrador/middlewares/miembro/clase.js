const { request, response } = require("express")
const db = require('../../../../../db')
const ClaseBorrador = require("../../../../models/Cursos/clase/ClaseBorrador")
const generadorDeErroresClaseBorrador = require('../../../../helpers/generadorDeErroresClaseBorrador')

const borrador = {}



// VERIFICACIÓN DE DATOS REQUERIDOS
borrador.verificarDatosRequeridosPOST = (req = request, res = response, next) => {
    try {
        const { datos, body } = req
        const { uidSolicitante, datosAuthSolicitante } = datos
        const { datosClase } = body

        if (!Object.keys(body).length) {
            throw new TypeError('No existen los datos necesarios.')
        }

        if ( !datosClase || typeof datosClase !== 'object' ) {
            throw new TypeError('No existen los datos necesarios.')
        }

        const {
            titulo,
        } = datosClase

        if ( !titulo.trim() ) {
            throw new TypeError('El titulo de la clase debe existir.')
        }

        next()
    } catch (error) {
        next(error)
    }
}

borrador.verificarDatosRequeridosPUT = (req = request, res = response, next) => {
    try {
        const { datos, body, params } = req
        const { uidSolicitante, datosAuthSolicitante } = datos
        const { datosClase } = body

        if (!Object.keys(body).length) {
            throw new TypeError('No existen los datos necesarios.')
        }

        if ( !datosClase || typeof datosClase !== 'object' ) {
            throw new TypeError('No existen los datos necesarios.')
        }

        if (!Object.keys(datosClase).length) {
            throw new TypeError('No existen los datos necesarios.')
        }

        next()
    } catch (error) {
        next(error)
    }
}



// VERIFICACIÓN DE TIPOS DE DATOS
borrador.verificadorDeTipoDeDatosPOST = (req = request, res = response, next) => {
    try {
        const { datos, body } = req
        const { uidSolicitante, datosAuthSolicitante } = datos
        const { datosClase } = body

        const {
            titulo,
        } = datosClase

        if ( typeof titulo !== 'string' ) {
            throw new TypeError('El titulo de la clase debe ser String.')
        }

        next()
    } catch (error) {
        next(error)
    }
}

borrador.verificadorDeTipoDeDatosPUT = (req = request, res = response, next) => {
    try {
        const { datos, body, params } = req
        const { uidSolicitante, datosAuthSolicitante } = datos
        const { datosClase } = body

        const {
            titulo,
            descripcion,
            vistaPrevia
        } = datosClase

        
        if ( titulo && typeof titulo !== 'string' ) {
            throw new TypeError('El titulo de la clase debe ser String.')
        }

        if ( descripcion && typeof descripcion !== 'string' ) {
            throw new TypeError('La descripción de la clase debe ser String.')
        }

        if ( vistaPrevia && typeof vistaPrevia !== 'boolean' ) {
            throw new TypeError('La descripción de la clase debe ser String.')
        }

        next()

    } catch (error) {
        next(error)
    }
}



// VERIFICACIÓN DE VALIDEZ DE DATOS
borrador.verificadorDeDatosPOST = async (req = request, res = response, next) => {
    try {
        const { datos, body } = req
        const { uidSolicitante, datosAuthSolicitante } = datos
        const { datosClase } = body

        const {
            titulo,
        } = datosClase

        // Titulo
        if ( titulo.trim().length < 1 ) {
            throw new TypeError('El titulo de la clase debe ser mayor o igual a 10.')
        }
        
        if ( titulo.trim().length > 60 ) {
            throw new TypeError('El titulo de la clase debe ser menor o igual a 60.')
        }

        next()
    } catch (error) {
        next(error)
    }
}

borrador.verificadorDeDatosPUT = async (req = request, res = response, next) => {
    try {
        const { datos, body, params } = req
        const { uidSolicitante, datosAuthSolicitante } = datos
        const { datosClase } = body

        const {
            titulo,
            descripcion,
            vistaPrevia
        } = datosClase

        // Titulo
        if ( titulo ) {
            if ( titulo.trim().length < 1 ) {
                throw new TypeError('El titulo de la clase debe ser mayor o igual a 10.')
            }
            
            if ( titulo.trim().length > 60 ) {
                throw new TypeError('El titulo de la clase debe ser menor o igual a 60.')
            }
        }

        if ( descripcion ) {
            if ( descripcion.trim().length < 10 ) {
                throw new TypeError('La descripción de la clase debe ser mayor o igual a 10.')
            }
            
            if ( descripcion.trim().length > 150 ) {
                throw new TypeError('La descripción de la clase debe ser menor o igual a 150.')
            }
        }
        
        next()

    } catch (error) {
        next(error)
    }
}


// CONSTRUCCIÓN DE DATOS
borrador.construirDatosClaseBorradorPOST = async (req = request, res = response, next) => {
    try {
        const { datos, body, params } = req
        const { uidSolicitante, datosAuthSolicitante } = datos
        const { datosClase } = body

        const {
            titulo,
        } = datosClase

        const claseBorradorUltimaClase = await ClaseBorrador.obtenerUltimaClasePorCursoUnidad(params.uidCurso, 
        params.uidUnidad)

        req.body.datosClase.titulo = titulo.trim()
        req.body.datosClase.ordenClase = claseBorradorUltimaClase ? claseBorradorUltimaClase.ordenClase + 1 : 1
        req.body.datosClase.estadoDocumento = 'nuevo'

        const claseBorrador = new ClaseBorrador( req.body.datosClase )
        const mensajesError = await generadorDeErroresClaseBorrador(claseBorrador)

        req.body.datosClase.mensajesError = mensajesError
        req.body.datosClase.contieneErrores = !!mensajesError.length
        
        next()
    } catch (error) {
        next(error)
    }
}

borrador.construirDatosClaseBorradorPUT = (req = request, res = response, next) => {
    try {
        const { datos, body } = req
        const { uidSolicitante, datosAuthSolicitante } = datos
        const { datosClase } = body

        const {
            titulo,
            descripcion,
            vistaPrevia
        } = datosClase
        
        titulo ? req.body.datosClase.titulo = titulo.trim() : ''
        descripcion ? req.body.datosClase.descripcion = descripcion.trim() : ''
        vistaPrevia !== undefined ? req.body.datosClase.vistaPrevia = vistaPrevia : ''

        next()
    } catch (error) {
        next(error)
    }
}

borrador.verificacionDeEstadoDocumentoPUT = async (req = request, res = response, next) => {
    try {
        const { datos, body, params } = req
        const { uidSolicitante, datosAuthSolicitante } = datos
        const { datosClase } = body

        if ( req.originalUrl.includes('actualizarClaseBorrador') ) {
            const claseBorrador = new ClaseBorrador()
            await claseBorrador.importarClasePorUID(params.uidCurso, 
                params.uidUnidad,
                params.uidClase)

            if ( claseBorrador.estadoDocumento === '' ) 
                req.body.datosClase.estadoDocumento = 'actualizado'
            else if ( claseBorrador.estadoDocumento === 'nuevo' ) 
                return next()
            else if ( claseBorrador.estadoDocumento === 'actualizado' ) 
                return next()
            
        } else if ( req.originalUrl.includes('actualizarOrdenClaseBorrador') ) {
            const uidClases = Object.keys(datosClase)
            for (let i = 0; i < uidClases.length; i++) {
                const uidClase = uidClases[i]
                
                const claseBorrador = new ClaseBorrador()
                await claseBorrador.importarClasePorUID(params.uidCurso, 
                    params.uidUnidad,
                    uidClase)
                
                if ( claseBorrador.estadoDocumento === '' ) 
                    req.body.datosClase[uidClase].estadoDocumento = 'actualizado'
                else if ( claseBorrador.estadoDocumento === 'nuevo' ) 
                    return next()
                else if ( claseBorrador.estadoDocumento === 'actualizado' ) 
                    return next()
            }
        }

        next()
    } catch (error) {
        next(error)
    }
}



// PERMISO PARA CLASE BORRADOR


module.exports = borrador