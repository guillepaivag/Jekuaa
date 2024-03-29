const { Router } = require('express')
const router = Router()

const estaAutenticado = require('../../../../helpers/estaAutenticado')
const { 
    esMiembro, 
    esMiembroInstructor, 
    esMiembroInstructor_InstructorAuxiliar 
} = require('../../../../helpers/miembro')

const { 
    esResponsableDelCursoBorrador, 
    errorSiElCursoSeEstaPublicando,
    esAdministradorDelCursoBorrador
} = require('../../middlewares/miembro')

const { 
    construirElContenidoClaseArticulo, 
} = require('../../middlewares/miembro/contenidoClase')

const { 
    agregarContenidoClaseArticuloBorrador, 
    obtenerUrlVideoClaseBorrador,
    obtenerArticuloClaseBorrador,
} = require('../../controllers/miembro/contenidoClase')



router.put('/actualizarArticulo/:uidCurso/:uidUnidad/:uidClase', 
    estaAutenticado,
    esMiembro,
    esMiembroInstructor_InstructorAuxiliar,
    esAdministradorDelCursoBorrador, 
    errorSiElCursoSeEstaPublicando,
    construirElContenidoClaseArticulo,
    agregarContenidoClaseArticuloBorrador)




router.get('/obtenerVideo/:uidCurso/:uidClase', 
    estaAutenticado,
    esMiembro,
    esMiembroInstructor_InstructorAuxiliar,
    esAdministradorDelCursoBorrador, 
    obtenerUrlVideoClaseBorrador)




router.get('/obtenerArticulo/:uidCurso/:uidClase', 
    estaAutenticado,
    esMiembro,
    esMiembroInstructor_InstructorAuxiliar,
    esAdministradorDelCursoBorrador, 
    obtenerArticuloClaseBorrador)


module.exports = router