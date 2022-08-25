const { request, response } = require("express")
const db = require('../../../../../db')
const CursoBorrador = require("../../../../models/Cursos/curso/CursoBorrador")
const Errores = require("../../../../models/Error/Errores")
const Miembro = require("../../../../models/Usuarios/TiposUsuarios/Miembro")
const esCodigo = require("../../../../utils/esCodigo")
const generadorDeErroresCursoBorrador = require('../../../..//helpers/generadorDeErroresCursoBorrador')

const borrador = {}




borrador.verificarDatosRequeridosPOST = (req = request, res = response, next) => {
    try {
        const { datos, body } = req
        const { uidSolicitante, datosAuthSolicitante } = datos
        const { datosCurso } = body

        if (!Object.keys(body).length) {
            throw new TypeError('No existen los datos necesarios.')
        }

        if ( !datosCurso || typeof datosCurso !== 'object' ) {
            throw new TypeError('No existen los datos necesarios.')
        }

        const {
            titulo,
            codigo,
            responsable,
            instructor,
        } = datosCurso
        
        if ( !titulo.trim() ) {
            throw new TypeError('El titulo del curso debe existir.')
        }
    
        if ( !codigo.trim() ) {
            throw new TypeError('La referencia url del curso debe existir.')
        }

        if ( !responsable.trim() ) {
            throw new TypeError('El responsable del curso debe existir.')
        }

        if ( !instructor.trim() ) {
            throw new TypeError('El instructor del curso debe existir.')
        }

        next()
    } catch (error) {
        next(error)
    }
}




borrador.verificadorDeTipoDeDatosPOST = (req = request, res = response, next) => {
    try {
        const { datos, body } = req
        const { uidSolicitante, datosAuthSolicitante } = datos
        const { datosCurso } = body

        const {
            titulo,
            codigo,
            responsable,
            instructor,
        } = datosCurso
    
        if ( typeof titulo !== 'string' ) {
            throw new TypeError('El titulo del curso debe ser String.')
        }
    
        if ( typeof codigo !== 'string' ) {
            throw new TypeError('La referencia url del curso debe ser String.')
        }

        if ( typeof responsable !== 'string' ) {
            throw new TypeError('La uid del usuario debe ser String.')
        }

        if ( typeof instructor !== 'string' ) {
            throw new TypeError('La uid del instructor debe ser String.')
        }

        next()
    } catch (error) {
        next(error)
    }
}




borrador.verificadorDeDatosPOST = async (req = request, res = response, next) => {
    try {
        const { datos, body } = req
        const { uidSolicitante, datosAuthSolicitante } = datos
        const { datosCurso } = body

        const {
            titulo,
            codigo,
            responsable,
            instructor,
        } = datosCurso


        // Titulo
        if ( titulo.trim().length < 10 ) {
            throw new TypeError('El titulo del curso debe ser mayor o igual a 10.')
        }
        
        if ( titulo.trim().length > 60 ) {
            throw new TypeError('El titulo del curso debe ser menor o igual a 60.')
        }

        // Referencia URL
        if ( codigo.trim().length < 1 ) {
            throw new TypeError('La referencia url del curso debe ser mayor o igual a 10.')
        }
        
        if ( codigo.trim().length > 60 ) {
            throw new TypeError('La referencia url del curso debe ser menor o igual a 60.')
        }

        if (!esCodigo(codigo.trim())) {
            throw new Errores({
                estado: 400,
                mensajeCliente: 'codigo_invalido',
                mensajeServidor: 'Solo se acepta: a-z A-Z 0-9 -'
            })
        }

        const doc = await db
            .collectionGroup('CursosBorrador')
            .where('codigo', '==', codigo.trim())
            .limit(1)
            .get()
        
        if ( !doc.empty ) {
            throw new Errores({
                estado: 400,
                mensajeCliente: 'no_existe_curso_borrador',
                mensajeServidor: 'La referencia url de este curso ya esta en uso.'
            })
        }

        // Responsable
        let docMiembro = await db
            .collection('Miembros').doc(responsable).get()

        if (!docMiembro.exists) {
            throw new Errores({
                estado: 400,
                mensajeCliente: 'no_existe_miembro',
                mensajeServidor: 'El posible responsable no es miembro.'
            })
        }

        if (!docMiembro.data().funciones.includes('instructor')) {
            throw new Errores({
                estado: 400,
                mensajeCliente: 'miembro_no_es_instructor',
                mensajeServidor: 'El posible responsable no es instructor.'
            })
        }

        // Instructor
        docMiembro = await db
            .collection('Miembros').doc(instructor).get()

        if (!docMiembro.exists) {
            throw new Errores({
                estado: 400,
                mensajeCliente: 'no_existe_miembro',
                mensajeServidor: 'El posible instructor no es miembro.'
            })
        }

        if (!docMiembro.data().funciones.includes('instructor')) {
            throw new Errores({
                estado: 400,
                mensajeCliente: 'miembro_no_es_instructor',
                mensajeServidor: 'El posible instructor no es instructor.'
            })
        }

        next()
    } catch (error) {
        next(error)
    }
}




