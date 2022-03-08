const db = require("../../../../db");
const Unidad = require("./Unidad");

const COLECCION_UNIDAD_BORRADOR = 'UnidadesBorrador'

class UnidadBorrador extends Unidad {
    constructor ( datos = {} ) {
        super(datos)
        this.mensajesError = datos.mensajesError ? datos.mensajesError : []
        this.estadoDocumento = datos.estadoDocumento ? datos.estadoDocumento : ''
    }
    
    getUnidadBorrador () {
        return {
            ...super.getUnidad(),
            mensajesError: this.mensajesError,
            estadoDocumento: this.estadoDocumento,
        }
    }

    setUnidadBorrador ( datos = {} ) {
        this.setUnidad(datos)
        this.setMensajesError(datos.mensajesError)
        this.setEstadoDocumento(datos.estadoDocumento)
    }

    setUnidad ( unidad = new Unidad() ) {
        super.setUnidad( unidad )
    }

    setMensajesError ( mensajesError = [] ) {
        this.mensajesError = mensajesError
    }

    setEstadoDocumento ( estadoDocumento = '' ) {
        this.estadoDocumento = estadoDocumento
    }

    async importarUnidadPorUID (uidCurso = '', uidUnidad = '') {
        const doc = await db
        .collection('CursosBorrador').doc( uidCurso )
        .collection(COLECCION_UNIDAD_BORRADOR).doc( uidUnidad )
        .get()

        if (!doc.exists) return null

        this.setUnidadBorrador(doc.data())

        return this
    }




    static async agregar ( uidCurso = '', unidadBorrador = new UnidadBorrador()  ) {        
        await db
        .collection('CursosBorrador').doc( uidCurso )
        .collection(COLECCION_UNIDAD_BORRADOR).doc( unidadBorrador.uid )
        .set( unidadBorrador.getUnidadBorrador() )

        return true
    }

    static async actualizar ( uidCurso = '', uidUnidad = '', datosActualizados ) {
        await db
        .collection('CursosBorrador').doc( uidCurso )
        .collection(COLECCION_UNIDAD_BORRADOR).doc( uidUnidad )
        .update( datosActualizados )

        return this
    }

    static async eliminar (uidCurso = '', uidUnidad = '' ) {
        await db
        .collection('CursosBorrador').doc( uidCurso )
        .collection(COLECCION_UNIDAD_BORRADOR).doc( uidUnidad )
        .delete()

        return this
    }

    static async obtenerUnidades ( uidCurso = '' ) {
        const snapshot = await db
        .collection('CursosBorrador').doc( uidCurso )
        .collection(COLECCION_UNIDAD_BORRADOR).get()

        let unidades = []
        for (let i = 0; i < snapshot.docs.length; i++) {
            const doc = snapshot.docs[i]
            const unidad = new UnidadBorrador( doc.data() )
            unidades.push( unidad )
        }

        return unidades
    }

    static async obtenerUltimaUnidadPorCurso ( uidCurso = '' ) {
        const snapshot = await db
        .collection('CursosBorrador').doc( uidCurso )
        .collection(COLECCION_UNIDAD_BORRADOR).orderBy('ordenUnidad', 'desc').limit(1)
        .get()

        return snapshot.docs.length ? snapshot.docs[0].data() : null
    }
}

module.exports = UnidadBorrador