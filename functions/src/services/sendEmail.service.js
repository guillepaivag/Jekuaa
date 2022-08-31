const nodemailer = require('nodemailer')


const transporter = nodemailer.createTransport({
    host: 'email-smtp.sa-east-1.amazonaws.com',
    port: 465,
    secure: true,
    auth: {
        user: 'AKIARLPLBZMAKFOIHWB7',
        pass: 'BP9eai3N/Du0ft8qapsCy7B8JTSP5FMACOp4PoAvRKRU'
    }
})


const sendEmail = async (data = { from, to, subject, html }) => {
    try {
        const { from, to, subject, html } = data

        console.log('Enviando correo (sendEmail)')

        const sended = await transporter.sendMail({
            from: from,
            to: to,
            subject: subject,
            html: `${html}`
        })

        return await sended
    } catch (error) {
        console.log('Error al enviar el correo (sendEmail)', error)

        return await error
    }
}


module.exports = sendEmail