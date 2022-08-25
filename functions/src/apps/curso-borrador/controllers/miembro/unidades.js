const { request, response } = require("express")
const UnidadBorrador = require("../../../../models/Cursos/unidad/UnidadBorrador")
const Respuesta = require("../../../../models/Respuesta")
const manejadorErrores = require('../../../../helpers/manejoErrores')
const ClaseBorrador = require("../../../../models/Cursos/clase/ClaseBorrador")
const UnidadPublicado = require("../../../../models/Cursos/unidad/UnidadPublicado")
const ElementoCursoEliminado = require("../../../../models/Cursos/curso/ElementoCursoEliminado")
const ContenidoClase = require("../../../../models/Cursos/contenidoClase/ContenidoClase")
const db = require("../../../../../db")
const config = require("../../../../../config")

const controller = {}

// BORRADOR
controller.crearUnidadBorrador = async (req = request, res = response) => {
    try {
        const { datos, body, params } = req
        const { uidSolicitante, datosAuthSolicitante } = datos
        const { datosUnidad } = body

        const respuesta = new Respuesta()
        let estado = 'exito'

        // Crear una unidadBorrador para un cursoBorrador
        const unidadBorrador = new UnidadBorrador(datosUnidad)
        await UnidadBorrador.agregar(params.uidCurso, unidadBorrador)

        // Retornar respuesta
        respuesta.setRespuesta({
            estado: 200,
            mensaje: 'exito',
            resultado: unidadBorrador
        })
        
        return res.status( respuesta.estado ).json( respuesta.getRespuesta() )

    } catch (error) {
        console.log('Error - crearUnidadBorrador: ', error)

        const respuesta = manejadorErrores( error )
        return res.status( respuesta.estado ).json( respuesta.getRespuesta() )
    }
}

controller.actualizarUnidadBorrador = async (req = request, res = response) => {
    try {
        const { datos, body, params } = req
        const { uidSolicitante, datosAuthSolicitante } = datos
        const { datosUnidad } = body

        const respuesta = new Respuesta()
        let estado = 'exito'

        // Actualizar nombre de una unidadBorrador para un cursoBorrador
        await UnidadBorrador.actualizar(params.uidCurso, 
            params.uidUnidad, 
            datosUnidad)

        // Retornar respuesta
        respuesta.setRespuesta({
            estado: 200,
            mensaje: 'exito',
            resultado: null
        })
        
        return res.status( respuesta.estado ).json( respuesta.getRespuesta() )

    } catch (error) {
        console.log('Error - actualizarUnidadBorrador: ', error)

        const respuesta = manejadorErrores( error )
        return res.status( respuesta.estado ).json( respuesta.getRespuesta() )
    }
}

controller.actualizarOrdenUnidadBorrador = async (req = request, res = response) => {
    try {
        const { datos, body, params } = req
        const { uidSolicitante, datosAuthSolicitante } = datos
        const { datosUnidad } = body

        const respuesta = new Respuesta()
        let estado = 'exito'

        const arrayUidUnidades = Object.keys(datosUnidad)

        // Actualizar orden de las unidades
        for (let i = 0; i < arrayUidUnidades.length; i++) {
            const uidUnidad = arrayUidUnidades[i]
            UnidadBorrador.actualizar(params.uidCurso, 
                uidUnidad, 
                datosUnidad[uidUnidad])

            const snapshot = await db
            .collection('CursosBorrador').doc(params.uidCurso)
            .collection('UnidadesBorrador').doc(uidUnidad)
            .collection('ClasesBorrador').get()

            for (let i = 0; i < snapshot.docs.length; i++) {
                const doc = snapshot.docs[i]
                doc.ref.update({
                    unidad: datosUnidad[uidUnidad].ordenUnidad
                })
            }
        }

        // Retornar respuesta
        respuesta.setRespuesta({
            estado: 200,
            mensaje: 'exito',
            resultado: datosUnidad
        })
        
        return res.status( respuesta.estado ).json( respuesta.getRespuesta() )

    } catch (error) {
        console.log('Error - actualizarNombreUnidadBorrador: ', error)

        const respuesta = manejadorErrores( error )
        return res.status( respuesta.estado ).json( respuesta.getRespuesta() )
    }
}

