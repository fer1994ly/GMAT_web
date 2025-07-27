import nodemailer from 'nodemailer';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        const { name, email, phone, course, message } = req.body;

        // Validate required fields
        if (!name || !email || !message) {
            return res.status(400).json({ message: 'Name, email, and message are required' });
        }

        // Create transporter
        const transporter = nodemailer.createTransporter({
            service: 'gmail',
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_APP_PASSWORD
            }
        });

        // Email to Alfonso
        const alfonsoEmail = {
            from: process.env.GMAIL_USER,
            to: process.env.ALFONSO_EMAIL || 'alfonso@gmat-expert.com',
            subject: `Nuevo mensaje de contacto - ${name}`,
            html: `
                <h2>Nuevo mensaje de contacto</h2>
                <p><strong>Nombre:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Teléfono:</strong> ${phone || 'No proporcionado'}</p>
                <p><strong>Curso de interés:</strong> ${course || 'No especificado'}</p>
                <p><strong>Mensaje:</strong></p>
                <p>${message}</p>
                <hr>
                <p><small>Enviado desde el formulario de contacto de alfonso-gmat.com</small></p>
            `
        };

        // Confirmation email to user
        const confirmationEmail = {
            from: process.env.GMAIL_USER,
            to: email,
            subject: 'Gracias por contactar con Alfonso GMAT',
            html: `
                <h2>Hola ${name},</h2>
                <p>Gracias por contactar conmigo. He recibido tu mensaje y te responderé lo antes posible.</p>
                <p><strong>Resumen de tu consulta:</strong></p>
                <ul>
                    <li><strong>Curso de interés:</strong> ${course || 'No especificado'}</li>
                    <li><strong>Mensaje:</strong> ${message}</li>
                </ul>
                <p>Mientras tanto, puedes revisar mi información en:</p>
                <ul>
                    <li>Experiencia: 15+ años preparando GMAT</li>
                    <li>Puntuación personal: 785 en GMAT</li>
                    <li>Formación: UC Berkeley, ESADE, Universidad de Barcelona</li>
                    <li>Certificaciones: CPE (C2) Cambridge</li>
                </ul>
                <p>Saludos,<br>Alfonso Rodríguez Mayo</p>
                <hr>
                <p><small>Este es un email automático, no respondas a esta dirección.</small></p>
            `
        };

        // Send emails
        await transporter.sendMail(alfonsoEmail);
        await transporter.sendMail(confirmationEmail);

        res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ message: 'Error sending email' });
    }
} 