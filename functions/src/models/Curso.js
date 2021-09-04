const admin = require('../../firebase-service')
const db = require('../../db')

const COLECCION_CURSOS = 'Cursos'

class Curso {

    constructor ( datosCurso = {}, 
                datosUnidades = [], 
                datosClases = [] ) 
    {
       
        const {
            uid,
            uidInstructor,
            estado,
            fechaHabilitado,
            cantidadEstudiantes,
            fechaSolicitud,
            fechaUltimaActualizacion,
            duracionCurso,
            idioma,
            subTitulos,
            nivel,
            certificado,
            descripcion,
            costo,
            requisitos,
            objetivos,
            nombre,
            seccion,
            subseccion
        } = datosCurso

        this.uid = uid
        this.uidInstructor = uidInstructor
        this.estado = estado
        this.fechaHabilitado = fechaHabilitado
        this.cantidadEstudiantes = cantidadEstudiantes
        this.fechaSolicitud = fechaSolicitud
        this.fechaUltimaActualizacion = fechaUltimaActualizacion
        this.duracionCurso = duracionCurso
        this.idioma = idioma
        this.subTitulos = subTitulos
        this.nivel = nivel
        this.certificado = certificado
        this.descripcion = descripcion
        this.costo = costo
        this.requisitos = requisitos
        this.objetivos = objetivos
        this.nombre = nombre
        this.seccion = seccion
        this.subseccion = subseccion

        this.datosUnidades = datosUnidades
        this.datosClases = datosClases
    }

    /* 
        GETTERS: Se obtienen los datos de los atributos
    */




    
    /* 
        SETTERS: Se agregan los datos que se desee a los atributos
    */

    setDatosCurso ( datosCurso, datosUnidades = [], datosClases = [] ) {
        const {
            uid,
            uidInstructor,
            estado,
            fechaHabilitado,
            cantidadEstudiantes,
            fechaSolicitud,
            fechaUltimaActualizacion,
            duracionCurso,
            idioma,
            subTitulos,
            nivel,
            certificado,
            descripcion,
            costo,
            requisitos,
            objetivos,
            nombre,
            seccion,
            subseccion
        } = datosCurso

        this.setUID( uid )
        this.setUIDInstructor( uidInstructor )
        this.setEstado( estado )
        this.setFechaHabilitado( fechaHabilitado )
        this.setCantidadEstudiante( cantidadEstudiantes )
        this.setFechaSolicitud( fechaSolicitud )
        this.setFechaUltimaActualizacion( fechaUltimaActualizacion )
        this.setDuracionCurso( duracionCurso )
        this.setIdioma( idioma )
        this.setSubTitulos( subTitulos )
        this.setNivel( nivel )
        this.setCertificado( certificado )
        this.setDescripcion( descripcion )
        this.setCosto( costo )
        this.setRequisitos( requisitos )
        this.setObjetivos( objetivos )
        this.setNombre( nombre )
        this.setSeccion( seccion )
        this.setSubseccion( subseccion )

        this.setDatosUnidades( datosUnidades )
        this.setDatosClases( datosClases )
    }

    setUID ( uid ) {
        this.uid = uid
    }

    setUIDInstructor ( uidInstructor ) {
        this.uidInstructor = uidInstructor
    }

    setEstado ( estado ) {
        this.estado = estado
    }

    setFechaHabilitado ( fechaHabilitado ) {
        this.fechaHabilitado = fechaHabilitado
    } 

    setCantidadEstudiante ( cantidadEstudiantes ) {
        this.cantidadEstudiantes = cantidadEstudiantes
    }

    setFechaSolicitud ( fechaSolicitud ) {
        this.fechaSolicitud = fechaSolicitud
    }

    setFechaUltimaActualizacion ( fechaUltimaActualizacion ) {
        this.fechaUltimaActualizacion = fechaUltimaActualizacion
    }

    setDuracionCurso ( duracionCurso ) {
        this.duracionCurso = duracionCurso
    }

    setIdioma ( idioma ) {
        this.idioma = idioma
    }

