const { request, response } = require("express")
const admin = require('../../../../firebase-service')
const db = require("../../../../db")
const CursoPublicado = require("../../../models/Cursos/curso/CursoPublicado")
const Errores = require("../../../models/Error/Errores")
const DetallesItem = require("../../../models/DetallesItem")
const Usuario = require("../../../models/Usuarios/Usuario")
const { milliseconds_a_timestamp } = require("../../../utils/timestamp")
const ProgresoClase = require("../../../models/ProgresoClase")
const ClasePublicado = require("../../../models/Cursos/clase/ClasePublicado")
const MisCursos = require("../../../models/MisCursos")
const PedidoProducto = require("../../../models/PedidoProducto")

const middlewares = {}

middlewares.validacionPedidoTipoProducto = async (req = request, res = response, next) => {
    try {
        const { datos, body, params, requestStartTime } = req
        const { uidSolicitante, datosAuthSolicitante } = datos
        const { pedidos } = body

        /**
         * pedidos: [
         *  { 
         *      tipoItem, 
         *      uidItem, 
         *      producto, // se agrega despues
         *  }
         * ]
         */

        // EXISTENCIA:
        for (let i = 0; i < pedidos.length; i++) {
            const pedido = pedidos[i]
            let existe = false
            
            if (pedido.tipoItem === 'curso') {
                const doc = await db.collection('CursosPublicado').doc(pedido.uidItem).get()
                existe = doc.exists
                pedidos[i].producto = doc.data()
    
            } else {
                throw new TypeError('No es un tipo de producto válido.')
            }
        
            if (!existe) {
                throw new Errores({
                    estado: 400,
                    mensajeCliente: 'no_existe_producto',
                    mensajeServidor: 'No existe este producto.',
                })
            }
        }

        for (let i = 0; i < pedidos.length; i++) {
            const pedido = pedidos[i]

            // VALIDAR SI SE PUEDE REALIZAR EL PEDIDO:
            const item = { tipoItem: pedido.tipoItem, uidItem: pedido.uidItem, }
            const snapshot = await db.collection('Usuarios').doc(uidSolicitante)
                .collection('PedidosProductos')
                .where('items', 'array-contains', item)
                .get()
            
            if (!snapshot.empty) {
                const dataPedidos = []
                for (const doc of snapshot.docs) 
                    dataPedidos.push( new PedidoProducto(doc.data()) )
    
                for (const dataPedido of dataPedidos) {
                    if (dataPedido.estado === 'pendiente') {
                        throw new Errores({
                            estado: 400,
                            mensajeCliente: 'producto_esta_en_pedido',
                            mensajeServidor: 'Ya se esta realizando un pedido de algún producto que estas pidiendo.'
                        })
                    }

                    if (dataPedido.estado === 'completado') {
                        const snapshot2 = await db
                        .collection('Usuarios').doc(uidSolicitante)
                        .collection('PedidosProductos').doc(dataPedido.uid)
                        .collection('DetallesItems')
                        .where('tipoItem', '==', pedido.tipoItem)
                        .where('uidItem', '==', pedido.uidItem)
                        .get()

                        const detallesItem = new DetallesItem(snapshot2.docs[0].data())
                        
                        if (!detallesItem.fechaReembolsado) {
                            throw new Errores({
                                estado: 400,
                                mensajeCliente: 'producto_ya_obtenido',
                                mensajeServidor: 'Ya tienes un producto de esta lista.'
                            })
                        }
                    }
                }

            }
            
            // VALIDAR SI TIENE SUFICIENTES POINTS
            if (pedido.tipoItem === 'curso') {

                let hayDescuento = false
                if (pedido.producto.datosPrecio.descuento) {
                    const tiempoInicio = pedido.producto.datosPrecio.descuento.fechaInicio.seconds * 1000
                    const tiempoFin = pedido.producto.datosPrecio.descuento.fechaFin.seconds * 1000
                    hayDescuento = requestStartTime >= tiempoInicio && requestStartTime <= tiempoFin
                }
                
                const usuario = new Usuario()
                await usuario.importarDatosUsuarioPorUID(uidSolicitante)
                const sinJP = (hayDescuento && pedido.producto.datosPrecio.descuento.precio > usuario.point) || 
                (!hayDescuento && pedido.producto.datosPrecio.precio > usuario.point)

                if (sinJP) {
                    throw new Errores({
                        estado: 400,
                        mensajeCliente: 'insuficientes_points',
                        mensajeServidor: 'No tienes suficientes POINTS.'
                    })
                }

                req.body.datosUsuario = usuario.getUsuario()
    
            } else {
                throw new TypeError('No es un tipo de producto válido.')
            }

        }

        next()
    } catch (error) {
        next(error)
    }
}

