const {Router} = require('express')
const router = Router()

const { estaAutenticado } = require('../middlewares/usuario')
const { verificacionExistenciaBlog } = require('../middlewares/blog')
const { velidarDatosMeGustaBlog } = require('../middlewares/estudiante')
const { darMeGusta } = require('../controllers/usuarios/estudiante')

router.post('/meGustaBlog/:uid', 
    estaAutenticado, 
    verificacionExistenciaBlog,
    velidarDatosMeGustaBlog,
    darMeGusta)

module.exports = router