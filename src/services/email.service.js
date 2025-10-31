// src/services/email.service.js
const nodemailer = require('nodemailer');

// 1. Configuración del transportador de correo
const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_HOST_SERVICE,
    auth: {
        user: process.env.EMAIL_SERVICE_USER,
        pass: process.env.EMAIL_SERVICE_PASS
    }
});

/**
 * Función para enviar el correo de verificación.
 * @param {string} email - Correo del destinatario.
 * @param {string} token - El token JWT generado para la verificación.
 */
exports.sendVerificationEmail = async (email, token) => {
    const link = `${process.env.BASE_URL}/api/auth/verify?token=${token}`;
    
    // Contenido del correo
    const mailOptions = {
        from: `Verificación de Cuenta <${process.env.EMAIL_SERVICE_USER}>`,
        to: email,
        subject: '¡Bienvenido! Verifica tu cuenta',
        html: `
            <h3>Verificación de Correo</h3>
            <p>Gracias por registrarte. Para activar completamente tu cuenta, haz clic en el siguiente enlace:</p>
            <a href="${link}" style="display:inline-block; padding: 10px 20px; background-color: #4CAF50; color: white; text-decoration: none; border-radius: 5px;">
                Verificar Mi Cuenta
            </a>
            <p style="margin-top: 20px;">Si no solicitaste esto, ignora este correo.</p>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`Correo de verificación enviado a ${email}`);
    } catch (error) {
        console.error(`Error al enviar correo a ${email}: ${error.message}`);
        // Nota: En producción, podrías querer registrar este error o reintentar.
    }
};