const { request, response } = require("express")
const admin = require('../../../../firebase-service')
const db = require("../../../../db")
const CursoPublicado = require("../../../models/Cursos/curso/CursoPublicado")
const Errores = require("../../../models/Error/Errores")
const DetallesItem = require("../../../models/DetallesItem")
const Usuario = require("../../../models/Usuarios/Usuario")
const { milliseconds_a_timestamp } = require("../../../utils/timestamp")
const MisCursos = require("../../../models/MisCursos")
const PedidoProducto = require("../../../models/PedidoProducto")
const DetallesItemProducto = require("../../../models/DetallesItemProducto")

const tiposObtencionUnica = ['curso']
const tiposObtencionPorCantidad = []

const middlewares = {}

middlewares.validacionPedidoTipoProducto = async (req = request, res = response, next) => {
    try {
        const { datos, body, params, requestStartTime } = req
        const { uidSolicitante, datosAuthSolicitante } = datos
        const { listaItems } = body

        /**
         * listaItems: [
         *  { 
         *      tipoItem, 
         *      uidItem, 
         *      cantidad,
         *      producto, // se agrega despues
         *  }
         * ]
         */

        if ( !Array.isArray(listaItems) ) throw new TypeError('Se necesita un arreglo de items.')

        // Verificaciones
        for (let i = 0; i < listaItems.length; i++) {
            const datosItem = listaItems[i]
            let existe = false
            
            // Tipos de datos
            if (typeof datosItem.tipoItem !== 'string') 
                throw new TypeError('El tipoItem tiene que ser string.')

            if (typeof datosItem.uidItem !== 'string') 
                throw new TypeError('El uidItem tiene que ser string.')

            if (typeof datosItem.cantidad !== 'number') 
                throw new TypeError('La cantidad debe ser numerica.')

            // Existencia
            if (datosItem.tipoItem === 'curso') {
                const doc = await db.collection('CursosPublicado').doc(datosItem.uidItem).get()
                existe = doc.exists
                listaItems[i].producto = doc.data()
    
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

            // La cantidad tiene que ser mayor a 0
            if (datosItem.cantidad <= 0) {
                throw new Errores({
                    estado: 400,
                    mensajeCliente: 'error_en_cantidad_del_item',
                    mensajeServidor: 'La cantidad no puede ser menor o igual a 0.'
                })
            }

            // Solo se puede obtener un(1) itemProducto, si ese itemProducto es de obtencion unica
            if ( tiposObtencionUnica.includes(datosItem.tipoItem) ) {
                
                // Solo se puede tener una(1) cantidad para productos de obtencion unica
                if (datosItem.cantidad !== 1) {
                    throw new Errores({
                        estado: 400,
                        mensajeCliente: 'error_en_cantidad_del_item',
                        mensajeServidor: 'Para productos de obtencion unica solo se puede pedir 1.'
                    })
                }

                // Obtener pedidos que son relacionados a un itemProducto-solicitado
                const itemFilter = { tipoItem: datosItem.tipoItem, uidItem: datosItem.uidItem, }
                const snapshotPedidos = await db.collection('Usuarios').doc(uidSolicitante)
                    .collection('PedidosProductos')
                    .where('items', 'array-contains', itemFilter)
                    .get()
                
                const pedidosRelacionados = []
                for (const doc of snapshotPedidos.docs) 
                    pedidosRelacionados.push( new PedidoProducto(doc.data()) )

                // Ya que este producto es de OBTENCION UNICA, no puede existir OTRO PEDIDO 
                // con ese mismo producto en estado PENDIENTE o COMPLETADO pero sin estar 
                // reembolsado el producto
                for (const pedidoRelacionado of pedidosRelacionados) {
                    
                    if ( pedidoRelacionado.estado === 'pendiente' ) {
                        throw new Errores({
                            estado: 400,
                            mensajeCliente: 'producto_esta_en_pedido',
                            mensajeServidor: 'Ya se esta realizando un pedido de algún producto que estas pidiendo.'
                        })
                    }

                    else if ( pedidoRelacionado.estado === 'completado' ) {
                        const snapshot2 = await db
                            .collection('Usuarios').doc(uidSolicitante)
                            .collection('PedidosProductos').doc(pedidoRelacionado.uid)
                            .collection('DetallesItemsProducto')
                            .where('tipoItem', '==', datosItem.tipoItem)
                            .where('uidItem', '==', datosItem.uidItem)
                            .get()

                        const detallesItemProducto = new DetallesItemProducto(snapshot2.docs[0].data())

                        if (!detallesItemProducto.todoReembolsado) {
                            throw new Errores({
                                estado: 400,
                                mensajeCliente: 'producto_ya_obtenido',
                                mensajeServidor: 'Ya tienes un producto de esta lista.'
                            })
                        }
                    }

                }
            }
        }

        // VALIDAR SI TIENE SUFICIENTES MONEDAS
        let costoTotal = 0
        for (let i = 0; i < listaItems.length; i++) {
            const datosItem = listaItems[i]
            
            if (datosItem.tipoItem === 'curso') {

                let hayDescuento = false
                if (datosItem.producto.datosPrecio.descuento) {
                    const tiempoInicio = datosItem.producto.datosPrecio.descuento.fechaInicio.seconds * 1000
                    const tiempoFin = datosItem.producto.datosPrecio.descuento.fechaFin.seconds * 1000
                    hayDescuento = requestStartTime >= tiempoInicio && requestStartTime <= tiempoFin
                }
                
                if (hayDescuento) costoTotal += (datosItem.producto.datosPrecio.descuento.precio * datosItem.cantidad)
                else costoTotal += (datosItem.producto.datosPrecio.precio * datosItem.cantidad)

            } else {
                throw new TypeError('No es un tipo de producto válido.')
            }

        }

        const usuario = new Usuario()
        await usuario.importarDatosUsuarioPorUID(uidSolicitante)
        req.body.datosUsuario = usuario.getUsuario()

        const sinMonedas = costoTotal > usuario.point

        if (sinMonedas) {
            throw new Errores({
                estado: 400,
                mensajeCliente: 'insuficientes_points',
                mensajeServidor: 'No tienes suficientes POINTS.'
            })
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
        const { listaItems, datosUsuario } = body

        /**
         * listaItems: [
         *  { 
         *      tipoItem, 
         *      uidItem, 
         *      cantidad,
         *      producto, 
         *  }
         * ]
         */

        const uidPedido = db.collection('PedidosProductos').doc().id

        const listaDetallesItems = []
        for (let i = 0; i < listaItems.length; i++) {
            const datosItem = listaItems[i]
            
            if (datosItem.tipoItem === 'curso') {
                const cantidad = datosItem.cantidad

                const hayDescuento = datosItem.producto.datosPrecio.descuento && 
                datosItem.producto.datosPrecio.descuento.fechaInicio.seconds*1000 <= requestStartTime &&
                datosItem.producto.datosPrecio.descuento.fechaFin.seconds*1000 >= requestStartTime
                const precio = hayDescuento ? datosItem.producto.datosPrecio.descuento.precio : datosItem.producto.datosPrecio.precio

                const detallesItemProducto = new DetallesItemProducto({
                    tipoItem: datosItem.tipoItem,
                    uidItem: datosItem.uidItem,
                    uidPedido: uidPedido,
                    precioUnitarioOriginal: datosItem.producto.datosPrecio.precio,
                    porcentajeDescuento: hayDescuento ? datosItem.producto.datosPrecio.descuento.porcentaje : 0,
                    precioUnitario: precio,
                    cantidad: cantidad,
                    precioTotal: precio * cantidad,
                    tieneAlgunReembolso: false,
                    todoReembolsado: false,
                    cantidadReembolsado: 0,
                })
                
                listaDetallesItems.push(detallesItemProducto)
            }
        }

        const items = []
        let costoTotal = 0
        let cantidadTotalItems = 0
        for (const detallesItem of listaDetallesItems) {
            costoTotal += detallesItem.precioTotal
            cantidadTotalItems += detallesItem.cantidad
            items.push({
                tipoItem: detallesItem.tipoItem,
                uidItem: detallesItem.uidItem,
            })
        }
        
        const pedidoProducto = new PedidoProducto({
            uid: uidPedido,
            uidComprador: uidSolicitante,
            estado: 'pendiente',
            fechaPedido: milliseconds_a_timestamp(requestStartTime),
            cantidadPaquetesDeItems: listaDetallesItems.length,
            cantidadTotalItems: cantidadTotalItems,
            costoTotal: costoTotal,
            formaDePago: '',
            fechaCompra: null,
            items: items,
            tieneAlgunReembolso: false,
            todoReembolsado: false,
            cantidadReembolsado: 0,
        })

        req.body.datosPedidoProducto = pedidoProducto.getPedidoProducto()
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
        const { uidPedido } = params
        const { listaItems } = body

        /**
         * listaItems: [
         *  { 
         *      tipoItem, 
         *      uidItem, 
         *      cantidad, 
         *      cantidadReembolsadoNuevo, // se agrega despues
         *      todoReembolsadoNuevo, // se agrega despues
         *  }
         * ]
         */

        // Existe pedido
        const pedidoProducto = await PedidoProducto.obtener(uidSolicitante, uidPedido)
        if (!pedidoProducto) {
            throw new Errores({
                estado: 400,
                mensajeCliente: 'no_existe_pedido',
                mensajeServidor: 'No existe el pedido.'
            })
        }

        if ( pedidoProducto.todoReembolsado ) {
            throw new Errores({
                estado: 400,
                mensajeCliente: 'pedido_ya_reembolsado',
                mensajeServidor: 'No hay nada que reembolsar.'
            })
        }

        // Verificar si se puede reembolsar (30 días para reembolsar)
        const diasValidos = 60 * 60 * 24 * 1000 * 30
        const fechaCompra = pedidoProducto.fechaCompra.seconds*1000
        if ( requestStartTime > fechaCompra+diasValidos ) {
            throw new Errores({
                estado: 400,
                mensajeCliente: 'pedido_fecha_fuera_de_reembolso',
                mensajeServidor: 'Ya no se puede reembolsar.'
            })
        }

        for (const datosItem of listaItems) {
            // Existe producto en el pedido y no esta reembolsado
            const doc = await db
                .collection('Usuarios').doc(uidSolicitante)
                .collection('PedidosProductos').doc(uidPedido)
                .collection('DetallesItemsProducto').doc(datosItem.uidItem)
                .get()
        
            if (!doc.exists) {
                throw new Errores({
                    estado: 400,
                    mensajeCliente: 'no_existe_item_en_pedido',
                    mensajeServidor: 'No existe este item en este pedido.'
                })
            }

            // No tiene que estar todo reembolsado
            const detallesItemProducto = new DetallesItemProducto(doc.data())
            if (detallesItemProducto.todoReembolsado) {
                throw new Errores({
                    estado: 400,
                    mensajeCliente: 'producto_ya_reembolsado',
                    mensajeServidor: 'Este producto ya esta reembolsado.'
                })
            }

            // Verificar la cantidad a reembolsar con la cantidad restante deL paquete de items
            const cantidadDisponible = detallesItemProducto.cantidad - detallesItemProducto.cantidadReembolsado
            if ( datosItem.cantidad > cantidadDisponible ) {
                throw new Errores({
                    estado: 400,
                    mensajeCliente: 'cantidad_reembolso_item_excedido',
                    mensajeServidor: 'No hay suficientes items disponibles para reembolsar.'
                })
            }

            datosItem.cantidadReembolsadoNuevo = datosItem.cantidad + detallesItemProducto.cantidadReembolsado
            datosItem.todoReembolsadoNuevo = detallesItemProducto.cantidad === (datosItem.cantidad + detallesItemProducto.cantidadReembolsado)

            // Verificar de manera customizada dependiendo del tipo de item que sea
            if ( datosItem.tipoItem === 'curso' ) {
                // Si tiene más del 50% no se puede reembolsar
                const uidCurso = detallesItemProducto.uidItem
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
            } else {
                throw new TypeError('No es un tipo de producto válido.')
            }
        }

        next()
    } catch (error) {
        next(error)
    }
}

module.exports = middlewares