class Respuesta {

    constructor ( data = {} ) {
        const {
            estado, 
            mensaje, 
            resultado
        } = data

        this.estado = estado ? estado : 0
        this.mensaje = mensaje ? mensaje : ''
        this.resultado = resultado ? resultado : null

    }



    
    /*
        SETTERS
    */

    setRespuesta ( data = {estado, mensaje, resultado} ) {

        const {
            estado, mensaje, resultado
        } = data

        this.setEstado( estado )
        this.setMensaje( mensaje )
        this.setResultado( resultado )
    }

    setEstado ( estado = 200 ) {
        this.estado = estado
    }

    setMensaje ( mensaje = '' ) {
        this.mensaje = mensaje
    }

    setResultado ( resultado = null ) {
        this.resultado = resultado
    }




    /* 
        GETTERS
    */

    getRespuesta () {
        return {
            estado: this.getEstado(),
            mensaje: this.getMensaje(),
            resultado: this.getResultado(),
        }
    }

    getEstado () {
        return this.estado
    }

    getMensaje () {
        return this.mensaje
    }

    getResultado () {
        return this.resultado
    }
}

module.exports = Respuesta