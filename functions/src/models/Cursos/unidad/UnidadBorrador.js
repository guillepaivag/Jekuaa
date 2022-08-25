const db = require("../../../../db");
const Unidad = require("./Unidad");
const UnidadPublicado = require("./UnidadPublicado");

const COLECCION = 'UnidadesBorrador'

class UnidadBorrador extends Unidad {
    constructor ( datos = {} ) {
        super(datos)
        this.mensajesError = datos.mensajesError ? datos.mensajesError : []
        this.contieneErrores = datos.contieneErrores ? datos.contieneErrores : false
        this.estadoDocumento = datos.estadoDocumento ? datos.estadoDocumento : ''
    }
    
    getUnidadBorrador () {
        return {
            ...super.getUnidad(),
            mensajesError: this.mensajesError,
            contieneErrores: this.contieneErrores,
            estadoDocumento: this.estadoDocumento,
        }
    }

    setUnidadBorrador ( datos = {} ) {
        this.setUnidad(datos)
        this.setMensajesError(datos.mensajesError)
        this.setContieneErrores(datos.contieneErrores)
        this.setEstadoDocumento(datos.estadoDocumento)
    }

    setUnidad ( unidad = new Unidad() ) {
        super.setUnidad( unidad )
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

    async importarUnidadPorUID (uidCurso = '', uidUnidad = '') {
        const doc = await db
        .collection('CursosBorrador').doc( uidCurso )
        .collection(COLECCION).doc( uidUnidad )
        .get()

        if (!doc.exists) return null

        this.setUnidadBorrador(doc.data())

        return this
    }

    async crearUnidadPublicadoDeBorrador ( uidCurso = '', uidUnidad = '' ) {
        const unidadPublicado = new UnidadPublicado()
        await unidadPublicado.importarDatosDeUnCurso(uidCurso)

        const datos = super.getCurso()
        cursoPublicado.setCurso(datos)

        return cursoPublicado
    }




    static async agregar ( uidCurso = '', unidadBorrador = new UnidadBorrador()  ) {        
        await db
        .collection('CursosBorrador').doc( uidCurso )
        .collection(COLECCION).doc( unidadBorrador.uid )
        .set( unidadBorrador.getUnidadBorrador() )

        return true
    }

    static async actualizar ( uidCurso = '', uidUnidad = '', datosActualizados = {} ) {
        await db
        .collection('CursosBorrador').doc( uidCurso )
        .collection(COLECCION).doc( uidUnidad )
        .update( datosActualizados )

        return this
    }

    static async eliminar ( uidCurso = '', uidUnidad = '' ) {
        await db
        .collection('CursosBorrador').doc( uidCurso )
        .collection(COLECCION).doc( uidUnidad )
        .delete()

        return this
    }

    static async obtenerUnidades ( uidCurso = '' ) {
        const snapshot = await db
        .collection('CursosBorrador').doc( uidCurso )
        .collection(COLECCION).get()

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
        .collection(COLECCION).orderBy('ordenUnidad', 'desc').limit(1)
        .get()

        return snapshot.docs.length ? snapshot.docs[0].data() : null
    }

    static async tieneErrores ( uidCurso = '' ) {
        const snapshot = await db
        .collection('CursosBorrador').doc(uidCurso)
        .collection(COLECCION).where('contieneErrores', '==', true).limit(1)
        .get()

        return !!snapshot.docs.length
    }
}

module.exports = UnidadBorrador