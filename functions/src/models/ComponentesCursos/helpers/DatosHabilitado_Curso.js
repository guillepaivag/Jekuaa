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

}

module.exports = DatosHabilitado_Curso