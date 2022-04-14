const { request, response } = require("express")
const admin = require("../../../../../firebase-service")
const ClaseBorrador = require("../../../../models/Cursos/clase/ClaseBorrador")
const manejadorErrores = require('../../../../helpers/ManejoErrores')
const Respuesta = require("../../../../models/Respuesta")
const Errores = require("../../../../models/Error/Errores")
const config = require("../../../../../config")
const ContenidoClaseBorrador = require("../../../../models/Cursos/contenidoClase/ContenidoClaseBorrador")
const Clase = require("../../../../models/Cursos/clase/Clase")
const db = require("../../../../../db")
const UnidadBorrador = require("../../../../models/Cursos/unidad/UnidadBorrador")

const controller = {}

// Se crea el documento clase y el documento contenidoClase
controller.crearClaseBorrador = async (req = request, res = response) => {
    try {
        const { datos, body, params } = req
        const { uidSolicitante, datosAuthSolicitante } = datos
        const { datosClase } = body

        const respuesta = new Respuesta()
        let codigo = 'exito'

        // Crear documento clase
        const claseBorrador = new ClaseBorrador(datosClase)
        await ClaseBorrador.agregar(params.uidCurso, 
            params.uidUnidad, 
            claseBorrador)

        // Crear documento contenido
        const contenidoClaseBorrador = new ContenidoClaseBorrador({ 
            uid: claseBorrador.uid,
            mensajesError: ['Falta agregar contenido.'],
            contieneErrores: true,
            estadoDocumento: 'nuevo'
        })
        ContenidoClaseBorrador.agregarDocumento(params.uidCurso,
            contenidoClaseBorrador)

        // Retornar respuesta
        respuesta.setRespuestaPorCodigo(codigo, {
            mensaje: '¡Se creó una clase para este curso!',
            resultado: null
        })
        const status = respuesta.getStatusCode()
        
        return res.status( status ).json( respuesta.getRespuesta() )

    } catch (error) {
        console.log('Error - crearClaseBorrador: ', error)

        const {
            status,
            respuesta
        } = manejadorErrores( error )

        return res.status( status ).json( respuesta )
    }
}





// Solo actualiza titulo, descripcion
controller.actualizarClaseBorrador = async (req = request, res = response) => {
    try {
        const { datos, body, params } = req
        const { uidSolicitante, datosAuthSolicitante } = datos
        const { datosClase } = body

        const respuesta = new Respuesta()
        let codigo = 'exito'

        // Crear una unidadBorrador para un cursoBorrador
        await ClaseBorrador.actualizar(params.uidCurso, 
            params.uidUnidad, 
            params.uidClase, 
            datosClase)

        // Retornar respuesta
        respuesta.setRespuestaPorCodigo(codigo, {
            mensaje: '¡Se actualizó una clase para este curso!',
            resultado: null
        })
        const status = respuesta.getStatusCode()
        
        return res.status( status ).json( respuesta.getRespuesta() )

    } catch (error) {
        console.log('Error - actualizarClaseBorrador: ', error)

        const {
            status,
            respuesta
        } = manejadorErrores( error )

        return res.status( status ).json( respuesta )
    }
}





// Se actualiza el orden de clases
controller.actualizarOrdenClaseBorrador = async (req = request, res = response) => {
    try {
        const { datos, body, params } = req
        const { uidSolicitante, datosAuthSolicitante } = datos
        const { datosClase } = body

        const respuesta = new Respuesta()
        let codigo = 'exito'

        const arrayUidClases = Object.keys(datosClase)

        // Actualizar orden de las unidades
        for (let i = 0; i < arrayUidClases.length; i++) {
            const uidClase = arrayUidClases[i]
            const ordenClaseActualizada = datosClase[uidClase]

            // Crear una unidadBorrador para un cursoBorrador
            await ClaseBorrador.actualizar(params.uidCurso, 
            params.uidUnidad, 
            uidClase, 
            ordenClaseActualizada)
        }

        // Retornar respuesta
        respuesta.setRespuestaPorCodigo(codigo, {
            mensaje: '¡Se actualizó una clase para este curso!',
            resultado: null
        })
        const status = respuesta.getStatusCode()
        
        return res.status( status ).json( respuesta.getRespuesta() )

    } catch (error) {
        console.log('Error - actualizarOrdenClaseBorrador: ', error)

        const {
            status,
            respuesta
        } = manejadorErrores( error )

        return res.status( status ).json( respuesta )
    }
}