    setSubTitulos ( subTitulos ) {
        this.subTitulos = subTitulos
    }

    setNivel ( nivel ) {
        this.nivel = nivel
    }

    setCertificado ( certificado ) {
        this.certificado = certificado
    }

    setDescripcion ( descripcion ) {
        this.descripcion = descripcion
    }

    setCosto ( costo ) {
        this.costo = costo
    }

    setRequisitos ( requisitos ) {
        this.requisitos = requisitos
    }

    setObjetivos ( objetivos ) {
        this.objetivos = objetivos
    }

    setNombre ( nombre ) {
        this.nombre = nombre
    }

    setSeccion ( seccion ) {
        this.seccion = seccion
    }

    setSubseccion ( subseccion ) {
        this.subseccion = subseccion
    }

    setDatosUnidades ( datosUnidades ) {
        this.datosUnidades = datosUnidades
    }

    setDatosClases ( datosClases ) {
        this.datosClases = datosClases
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

        const datosCurso = (await refCurso.get()).data()

        const datosUnidades

        const datosClases

        this.setDatosCurso(datosCurso, datosUnidades, datosClases)

        return true
    }
    

    async habilitarCurso ( habilitar ) {
        
    }


    // CRUD Curso
    async crearCurso (  ) {

        const datosCurso = {
            uid: '',
            uidInstructor: this.uidInstructor,
            estado: this.estado,
            fechaHabilitado: this.fechaHabilitado,
            cantidadEstudiantes: this.cantidadEstudiantes,
            fechaSolicitud: this.fechaSolicitud,
            fechaUltimaActualizacion: this.fechaUltimaActualizacion,
            duracionCurso: this.duracionCurso,
            idioma: this.idioma,
            subTitulos: this.subTitulos,
            nivel: this.nivel,
            certificado: this.certificado,
            descripcion: this.descripcion,
            costo: this.costo,
            requisitos: this.requisitos,
            objetivos: this.objetivos,
            nombre: this.nombre,
            seccion: this.seccion,
            subseccion: this.subseccion
        }

        this.uid = (await db.collection(COLECCION_CURSOS).add(datosCurso)).id

        await db.collection(COLECCION_CURSOS).doc(this.uid).update({
            uid: this.uid
        })

        datosCurso.uid = this.uid

        const curso = new Curso(datosCurso)

        return curso

    }

    verCurso (  ) {
        return this
    }

    async actualizarCurso (  ) {
        const datosCurso = {
            uid: this.uid,
            uidInstructor: this.uidInstructor,
            estado: this.estado,
            fechaHabilitado: this.fechaHabilitado,
            cantidadEstudiantes: this.cantidadEstudiantes,
            fechaSolicitud: this.fechaSolicitud,
            fechaUltimaActualizacion: this.fechaUltimaActualizacion,
            duracionCurso: this.duracionCurso,
            idioma: this.idioma,
            subTitulos: this.subTitulos,
            nivel: this.nivel,
            certificado: this.certificado,
            descripcion: this.descripcion,
            costo: this.costo,
            requisitos: this.requisitos,
            objetivos: this.objetivos,
            nombre: this.nombre,
            seccion: this.seccion,
            subseccion: this.subseccion
        }

        await db.collection(COLECCION_CURSOS).doc(this.uid).update(datosCurso)

        return true
    }

    async eliminarCurso (  ) {
        await db.collection(COLECCION_CURSOS).doc(this.uid).delete()

        return true
    }


    // CRUD Unidades
    agregarUnidad ( datosUnidad ) {

    }

    verUnidades ( uidCurso ) {

    }

    editarUnidad ( uidCurso, unidad, datosUnidad ) {

    }

    eliminarUnidad ( uidCurso, unidad ) {

    }


    // CRUD Clases
    agregarClase ( unidad, datosClase ) {

    }

    verClases ( uidCurso, unidad ) {

    }

    editarClase ( uidCurso, unidad, uidClase, datosClase ) {

    }

    eliminarClase ( uidCurso, unidad, uidClase ) {

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