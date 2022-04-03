const admin = require('../../../../firebase-service')
const db = require('../../../../db')
const DatosPrecio_Curso = require('../helpers/DatosPrecio_Curso')


/**
 * ¡A TENER EN CUENTA!
 * 
 * ---------------------------------
 * 
 * deshabilitado: { mensaje, fechaDeshabilitado }
 * 
 * datosPrecio: 
 *  Caso 1: Si el curso no esta publicado
 *      - Se actualiza en el borrador 
 * 
 *  Caso 2: Si el curso esta publicado
 *      - Se actualiza en el publicado
 * 
 * ---------------------------------
 * 
 * r : requerido
 */




class Curso {

    constructor ( datosCurso = {} ) {
       
        const {
            uid,                    // r
            responsable,            // r 
            contribuyentes,         // 
            equipo,                 // constante para siempre
            fotoPerfil,             // r
            titulo,                 // r 
            referenciaURL,          // constante para siempre (cuando se publica el curso) - r
            descripcion,            // r 
            requisitos,             // r 
            objetivos,              // r 
            nivel,                  // r 
            seccion,                // r 
            categorias,              // r 
            datosPrecio,            // r 
            duracion,               // automatico
            idioma,                 // r 
            subTitulos,             // 
        } = datosCurso

        this.uid = uid ? uid : db.collection('CursosPublicado').doc().id
        this.responsable = responsable ? responsable : ''
        this.contribuyentes = contribuyentes ? contribuyentes : []
        this.equipo = equipo ? equipo : ''
        this.fotoPerfil = fotoPerfil ? fotoPerfil : ''
        this.titulo = titulo ? titulo : ''
        this.referenciaURL = referenciaURL ? referenciaURL : ''
        this.descripcion = descripcion ? descripcion : ''
        this.requisitos = requisitos ? requisitos : []
        this.objetivos = objetivos ? objetivos : []
        this.nivel = nivel ? nivel : 'basico'
        this.seccion = seccion ? seccion : ''
        this.categorias = categorias ? categorias : []
        this.datosPrecio = datosPrecio ? new DatosPrecio_Curso(datosPrecio) : new DatosPrecio_Curso()
        this.duracion = duracion ? duracion : 0
        this.idioma = idioma ? idioma : 'español'
        this.subTitulos = subTitulos ? subTitulos : [] 
    }


    /* 
     *   ###############################
     *        METODOS NO ESTATICOS
     *   ###############################
    */


    getCurso () {
        return {
            uid: this.uid,
            responsable: this.responsable,
            contribuyentes: this.contribuyentes,
            equipo: this.equipo,
            fotoPerfil: this.fotoPerfil,
            titulo: this.titulo,
            referenciaURL: this.referenciaURL,
            descripcion: this.descripcion,
            requisitos: this.requisitos,
            objetivos: this.objetivos,
            nivel: this.nivel,
            seccion: this.seccion,
            categorias: this.categorias,
            datosPrecio: this.datosPrecio.getDatosPrecio_Curso(),
            duracion: this.duracion,
            idioma: this.idioma,
            subTitulos: this.subTitulos,
        }
    }

    setCurso ( datosCurso ) {
        const {
            uid,
            responsable, 
            contribuyentes,
            equipo, 
            fotoPerfil,
            titulo,  
            referenciaURL, 
            descripcion,
            requisitos,
            objetivos,
            nivel,
            seccion,
            categorias,
            datosPrecio,
            duracion,
            idioma,
            subTitulos,
        } = datosCurso

        this.setUID( uid )
        this.setResponsable( responsable )
        this.setContribuyentes(contribuyentes)
        this.setEquipo(equipo)
        this.setFotoPerfil( fotoPerfil )
        this.setTitulo( titulo )
        this.setReferenciaURL( referenciaURL )
        this.setDescripcion( descripcion )
        this.setRequisitos( requisitos )
        this.setObjetivos( objetivos )
        this.setNivel( nivel )
        this.setSeccion( seccion )
        this.setCategorias( categorias )
        this.setDatosPrecio( datosPrecio )
        this.setDuracion( duracion )
        this.setIdioma( idioma )
        this.setSubTitulos( subTitulos )
    }

    setUID ( uid = db.collection(COLECCION_CURSOS).doc().id ) {
        this.uid = uid
    }

    setResponsable ( responsable = '' ) {
        this.responsable = responsable
    }

    setContribuyentes ( contribuyentes = [] ) {
        this.contribuyentes = contribuyentes
    }

    setEquipo ( equipo = '' ) {
        this.equipo = equipo
    }

    setFotoPerfil ( fotoPerfil = '' ) {
        this.fotoPerfil = fotoPerfil
    }

    setTitulo ( titulo = '' ) {
        this.titulo = titulo
    }

    setReferenciaURL ( referenciaURL = '' ) {
        this.referenciaURL = referenciaURL
    }

    setDescripcion ( descripcion = '' ) {
        this.descripcion = descripcion
    }

    setRequisitos ( requisitos = [] ) {
        this.requisitos = requisitos
    }

    setObjetivos ( objetivos = [] ) {
        this.objetivos = objetivos
    }

    setNivel ( nivel = 'basico' ) {
        this.nivel = nivel
    }

    setSeccion ( seccion = '' ) {
        this.seccion = seccion
    }

    setCategorias ( categorias = [] ) {
        this.categorias = categorias
    }

    setDatosPrecio ( datosPrecio = new DatosPrecio_Curso() ) {
        if (datosPrecio instanceof DatosPrecio_Curso) {
            this.datosPrecio = datosPrecio
            return
        }

        this.datosPrecio = new DatosPrecio_Curso(datosPrecio)
    }

    setDuracion ( duracion = 0 ) {
        this.duracion = duracion
    }

    setIdioma ( idioma = 'español' ) {
        this.idioma = idioma
    }

    setSubTitulos ( subTitulos = [] ) {
        this.subTitulos = subTitulos
    }





    /* 
     *   ###############################
     *         METODOS ESTATICOS
     *   ###############################
    */

    
}

module.exports = Curso