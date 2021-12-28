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

    getEstado_CursoSolicitud () {
        return {
            estado: this.estado
        }
    }
}

module.exports = Estado_CursoSolicitud