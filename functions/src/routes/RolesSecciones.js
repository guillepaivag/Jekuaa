const {Router} = require('express')
const router = Router()

const {
    estaAutenticado
} = require('../middlewares/usuario')

const {
    obtenerDatosRoles,
    obtenerDatosSecciones,
    obtenerSecciones,
    obtenerCategoriasPorSeccion,
    obtenerSubcategoriasPorSeccionCategoria
} = require('../controllers/Roles')

router.post('/obtenerDatosRoles', estaAutenticado, obtenerDatosRoles)
router.post('/obtenerDatosSecciones', estaAutenticado, obtenerDatosSecciones)
router.post('/obtenerSecciones', estaAutenticado, obtenerSecciones)
router.post('/obtenerCategoriasPorSeccion/:seccion', estaAutenticado, obtenerCategoriasPorSeccion)
router.post('/obtenerSubcategoriasPorSeccionCategoria/:seccion/:categoria', estaAutenticado, obtenerSubcategoriasPorSeccionCategoria)

module.exports = router