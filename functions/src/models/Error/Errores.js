const informacionCodigo = require('../../InformacionEstatica/InformacionCodigo')

class Errores {
    
    constructor ( datos = {} ) {
        const {
            codigo, 
            mensaje, 
            resultado, 
            status
        } = datos

        const informacionPorCodigo = getInformacionPorCodigo( codigo )

        this.codigo = codigo
        this.mensaje = mensaje ? mensaje : informacionPorCodigo.mensaje
        this.resultado = resultado ? resultado : null
        this.status = status ? status : informacionPorCodigo.status
        
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