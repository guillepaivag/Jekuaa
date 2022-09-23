const admin = require("../../../../firebase-service")
const db = require("../../../../db")

const COLECCION_CLASES = 'ClasesCurso'

/**
 * tipoClase:
 * Si "!!tipoClase", entonces, existe contenido en el curso
 * tipoClase puede ser: '', 'video', 'articulo'
 * 
 * -----------------------------------------------------------
 * 
 * complementos:
 * [{
 *      uidComplemento: '',
 *      tipoComplemento: ''
 * }]
 * 
 * -----------------------------------------------------------
 * 
 * subtitulos: 
 * ['español', 'ingles']
*/

class Clase {
    constructor (datos = {}) {
        const {
            uid,                // r - a
            contribuyentes,      // r - a
            ordenClase,         // r - a
            titulo,             // r 
            descripcion,        // 
            duracion,           // r - a
            tipoClase,          // r - a
            complementos,       // 
            subtitulos,         // 
            vistaPrevia,        // 
        } = datos
    
        this.uid = uid ? uid : db.collection(COLECCION_CLASES).doc().id
        this.contribuyentes = contribuyentes ? contribuyentes : ''
        this.ordenClase = ordenClase ? ordenClase : 0
        this.titulo = titulo ?  titulo : ''
        this.descripcion = descripcion ?  descripcion : ''
        this.duracion = duracion ? duracion : 0
        this.tipoClase = tipoClase ? tipoClase : ''
        this.complementos = complementos ? complementos : []
        this.subtitulos = subtitulos ? subtitulos : []
        this.vistaPrevia = vistaPrevia !== undefined ?  vistaPrevia : false
    }

    getClase () {
        return {
            uid: this.uid,
            contribuyentes: this.contribuyentes,
            ordenClase: this.ordenClase,
            titulo: this.titulo,
            descripcion: this.descripcion,
            duracion: this.duracion,
            tipoClase: this.tipoClase,
            complementos: this.complementos,
            subtitulos: this.subtitulos,
            vistaPrevia: this.vistaPrevia,
        }
    }

    setClase (datos = {}) {
        const {
            uid, contribuyentes, ordenClase, titulo, 
            descripcion, duracion, 
            tipoClase, complementos,
            subtitulos, vistaPrevia
        } = datos

        this.setUid(uid)
        this.setContribuyentes(contribuyentes)
        this.setOrdenClase(ordenClase)
        this.setTitulo(titulo)
        this.setDescripcion(descripcion)
        this.setDuracion(duracion)
        this.setTipoClase(tipoClase)
        this.setComplementos(complementos)
        this.setSubTitulos(subtitulos)
        this.setVistaPrevia(vistaPrevia)

        return this
    }

    setUid (uid = db.collection(COLECCION_CLASES).doc().id) {
        this.uid = uid
        return this
    }

    setContribuyentes ( contribuyentes = '' ) {
        this.contribuyentes = contribuyentes
        return this
    }
    
    setOrdenClase ( ordenClase = 0 ) {
        this.ordenClase = ordenClase
        return this
    }

    setTitulo ( titulo = '' ) {
        this.titulo = titulo
        return this
    }

    setDescripcion ( descripcion = '' ) {
        this.descripcion = descripcion
        return this
    }

    setDuracion ( duracion = 0 ) {
        this.duracion = duracion
        return this
    }

    setTipoClase ( tipoClase = '' ) {
        this.tipoClase = tipoClase
        return this
    }

    setComplementos ( complementos = [] ) {
        this.complementos = complementos
        return this
    }

    setSubTitulos ( subtitulos = [] ) {
        this.subtitulos = subtitulos
        return this
    }

    setVistaPrevia ( vistaPrevia = false ) {
        this.vistaPrevia = vistaPrevia
        return this
    }

}

module.exports = Clase