const { Router } = require('express')
const router = Router()

const estaAutenticado = require('../../../helpers/estaAutenticado')
const { esMiembro, esMiembroInstructor, esMiembroInstructor_InstructorAuxiliar } = require('../../../helpers/miembro')
const { publicarCurso, obtenerUrlVideoClase, obtenerArticuloClase, obtenerVideoYoutubeClase } = require('../controllers/miembro')
const { esResponsableDelCursoPublicado, esAdministradorDelCursoPublicado, } = require('../middlewares/miembro')

router.get('/obtenerVideo/:uidCurso/:uidClase', 
    estaAutenticado,
    esMiembro,
    esMiembroInstructor_InstructorAuxiliar,
    esAdministradorDelCursoPublicado, 
    obtenerUrlVideoClase)




router.get('/obtenerArticulo/:uidCurso/:uidClase', 
    estaAutenticado,
    esMiembro,
    esMiembroInstructor_InstructorAuxiliar,
    esAdministradorDelCursoPublicado, 
    obtenerArticuloClase)




router.get('/obtenerVideoYoutube/:uidCurso/:uidClase', 
    estaAutenticado,
    esMiembro,
    esMiembroInstructor_InstructorAuxiliar,
    esAdministradorDelCursoPublicado, 
    obtenerVideoYoutubeClase)




router.put('/publicar/:uidCurso',
    estaAutenticado,
    esMiembro,
    esMiembroInstructor,
    esResponsableDelCursoPublicado,
    publicarCurso)

module.exports = router