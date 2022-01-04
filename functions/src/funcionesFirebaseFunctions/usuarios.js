const functions = require('firebase-functions')
const admin = require('../../firebase-service')
const db = require('../../db')
const Usuario = require('../models/ComponentesUsuario/Usuario')
const Instructor = require('../models/ComponentesUsuario/Instructor')
const ffUsuarios = {}

/**
 * Incremetación de contador de cantidad de blogs
*/
ffUsuarios.eventoCreacionBlog = functions
.region('southamerica-east1')
.firestore.document('Usuarios/{uid}')
.onCreate(async ( change, context ) => {
    const document = change

    const usuario = new Usuario(document.data())
    
    // Creación de instructor
    if (usuario.instructor) {
        // Crear instructor
        Instructor.crearNuevoInstructor({
            uid: usuarioAuthNuevo.uid,
        })
    }
})

ffUsuarios.eventoActualizacionBlog = functions
.region('southamerica-east1')
.firestore.document('Usuarios/{uid}')
.onUpdate(async ( change, context ) => {
    const docNuevo = change.after
    const docViejo = change.before
    
    const nuevo = new Usuario(docNuevo.data())

    if (nuevo.instructor) {
        // Verificar si existe documento

        // Si no existe, crear
    }
})

ffUsuarios.eventoEliminacionBlog = functions
.region('southamerica-east1')
.firestore.document('Usuarios/{uid}')
.onDelete(async ( change, context ) => {
    const document = change
    
    // Verificar si existe documento

    // Si no existe, crear
})


module.exports = ffUsuarios