const { request, response } = require("express")
const db = require('../../../../../db')
const ClaseBorrador = require("../../../../models/Cursos/clase/ClaseBorrador")
const ContenidoClaseBorrador = require("../../../../models/Cursos/contenidoClase/ContenidoClaseBorrador")
const CursoBorrador = require("../../../../models/Cursos/curso/CursoBorrador")
const CursoEstadoPublicacion = require("../../../../models/Cursos/curso/CursoEstadoPublicacion")
const UnidadBorrador = require("../../../../models/Cursos/unidad/UnidadBorrador")
const Errores = require("../../../../models/Error/Errores")
const Authentication = require("../../../../models/Usuarios/Authentication")
const Roles = require('../../../../models/Usuarios/helpers/Roles')
const esReferenciaURL = require("../../../../utils/esReferenciaURL")

const borrador = {}



// VERIFICACIÓN DE DATOS REQUERIDOS
borrador.verificarDatosRequeridosPOST = (req = request, res = response, next) => {
    try {
        const { datos, body } = req
        const { uidSolicitante, datosAuthSolicitante } = datos
        const { datosCurso } = body

        if (!Object.keys(body).length) {
            throw new Errores({
                codigo: 'error/usuario_mala_solicitud',
                mensaje: 'No existen los datos necesarios.'
            })
        }

        if ( !datosCurso || typeof datosCurso !== 'object' ) {
            throw new Errores({
                codigo: 'error/usuario_mala_solicitud',
                mensaje: 'No existen los datos necesarios.'
            })
        }

        const {
            equipo,
            titulo,
            referenciaURL,
        } = datosCurso

        if ( !titulo.trim() ) {
            throw new Errores({
                codigo: 'error/usuario_mala_solicitud',
                mensaje: 'El titulo del curso debe existir.'
            })
        }
    
        if ( !referenciaURL.trim() ) {
            throw new Errores({
                codigo: 'error/usuario_mala_solicitud',
                mensaje: 'La referencia url del curso debe existir.'
            })
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
        const { datosCurso } = body

        if (!Object.keys(body).length) {
            throw new Errores({
                codigo: 'error/usuario_mala_solicitud',
                mensaje: 'No existen los datos necesarios.'
            })
        }

        if ( !datosCurso || typeof datosCurso !== 'object' ) {
            throw new Errores({
                codigo: 'error/usuario_mala_solicitud',
                mensaje: 'No existen los datos necesarios.'
            })
        }

        if (!Object.keys(datosCurso).length) {
            throw new Errores({
                codigo: 'error/usuario_mala_solicitud',
                mensaje: 'No existen los datos necesarios.'
            })
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
        const { datosCurso } = body

        const {
            equipo,
            titulo,
            referenciaURL,
        } = datosCurso

        // if ( equipo && typeof equipo !== 'string' ) {
        //     throw new Errores({
        //         codigo: 'error/usuario_mala_solicitud',
        //         mensaje: 'La uid de la institución que ofrece el curso debe ser String.'
        //     })
        // }
    
        if ( typeof titulo !== 'string' ) {
            throw new Errores({
                codigo: 'error/usuario_mala_solicitud',
                mensaje: 'El titulo del curso debe ser String.'
            })
        }
    
        if ( typeof referenciaURL !== 'string' ) {
            throw new Errores({
                codigo: 'error/usuario_mala_solicitud',
                mensaje: 'La referencia url del curso debe ser String.'
            })
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
        const { datosCurso } = body

        const {
            uid,                // c
            responsable,        // c
            contribuyentes,
            equipo,        // c
            titulo,  
            referenciaURL, 
            descripcion,
            requisitos,
            objetivos,
            nivel,
            seccion,
            categorias,
            datosPrecio,        // b - p (especial) 
            duracionCurso,      // a
            idioma,
            subTitulos,
        } = datosCurso

        if ( contribuyentes ) {
            if (!(contribuyentes instanceof Array)) {
                throw new Errores({
                    codigo: 'error/usuario_mala_solicitud',
                    mensaje: 'El campo contribuyentes debe ser un arreglo.'
                })
            }

            for (let i = 0; i < contribuyentes.length; i++) {
                const contribuyente = contribuyentes[i]
                if ( typeof contribuyente !== 'string' ) {
                    throw new Errores({
                        codigo: 'error/usuario_mala_solicitud',
                        mensaje: 'El contribuyente debe ser String.'
                    })
                }
            }
        }
        
        if ( titulo && typeof titulo !== 'string' ) {
            throw new Errores({
                codigo: 'error/usuario_mala_solicitud',
                mensaje: 'El titulo del curso debe ser String.'
            })
        }

        if ( descripcion && typeof descripcion !== 'string' ) {
            throw new Errores({
                codigo: 'error/usuario_mala_solicitud',
                mensaje: 'La descripción del curso debe ser String.'
            })
        }

        if ( requisitos ) {
            if (!(requisitos instanceof Array)) {
                throw new Errores({
                    codigo: 'error/usuario_mala_solicitud',
                    mensaje: 'El campo requisitos debe ser un arreglo.'
                })
            }

            for (let i = 0; i < requisitos.length; i++) {
                const requisito = requisitos[i]
                if ( typeof requisito !== 'string' ) {
                    throw new Errores({
                        codigo: 'error/usuario_mala_solicitud',
                        mensaje: 'El requisito debe ser String.'
                    })
                }
            }
        }

        if ( objetivos ) {
            if (!(objetivos instanceof Array)) {
                throw new Errores({
                    codigo: 'error/usuario_mala_solicitud',
                    mensaje: 'El campo objetivos debe ser un arreglo.'
                })
            }

            for (let i = 0; i < objetivos.length; i++) {
                const objetivo = objetivos[i]
                if ( typeof objetivo !== 'string' ) {
                    throw new Errores({
                        codigo: 'error/usuario_mala_solicitud',
                        mensaje: 'El objetivo debe ser String.'
                    })
                }
            }
        }

        if ( nivel && typeof nivel !== 'string' ) {
            throw new Errores({
                codigo: 'error/usuario_mala_solicitud',
                mensaje: 'El nivel del curso debe ser String.'
            })
        }
        
        if (seccion) {
            if ( typeof seccion != 'string' ) {
                throw new Errores({
                    codigo: 'error/usuario_mala_solicitud',
                    mensaje: 'La sección del curso debe ser string.'
                })
            } 
        
            if (!(categorias instanceof Array)) {
                throw new Errores({
                    codigo: 'error/usuario_mala_solicitud',
                    mensaje: 'Las categorias del curso debe ser un arreglo de string.'
                })
            }
            
            for (let i = 0; i < categorias.length; i++) {
                const categoria = categorias[i]
                if (typeof categoria != 'string') {
                    throw new Errores({
                        codigo: 'error/usuario_mala_solicitud',
                        mensaje: 'Las categorias del curso debe ser un arreglo de string.'
                    })
                }
            }
        }
        
        if ( idioma && typeof idioma !== 'string' ) {
            throw new Errores({
                codigo: 'error/usuario_mala_solicitud',
                mensaje: 'El idioma del curso debe ser String.'
            })
        }

        if ( subTitulos ) {
            if (!(subTitulos instanceof Array)) {
                throw new Errores({
                    codigo: 'error/usuario_mala_solicitud',
                    mensaje: 'El campo subTitulos debe ser un arreglo.'
                })
            }

            for (let i = 0; i < subTitulos.length; i++) {
                const subTitulo = subTitulos[i]
                if ( typeof subTitulo !== 'string' ) {
                    throw new Errores({
                        codigo: 'error/usuario_mala_solicitud',
                        mensaje: 'El subTitulo debe ser String.'
                    })
                }
            }
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
        const { datosCurso } = body

        const {
            equipo,
            titulo,
            referenciaURL,
        } = datosCurso


        // Titulo
        if ( titulo.trim().length < 10 ) {
            throw new Errores({
                codigo: 'error/usuario_mala_solicitud',
                mensaje: 'El titulo del curso debe ser mayor o igual a 10.'
            })
        }
        
        if ( titulo.trim().length > 60 ) {
            throw new Errores({
                codigo: 'error/usuario_mala_solicitud',
                mensaje: 'El titulo del curso debe ser menor o igual a 60.'
            })
        }

        // Referencia URL
        if ( referenciaURL.trim().length < 1 ) {
            throw new Errores({
                codigo: 'error/usuario_mala_solicitud',
                mensaje: 'La referencia url del curso debe ser mayor o igual a 10.'
            })
        }
        
        if ( referenciaURL.trim().length > 60 ) {
            throw new Errores({
                codigo: 'error/usuario_mala_solicitud',
                mensaje: 'La referencia url del curso debe ser menor o igual a 60.'
            })
        }

        if (!esReferenciaURL(referenciaURL.trim())) {
            throw new Errores({
                codigo: 'error/usuario_mala_solicitud',
                mensaje: 'Solo se acepta: a-z A-Z 0-9 -'
            })
        }

        const doc = await db
            .collectionGroup('CursosBorrador')
            .where('referenciaURL', '==', referenciaURL.trim())
            .limit(1)
            .get()
        
        if ( !doc.empty ) {
            throw new Errores({
                codigo: 'error/usuario_mala_solicitud',
                mensaje: 'La referencia url de este curso ya esta en uso.'
            })
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
        const { datosCurso } = body

        const {
            uid,                // c
            responsable,        // c
            contribuyentes,
            equipo,        // c
            titulo,  
            referenciaURL, 
            descripcion,
            requisitos,
            objetivos,
            nivel,
            seccion,
            categorias,
            datosPrecio,        // b - p (especial) 
            duracionCurso,      // a
            idioma,
            subTitulos,
        } = datosCurso


        if ( contribuyentes ) {
            if ( contribuyentes.length > 4 ) {
                throw new Errores({
                    codigo: 'error/usuario_mala_solicitud',
                    mensaje: `Por curso solo se puede tener hasta 4 contribuyentes.`
                })
            }

            for (let i = 0; i < contribuyentes.length; i++) {
                const contribuyente = contribuyentes[i]
                
                const auth = new Authentication(contribuyente)
                const user = await auth.obtener()

                if (user.customClaims.rol === 'estudiante') {
                    throw new Errores({
                        codigo: 'error/usuario_mala_solicitud',
                        mensaje: `El usuario ${user.displayName} no tiene los permisos para ser contribuyente de este curso.`
                    })
                }
            }
        }

        // Titulo
        if ( titulo ) {
            if ( titulo.trim().length < 10 ) {
                throw new Errores({
                    codigo: 'error/usuario_mala_solicitud',
                    mensaje: 'El titulo del curso debe ser mayor o igual a 10.'
                })
            }
            
            if ( titulo.trim().length > 60 ) {
                throw new Errores({
                    codigo: 'error/usuario_mala_solicitud',
                    mensaje: 'El titulo del curso debe ser menor o igual a 60.'
                })
            }
        }

        if ( descripcion ) {
            if ( descripcion.trim().length < 10 ) {
                throw new Errores({
                    codigo: 'error/usuario_mala_solicitud',
                    mensaje: 'La descripción del curso debe ser mayor o igual a 10.'
                })
            }
            
            if ( descripcion.trim().length > 150 ) {
                throw new Errores({
                    codigo: 'error/usuario_mala_solicitud',
                    mensaje: 'La descripción del curso debe ser menor o igual a 150.'
                })
            }
        }

        if ( requisitos ) {
            if ( requisitos.length > 10 ) {
                throw new Errores({
                    codigo: 'error/usuario_mala_solicitud',
                    mensaje: 'Hasta 10 requesitos por curso.'
                })
            }

            for (let i = 0; i < requisitos.length; i++) {
                const requisito = requisitos[i]
                if ( requisito.trim().length > 60 ) {
                    throw new Errores({
                        codigo: 'error/usuario_mala_solicitud',
                        mensaje: 'El requisito del curso debe ser menor o igual a 60 carácteres.'
                    })
                }
            }
        }

        if ( objetivos ) {
            if ( objetivos.length > 10 ) {
                throw new Errores({
                    codigo: 'error/usuario_mala_solicitud',
                    mensaje: 'Hasta 10 objetivos por curso.'
                })
            }

            for (let i = 0; i < objetivos.length; i++) {
                const objetivo = objetivos[i]
                if ( objetivo.trim().length > 60 ) {
                    throw new Errores({
                        codigo: 'error/usuario_mala_solicitud',
                        mensaje: 'El objetivo del curso debe ser menor o igual a 60 carácteres.'
                    })
                }
            }
        }

        if ( nivel ) {
            let nivelesDisponibles = ['basico', 'intermedio', 'avanzado']
            if ( !nivelesDisponibles.includes(nivel) ) {
                throw new Errores({
                    codigo: 'error/usuario_mala_solicitud',
                    mensaje: 'Este nivel no existe.'
                })
            }
        }

        if ( seccion !== '' && ( seccion || (categorias && categorias.length) ) ) {
            const docCurso = await db
            .collection('CursosBorrador').doc(params.uidCurso)
            .get()

            // Se realiza el merge de sección, categoría y subCategoría
            let seccionSeleccionada = seccion ? seccion : docCurso.data().seccion
            if (categorias) {
                let valido = categorias.length >= 1 && categorias.length <= 3
                if ( !valido ) {
                    throw new Errores({
                        codigo: 'error/usuario_mala_solicitud',
                        mensaje: 'Por blog puede haber de 1 a 3 categorias.'
                    })
                }
            }
            let categoriasSeleccionadas = categorias ? categorias : docCurso.data().categorias

            // Verificación de existencia de la sección, categoría y subCategoría
            let ref = db.collection('Secciones').doc(seccionSeleccionada)

            for (let i = 0; i < categoriasSeleccionadas.length; i++) {
                const categoria = categoriasSeleccionadas[i]
                const doc = await ref.collection('Categorias').doc(categoria).get()

                if (!doc.exists) {
                    throw new Errores({
                        codigo: 'error/usuario_mala_solicitud',
                        mensaje: `Hubo un problema al encontrar los datos de sección: ${seccionSeleccionada}/${categoria}.`
                    })
                }
            }
        }

        if ( idioma ) {
            
        }

        if ( subTitulos ) {
            
        }

        next()
    } catch (error) {
        next(error)
    }
}


// CONSTRUCCIÓN DE DATOS
borrador.construirDatosCursoBorradorPOST = (req = request, res = response, next) => {
    try {
        const { datos, body } = req
        const { uidSolicitante, datosAuthSolicitante } = datos
        const { datosCurso } = body

        const {
            equipo,
            titulo,
            referenciaURL,
        } = datosCurso

        req.body.datosCurso.responsable = uidSolicitante.trim()
        req.body.datosCurso.contribuyentes = [uidSolicitante.trim()]
        req.body.datosCurso.titulo = titulo.trim()
        req.body.datosCurso.referenciaURL = referenciaURL.trim()
        req.body.datosCurso.estadoDocumento = 'nuevo'

        const cursoBorrador = new CursoBorrador(req.body.datosCurso)
        let mensajesError = []

        if ( cursoBorrador.responsable === '' ) mensajesError.push('No existe responsable en este curso, se necesita un responsable.')

        if ( cursoBorrador.contribuyentes.length === 0 ) mensajesError.push('No existen contribuyentes en el curso, se necesita al menos un contribuyente.')
        if ( !cursoBorrador.contribuyentes.includes(cursoBorrador.responsable) ) mensajesError.push('El responsable no pertenece a los contribuyentes.')
        
        if ( cursoBorrador.fotoPerfil === '' ) mensajesError.push('No existe una foto de perfil en este curso, favor actualizar.')
        
        if ( cursoBorrador.titulo === '' ) mensajesError.push('No existe titulo en este curso, favor actualizar.')
        
        if ( cursoBorrador.referenciaURL === '' ) mensajesError.push('No existe referencia url en este curso, favor actualizar.')
        
        if ( cursoBorrador.descripcion === '' ) mensajesError.push('No existe descripción en este curso, favor actualizar.')
        
        if ( cursoBorrador.requisitos.length === 0 ) mensajesError.push('No existen requisitos en este curso, favor actualizar.')
        
        if ( cursoBorrador.objetivos.length === 0 ) mensajesError.push('No existen objetivos en este curso, favor actualizar.')
        
        if ( cursoBorrador.nivel === '' ) mensajesError.push('No existe nivel en este curso, favor actualizar.')

        if ( cursoBorrador.seccion ) {
            if ( cursoBorrador.categorias.length === 0 ) mensajesError.push('No existen categorias, favor actualizar.')
        }
        
        if ( cursoBorrador.duracion === 0 ) mensajesError.push('La duración del curso es 0, favor agregar contenido.')
        
        if ( cursoBorrador.idioma === '' ) mensajesError.push('No existe idioma principal en este curso, favor actualizar.')

        req.body.datosCurso.mensajesError = mensajesError
        req.body.datosCurso.contieneErrores = !!mensajesError.length

        next()
    } catch (error) {
        next(error)
    }
}

borrador.construirDatosCursoBorradorPUT = (req = request, res = response, next) => {
    try {
        const { datos, body } = req
        const { uidSolicitante, datosAuthSolicitante } = datos
        const { datosCurso } = body

        const {
            uid,                // c
            responsable,        // no se puede actualizar el responsable, solo la administracion puede
            contribuyentes,
            equipo,             // c
            titulo,
            referenciaURL,      // c
            descripcion,
            requisitos,
            objetivos,
            nivel,
            seccion,
            categorias,
            datosPrecio,        // b - p (especial) 
            duracionCurso,      // a
            idioma,
            subTitulos,
        } = datosCurso

        if ( contribuyentes ) {
            if ( !contribuyentes.includes(uidSolicitante) ) {
                req.body.datosCurso.contribuyentes = [uidSolicitante]
            } else {
                req.body.datosCurso.contribuyentes = []
            }

            for (let i = 0; i < contribuyentes.length; i++) {
                const contribuyente = contribuyentes[i]
                req.body.datosCurso.contribuyentes.push( contribuyente.trim() )
            }
        }
        
        titulo ? req.body.datosCurso.titulo = titulo.trim() : ''
        descripcion ? req.body.datosCurso.descripcion = descripcion.trim() : ''

        if ( requisitos ) {
            req.body.datosCurso.requisitos = []
            for (let i = 0; i < requisitos.length; i++) {
                const requisito = requisitos[i]
                req.body.datosCurso.requisitos.push( requisito.trim() )
            }
        }

        if ( objetivos ) {
            req.body.datosCurso.objetivos = []
            for (let i = 0; i < objetivos.length; i++) {
                const objetivo = objetivos[i]
                req.body.datosCurso.objetivos.push( objetivo.trim() )
            }
        }

        nivel ? req.body.datosCurso.nivel = nivel.trim() : ''

        if ( seccion === '' ) {
            req.body.datosCurso.seccion = ''
            req.body.datosCurso.categorias = []
        } else if ( seccion || (categorias && categorias.length) ) {
            seccion ? req.body.datosCurso.seccion = seccion.trim() : ''
            if ( categorias ) {
                req.body.datosCurso.categorias = []
                for (let i = 0; i < categorias.length; i++) {
                    const subCategoria = categorias[i]
                    req.body.datosCurso.categorias.push( subCategoria.trim() )
                }
            }
        }

        idioma ? req.body.datosCurso.idioma = idioma.trim() : ''
        if ( subTitulos ) {
            req.body.datosCurso.subTitulos = []
            for (let i = 0; i < subTitulos.length; i++) {
                const subTitulo = subTitulos[i]
                req.body.datosCurso.subTitulos.push( subTitulo.trim() )
            }
        }

        next()
    } catch (error) {
        next(error)
    }
}


borrador.perteneceAlInstructorEsteCurso = async (req = request, res = response, next) => {
    try {
        const { datos, body, params } = req
        const { uidSolicitante, datosAuthSolicitante } = datos

        const cursoBorrador = new CursoBorrador()
        const existe = await cursoBorrador.importarDatosDeUnCurso(params.uidCurso)

        if (!existe) {
            throw new Errores({
                codigo: 'error/usuario_mala_solicitud',
                mensaje: 'No existe este curso.'
            })
        }

        if ( cursoBorrador.responsable !== uidSolicitante ) {
            throw new Errores({
                codigo: 'error/usuario_no_autorizado',
                mensaje: 'Este curso no pertenece a tu repositorio de cursos.'
            })
        }

        next()
    } catch (error) {
        next(error)
    }
}

borrador.esValidoElCursoBorrador = async (req = request, res = response, next) => {
    try {
        const { datos, body, params } = req
        const { uidSolicitante, datosAuthSolicitante } = datos

        const uidCurso = params.uidCurso
        
        // Verificar curso
        let error1 = await CursoBorrador.tieneErrores(uidCurso)

        // Verificar unidades
        let error2 = await UnidadBorrador.tieneErrores(uidCurso)

        // Verificar clases
        let error3 = await ClaseBorrador.tieneErrores(uidCurso)

        // Verificar contenido-clase
        let error4 = await ContenidoClaseBorrador.tieneErrores(uidCurso)

        let existeErrores = [error1, error2, error3, error4]

        if (existeErrores.includes(true)) {
            throw new Errores({
                codigo: 'error/usuario_mala_solicitud',
                mensaje: 'Existen errores, favor arreglar.'
            })
        }

        next()
    } catch (error) {
        next(error)
    }
}


borrador.verificarCursoEstadoPublicacion = async (req = request, res = response, next) => {
    try {
        const { datos, body, params } = req
        const { uidSolicitante, datosAuthSolicitante } = datos

        const uidCurso = params.uidCurso
        
        const cursoEstadoPublicacion = new CursoEstadoPublicacion()
        const existe = await cursoEstadoPublicacion.importarDatosDocumento(uidCurso)

        if (!existe) {
            req.datos.esNuevo = true
            return next()
        }

        if (cursoEstadoPublicacion.estado) {
            throw new Errores({
                codigo: 'error/usuario_mala_solicitud',
                mensaje: 'Ya se esta publicando el curso.'
            })
        }

        next()
        
    } catch (error) {
        next(error)
    }
}


borrador.errorSiElCursoSeEstaPublicando = async (req = request, res = response, next) => {
    try {
        const { datos, body, params } = req
        const { uidSolicitante, datosAuthSolicitante } = datos

        const uidCurso = params.uidCurso
        
        const cursoEstadoPublicacion = new CursoEstadoPublicacion()
        const existe = await cursoEstadoPublicacion.importarDatosDocumento(uidCurso)

        if (!existe) return next()

        if (cursoEstadoPublicacion.estado) {
            throw new Errores({
                codigo: 'error/usuario_mala_solicitud',
                mensaje: 'Ya se esta publicando el curso.'
            })
        }

        req.datos.cursoEstadoPublicacion = cursoEstadoPublicacion

        next()
        
    } catch (error) {
        next(error)
    }
}



module.exports = borrador