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
            return false
        }

        if ( typeof this.fechaCompra != 'object' ) {
            return false
        }

        if ( typeof this.fechaHasta != 'object' ) {
            return false
        }

        return true
    }
        

    cumpleCondiciones () {
        if ( this.plan === '' ) {
            if ( this.fechaCompra != null || this.fechaHasta != null ) {
                return false
            }

            return true
        }

        if ( this.fechaCompra == null || this.fechaHasta == null ) {
            return false
        }

        if ( this.fechaCompra.seconds >= this.fechaHasta.seconds ) {
            return false
        }

        return true
    }


        /* 
            ###############################
                   METODOS ESTATICOS
            ###############################
        */




}

module.exports = JekuaaPremium