const admin = require('../../firebase-service')
const generateHtmlEmailVerification = require('../helpers/email/generateHtmlEmailVerification')
const sendEmail = require('./sendEmail.service')

const sendEmailVerification = async ( email = '' ) => {

    try {
        const linkVerification = await admin.auth().generateEmailVerificationLink(email)
        
        const htmlEmailVerification = await generateHtmlEmailVerification(email, linkVerification)

        return await sendEmail({
            from: 'jekuaateam@gmail.com',
            to: email,
            subject: 'Verificación de correo.',
            html: htmlEmailVerification
        })

    } catch (error) {
        console.log(`ERROR AL ENVIAR EL EMAIL DE VERIFICACION A ${email}`, error)
    }
    
}

module.exports = sendEmailVerification