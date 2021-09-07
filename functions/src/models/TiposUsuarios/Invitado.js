const admin = require('../../../firebase-service')
const db = require('../../../db')
const Usuario = require('../Usuario')
const JekuaaPremium = require('../JekuaaPremium')
const JekuaaRoles = require('../JekuaaRoles')

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

        const uidUsuario = await Usuario.crearNuevoUsuario({
            correo: correo,
            nombreUsuario: nombreUsuario,
            nombreCompleto: nombreCompleto,
        }, contrasenha)

        const usuario = new Usuario()
        await usuario.importarDatosUsuarioPorUID(uidUsuario)

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