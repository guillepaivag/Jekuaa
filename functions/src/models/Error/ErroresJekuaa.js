const informacionCodigo = require('../InformacionCodigo')

class ErrorJekuaa {
    
    constructor ( informacionError ) {
        
        if ( !informacionError || ( informacionError && !informacionError.codigo ) ) {
            
            this.codigo = 'jekuaa/error/sistema'
            this.mensaje = mensaje ? mensaje : ErrorJekuaa.getInformacionPorCodigo( this.codigo ).mensaje
            this.resultado = null
            this.status = ErrorJekuaa.getInformacionPorCodigo( this.codigo ).status

            return
        }

        const {
            codigo, mensaje, resultado
        } = informacionError

        super( mensaje ? mensaje : ErrorJekuaa.getInformacionPorCodigo( codigo ).mensaje )
        
        this.codigo = codigo
        this.mensaje = mensaje ? mensaje : ErrorJekuaa.getInformacionPorCodigo( codigo ).mensaje
        this.resultado = resultado ? resultado : null
        this.status = ErrorJekuaa.getInformacionPorCodigo( codigo ).status
        
    }

    /* 
        SETTERS
    */




    
    /* 
        GETTERS
    */





    /* 
        ACCIONES
    */
    getInformacionPorCodigo ( codigo ) {
        
        let rutasCodigo = codigo.split('/')

        let informacionCodigo = informacionCodigos [ rutasCodigo[0] ] [ rutasCodigo[1] ]

        if ( rutasCodigo[1] != 'error' ) {
            throw new Error('Debe de ser de tipo error.')
        }

        return informacionCodigo [ rutasCodigo[2] ]
    
    }




}

module.exports = ErrorJekuaa