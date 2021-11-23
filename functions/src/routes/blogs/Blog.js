const {Router} = require('express')
const router = Router()
const fileMiddleware = require('express-multipart-file-parser')

const {
    verificadorDeDatosRequeridos,
    verificadorDeTipoDeDatos,
    verificadorDeDatosBlog,
    verificacionExistenciaBlog,
    esPropietarioDelBlog,
    construirDatosBlog,
    velidarDatosMeGustaBlog,
    verificacionExistenciaArchivoBlog
} = require('../../middlewares/blog')

const {
    estaAutenticado,
    esMiembroJekuaa,
    esDeMayorIgualNivel
} = require('../../middlewares/usuario')

const {
    crearBlog,
    obtenerBlog,
    obtenerDatosBlog,
    listaBlogsPorMG,
    blogConMasMeGusta,
    ultimosBlogsPorPublicador,
    obtenerContenidoBlog,
    paginarListaBlogs,
    darMeGusta,
    actualizarDatosBlog,
    eliminarBlog,
} = require('../../controllers/Blog')

// Operaciones para: Estudiantes
router.get('/estudiante/blogConMasMeGusta', 
    blogConMasMeGusta)

router.post('/estudiante/listaBlogsPorMG', 
    listaBlogsPorMG)

router.get('/estudiante/ultimosBlogsPorPublicador/:uid', 
    ultimosBlogsPorPublicador)

router.get('/estudiante/obtenerBlog/:uid', 
    verificacionExistenciaBlog,
    verificacionExistenciaArchivoBlog,
    obtenerBlog)

router.get('/estudiante/obtenerDatosBlog/:uid', 
    verificacionExistenciaBlog,
    obtenerDatosBlog)

router.get('/estudiante/obtenerContenido/:uid',
    verificacionExistenciaBlog,
    verificacionExistenciaArchivoBlog,
    obtenerContenidoBlog)

router.post('/estudiante/paginarListaBlogs',
    paginarListaBlogs)

router.post('/estudiante/meGusta/:uid', 
    estaAutenticado, 
    verificacionExistenciaBlog,
    velidarDatosMeGustaBlog,
    darMeGusta)
    

// Operaciones para: MiembrosJekuaa (limitado)
router.post('/miembroJekuaa/crearBlog', 
    estaAutenticado, 
    esMiembroJekuaa, 
    verificadorDeDatosRequeridos,
    verificadorDeTipoDeDatos,
    verificadorDeDatosBlog,
    construirDatosBlog,
    crearBlog)

router.put('/miembroJekuaa/actualizarBlog/:uid', 
    estaAutenticado, 
    esMiembroJekuaa, 
    verificacionExistenciaBlog,
    esPropietarioDelBlog,
    verificadorDeDatosRequeridos,
    verificadorDeTipoDeDatos,
    verificadorDeDatosBlog,
    construirDatosBlog,
    actualizarDatosBlog)

router.delete('/miembroJekuaa/eliminarBlog/:uid', 
    estaAutenticado, 
    esMiembroJekuaa, 
    verificacionExistenciaBlog, 
    esPropietarioDelBlog,
    eliminarBlog)


// Operaciones para: AdminJekuaa
router.post('/adminJekuaa/crearBlog', 
    estaAutenticado, 
    esMiembroJekuaa, 
    verificadorDeDatosRequeridos,
    verificadorDeTipoDeDatos,
    verificadorDeDatosBlog,
    construirDatosBlog,
    crearBlog)

router.put('/adminJekuaa/actualizarBlog/:uid', 
    estaAutenticado, 
    esMiembroJekuaa, 
    verificacionExistenciaBlog,
    verificadorDeDatosRequeridos,
    verificadorDeTipoDeDatos,
    verificadorDeDatosBlog,
    construirDatosBlog,
    actualizarDatosBlog)

router.delete('/adminJekuaa/eliminarBlog/:uid', 
    estaAutenticado, 
    esMiembroJekuaa, 
    verificacionExistenciaBlog, 
    eliminarBlog)


module.exports = router