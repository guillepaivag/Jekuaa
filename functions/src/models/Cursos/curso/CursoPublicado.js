const db = require("../../../../db")
const Curso = require("./Curso")

const COLECCION = 'CursosPublicado'

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

        this.setCurso(datos)
        this.setPublicado(publicado)
        this.setDeshabilitado(deshabilitado)
        this.setCantidadEstudiante( cantidadEstudiantes )
        this.setCantidadMeGusta ( cantidadMeGusta )
        this.setFechaCreacion( fechaCreacion )
        this.setFechaActualizacion( fechaActualizacion )
    }

    setCurso( datos = {} ) {
        super.setCurso(datos)
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


    async importarDatosDeUnCurso ( uidCurso = '' ) {       
        const docCurso = await db
        .collection(COLECCION).doc(uidCurso)
        .get()

        if (!docCurso.exists) return null

        let datosCurso = docCurso.data()

        this.setCursoBorrador( datosCurso )

        return this
    }








    static async crearCurso ( cursoPublicado = new CursoPublicado() ) {
        const datosCursoPublicado = cursoPublicado.getCursoPublicado()
        
        await db
        .collection(COLECCION).doc(cursoPublicado.uid)
        .set(datosCursoPublicado)

        return true
    }

    static async actualizarCurso ( uidCurso = '', datosActualizados = {} ) {
        
        await db
        .collection(COLECCION).doc(uidCurso)
        .update(datosActualizados)

        return true
    }

    static async eliminarCurso ( uidCurso = '' ) {
        await db
        .collection(COLECCION).doc(uidCurso)
        .delete()
        
        return true
    }
}

module.exports = CursoPublicado