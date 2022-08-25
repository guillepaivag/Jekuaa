const admin = require('../../../../firebase-service')
const db = require('../../../../db')
const DatosPrecio_Curso = require('../helpers/DatosPrecio_Curso')

class Curso {

    constructor ( datosCurso = {} ) {
       
        const {
            uid,
            responsable,
            equipo,
            instructor,
            contribuyentes, 
            fotoPerfil,
            fotoPortada,
            titulo,
            codigo,
            cantidadUnidades,
            cantidadClases,
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
            auxiliares,
        } = datosCurso

        this.uid = uid ? uid : db.collection('CursosPublicado').doc().id
        this.responsable = responsable ? responsable : ''
        this.equipo = equipo ? equipo : ''
        this.instructor = instructor ? instructor : ''
        this.contribuyentes = contribuyentes ? contribuyentes : []
        this.fotoPerfil = fotoPerfil ? fotoPerfil : ''
        this.fotoPortada =  fotoPortada ? fotoPortada : ''
        this.titulo = titulo ? titulo : ''
        this.codigo = codigo ? codigo : ''
        this.cantidadUnidades = cantidadUnidades ? cantidadUnidades : 0
        this.cantidadClases = cantidadClases ? cantidadClases : 0
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
        this.auxiliares = auxiliares ? auxiliares : []
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
            instructor: this.instructor,
            fotoPerfil: this.fotoPerfil,
            fotoPortada: this.fotoPortada,
            titulo: this.titulo,
            codigo: this.codigo,
            cantidadUnidades: this.cantidadUnidades,
            cantidadClases: this.cantidadClases,
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
            auxiliares: this.auxiliares,
        }
    }

    setCurso ( datosCurso ) {
        const {
            uid,
            responsable,
            equipo,
            instructor,
            contribuyentes, 
            fotoPerfil,
            fotoPortada,
            titulo,
            codigo,
            cantidadUnidades,
            cantidadClases,
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
            auxiliares,
        } = datosCurso

        this.setUID( uid )
        this.setResponsable( responsable )
        this.setEquipo(equipo)
        this.setInstructor(instructor)
        this.setContribuyentes(contribuyentes)
        this.setFotoPerfil( fotoPerfil )
        this.setFotoPortada( fotoPortada )
        this.setTitulo( titulo )
        this.setCodigo( codigo )
        this.setCantidadUnidades( cantidadUnidades )
        this.setCantidadClases( cantidadClases )
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
        this.setAuxiliares(auxiliares)
    }

    setUID ( uid = db.collection(COLECCION_CURSOS).doc().id ) {
        this.uid = uid
    }

    setResponsable ( responsable = '' ) {
        this.responsable = responsable
    }
    
    setEquipo ( equipo = '' ) {
        this.equipo = equipo
    }
    
    setInstructor( instructor = '' ) {
        this.instructor = instructor
    }
    
    setContribuyentes ( contribuyentes = [] ) {
        this.contribuyentes = contribuyentes
    }
    
    setFotoPerfil ( fotoPerfil = '' ) {
        this.fotoPerfil = fotoPerfil
    }

    setFotoPortada ( fotoPortada = '' ) {
        this.fotoPortada = fotoPortada
    }

    setTitulo ( titulo = '' ) {
        this.titulo = titulo
    }

    setCodigo ( codigo = '' ) {
        this.codigo = codigo
    }
    
    setCantidadUnidades ( cantidadUnidades = 0 ) {
        this.cantidadUnidades = cantidadUnidades
    }
    
    setCantidadClases ( cantidadClases = 0 ) {
        this.cantidadClases = cantidadClases
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

    setAuxiliares ( auxiliares = [] ) {
        this.auxiliares = auxiliares
    }

}

module.exports = Curso