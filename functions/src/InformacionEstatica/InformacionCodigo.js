// 'error/usuario-deshabilitado'

const informacionCodigos = {
    error: {
        usuario_mala_solicitud: {
            codigo: 'error/usuario_mala_solicitud',
            status: 400,
            mensaje: 'Se ha realizado una mala solicitud.',
            descripcion: 'Cuando el usuario quiere realizar alguna acción y no tiene el rol con los permisos.'
        },
        usuario_no_autenticado: {
            codigo: 'error/usuario_no_autenticado',
            status: 401,
            mensaje: 'No estas autorizado, favor iniciar sesión.',
            descripcion: 'Cuando el usuario intenta realizar una acción pero no inicio sesión.'
        },
        usuario_no_autorizado: {
            codigo: 'error/usuario_no_autorizado',
            status: 403,
            mensaje: 'No estas autorizado.',
            descripcion: 'Cuando el usuario quiere realizar alguna acción y no tiene el rol con los permisos.'
        },
        sistema: {
            codigo: 'error/sistema',
            status: 500,
            mensaje: 'Hubo un error en el servidor.',
            descripcion: 'Cuando hay un error en el sistema.'
        },
    },
    exito: {
        codigo: 'exito',
        status: 200,
        mensaje: 'Se realizo con exito la acción.',
        descripcion: 'Cuando el servidor realiza una acción de forma exitosa.'
    }
}

module.exports = informacionCodigos