const admin = require('../../../../firebase-service')
const db = require('../../../../db')
const Curso = require('./Curso')
const Errores = require('../../Error/Errores')
const CursoPublicado = require('./CursoPublicado')

const COLECCION_CURSOS = 'CursosBorrador'

class CursoBorrador extends Curso {
    constructor (datos = {}) {
        super( datos )
        this.mensajesError = datos.mensajesError ? datos.mensajesError : []
        this.contieneErrores = datos.contieneErrores ? datos.contieneErrores : false
        this.estadoDocumento = datos.estadoDocumento ? datos.estadoDocumento : ''
    }





    /**
     * ###############################
     *      METODOS NO ESTATICOS
     * ###############################
     */

    getCursoBorrador () {
        return {
            ...super.getCurso(),
            mensajesError: this.mensajesError,
            contieneErrores: this.contieneErrores,
            estadoDocumento: this.estadoDocumento,
        }
    }

    setCursoBorrador ( datos = {} ) {
        this.setCurso(datos)
        this.setMensajesError(datos.mensajesError)
        this.setContieneErrores(datos.contieneErrores)
        this.setEstadoDocumento(datos.estadoDocumento)
    }

    setCurso( datos = {} ) {
        super.setCurso(datos)
    }

    setMensajesError ( mensajesError = [] ) {
        this.mensajesError = mensajesError
    }

    setContieneErrores ( contieneErrores = false ) {
        this.contieneErrores = contieneErrores
    }

    setEstadoDocumento ( estadoDocumento = '' ) {
        this.estadoDocumento = estadoDocumento
    }


    async importarDatosDeUnCurso ( uidCurso = '' ) {       
        const docCurso = await db
        .collection(COLECCION_CURSOS).doc(uidCurso)
        .get()

        if (!docCurso.exists) return null

        let datosCurso = docCurso.data()

        this.setCursoBorrador( datosCurso )

        return this
    }








    /* 
     *    ################################
     *           METODOS ESTATICOS
     *    ################################
    */

    // CRUD Curso
    static async agregarCursoBorrador ( cursoBorrador = new CursoBorrador() ) {
        const datosCursoBorrador = cursoBorrador.getCursoBorrador()
        
        await db
        .collection(COLECCION_CURSOS).doc(cursoBorrador.uid)
        .set(datosCursoBorrador)

        return true
    }

    static async actualizarCurso ( uidCurso = '', datosActualizados = {} ) {
        if (!Object.keys(datosActualizados).length) {
            throw new Errores({
                codigo: 'error/usuario_mala_solicitud',
                mensaje: 'No hay datos para actualizar el curso.'
            })
        }

        await db
        .collection(COLECCION_CURSOS).doc(uidCurso)
        .update(datosActualizados)

        return true
    }

    static async eliminarCurso ( uidCurso = '' ) {
        await db
        .collection(COLECCION_CURSOS).doc(uidCurso)
        .delete()
        
        return true
    }

    static async tieneErrores ( uidCurso = '' ) {
        const docCurso = await db
        .collection(COLECCION_CURSOS).doc(uidCurso)
        .get()

        if (!docCurso.exists) {
            throw new Errores({
                codigo: 'error/usuario_mala_solicitud',
                mensaje: 'No existe este curso.'
            })
        }

        return docCurso.data().contieneErrores
    }
}

module.exports = CursoBorrador