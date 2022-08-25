const db = require("../../../../db");
const Unidad = require("./Unidad");

const COLECCION = 'UnidadesPublicado'

class UnidadPublicado extends Unidad {
    constructor (datos = {}) {
        const {
            fechaCreacion,      // a
            fechaActualizacion, // a
        } = datos
        
        super(datos)
        this.fechaCreacion = fechaCreacion ? fechaCreacion : null
        this.fechaActualizacion = fechaActualizacion ? fechaActualizacion : null
    }

    getUnidadPublicado () {
        return {
            ...super.getUnidad(),
            fechaCreacion: this.fechaCreacion,
            fechaActualizacion: this.fechaActualizacion
        }
    }

    setUnidadPublicado (datos = {}) {
        this.setUnidad(datos)
        this.setFechaCreacion( datos.fechaCreacion )
        this.setFechaActualizacion( datos.fechaActualizacion )
    }

    setUnidad ( unidad = new Unidad() ) {
        super.setUnidad( unidad )
    }

    setFechaCreacion ( fechaCreacion = null ) {
        this.fechaCreacion = fechaCreacion
    }

    setFechaActualizacion ( fechaActualizacion = null ) {
        this.fechaActualizacion = fechaActualizacion
    }

    async importarUnidadPorUID (uidCurso = '', uidUnidad = '') {
        const doc = await db
        .collection('CursosPublicado').doc( uidCurso )
        .collection(COLECCION).doc( uidUnidad )
        .get()

        if (!doc.exists) return null

        this.setUnidadPublicado(doc.data())

        return this
    }





    static async agregar ( uidCurso = '', unidadPublicado = new UnidadPublicado()  ) {        
        await db
        .collection('CursosPublicado').doc( uidCurso )
        .collection(COLECCION).doc( unidadPublicado.uid )
        .set( unidadPublicado.getUnidadPublicado() )

        return true
    }

    static async actualizar ( uidCurso = '', uidUnidad = '', datosActualizados = {} ) {
        await db
        .collection('CursosPublicado').doc( uidCurso )
        .collection(COLECCION).doc( uidUnidad )
        .update( datosActualizados )

        return this
    }

    static async eliminar ( uidCurso = '', uidUnidad = '' ) {
        await db
        .collection('CursosPublicado').doc( uidCurso )
        .collection(COLECCION).doc( uidUnidad )
        .delete()

        return this
    }
}

module.exports = UnidadPublicado