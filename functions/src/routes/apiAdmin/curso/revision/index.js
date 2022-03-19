const { Router } = require('express')
const router = Router()

const { estaAutenticado } = require('../../../../middlewares/api/usuario')
const { esAdmin } = require('../../../../middlewares/apiAdmin/admin')

// ACEPTAR LA REVICION DEL CURSO
router.put('/aceptar/:uidCursoBorrador', 
    estaAutenticado,
    esAdmin)


// NO ACEPTAR LA REVICION DEL CURSO
router.put('/no-aceptar/:uidCursoBorrador', 
    estaAutenticado,
    esAdmin)


module.exports = router