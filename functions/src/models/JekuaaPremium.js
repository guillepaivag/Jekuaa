const admin = require('../../firebase-service')

class JekuaaPremium {

    constructor ( datosPremium ) {
        
        if ( !datosPremium ) {
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


        this.plan = plan
        this.fechaCompra = fechaCompra
        this.fechaHasta = fechaHasta
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

    getDatosPremiumConTimestamp () {
        return {
            plan: this.getPlan(),
            fechaCompra: this.getFechaCompra() ? admin.firestore.Timestamp.fromDate( this.getFechaCompra() ) : null,
            fechaHasta: this.getFechaHasta() ? admin.firestore.Timestamp.fromDate( this.getFechaHasta() ) : null,
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
        if ( !jekuaaPremium ) {
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
    
        let planAux = plan ? plan : ''
        let fechaCompraAux = fechaCompra ? fechaCompra : null
        let fechaHastaAux = fechaHasta ? fechaHasta : null

        this.setPlan( planAux )
        this.setFechaCompra( fechaCompraAux )
        this.setFechaHasta( fechaHastaAux )
    }

    setDatosPremiumConTimestamp ( jekuaaPremiumConTimestamp ) {
        if ( !jekuaaPremiumConTimestamp ) {
            this.plan = ''
            this.fechaCompra = null
            this.fechaHasta = null

            return
        }

        const {
            plan,
            fechaCompra,
            fechaHasta,
        } = jekuaaPremiumConTimestamp

        let planAux = plan ? plan : ''
        let fechaCompraAux = fechaCompra ? new Date ( fechaCompra.seconds * 1000 ) : null
        let fechaHastaAux = fechaHasta ? new Date ( fechaHasta.seconds * 1000 ) : null

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
        



        /* 
            ###############################
                   METODOS ESTATICOS
            ###############################
        */




}

module.exports = JekuaaPremium