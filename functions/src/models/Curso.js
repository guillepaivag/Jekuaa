const admin = require('../../firebase-service')
const db = require('../../db')
const DatosHabilitado_Curso = require('./ComponentesCursos/helpers/DatosHabilitado_Curso')
const DatosPrecio_Curso = require('./ComponentesCursos/helpers/DatosPrecio_Curso')
const Unidad = require('./ComponentesCursos/Unidad')
const Clase = require('./ComponentesCursos/Clase')

const COLECCION_CURSOS = 'Cursos'

class Curso {

    constructor ( datosCurso = {} ) {
       
        const {
            uid,// r
            uidInstructor,// r
            datosHabilitado,
            titulo,
            referencia,
            descripcion,
            requisitos,
            objetivos,
            nivel,
            seccion,// r
            categoria,// r
            subCategorias,// r
            datosPrecio,
            cantidadEstudiantes,// r
            cantidadMeGusta,// r
            duracionCurso,// r
            idioma,
            subTitulos,
            certificado,// r
            fechaCreacion,
            fechaActualizacion,
        } = datosCurso

        this.uid = uid ? uid : db.collection(COLECCION_CURSOS).doc().id
        this.uidInstructor = uidInstructor ? uidInstructor : ''
        this.datosHabilitado = datosHabilitado ? datosHabilitado : new DatosHabilitado_Curso()
        this.titulo = titulo ? titulo : ''
        this.referencia = referencia ? referencia : ''
        this.descripcion = descripcion ? descripcion : ''
        this.requisitos = requisitos ? requisitos : []
        this.objetivos = objetivos ? objetivos : []
        this.nivel = nivel ? nivel : 'basico'
        this.seccion = seccion ? seccion : ''
        this.categoria = categoria ? categoria : ''
        this.subCategorias = subCategorias ? subCategorias : []
        this.datosPrecio = datosPrecio ? datosPrecio : new DatosPrecio_Curso()
        this.cantidadEstudiantes = cantidadEstudiantes ? cantidadEstudiantes : 0
        this.cantidadMeGusta = cantidadMeGusta ? cantidadMeGusta : 0
        this.duracionCurso = duracionCurso ? duracionCurso : 0
        this.idioma = idioma ? idioma : 'español'
        this.subTitulos = subTitulos ? subTitulos : []
        this.certificado = certificado !== undefined ? certificado : false
        this.fechaCreacion = fechaCreacion ? fechaCreacion : null
        this.fechaActualizacion = fechaActualizacion ? fechaActualizacion : null
    }

    /* 
        GETTERS: Se obtienen los datos de los atributos
    */

    getCurso ( getJSON = false ) {
        if ( getJSON ) {
            return JSON.parse( JSON.stringify( this ) )
        }

        return this
    }


    
    /* 
        SETTERS: Se agregan los datos que se desee a los atributos
    */

    setDatosCurso ( datosCurso ) {
        const {
            uid,
            uidInstructor,
            datosHabilitado,
            titulo,
            referencia,
            descripcion,
            requisitos,
            objetivos,
            nivel,
            seccion,
            categoria,
            subCategorias,
            datosPrecio,
            cantidadEstudiantes,
            cantidadMeGusta,
            duracionCurso,
            idioma,
            subTitulos,
            certificado,
            fechaCreacion,
            fechaActualizacion,
        } = datosCurso

        this.setUID( uid )
        this.setUIDInstructor( uidInstructor )
        this.setDatosHabilitado( datosHabilitado )
        this.setTitulo( titulo )
        this.setReferencia( referencia )
        this.setDescripcion( descripcion )
        this.setRequisitos( requisitos )
        this.setObjetivos( objetivos )
        this.setNivel( nivel )
        this.setSeccion( seccion )
        this.setCategoria( categoria )
        this.setSubCategorias( subCategorias )
        this.setDatosPrecio( datosPrecio )
        this.setCantidadEstudiante( cantidadEstudiantes )
        this.setCantidadMeGusta ( cantidadMeGusta )
        this.setDuracionCurso( duracionCurso )
        this.setIdioma( idioma )
        this.setSubTitulos( subTitulos )
        this.setCertificado( certificado )
        this.setFechaCreacion( fechaCreacion )
        this.setFechaActualizacion( fechaActualizacion )
    }

    setUID ( uid = db.collection(COLECCION_CURSOS).doc().id ) {
        this.uid = uid
    }

