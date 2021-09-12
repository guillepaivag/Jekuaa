const informacionCodigos = require("./InformacionCodigo")

class Respuesta {

    constructor ( respuesta ) {

        const {
            codigo, mensaje, resultado
        } = respuesta

        this.codigo = codigo
        this.mensaje = mensaje
        this.resultado = resultado

    }




    /*
        SETTERS
    */

    setRespuesta ( respuesta ) {

        const {
            codigo, mensaje, resultado
        } = respuesta

        this.setCodigo( codigo )
        this.setMensaje( mensaje )
        this.setResultado( resultado )
    }

    setCodigo ( codigo ) {
        this.codigo = codigo
    }

    setMensaje ( mensaje ) {
        this.mensaje = mensaje
    }

    setResultado ( resultado ) {
        this.resultado = resultado
    }




    /* 
        GETTERS
    */

    getRespuesta () {
        return {
            codigo: this.getCodigo(),
            mensaje: this.getMensaje(),
            resultado: this.getResultado(),
        }
    }

    getCodigo () {
        return this.codigo
    }

    getMensaje () {
        return this.mensaje
    }

    getResultado () {
        return this.resultado
    }



    
    /* 
        ACCIONES
    */

    setRespuestaPorCodigo ( codigo, datosPersonalizados ) {
        
        const {
            mensaje,
            resultado
        } = datosPersonalizados

        let rutasCodigo = codigo.split('/')

        let informacionCodigo = informacionCodigos [ rutasCodigo[0] ] [ rutasCodigo[1] ]

        if ( rutasCodigo[1] === 'error' ) {
            informacionCodigo = informacionCodigo [ rutasCodigo[2] ]
        }

        this.setRespuesta({
            codigo: informacionCodigo.codigo,
            mensaje: mensaje ? mensaje : informacionCodigo.mensaje,
            resultado: resultado ? resultado : null
        })

        return this
    }

    getInformacionPorCodigo ( codigo ) {
        let rutasCodigo = codigo.split('/')

        let informacionCodigo = informacionCodigos [ rutasCodigo[0] ] [ rutasCodigo[1] ]

        if ( rutasCodigo[1] === 'error' ) {
            informacionCodigo = informacionCodigo [ rutasCodigo[2] ]
        }

        return informacionCodigo
    }
}

module.exports = Respuesta