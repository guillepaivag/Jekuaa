const ContenidoClase = require("../ContenidoClase")

class ContenidoYoutube extends ContenidoClase {
    constructor (data = {}) {
        const {
            duracion,
            codigoVideoYoutube,
            fechaSubida,
        } = data

        super({...data, tipoContenido: 'video-youtube'})
        this.duracion = duracion ? duracion : 0
        this.codigoVideoYoutube = codigoVideoYoutube ? codigoVideoYoutube : ''
        this.fechaSubida = fechaSubida ? fechaSubida : null
    }

    getContenidoYoutube () {
        return {
            ...super.getContenidoClase(),
            duracion: this.duracion,
            codigoVideoYoutube: this.codigoVideoYoutube,
            fechaSubida: this.fechaSubida,
        }
    }

    setContenidoYoutube (data = {}) {
        this.setContenidoClase( {...data, tipoContenido: 'video-youtube'} )
        this.setDuracion( data.duracion )
        this.setCodigoVideoYoutube( data.codigoVideoYoutube )
        this.setFechaSubida( data.fechaSubida )
    }

    setContenidoClase (contenidoClase = new ContenidoClase()) {
        super.setContenidoClase(contenidoClase)
    }

    setDuracion ( duracion = 0 ) {
        this.duracion = duracion
    } 
    
    setCodigoVideoYoutube ( codigoVideoYoutube = '' ) {
        this.codigoVideoYoutube = codigoVideoYoutube
    } 

    setFechaSubida ( fechaSubida = null ) {
        this.fechaSubida = fechaSubida
    }   
    
}

module.exports = ContenidoYoutube