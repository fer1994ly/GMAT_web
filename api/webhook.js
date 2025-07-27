import Stripe from 'stripe';
import nodemailer from 'nodemailer';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const sig = req.headers['stripe-signature'];
    let event;

    try {
        event = stripe.webhooks.constructEvent(
            req.body,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET
        );
    } catch (err) {
        console.error('Webhook signature verification failed:', err.message);
        return res.status(400).json({ message: 'Webhook signature verification failed' });
    }

    try {
        switch (event.type) {
            case 'checkout.session.completed':
                await handleCheckoutSessionCompleted(event.data.object);
                break;
            case 'payment_intent.succeeded':
                await handlePaymentIntentSucceeded(event.data.object);
                break;
            case 'payment_intent.payment_failed':
                await handlePaymentIntentFailed(event.data.object);
                break;
            default:
                console.log(`Unhandled event type: ${event.type}`);
        }

        res.status(200).json({ received: true });
    } catch (error) {
        console.error('Error processing webhook:', error);
        res.status(500).json({ message: 'Error processing webhook' });
    }
}

async function handleCheckoutSessionCompleted(session) {
    console.log('Payment completed for session:', session.id);
    
    try {
        // Send confirmation email to customer
        const transporter = nodemailer.createTransporter({
            service: 'gmail',
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_APP_PASSWORD
            }
        });

        const items = JSON.parse(session.metadata.items || '[]');
        const customerEmail = session.customer_email || session.metadata.customer_email;

        if (customerEmail) {
            const emailContent = {
                from: process.env.GMAIL_USER,
                to: customerEmail,
                subject: 'Confirmación de pago - Alfonso GMAT',
                html: `
                    <h2>¡Gracias por tu compra!</h2>
                    <p>Tu pago ha sido procesado correctamente.</p>
                    
                    <h3>Detalles del pedido:</h3>
                    <ul>
                        ${items.map(item => `<li>${item.name} - Cantidad: ${item.quantity}</li>`).join('')}
                    </ul>
                    
                    <p><strong>Total pagado:</strong> €${(session.amount_total / 100).toFixed(2)}</p>
                    
                    <h3>Próximos pasos:</h3>
                    <p>Alfonso se pondrá en contacto contigo en las próximas 24 horas para coordinar:</p>
                    <ul>
                        <li>Horario de las clases</li>
                        <li>Plataforma de videoconferencia</li>
                        <li>Materiales de estudio</li>
                        <li>Evaluación inicial</li>
                    </ul>
                    
                    <p>Si tienes alguna pregunta, no dudes en contactar con nosotros.</p>
                    
                    <p>Saludos,<br>Alfonso Rodríguez Mayo</p>
                    <hr>
                    <p><small>ID de sesión: ${session.id}</small></p>
                `
            };

            await transporter.sendMail(emailContent);
        }

        // Send notification to Alfonso
        const alfonsoEmail = {
            from: process.env.GMAIL_USER,
            to: process.env.ALFONSO_EMAIL || 'alfonso@gmat-expert.com',
            subject: `Nuevo pago recibido - ${customerEmail}`,
            html: `
                <h2>Nuevo pago recibido</h2>
                <p><strong>Cliente:</strong> ${customerEmail}</p>
                <p><strong>Total:</strong> €${(session.amount_total / 100).toFixed(2)}</p>
                <p><strong>ID de sesión:</strong> ${session.id}</p>
                
                <h3>Cursos comprados:</h3>
                <ul>
                    ${items.map(item => `<li>${item.name} - Cantidad: ${item.quantity}</li>`).join('')}
                </ul>
                
                <p>Por favor, contacta con el cliente para coordinar las clases.</p>
            `
        };

        await transporter.sendMail(alfonsoEmail);

    } catch (error) {
        console.error('Error sending confirmation emails:', error);
    }
}

async function handlePaymentIntentSucceeded(paymentIntent) {
    console.log('Payment intent succeeded:', paymentIntent.id);
    // Additional logic for successful payments if needed
}

async function handlePaymentIntentFailed(paymentIntent) {
    console.log('Payment intent failed:', paymentIntent.id);
    
    try {
        const transporter = nodemailer.createTransporter({
            service: 'gmail',
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_APP_PASSWORD
            }
        });

        const emailContent = {
            from: process.env.GMAIL_USER,
            to: process.env.ALFONSO_EMAIL || 'alfonso@gmat-expert.com',
            subject: 'Pago fallido - Alfonso GMAT',
            html: `
                <h2>Pago fallido</h2>
                <p><strong>ID de pago:</strong> ${paymentIntent.id}</p>
                <p><strong>Motivo:</strong> ${paymentIntent.last_payment_error?.message || 'Error desconocido'}</p>
                <p>Por favor, contacta con el cliente para resolver el problema.</p>
            `
        };

        await transporter.sendMail(emailContent);
    } catch (error) {
        console.error('Error sending failure notification:', error);
    }
} 