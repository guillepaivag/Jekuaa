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
const PedidoProducto = require('../models/PedidoProducto')
const DetallesItemProducto = require('../models/DetallesItemProducto')


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
            
            if ( item.tipoItem === 'curso' ) {
                
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
.firestore.document('Usuarios/{uidUsuario}/PedidosProductos/{uidPedido}/DetallesItemsProducto/{uidDetallesItem}')
.onUpdate(async ( change, context ) => {
    const docViejo = change.before
    const docNuevo = change.after
    const { uidUsuario, uidPedido, uidDetallesItem } = context.params
    
    const detallesItemProductoViejo = new DetallesItemProducto(docViejo.data())
    const detallesItemProductoNuevo = new DetallesItemProducto(docNuevo.data())

    console.log('detallesItemProductoViejo', JSON.stringify(detallesItemProductoViejo.getDetalleItemProducto()))
    console.log('detallesItemProductoNuevo', JSON.stringify(detallesItemProductoNuevo.getDetalleItemProducto()))

    const recienReembolsado = detallesItemProductoNuevo.cantidadReembolsado > detallesItemProductoViejo.cantidadReembolsado
    if ( recienReembolsado ) {
        
        // Para el pedido
        const pedidoProducto = await PedidoProducto.obtener(uidUsuario, uidPedido)
        let producto = null
        const datosActualizadosPedidoProducto = {}

        // 1.1.1. aumentar cantidadReembolsado
        pedidoProducto.cantidadReembolsado += (detallesItemProductoNuevo.cantidadReembolsado - detallesItemProductoViejo.cantidadReembolsado)
        datosActualizadosPedidoProducto.cantidadReembolsado = pedidoProducto.cantidadReembolsado

        // 1.1.2. actualizar a todo reembolsado
        if (pedidoProducto.cantidadTotalItems === pedidoProducto.cantidadReembolsado) 
            datosActualizadosPedidoProducto.todoReembolsado = true
        
        // 1.1.3. tieneAlgunReembolso = true
        datosActualizadosPedidoProducto.tieneAlgunReembolso = true
        
        PedidoProducto.actualizar(uidUsuario, uidPedido, datosActualizadosPedidoProducto)

		let uidMiembro = ''
        let oldDataEstudianteMiembro = null
        let newDataEstudianteMiembro = null
        
        // Devolver Points
        const incrementarPoint = admin.firestore.FieldValue.increment(detallesItemProductoNuevo.precioTotal)
        Usuario.actalizarUsuarioPorUID(uidUsuario, { point: incrementarPoint })

        // Si es curso
        if (detallesItemProductoNuevo.tipoItem === 'curso') {
            // Quitar producto (Actualizar vista previa)
            MisCursos.actualizar(uidUsuario, detallesItemProductoNuevo.uidItem, {
                tipoAcceso: 'vistaPrevia',
            })
        
            // Decrementar cantidad de estudiantes del curso
            CursoPublicado.actualizarCurso(detallesItemProductoNuevo.uidItem, {
                cantidadEstudiantes: decrementar,
            })

            // Obtenemos el instructor
            producto = await CursoPublicado.obtenerCurso(detallesItemProductoNuevo.uidItem)
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