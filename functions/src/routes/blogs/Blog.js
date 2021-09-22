const {Router} = require('express')
const router = Router()

const {
    
} = require('../../middlewares/blog')

const {
    estaAutenticado,
} = require('../../middlewares/usuario')

const {
    esMiembroJekuaa,
    esDeMayorIgualNivel
} = require('../../middlewares/miembroJekuaa')

const {
    crearBlog
} = require('../../controllers/blogs/Blog')

router.post('/crearBlog', estaAutenticado, esMiembroJekuaa, crearBlog)

module.exports = router