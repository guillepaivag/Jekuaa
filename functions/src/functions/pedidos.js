const functions = require('firebase-functions')
const admin = require('../../firebase-service')
const db = require('../../db')
const config = require('../../config')
const { milliseconds_a_timestamp } = require('../utils/timestamp')
const CursoPublicado = require('../models/Cursos/curso/CursoPublicado')
const DetallesItem = require('../models/DetallesItem')
const Usuario = require('../models/Usuarios/Usuario')
const MisCursos = require('../models/MisCursos')
const Miembro = require('../models/Usuarios/TiposUsuarios/Miembro')
const RegistroActividadProducto = require('../models/RegistroActividadProducto')
const PedidoProducto = require('../models/PedidoProducto')


const ff = {}
const rutaModo = config.environment.mode === 'production' ? 'prod' : 'dev'
const incrementar = admin.firestore.FieldValue.increment(1)
const decrementar = admin.firestore.FieldValue.increment(-1)








ff.pedidoProductoCompletado = functions
.region('southamerica-east1')
.firestore.document('Usuarios/{uidUsuario}/PedidosProductos/{uidPedido}')
.onUpdate(async ( change, context ) => {
    const docNuevo = change.after
    const docViejo = change.before
    const { uidUsuario, uidPedido } = context.params
    
    const pedidoProductoViejo = new PedidoProducto(docViejo.data())
    const pedidoProductoNuevo = new PedidoProducto(docNuevo.data())

    const recienCompletadoElPedidoProducto = pedidoProductoViejo.estado === 'pendiente' && pedidoProductoNuevo.estado === 'completado'
    if (recienCompletadoElPedidoProducto) {
        for (const item of pedidoProductoNuevo.items) {
            let uidMiembro = ''
            let oldDataEstudianteMiembro = null
            let newDataEstudianteMiembro = null
            
            if (item.tipoItem === 'curso') {
                
                // Aumentar cantidad de estudiantes
                CursoPublicado.actualizarCurso(item.uidItem, {
                    cantidadEstudiantes: incrementar,
                })

                // Obtenemos el instructor
                const cursoPublicado = await CursoPublicado.obtenerCurso(item.uidItem)
                uidMiembro = cursoPublicado.instructor

                // Aumentar cantidad de estudiantes por miembro
                const docEstudianteMiembro = await db
                .collection('Miembros').doc(uidMiembro)
                .collection('EstudiantesDeMiembro').doc(uidUsuario)
                .get()

                if (docEstudianteMiembro.exists) {
                    docEstudianteMiembro.ref.update({
                        cantidadCursos: incrementar,
                    })

                    oldDataEstudianteMiembro = docEstudianteMiembro.data()

                    newDataEstudianteMiembro = JSON.parse( JSON.stringify( docEstudianteMiembro.data() ) )
                    newDataEstudianteMiembro.cantidadCursos++

                } else {
                    docEstudianteMiembro.ref.set({
                        uid: uidUsuario,
                        cantidadCursos: 1,
                    })

                    oldDataEstudianteMiembro = {
                        uid: uidUsuario,
                        cantidadCursos: 0,
                    }

                    newDataEstudianteMiembro = {
                        uid: uidUsuario,
                        cantidadCursos: 1,
                    }
                }

            }

            const referenciaPedido = db.collection('Usuarios').doc(pedidoProductoNuevo.uidComprador).collection('PedidosProductos').doc(pedidoProductoNuevo.uid)
            const referenciaDetallesItem = db.collection('Usuarios').doc(pedidoProductoNuevo.uidComprador).collection('PedidosProductos').doc(pedidoProductoNuevo.uid).collection('DetallesItems').doc(pedidoNuevo.uid)
            const registroActividadProducto = new RegistroActividadProducto({
                uidComprador: pedidoProductoNuevo.uidComprador, 
                uidVendedor: uidMiembro, 
                tipoProducto: item.tipoItem, 
                uidProducto: item.uidItem, 
                uidPedido: pedidoProductoNuevo.uid, 
                referenciaPedido,
                uidDetallesItem: item.uidItem, 
                referenciaDetallesItem, 
                fechaCompra: pedidoProductoNuevo.fechaCompra, 
                fechaReembolso: null,
            })

            RegistroActividadProducto.agregarRegistroActividadProducto(registroActividadProducto)

            const esNuevoEstudianteDeMiembro = (oldDataEstudianteMiembro.cantidadCursos === 0 && newDataEstudianteMiembro.cantidadCursos === 1)
            if (esNuevoEstudianteDeMiembro) {
                await Miembro.actualizarMiembro(uidMiembro, {
                    cantidadEstudiantes: incrementar,
                })
            }
        }
    }

    return true
})





