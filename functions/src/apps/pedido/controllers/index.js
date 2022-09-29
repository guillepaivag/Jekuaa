const { request, response } = require("express")
const manejadorErrores = require("../../../helpers/manejoErrores")
const DatosPago = require("../../../models/helpers/DatosPago")
const DetallesItem = require("../../../models/DetallesItem")
const MisCursos = require("../../../models/MisCursos")
const PedidoProducto = require("../../../models/PedidoProducto")
const Respuesta = require("../../../models/Respuesta")
const Usuario = require("../../../models/Usuarios/Usuario")
const { milliseconds_a_timestamp } = require("../../../utils/timestamp")

const controller = {}

controller.generarPedidoTipoProducto = async (req = request, res = response) => {
    
    try {
        const { datos, body, params, requestStartTime } = req
        const { uidSolicitante, datosAuthSolicitante } = datos
        const { pedidos, datosPedidoProducto, listaDetallesItems, datosUsuario } = body

        const respuesta = new Respuesta()
        
        // Crear pedido
        const pedidoProducto = new PedidoProducto(datosPedidoProducto)
        await PedidoProducto.agregar( uidSolicitante, pedidoProducto )
        await DetallesItem.crear( uidSolicitante, pedidoProducto.uid, listaDetallesItems, 'productos' )

        // Pagar la cantidad de points que vale este producto
        const usuario = new Usuario(datosUsuario)
        const pointsRestantes = usuario.point - pedidoProducto.costoTotal
        usuario.point = pointsRestantes
        await Usuario.actalizarUsuarioPorUID(uidSolicitante, {
            point: pointsRestantes,
        })

        // Actualizar pedido como "completado"
        await PedidoProducto.actualizar(uidSolicitante, pedidoProducto.uid, {
            estado: 'completado',
            fechaCompra: milliseconds_a_timestamp(Date.now()),
            datosPago: new DatosPago({ 
                formaDePago: 'points', 
                gratis: pedidoProducto.costoTotal === 0, 
            }).getDatosPago()
        })

        // Dar producto
        for (let i = 0; i < pedidoProducto.items.length; i++) {
            const item = pedidoProducto.items[i]
            
            if ( item.tipoItem === 'curso' ) {
                const existeDocumento = await MisCursos.obtener(uidSolicitante, item.uidItem)

                if (existeDocumento) {
                    await MisCursos.actualizar(uidSolicitante, item.uidItem, {
                        tipoAcceso: 'completo'
                    })
                } else {
                    const misCursos = new MisCursos({
                        uid: item.uidItem, 
                        tipoAcceso: 'completo',
                        ultimaActividad: null,
                        uidEstudiante: uidSolicitante,
                        cantidadVisualizada: 0,
                    })
                    await MisCursos.agregar(uidSolicitante, misCursos)
                }
            }
            
        }

        // Retornar respuesta
        respuesta.setRespuesta({
            estado: 200,
            mensaje: 'exito',
            resultado: {requestStartTime, pedidos, datosPedidoProducto, listaDetallesItems}
        })
        
        return res.status( respuesta.estado ).json( respuesta.getRespuesta() )

    } catch (error) {
        console.log('Error - generarPedidoTipoProducto: ', error)

        const respuesta = manejadorErrores( error )
        return res.status( respuesta.estado ).json( respuesta.getRespuesta() )
    }

}

controller.generarReembolsoTipoProducto = async (req = request, res = response) => {
    
    try {
        const { datos, body, params, requestStartTime } = req
        const { uidSolicitante, datosAuthSolicitante } = datos
        const { uidPedido, uidProducto } = params

        const respuesta = new Respuesta()
        
        // Reembolsar item
        await DetallesItem.actualizar(uidSolicitante, uidPedido, uidProducto, {
            fechaReembolsado: milliseconds_a_timestamp(requestStartTime)
        })

        // Retornar respuesta
        respuesta.setRespuesta({
            estado: 200,
            mensaje: 'exito',
            resultado: milliseconds_a_timestamp(requestStartTime)
        })
        
        return res.status( respuesta.estado ).json( respuesta.getRespuesta() )

    } catch (error) {
        console.log('Error - generarReembolsoTipoProducto: ', error)

        const respuesta = manejadorErrores( error )
        return res.status( respuesta.estado ).json( respuesta.getRespuesta() )
    }

}

module.exports = controller