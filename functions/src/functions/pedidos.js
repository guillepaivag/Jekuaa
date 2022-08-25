const functions = require('firebase-functions')
const admin = require('../../firebase-service')
const db = require('../../db')
const config = require('../../config')
const Pedido = require('../models/Pedido')
const { milliseconds_a_timestamp } = require('../utils/timestamp')
const CursoPublicado = require('../models/Cursos/curso/CursoPublicado')
const InformeVentaInstructor = require('../models/InformeVentaInstructor')
const DetallesItem = require('../models/helpers/DetallesItem')
const Usuario = require('../models/Usuarios/Usuario')
const MisCursos = require('../models/MisCursos')
const Miembro = require('../models/Usuarios/TiposUsuarios/Miembro')


const ff = {}
const rutaModo = config.environment.mode === 'production' ? 'prod' : 'dev'
const incrementar = admin.firestore.FieldValue.increment(1)
const decrementar = admin.firestore.FieldValue.increment(-1)








ff.pedidoCompletado = functions
.region('southamerica-east1')
.firestore.document('Usuarios/{uidUsuario}/Pedidos/{uidPedido}')
.onUpdate(async ( change, context ) => {
    const docNuevo = change.after
    const docViejo = change.before
    const { uidUsuario, uidPedido } = context.params
    
    const pedidoViejo = new Pedido(docViejo.data())
    const pedidoNuevo = new Pedido(docNuevo.data())

    const recienCompletadoElPedido = pedidoViejo.estado === 'pendiente' && pedidoNuevo.estado === 'completado'
    if (recienCompletadoElPedido) {
        if (pedidoNuevo.tipoPedido === 'productos') {
            
            for (const item of pedidoNuevo.items) {
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

                const esNuevoEstudianteDeMiembro = (oldDataEstudianteMiembro.cantidadCursos === 0 && newDataEstudianteMiembro.cantidadCursos === 1)
                if (esNuevoEstudianteDeMiembro) {
                    await Miembro.actualizarMiembro(uidMiembro, {
                        cantidadEstudiantes: incrementar,
                    })
                }
            }
        }
    }

    return true
})





ff.reembolsoDeUnProducto = functions
.region('southamerica-east1')
.firestore.document('Usuarios/{uidUsuario}/Pedidos/{uidPedido}/DetallesItems/{uidDetallesItem}')
.onUpdate(async ( change, context ) => {
    const docViejo = change.before
    const docNuevo = change.after
    const { uidUsuario, uidPedido, uidDetallesItem } = context.params
    
    const detallesItemViejo = new DetallesItem(docViejo.data())
    const detallesItemNuevo = new DetallesItem(docNuevo.data())

    const recienReembolsado = detallesItemViejo.fechaReembolsado === null && detallesItemNuevo.fechaReembolsado !== null
    if (recienReembolsado) {
        
        // Para el pedido
        const pedido = await Pedido.obtener(uidUsuario, uidPedido)
        let producto = null
        const datosActualizados = {}

        // 1.1.1. cantidadReembolsado++
        pedido.cantidadReembolsado++
        datosActualizados.cantidadReembolsado = pedido.cantidadReembolsado

        // 1.1.2. cantidadItems === cantidadReembolsado ? todoReembolsado = true : ''
        if (pedido.cantidadItems === pedido.cantidadReembolsado) 
            datosActualizados.todoReembolsado = true

        // 1.1.3. tieneReembolso = true
        datosActualizados.tieneReembolso = true

        Pedido.actualizar(uidUsuario, uidPedido, datosActualizados)

		// Si es productos
        if (pedido.tipoPedido === 'productos') {
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

            const yaNoEsEstudianteDeMiembro = (oldDataEstudianteMiembro.cantidadCursos === 1 && newDataEstudianteMiembro.cantidadCursos === 0)
            if (yaNoEsEstudianteDeMiembro) {
                await Miembro.actualizarMiembro(uidMiembro, {
                    cantidadEstudiantes: decrementar,
                })
            }

        } else if (pedido.tipoPedido === 'monedas') {
            const decrementarPoint = admin.firestore.FieldValue.increment(-detallesItemNuevo.detalles.cantidadTotalPoint)
            Usuario.actalizarUsuarioPorUID(uidUsuario, { point: decrementarPoint })
        }
    }

    return true
})




module.exports = ff