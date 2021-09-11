// 'jekuaa/error/usuario-deshabilitado'

const informacionCodigos = {
    jekuaa: {

        error: {
            sistema: {
                codigo: 'jekuaa/error/sistema',
                status: 500,
                mensaje: 'Hubo un error en el servidor.',
                descripcion: 'Cuando hay un error en el sistema.'
            },
            usuario_deshabilitado: {
                codigo: 'jekuaa/error/usuario_deshabilitado',
                status: 401,
                mensaje: 'No estas autorizado, el usuario esta deshabilitado.',
                descripcion: 'Cuando el usuario intenta realizar una acción pero se encuentra deshabilitado.'
            },
            usuario_no_autenticado: {
                codigo: 'jekuaa/error/usuario_no_autenticado',
                status: 401,
                mensaje: 'No estas autorizado, favor iniciar sesión.',
                descripcion: 'Cuando el usuario intenta realizar una acción pero no inicio sesión.'
            },
            usuario_no_autorizado: {
                codigo: 'jekuaa/error/usuario_no_autorizado',
                status: 403,
                mensaje: 'No estas autorizado.',
                descripcion: 'Cuando el usuario quiere realizar alguna acción y no tiene el rol con los permisos.'
            }
        },

        exito: {

        }

    }
}


module.exports = informacionCodigos