ff.reembolsoDeUnProducto = functions
.region('southamerica-east1')
.firestore.document('Usuarios/{uidUsuario}/PedidosProductos/{uidPedido}/DetallesItems/{uidDetallesItem}')
.onUpdate(async ( change, context ) => {
    const docViejo = change.before
    const docNuevo = change.after
    const { uidUsuario, uidPedido, uidDetallesItem } = context.params
    
    const detallesItemViejo = new DetallesItem(docViejo.data())
    const detallesItemNuevo = new DetallesItem(docNuevo.data())

    const recienReembolsado = detallesItemViejo.fechaReembolsado === null && detallesItemNuevo.fechaReembolsado !== null
    if (recienReembolsado) {
        
        // Para el pedido
        const pedidoProducto = await PedidoProducto.obtener(uidUsuario, uidPedido)
        let producto = null
        const datosActualizados = {}

        // 1.1.1. cantidadReembolsado++
        pedidoProducto.cantidadReembolsado++
        datosActualizados.cantidadReembolsado = pedidoProducto.cantidadReembolsado

        // 1.1.2. cantidadItems === cantidadReembolsado ? todoReembolsado = true : ''
        if (pedidoProducto.cantidadItems === pedidoProducto.cantidadReembolsado) 
            datosActualizados.todoReembolsado = true

        // 1.1.3. tieneReembolso = true
        datosActualizados.tieneReembolso = true

        PedidoProducto.actualizar(uidUsuario, uidPedido, datosActualizados)

		let uidMiembro = ''
        let oldDataEstudianteMiembro = null
        let newDataEstudianteMiembro = null
        
        // Devolver Points
        const incrementarPoint = admin.firestore.FieldValue.increment(detallesItemNuevo.precioTotal)
        Usuario.actalizarUsuarioPorUID(uidUsuario, { point: incrementarPoint })

        // Si es curso
        if (detallesItemNuevo.tipoItem === 'curso') {
            // Quitar producto (Actualizar vista previa)
            MisCursos.actualizar(uidUsuario, detallesItemNuevo.uidItem, {
                tipoAcceso: 'vistaPrevia',
            })
        
            // Decrementar cantidad de estudiantes del curso
            CursoPublicado.actualizarCurso(detallesItemNuevo.uidItem, {
                cantidadEstudiantes: decrementar,
            })

            // Obtenemos el instructor
            producto = await CursoPublicado.obtenerCurso(detallesItemNuevo.uidItem)
            uidMiembro = producto.instructor

            // Decrementar cantidad de estudiantes por miembro
            const docEstudianteMiembro = await db
            .collection('Miembros').doc(uidMiembro)
            .collection('EstudiantesDeMiembro').doc(uidUsuario)
            .get()
            
            docEstudianteMiembro.ref.update({
                cantidadCursos: decrementar,
            })

            oldDataEstudianteMiembro = docEstudianteMiembro.data()

            newDataEstudianteMiembro = JSON.parse( JSON.stringify( docEstudianteMiembro.data() ) )
            newDataEstudianteMiembro.cantidadCursos--
        }

        RegistroActividadProducto.actualizarRegistroActividadProducto(uidPedido, uidDetallesItem, {
            fechaReembolso: detallesItemNuevo.fechaReembolsado
        })

        const yaNoEsEstudianteDeMiembro = (oldDataEstudianteMiembro.cantidadCursos === 1 && newDataEstudianteMiembro.cantidadCursos === 0)
        if (yaNoEsEstudianteDeMiembro) {
            await Miembro.actualizarMiembro(uidMiembro, {
                cantidadEstudiantes: decrementar,
            })
        }
    }

    return true
})




module.exports = ff