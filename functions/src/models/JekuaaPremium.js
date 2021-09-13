const admin = require('../../firebase-service')

class JekuaaPremium {

    constructor ( datosPremium ) {
        
        if ( !datosPremium || ( datosPremium && !datosPremium.plan ) ) {
            this.plan = ''
            this.fechaCompra = null
            this.fechaHasta = null

            return
        }
        
        const {
            plan,
            fechaCompra,
            fechaHasta,
        } = datosPremium

        if ( ( fechaCompra && !fechaHasta ) || ( !fechaCompra && fechaHasta ) ) {
            throw new Error('El jekuaa premium no tiene un formato valido')
        }

        this.plan = plan                // String
        this.fechaCompra = fechaCompra  // Timestamp
        this.fechaHasta = fechaHasta    // Timestamp
    }
    



    /* 
        GETTERS: Se obtienen los datos de los atributos
    */

    getDatosPremium () {
        return {
            plan: this.getPlan(),
            fechaCompra: this.getFechaCompra(),
            fechaHasta: this.getFechaHasta(),
        }
    }

    getPlan () {
        return this.plan
    }

    getFechaCompra () {
        return this.fechaCompra
    }

    getFechaHasta () {
        return this.fechaHasta
    }



    /* 
        SETTERS: Se agregan los datos que se desee a los atributos
    */

    setDatosPremium ( jekuaaPremium ) {
        if ( !jekuaaPremium || ( jekuaaPremium && !jekuaaPremium.plan ) ) {
            this.plan = ''
            this.fechaCompra = null
            this.fechaHasta = null

            return
        }

        const {
            plan,
            fechaCompra,
            fechaHasta,
        } = jekuaaPremium

        if ( ( fechaCompra && !fechaHasta ) || ( !fechaCompra && fechaHasta ) ) {
            throw new Error('El jekuaa premium no tiene un formato valido')
        }
    
        let planAux = plan
        let fechaCompraAux = fechaCompra
        let fechaHastaAux = fechaHasta

        this.setPlan( planAux )
        this.setFechaCompra( fechaCompraAux )
        this.setFechaHasta( fechaHastaAux )
    }

    setPlan ( plan ) {
        if ( !plan ) {
            this.plan = ''
            return 
        }

        this.plan = plan
    }

    setFechaCompra ( fechaCompra ) {
        if ( !fechaCompra ) {
            this.fechaCompra = null
            return 
        }

        this.fechaCompra = fechaCompra
    }

    setFechaHasta ( fechaHasta ) {
        if ( !fechaHasta ) {
            this.fechaHasta = null
            return 
        }

        this.fechaHasta = fechaHasta
    }




    /* 
        ACCIONES: Se trabajara con la base de datos
    */


        /* 
            ###############################
                 METODOS NO ESTATICOS
            ###############################
        */

    formatoValido () {

        if ( typeof this.plan != 'string' ) {
            throw new TypeError('El plan de jekuaaPremium debe ser de tipo string.', 'JekuaaPremium.js')
        }

        if ( typeof this.fechaCompra != 'object' ) {
            throw new TypeError('La fechaCompra de jekuaaPremium debe ser de tipo object.', 'JekuaaPremium.js')
        }

        if ( typeof this.fechaHasta != 'object' ) {
            throw new TypeError('La fechaHasta de jekuaaPremium debe ser de tipo object.', 'JekuaaPremium.js')
        }

        return true
    }
        

    cumpleCondiciones () {
        if ( this.plan === '' ) {
            if ( this.fechaCompra != null || this.fechaHasta != null ) {
                throw new TypeError('Una de las fechas tienen valores pero no hay ningún plan.', 'JekuaaPremium.js')
            }

            return true
        }

        if ( this.fechaCompra == null || this.fechaHasta == null ) {
            throw new TypeError('Existe un plan pero las fechas de compra y fecha hasta no tienen valores.', 'JekuaaPremium.js')
        }

        if ( this.fechaCompra.seconds >= this.fechaHasta.seconds ) {
            throw new TypeError('La fecha de compra es mayor o igual a la fecha hasta.', 'JekuaaPremium.js')
        }

        return true
    }


        /* 
            ###############################
                   METODOS ESTATICOS
            ###############################
        */


    static tienePlan ( plan ) {
        return plan != ''
    }

}

module.exports = JekuaaPremium