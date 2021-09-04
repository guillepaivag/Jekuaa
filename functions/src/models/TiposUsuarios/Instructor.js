class Instructor {
    
    
    constructor ( datosInstructor ) {
        const { 
            uid, fechaComienzoInstructor, cantidadCursos, 
            cantidadEstudiantes, links, informacionInstructor,
            especializacionesIntereses, datosMiembro
        } = datosInstructor

        super( datosMiembro )

        this.uid = uid
        this.fechaComienzoInstructor = fechaComienzoInstructor
        this.cantidadCursos = cantidadCursos
        this.cantidadEstudiantes = cantidadEstudiantes
        this.links = links
        this.informacionInstructor = informacionInstructor
        this.especializacionesIntereses = especializacionesIntereses
    }




    /* 
        GETTERS: Se obtienen los datos de los atributos
    */

    // Metodo
    



    /* 
        SETTERS: Se agregan los datos que se desee a los atributos
    */

    // Metodo



    
    /* 
        ACCIONES: Se trabajara con la base de datos
    */

        /* 
            ###############################
                 METODOS NO ESTATICOS
            ###############################
        */

    // Metodo



    
        /* 
            ###############################
                   METODOS ESTATICOS
            ###############################
        */
}

module.exports = Instructor