    setUIDInstructor ( uidInstructor = '' ) {
        this.uidInstructor = uidInstructor
    }

    setDatosHabilitado ( datosHabilitado = new DatosHabilitado_Curso() ) {
        if (datosHabilitado instanceof DatosHabilitado_Curso) {
            this.datosHabilitado = datosHabilitado
            return
        }

        this.datosHabilitado = new DatosHabilitado_Curso(datosHabilitado)
    }

    setTitulo ( titulo = '' ) {
        this.titulo = titulo
    }

    setReferencia ( referencia = '' ) {
        this.referencia = referencia
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

    setCategoria ( categoria = '' ) {
        this.categoria = categoria
    }

    setSubCategorias ( subCategorias = [] ) {
        this.subCategorias = subCategorias
    }

    setDatosPrecio ( datosPrecio = new DatosPrecio_Curso() ) {
        if (datosPrecio instanceof DatosPrecio_Curso) {
            this.datosPrecio = datosPrecio
            return
        }

        this.datosPrecio = new DatosPrecio_Curso(datosPrecio)
    }

    setCantidadEstudiante ( cantidadEstudiantes = 0 ) {
        this.cantidadEstudiantes = cantidadEstudiantes
    }

    setCantidadMeGusta ( cantidadMeGusta = 0 ) {
        this.cantidadMeGusta = cantidadMeGusta
    }

    setDuracionCurso ( duracionCurso = 0 ) {
        this.duracionCurso = duracionCurso
    }

    setIdioma ( idioma = 'español' ) {
        this.idioma = idioma
    }

    setSubTitulos ( subTitulos = [] ) {
        this.subTitulos = subTitulos
    }

    setCertificado ( certificado = false ) {
        this.certificado = certificado
    }

    setFechaCreacion ( fechaCreacion = null ) {
        this.fechaCreacion = fechaCreacion
    }

    setFechaActualizacion ( fechaActualizacion = null ) {
        this.fechaActualizacion = fechaActualizacion
    }


    

    /* 
        ACCIONES: Se trabajara con la base de datos
    */

        /* 
            ###############################
                 METODOS NO ESTATICOS
            ###############################
        */

    async importarDatosDeUnCurso ( uidCurso ) {
        
        const refCurso = db.collection(COLECCION_CURSOS).doc(uidCurso)
        const docCurso = await refCurso.get()
        const datosCurso = docCurso.data()

        this.setDatosCurso ( datosCurso )

        return this
    }


    // CRUD Curso
    async agregarCurso (  ) {
        const datosCurso = this.getCurso ( true )
        await db.collection(COLECCION_CURSOS).add(datosCurso)
        return this
    }

    async actualizarCurso ( datosActualizados ) {
        await db.collection(COLECCION_CURSOS).doc(this.uid).update(datosActualizados)
        return this
    }

    async eliminarCurso (  ) {
        await db.collection(COLECCION_CURSOS).doc(this.uid).delete()
        return this
    }


    // CRUD Unidades
    async agregarUnidad ( datosUnidad ) {
        const unidad = new Unidad( datosUnidad )
        
        await unidad.agregar(this.uid)

        return this
    }

    async obtenerUnidades (  ) {
        return await Unidad.obtenerUnidades(this.uid)
    }

    async actualizarUnidad ( uidUnidad, datosActualizados ) {
        const unidad = new Unidad()
        unidad.setUid(uidUnidad)

        await unidad.actualizar(this.uid, datosActualizados)

        return this
    }

    async eliminarUnidad ( uidUnidad ) {
        const unidad = new Unidad()
        unidad.setUid(uidUnidad)

        await unidad.eliminar(this.uid)

        return this
    }


    // CRUD Clases
    async agregarClase ( datosClase ) {
        const clase = new Clase( datosClase )
        
        await clase.agregar(this.uid)

        return this
    }

    async obtenerClases ( ) {
        return await Clase.obtenerClases(this.uid)
    }

    async actualizarClase ( uidClase, datosActualizados ) {
        const clase = new Clase()
        clase.setUid(uidClase)

        await clase.actualizar(this.uid, datosActualizados)

        return this
    }

    async eliminarClase ( uidClase ) {
        const clase = new Clase()
        clase.setUid(uidClase)

        await clase.eliminar(this.uid)

        return this
    }


    // 
    asignarCursoAUsuario ( uidUsuario ) {
        
    }

        /* 
            ###############################
                   METODOS ESTATICOS
            ###############################
        */

    
}

module.exports = Curso