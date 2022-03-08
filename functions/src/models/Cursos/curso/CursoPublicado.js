const Curso = require("./Curso");

class CursoPublicado extends Curso {
    constructor (datos = {}) {
        const {
            publicado,              // 
            deshabilitado,          // 
            cantidadEstudiantes,    // automatico
            cantidadMeGusta,        // automatico
            fechaCreacion,          // automatico
            fechaActualizacion,     // automatico
        } = datos
        
        super(datos)
        this.publicado = publicado ? publicado : true
        this.deshabilitado = deshabilitado ? deshabilitado : null
        this.cantidadEstudiantes = cantidadEstudiantes ? cantidadEstudiantes : 0
        this.cantidadMeGusta = cantidadMeGusta ? cantidadMeGusta : 0
        this.fechaCreacion = fechaCreacion ? fechaCreacion : null
        this.fechaActualizacion = fechaActualizacion ? fechaActualizacion : null
    }

    getCursoPublicado () {
        return {
            ...super.getCurso(),
            publicado: this.publicado,
            deshabilitado: this.deshabilitado,
            cantidadEstudiantes: this.cantidadEstudiantes,
            cantidadMeGusta: this.cantidadMeGusta,
            fechaCreacion: this.fechaCreacion,
            fechaActualizacion: this.fechaActualizacion,
        }
    }


    setCursoPublicado ( datos = {} ) {
        const {
            publicado, 
            deshabilitado, 
            cantidadEstudiantes,
            cantidadMeGusta,
            fechaCreacion,
            fechaActualizacion,
        } = datos

        super.setCurso(datos)
        this.setPublicado(publicado)
        this.setDeshabilitado(deshabilitado)
        this.setCantidadEstudiante( cantidadEstudiantes )
        this.setCantidadMeGusta ( cantidadMeGusta )
        this.setFechaCreacion( fechaCreacion )
        this.setFechaActualizacion( fechaActualizacion )
    }



    setPublicado ( publicado ) {
        this.publicado = publicado === undefined ? true : publicado
    }

    setDeshabilitado ( deshabilitado = null ) {
        this.deshabilitado = deshabilitado
    }
    
    setCantidadEstudiante ( cantidadEstudiantes = 0 ) {
        this.cantidadEstudiantes = cantidadEstudiantes
    }

    setCantidadMeGusta ( cantidadMeGusta = 0 ) {
        this.cantidadMeGusta = cantidadMeGusta
    }
    
    setFechaCreacion ( fechaCreacion = null ) {
        this.fechaCreacion = fechaCreacion
    }

    setFechaActualizacion ( fechaActualizacion = null ) {
        this.fechaActualizacion = fechaActualizacion
    }
}

module.exports = CursoPublicado