borrador.construirDatosCursoBorradorPOST = async (req = request, res = response, next) => {
    try {
        const { datos, body } = req
        const { uidSolicitante, datosAuthSolicitante } = datos
        const { datosCurso } = body

        const {
            titulo,
            codigo,
            responsable,
            instructor,
        } = datosCurso

        req.body.datosCurso.responsable = responsable.trim()
        req.body.datosCurso.instructor = instructor.trim()
        req.body.datosCurso.contribuyentes = [instructor.trim()]
        req.body.datosCurso.titulo = titulo.trim()
        req.body.datosCurso.codigo = codigo.trim()
        req.body.datosCurso.estadoDocumento = 'nuevo'

        const cursoBorrador = new CursoBorrador(req.body.datosCurso)
        const mensajesError = await generadorDeErroresCursoBorrador(cursoBorrador)
        
        req.body.datosCurso.equipo = 'main'
        req.body.datosCurso.mensajesError = mensajesError
        req.body.datosCurso.contieneErrores = !!mensajesError.length

        next()
    } catch (error) {
        next(error)
    }
}




borrador.verificacionAuxiliaresPUT = async (req = request, res = response, next) => {
    try {
        const { datos, body, params } = req
        const { uidSolicitante, datosAuthSolicitante } = datos
        const { auxiliares } = body

        // Verificacion: Existe curso
        const cursoBorrador = new CursoBorrador()
        const existeCursoBorrador = await cursoBorrador.importarDatosDeUnCurso(params.uidCurso)

        if (!existeCursoBorrador) {
            throw new Errores({
                estado: 400,
                mensajeCliente: 'no_existe_curso_borrador',
                mensajeServidor: 'No existe el curso.'
            })
        }

        if (auxiliares.length > 4) {
            throw new TypeError('Solo se puede asignar hasta 4 auxiliares a un curso.')
        }

        if ( auxiliares.includes(cursoBorrador.responsable) ) {
            throw new TypeError('El responsable del curso no puede estar como auxiliar.')
        }

        if ( auxiliares.includes(cursoBorrador.instructor) ) {
            throw new TypeError('El instructor del curso no puede estar como auxiliar.')
        }
        
        // Verificacion: Es miembro y tiene funcionalidad de instructor
        for (const auxiliar of auxiliares) {
            const miembro = new Miembro()
            const existeMiembro = await miembro.importarDatosMiembro(auxiliar)

            if (!existeMiembro) {
                throw new Errores({
                    estado: 400,
                    mensajeCliente: 'no_existe_miembro',
                    mensajeServidor: 'No es miembro.'
                })
            }

            if ( !miembro.funciones.includes('instructor-auxiliar') ) {
                throw new Errores({
                    estado: 400,
                    mensajeCliente: 'miembro_no_es_instructor_auxiliar',
                    mensajeServidor: 'El miembro no es instructor auxiliar.'
                })
            }
        }

        req.body.tienePublicado = cursoBorrador.estadoDocumento !== 'nuevo'

        next()
    } catch (error) {
        next(error)
    }
}


module.exports = borrador