middlewares.construccionPedidoTipoProducto = async (req = request, res = response, next) => {
    try {
        const { datos, body, params, requestStartTime } = req
        const { uidSolicitante, datosAuthSolicitante } = datos
        const { pedidos, datosUsuario } = body

        /**
         * pedidos: [
         *  { 
         *      tipoItem, 
         *      uidItem, 
         *      producto, 
         *  }
         * ]
         */

        const listaDetallesItems = []
        for (let i = 0; i < pedidos.length; i++) {
            const pedido = pedidos[i]
            
            if (pedido.tipoItem === 'curso') {
                const cantidad = 1

                let hayDescuento = pedido.producto.datosPrecio.descuento && 
                pedido.producto.datosPrecio.descuento.fechaInicio.seconds*1000 <= requestStartTime &&
                pedido.producto.datosPrecio.descuento.fechaFin.seconds*1000 >= requestStartTime
                const precio = hayDescuento ? pedido.producto.datosPrecio.descuento.precio : pedido.producto.datosPrecio.precio

                const detallesItem = new DetallesItem({
                    tipoItem: 'curso',
                    uidItem: pedido.producto.uid,
                    detalles: {
                        precioUnitarioOriginal: pedido.producto.datosPrecio.precio,
                        porcentajeDescuento: hayDescuento ? pedido.producto.datosPrecio.descuento.porcentaje : 0,
                    },
                    cantidad: cantidad,
                    precioUnitario: precio,
                    precioTotal: precio * cantidad,
                    fechaReembolsado: null,
                })
                
                listaDetallesItems.push(detallesItem)
            }
        }

        const items = []
        let costoTotal = 0
        for (const detallesItem of listaDetallesItems) {
            costoTotal += detallesItem.precioTotal
            items.push({
                tipoItem: detallesItem.tipoItem,
                uidItem: detallesItem.uidItem,
            })
        }
        
        const pedido = new PedidoProducto({
            uidComprador: uidSolicitante, 
            cantidadItems: listaDetallesItems.length, 
            costoTotal: costoTotal, 
            items: items,
            estado: 'pendiente', 
            fechaPedido: milliseconds_a_timestamp(requestStartTime),
            cantidadReembolsado: 0,
            todoReembolsado: false,
            tieneReembolso: false, 
            fechaCompra: null, 
            datosPago: null,
        })

        req.body.datosPedidoProducto = pedido.getPedidoProducto()
        req.body.listaDetallesItems = listaDetallesItems

        next()
    } catch (error) {
        next(error)
    }
}

middlewares.validacionReembolsoTipoProducto = async (req = request, res = response, next) => {
    try {
        const { datos, body, params, requestStartTime } = req
        const { uidSolicitante, datosAuthSolicitante } = datos
        const { uidPedido, uidProducto } = params

        // Existe pedido
        const pedidoProducto = await PedidoProducto.obtener(uidSolicitante, uidPedido)
        if (!pedidoProducto) {
            throw new Errores({
                estado: 400,
                mensajeCliente: 'no_existe_pedido',
                mensajeServidor: 'No existe el pedido.'
            })
        }

        // Verificar si se puede reembolsar (30 días para reembolsar)
        const diasValidos = 60 * 60 * 24 * 1000 * 30
        const fechaCompra = pedidoProducto.fechaCompra.seconds*1000
        if ( requestStartTime > fechaCompra+diasValidos ) {
            throw new Errores({
                estado: 400,
                mensajeCliente: 'pedido_fecha_fuera_de_reembolso',
                mensajeServidor: 'Ya no se puede reembolsar'
            })
        }

        // Existe producto en el pedido y no esta reembolsado
        const doc = await db
        .collection('Usuarios').doc(uidSolicitante)
        .collection('PedidosProductos').doc(uidPedido)
        .collection('DetallesItems').doc(uidProducto)
        .get()

        if (!doc.exists) {
            throw new Errores({
                estado: 400,
                mensajeCliente: 'no_existe_item_en_pedido',
                mensajeServidor: 'No existe este item en este pedido.'
            })
        }
        
        const detallesItem = new DetallesItem(doc.data())
        if (detallesItem.fechaReembolsado) {
            throw new Errores({
                estado: 400,
                mensajeCliente: 'producto_ya_reembolsado',
                mensajeServidor: 'Este producto ya esta reembolsado.'
            })
        }
        
        if (detallesItem.tipoItem === 'curso') {
            // Si tiene más del 50% no se puede reembolsar
            const uidCurso = detallesItem.uidItem
            const cursoPublicado = await CursoPublicado.obtenerCurso(uidCurso)
            const miCurso = await MisCursos.obtener(uidSolicitante, uidCurso)
            
            const porcentajeProgreso = (miCurso.cantidadVisualizada * 100) / cursoPublicado.cantidadClases

            if (porcentajeProgreso > 50) {
                throw new Errores({
                    estado: 400,
                    mensajeCliente: 'no_se_puede_reembolsar',
                    mensajeServidor: 'Ya tiene 50% del curso, no se puede reembolsar.'
                })
            }
        }

        next()
    } catch (error) {
        next(error)
    }
}

module.exports = middlewares