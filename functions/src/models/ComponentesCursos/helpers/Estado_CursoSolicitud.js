const ESTADOS_VALIDOS = [
    'revision',
    'aceptado',
    'no_aceptado',
]

class Estado_CursoSolicitud {
    constructor (datos = {}) {
        const {
            estado,
        } = datos

        this.estado = estado ? estado : 'revision'
    }

    getEstado_CursoSolicitud ( getJSON = false ) {
        if ( getJSON ) {
            return JSON.parse( JSON.stringify( this ) )
        }

        return this
    }
}

module.exports = Estado_CursoSolicitud