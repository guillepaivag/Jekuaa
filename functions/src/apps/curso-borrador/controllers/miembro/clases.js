const { request, response } = require("express")
const ClaseBorrador = require("../../../../models/Cursos/clase/ClaseBorrador")
const Respuesta = require("../../../../models/Respuesta")
const Errores = require("../../../../models/Error/Errores")
const Clase = require("../../../../models/Cursos/clase/Clase")
const UnidadBorrador = require("../../../../models/Cursos/unidad/UnidadBorrador")
const ElementoCursoEliminado = require("../../../../models/Cursos/curso/ElementoCursoEliminado")
const ContenidoClase = require("../../../../models/Cursos/contenidoClase/ContenidoClase")
const manejadorErrores = require('../../../../helpers/manejoErrores')
const db = require("../../../../../db")
const config = require("../../../../../config")

const controller = {}

// Se crea el documento clase y el documento contenidoClase
controller.crearClaseBorrador = async (req = request, res = response) => {
    try {
        const { datos, body, params } = req
        const { uidSolicitante, datosAuthSolicitante } = datos
        const { datosClase } = body

        const respuesta = new Respuesta()
        let estado = 'exito'

        // Crear documento clase
        const claseBorrador = new ClaseBorrador(datosClase)
        await ClaseBorrador.agregar(params.uidCurso, 
            params.uidUnidad, 
            claseBorrador)

        // Crear documento contenido
        const contenidoClase = new ContenidoClase({
            uid: claseBorrador.uid,
            tipoContenido: '',
        })
        await ContenidoClase.agregarDocumentoBorrador(params.uidCurso, {
            ...contenidoClase.getContenidoClase(),
            mensajesError: ['falta_agregar_contenido'],
            contieneErrores: true,
            estadoDocumento: 'nuevo',
            estadoContenido: '',
        })

        // Retornar respuesta
        respuesta.setRespuesta({
            estado: 200,
            mensaje: 'exito',
            resultado: {
                uid: claseBorrador.uid, 
                claseBorrador, 
                contenidoClaseBorrador: contenidoClase
            },
        })
        
        return res.status( respuesta.estado ).json( respuesta.getRespuesta() )

    } catch (error) {
        console.log('Error - crearClaseBorrador: ', error)

        const respuesta = manejadorErrores( error )
        return res.status( respuesta.estado ).json( respuesta.getRespuesta() )
    }
}





// Solo actualiza titulo, descripcion
controller.actualizarClaseBorrador = async (req = request, res = response) => {
    try {
        const { datos, body, params } = req
        const { uidSolicitante, datosAuthSolicitante } = datos
        const { datosClase } = body

        const respuesta = new Respuesta()
        let estado = 'exito'

        // Crear una unidadBorrador para un cursoBorrador
        await ClaseBorrador.actualizar(params.uidCurso, 
            params.uidUnidad, 
            params.uidClase, 
            datosClase)

        // Retornar respuesta
        respuesta.setRespuesta({
            estado: 200,
            mensaje: 'exito',
            resultado: null
        })
        
        return res.status( respuesta.estado ).json( respuesta.getRespuesta() )

    } catch (error) {
        console.log('Error - actualizarClaseBorrador: ', error)

        const respuesta = manejadorErrores( error )
        return res.status( respuesta.estado ).json( respuesta.getRespuesta() )
    }
}





