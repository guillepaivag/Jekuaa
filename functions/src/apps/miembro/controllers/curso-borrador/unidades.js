const { request, response } = require("express")
const UnidadBorrador = require("../../../../models/Cursos/unidad/UnidadBorrador")
const Respuesta = require("../../../../models/Respuesta")
const manejadorErrores = require('../../../../helpers/ManejoErrores')
const db = require("../../../../../db")
const ContenidoClaseBorrador = require("../../../../models/Cursos/contenidoClase/ContenidoClaseBorrador")
const ClaseBorrador = require("../../../../models/Cursos/clase/ClaseBorrador")
const UnidadPublicado = require("../../../../models/Cursos/unidad/UnidadPublicado")
const ElementoCursoEliminado = require("../../../../models/Cursos/curso/ElementoCursoEliminado")

const controller = {}

// BORRADOR
controller.crearUnidadBorrador = async (req = request, res = response) => {
    try {
        const { datos, body, params } = req
        const { uidSolicitante, datosAuthSolicitante } = datos
        const { datosUnidad } = body

        const respuesta = new Respuesta()
        let codigo = 'exito'

        // Crear una unidadBorrador para un cursoBorrador
        const unidadBorrador = new UnidadBorrador(datosUnidad)
        await UnidadBorrador.agregar(params.uidCurso, unidadBorrador)

        // Retornar respuesta
        respuesta.setRespuestaPorCodigo(codigo, {
            mensaje: '¡Se creó una unidad para este curso!',
            resultado: null
        })
        const status = respuesta.getStatusCode()
        
        return res.status( status ).json( respuesta.getRespuesta() )

    } catch (error) {
        console.log('Error - crearUnidadBorrador: ', error)

        const {
            status,
            respuesta
        } = manejadorErrores( error )

        return res.status( status ).json( respuesta )
    }
}

controller.actualizarUnidadBorrador = async (req = request, res = response) => {
    try {
        const { datos, body, params } = req
        const { uidSolicitante, datosAuthSolicitante } = datos
        const { datosUnidad } = body

        const respuesta = new Respuesta()
        let codigo = 'exito'

        // Actualizar nombre de una unidadBorrador para un cursoBorrador
        await UnidadBorrador.actualizar(params.uidCurso, 
            params.uidUnidad, 
            datosUnidad)

        // Retornar respuesta
        respuesta.setRespuestaPorCodigo(codigo, {
            mensaje: `¡Se actualizó el nombre de la unidad para este curso!`,
            resultado: null
        })
        const status = respuesta.getStatusCode()
        
        return res.status( status ).json( respuesta.getRespuesta() )

    } catch (error) {
        console.log('Error - actualizarUnidadBorrador: ', error)

        const {
            status,
            respuesta
        } = manejadorErrores( error )

        return res.status( status ).json( respuesta )
    }
}

controller.actualizarOrdenUnidadBorrador = async (req = request, res = response) => {
    try {
        const { datos, body, params } = req
        const { uidSolicitante, datosAuthSolicitante } = datos
        const { datosUnidad } = body

        const respuesta = new Respuesta()
        let codigo = 'exito'

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
        respuesta.setRespuestaPorCodigo(codigo, {
            mensaje: `¡Se actualizó el orden de la unidad para este curso!`,
            resultado: datosUnidad
        })
        const status = respuesta.getStatusCode()
        
        return res.status( status ).json( respuesta.getRespuesta() )

    } catch (error) {
        console.log('Error - actualizarNombreUnidadBorrador: ', error)

        const {
            status,
            respuesta
        } = manejadorErrores( error )

        return res.status( status ).json( respuesta )
    }
}

controller.eliminarUnidadBorrador = async (req = request, res = response) => {
    try {
        const { datos, body, params } = req
        const { uidSolicitante, datosAuthSolicitante } = datos

        const respuesta = new Respuesta()
        let codigo = 'exito'

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
            ClaseBorrador.eliminar(params.uidCurso,
                params.uidUnidad,
                claseBorrador.uid)

            // Eliminar documento contenido
            ContenidoClaseBorrador.eliminarDocumento(params.uidCurso,
                claseBorrador.uid)

            // Eliminar documentos complementos

            // Eliminar documentos subtitulos

            // Eliminar archivos (en cloud storage) de una clase
            ContenidoClaseBorrador.eliminarContenidoPrefix({
                verificacion: false,
                rutaContenidoPrefix: `${params.uidCurso}/${claseBorrador.uid}`
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

        // Eliminar el documento unidad
        UnidadBorrador.eliminar(params.uidCurso, params.uidUnidad)

        const unidadBorrador = new UnidadBorrador()
        await unidadBorrador.importarUnidadPorUID(params.uidCurso, params.uidUnidad)

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
        respuesta.setRespuestaPorCodigo(codigo, {
            mensaje: `¡Se eliminó una unidad!`,
            resultado: null
        })
        const status = respuesta.getStatusCode()
        
        res.status( status ).json( respuesta.getRespuesta() )

    } catch (error) {
        console.log('Error - eliminarUnidadBorrador: ', error)

        const {
            status,
            respuesta
        } = manejadorErrores( error )

        res.status( status ).json( respuesta )
    }
}

module.exports = controller