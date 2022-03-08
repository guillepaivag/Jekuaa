const informacionCodigo = require('../../InformacionEstatica/InformacionCodigo')

class Errores {
    
    constructor ( informacionError ) {
        
        if ( !informacionError || ( informacionError && !informacionError.codigo ) ) {
            
            this.codigo = 'error/sistema'
            this.mensaje = mensaje ? mensaje : getInformacionPorCodigo( this.codigo ).mensaje
            this.resultado = null
            this.status = getInformacionPorCodigo( this.codigo ).status

            return
        }

        const {
            codigo, mensaje, resultado, status
        } = informacionError

        let mensajePorDefecto = getInformacionPorCodigo( codigo ).mensaje
        let statusPorDefecto = getInformacionPorCodigo( codigo ).status
        
        this.codigo = codigo
        this.mensaje = mensaje ? mensaje : mensajePorDefecto
        this.resultado = resultado ? resultado : null
        this.status = status ? status : statusPorDefecto
        
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

        let informacion = informacionCodigo [ rutasCodigo[0] ] [ rutasCodigo[1] ]

        if ( rutasCodigo[0] != 'error' ) {
            throw new Error('Debe de ser de tipo error.')
        }

        return informacion 
    
    }




}

function getInformacionPorCodigo ( codigo ) {
        
    let rutasCodigo = codigo.split('/')

    let informacion = informacionCodigo [ rutasCodigo[0] ] [ rutasCodigo[1] ]

    if ( rutasCodigo[0] !== 'error' ) {
        throw new Error('Debe de ser de tipo error.')
    }

    return informacion 

}

module.exports = Errores