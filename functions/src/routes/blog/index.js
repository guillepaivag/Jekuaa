const {Router} = require('express')
const router = Router()
// const fileMiddleware = require('express-multipart-file-parser')

const {
    verificacionExistenciaBlog,
    verificacionExistenciaArchivoBlog
} = require('../../middlewares/blog')

const { estaAutenticado } = require('../../middlewares/usuario')
const { esMiembroJekuaa } = require('../../middlewares/miembroJekuaa')

const {
    obtenerDatosBlog,
    listaBlogsPorMG,
    blogConMasMeGusta,
    ultimosBlogsPorPublicador,
    obtenerContenidoBlog,
    paginarListaBlogs,
} = require('../../controllers/blog')

// Operaciones para: Estudiantes
router.get('/blogConMasMeGusta', 
    blogConMasMeGusta)

router.post('/blogsSeccionCategoriaPorMG', 
    listaBlogsPorMG)

router.get('/ultimosBlogsPorPublicador/:uid', 
    ultimosBlogsPorPublicador)



router.get('/obtenerDatosBlog/:uid', 
    verificacionExistenciaBlog,
    obtenerDatosBlog)

router.get('/obtenerContenido/:uid',
    verificacionExistenciaArchivoBlog,
    obtenerContenidoBlog)


router.get('/miembroJekuaa/obtenerDatos/:uid', 
    estaAutenticado, 
    esMiembroJekuaa, 
    verificacionExistenciaBlog,
    obtenerDatosBlog)

router.get('/miembroJekuaa/obtenerContenido/:uid',
    estaAutenticado, 
    esMiembroJekuaa, 
    verificacionExistenciaArchivoBlog,
    obtenerContenidoBlog)



module.exports = router