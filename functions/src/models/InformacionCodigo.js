// 'jekuaa/error/usuario-deshabilitado'

const informacionCodigos = {
    jekuaa: {

        error: {
            usuario_mala_solicitud: {
                codigo: 'jekuaa/error/usuario_mala_solicitud',
                status: 400,
                mensaje: 'Se ha realizado una mala solicitud.',
                descripcion: 'Cuando el usuario quiere realizar alguna acción y no tiene el rol con los permisos.'
            },
            usuario_ya_existe: {
                codigo: 'jekuaa/error/usuario_ya_existe',
                status: 400,
                mensaje: 'Ya existe el usuario.',
                descripcion: 'Cuando ya existe un usuario.'
            },
            usuario_no_autenticado: {
                codigo: 'jekuaa/error/usuario_no_autenticado',
                status: 401,
                mensaje: 'No estas autorizado, favor iniciar sesión.',
                descripcion: 'Cuando el usuario intenta realizar una acción pero no inicio sesión.'
            },
            usuario_deshabilitado: {
                codigo: 'jekuaa/error/usuario_deshabilitado',
                status: 403,
                mensaje: 'No estas autorizado, el usuario esta deshabilitado.',
                descripcion: 'Cuando el usuario intenta realizar una acción pero se encuentra deshabilitado.'
            },
            usuario_no_autorizado: {
                codigo: 'jekuaa/error/usuario_no_autorizado',
                status: 403,
                mensaje: 'No estas autorizado.',
                descripcion: 'Cuando el usuario quiere realizar alguna acción y no tiene el rol con los permisos.'
            },
            usuario_token_expirado: {
                codigo: 'jekuaa/error/usuario_token_expirado',
                status: 403,
                mensaje: 'No estas autorizado, el token del usuario expiro, vuelva a cargar.',
                descripcion: 'Cuando el usuario quiere realizar alguna acción y no tiene el rol con los permisos.'
            },
            usuario_no_existe: {
                codigo: 'jekuaa/error/usuario_no_existe',
                status: 404,
                mensaje: 'No existe el usuario.',
                descripcion: 'Cuando se busca un usuario inexistente ocurrira este error.'
            },
            sistema: {
                codigo: 'jekuaa/error/sistema',
                status: 500,
                mensaje: 'Hubo un error en el servidor.',
                descripcion: 'Cuando hay un error en el sistema.'
            },
        },

        exito: {
            codigo: 'jekuaa/exito',
            status: 200,
            mensaje: 'Se realizo con exito la acción.',
            descripcion: 'Cuando el servidor realiza una acción de forma exitosa.'
        }

    }
}

module.exports = informacionCodigos