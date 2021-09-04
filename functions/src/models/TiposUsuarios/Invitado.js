const admin = require('../../../firebase-service')
const db = require('../../../db')
const Usuario = require('../Usuario')

class Invitado {

    constructor () {

    }

    async registrarmePorCorreoYContrasenha ( data ) {

        const {
            correo,
            contrasenha,
            nombreUsuario,
            nombreCompleto
        } = data

        const datosUsuario = {
            uid: null,
            nombreCompleto: nombreCompleto,
            nombreUsuario: nombreUsuario,
            correo: correo,
            fechaNacimiento: null,
            jekuaaPremium: null,
            jekuaaRoles: null,
            jekuaaPoint: 0
        }

        const usuario = new Usuario()

        usuario.setUsuario( datosUsuario )

        await usuario.guardarUsuario( contrasenha )

        return usuario
        
    }

    iniciarSesionPorCorreoYContrasenha ( correo, contrasenha ) {

    }

    verCursos (  ) {

    }

    verCurso ( uidCurso ) {
        
    }

    verBlogs (  ) {
        
    }

    verBlog ( uidBlog ) {
        
    }
}

module.exports = Invitado