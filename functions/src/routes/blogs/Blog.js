const {Router} = require('express')
const router = Router()
const fileMiddleware = require('express-multipart-file-parser')

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
    crearBlog,
    guardarArchivoBlog
} = require('../../controllers/blogs/Blog')

router.post('/crearBlog', estaAutenticado, esMiembroJekuaa, crearBlog)
router.post('/guardarArchivoBlog/:uid', fileMiddleware, estaAutenticado, esMiembroJekuaa, guardarArchivoBlog)

module.exports = router