const { request, response } = require("express")
const db = require("../../../../db")

const Errores = require("../../../models/Error/Errores")
const esReferenciaBlog = require("../utils/esReferenciaBlog")

const middlewares = {}

// VERIFICACIÓN DE DATOS REQUERIDOS
middlewares.verificardatosRequeridosPOST = (req = request, res = response, next) => {
    try {
        const { datos, body } = req
        const { uidSolicitante, datosAuthSolicitante } = datos

        if (!body) {
            throw new Errores({
                codigo: 'error/usuario_mala_solicitud',
                mensaje: 'Se necesita datos.',
            })
        }

        const { responsable, referenciaUrl, nombreInstitucion, descripcion } = body

        if ( !Object.keys(body).length ) {
            throw new Errores({
                codigo: 'error/usuario_mala_solicitud',
                mensaje: 'Se necesita datos.',
            })
        }

        if ( !responsable ) {
            throw new Errores({
                codigo: 'error/usuario_mala_solicitud',
                mensaje: 'Se necesita responsable de la institución.',
            })
        }

        if ( !referenciaUrl ) {
            throw new Errores({
                codigo: 'error/usuario_mala_solicitud',
                mensaje: 'Se necesita referencia de url.',
            })
        }

        if ( !nombreInstitucion ) {
            throw new Errores({
                codigo: 'error/usuario_mala_solicitud',
                mensaje: 'Se necesita nombre de institución.',
            })
        }

        if ( !descripcion ) {
            throw new Errores({
                codigo: 'error/usuario_mala_solicitud',
                mensaje: 'Se necesita descripción',
            })
        }

        next()
    } catch (error) {
        next(error)
    }
} 

middlewares.verificardatosRequeridosPUT = (req = request, res = response, next) => {
    try {
        const { datos, body, params } = req
        const { uid } = params
        const { uidSolicitante, datosAuthSolicitante } = datos

        if ( !body || !Object.keys(body).length ) {
            throw new Errores({
                codigo: 'error/usuario_mala_solicitud',
                mensaje: 'Se necesita datos.',
            })
        }

        if ( !uid ) {
            throw new Errores({
                codigo: 'error/usuario_mala_solicitud',
                mensaje: 'Se necesita una institución.',
            })
        }

        next()
    } catch (error) {
        next(error)
    }
} 



// VERIFICACIÓN DE TIPOS DE DATOS
middlewares.verificarTiposDeDatosPOST = (req = request, res = response, next) => {
    try {
        const { datos, body } = req
        const { uidSolicitante, datosAuthSolicitante } = datos

        const { responsable, referenciaUrl, nombreInstitucion, descripcion } = body

        if ( typeof responsable !== 'string' ) {
            throw new Errores({
                codigo: 'error/usuario_mala_solicitud',
                mensaje: 'Responsable debe ser texto.',
            })
        }

        if ( typeof referenciaUrl !== 'string' ) {
            throw new Errores({
                codigo: 'error/usuario_mala_solicitud',
                mensaje: 'Referencia debe ser texto.',
            })
        }

        if ( typeof nombreInstitucion !== 'string' ) {
            throw new Errores({
                codigo: 'error/usuario_mala_solicitud',
                mensaje: 'Nombre de institución debe ser texto.',
            })
        }

        if ( typeof descripcion !== 'string' ) {
            throw new Errores({
                codigo: 'error/usuario_mala_solicitud',
                mensaje: 'Descripción debe ser texto',
            })
        }

        next()
    } catch (error) {
        next(error)
    }
} 

middlewares.verificarTiposDeDatosPUT = (req = request, res = response, next) => {
    try {
        const { datos, body, params } = req
        const { uidSolicitante, datosAuthSolicitante } = datos

        const { responsable, referenciaUrl, nombreInstitucion, descripcion } = body

        if ( typeof responsable !== 'string' ) {
            throw new Errores({
                codigo: 'error/usuario_mala_solicitud',
                mensaje: 'Responsable debe ser texto.',
            })
        }

        if ( typeof referenciaUrl !== 'string' ) {
            throw new Errores({
                codigo: 'error/usuario_mala_solicitud',
                mensaje: 'Referencia debe ser texto.',
            })
        }

        if ( typeof nombreInstitucion !== 'string' ) {
            throw new Errores({
                codigo: 'error/usuario_mala_solicitud',
                mensaje: 'Nombre de institución debe ser texto.',
            })
        }

        if ( typeof descripcion !== 'string' ) {
            throw new Errores({
                codigo: 'error/usuario_mala_solicitud',
                mensaje: 'Descripción debe ser texto',
            })
        }

        next()
    } catch (error) {
        next(error)
    }
}



