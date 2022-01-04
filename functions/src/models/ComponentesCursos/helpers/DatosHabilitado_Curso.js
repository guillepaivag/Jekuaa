class DatosHabilitado_Curso {

    constructor (datos = {}) {
        const {
            habilitado,
            fechaHabilitado,
            mensaje,
        } = datos

        this.habilitado = habilitado ? habilitado : true
        this.fechaHabilitado = fechaHabilitado ? fechaHabilitado : null
        this.mensaje = mensaje ? mensaje : ''
    }

    getDatosHabilitado_Curso ( getJSON = false ) {
        if ( getJSON ) {
            return JSON.parse( JSON.stringify( this ) )
        }

        return this
    }
}

module.exports = DatosHabilitado_Curso