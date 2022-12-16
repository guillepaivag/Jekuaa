const db = require('../../../db')
const COLECCION = 'Equipos'

class Equipo {
    constructor(datos = {}) {
        const { uid, codigo, nombre, descripcion, responsable, verificado, eliminado, 
            fechaCreado, fechaVerificado, fechaEliminado 
        } = datos

        this.uid = uid ? uid : db.collection(COLECCION).doc().id
        this.codigo = codigo ? codigo : ''
        this.nombre = nombre ? nombre : ''
        this.descripcion = descripcion ? descripcion : ''
        this.responsable = responsable ? responsable : ''
        this.verificado = verificado ? verificado : false
        this.eliminado = eliminado !== undefined ? eliminado : false
        this.fechaCreado = fechaCreado ? fechaCreado : null
        this.fechaVerificado = fechaVerificado ? fechaVerificado : null
        this.fechaEliminado = fechaEliminado ? fechaEliminado : null
        
    }

    /* 
        GETTERS: Se obtienen los datos de los atributos
    */

    getEquipo() {
        return {
            uid: this.uid,
            codigo: this.codigo,
            nombre: this.nombre,
            descripcion: this.descripcion,
            responsable: this.responsable,
            verificado: this.verificado,
            eliminado: this.eliminado,
            fechaCreado: this.fechaCreado,
            fechaVerificado: this.fechaVerificado,
            fechaEliminado: this.fechaEliminado,
        }
    }



    /* 
        SETTERS: Se agregan los datos que se desee a los atributos
    */

    setEquipo(datosEquipo = {}) {
        const {
            uid, codigo, nombre, descripcion,
            responsable, verificado, eliminado, fechaCreado,
            fechaVerificado, fechaEliminado
        } = datosEquipo

        this.setUID(uid)
        this.setCodigo(codigo)
        this.setNombre(nombre)
        this.setDescripcion(descripcion)
        this.setResponsable(responsable)
        this.setVerificado(verificado)
        this.setEliminado(eliminado)
        this.setFechaCreado(fechaCreado)
        this.setFechaVerificado(fechaVerificado)
        this.setFechaEliminado(fechaEliminado)

        return this
    }

    setUID(uid = '') {
        this.uid = uid
        return this
    }

    setCodigo(codigo = '') {
        this.codigo = codigo
        return this
    }

    setNombre(nombre = '') {
        this.nombre = nombre
        return this
    }

    setDescripcion(descripcion = '') {
        this.descripcion = descripcion
        return this
    }

    setResponsable(responsable = "") {
        this.responsable = responsable
        return this
    }

    setVerificado(verificado = false) {
        this.verificado = verificado
        return this
    }

    setEliminado(eliminado = false) {
        this.eliminado = eliminado
        return this
    }

    setFechaCreado(fechaCreado = null) {
        this.fechaCreado = fechaCreado
        return this
    }

    setFechaVerificado(fechaVerificado = null) {
        this.fechaVerificado = fechaVerificado
        return this
    }
    
    setFechaEliminado(fechaEliminado = null) {
        this.fechaEliminado = fechaEliminado
        return this
    }

    /* 
        ACCIONES: Se trabajara con la base de datos
    */

    /* 
     *    ################################
     *           METODOS NO ESTATICOS
     *    ################################
    */

    async importarDatosEquipoPorUID(uid = '') {
        const documentoEquipo = await db.collection(COLECCION).doc(uid).get()

        if (!documentoEquipo.exists) return null

        const datosEquipo = documentoEquipo.data()

        this.setEquipo(datosEquipo)

        return this
    }

    /* 
     *    ################################
     *           METODOS ESTATICOS
     *    ################################
    */


    /* 
        DESCRIPCION: Se crea un equipo a partir de los datos como el nombre, la descripcion y
        el responsable.
    */

    static async crearEquipo(equipo = new Equipo()) {
        // Crear los datos en firestore para el nuevo equipo
        await db.collection(COLECCION).doc(equipo.uid).set(equipo.getEquipo())

        return true
    }

    static async obtenerEquipoPorUID(uid = '') {
        const equipo = new Equipo()
        return await equipo.importarDatosEquipoPorUID(uid)
    }

    static async actalizarEquipoPorUID(uidEquipo = '', datosActualizados = null) {
        // Actualizar los datos de firestore del equipo
        if (datosActualizados) await db.collection(COLECCION).doc(uidEquipo).update(datosActualizados)
        return !!datosActualizados
    }

    static async eliminarEquipoPorUID(uidEquipo = '') {
        return await db.collection(COLECCION).doc(uidEquipo).delete()
    }
}

module.exports = Equipo