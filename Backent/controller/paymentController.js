import Stripe from "stripe";
const stripe = new Stripe(process.env.Stripe_Private_Api_Key);

const client_domain = process.env.CLIENT_DOMAIN;



export const payment = async (req, res, next) => {
    try {
        const product = req.body;

        // datas adding to session through linitems
        // const lineItems = products.map((product) => ({
        //     price_data: {
        //         currency: "inr",
        //         product_data: {
        //             name: product.car[0].carId.carName,
        //             images: [product.car[0].carId.image],

        //         },
        //         unit_amount: Math.round(product.car[0].carId.price * 100),
        //     },
        //     quantity: 1, 

        // }));
        const lineItems = [
            {
                price_data: {
                    currency: "inr",
                    product_data: {
                        name: product.car?.carId?.carName, // Safely access the car name
                        images: [product.car?.carId?.image], // Image URL
                    },
                    unit_amount: Math.round(product.car?.carId?.price * 100), // Convert to smallest currency unit
                },
                quantity: 1, // Set quantity to 1 or your desired value
            },
        ];
        //for session controller
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: lineItems,
            mode: "payment",
            success_url: `${client_domain}/user/payment/success`,
            cancel_url: `${client_domain}/user/payment/cancel`,
        });

        return res.status(404).json({ message: "stripe not geting datas" })


    } catch (error) {
        console.log(error);
        return next(error);
    };
};