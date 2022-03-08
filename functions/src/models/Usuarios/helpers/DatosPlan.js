const admin = require('../../../../firebase-service')
const db = require('../../../../db')
const Errores = require('../../Error/Errores')

class DatosPlan {

    constructor ( datosPlan ) {  
        if ( !datosPlan ) {
            this.plan = 'gratis'
            this.fechaCompra = null
            this.fechaHasta = null

            return
        }
        
        const {
            plan,
            fechaCompra,
            fechaHasta,
        } = datosPlan

        this.plan = plan                // String
        this.fechaCompra = fechaCompra  // Timestamp || number
        this.fechaHasta = fechaHasta    // Timestamp || number
    }
    



    /* 
        GETTERS: Se obtienen los datos de los atributos
    */

    getDatosPlan () {
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

    setDatosPlan ( datosPlan ) {
        if ( !datosPlan || ( datosPlan && !datosPlan.plan ) ) {
            this.plan = ''
            this.fechaCompra = null
            this.fechaHasta = null

            return
        }

        const { plan, fechaCompra, fechaHasta } = datosPlan

        if ( ( fechaCompra && !fechaHasta ) || ( !fechaCompra && fechaHasta ) ) {
            throw new Error('Los datos del plan no tienen un formato valido')
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
            this.plan = 'gratis'
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

    validarTodosLosTiposDeDatos (tipo) {
        if ( !this.plan || this.fechaCompra === undefined || this.fechaHasta === undefined ) {
            throw new Errores({
                codigo: 'error/usuario_mala_solicitud',
                mensaje: 'No existen todos los datos del plan.'
            })
        }
        
        if ( typeof this.plan != 'string' ) {
            throw new TypeError('El plan debe de ser de tipo string.', 'DatosPlan.js')
        }
        
        if ( this.esPlanGratis() ) {
            if ( this.fechaCompra != null ) {
                throw new TypeError('La fechaCompra debe ser null.', 'DatosPlan.js')
            }
    
            if ( this.fechaHasta != null ) {
                throw new TypeError('La fechaHasta debe ser null.', 'DatosPlan.js')
            }
        } else {
            if (tipo === 'cliente') {
                if ( typeof this.fechaCompra != 'number' ) {
                    throw new TypeError('La fechaCompra debe ser de tipo number en milisegundos.', 'DatosPlan.js')
                }
            
                if ( typeof this.fechaHasta != 'number' ) {
                    throw new TypeError('La fechaHasta debe ser de tipo number en milisegundos.', 'DatosPlan.js')
                }
            } else {
                if ( typeof this.fechaCompra != 'object' ) {
                    throw new TypeError('La fechaCompra debe ser de tipo object.', 'DatosPlan.js')
                }
        
                if ( typeof this.fechaHasta != 'object' ) {
                    throw new TypeError('La fechaHasta debe ser de tipo object.', 'DatosPlan.js')
                }
            }
        }
    }
        
    async validarDatosCliente () {
        const documentoPlan = await this.obtenerDocumentoPlan()
        const existePlan = this.existePlan(documentoPlan)
        if (!existePlan) {
            throw new Errores({
                codigo: 'error/usuario_mala_solicitud',
                mensaje: 'Este plan no existe.'
            })
        }

        if ( !this.esPlanGratis() ) {
            if (!this.fechaCompra || !this.fechaHasta) {
                throw new Errores({
                    codigo: 'error/usuario_mala_solicitud',
                    mensaje: 'Se requiere fechaCompra y fechaHasta.'
                })
            }
            if (this.fechaCompra >= this.fechaHasta) {
                throw new Errores({
                    codigo: 'error/usuario_mala_solicitud',
                    mensaje: 'La fecha de compra debe ser antes que la fecha de vencimiento.'
                })
            }
        }
    }

    async obtenerDocumentoPlan () {
        const data = await db.collection('Planes').doc(this.plan).get()

        return data
    }

        /* 
            ###############################
                   METODOS ESTATICOS
            ###############################
        */


    static async obtenerDatosPlan ( datosPlan = new DatosPlan() ) {
        const documentoPlan = await datosPlan.obtenerDocumentoPlan()
        return documentoPlan.data()
    }

    static async existePlan ( datosPlan = new DatosPlan() ) {
        const documentoPlan = await datosPlan.obtenerDocumentoPlan()
        return documentoPlan.exists
    }

    static esPlanGratis ( datosPlan = new DatosPlan() ) {
        return datosPlan.plan === 'gratis'
    }

    static tienePlan ( datosPlan = new DatosPlan() ) {
        return datosPlan.plan != 'gratis'
    }

    static async existePlan ( datosPlan = new DatosPlan() ) {
        const planDoc = await db.collection('Planes').doc(datosPlan.plan).get()

        return planDoc.exists
    }
}

module.exports = DatosPlan