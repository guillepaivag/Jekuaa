class Subtitulo {
    constructor ( datos = {} ) {
        const {
            uid,
        } = datos
        
        this.uid = uid ? uid : ''
    }


    static async generarSubtituloVideoClase () {
        
    }
}

module.exports = Subtitulo