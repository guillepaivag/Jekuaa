const admin = require('../../firebase-service')
const db = require('../../db')
const JekuaaPremium = require('./JekuaaPremium')
const JekuaaRoles = require('./JekuaaRoles')

const COLECCION_USUARIO = 'Usuarios'

class Usuario {

    constructor ( datosUsuario ) {
        if ( datosUsuario ) {
            var { 
                uid, nombreUsuario, correo, 
                nombreCompleto, fechaNacimiento,
                jekuaaPremium, jekuaaRoles, jekuaaPoint
            } = datosUsuario
        }

        this.uid = uid ? uid : ''
        this.nombreUsuario = nombreUsuario ? nombreUsuario : ''
        this.correo = correo ? correo : ''
        this.nombreCompleto = nombreCompleto ? nombreCompleto : ''
        this.fechaNacimiento = fechaNacimiento ? fechaNacimiento : null
        this.jekuaaPremium = jekuaaPremium ? jekuaaPremium : new JekuaaPremium()
        this.jekuaaRoles = jekuaaRoles ? jekuaaRoles : new JekuaaRoles()
        this.jekuaaPoint = jekuaaPoint ? jekuaaPoint : 0
    }
    



    /* 
        GETTERS: Se obtienen los datos de los atributos
    */

    getUsuario () {
        return {
            uid: this.uid,
            nombreUsuario: this.nombreUsuario,
            correo: this.correo, 
            nombreCompleto: this.nombreCompleto,
            fechaNacimiento: this.fechaNacimiento,
            jekuaaPremium: this.jekuaaPremium,
            jekuaaRoles: this.jekuaaRoles,
            jekuaaPoint: this.jekuaaPoint
        }
    }

    getUID () {
        return this.uid
    }

    getNombreUsuario () {
        return this.nombreUsuario
    }

    getCorreo () {
        return this.correo
    }

    getNombreCompleto () {
        return this.nombreCompleto
    }

    getFechaNacimiento () {
        return this.fechaNacimiento
    }

    getJekuaaPremium () {
        return this.jekuaaPremium
    }

    getJekuaaRoles () {
        return this.jekuaaRoles
    }

    getJekuaaPoints () {
        return this.jekuaaPoint
    }




    /* 
        SETTERS: Se agregan los datos que se desee a los atributos
    */

    setUsuario ( datosUsuario ) {
        const { 
            uid, nombreUsuario, correo, 
            nombreCompleto, fechaNacimiento,
            jekuaaPremium, jekuaaRoles, jekuaaPoint
        } = datosUsuario

        this.setUID(uid)
        this.setNombreUsuario(nombreUsuario)
        this.setCorreo(correo)
        this.setNombreCompleto(nombreCompleto)
        this.setFechaNacimiento(fechaNacimiento)
        this.setJekuaaPremium(jekuaaPremium)
        this.setJekuaaRoles(jekuaaRoles)
        this.setJekuaaPoints(jekuaaPoint)
    }

    setUID ( uid = '' ) {
        if (uid) {
            this.uid = uid
            return
        }

        this.uid = ''
    }

    setNombreUsuario ( nombreUsuario = '' ) {
        if (nombreUsuario) {
            this.nombreUsuario = nombreUsuario
            return
        }

        this.nombreUsuario = ''
    }

    setCorreo ( correo = '' ) {
        if (correo) {
            this.correo = correo
            return
        }

        this.correo = ''
    }

    setNombreCompleto ( nombreCompleto = '' ) {
        if (nombreCompleto) {
            this.nombreCompleto = nombreCompleto
            return
        }

        this.nombreCompleto = ''
    }

    setFechaNacimiento ( fechaNacimiento = null ) {
        if (fechaNacimiento) {
            this.fechaNacimiento = fechaNacimiento
            return
        }

        this.fechaNacimiento = null
    }

    setJekuaaPremium ( jekuaaPremium = null ) {
        if (jekuaaPremium) {
            const {
                fechaCompra,
                duracion,
                plan
            } = jekuaaPremium

            this.jekuaaPremium = new JekuaaPremium(jekuaaPremium)
            return
        }

        this.jekuaaPremium = new JekuaaPremium()
    }

