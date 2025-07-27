import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        const { items, success_url, cancel_url } = req.body;

        if (!items || items.length === 0) {
            return res.status(400).json({ message: 'No items provided' });
        }

        // Create line items for Stripe
        const lineItems = items.map(item => ({
            price_data: {
                currency: 'eur',
                product_data: {
                    name: item.name,
                    description: `Curso de ${item.name} con Alfonso Rodríguez Mayo`,
                    images: ['https://alfonso-gmat.com/images/course-banner.jpg'],
                },
                unit_amount: item.price * 100, // Convert to cents
            },
            quantity: item.quantity,
        }));

        // Create checkout session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: lineItems,
            mode: 'payment',
            success_url: success_url || `${req.headers.origin}/success`,
            cancel_url: cancel_url || `${req.headers.origin}/cancel`,
            metadata: {
                customer_email: req.body.customer_email || '',
                items: JSON.stringify(items.map(item => ({ name: item.name, quantity: item.quantity }))),
            },
            customer_email: req.body.customer_email,
            locale: 'es',
            billing_address_collection: 'required',
            shipping_address_collection: {
                allowed_countries: ['ES', 'US', 'GB'],
            },
        });

        res.status(200).json({ url: session.url });
    } catch (error) {
        console.error('Error creating checkout session:', error);
        res.status(500).json({ message: 'Error creating checkout session' });
    }
} 