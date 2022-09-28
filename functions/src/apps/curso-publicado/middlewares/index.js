const { request, response } = require("express")
const db = require("../../../../db")
const admin = require('../../../../firebase-service')
const getAuthToken = require('../../../helpers/getAuthToken')
const CursoPublicado = require("../../../models/Cursos/curso/CursoPublicado")
const MisCursos = require('../../../models/MisCursos')
const Errores = require("../../../models/Error/Errores")
const ClasePublicado = require("../../../models/Cursos/clase/ClasePublicado")
const ProgresoClase = require("../../../models/ProgresoClase")
const { milliseconds_a_timestamp } = require("../../../utils/timestamp")

const middlewares = {}

middlewares.estaAutenticadoParaVerContenidoClase = (req = request, res = response, next) => {
    const myNext = async () => {
        
        try {
            const { authToken } = req.datos

            const userInfo = await admin.auth().verifyIdToken( authToken )
            const datosAuthSolicitante = await admin.auth().getUser( userInfo.uid )
            
            req.datos.uidSolicitante = userInfo.uid
            req.datos.datosAuthSolicitante = datosAuthSolicitante
    
        } catch ( error ) {
            console.log('error', error)
        } finally {
            return next()
        }
    }

    getAuthToken(req, res, myNext)
    
}

middlewares.verificacionExistenciaCurso = async (req = request, res = response, next) => {
    try {
        const { datos, body, params } = req
        const { uidSolicitante, datosAuthSolicitante } = datos

        const cursoPublicado = new CursoPublicado()
        const existe = await cursoPublicado.importarDatosDeUnCurso(params.uidCurso)

        if (!existe) {
            throw new Errores({
                estado: 400,
                mensajeCliente: 'no_existe_curso_publicado',
                mensajeServidor: 'No existe este curso.'
            })
        }

        next()
    } catch (error) {
        next(error)
    }
}

middlewares.velidarDatosMeGustaCurso = async (req = request, res = response, next) => {
    try {
        const { datos, body, params } = req
        const { uidSolicitante, datosAuthSolicitante } = datos
        const { uidCurso } = params
        const { meGusta } = body

        if (!Object.keys(body).length) {
            throw new TypeError('Se requiere una operación de MG.')
        }

        if (meGusta === undefined) {
            throw new TypeError('Se requiere una operación de MG.')
        }

        if (typeof meGusta !== 'boolean') {
            throw new TypeError('Debe ser un boolean al dar me gusta un curso.')
        }

        const ref = db.collection('Usuarios').doc(uidSolicitante)
        .collection('CursosMG').doc(uidCurso)
        const doc = await ref.get()

        


        // Middleware me gusta
        if (meGusta && doc.exists) {
            throw new Errores({
                estado: 400,
                mensajeCliente: 'ya_te_gusta_este_curso',
                mensajeServidor: 'Ya haz indicado que te gusta el curso.'
            })
            
        } else if (!meGusta && !doc.exists) {
            throw new Errores({
                estado: 400,
                mensajeCliente: 'no_te_gusta_este_curso',
                mensajeServidor: 'El curso no esta en tus gustos.'
            })
        }

        next()
    } catch (error) {
        next(error)
    }
}

middlewares.validacionObtencionContenido = async (req = request, res = response, next) => {
    try {
        const { datos, body, params } = req
        const { uidSolicitante, datosAuthSolicitante } = datos
        const { uidCurso, uidClase } = params

        const cursoPublicado = await CursoPublicado.obtenerCurso(uidCurso)
        if (!cursoPublicado) {
            throw new Errores({
                estado: 400,
                mensajeCliente: 'no_existe_curso_publicado',
                mensajeServidor: 'No existe este curso publicado'
            })
        }

        if (uidSolicitante) {
            const misCursos = await MisCursos.obtener(uidSolicitante, uidCurso)
            const noTieneElCurso = !misCursos || misCursos.tipoAcceso === 'vistaPrevia'

            if (noTieneElCurso) {
                const clasePublicado = await ClasePublicado.obtenerPorUidClase(uidClase)
                
                if (!clasePublicado.vistaPrevia) {
                    throw new Errores({
                        estado: 400,
                        mensajeCliente: 'sin_acceso_a_la_clase',
                        mensajeServidor: 'No tienes acceso a esta clase.'
                    })
                }
            }
        } else {
            const clasePublicado = await ClasePublicado.obtenerPorUidClase(uidClase)
                
            if (!clasePublicado.vistaPrevia) {
                throw new Errores({
                    estado: 400,
                    mensajeCliente: 'usuario_no_autenticado',
                    mensajeServidor: 'Iniciar sesión primero.'
                })
            }
        }

        next()
    } catch (error) {
        next(error)
    }
}

middlewares.marcarComoClaseVisualizada = async (req = request, res = response, next) => {
    try {
        const { datos, body, params } = req
        const { uidSolicitante, datosAuthSolicitante } = datos
        const { uidCurso, uidClase } = params

        /**
         * Si existe: actualizar
         * Sino: Crear como visualizado
        */

        if (!uidSolicitante) return next()

        const miCurso = await MisCursos.obtener(uidSolicitante, uidCurso)

        if (miCurso) {
            const progresoClase = await ProgresoClase.obtener( uidSolicitante, uidCurso, uidClase )

            if( progresoClase && !progresoClase.visualizado ) {
                // Marcamos clase como visualizada
                const data = { visualizado: true }
                ProgresoClase.actualizar(uidSolicitante, uidCurso, uidClase, data)

                MisCursos.actualizar(uidSolicitante, uidCurso, {
                    cantidadVisualizada: admin.firestore.FieldValue.increment(1),
                })
            } else if ( !progresoClase ) {
                // Agreagmos nuevo progreso
                let data = { uidCurso, uidClase, visualizado: true }
                let nuevoProgresoClase = new ProgresoClase( data )
                ProgresoClase.agregar( uidSolicitante, nuevoProgresoClase )
    
                MisCursos.actualizar(uidSolicitante, uidCurso, {
                    cantidadVisualizada: admin.firestore.FieldValue.increment(1),
                })
            }

            MisCursos.actualizar(uidSolicitante, uidCurso, {
                ultimaActividad: milliseconds_a_timestamp(Date.now()),
            })

        } else {
            const miCursoNuevo = new MisCursos({
                uid: uidCurso, 
                tipoAcceso: 'vistaPrevia', 
                ultimaActividad: milliseconds_a_timestamp(Date.now()), 
                uidEstudiante: uidSolicitante, 
                cantidadVisualizada: 1,
            })
            MisCursos.agregar(uidSolicitante, miCursoNuevo)

            // Agreagmos nuevo progreso
            let data = { uidCurso, uidClase, visualizado: true }
            let nuevoProgresoClase = new ProgresoClase( data )
            ProgresoClase.agregar( uidSolicitante, nuevoProgresoClase )
        }

        next()
    } catch (error) {
        next(error)
    }
}

module.exports = middlewares