    setJekuaaRoles ( jekuaaRoles = null ) {
        if (jekuaaRoles) {
            const {
                rol,
                secciones,
                instructor
            } = jekuaaRoles

            this.jekuaaRoles = new JekuaaRoles(jekuaaRoles)
            return
        }

        this.jekuaaRoles = new JekuaaRoles()
    }

    setJekuaaPoints ( jekuaaPoint = 0 ) {
        if (jekuaaPoint) {
            this.jekuaaPoint = jekuaaPoint
            return
        }

        this.jekuaaPoint = 0
    }




    /* 
        ACCIONES: Se trabajara con la base de datos
    */

        /* 
            ###############################
                 METODOS NO ESTATICOS
            ###############################
        */

    async importarDatosUsuarioPorUID ( uid ) {
        
        if ( !uid ) {
            throw new Error('La uid debe existir.')
        }

        if ( typeof uid != 'string' ) {
            throw new Error('La uid debe ser un string.')
        }

        const documentoUsuario = await db.collection(COLECCION_USUARIO).doc(uid).get()

        if ( !documentoUsuario.exists ) {
            throw new Error('No existe el usuario.')
        }

        const data = documentoUsuario.data()

        const datosUsuario = JSON.parse( JSON.stringify( data ) )

        datosUsuario.fechaNacimiento = data.fechaNacimiento ? new Date( data.fechaNacimiento.seconds * 1000 ) : null

        datosUsuario.jekuaaPremium = new JekuaaPremium()
        datosUsuario.jekuaaPremium.setDatosPremiumConTimestamp( data.jekuaaPremium )

        datosUsuario.jekuaaRoles = new JekuaaRoles( {
            rol: data.jekuaaRoles.rol,
            secciones: data.jekuaaRoles.secciones,
            instructor: data.jekuaaRoles.instructor
        } )

        this.setUsuario(datosUsuario)

        return this
    }

    async obtenerDatosDeAuthentication () {
        
        if ( !this.uid ) {
            throw new Error('La uid debe existir.')
        }
        
        if ( typeof this.uid != 'string' ) {
            throw new Error('La uid debe ser string.')
        }
    
        // Recolectamos los datos de firebase authentication
        const datosUsuarioAuthentication = await admin.auth().getUser(this.uid)
    
        return datosUsuarioAuthentication
    }

    async actualizarDatosPersonales () {
        const docUsuario = await db.collection(COLECCION_USUARIO).doc(this.uid).get()

        if ( !docUsuario.exists ) {
            throw new Error(`No existe el usuario con la uid ${this.uid}.`)
        }

        if ( !this.uid ) {
            throw new Error('Para actualizar el usuario se debe tener la uid primeramente.')
        }

        if ( !this.nombreUsuario ) {
            throw new Error('Para actualizar el nombre de usuario debe existir el nombre de usuario.')
        }

        if ( !this.correo ) {
            throw new Error('Para actualizar el correo debe existir el correo.')
        }

        if ( typeof this.nombreUsuario != 'string' ) {
            throw new Error('El nombre de usuario debe ser de tipo string.')
        }

        if ( typeof this.correo != 'string' ) {
            throw new Error('El correo debe ser de tipo string.')
        }

        if ( typeof this.nombreCompleto != 'string' ) {
            throw new Error('El nombre completo debe ser de tipo string.')
        }

        if ( typeof this.fechaNacimiento != 'object' ) {
            throw new Error('La fecha de nacimiento debe ser de tipo object (Date).')
        }

        const datosUsuario = docUsuario.data()

        const datosUsuarioDBActualizar = {}
        const datosUsuarioAuthActualizar = {}

        if ( datosUsuario.nombreUsuario != this.nombreUsuario ) {
            datosUsuarioDBActualizar.nombreUsuario = this.nombreUsuario
            datosUsuarioAuthActualizar.displayName = this.nombreUsuario
        }

        if ( datosUsuario.correo != this.correo ) {
            datosUsuarioDBActualizar.correo = this.correo
            datosUsuarioAuthActualizar.email = this.correo
        }

        if ( datosUsuario.nombreCompleto != this.nombreCompleto ) {
            datosUsuarioDBActualizar.nombreCompleto = this.nombreCompleto
        }

        if ( this.fechaNacimiento ) {
            if ( !datosUsuario.fechaNacimiento ) {
                datosUsuarioDBActualizar.fechaNacimiento = admin.firestore.Timestamp.fromDate(this.fechaNacimiento)

            } else {
                if ( new Date(datosUsuario.fechaNacimiento.seconds * 1000).getTime() != this.fechaNacimiento.getTime() ) {
                    datosUsuarioDBActualizar.fechaNacimiento = admin.firestore.Timestamp.fromDate(this.fechaNacimiento)
                }
            }
        }

        await admin.auth().updateUser(this.uid, datosUsuarioAuthActualizar)
        await db.collection(COLECCION_USUARIO).doc(this.uid).update(datosUsuarioDBActualizar)

        return this
        
    }