// Se actualiza el orden de clases
controller.actualizarOrdenClaseBorrador = async (req = request, res = response) => {
    try {
        const { datos, body, params } = req
        const { uidSolicitante, datosAuthSolicitante } = datos
        const { datosClase } = body

        const respuesta = new Respuesta()
        let estado = 'exito'

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
        respuesta.setRespuesta({
            estado: 200,
            mensaje: 'exito',
            resultado: null
        })
        
        return res.status( respuesta.estado ).json( respuesta.getRespuesta() )

    } catch (error) {
        console.log('Error - actualizarOrdenClaseBorrador: ', error)

        const respuesta = manejadorErrores( error )
        return res.status( respuesta.estado ).json( respuesta.getRespuesta() )
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

        if ( params.uidUnidad === uidUnidadNueva ) {
            throw new TypeError('La unidad actual debe ser diferente a la nueva.')
        }

        // Obtener datos
        const claseBorrador = new ClaseBorrador()
        const existeClaseBorrador = await claseBorrador.importarClasePorUID(params.uidCurso, params.uidUnidad, params.uidClase)
        if (!existeClaseBorrador) {
            throw new Errores({
                estado: 400,
                mensajeCliente: 'no_existe_clase_borrador',
                mensajeServidor: 'La clase borrador no existe.'
            })
        }

        const unidadBorrador = new UnidadBorrador()
        const existeUnidadBorrador = await unidadBorrador.importarUnidadPorUID(params.uidCurso, params.uidUnidad)
        if (!existeUnidadBorrador) {
            throw new Errores({
                estado: 400,
                mensajeCliente: 'no_existe_unidad_borrador',
                mensajeServidor: 'La unidad borrador nueva para la clase no existe.'
            })
        }

        // Agregar la clase a la nueva unidad
        if (claseBorrador.estadoDocumento === '') 
            claseBorrador.estadoDocumento = `cambioUnidad/${params.uidUnidad}/${uidUnidadNueva}`
        
        else if (claseBorrador.estadoDocumento === 'nuevo') 
            claseBorrador.estadoDocumento = 'nuevo'
        
        else if (claseBorrador.estadoDocumento === 'actualizado') 
            claseBorrador.estadoDocumento = `cambioUnidad/${params.uidUnidad}/${uidUnidadNueva}`
        
        else if ( claseBorrador.estadoDocumento.includes('cambioUnidad') ) {

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
                    huboCambio = clasePublicada.duracion !== claseBorrador.duracion
                
                if ( !huboCambio ) 
                    huboCambio = clasePublicada.tipoClase !== claseBorrador.tipoClase

                if ( !huboCambio ) {
                    if ( clasePublicada.complementos.length === claseBorrador.complementos.length ) {
                        for (let i = 0; i < clasePublicada.complementos.length; i++) {
                            const element = clasePublicada.complementos[i]
                            if ( !claseBorrador.complementos.includes(element) ) {
                                huboCambio = true
                                break
                            }
                        }
                    } else {
                        huboCambio = true
                    }
                }

                if ( !huboCambio ) {
                    if ( clasePublicada.subtitulos.length === claseBorrador.subtitulos.length ) {
                        for (let i = 0; i < clasePublicada.subtitulos.length; i++) {
                            const element = clasePublicada.subtitulos[i]
                            if ( !claseBorrador.subtitulos.includes(element) ) {
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

        await ClaseBorrador.agregar(params.uidCurso, 
            uidUnidadNueva, 
            claseBorrador)

        // Eliminar datos
        await ClaseBorrador.eliminar(params.uidCurso,
            params.uidUnidad,
            params.uidClase)

        // Retornar respuesta
        respuesta.setRespuesta({
            estado: 200,
            mensaje: 'exito',
            resultado: claseBorrador
        })
        
        return res.status( respuesta.estado ).json( respuesta.getRespuesta() )

    } catch (error) {
        console.log('Error - actualizarUnidadClaseBorrador: ', error)

        const respuesta = manejadorErrores( error )
        return res.status( respuesta.estado ).json( respuesta.getRespuesta() )
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
        let estado = 'exito'
        const rutaModo = config.environment.mode === 'production' ? 'prod' : 'dev'
        const bucketNameContenidoBorrador = rutaModo === 'prod' ? 'prod-j-cursos-contenido-b' : 'dev-j-cursos-contenido-b'

        const claseBorrador = new ClaseBorrador()
        await claseBorrador.importarClasePorUID(params.uidCurso, params.uidUnidad, params.uidClase)

        // Eliminar documento clase
        await ClaseBorrador.eliminar(params.uidCurso,
            params.uidUnidad,
            params.uidClase)

        // Eliminar documento contenido
        await ContenidoClase.eliminarDocumentoBorrador(params.uidCurso, params.uidClase)

        // Eliminar documentos complementos

        // Eliminar documentos subtitulos

        // Eliminar archivos (en cloud storage) de una clase
        await ContenidoClase.eliminarContenidoArchivo({
            bucketName: bucketNameContenidoBorrador,
            rutaPrefix: `${params.uidCurso}/${params.uidClase}/`
        })

        if (claseBorrador.estadoDocumento !== 'nuevo') {
            // CLASE
            const elementoCursoEliminado1 = new ElementoCursoEliminado()
            elementoCursoEliminado1.setTipo('clase')
            elementoCursoEliminado1.setDatos({
                uidCurso: params.uidCurso,
                uidUnidad: params.uidUnidad,
                uidClase: params.uidClase,
            })

            ElementoCursoEliminado.agregar(params.uidCurso, elementoCursoEliminado1)

            // CONTENIDO CLASE
            const elementoCursoEliminado2 = new ElementoCursoEliminado()
            elementoCursoEliminado2.setTipo('contenidoClase')
            elementoCursoEliminado2.setDatos({
                uidCurso: params.uidCurso,
                uidUnidad: '',
                uidClase: params.uidClase,
            })

            ElementoCursoEliminado.agregar(params.uidCurso, elementoCursoEliminado2)
        }

        // Retornar respuesta
        respuesta.setRespuesta({
            estado: 200,
            mensaje: 'exito',
            resultado: null
        })
        
        return res.status( respuesta.estado ).json( respuesta.getRespuesta() )

    } catch (error) {
        console.log('Error - eliminarClaseBorrador: ', error)

        const respuesta = manejadorErrores( error )
        return res.status( respuesta.estado ).json( respuesta.getRespuesta() )
    }
}


module.exports = controller