controller.eliminarUnidadBorrador = async (req = request, res = response) => {
    try {
        const { datos, body, params } = req
        const { uidSolicitante, datosAuthSolicitante } = datos

        const respuesta = new Respuesta()
        let estado = 'exito'
        const rutaModo = config.environment.mode === 'production' ? 'prod' : 'dev'
        const bucketNameContenidoBorrador = rutaModo === 'prod' ? 'prod-j-cursos-contenido-b' : 'dev-j-cursos-contenido-b'

        // Eliminar los documentos clases, contenido, complementos, subtitulos y archivos (en cloud storage)
        const snapshot = await db
            .collection('CursosBorrador').doc(params.uidCurso)
            .collection('UnidadesBorrador').doc(params.uidUnidad)
            .collection('ClasesBorrador').get()

        for (let i = 0; i < snapshot.docs.length; i++) {
            const doc = snapshot.docs[i]

            // Crear un objeto tipo "ClaseBorrador"
            const claseBorrador = new ClaseBorrador(doc.data())

            // Eliminar documento clase
            await ClaseBorrador.eliminar(params.uidCurso,
                params.uidUnidad,
                claseBorrador.uid)

            // Eliminar documento contenido
            await ContenidoClase.eliminarDocumentoBorrador(params.uidCurso,
                claseBorrador.uid)

            // Eliminar documentos complementos

            // Eliminar documentos subtitulos

            // Eliminar archivos (en cloud storage) de una clase
            await ContenidoClase.eliminarContenidoArchivo({
                bucketName: bucketNameContenidoBorrador,
                rutaPrefix: `${params.uidCurso}/${claseBorrador.uid}/`
            })

            if (claseBorrador.estadoDocumento !== 'nuevo') {
                // CLASE
                const elementoCursoEliminado1 = new ElementoCursoEliminado()
                elementoCursoEliminado1.setTipo('clase')
                elementoCursoEliminado1.setDatos({
                    uidCurso: params.uidCurso,
                    uidUnidad: params.uidUnidad,
                    uidClase: claseBorrador.uid,
                })

                ElementoCursoEliminado.agregar(params.uidCurso, elementoCursoEliminado1)

                // CONTENIDO CLASE
                const elementoCursoEliminado2 = new ElementoCursoEliminado()
                elementoCursoEliminado2.setTipo('contenidoClase')
                elementoCursoEliminado2.setDatos({
                    uidCurso: params.uidCurso,
                    uidUnidad: '',
                    uidClase: claseBorrador.uid,
                })

                ElementoCursoEliminado.agregar(params.uidCurso, elementoCursoEliminado2)
            }
        }

        const unidadBorrador = new UnidadBorrador()
        await unidadBorrador.importarUnidadPorUID(params.uidCurso, params.uidUnidad)

        // Eliminar el documento unidad
        await UnidadBorrador.eliminar(params.uidCurso, params.uidUnidad)

        if (unidadBorrador.estadoDocumento !== 'nuevo') {
            const elementoCursoEliminado = new ElementoCursoEliminado()
            elementoCursoEliminado.setTipo('unidad')
            elementoCursoEliminado.setDatos({
                uidCurso: params.uidCurso,
                uidUnidad: params.uidUnidad,
                uidClase: '',
            })

            ElementoCursoEliminado.agregar(params.uidCurso, elementoCursoEliminado)
        }

        // Retornar respuesta
        respuesta.setRespuesta({
            estado: 200,
            mensaje: 'exito',
            resultado: null
        })
        
        return res.status( respuesta.estado ).json( respuesta.getRespuesta() )

    } catch (error) {
        console.log('Error - eliminarUnidadBorrador: ', error)

        const respuesta = manejadorErrores( error )
        return res.status( respuesta.estado ).json( respuesta.getRespuesta() )
    }
}

module.exports = controller