    async obtenerCurso (uidCurso = String) {
        
    }

    async solicitarClasePorCurso (uidCurso = String, uidClase = String) {

    }

        /* 
            ###############################
                   METODOS ESTATICOS
            ###############################
        */


    /* 
        DESCRIPCION: Se crea un usuario a partir de los datos personales 
        y datos de registro como el correo, contraseña y un dato obligatorio para
        el registro como el nombre de usuario.
    */

    static async crearNuevoUsuario ( datosNuevoUsuario, contrasenha ) {

        const {
            correo,
            nombreUsuario,
            nombreCompleto,
            fechaNacimiento
        } = datosNuevoUsuario

        if ( !correo || !contrasenha || !nombreUsuario ) {
            throw new Error('Debe existir el correo, contraseña y un nombre de usuario para registrarse.')
        }

        if ( typeof nombreUsuario != 'string' ) {
            throw new Error('El nombre de usuario debe ser de tipo string.')
        }

        if ( typeof correo != 'string' ) {
            throw new Error('El correo debe ser de tipo string.')
        }

        if ( typeof contrasenha != 'string' ) {
            throw new Error('El correo debe ser de tipo string.')
        }

        if ( nombreCompleto && ( typeof nombreCompleto != 'string' ) ) {
            throw new Error('El nombre completo debe ser de tipo string.')
        }

        if ( fechaNacimiento && ( typeof fechaNacimiento != 'object' ) ) {
            throw new Error('La fecha de nacimiento debe ser de tipo object (Date).')
        }
        
        const existeNombreUsuario = !(await db.collection(COLECCION_USUARIO).where('nombreUsuario', '==', nombreUsuario).get()).empty

        if ( existeNombreUsuario ) {
            throw new Error(`Ya existe el nombre de usuario ${nombreUsuario}`)
        }

        const usuarioAuthNuevo = await admin.auth().createUser({
            email: correo,
            password: contrasenha,
            displayName: nombreUsuario,
        })

        const datosUsuario = {
            uid: usuarioAuthNuevo.uid,
            nombreUsuario: nombreUsuario,
            correo: correo,
            nombreCompleto: nombreCompleto ? nombreCompleto : '',
            fechaNacimiento: fechaNacimiento ? admin.firestore.Timestamp.fromDate(fechaNacimiento) : null,
            jekuaaPremium: new JekuaaPremium().getDatosPremiumConTimestamp(),
            jekuaaRoles: new JekuaaRoles().getDatosRoles(),
            jekuaaPoint: 0
        }
        
        const informacionDeDatosUsuario = {
            rol: 'estudiante',
            jekuaaPremium: false
        }

        await admin.firestore().collection(COLECCION_USUARIO).doc(usuarioAuthNuevo.uid).set(datosUsuario)
        await admin.auth().setCustomUserClaims(usuarioAuthNuevo.uid, informacionDeDatosUsuario)

        return usuarioAuthNuevo.uid

    }

