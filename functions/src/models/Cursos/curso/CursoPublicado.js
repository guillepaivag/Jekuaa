const db = require("../../../../db")
const { milliseconds_a_timestamp } = require("../../../utils/timestamp")
const Errores = require("../../Error/Errores")
const Curso = require("./Curso")

const COLECCION = 'CursosPublicado'

class CursoPublicado extends Curso {
    constructor (datos = {}) {
        const {
            publicado,                  // 
            habilitado,                 //
            mensajesDeshabilitacion,    //  
            cantidadEstudiantes,        // automatico
            cantidadMeGusta,            // automatico
            fechaCreacion,              // automatico
            fechaActualizacion,         // automatico
        } = datos
        
        super(datos)
        this.publicado = publicado !== undefined ? publicado : true
        this.habilitado = habilitado !== undefined ? habilitado : true
        this.mensajesDeshabilitacion = mensajesDeshabilitacion ? mensajesDeshabilitacion : []
        this.cantidadEstudiantes = cantidadEstudiantes ? cantidadEstudiantes : 0
        this.cantidadMeGusta = cantidadMeGusta ? cantidadMeGusta : 0
        this.fechaCreacion = fechaCreacion ? fechaCreacion : null
        this.fechaActualizacion = fechaActualizacion ? fechaActualizacion : null
    }

    getCursoPublicado () {
        return {
            ...super.getCurso(),
            publicado: this.publicado,
            habilitado: this.habilitado,
            mensajesDeshabilitacion: this.mensajesDeshabilitacion,
            cantidadEstudiantes: this.cantidadEstudiantes,
            cantidadMeGusta: this.cantidadMeGusta,
            fechaCreacion: this.fechaCreacion,
            fechaActualizacion: this.fechaActualizacion,
        }
    }


    setCursoPublicado ( datos = {} ) {
        const {
            publicado, 
            habilitado, 
            mensajesDeshabilitacion, 
            cantidadEstudiantes,
            cantidadMeGusta,
            fechaCreacion,
            fechaActualizacion,
        } = datos

        this.setCurso(datos)
        this.setPublicado(publicado)
        this.setHabilitado(habilitado)
        this.setMensajesDeshabilitacion(mensajesDeshabilitacion)
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

    setHabilitado ( habilitado ) {
        this.habilitado = habilitado === undefined ? true : habilitado
    }

    setMensajesDeshabilitacion ( mensajesDeshabilitacion = [] ) {
        this.mensajesDeshabilitacion = mensajesDeshabilitacion
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

        this.setCursoPublicado( datosCurso )

        return this
    }

    static async crearCurso ( cursoPublicado = new CursoPublicado() ) {
        const datosCursoPublicado = cursoPublicado.getCursoPublicado()
        
        await db
        .collection(COLECCION).doc(cursoPublicado.uid)
        .set(datosCursoPublicado)

        return true
    }

    static async obtenerCurso ( uidCurso = '' ) {
        const cursoPublicado = new CursoPublicado()
        return await cursoPublicado.importarDatosDeUnCurso(uidCurso)
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

    static async darMeGusta (uidUsuario, uidCurso, meGusta) {
        const cursoPublicado = new CursoPublicado()
        await cursoPublicado.importarDatosDeUnCurso(uidCurso)

        const refCursoMG = db.collection('Usuarios').doc(uidUsuario)
        .collection('CursosMG').doc(uidCurso)

        if (cursoPublicado.getCursoPublicado().cantidadMeGusta === 0 && !meGusta) {
            // Retornar respuesta
            throw new Errores({
                estado: 400,
                mensajeCliente: 'no_hay_me_gusta',
                mensajeServidor: '¡No hay ningún me gusta en este curso!',
            })
        }
        
        // Crear Me gusta del usuario
        if (meGusta) 
            refCursoMG.set({ uid: uidCurso, fechaMeGusta: milliseconds_a_timestamp( Date.now() ) }) 
        else 
            refCursoMG.delete()

        db.collection(COLECCION).doc(uidCurso)
        .update({ cantidadMeGusta: meGusta ? 1 : -1 })
    }
}

module.exports = CursoPublicado