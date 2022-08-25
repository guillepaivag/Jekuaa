class Errores extends Error {
    
    constructor ( datos = {} ) {
        const { estado, mensajeCliente, mensajeServidor, resultado, } = datos

        super(mensajeServidor ? mensajeServidor : '')
        
        this.estado = estado ? estado : 500
        this.mensajeCliente = mensajeCliente ? mensajeCliente : ''
        this.mensajeServidor = mensajeServidor ? mensajeServidor : ''
        this.resultado = resultado ? resultado : null
        
    }

}

module.exports = Errores