    static construirDatosParaActualizar ( datosNuevos, datosViejos ) {
        /* 
            IMPORTANTE: FECHAS FORMATO STRING
        */
        
        const {
            nombreUsuario,
            correo,
            nombreCompleto,
            fechaNacimiento,
            jekuaaPremium,
            jekuaaRoles,
            jekuaaPoint
        } = datosNuevos
    
        const datosUsuarioDBActualizar = {}
        const datosUsuarioAuthActualizar = {}
        const datosUsuarioAuthClaimsActualizar = {}
    
        const cambioNombreUsuario = nombreUsuario != datosViejos.nombreUsuario
        if ( nombreUsuario && cambioNombreUsuario ) {
            datosUsuarioDBActualizar.nombreUsuario = nombreUsuario
            datosUsuarioAuthActualizar.displayName = nombreUsuario
        }
    
        const cambioCorreo = correo != datosViejos.correo
        if ( correo && cambioCorreo ) {
            datosUsuarioDBActualizar.correo = correo
            datosUsuarioAuthActualizar.email = correo
        }
    
        const cambioNombreCompleto = nombreCompleto != datosViejos.nombreCompleto
        if ( nombreCompleto && cambioNombreCompleto ) {
            datosUsuarioDBActualizar.nombreCompleto = nombreCompleto
        }
    
        if ( fechaNacimiento ) {
            datosUsuarioDBActualizar.fechaNacimiento = admin.firestore.Timestamp.fromDate( new Date ( fechaNacimiento ) )
        }
    
        if ( jekuaaPremium ) {
            
            datosUsuarioDBActualizar.jekuaaPremium = new JekuaaPremium().getDatosPremiumConTimestamp()

            // PLAN
            if ( jekuaaPremium.plan ) {
                datosUsuarioAuthClaimsActualizar.jekuaaPremium = true
                datosUsuarioDBActualizar.jekuaaPremium.plan = jekuaaPremium.plan
                
            } else if ( jekuaaPremium.plan === '' ) {
                datosUsuarioAuthClaimsActualizar.jekuaaPremium = false
                datosUsuarioDBActualizar.jekuaaPremium.plan = ''
    
            } else {
                datosUsuarioAuthClaimsActualizar.jekuaaPremium = !!datosViejos.jekuaaPremium.plan
                datosUsuarioDBActualizar.jekuaaPremium.plan = datosViejos.jekuaaPremium.plan
            }
    
            // FECHAS
            if ( !datosUsuarioAuthClaimsActualizar.jekuaaPremium ) {
                datosUsuarioDBActualizar.jekuaaPremium.fechaCompra = null
                datosUsuarioDBActualizar.jekuaaPremium.fechaHasta = null
            } else {
                if ( jekuaaPremium.fechaCompra ) {
                    datosUsuarioDBActualizar.jekuaaPremium.fechaCompra = admin.firestore.Timestamp.fromDate( new Date ( jekuaaPremium.fechaCompra ) )
                } else {
                    datosUsuarioDBActualizar.jekuaaPremium.fechaCompra = datosViejos.jekuaaPremium.fechaCompra
                }
    
                if ( jekuaaPremium.fechaHasta ) {
                    datosUsuarioDBActualizar.jekuaaPremium.fechaHasta = admin.firestore.Timestamp.fromDate( new Date ( jekuaaPremium.fechaHasta ) )
                } else {
                    datosUsuarioDBActualizar.jekuaaPremium.fechaHasta = datosViejos.jekuaaPremium.fechaHasta
                }
            }
    
        }
    
        if ( jekuaaRoles ) {

            datosUsuarioDBActualizar.jekuaaRoles = new JekuaaRoles().getDatosRoles()
            
            // ROL
            if ( jekuaaRoles.rol ) {
                datosUsuarioAuthClaimsActualizar.rol = jekuaaRoles.rol
                datosUsuarioDBActualizar.jekuaaRoles.rol = jekuaaRoles.rol
            } else {
                datosUsuarioAuthClaimsActualizar.rol = datosViejos.jekuaaRoles.rol
                datosUsuarioDBActualizar.jekuaaRoles.rol = datosViejos.jekuaaRoles.rol
            }
    
            // SECCIONES E INSTRUCTOR
            if ( datosUsuarioAuthClaimsActualizar.rol === 'estudiante' ) {
                datosUsuarioDBActualizar.jekuaaRoles.secciones = []
                datosUsuarioDBActualizar.jekuaaRoles.instructor = false
            } else {
                if ( jekuaaRoles.secciones ) {
                    datosUsuarioDBActualizar.jekuaaRoles.secciones = jekuaaRoles.secciones
                } else {
                    datosUsuarioDBActualizar.jekuaaRoles.secciones = datosViejos.jekuaaRoles.secciones
                }
    
                if ( jekuaaRoles.instructor ) {
                    datosUsuarioDBActualizar.jekuaaRoles.instructor = jekuaaRoles.instructor
                } else {
                    datosUsuarioDBActualizar.jekuaaRoles.instructor = datosViejos.jekuaaRoles.instructor
                }
            }
        
        }

        if ( !datosUsuarioAuthClaimsActualizar.jekuaaPremium && datosUsuarioAuthClaimsActualizar.rol ) {
            datosUsuarioAuthClaimsActualizar.jekuaaPremium = !!datosViejos.jekuaaPremium.plan
        }

        if ( datosUsuarioAuthClaimsActualizar.jekuaaPremium && !datosUsuarioAuthClaimsActualizar.rol ) {
            datosUsuarioAuthClaimsActualizar.rol = datosViejos.jekuaaRoles.rol
        }
    
        const cambioJekuaaPoint = jekuaaPoint != datosViejos.jekuaaPoint
        if ( jekuaaPoint && cambioJekuaaPoint ) {
            datosUsuarioDBActualizar.jekuaaPoint = jekuaaPoint
        }

        return {
            datosUsuarioDBActualizar,
            datosUsuarioAuthActualizar,
            datosUsuarioAuthClaimsActualizar
        }
    }

