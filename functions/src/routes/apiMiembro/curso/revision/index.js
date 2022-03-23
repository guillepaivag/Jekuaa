const { Router } = require('express')

const { 
    crearCursoRevision, 
    activarCursoRevision, 
    desactivarCursoRevision 
} = require('../../../../controllers/apiMiembro/curso/curso/revision')
const { estaAutenticado } = require('../../../../middlewares/api/usuario')
const { 
    perteneceAlInstructorEsteCurso, 
    esValidoElCursoBorrador
} = require('../../../../middlewares/apiMiembro/curso/curso/borrador')
const { 
    errorSiElCursoNoEstaEnRevision, 
    errorSiElCursoEstaEnRevision, 
    errorElCursoRevisionNoEstaEnEspera
} = require('../../../../middlewares/apiMiembro/curso/curso/revision')
const { 
    esMiembro, 
    elMiembroEsInstructor 
} = require('../../../../middlewares/apiMiembro')

const router = Router()


// MANDAR A REVISIÓN
router.post('/crearRevision/:uidCursoBorrador', 
    estaAutenticado,
    esMiembro,
    elMiembroEsInstructor,
    perteneceAlInstructorEsteCurso,
    errorSiElCursoEstaEnRevision,
    esValidoElCursoBorrador,
    crearCursoRevision)

    
    
// ACTIVAR REVISIÓN
router.put('/activarRevision/:uidCursoBorrador',
    estaAutenticado,
    esMiembro,
    elMiembroEsInstructor,
    perteneceAlInstructorEsteCurso,
    errorSiElCursoEstaEnRevision, 
    errorElCursoRevisionNoEstaEnEspera,
    activarCursoRevision)



// CANCELAR REVISIÓN
router.put('/desactivarRevision/:uidCursoBorrador', 
    estaAutenticado,
    esMiembro,
    elMiembroEsInstructor,
    perteneceAlInstructorEsteCurso,
    errorSiElCursoNoEstaEnRevision,
    errorElCursoRevisionNoEstaEnEspera,
    desactivarCursoRevision)



module.exports = router