// Se obtiene la ultima clase de la unidad nueva
// Se obtiene la clase a cambiar de unidad
// Se obtiene los datos de la unidad nueva
// Se elimina la clase de la unidad vieja
// Se agrega la clase a la unidad nueva
controller.actualizarUnidadClaseBorrador = async (req = request, res = response) => {
    try {
        const { datos, body, params } = req
        const { uidSolicitante, datosAuthSolicitante } = datos
        const { uidUnidadNueva } = body

        const respuesta = new Respuesta()
        let codigo = 'exito'

        if ( params.uidUnidad === uidUnidadNueva ) {
            throw new Errores({
                codigo: 'error/usuario_mala_solicitud',
                mensaje: 'La unidad actual debe ser diferente a la nueva.'
            })
        }

        // Obtener datos
        const claseBorrador = new ClaseBorrador()
        const existeClaseBorrador = await claseBorrador.importarClasePorUID(params.uidCurso, params.uidUnidad, params.uidClase)
        if (!existeClaseBorrador) {
            throw new Errores({
                codigo: 'error/usuario_mala_solicitud',
                mensaje: 'La clase borrador no existe.'
            })
        }

        const unidadBorrador = new UnidadBorrador()
        const existeUnidadBorrador = await unidadBorrador.importarUnidadPorUID(params.uidCurso, params.uidUnidad)
        if (!existeUnidadBorrador) {
            throw new Errores({
                codigo: 'error/usuario_mala_solicitud',
                mensaje: 'La unidad borrador nueva para la clase no existe.'
            })
        }

        // Agregar la clase a la nueva unidad
        if (claseBorrador.estadoDocumento === '') 
            claseBorrador.estadoDocumento = `cambioUnidad/${params.uidUnidad}/${uidUnidadNueva}`
        
        if (claseBorrador.estadoDocumento === 'nuevo') 
            claseBorrador.estadoDocumento = 'nuevo'
        
        if (claseBorrador.estadoDocumento === 'actualizado') 
            claseBorrador.estadoDocumento = `cambioUnidad/${params.uidUnidad}/${uidUnidadNueva}`
        
        if ( claseBorrador.estadoDocumento.includes('cambioUnidad') ) {

            let doc = await db
            .collection('CursosPublicado').doc(params.uidCurso)
            .collection('UnidadesPublicado').doc(uidUnidadNueva)
            .collection('ClasesPublicado').doc(params.uidClase)
            .get()

            if (!doc.exists) {
                // 'cambioUnidad'
                claseBorrador.estadoDocumento = `cambioUnidad/${params.uidUnidad}/${uidUnidadNueva}`
            } else {
                // '', 'actualizado'
                const clasePublicada = new Clase( doc.data() )

                let huboCambio = false
                if ( !huboCambio ) 
                    huboCambio = clasePublicada.ordenClase !== claseBorrador.ordenClase
                
                if ( !huboCambio ) 
                    huboCambio = clasePublicada.titulo !== claseBorrador.titulo

                if ( !huboCambio ) 
                    huboCambio = clasePublicada.descripcion !== claseBorrador.descripcion

                if ( !huboCambio ) 
                    huboCambio = clasePublicada.duracionClase !== claseBorrador.duracionClase
                
                if ( !huboCambio ) 
                    huboCambio = clasePublicada.tipoClase !== claseBorrador.tipoClase

                if ( !huboCambio ) {
                    if ( clasePublicada.uidArchivos.length === claseBorrador.uidArchivos.length ) {
                        for (let i = 0; i < clasePublicada.uidArchivos.length; i++) {
                            const element = clasePublicada.uidArchivos[i]
                            if ( !claseBorrador.uidArchivos.includes(element) ) {
                                huboCambio = true
                                break
                            }
                        }
                    } else {
                        huboCambio = true
                    }
                }

                // Si es un documento sin cambios y hubo un cambio, actualizar a "actualizado"
                if ( huboCambio ) 
                    claseBorrador.estadoDocumento = 'actualizado'

                // Si es un documento con cambios y no hubo cambios, actualizar a ""
                if ( !huboCambio ) 
                    claseBorrador.estadoDocumento = ''
            }
        }

        // Ultima clase de la unidad nueva
        const ultimaClase = await ClaseBorrador.obtenerUltimaClasePorCursoUnidad(params.uidCurso, 
            uidUnidadNueva)

        claseBorrador.ordenClase = ultimaClase ? ultimaClase.ordenClase + 1 : 1

        ClaseBorrador.agregar(params.uidCurso, 
        uidUnidadNueva, 
        claseBorrador)

        // Eliminar datos
        ClaseBorrador.eliminar(params.uidCurso,
        params.uidUnidad,
        params.uidClase)

        // Retornar respuesta
        respuesta.setRespuestaPorCodigo(codigo, {
            mensaje: '¡Se actualizó la unidad de esta clase!',
            resultado: null
        })
        const status = respuesta.getStatusCode()
        
        return res.status( status ).json( respuesta.getRespuesta() )

    } catch (error) {
        console.log('Error - actualizarUnidadClaseBorrador: ', error)

        const {
            status,
            respuesta
        } = manejadorErrores( error )

        return res.status( status ).json( respuesta )
    }
}





// Se elimina el documento clase, el documento contenido,
// los documentos subtitulos, los documentos complementos
// y todos los archivos en storage
controller.eliminarClaseBorrador = async (req = request, res = response) => {
    try {
        const { datos, body, params } = req
        const { uidSolicitante, datosAuthSolicitante } = datos

        const respuesta = new Respuesta()
        let codigo = 'exito'

        // Eliminar documento clase
        ClaseBorrador.eliminar(params.uidCurso,
            params.uidUnidad,
            params.uidClase)

        // Eliminar documento contenido
        ContenidoClaseBorrador.eliminarDocumento(params.uidCurso,
            params.uidClase)

        // Eliminar documentos complementos

        // Eliminar documentos subtitulos

        // Eliminar archivos (en cloud storage) de una clase
        const rutaModo = config.environment.mode === 'production' ? 'prod' : 'dev'
        let bucketNameContenidoBorrador = rutaModo === 'prod' ? 'j-cursos-contenido-b' : 'j-cursos-contenido-b-dev'
        Clase.eliminarArchivo(bucketNameContenidoBorrador, `${params.uidCurso}/${params.uidClase}`)

        // Retornar respuesta
        respuesta.setRespuestaPorCodigo(codigo, {
            mensaje: '¡Se eliminó una clase!',
            resultado: null
        })
        const status = respuesta.getStatusCode()
        
        res.status( status ).json( respuesta.getRespuesta() )

    } catch (error) {
        console.log('Error - eliminarClaseBorrador: ', error)

        const {
            status,
            respuesta
        } = manejadorErrores( error )

        res.status( status ).json( respuesta )
    }
}


module.exports = controller