    static verificadorDeFormatoParaActualizar ( datosUsuarioParaActualizar ) {
        const {
            uid,
            nombreUsuario,
            correo,
            nombreCompleto,
            fechaNacimiento,
            jekuaaPremium,
            jekuaaRoles,
            jekuaaPoint
        } = datosUsuarioParaActualizar

        if ( uid && typeof uid != 'string' ) {
            throw new Error('La uid debe ser de tipo string.')
        }

        if ( nombreUsuario && typeof nombreUsuario != 'string' ) {
            throw new Error('El nombre de usuario debe ser de tipo string.')
        }

        if ( correo && typeof correo != 'string' ) {
            throw new Error('El correo debe ser de tipo string.')
        }

        if ( nombreCompleto && typeof nombreCompleto != 'string' ) {
            throw new Error('El nombre completo debe ser de tipo string.')
        }

        if ( fechaNacimiento && typeof fechaNacimiento != 'object' ) {
            throw new Error('La fecha de nacimiento debe ser de tipo object (Date).')
        }

        if ( jekuaaPremium ) {

            if ( typeof jekuaaPremium != 'object' ) {
                throw new Error('El jekuaaPremium debe ser de tipo object.')
            }

            const formatoJekuaaPremium = new JekuaaPremium()
            formatoJekuaaPremium.setDatosPremiumConTimestamp({
                plan: jekuaaPremium.plan,
                fechaCompra: jekuaaPremium.fechaCompra,
                fechaHasta: jekuaaPremium.fechaHasta,
            })

            if( !formatoJekuaaPremium.formatoValido() ) {
                throw new Error('El jekuaaPremium es un objeto pero no tiene el formato valido.')
            }
        }

        if ( jekuaaRoles ) {

            if ( typeof jekuaaRoles != 'object' ) {
                throw new Error('El jekuaaRoles debe ser de tipo object.')
            }
            
            const formatoJekuaaRoles = new JekuaaRoles({
                rol: jekuaaRoles.rol,
                secciones: jekuaaRoles.secciones,
                instructor: jekuaaRoles.instructor
            })

            if ( !formatoJekuaaRoles.formatoValido() ) {
                throw new Error('El jekuaaRoles es un objeto pero no tiene el formato valido.')
            }

            if ( !formatoJekuaaRoles.cumpleCondiciones() ) {
                throw new Error('El jekuaaRoles es un objeto, tiene el formato valido pero no cumple las condiciones.')
            }
        }

        if ( jekuaaPoint && typeof jekuaaPoint != 'number' ) {
            throw new Error('El jekuaaPoint debe ser de tipo number.')
        }
    }
}

module.exports = Usuario