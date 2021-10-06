const informacionCodigos = require("../InformacionEstatica/InformacionCodigo")

class Respuesta {

    constructor ( respuesta ) {

        if ( !respuesta ) {
            this.codigo = ''
            this.mensaje = ''
            this.resultado = null

            return
        }

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

    setRespuestaPorCodigo ( codigo, opciones ) {

        const mensaje = opciones && opciones.mensaje ? opciones.mensaje : undefined
        const resultado = opciones && opciones.resultado ? opciones.resultado : undefined

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

    getStatusCode () {
        let rutasCodigo = this.codigo.split('/')

        let informacionCodigo = informacionCodigos [ rutasCodigo[0] ] [ rutasCodigo[1] ]

        if ( rutasCodigo[1] === 'error' ) {
            informacionCodigo = informacionCodigo [ rutasCodigo[2] ]
        }

        return informacionCodigo.status
    }

}

module.exports = Respuesta