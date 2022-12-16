const { request, response } = require("express")
const db = require('../../../../../db')
const ClaseBorrador = require("../../../../models/Cursos/clase/ClaseBorrador")
const ContenidoClase = require("../../../../models/Cursos/contenidoClase/ContenidoClase")
const CursoBorrador = require("../../../../models/Cursos/curso/CursoBorrador")
const CursoEstadoPublicacion = require("../../../../models/Cursos/curso/CursoEstadoPublicacion")
const CursoPublicado = require("../../../../models/Cursos/curso/CursoPublicado")
const DatosPrecio_Curso = require("../../../../models/Cursos/helpers/DatosPrecio_Curso")
const UnidadBorrador = require("../../../../models/Cursos/unidad/UnidadBorrador")
const Errores = require("../../../../models/Error/Errores")
const Authentication = require("../../../../models/Usuarios/Authentication")
const esCodigo = require("../../../../utils/esCodigo")
const generadorDeErroresCursoBorrador = require('../../../../helpers/generadorDeErroresCursoBorrador')
const timestamp = require("../../../../utils/timestamp")

const borrador = {}



// VERIFICACIÓN DE DATOS REQUERIDOS
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
            equipo,
            titulo,
            codigo,
        } = datosCurso

        if ( !titulo.trim() ) {
            throw new TypeError('El titulo del curso debe existir.')
        }
    
        if ( !codigo.trim() ) {
            throw new TypeError('La referencia url del curso debe existir.')
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
            throw new TypeError('No existen los datos necesarios.')
        }

        if ( !datosCurso || typeof datosCurso !== 'object' ) {
            throw new TypeError('No existen los datos necesarios.')
        }

        if (!Object.keys(datosCurso).length) {
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
        const { datosCurso } = body

        const {
            titulo,
            codigo,
        } = datosCurso
    
        if ( typeof titulo !== 'string' ) {
            throw new TypeError('El titulo del curso debe ser String.')
        }
    
        if ( typeof codigo !== 'string' ) {
            throw new TypeError('La referencia url del curso debe ser String.')
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
            contribuyentes,
            titulo,  
            descripcion,
            requisitos,
            objetivos,
            nivel,
            seccion,
            categorias,
            idioma,
            subTitulos,
        } = datosCurso

        if ( contribuyentes ) {
            if (!(contribuyentes instanceof Array)) {
                throw new TypeError('El campo contribuyentes debe ser un arreglo.')
            }

            for (let i = 0; i < contribuyentes.length; i++) {
                const contribuyente = contribuyentes[i]
                if ( typeof contribuyente !== 'string' ) {
                    throw new TypeError('El contribuyente debe ser String.')
                }
            }
        }
        
        if ( titulo && typeof titulo !== 'string' ) {
            throw new TypeError('El titulo del curso debe ser String.')
        }

        if ( descripcion && typeof descripcion !== 'string' ) {
            throw new TypeError('La descripción del curso debe ser String.')
        }

        if ( requisitos ) {
            if (!(requisitos instanceof Array)) {
                throw new TypeError('El campo requisitos debe ser un arreglo.')
            }

            for (let i = 0; i < requisitos.length; i++) {
                const requisito = requisitos[i]
                if ( typeof requisito !== 'string' ) {
                    throw new TypeError('El requisito debe ser String.')
                }
            }
        }

        if ( objetivos ) {
            if (!(objetivos instanceof Array)) {
                throw new TypeError('El campo objetivos debe ser un arreglo.')
            }

            for (let i = 0; i < objetivos.length; i++) {
                const objetivo = objetivos[i]
                if ( typeof objetivo !== 'string' ) {
                    throw new TypeError('El objetivo debe ser String.')
                }
            }
        }

        if ( nivel && typeof nivel !== 'string' ) {
            throw new TypeError('El nivel del curso debe ser String.')
        }
        
        if (seccion) {
            if ( typeof seccion != 'string' ) {
                throw new TypeError('La sección del curso debe ser string.')
            } 
        
            if (!(categorias instanceof Array)) {
                throw new TypeError('Las categorias del curso debe ser un arreglo de string.')
            }
            
            for (let i = 0; i < categorias.length; i++) {
                const categoria = categorias[i]
                if (typeof categoria != 'string') {
                    throw new TypeError('Las categorias del curso debe ser un arreglo de string.')
                }
            }
        }
        
        if ( idioma && typeof idioma !== 'string' ) {
            throw new TypeError('El idioma del curso debe ser String.')
        }

        if ( subTitulos ) {
            if (!(subTitulos instanceof Array)) {
                throw new TypeError('El campo subTitulos debe ser un arreglo.')
            }

            for (let i = 0; i < subTitulos.length; i++) {
                const subTitulo = subTitulos[i]
                if ( typeof subTitulo !== 'string' ) {
                    throw new TypeError('El subTitulo debe ser String.')
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
            titulo,
            codigo,
        } = datosCurso


        // Titulo
        if ( titulo.trim().length < 10 ) {
            throw new TypeError('El titulo del curso debe ser mayor o igual a 10.')
        }
        
        if ( titulo.trim().length > 60 ) {
            throw new TypeError('El titulo del curso debe ser menor o igual a 60.')
        }

        // Referencia URL
        if ( codigo.trim().length < 10 ) {
            throw new TypeError('La referencia url del curso debe ser mayor o igual a 10.')
        }
        
        if ( codigo.trim().length > 60 ) {
            throw new TypeError('La referencia url del curso debe ser menor o igual a 60.')
        }

        if (!esCodigo(codigo.trim())) {
            throw new TypeError('Solo se acepta: a-z A-Z 0-9 -')
        }

        const doc = await db
            .collectionGroup('CursosBorrador')
            .where('codigo', '==', codigo.trim())
            .limit(1)
            .get()
        
        if ( !doc.empty ) {
            throw new Errores({
                estado: 400,
                mensajeCliente: 'ya_existe_codigo_curso_borrador',
                mensajeServidor: 'El código de este curso ya esta en uso.'
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
            contribuyentes,
            titulo,  
            descripcion,
            requisitos,
            objetivos,
            nivel,
            seccion,
            categorias,
            idioma,
            subTitulos,
        } = datosCurso


        if ( contribuyentes ) {
            if ( contribuyentes.length > 4 ) {
                throw new TypeError('Por curso solo se puede tener hasta 4 contribuyentes.')
            }

            for (let i = 0; i < contribuyentes.length; i++) {
                const contribuyente = contribuyentes[i]
                
                const auth = new Authentication(contribuyente)
                const user = await auth.obtener()

                if (user.customClaims.rol === 'estudiante') {
                    throw new Errores({
                        estado: 401,
                        mensajeCliente: 'sin_permisos',
                        mensajeServidor: `El usuario ${user.displayName} no tiene los permisos para ser contribuyente de este curso.`
                    })
                }
            }
        }

        // Titulo
        if ( titulo ) {
            if ( titulo.trim().length < 10 ) {
                throw new TypeError('El titulo del curso debe ser mayor o igual a 10.')
            }
            
            if ( titulo.trim().length > 60 ) {
                throw new TypeError('El titulo del curso debe ser menor o igual a 60.')
            }
        }

        if ( descripcion ) {
            if ( descripcion.trim().length < 10 ) {
                throw new TypeError('La descripción del curso debe ser mayor o igual a 10.')
            }
            
            if ( descripcion.trim().length > 300 ) {
                throw new TypeError('La descripción del curso debe ser menor o igual a 150.')
            }
        }

        if ( requisitos ) {
            if ( requisitos.length > 10 ) {
                throw new TypeError('Hasta 10 requesitos por curso.')
            }

            for (let i = 0; i < requisitos.length; i++) {
                const requisito = requisitos[i]
                if ( requisito.trim().length > 60 ) {
                    throw new TypeError('El requisito del curso debe ser menor o igual a 60 carácteres.')
                }
            }
        }

        if ( objetivos ) {
            if ( objetivos.length > 10 ) {
                throw new TypeError('Hasta 10 objetivos por curso.')
            }

            for (let i = 0; i < objetivos.length; i++) {
                const objetivo = objetivos[i]
                if ( objetivo.trim().length > 60 ) {
                    throw new TypeError('El objetivo del curso debe ser menor o igual a 60 carácteres.')
                }
            }
        }

        if ( nivel ) {
            let nivelesDisponibles = ['basico', 'intermedio', 'avanzado']
            if ( !nivelesDisponibles.includes(nivel) ) {
                throw new Errores({
                    estado: 400,
                    mensajeCliente: 'no_existe_nivel',
                    mensajeServidor: 'Este nivel no existe.'
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
                    throw new TypeError('Por curso puede haber de 1 a 3 categorias.')
                }
            }
            let categoriasSeleccionadas = (categorias && categorias.length) ? categorias : docCurso.data().categorias

            // Verificación de existencia de la sección, categoría y subCategoría
            let ref = db.collection('Secciones').doc(seccionSeleccionada)

            for (let i = 0; i < categoriasSeleccionadas.length; i++) {
                const categoria = categoriasSeleccionadas[i]
                const doc = await ref.collection('Categorias').doc(categoria).get()

                if (!doc.exists) {
                    throw new Errores({
                        estado: 400,
                        mensajeCliente: 'no_existe_seccion_o_categorias',
                        mensajeServidor: `Hubo un problema al encontrar los datos de sección: ${seccionSeleccionada}/${categoria}.`
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
borrador.construirDatosCursoBorradorPOST = async (req = request, res = response, next) => {
    try {
        const { datos, body } = req
        const { uidSolicitante, datosAuthSolicitante } = datos
        const { datosCurso } = body

        const {
            equipo,
            titulo,
            codigo,
        } = datosCurso

        req.body.datosCurso.responsable = uidSolicitante.trim()
        req.body.datosCurso.instructor = uidSolicitante.trim()
        req.body.datosCurso.contribuyentes = [uidSolicitante.trim()]
        req.body.datosCurso.titulo = titulo.trim()
        req.body.datosCurso.codigo = codigo.trim()
        req.body.datosCurso.estadoDocumento = 'nuevo'

        const cursoBorrador = new CursoBorrador(req.body.datosCurso)
        const mensajesError = await generadorDeErroresCursoBorrador(cursoBorrador)

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
            contribuyentes,
            titulo,
            descripcion,
            requisitos,
            objetivos,
            nivel,
            seccion,
            categorias,
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
                    const categoria = categorias[i]
                    req.body.datosCurso.categorias.push( categoria.trim() )
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



// OTRAS VALIDACIONES
borrador.esResponsableDelCursoBorrador = async (req = request, res = response, next) => {
    try {
        const { datos, body, params } = req
        const { uidSolicitante, datosAuthSolicitante } = datos

        const cursoBorrador = new CursoBorrador()
        const existe = await cursoBorrador.importarDatosDeUnCurso(params.uidCurso)

        if (!existe) {
            throw new Errores({
                estado: 400,
                mensajeCliente: 'no_existe_curso_borrador',
                mensajeServidor: 'No existe este curso.'
            })
        }

        if ( cursoBorrador.responsable !== uidSolicitante ) {
            throw new Errores({
                estado: 401,
                mensajeCliente: 'sin_permisos',
                mensajeServidor: 'No sos el responsable de este curso.'
            })
        }

        next()
    } catch (error) {
        next(error)
    }
}

borrador.esAdministradorDelCursoBorrador = async (req = request, res = response, next) => {
    try {
        const { datos, body, params } = req
        const { uidSolicitante, datosAuthSolicitante } = datos

        const cursoBorrador = new CursoBorrador()
        const existe = await cursoBorrador.importarDatosDeUnCurso(params.uidCurso)

        if (!existe) {
            throw new Errores({
                estado: 400,
                mensajeCliente: 'no_existe_curso_borrador',
                mensajeServidor: 'No existe este curso.'
            })
        }

        if ( cursoBorrador.responsable !== uidSolicitante && cursoBorrador.instructor !== uidSolicitante && !cursoBorrador.auxiliares.includes(uidSolicitante) ) {
            throw new Errores({
                estado: 401,
                mensajeCliente: 'sin_permisos',
                mensajeServidor: 'No es el administrador del curso.'
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
        let error4 = await ContenidoClase.tieneErroresBorrador(uidCurso)

        let existeErrores = [error1, error2, error3, error4]

        if (existeErrores.includes(true)) {
            throw new Errores({
                estado: 400,
                mensajeCliente: 'existen_errores_en_curso_borrador',
                mensajeServidor: 'Existen errores, favor arreglar.'
            })
        }

        next()
    } catch (error) {
        next(error)
    }
}

borrador.elCursoNoTieneContenidosProcesandose = async (req = request, res = response, next) => {
    try {
        const { datos, body, params } = req
        const { uidSolicitante, datosAuthSolicitante } = datos

        const uidCurso = params.uidCurso
        
        const snapshot = await db
        .collection('CursosBorrador').doc(uidCurso)
        .collection('ContenidoClasesBorrador')
        .where('estadoContenido', '==', 'procesando').limit(1)
        .get()

        if (!snapshot.empty) {
            throw new Errores({
                estado: 401,
                mensajeCliente: 'sin_permisos',
                mensajeServidor: 'Este curso borrador tiene contenidos de clases procesandose.'
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
                estado: 400,
                mensajeCliente: 'publicando_curso',
                mensajeServidor: 'Ya se esta publicando el curso.',
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
                estado: 400,
                mensajeCliente: 'publicando_curso',
                mensajeServidor: 'Ya se esta publicando el curso.'
            })
        }

        req.datos.cursoEstadoPublicacion = cursoEstadoPublicacion

        next()
        
    } catch (error) {
        next(error)
    }
}

borrador.verificarDatosPrecioPUT = async (req = request, res = response, next) => {
    try {
        const { datos, body, params } = req
        const { uidSolicitante, datosAuthSolicitante } = datos
        const { datosPrecio } = body
        const uidCurso = params.uidCurso
        
        const datosPrecioAux = new DatosPrecio_Curso(datosPrecio)

        // Validar datos de precio
        if (datosPrecioAux.precio === undefined || typeof datosPrecioAux.precio !== 'number') {
            throw new TypeError('Datos invalidos en precio.')
        }

        if (datosPrecioAux.descuento) {
            if (datosPrecioAux.descuento.porcentaje === undefined || typeof datosPrecioAux.descuento.porcentaje !== 'number') {
                throw new TypeError('Datos invalidos en porcentaje de descuento.')
            }

            if (datosPrecioAux.descuento.fechaInicio === undefined || typeof datosPrecioAux.descuento.fechaInicio !== 'number') {
                throw new TypeError('Datos invalidos en fecha inicio de descuento.')
            }

            if (datosPrecioAux.descuento.fechaFin === undefined || typeof datosPrecioAux.descuento.fechaFin !== 'number') {
                throw new TypeError('Datos invalidos en fecha fin de descuento.')
            }
        }

        if (datosPrecioAux.precio < 0 || datosPrecioAux.precio > 2700) {
            throw new TypeError('El precio de un curso debe estar en un rango de 0JP a 2700JP.')
        }

        if (datosPrecioAux.descuento && datosPrecioAux.precio < 250) {
            throw new TypeError('Para aplicar descuentos al curso, el curso debe costar mínimo 250JP.')
        }

        if (datosPrecioAux.descuento && (datosPrecioAux.descuento.porcentaje < 0.03 || datosPrecioAux.descuento.porcentaje > 1) ) {
            throw new TypeError('El % de descuento un curso debe estar en un rango de 3% a 100%.')
        }

        if (datosPrecioAux.descuento && (!datosPrecioAux.descuento.fechaInicio || !datosPrecioAux.descuento.fechaFin) ) {
            throw new TypeError('Son requeridas las fechas desde/hasta de descuento para un curso en descuento.')
        }

        if (datosPrecioAux.descuento && (datosPrecioAux.descuento.fechaInicio >= datosPrecioAux.descuento.fechaFin) ) {
            throw new TypeError('La fecha de inicio debe ser menor que la fecha fin de descuento.')
        }

        if (datosPrecioAux.descuento) {
            let precioDescuentoIncompleto = datosPrecioAux.precio - (datosPrecioAux.precio * datosPrecioAux.descuento.porcentaje)
            datosPrecioAux.descuento.precio = Number(precioDescuentoIncompleto.toFixed())
            datosPrecioAux.descuento.fechaInicio = timestamp.milliseconds_a_timestamp(datosPrecioAux.descuento.fechaInicio)
            datosPrecioAux.descuento.fechaFin = timestamp.milliseconds_a_timestamp(datosPrecioAux.descuento.fechaFin)
        }

        // Verificar si tiene publicado
        const cursoPublicado = new CursoPublicado()
        const existeCursoPublicado = await cursoPublicado.importarDatosDeUnCurso(uidCurso)

        // Guardar datos actualizados del objeto DatosPrecioCurso 
        req.body.tienePublicado = !!existeCursoPublicado
        req.body.datosPrecio = datosPrecioAux.getDatosPrecio_Curso()
        
        next()
        
    } catch (error) {
        next(error)
    }
}

module.exports = borrador