const functions = require('firebase-functions')
const Respuesta = require('../src/models/Respuesta')
const manejadorErrores = require('../src/models/Error/ManejoErrores/ManejadorErrores')
const ffBlogs = {}

ffBlogs.blogAgregado = 
functions.region('southamerica-east1').https.onCall( async (data, context) => {

    try {

        const respuesta = new Respuesta()
        let codigo = 'jekuaa/exito'
    
        const {
        } = data

        
        respuesta.setRespuestaPorCodigo(codigo, {
            mensaje: 'Se a creado el usuario de forma correcta.',
            resultado: usuario
        })
        
        return {
            status: respuesta.getStatusCode(),
            respuesta: respuesta.getRespuesta()
        }

    } catch (error) {
        console.log('error -> blogAgregado', error)

        const {
            status,
            respuesta
        } = manejadorErrores( error )

        return {
            status,
            respuesta
        }

    }

}) 

module.exports = ffBlogs