// VERIFICACIÓN DE VALIDEZ DE DATOS
middlewares.verificarValidezDeDatosPOST = async (req = request, res = response, next) => {
    try {
        const { datos, body } = req
        const { uidSolicitante, datosAuthSolicitante } = datos

        const { responsable, referenciaUrl, nombreInstitucion, descripcion } = body

        if ( responsable ) {
            let correcto = responsable.length >= 1

            if (!correcto) {
                throw new Errores({
                    codigo: 'error/usuario_mala_solicitud',
                    mensaje: 'El campo responsable es incorrecto.',
                })
            }
        }

        if ( referenciaUrl ) {
            let correcto = referenciaUrl.length >= 1 && referenciaUrl.length <= 20
            correcto = correcto && esReferenciaBlog(referenciaUrl)

            const docs = await db.collection('Instituciones').where('referenciaUrl', '==', referenciaUrl).get()
            
            if (!docs.empty) {
                throw new Errores({
                    codigo: 'error/usuario_mala_solicitud',
                    mensaje: 'Ya está en uso la referencia url.',
                })
            }

            if (!correcto) {
                throw new Errores({
                    codigo: 'error/usuario_mala_solicitud',
                    mensaje: 'El campo referenciaUrl es incorrecto.',
                })
            }
        }

        if ( nombreInstitucion ) {
            let correcto = nombreInstitucion.length >= 1 && nombreInstitucion <= 50

            const docs = await db.collection('Instituciones').where('nombreInstitucion', '==', nombreInstitucion).get()
            
            if (!docs.empty) {
                throw new Errores({
                    codigo: 'error/usuario_mala_solicitud',
                    mensaje: 'Ya está en uso este nombre de institución.',
                })
            }

            if (!correcto) {
                throw new Errores({
                    codigo: 'error/usuario_mala_solicitud',
                    mensaje: 'El campo de nombre de institución es incorrecto.',
                })
            }
        }

        if ( descripcion ) {
            let correcto = descripcion.length >= 10 && descripcion.length <= 120

            if (!correcto) {
                throw new Errores({
                    codigo: 'error/usuario_mala_solicitud',
                    mensaje: 'El campo descripción es incorrecto.',
                })
            }
        }

        next()
    } catch (error) {
        next(error)
    }
} 

middlewares.verificarValidezDeDatosPUT = (req = request, res = response, next) => {
    try {
        const { datos, body } = req
        const { uidSolicitante, datosAuthSolicitante } = datos

        const { responsable, referenciaUrl, nombreInstitucion, descripcion } = body

        if ( responsable ) {
            let correcto = responsable.length >= 1

            if (!correcto) {
                throw new Errores({
                    codigo: 'error/usuario_mala_solicitud',
                    mensaje: 'El campo responsable es incorrecto.',
                })
            }
        }

        if ( referenciaUrl ) {
            let correcto = referenciaUrl.length >= 1 && referenciaUrl.length <= 20
            correcto = correcto && esReferenciaBlog(referenciaUrl)

            const docs = await db.collection('Instituciones').where('referenciaUrl', '==', referenciaUrl).get()
            
            if (!docs.empty) {
                throw new Errores({
                    codigo: 'error/usuario_mala_solicitud',
                    mensaje: 'Ya está en uso la referencia url.',
                })
            }

            if (!correcto) {
                throw new Errores({
                    codigo: 'error/usuario_mala_solicitud',
                    mensaje: 'El campo referenciaUrl es incorrecto.',
                })
            }
        }

        if ( nombreInstitucion ) {
            let correcto = nombreInstitucion.length >= 1 && nombreInstitucion <= 50

            const docs = await db.collection('Instituciones').where('nombreInstitucion', '==', nombreInstitucion).get()
            
            if (!docs.empty) {
                throw new Errores({
                    codigo: 'error/usuario_mala_solicitud',
                    mensaje: 'Ya está en uso este nombre de institución.',
                })
            }

            if (!correcto) {
                throw new Errores({
                    codigo: 'error/usuario_mala_solicitud',
                    mensaje: 'El campo de nombre de institución es incorrecto.',
                })
            }
        }

        if ( descripcion ) {
            let correcto = descripcion.length >= 10 && descripcion.length <= 120

            if (!correcto) {
                throw new Errores({
                    codigo: 'error/usuario_mala_solicitud',
                    mensaje: 'El campo descripción es incorrecto.',
                })
            }
        }

        next()
    } catch (error) {
        next(error)
    }
} 



// CONSTRUCCIÓN DE DATOS
middlewares.construccionDeDatosPOST = (req = request, res = response, next) => {
    try {
        const { datos, body } = req
        const { uidSolicitante, datosAuthSolicitante } = datos

        const { responsable, referenciaUrl, nombreInstitucion, descripcion } = body

        
        
        next()
    } catch (error) {
        next(error)
    }
} 

middlewares.construccionDeDatosPUT = (req = request, res = response, next) => {
    try {
        const { datos, body } = req
        const { uidSolicitante, datosAuthSolicitante } = datos

        const { responsable, referenciaUrl, nombreInstitucion, descripcion } = body



        next()
    } catch (error) {
        next(error)
    }
} 

module.exports = middlewares