const { Router } = require('express')

const { 
    crearCursoRevision, 
    desactivarCursoRevision 
} = require('../../controllers/curso-revision')
const { estaAutenticado } = require('../../../estudiante/middlewares/usuario')
const { 
    perteneceAlInstructorEsteCurso, 
    esValidoElCursoBorrador
} = require('../../middlewares/curso-borrador')
const { 
    validacionCreacionCursoRevision, 
    validacionCancelacionCursoRevision,
} = require('../../middlewares/curso-revision')
const { 
    esMiembro, 
    elMiembroEsInstructor 
} = require('../../middlewares')

const router = Router()


// MANDAR A REVISIÓN
router.post('/crearRevision/:uidCurso', 
    estaAutenticado,
    esMiembro,
    elMiembroEsInstructor,
    perteneceAlInstructorEsteCurso,
    validacionCreacionCursoRevision,
    esValidoElCursoBorrador,
    crearCursoRevision)


    
// CANCELAR REVISIÓN
router.put('/desactivarRevision/:uidCurso', 
    estaAutenticado,
    esMiembro,
    elMiembroEsInstructor,
    perteneceAlInstructorEsteCurso,
    validacionCancelacionCursoRevision,
    desactivarCursoRevision)



module.exports = router