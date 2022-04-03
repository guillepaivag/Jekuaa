const { Router } = require('express')

const { 
    crearCursoRevision, 
    desactivarCursoRevision 
} = require('../../../../controllers/apiMiembro/curso/curso/revision')
const { estaAutenticado } = require('../../../../middlewares/api/usuario')
const { 
    perteneceAlInstructorEsteCurso, 
    esValidoElCursoBorrador
} = require('../../../../middlewares/apiMiembro/curso/curso/borrador')
const { 
    validacionCreacionCursoRevision, 
    validacionCancelacionCursoRevision,
} = require('../../../../middlewares/apiMiembro/curso/curso/revision')
const { 
    esMiembro, 
    elMiembroEsInstructor 
} = require('../../../../middlewares/apiMiembro')

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