const admin = require('../../../firebase-service')
const db = require('../../../db')

const COLECCION_BLOG = 'Blogs'
const COLECCION_BLOG_ACTUALIZACIONES = 'Actualizaciones'

class ActualizacionBlog {
    constructor ( datosActualizacionBlog ) {
        this.uidBlog = datosActualizacionBlog && datosActualizacionBlog.uidBlog ? 
        datosActualizacionBlog.uidBlog : ''
        
        this.uidSolicitud = datosActualizacionBlog && datosActualizacionBlog.uidSolicitud ? 
        datosActualizacionBlog.uidSolicitud : ''

        this.fechaSolicitud = datosActualizacionBlog && datosActualizacionBlog.fechaSolicitud ? 
        datosActualizacionBlog.fechaSolicitud : null

        this.descripcionSolicitud = datosActualizacionBlog && datosActualizacionBlog.descripcionSolicitud ? 
        datosActualizacionBlog.descripcionSolicitud : ''

        this.estado = datosActualizacionBlog && datosActualizacionBlog.estado ? 
        datosActualizacionBlog.estado : ''

        this.fechaRespuesta = datosActualizacionBlog && datosActualizacionBlog.fechaRespuesta ? 
        datosActualizacionBlog.fechaRespuesta : null

        this.respuesta = datosActualizacionBlog && datosActualizacionBlog.respuesta ? 
        datosActualizacionBlog.respuesta : ''

    }

    getDatosActualizacionBlog ( ) {
        return {
            fechaSolicitud: this.fechaSolicitud,
            descripcionSolicitud: this.descripcionSolicitud,
            estado: this.estado,
            fechaRespuesta: this.fechaRespuesta,
            respuesta: this.respuesta,
        }
    }

    setUID_BLOG ( uidBlog ) {
        this.uidBlog = uidBlog
    }

    setUID_SOLICITUD ( uidSolicitud ) {
        this.uidSolicitud = uidSolicitud
    }
    
    setFECHA_SOLICITUD ( fechaSolicitud ) {
        this.fechaSolicitud = fechaSolicitud
    }

    setDESCRIPCION_SOLICITUD ( descripcionSolicitud ) {
        this.descripcionSolicitud = descripcionSolicitud
    }

    setESTADO ( estado ) {
        this.estado = estado
    }

    setFECHA_RESPUESTA ( fechaRespuesta ) {
        this.fechaRespuesta = fechaRespuesta
    }

    setRESPUESTA ( respuesta ) {
        this.respuesta = respuesta
    }

    setDatosBlog ( datosBlog ) {
        this.setDESCRIPCION_SOLICITUD( datosBlog.descripcionSolicitud )
        this.setFECHA_SOLICITUD( datosBlog.fechaSolicitud )
        this.setESTADO( datosBlog.estado )
        this.setRESPUESTA( datosBlog.respuesta )
        this.setFECHA_RESPUESTA( datosBlog.fechaRespuesta )
    }

    async crearSolicitudActualizacion ( ) {
        return await db.collection(COLECCION_BLOG).doc(this.uidBlog)
        .collection(COLECCION_BLOG_ACTUALIZACIONES).add(this.getDatosActualizacionBlog())
    }

    async actualizarSolicitudActualizacion ( datosSolicitudActualizacion ) {
        return db.collection(COLECCION_BLOG).doc(this.uidBlog)
        .collection(COLECCION_BLOG_ACTUALIZACIONES).doc(this.uidSolicitud)
        .update(datosSolicitudActualizacion)
    }
}

module.exports = ActualizacionBlog