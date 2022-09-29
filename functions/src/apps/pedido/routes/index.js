const { Router } = require('express')
const router = Router()

const estaAutenticado = require('../../../helpers/estaAutenticado')
const { 
    validacionPedidoTipoProducto, 
    construccionPedidoTipoProducto, 
    validacionReembolsoTipoProducto
} = require('../middlewares')
const { generarPedidoTipoProducto, generarReembolsoTipoProducto } = require('../controllers')

router.post('/producto/generarPedido', 
    estaAutenticado,
    validacionPedidoTipoProducto, 
    construccionPedidoTipoProducto,
    generarPedidoTipoProducto)

router.put('/producto/reembolsar/:uidPedido/:uidProducto', 
    estaAutenticado,
    validacionReembolsoTipoProducto, 
    generarReembolsoTipoProducto)

module.exports = router