const db = require("./db");
const DetallesItemProducto = require("./src/models/DetallesItemProducto");
const PedidoProducto = require("./src/models/PedidoProducto");

async function run () {
    const snapshotUsuarios = await db.collection('Usuarios').get()

    for (const docUsuario of snapshotUsuarios.docs) {
        const snapshotPedidosProductos = await db
        .collection('Usuarios').doc(docUsuario.id)
        .collection('PedidosProductos')
        .get()

        for (const docPedidoProducto of snapshotPedidosProductos.docs) {
            // Actualizar PedidoProducto
            const snapshotDetallesItem = await db
            .collection('Usuarios').doc(docUsuario.id)
            .collection('PedidosProductos').doc(docPedidoProducto.id)
            .collection('DetallesItems')
            .get()

            let cantidadTotalItems = 0
            for (const docDetallesItem of snapshotDetallesItem.docs) 
                cantidadTotalItems += docDetallesItem.data().cantidad

            const pedidoProducto = new PedidoProducto({
                uid: docPedidoProducto.id,
                uidComprador: docUsuario.id,
                estado: docPedidoProducto.data().estado,
                fechaPedido: docPedidoProducto.data().fechaPedido,
                cantidadPaquetesDeItems: snapshotDetallesItem.size,
                cantidadTotalItems: cantidadTotalItems,
                costoTotal: docPedidoProducto.data().costoTotal,
                formaDePago: docPedidoProducto.data().datosPago.formaDePago,
                fechaCompra: docPedidoProducto.data().fechaCompra,
                items: docPedidoProducto.data().items,
                tieneAlgunReembolso: docPedidoProducto.data().tieneReembolso,
                todoReembolsado: docPedidoProducto.data().todoReembolsado,
                cantidadReembolsado: docPedidoProducto.data().cantidadReembolsado,
            })
            PedidoProducto.agregar(docUsuario.id, pedidoProducto)

            const detallesItems = []
            for (const docDetallesItem of snapshotDetallesItem.docs) {
                // Actualizar DetallesItem a DetallesItemProducto
                const detallesItemProducto = new DetallesItemProducto({
                    tipoItem: docDetallesItem.data().tipoItem,
                    uidItem: docDetallesItem.data().uidItem,
                    uidPedido: docPedidoProducto.id,
                    precioUnitarioOriginal: docDetallesItem.data().detalles.precioUnitarioOriginal,
                    porcentajeDescuento: docDetallesItem.data().detalles.porcentajeDescuento,
                    precioUnitario: docDetallesItem.data().precioUnitario,
                    cantidad: docDetallesItem.data().cantidad,
                    precioTotal: docDetallesItem.data().precioTotal,
                    tieneAlgunReembolso: !!docDetallesItem.data().fechaReembolsado,
                    todoReembolsado: !!docDetallesItem.data().fechaReembolsado,
                    cantidadReembolsado: !!docDetallesItem.data().fechaReembolsado ? 1 : 0,
                })

                detallesItems.push(detallesItemProducto)
            }

            DetallesItemProducto.crear(docUsuario.id, docPedidoProducto.id, detallesItems)
        }
    }
}